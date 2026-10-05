import type { SiteFacts, SiteFailureKind } from './types';

/**
 * What a site fetch actually proves (2026-10-04 audit-accuracy pass).
 *
 * The bug this fixes: a scan of a real diner got an HTTP 403 (its host turns away automated visitors), and the
 * score then marked Website, Mobile, Local search and Direct ordering all "Missing". One refused fetch became four
 * negative findings about a site customers open every day. The rule now:
 *
 *   - inspected   we read the homepage, so its checks are real results
 *   - confirmedDown  it fails for everyone (no such address, homepage 404, private address, malformed URL)
 *   - inconclusive   it failed for our checker only as far as we can tell. Nothing that depends on the page is
 *                    scored, and nothing negative is said about it. Josh checks it by hand.
 */

const CONFIRMED_DOWN: ReadonlySet<SiteFailureKind> = new Set(['dns', 'not_found', 'unsafe', 'malformed']);

/** The usual bot walls. LinkedIn-style 999 included. */
const BLOCKED_STATUSES = new Set([401, 403, 406, 429, 451, 999]);

export function failureKindForStatus(status: number): SiteFailureKind {
  if (BLOCKED_STATUSES.has(status)) return 'blocked';
  if (status === 404 || status === 410) return 'not_found';
  if (status >= 500) return 'server_error';
  return 'http_error';
}

/** We fetched the homepage and got a normal page back. */
export function siteInspected(site: SiteFacts): boolean {
  return site.checked && site.reachable;
}

/** The site fails in a way a customer's own phone would hit too. */
export function siteConfirmedDown(site: SiteFacts): boolean {
  return site.checked && !site.reachable && site.failureKind !== null && CONFIRMED_DOWN.has(site.failureKind);
}

/** There is a website, and we couldn't tell whether it works. */
export function siteInconclusive(site: SiteFacts, hasWebsite: boolean): boolean {
  return hasWebsite && !siteInspected(site) && !siteConfirmedDown(site);
}

/** One owner-language line for an inconclusive check. Never says the site is down. */
export function inconclusiveNote(site: SiteFacts): string {
  const code = site.status ? ` (it answered ${site.status})` : '';
  switch (site.failureKind) {
    case 'blocked':
      return `Your site turned away our automated check${code}. Plenty of sites block automated visitors, so this doesn’t mean customers can’t open it. Josh checks it by hand.`;
    case 'timeout':
      return 'Your site didn’t finish loading for our checker in time. That can be a slow server or a one-off hiccup, so Josh checks it by hand.';
    case 'server_error':
      return `Your site sent our checker a server error${code}. It may be temporary, so Josh checks it by hand.`;
    case 'redirects':
      return 'Your site redirected our checker more times than it follows. Josh checks it in a normal browser.';
    case 'network':
      return 'Our checker couldn’t connect to your site. That can be temporary, so Josh checks it by hand.';
    default:
      return `Our checker couldn’t read your site${code}, so this wasn’t verified. Josh checks it by hand.`;
  }
}
