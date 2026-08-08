import { promises as dns } from 'node:dns';
import net from 'node:net';
import type { SiteFacts } from './types';

/**
 * Deterministic checks against the business's own site.
 *
 * Plain fetch + HTML string matching — no headless browser (see spec §6). Every
 * value returned here is measured. A failed fetch is itself a finding, not an
 * error, so this function never throws.
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

/** null when the URL is safe to fetch, otherwise a visitor-safe reason. */
async function unsafeReason(url: URL): Promise<string | null> {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return 'That website address is not a normal web address.';
  }

  const host = url.hostname.replace(/^\[|\]$/g, '');
  if (net.isIP(host)) {
    return isBlockedAddress(host) ? 'That website address points somewhere private.' : null;
  }

  let addresses: Array<{ address: string }>;
  try {
    addresses = await dns.lookup(host, { all: true });
  } catch {
    return "I couldn't find that website address.";
  }
  if (addresses.length === 0) return "I couldn't find that website address.";
  if (addresses.some((a) => isBlockedAddress(a.address))) {
    return 'That website address points somewhere private.';
  }
  return null;
}

export async function checkSite(rawUrl: string | null): Promise<SiteFacts> {
  if (!rawUrl) return emptySite({ checked: false });

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return emptySite({ checked: true, failureReason: 'The listed website address is malformed.' });
  }

  const started = Date.now();
  let res: Response | null = null;
  let current = url;

  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const reason = await unsafeReason(current);
      if (reason) {
        return emptySite({
          checked: true,
          reachable: false,
          https: current.protocol === 'https:',
          failureReason: reason,
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
            failureReason: 'Your site redirects too many times to follow.',
          });
        }
        try {
          current = new URL(location, current);
        } catch {
          return emptySite({
            checked: true,
            reachable: false,
            https: current.protocol === 'https:',
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
      failureReason: timedOut
        ? `Your site didn't finish loading within ${TIMEOUT_MS / 1000} seconds.`
        : "Your site didn't respond when I tried to load it.",
    });
  }

  if (!res) {
    return emptySite({
      checked: true,
      reachable: false,
      https: current.protocol === 'https:',
      failureReason: "Your site didn't respond when I tried to load it.",
    });
  }

  const ttfbMs = Date.now() - started;
  const { text: html, bytes } = await readCapped(res);
  const totalMs = Date.now() - started;
  const finalUrl = current.toString();
  const lower = html.toLowerCase();

  const copyrightMatch = html.match(
    /(?:©|&copy;|copyright)\s*(?:\d{4}\s*[–—-]\s*)?(20\d{2})/i
  );

  const menuPdf =
    /<a[^>]+href="[^"]*\.pdf"[^>]*>[^<]*menu|menu[^<]*<\/a>/i.test(html) ||
    /href="[^"]*menu[^"]*\.pdf"/i.test(html) ||
    /<img[^>]+(?:src|alt)="[^"]*menu[^"]*\.(?:jpe?g|png|webp)"/i.test(html);

  return {
    checked: true,
    reachable: res.ok,
    finalUrl,
    https: finalUrl.startsWith('https:'),
    status: res.status,
    ttfbMs,
    totalMs,
    bytes,
    hasViewportMeta: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasTelLink: /href=["']tel:/i.test(html),
    hasLocalBusinessSchema: SCHEMA_TYPES.test(html),
    menuIsPdfOrImage: menuPdf,
    marketplaceLinks: matchHosts(lower, MARKETPLACE_HOSTS),
    directOrderingLinks: matchHosts(lower, DIRECT_ORDER_HOSTS),
    bookingLinks: matchHosts(lower, BOOKING_HOSTS),
    hasEcommerce: ECOM_MARKERS.some((m) => lower.includes(m)),
    copyrightYear: copyrightMatch ? Number(copyrightMatch[1]) : null,
    failureReason: res.ok ? null : `Your site returned a ${res.status} error.`,
  };
}
