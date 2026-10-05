import { inconclusiveNote, siteConfirmedDown, siteInconclusive, siteInspected } from './site-status.ts';
import type { Facts, GrowthScore, ScoreArea, ScoreStatus } from './types';

/**
 * The foundos Growth Score — added 2026-10-03 for the /audit page, made honest about what it couldn't see on
 * 2026-10-04.
 *
 * Every area ends in one of five states (types.ts ScoreStatus):
 *   pass / warn / fail — a verified result
 *   unknown            — we tried and couldn't verify (site turned our checker away, timed out, or can't be read)
 *   manual             — not visible from outside at all; Josh reviews it
 *
 * Scoring: each verified area is worth the same, a pass is full marks, a warning half, a fail zero, scaled to 100.
 * unknown and manual are left out, never counted as failures. When the website itself couldn't be verified, or
 * fewer than MIN_VERIFIED areas could, the number is withheld and the card says why: a score built on three
 * listing facts would be presented as a verdict on a website nobody looked at.
 */

const SLOW_MS = 3000;
const LOW_REVIEWS = 25;
const LOW_RATING = 4.3;
export const MIN_VERIFIED = 4;

function area(key: string, label: string, status: ScoreStatus, note: string): ScoreArea {
  return { key, label, status, note };
}

const NOT_VERIFIED = 'We couldn’t open your site, so this wasn’t checked. Josh checks it by hand.';
const CANT_READ = 'Your site builds its pages with scripts our checker can’t read, so Josh checks this by hand.';

export function growthScore({ place, site }: Facts): GrowthScore {
  const hasSite = Boolean(place.website);
  const inspected = hasSite && siteInspected(site);
  const down = hasSite && siteConfirmedDown(site);
  const inconclusive = siteInconclusive(site, hasSite);
  const readable = inspected && site.readable === true;
  const currentYear = new Date().getFullYear();
  const areas: ScoreArea[] = [];

  // Website
  if (!hasSite) areas.push(area('website', 'Website', 'fail', 'No website on your Google listing.'));
  else if (down)
    areas.push(area('website', 'Website', 'fail', site.failureReason ?? 'The website on your Google listing doesn’t open.'));
  else if (inconclusive) areas.push(area('website', 'Website', 'unknown', inconclusiveNote(site)));
  else if (site.deadLinks.length > 0)
    areas.push(
      area('website', 'Website', 'fail', `Your “${site.deadLinks[0].label}” button ${site.deadLinks[0].reason}.`)
    );
  else if (site.https === false)
    areas.push(area('website', 'Website', 'warn', 'Browsers mark your site “Not secure.”'));
  else if (site.copyrightYear !== null && site.copyrightYear < currentYear - 1)
    areas.push(area('website', 'Website', 'warn', `Your footer still says © ${site.copyrightYear}. Small, but visitors notice dated details.`));
  else if (site.lastModifiedYear !== null && site.lastModifiedYear < currentYear - 1)
    areas.push(area('website', 'Website', 'warn', `Your web server says the homepage was last changed in ${site.lastModifiedYear}.`));
  else if (!readable)
    areas.push(area('website', 'Website', 'pass', 'Your site loads and it’s secure. Josh checks the buttons by hand.'));
  else areas.push(area('website', 'Website', 'pass', 'Your site loads, it’s secure, and the links we tried work.'));

  // Mobile
  if (!hasSite) areas.push(area('mobile', 'Mobile experience', 'fail', 'No website to open on a phone yet.'));
  else if (down) areas.push(area('mobile', 'Mobile experience', 'fail', 'Your site doesn’t open, so there’s nothing to use on a phone.'));
  else if (inconclusive) areas.push(area('mobile', 'Mobile experience', 'unknown', NOT_VERIFIED));
  else if (site.hasViewportMeta === false)
    areas.push(area('mobile', 'Mobile experience', 'fail', 'Your site isn’t set up for phone screens, so it shows zoomed out.'));
  else if (site.totalMs !== null && site.totalMs > SLOW_MS)
    areas.push(
      area('mobile', 'Mobile experience', 'warn', `It took ${(site.totalMs / 1000).toFixed(1)} seconds to load for our checker.`)
    );
  else if (site.hasTelLink === false)
    areas.push(area('mobile', 'Mobile experience', 'warn', 'No tap-to-call link on your homepage.'));
  else if ((site.bytes ?? 0) >= 1_200_000 || (site.scriptCount ?? 0) >= 35)
    areas.push(area('mobile', 'Mobile experience', 'warn', 'Your homepage is heavy for a phone on cell signal.'));
  else if (site.hasTelLink === null)
    areas.push(area('mobile', 'Mobile experience', 'pass', 'Set up for phone screens. Josh checks tap-to-call by hand.'));
  else areas.push(area('mobile', 'Mobile experience', 'pass', 'Set up for phone screens, with tap-to-call.'));

  // Photos: counted on the homepage and the Google listing. Quality and whose food it is can't be measured.
  const gPhotos = place.googlePhotoCount;
  const sitePhotos = readable ? site.photoCount : null;
  if (sitePhotos !== null && sitePhotos < 3)
    areas.push(
      area('photos', 'Photos', 'warn', sitePhotos === 0 ? 'We didn’t find any photos on your homepage.' : `We found only ${sitePhotos} photo${sitePhotos === 1 ? '' : 's'} on your homepage.`)
    );
  else if (gPhotos !== null && gPhotos < 5)
    areas.push(area('photos', 'Photos', 'warn', `Your Google listing has ${gPhotos} photo${gPhotos === 1 ? '' : 's'}.`));
  else if (inspected && site.stockPhotoHosts.length > 0)
    areas.push(area('photos', 'Photos', 'warn', `Some images on your site come from ${site.stockPhotoHosts.join(', ')}, a stock-photo library.`));
  else if (sitePhotos !== null)
    areas.push(area('photos', 'Photos', 'pass', `Photos on your site and your Google listing. Josh looks at them by hand.`));
  else if (gPhotos !== null && gPhotos >= 5)
    areas.push(area('photos', 'Photos', 'pass', 'Your Google listing has photos.'));
  else areas.push(area('photos', 'Photos', 'unknown', 'We couldn’t count your photos. Josh looks by hand.'));

  // Google listing
  if (!place.hoursSet) areas.push(area('google', 'Google presence', 'fail', 'No opening hours on your Google listing.'));
  else if (place.category === 'restaurant' && place.takeout === null && place.delivery === null)
    areas.push(area('google', 'Google presence', 'warn', 'Your listing doesn’t say whether you do takeout or delivery.'));
  else areas.push(area('google', 'Google presence', 'pass', 'Hours and basics are on your listing.'));

  // Local search
  if (!hasSite) areas.push(area('seo', 'Local search', 'fail', 'Without a website, search engines only have your Google listing.'));
  else if (down) areas.push(area('seo', 'Local search', 'fail', 'Your site doesn’t open, so search engines only have your listing.'));
  else if (inconclusive) areas.push(area('seo', 'Local search', 'unknown', NOT_VERIFIED));
  else if (site.menuIsPdfOrImage)
    areas.push(area('seo', 'Local search', 'warn', 'Your menu is a PDF or a picture. On a phone that means pinching and zooming, and it’s harder to keep current than a menu page.'));
  else if (site.hasLocalBusinessSchema === false)
    areas.push(area('seo', 'Local search', 'warn', 'Your homepage doesn’t spell out your business details (hours, address, type) in the format search engines read.'));
  else if (site.hasLocalBusinessSchema === null) areas.push(area('seo', 'Local search', 'manual', CANT_READ));
  else areas.push(area('seo', 'Local search', 'pass', 'Your homepage spells out who you are for search engines.'));

  // Direct ordering (restaurants only)
  if (place.category === 'restaurant') {
    const apps = site.marketplaceLinks;
    const label = 'Direct ordering';
    if (!hasSite) areas.push(area('ordering', label, 'fail', 'No website of your own to take orders on.'));
    else if (down) areas.push(area('ordering', label, 'fail', 'Your site doesn’t open, so it can’t take orders.'));
    else if (inconclusive) areas.push(area('ordering', label, 'unknown', NOT_VERIFIED));
    else if (site.directOrderingLinks.length > 0)
      areas.push(area('ordering', label, 'pass', `We found your own ordering (${site.directOrderingLinks.join(', ')}).`));
    else if (apps.length > 0)
      areas.push(area('ordering', label, 'fail', `Your order links go to ${apps.join(', ')}, which charge${apps.length === 1 ? 's' : ''} a commission, and we didn’t find ordering of your own.`));
    else if (site.hasOrderButton === true)
      areas.push(area('ordering', label, 'manual', 'There’s an order button on your site going somewhere we don’t recognise. Josh checks where it goes.'));
    else if (site.hasOrderButton === false)
      areas.push(area('ordering', label, 'fail', 'We didn’t find any way to order on your homepage.'));
    else areas.push(area('ordering', label, 'manual', CANT_READ));
  }

  // Reviews
  if (place.rating === null || place.reviewCount === null)
    areas.push(area('reviews', 'Reviews', 'unknown', 'Google didn’t return your reviews to our checker.'));
  else if (place.rating < LOW_RATING)
    areas.push(area('reviews', 'Reviews', 'warn', `${place.rating.toFixed(1)} stars from ${place.reviewCount} Google reviews.`));
  else if (place.reviewCount < LOW_REVIEWS)
    areas.push(area('reviews', 'Reviews', 'warn', `${place.rating.toFixed(1)} stars, from ${place.reviewCount} Google reviews so far.`));
  else
    areas.push(
      area('reviews', 'Reviews', 'pass', `${place.rating.toFixed(1)} stars from ${place.reviewCount} reviews.`)
    );

  // Follow-up: not visible from outside, never scored.
  areas.push(area('followup', 'Customer follow-up', 'manual', 'Can’t be seen from outside. Josh asks about it in the full audit.'));

  const verifiedAreas = areas.filter((a) => a.status === 'pass' || a.status === 'warn' || a.status === 'fail');
  const verified = verifiedAreas.length;
  const total = areas.length;
  const opportunities = verifiedAreas.filter((a) => a.status !== 'pass').length;

  const websiteUnverified = areas[0].status === 'unknown';
  if (websiteUnverified || verified < MIN_VERIFIED) {
    return {
      score: null,
      withheldReason: websiteUnverified
        ? `We couldn’t open your website automatically, so a score would mostly be guessing. We verified ${verified} of ${total} areas. Josh checks the rest by hand.`
        : `We could only verify ${verified} of ${total} areas automatically, too few for a fair score. Josh checks the rest by hand.`,
      verified,
      total,
      areas,
      opportunities,
    };
  }

  const points = verifiedAreas.reduce((sum, a) => sum + (a.status === 'pass' ? 1 : a.status === 'warn' ? 0.5 : 0), 0);
  return {
    score: Math.round((points / verified) * 100),
    withheldReason: null,
    verified,
    total,
    areas,
    opportunities,
  };
}
