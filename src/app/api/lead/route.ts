import { fireLeadWebhook } from '@/lib/n8n';
import { notifyLead } from '@/lib/notify';
import { getSupabase } from '@/lib/supabase';

/**
 * POST /api/lead — the capture point.
 *
 * A visitor read their report, believed it, and typed their phone number in.
 * This is the single most valuable event on the site, and it is the one place
 * where "fail quietly" is unacceptable in either direction:
 *
 *   - The visitor must never see a failure. A missing database and a dead
 *     phase-4 workflow are both *our* problems, not theirs. If the phone number
 *     is valid, they get a 200.
 *   - Josh must never miss one. Anything that degraded — the insert skipped,
 *     the webhook down — is written into the Telegram message itself, because
 *     that is the only surface he reads. A lead that never reached the database
 *     is visible, not silent.
 *
 * Separate from /api/report on purpose (see DECISIONS.md): that route streams
 * NDJSON and holds three module caches; this one is a single JSON request with
 * different failure rules. Bolting a write path onto a stream handler is how
 * both end up wrong.
 *
 * Node runtime — the default, and what we want. `@supabase/supabase-js` and
 * real fetch timeouts both need the full Node surface, and there is no reason
 * to opt into Edge for a route that talks to three separate services.
 */

// ---------------------------------------------------------------------------
// Rate limiting
//
// ⚠️ This route inherits nothing. The limiter in api/report/route.ts is a
// module-private Map in that file — a new route gets none of it. Without this
// block, one POST per business name lets anyone flood Josh's Telegram, which is
// both the alerting channel and, until Supabase exists, the system of record.
//
// 3 per hour per IP, tighter than the report's 5. A capture is submitted once
// per visitor; two covers a typo and a retry; three covers two people behind
// one NAT — a café's wifi, a co-working floor. Past that it is not a customer.
// ---------------------------------------------------------------------------
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

/** Per-instance and best-effort, same caveat as the caches in the report route. */
const hits = new Map<string, number[]>();

function clientKey(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || 'unknown';
}

function recent(key: string): number[] {
  const now = Date.now();
  return (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
}

function overLimit(key: string): boolean {
  const list = recent(key);
  hits.set(key, list);
  return list.length >= RATE_LIMIT;
}

/**
 * Recorded only after the phone number validates, so a fat-fingered number
 * doesn't burn a slot the visitor needs on their second try. Nothing expensive
 * happens before validation — no Telegram, no insert, no webhook — so an
 * invalid request costs us nothing worth metering.
 */
function recordHit(key: string): void {
  const list = recent(key);
  list.push(Date.now());
  hits.set(key, list);
}

// ---------------------------------------------------------------------------
// Input handling
//
// This is an unauthenticated public write path. Everything that arrives is
// hostile until it has been capped, and every cap is deliberate: an uncapped
// string ends up in a jsonb column and in a Telegram message, and Telegram
// rejects a message over 4096 characters outright.
// ---------------------------------------------------------------------------
const MAX = {
  phoneRaw: 32,
  businessName: 120,
  placeId: 200,
  address: 240,
  category: 60,
  website: 500,
  query: 200,
  pain: 80,
  list: 8,
  code: 80,
  headline: 240,
  consequence: 400,
  impact: 60,
  title: 160,
  why: 400,
} as const;

function str(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

function num(value: unknown, min: number, max: number): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (value < min || value > max) return null;
  return value;
}

/** `review_count` is an integer column — a float here fails the insert. */
function int(value: unknown, min: number, max: number): number | null {
  const n = num(value, min, max);
  return n !== null && Number.isInteger(n) ? n : null;
}

type CleanFinding = {
  code: string;
  headline: string;
  consequence: string;
  impact: string | null;
};

type CleanBuild = { title: string; why: string };

function cleanFindings(value: unknown): CleanFinding[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX.list).flatMap((raw): CleanFinding[] => {
    if (typeof raw !== 'object' || raw === null) return [];
    const row = raw as Record<string, unknown>;
    const headline = str(row.headline, MAX.headline);
    if (!headline) return [];
    return [
      {
        code: str(row.code, MAX.code) ?? 'unknown',
        headline,
        consequence: str(row.consequence, MAX.consequence) ?? '',
        impact: str(row.impact, MAX.impact),
      },
    ];
  });
}

function cleanBuilds(value: unknown): CleanBuild[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX.list).flatMap((raw): CleanBuild[] => {
    if (typeof raw !== 'object' || raw === null) return [];
    const row = raw as Record<string, unknown>;
    const title = str(row.title, MAX.title);
    if (!title) return [];
    return [{ title, why: str(row.why, MAX.why) ?? '' }];
  });
}

/**
 * US numbers only, which is what the business is. Ten digits, or eleven when
 * the visitor typed the country code. Everything else — spaces, dashes,
 * parentheses, a leading +1 — is stripped before we judge it, because a person
 * typing their own number types it the way they say it out loud.
 *
 * Stored as E.164 so phase 4 can hand it straight to an SMS provider without
 * a second parsing pass; shown to Josh in the format he'd read it back.
 */
function normalisePhone(raw: string): { e164: string; pretty: string } | null {
  const digits = raw.replace(/\D/g, '');
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (ten.length !== 10) return null;
  // A US area code and exchange can't start with 0 or 1. This is the cheapest
  // filter that rejects 0000000000 and 1234567890 without a lookup table.
  if (ten[0] === '0' || ten[0] === '1' || ten[3] === '0' || ten[3] === '1') return null;
  return {
    e164: `+1${ten}`,
    pretty: `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`,
  };
}

function bad(error: string, status: number) {
  return Response.json({ ok: false, error }, { status });
}

// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  // a. Parse. Mirrors /api/report's one non-streaming failure exactly.
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('not an object');
    }
    body = parsed as Record<string, unknown>;
  } catch {
    console.warn('[lead] malformed body');
    return bad('Malformed request.', 400);
  }

  // b. Rate limit.
  const key = clientKey(request);
  if (overLimit(key)) {
    console.warn('[lead] rate limited', key);
    return bad('I already have your number — I’ll text you.', 429);
  }

  // c. Validate the phone. The only required field.
  const rawPhone = str(body.phone, MAX.phoneRaw);
  if (!rawPhone) {
    return bad('I need a phone number to text you back.', 400);
  }
  const phone = normalisePhone(rawPhone);
  if (!phone) {
    return bad('That number doesn’t look right — 10 digits, area code first.', 400);
  }
  recordHit(key);

  // The rest is context. All of it is optional, because the contract says the
  // phone number is the only required field and a lead with a bad name still
  // beats no lead. `name` has to resolve to something non-empty regardless:
  // notifyLead returns early and silently on a blank name.
  const businessName = str(body.businessName, MAX.businessName);
  const query = str(body.query, MAX.query);
  const name = businessName ?? query ?? 'Unknown business';

  const placeId = str(body.placeId, MAX.placeId);
  const address = str(body.address, MAX.address);
  const category = str(body.category, MAX.category);
  const categoryLabel = str(body.categoryLabel, MAX.category);
  const website = str(body.website, MAX.website);
  const pain = str(body.pain, MAX.pain);
  const rating = num(body.rating, 0, 5);
  const reviewCount = int(body.reviewCount, 0, 10_000_000);
  const findings = cleanFindings(body.findings);
  const builds = cleanBuilds(body.builds);

  console.log(
    `[lead] capture ${name} · ${phone.pretty} · place=${placeId ?? 'none'} · ${findings.length} findings`
  );

  /** Anything that degraded. Ends up at the bottom of Josh's Telegram alert. */
  const warnings: string[] = [];

  // d. Supabase. Skipped, not failed, when there is no project yet.
  const supabase = getSupabase();
  if (!supabase) {
    warnings.push('Not saved to the database — no Supabase project configured yet.');
    console.warn('[lead] insert skipped: supabase unconfigured');
  } else {
    const { error } = await supabase.from('leads').insert({
      name,
      phone: phone.e164,
      findings,
      // ⚠️ 'audit_box', never 'audit'. The rulebook's enum is
      // scrape/audit_box/walk_in/referral/ad and the CHECK constraint in
      // supabase/leads.sql enforces it; the brand spec's "audit" is not legal.
      source: 'audit_box',
      status: 'new',
      place_id: placeId,
      address,
      category: categoryLabel ?? category,
      rating,
      review_count: reviewCount,
      website,
    });

    if (error) {
      // The visitor still gets a 200 — see the header comment. But the row is
      // gone, so Josh has to be told in the message, not just in a log.
      warnings.push(`Not saved to the database — insert failed (${error.message}).`);
      console.error('[lead] insert failed:', error);
    } else {
      console.log('[lead] inserted');
    }
  }

  // e. n8n — deliberately BEFORE the Telegram alert.
  //
  // The build order lists the alert first, but it also requires that a failed
  // webhook is visible in the Telegram message. Those two can't both be true
  // unless the webhook result exists before the message is composed. The
  // message is the requirement with the consequence attached — a workflow that
  // failed where only a log can see it is the exact silent failure the build
  // order bans — so the webhook goes first.
  //
  // This costs nothing in practice: unconfigured returns synchronously, and a
  // live workflow answers fast. The only case that pays the 4s timeout is a
  // hung n8n, which is precisely the case Josh needs told about.
  const webhook = await fireLeadWebhook({
    event: 'lead.captured',
    source: 'audit_box',
    capturedAt: new Date().toISOString(),
    lead: {
      name,
      phone: phone.e164,
      placeId,
      address,
      category: categoryLabel ?? category,
      rating,
      reviewCount,
      website,
      findings,
      builds,
      query,
      pain,
    },
  });

  if (!webhook.ok) {
    // fireLeadWebhook already logged the detail. This turns it into something
    // Josh sees. 'not_configured' is the expected phase-1 state and gets its
    // own plain wording — it is not the same news as a workflow that broke.
    warnings.push(
      webhook.reason === 'not_configured'
        ? 'No n8n workflow wired up yet — nothing automatic fired.'
        : `The n8n workflow did not fire (${webhook.reason}).`
    );
  }

  // f. Telegram — last, so it carries everything that went wrong above it.
  //
  // ⚠️ THE NAMESPACE IS THE WHOLE POINT. notify.ts dedupes on
  // (dedupeKey || name) against a 6-hour window, and the report path already
  // burned `place.id` for this exact business minutes ago when it showed them
  // the findings. An un-namespaced key here recomputes that same string, passes
  // the window check, and hits a bare `return` before the fetch — no log, no
  // throw, a resolved promise. And because `notified` is a per-instance Map, it
  // would be swallowed on a warm instance and delivered on a cold one:
  // intermittent, precisely when the lead is hottest. The 'phone:' prefix makes
  // the capture a different event from the report that preceded it.
  //
  // Awaited inline, like the report route does, so serverless can't freeze the
  // fetch when the response is returned.
  await notifyLead({
    name,
    capturedPhone: phone.pretty,
    address,
    categoryLabel: categoryLabel ?? category,
    rating,
    reviewCount,
    website,
    findings: findings.map((f) => f.headline),
    builds: builds.map((b) => b.title),
    dedupeKey: `phone:${placeId ?? name}`,
    warnings,
  });

  console.log(`[lead] done · warnings=${warnings.length}`);

  // g. Always 200 once the number was valid. A missing database and a dead
  // phase-4 workflow are our problems; the visitor did their part.
  return Response.json({ ok: true });
}
