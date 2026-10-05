import { promises as dns } from 'node:dns';
import net from 'node:net';
import { failureKindForStatus } from './site-status.ts';
import type { SiteFacts, SiteFailureKind } from './types';

/**
 * Deterministic checks against the business's own site.
 *
 * Plain fetch + HTML string matching — no headless browser (see spec §6). Every
 * value returned here is measured. A failed fetch is recorded with its kind
 * (site-status.ts decides whether that proves anything), never thrown.
 *
 * 2026-10-04: an error response (403, 500…) is no longer parsed as if it were
 * the homepage, and a page we can't read (built by JavaScript) reports
 * "not found" checks as null, not false.
 */

const TIMEOUT_MS = 8000;
const MAX_BYTES = 1_500_000;

const MARKETPLACE_HOSTS: Record<string, string> = {
  'doordash.com': 'DoorDash',
  'order.online': 'DoorDash (order.online)',
  'ubereats.com': 'Uber Eats',
  'postmates.com': 'Postmates',
  'trycaviar.com': 'Caviar',
  'grubhub.com': 'Grubhub',
  'seamless.com': 'Seamless',
  'menufy.com': 'Menufy',
  'slicelife.com': 'Slice',
};

const DIRECT_ORDER_HOSTS: Record<string, string> = {
  'toasttab.com': 'Toast',
  'chownow.com': 'ChowNow',
  'gloriafood.com': 'GloriaFood',
  'popmenu.com': 'Popmenu',
  'olo.com': 'Olo',
  'spoton.com': 'SpotOn',
  'square.site': 'Square',
  'squareup.com': 'Square',
  'clover.com': 'Clover',
  'owner.com': 'Owner.com',
};

const BOOKING_HOSTS: Record<string, string> = {
  'calendly.com': 'Calendly',
  'acuityscheduling.com': 'Acuity',
  'squarespacescheduling.com': 'Acuity',
  'mindbodyonline.com': 'Mindbody',
  'wellnessliving.com': 'WellnessLiving',
  'vagaro.com': 'Vagaro',
  'booksy.com': 'Booksy',
  'glossgenius.com': 'GlossGenius',
  'setmore.com': 'Setmore',
  'simplybook.me': 'SimplyBook',
  'fresha.com': 'Fresha',
  'opentable.com': 'OpenTable',
  'resy.com': 'Resy',
  'sevenrooms.com': 'SevenRooms',
};

const ECOM_MARKERS = [
  'cdn.shopify.com', 'shopify.com', 'woocommerce', 'bigcommerce',
  'snipcart', 'add-to-cart', 'add_to_cart', 'addtocart',
];

const SCHEMA_TYPES =
  /"@type"\s*:\s*"[^"]*(LocalBusiness|Restaurant|FoodEstablishment|Store|HealthClub|BeautySalon|DanceSchool|ExerciseGym|Gym|ProfessionalService|HomeAndConstructionBusiness)[^"]*"/i;

function emptySite(overrides: Partial<SiteFacts> = {}): SiteFacts {
  return {
    checked: false,
    reachable: false,
    finalUrl: null,
    https: null,
    status: null,
    ttfbMs: null,
    totalMs: null,
    bytes: null,
    readable: null,
    hasViewportMeta: null,
    hasTelLink: null,
    hasLocalBusinessSchema: null,
    menuIsPdfOrImage: null,
    hasOrderButton: null,
    marketplaceLinks: [],
    directOrderingLinks: [],
    bookingLinks: [],
    hasEcommerce: null,
    copyrightYear: null,
    lastModifiedYear: null,
    photoCount: null,
    stockPhotoHosts: [],
    deadLinks: [],
    scriptCount: null,
    linkCount: null,
    failureReason: null,
    failureKind: null,
    ...overrides,
  };
}

function matchHosts(html: string, table: Record<string, string>): string[] {
  const found = new Set<string>();
  for (const [host, label] of Object.entries(table)) {
    if (html.includes(host)) found.add(label);
  }
  return [...found];
}

/** Read the body with a hard byte cap so a huge page can't blow the function. */
async function readCapped(res: Response): Promise<{ text: string; bytes: number }> {
  if (!res.body) {
    const text = await res.text();
    return { text, bytes: new TextEncoder().encode(text).length };
  }

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;

  while (bytes < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      bytes += value.byteLength;
    }
  }
  await reader.cancel().catch(() => {});

  const buf = new Uint8Array(bytes);
  let offset = 0;
  for (const c of chunks) {
    const slice = c.subarray(0, Math.max(0, Math.min(c.byteLength, bytes - offset)));
    buf.set(slice, offset);
    offset += slice.byteLength;
  }

  return { text: new TextDecoder('utf-8', { fatal: false }).decode(buf), bytes };
}

const MAX_REDIRECTS = 5;

/**
 * SSRF guard.
 *
 * This function makes the server fetch a URL, and it hangs off a public,
 * unauthenticated endpoint. Unguarded, that is a request-forgery primitive:
 * point it at 169.254.169.254 and cloud metadata comes back through the report.
 * So every hostname is resolved and refused if it lands on a private, loopback,
 * or link-local address — and redirects are followed by hand, because a
 * perfectly public host can 302 straight into the private range.
 *
 * Known limit: DNS is resolved here and again by fetch, so a rebinding attack
 * could in principle slip between the two. Closing that needs IP pinning at the
 * socket, which is well past what this threat model warrants.
 */
function isBlockedV4(ip: string): boolean {
  const p = ip.split('.').map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const [a, b] = p;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 169 && b === 254) return true; // link-local + cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && (b === 0 || b === 168)) return true;
  if (a === 198 && (b === 18 || b === 19)) return true;
  if (a >= 224) return true; // multicast + reserved
  return false;
}

function isBlockedV6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === '::' || lower === '::1') return true;
  const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isBlockedV4(mapped[1]); // IPv4-mapped — judge the embedded v4
  const head = parseInt(lower.split(':')[0], 16);
  if (!Number.isFinite(head)) return true; // leading "::" — unroutable, refuse
  if ((head & 0xfe00) === 0xfc00) return true; // fc00::/7 unique-local
  if ((head & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  return false;
}

function isBlockedAddress(ip: string): boolean {
  const kind = net.isIP(ip);
  if (kind === 4) return isBlockedV4(ip);
  if (kind === 6) return isBlockedV6(ip);
  return true; // not an address we can reason about — refuse it
}

type Unsafe = { kind: SiteFailureKind; reason: string };

const NO_SUCH_SITE = 'The website address on your Google listing doesn’t lead to a website.';

/** null when the URL is safe to fetch, otherwise why not, in visitor-safe words. */
async function unsafeReason(url: URL): Promise<Unsafe | null> {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { kind: 'malformed', reason: 'That website address is not a normal web address.' };
  }

  const host = url.hostname.replace(/^\[|\]$/g, '');
  if (net.isIP(host)) {
    return isBlockedAddress(host) ? { kind: 'unsafe', reason: 'That website address points somewhere private.' } : null;
  }

  let addresses: Array<{ address: string }>;
  try {
    addresses = await dns.lookup(host, { all: true });
  } catch {
    return { kind: 'dns', reason: NO_SUCH_SITE };
  }
  if (addresses.length === 0) return { kind: 'dns', reason: NO_SUCH_SITE };
  if (addresses.some((a) => isBlockedAddress(a.address))) {
    return { kind: 'unsafe', reason: 'That website address points somewhere private.' };
  }
  return null;
}

export async function checkSite(rawUrl: string | null): Promise<SiteFacts> {
  if (!rawUrl) return emptySite({ checked: false });

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return emptySite({ checked: true, failureKind: 'malformed', failureReason: 'The listed website address is malformed.' });
  }

  const started = Date.now();
  let res: Response | null = null;
  let current = url;

  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const unsafe = await unsafeReason(current);
      if (unsafe) {
        return emptySite({
          checked: true,
          reachable: false,
          https: current.protocol === 'https:',
          failureKind: unsafe.kind,
          failureReason: unsafe.reason,
        });
      }

      const hopRes = await fetch(current, {
        redirect: 'manual',
        headers: {
          // Identify honestly. Some hosts block unknown agents outright.
          'User-Agent': 'Mozilla/5.0 (compatible; foundos-report/1.0; +https://foundos.ai)',
          Accept: 'text/html,application/xhtml+xml',
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      const location = hopRes.headers.get('location');
      if (hopRes.status >= 300 && hopRes.status < 400 && location) {
        if (hop === MAX_REDIRECTS) {
          return emptySite({
            checked: true,
            reachable: false,
            https: current.protocol === 'https:',
            failureKind: 'redirects',
            failureReason: 'Your site redirected our checker too many times to follow.',
          });
        }
        try {
          current = new URL(location, current);
        } catch {
          return emptySite({
            checked: true,
            reachable: false,
            https: current.protocol === 'https:',
            failureKind: 'malformed',
            failureReason: 'Your site redirects to a malformed address.',
          });
        }
        continue;
      }

      res = hopRes;
      break;
    }
  } catch (err) {
    const timedOut = err instanceof Error && /timeout|abort/i.test(err.message);
    return emptySite({
      checked: true,
      reachable: false,
      https: current.protocol === 'https:',
      failureKind: timedOut ? 'timeout' : 'network',
      failureReason: timedOut
        ? `Your site didn't finish loading for our checker within ${TIMEOUT_MS / 1000} seconds.`
        : "Your site didn't respond to our checker.",
    });
  }

  if (!res) {
    return emptySite({
      checked: true,
      reachable: false,
      https: current.protocol === 'https:',
      failureKind: 'network',
      failureReason: "Your site didn't respond to our checker.",
    });
  }

  const ttfbMs = Date.now() - started;

  // An error response is the server's error page, not the homepage. Reading it as the homepage is what produced
  // "no tap-to-call, no ordering, not mobile-ready" for a site that had all three.
  if (!res.ok) {
    await res.body?.cancel().catch(() => {});
    const kind = failureKindForStatus(res.status);
    return emptySite({
      checked: true,
      reachable: false,
      finalUrl: current.toString(),
      https: current.protocol === 'https:',
      status: res.status,
      ttfbMs,
      failureKind: kind,
      failureReason:
        kind === 'not_found'
          ? 'The homepage on your Google listing returns “page not found.”'
          : kind === 'blocked'
            ? `Your site turned away our automated check (it answered ${res.status}).`
            : `Your site answered our checker with a ${res.status} error.`,
    });
  }
  const { text: html, bytes } = await readCapped(res);
  const totalMs = Date.now() - started;
  const finalUrl = current.toString();
  const lower = html.toLowerCase();

  const copyrightMatch = html.match(
    /(?:©|&copy;|copyright)\s*(?:\d{4}\s*[–—-]\s*)?(20\d{2})/i
  );

  const pageText = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // A page built by JavaScript shows almost nothing in its raw HTML. Counting photos or buttons on it would lie.
  const readable = pageText.length >= 300;
  const lastModified = Date.parse(res.headers.get('last-modified') ?? '');
  /** Found = true. Not found on a readable page = false. Not found on a page we can't read = unknown. */
  const seen = (found: boolean): boolean | null => (found ? true : readable ? false : null);

  const menuPdf =
    // A PDF link whose text mentions the menu. (The old pattern's bare "menu…</a>" branch flagged every Menu link.)
    /<a[^>]*href=["'][^"']*\.pdf(?:[?#][^"']*)?["'][^>]*>(?:(?!<\/a>)[\s\S]){0,200}?menu/i.test(html) ||
    /href=["'][^"']*menu[^"']*\.pdf/i.test(html) ||
    /<img[^>]+(?:src|alt)="[^"]*menu[^"]*\.(?:jpe?g|png|webp)"/i.test(html);

  return {
    checked: true,
    reachable: true,
    finalUrl,
    https: finalUrl.startsWith('https:'),
    status: res.status,
    ttfbMs,
    totalMs,
    bytes,
    readable,
    // The viewport tag lives in <head> even on JavaScript-built pages, so its absence is real.
    hasViewportMeta: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasTelLink: seen(/href=["']tel:/i.test(html)),
    hasLocalBusinessSchema: seen(SCHEMA_TYPES.test(html)),
    menuIsPdfOrImage: menuPdf ? true : readable ? false : null,
    hasOrderButton: seen(hasOrderButton(html)),
    marketplaceLinks: matchHosts(lower, MARKETPLACE_HOSTS),
    directOrderingLinks: matchHosts(lower, DIRECT_ORDER_HOSTS),
    bookingLinks: matchHosts(lower, BOOKING_HOSTS),
    hasEcommerce: ECOM_MARKERS.some((m) => lower.includes(m)),
    copyrightYear: copyrightMatch ? Number(copyrightMatch[1]) : null,
    lastModifiedYear: Number.isNaN(lastModified) ? null : new Date(lastModified).getUTCFullYear(),
    photoCount: readable ? countPhotos(html) : null,
    stockPhotoHosts: matchHosts(lower, STOCK_HOSTS),
    deadLinks: readable ? [...deadButtons(html), ...(await brokenLinks(html, current))].slice(0, 4) : [],
    scriptCount: (html.match(/<script\b/gi) ?? []).length,
    linkCount: new Set([...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)].map((m) => m[1])).size,
    failureReason: null,
    failureKind: null,
  };
}

// ---- Photos, dead buttons, broken links ------------------------------------

const STOCK_HOSTS: Record<string, string> = {
  'unsplash.com': 'Unsplash',
  'shutterstock.com': 'Shutterstock',
  'istockphoto.com': 'iStock',
  'gettyimages.com': 'Getty Images',
  'pexels.com': 'Pexels',
  'pixabay.com': 'Pixabay',
  'stock.adobe.com': 'Adobe Stock',
  'depositphotos.com': 'Depositphotos',
  'dreamstime.com': 'Dreamstime',
};

/** Words on the buttons a customer actually needs. A dead one of these is a lost order or booking. */
const ACTION_WORDS = /\b(order|menu|book|reserv|catering|gift|delivery|pickup|pick up|directions|call|contact)/i;

/** Images that are not photos: logos, icons, sprites, tracking pixels. */
const NOT_A_PHOTO = /logo|icon|sprite|favicon|badge|pixel|spacer|blank|placeholder|\.svg|\.gif|data:image/i;

function countPhotos(html: string): number {
  let n = 0;
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = tag.match(/\b(?:data-src|src|srcset)=["']([^"']+)["']/i)?.[1] ?? '';
    const width = Number(tag.match(/\bwidth=["']?(\d+)/i)?.[1] ?? 0);
    if (!src || NOT_A_PHOTO.test(src) || (width > 0 && width < 80)) continue;
    n++;
  }
  for (const m of html.matchAll(/background(?:-image)?\s*:[^;"']*url\(\s*['"]?([^)'"]+)/gi)) {
    if (/\.(jpe?g|png|webp|avif)/i.test(m[1]) && !NOT_A_PHOTO.test(m[1])) n++;
  }
  return n;
}

/** Words on a link or button that mean "order food here". */
const ORDER_WORDS = /\b(order|pick ?up|take ?out|delivery|delivered)\b/i;

function hasOrderButton(html: string): boolean {
  for (const m of html.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    if (ORDER_WORDS.test(stripTags(m[2]).slice(0, 60))) return true;
  }
  return false;
}

const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

/** "Order Online" buttons whose link is empty, "#" or javascript:. Menu toggles and modals are skipped. */
function deadButtons(html: string) {
  const out: { label: string; reason: string }[] = [];
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = m[1];
    const href = attrs.match(/\bhref=["']([^"']*)["']/i);
    const dead = !href || href[1].trim() === '' || href[1].trim() === '#' || /^javascript:/i.test(href[1].trim());
    if (!dead) continue;
    // Toggles, popups and tabs legitimately use "#".
    if (/\b(?:role=["']button|aria-controls|aria-expanded|aria-haspopup|data-(?:toggle|bs-toggle|target|modal|popup)|onclick)/i.test(attrs)) continue;
    // The phone hamburger: an icon link labelled "Menu" that opens the navigation, not the food menu.
    if (
      /\baria-label=["'][^"']*(?:menu|nav)/i.test(attrs) ||
      /\bclass=["'][^"']*(?:burger|toggle|mobile-menu|dropdown)/i.test(attrs)
    )
      continue;
    const label = stripTags(m[2]).slice(0, 40);
    if (!label || !ACTION_WORDS.test(label)) continue;
    if (out.some((o) => o.label.toLowerCase() === label.toLowerCase())) continue;
    out.push({ label, reason: 'goes nowhere when tapped' });
  }
  return out.slice(0, 3);
}

/**
 * Follow the homepage's own links, plus outside links on order/menu/book buttons, and report the ones that
 * error. Each URL passes the same SSRF guard as the homepage. HEAD first; a server that refuses HEAD gets a GET.
 */
async function brokenLinks(html: string, base: URL) {
  const seen = new Set<string>();
  const internal: { url: URL; label: string }[] = [];
  const external: { url: URL; label: string }[] = [];

  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    let url: URL;
    try {
      url = new URL(m[1], base);
    } catch {
      continue;
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') continue;
    url.hash = '';
    const key = url.toString();
    if (seen.has(key) || key === base.toString()) continue;
    seen.add(key);
    const label = stripTags(m[2]).slice(0, 40) || url.pathname;
    if (url.hostname === base.hostname) internal.push({ url, label });
    else if (ACTION_WORDS.test(label)) external.push({ url, label });
  }

  // Customer-path links first, so a capped check still covers the menu and order pages.
  const byAction = (a: { label: string }, b: { label: string }) => Number(ACTION_WORDS.test(b.label)) - Number(ACTION_WORDS.test(a.label));
  const targets = [...internal.sort(byAction).slice(0, 6), ...external.slice(0, 2)];

  const results = await Promise.all(
    targets.map(async ({ url, label }) => {
      if (await unsafeReason(url)) return null;
      const opts = {
        redirect: 'manual' as const,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; foundos-report/1.0; +https://foundos.ai)' },
      };
      try {
        let r = await fetch(url, { ...opts, method: 'HEAD', signal: AbortSignal.timeout(4000) });
        if (r.status === 405 || r.status === 403 || r.status === 501) {
          r = await fetch(url, { ...opts, method: 'GET', signal: AbortSignal.timeout(4000) });
          await r.body?.cancel().catch(() => {});
        }
        if (r.status === 404 || r.status === 410 || r.status >= 500) {
          return { label, reason: r.status === 404 || r.status === 410 ? 'leads to a “page not found”' : `returns a ${r.status} error` };
        }
      } catch {
        /* A slow or refused link is not proof it's broken. Say nothing. */
      }
      return null;
    })
  );
  return results.filter((r): r is { label: string; reason: string } => r !== null).slice(0, 3);
}
