import { deriveFindings, tapFallbackFindings, toBuilds, toFallbackFindings } from '@/lib/report/findings';
import { placeDetails, searchBusiness } from '@/lib/report/places';
import { checkSite } from '@/lib/report/site-checks';
import { buildHeader, generateReport } from '@/lib/report/generate';
import { placeDiscoveries, siteDiscoveries } from '@/lib/report/discoveries';
import { notifyLead } from '@/lib/notify';
import { growthScore } from '@/lib/report/score';
import { checkBotId } from 'botid/server';
import type {
  BizCategory,
  Facts,
  PlaceFacts,
  Report,
  ReportEvent,
  SiteFacts,
  TapFallbackInput,
  VisitorAnswers,
} from '@/lib/report/types';

/**
 * POST /api/report — the instant business report.
 *
 * Streams newline-delimited JSON so the page can narrate the wait. There is no
 * error path that reaches the visitor: every failure downgrades to a smaller
 * but still true report (spec §6.1).
 *
 * Node runtime (Fluid Compute default) — we need real fetch timeouts and the
 * full Node surface, and streaming works here without opting into Edge.
 */

export const maxDuration = 60;

const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

/**
 * Per-instance, best-effort only. Fluid Compute reuses instances so this
 * catches the common cases, but it is not a distributed cache or a hard limit.
 * Upgrade to Vercel KV / Runtime Cache if volume ever justifies it.
 */
const cache = new Map<string, { at: number; report: Report }>();
const hits = new Map<string, number[]>();

/**
 * Measured facts, keyed by place id and independent of the visitor's answers.
 * This is what makes the "sharpen the report after they tap a chip" pass free:
 * the second request re-runs only the phrasing, never Places or the site fetch.
 */
const factsCache = new Map<string, { at: number; place: PlaceFacts; site: SiteFacts }>();

type Payload =
  | { mode: 'search'; query: string; answers?: VisitorAnswers }
  | { mode: 'place'; placeId: string; answers?: VisitorAnswers }
  | { mode: 'tap'; tap: TapFallbackInput };

function clientKey(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || 'unknown';
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

/**
 * A hard ceiling on billable Google Places calls per day.
 *
 * `rateLimited()` above is PER IP — five an hour each. That stops one person
 * hammering the box; it does nothing about a hundred people, or a crawler on a
 * hundred addresses. Every report that reaches Google costs two billable calls
 * (Text Search + Place Details), so without a global stop the bill is a
 * function of traffic, and traffic is the thing we're trying to attract.
 *
 * Josh has no capital. A spend cap that can be exceeded isn't a cap, so this is
 * a wall, not a warning: past the ceiling the box stops calling Google entirely
 * and visitors fall through to the 3-tap panel, which costs nothing and still
 * produces a report. Degraded beats a bill.
 *
 * This is the LAST line of defence, not the first. The real cap belongs in the
 * Google Cloud console as an API quota, because this counter is per-instance
 * and resets when the instance recycles — several warm instances could each
 * count separately. Set both.
 *
 * MAX_PLACES_LOOKUPS_PER_DAY can be raised with an env var once something is
 * actually earning; the default is deliberately conservative.
 */
const MAX_PLACES_LOOKUPS_PER_DAY = Number(process.env.MAX_PLACES_LOOKUPS_PER_DAY ?? 150);
const DAY_MS = 24 * 60 * 60 * 1000;
const placesBudget = { windowStart: 0, used: 0 };

function placesBudgetExhausted(): boolean {
  const now = Date.now();
  if (now - placesBudget.windowStart > DAY_MS) {
    placesBudget.windowStart = now;
    placesBudget.used = 0;
  }
  if (placesBudget.used >= MAX_PLACES_LOOKUPS_PER_DAY) {
    console.warn(
      `[report] daily Places ceiling hit (${MAX_PLACES_LOOKUPS_PER_DAY}) — ` +
        'falling back to the no-cost 3-tap panel until the window resets.'
    );
    return true;
  }
  placesBudget.used += 1;
  return false;
}

function emptySiteFacts(): SiteFacts {
  return {
    checked: false,
    reachable: false,
    finalUrl: null,
    https: null,
    status: null,
    ttfbMs: null,
    totalMs: null,
    bytes: null,
    hasViewportMeta: null,
    hasTelLink: null,
    hasLocalBusinessSchema: null,
    menuIsPdfOrImage: null,
    marketplaceLinks: [],
    directOrderingLinks: [],
    bookingLinks: [],
    hasEcommerce: null,
    copyrightYear: null,
    failureReason: null,
  };
}

/** The 3-tap report. Nothing here claims to have looked anything up. */
function tapReport(tap: TapFallbackInput): Report {
  const findings = tapFallbackFindings(tap);
  return {
    header: {
      placeId: null,
      name: tap.businessName?.trim() || 'Your business',
      address: null,
      category: tap.category,
      categoryLabel: null,
      rating: null,
      reviewCount: null,
      website: null,
    },
    findings: toFallbackFindings(findings),
    builds: toBuilds(findings),
    generated: false,
    fallback: true,
  };
}

function isCategory(value: unknown): value is BizCategory {
  return (
    value === 'restaurant' ||
    value === 'studio' ||
    value === 'shop' ||
    value === 'service' ||
    value === 'other'
  );
}

export async function POST(request: Request) {
  // Bots stop here, before the rate limit, the daily ceiling or any billable
  // Google call. Vercel BotID; the client side is src/instrumentation-client.ts.
  // In local dev checkBotId() always passes.
  const verification = await checkBotId();
  if (verification.isBot) {
    return Response.json({ error: 'Access denied.' }, { status: 403 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ReportEvent) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      try {
        // ---- 3-tap path: no external calls, always works ------------------
        if (body.mode === 'tap') {
          const tap: TapFallbackInput = {
            businessName: body.tap?.businessName ?? null,
            category: isCategory(body.tap?.category) ? body.tap.category : 'other',
            hasWebsite:
              typeof body.tap?.hasWebsite === 'boolean' ? body.tap.hasWebsite : null,
            whoAnswersPhone: body.tap?.whoAnswersPhone ?? null,
          };
          const report = tapReport(tap);
          send({ type: 'report', report });
          // The report itself stays unlimited — it's local and it must always
          // work. The *alert* is rate limited, or anyone could spam the channel
          // by POSTing this path with a different name each time.
          if (!rateLimited(clientKey(request))) {
            // Alert before closing the stream so the fetch is guaranteed to
            // finish; post-close work can be frozen on serverless.
            await notifyLead({
              name: report.header.name,
              categoryLabel: tap.category,
              findings: report.findings.map((f) => f.headline),
              builds: report.builds.map((b) => b.title),
              fallback: true,
            });
          }
          controller.close();
          return;
        }

        if (rateLimited(clientKey(request))) {
          send({
            type: 'notice',
            message: "You've run a few of these already — text me and I'll just tell you.",
          });
          controller.close();
          return;
        }

        // The daily ceiling on billable Google calls. Checked here, after the
        // per-IP limit and before anything reaches Places. The visitor is not
        // told a budget ran out — they drop to the 3-tap panel, which asks
        // three questions and produces a real report for free.
        if (placesBudgetExhausted()) {
          send({ type: 'notice', message: 'needs_tap_fallback' });
          controller.close();
          return;
        }

        const answers: VisitorAnswers = {
          painPoint: body.answers?.painPoint ?? null,
          handlesOnline: body.answers?.handlesOnline ?? null,
        };

        // ---- Resolve the business ----------------------------------------
        let placeId: string;

        if (body.mode === 'search') {
          const query = (body.query ?? '').trim();
          if (query.length < 2) {
            send({ type: 'notice', message: 'Type a business name to get started.' });
            controller.close();
            return;
          }

          send({ type: 'progress', step: 'Looking up your business' });

          let candidates;
          try {
            candidates = await searchBusiness(query);
          } catch (err) {
            console.error('[report] places search failed:', err);
            send({ type: 'notice', message: 'needs_tap_fallback' });
            controller.close();
            return;
          }

          if (candidates.length === 0) {
            send({ type: 'notice', message: 'needs_tap_fallback' });
            controller.close();
            return;
          }

          if (candidates.length > 1) {
            // Never guess between matches.
            send({ type: 'candidates', candidates });
            controller.close();
            return;
          }

          placeId = candidates[0].id;
        } else {
          placeId = (body.placeId ?? '').trim();
          if (!placeId) {
            send({ type: 'notice', message: 'needs_tap_fallback' });
            controller.close();
            return;
          }
        }

        // ---- Cache -------------------------------------------------------
        const cacheKey = `${placeId}|${answers.painPoint ?? ''}|${answers.handlesOnline ?? ''}`;
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
          send({ type: 'header', header: cached.report.header });
          send({ type: 'report', report: cached.report });
          // A cache hit is still a visitor. The 6h dedupe inside notifyLead is
          // what stops repeats, not the 30-day report cache.
          await notifyLead({
            name: cached.report.header.name,
            address: cached.report.header.address,
            categoryLabel: cached.report.header.categoryLabel ?? cached.report.header.category,
            rating: cached.report.header.rating,
            reviewCount: cached.report.header.reviewCount,
            website: cached.report.header.website,
            findings: cached.report.findings.map((f) => f.headline),
            builds: cached.report.builds.map((b) => b.title),
            dedupeKey: cached.report.header.placeId,
          });
          controller.close();
          return;
        }

        // ---- Facts -------------------------------------------------------
        const freshFacts = factsCache.get(placeId);
        let place: PlaceFacts;
        let site: SiteFacts;

        if (freshFacts && Date.now() - freshFacts.at < CACHE_TTL_MS) {
          place = freshFacts.place;
          site = freshFacts.site;
          send({ type: 'header', header: buildHeader({ place, site, answers }) });
        } else {
          send({ type: 'progress', step: 'Reading your Google listing' });

          try {
            place = await placeDetails(placeId);
          } catch (err) {
            console.error('[report] place details failed:', err);
            send({ type: 'notice', message: 'needs_tap_fallback' });
            controller.close();
            return;
          }

          send({
            type: 'header',
            header: buildHeader({ place, site: emptySiteFacts(), answers }),
          });

          // Show the visitor what we actually found, rather than a spinner.
          for (const discovery of placeDiscoveries(place)) {
            send({ type: 'discovery', discovery });
          }

          site = emptySiteFacts();
          if (place.website) {
            send({ type: 'progress', step: 'Opening your website' });
            site = await checkSite(place.website);
            for (const discovery of siteDiscoveries(site)) {
              send({ type: 'discovery', discovery });
            }
          } else {
            send({ type: 'progress', step: 'Checking for a website' });
          }

          factsCache.set(placeId, { at: Date.now(), place, site });
        }

        const facts: Facts = { place, site, answers };
        const findings = deriveFindings(facts);
        const score = growthScore(facts);

        send({ type: 'progress', step: 'Working out what it’s costing you' });

        // ---- Report ------------------------------------------------------
        let latest: Report | null = null;
        for await (const generated of generateReport(facts, findings)) {
          const report = { ...generated, score };
          latest = report;
          send({ type: 'report', report });
        }

        if (latest) {
          cache.set(cacheKey, { at: Date.now(), report: latest });
        } else {
          // Should be unreachable — generateReport always yields — but never
          // leave the visitor with an empty page.
          send({
            type: 'report',
            report: {
              header: buildHeader(facts),
              findings: toFallbackFindings(findings),
              builds: toBuilds(findings),
              generated: false,
              score,
            },
          });
        }

        await notifyLead({
          name: place.name,
          address: place.address,
          categoryLabel: place.primaryType ?? place.category,
          rating: place.rating,
          reviewCount: place.reviewCount,
          phone: place.phone,
          website: place.website,
          findings: (latest?.findings ?? []).map((f) => f.headline),
          builds: (latest?.builds ?? []).map((b) => b.title),
          dedupeKey: place.id,
        });

        controller.close();
      } catch (err) {
        console.error('[report] unhandled:', err);
        // Even here the visitor gets a route forward, not a stack trace.
        try {
          send({ type: 'notice', message: 'needs_tap_fallback' });
        } catch {
          /* stream already gone */
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
}
