/**
 * POST /api/contact — the free tech checkup request. Rebuilt 2026-09-30 from
 * foundos-website-rebuild-brief.md §5.
 *
 * ⚠️ THERE IS NO DATABASE YET, SO TELEGRAM IS THE RECORD. The brief asks for
 * "save, then notify, then retry the notification". There is no Supabase
 * project (see lib/supabase.ts) and nothing else durable is set up, so this
 * route does the honest version of that: success is returned ONLY after the
 * Telegram message is accepted. If Telegram fails after two tries, the visitor
 * gets an error with the text/email fallback and their form stays filled in —
 * a request is never shown "sent" and then lost. When a store exists, insert
 * before the send and move the send to a retried queue.
 *
 * Plain-text Telegram message (no parse_mode), so nothing a visitor types can
 * break or inject markup. Submitted URLs are validated, never fetched.
 */

import { interestLabel } from '@/config/offer';

/*
 * 2026-10-01: also serves the restaurant inquiry form (InquiryForm), which adds
 * `interest` — a plan or project slug, validated against config/offer.ts. When
 * a known interest is sent, the free-text `help` field becomes optional. A
 * request without `interest` (the old CheckupForm) behaves exactly as before.
 */

const TIMEOUT_MS = 5000;

// ---- rate limit + duplicate protection (per instance, best-effort) --------
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();
/** Submission IDs already delivered — a double tap or a retry doesn't ping twice. */
const delivered = new Map<string, number>();
const DELIVERED_TTL_MS = 24 * 60 * 60 * 1000;

function clientKey(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function recent(key: string): number[] {
  const now = Date.now();
  return (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
}

function pruneDelivered() {
  const now = Date.now();
  for (const [id, t] of delivered) if (now - t > DELIVERED_TTL_MS) delivered.delete(id);
}

// ---- validation ------------------------------------------------------------
const MAX = { name: 80, business: 120, website: 300, help: 1500, phone: 32, email: 254, id: 64 } as const;

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function prettyPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (ten.length !== 10) return null;
  if (ten[0] === '0' || ten[0] === '1' || ten[3] === '0' || ten[3] === '1') return null;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** http(s) or a bare domain / profile link. Any other scheme is rejected. */
function cleanWebsite(raw: string): string | null {
  if (!raw) return '';
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!url.hostname.includes('.')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function fail(error: string, status: number, field?: string) {
  return Response.json({ ok: false, error, ...(field ? { field } : {}) }, { status });
}

// ---- delivery --------------------------------------------------------------
async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('[contact] telegram not configured');
    return false;
  }
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return true;
      console.error('[contact] telegram responded', res.status);
    } catch (err) {
      console.error('[contact] telegram failed, attempt', attempt, err instanceof Error ? err.name : 'error');
    }
  }
  return false;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed as Record<string, unknown>;
  } catch {
    return fail('Something was wrong with that request.', 400);
  }

  // Honeypot: pretend it worked, do nothing.
  if (str(body.company_fax, 200)) return Response.json({ ok: true });

  const id = str(body.id, MAX.id);
  if (!/^[0-9a-f-]{16,64}$/i.test(id)) return fail('Something was wrong with that request.', 400);

  pruneDelivered();
  if (delivered.has(id)) return Response.json({ ok: true, duplicate: true });

  const name = str(body.name, MAX.name);
  const business = str(body.business, MAX.business);
  const help = str(body.help, MAX.help);
  const interestRaw = str(body.interest, 64);
  const interest = interestRaw ? interestLabel(interestRaw) : null;
  if (interestRaw && !interest) return fail('Something was wrong with that request.', 400);
  const picked = interest !== null && interestRaw !== 'not-sure';
  const method = body.method === 'email' ? 'email' : 'text';
  const contactRaw = str(body.contact, method === 'email' ? MAX.email : MAX.phone);
  const website = cleanWebsite(str(body.website, MAX.website));

  if (!name) return fail('Please add your name.', 400, 'name');
  if (!business) return fail('Please add your business name.', 400, 'business');
  if (!help && !picked) return fail('Tell me a little about what you’d like help with.', 400, 'help');
  if (website === null) return fail('That link doesn’t look right. Leave it blank if you’re not sure.', 400, 'website');

  let contact: string;
  if (method === 'text') {
    const phone = prettyPhone(contactRaw);
    if (!phone) return fail('Please enter a 10-digit US phone number.', 400, 'contact');
    contact = phone;
  } else {
    if (!EMAIL_RE.test(contactRaw)) return fail('Please enter a valid email address.', 400, 'contact');
    contact = contactRaw;
  }

  const key = clientKey(request);
  const list = recent(key);
  if (list.length >= RATE_LIMIT) {
    return fail('Too many requests from this connection. Please text or email me instead.', 429);
  }
  list.push(Date.now());
  hits.set(key, list);

  const when = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const text = [
    interest ? `🍽 New restaurant inquiry: ${interest}` : '🛠 New tech checkup request',
    `ID ${id.slice(0, 8)} · ${when}`,
    '',
    `Name: ${name}`,
    `Business: ${business}`,
    `Website/profile: ${website || '(none)'}`,
    `Reach by ${method === 'text' ? 'TEXT' : 'EMAIL'}: ${contact}`,
    '',
    interest ? 'Notes:' : 'What they want help with:',
    help || '(none)',
  ].join('\n');

  const ok = await sendTelegram(text);
  if (!ok) {
    return fail('Your request didn’t go through on my end.', 503);
  }

  delivered.set(id, Date.now());
  console.log(`[contact] delivered ${id.slice(0, 8)}`);
  return Response.json({ ok: true });
}
