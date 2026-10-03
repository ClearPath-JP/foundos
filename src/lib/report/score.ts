import type { Facts, GrowthScore, ScoreArea, ScoreStatus } from './types';

/**
 * The foundos Growth Score — added 2026-10-03 for the /audit page.
 *
 * Same truth rule as findings.ts: every status comes from a measured fact, and
 * an area we can't see from the outside says so instead of guessing. Follow-up
 * is never scored, because nothing public shows whether an owner answers a
 * catering inquiry; the full audit asks.
 *
 * Scoring is deliberately plain: each measured area is worth the same, a pass
 * is full marks, a warning is half, a fail is zero, scaled to 100. It's a quick
 * outside check, and the page says that next to the number.
 */

const SLOW_MS = 3000;
const LOW_REVIEWS = 25;
const LOW_RATING = 4.3;

function area(key: string, label: string, status: ScoreStatus, note: string): ScoreArea {
  return { key, label, status, note };
}

export function growthScore({ place, site }: Facts): GrowthScore {
  const hasSite = Boolean(place.website);
  const siteUp = hasSite && site.reachable;
  const currentYear = new Date().getFullYear();
  const areas: ScoreArea[] = [];

  // Website
  if (!hasSite) areas.push(area('website', 'Website', 'fail', 'No website on your Google listing.'));
  else if (!siteUp) areas.push(area('website', 'Website', 'fail', 'Your website didn’t load when we checked it.'));
  else if (site.https === false)
    areas.push(area('website', 'Website', 'warn', 'Browsers mark your site “Not secure.”'));
  else if (site.copyrightYear !== null && site.copyrightYear < currentYear - 1)
    areas.push(area('website', 'Website', 'warn', `Your footer still says ${site.copyrightYear}.`));
  else areas.push(area('website', 'Website', 'pass', 'Your site loads and is secure.'));

  // Mobile
  if (!siteUp) areas.push(area('mobile', 'Mobile experience', 'fail', 'Nothing to open on a phone yet.'));
  else if (site.hasViewportMeta === false)
    areas.push(area('mobile', 'Mobile experience', 'fail', 'Your site isn’t set up for phones.'));
  else if (site.totalMs !== null && site.totalMs > SLOW_MS)
    areas.push(
      area('mobile', 'Mobile experience', 'warn', `It took ${(site.totalMs / 1000).toFixed(1)} seconds to load.`)
    );
  else if (site.hasTelLink === false)
    areas.push(area('mobile', 'Mobile experience', 'warn', 'No tap-to-call button for phone visitors.'));
  else areas.push(area('mobile', 'Mobile experience', 'pass', 'Phone-ready, with tap-to-call.'));

  // Google listing
  if (!place.hoursSet) areas.push(area('google', 'Google presence', 'fail', 'No opening hours on your listing.'));
  else if (place.category === 'restaurant' && place.takeout === null && place.delivery === null)
    areas.push(area('google', 'Google presence', 'warn', 'Your listing doesn’t say if you do takeout.'));
  else areas.push(area('google', 'Google presence', 'pass', 'Hours and basics are on your listing.'));

  // Local search
  if (!siteUp) areas.push(area('seo', 'Local search', 'fail', 'Without a site, Google only has your listing.'));
  else if (site.menuIsPdfOrImage)
    areas.push(area('seo', 'Local search', 'warn', 'Your menu is a PDF or image Google can’t read.'));
  else if (site.hasLocalBusinessSchema === false)
    areas.push(area('seo', 'Local search', 'warn', 'No business markup telling Google who you are.'));
  else areas.push(area('seo', 'Local search', 'pass', 'Google can read who you are and what you serve.'));

  // Direct ordering (restaurants only)
  if (place.category === 'restaurant') {
    const apps = site.marketplaceLinks;
    if (site.directOrderingLinks.length > 0)
      areas.push(area('ordering', 'Direct ordering', 'pass', 'Customers can order from you directly.'));
    else if (apps.length > 0)
      areas.push(
        area('ordering', 'Direct ordering', 'fail', `Orders go through ${apps.join(', ')}, and the app takes a cut.`)
      );
    else if (siteUp)
      areas.push(area('ordering', 'Direct ordering', 'fail', 'No way to order from your site.'));
    else areas.push(area('ordering', 'Direct ordering', 'fail', 'No site to take orders on.'));
  }

  // Reviews
  if (place.rating === null || place.reviewCount === null)
    areas.push(area('reviews', 'Reviews', 'unknown', 'Google didn’t return your reviews.'));
  else if (place.rating < LOW_RATING)
    areas.push(area('reviews', 'Reviews', 'warn', `${place.rating.toFixed(1)} stars. Below 4.3 people scroll past.`));
  else if (place.reviewCount < LOW_REVIEWS)
    areas.push(area('reviews', 'Reviews', 'warn', `Only ${place.reviewCount} reviews so far.`));
  else
    areas.push(
      area('reviews', 'Reviews', 'pass', `${place.rating.toFixed(1)} stars from ${place.reviewCount} reviews.`)
    );

  // Follow-up: not visible from outside, never scored.
  areas.push(area('followup', 'Customer follow-up', 'unknown', 'Can’t be seen from outside. The full audit covers it.'));

  const scored = areas.filter((a) => a.status !== 'unknown');
  const points = scored.reduce((sum, a) => sum + (a.status === 'pass' ? 1 : a.status === 'warn' ? 0.5 : 0), 0);
  const score = scored.length ? Math.round((points / scored.length) * 100) : 0;
  const opportunities = scored.filter((a) => a.status !== 'pass').length;

  return { score, areas, opportunities };
}
