import { inconclusiveNote, siteConfirmedDown } from './site-status.ts';
import type { Discovery, PlaceFacts, SiteFacts } from './types';

/**
 * Turns measured facts into the line-by-line "here's what I found" stream that
 * plays while the report is being built.
 *
 * Why this exists: the route already measures all of this and then throws it
 * away, showing the visitor four generic progress strings instead. Watching
 * something dig up real, checkable details about your own business is the
 * persuasive part — a spinner discards it.
 *
 * Truth rule (spec §5.4): every string here is derived from a measured value.
 * Nothing is inferred, and nothing is phrased by a model.
 */

const SLOW_MS = 3000;
const FAST_MS = 1200;
const GOOD_RATING = 4.3;
const STRONG_REVIEWS = 100;

/** Host without the www., for display. */
function prettyHost(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function listAnd(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/** What we learned from the Google listing alone. */
export function placeDiscoveries(place: PlaceFacts): Discovery[] {
  const out: Discovery[] = [];

  out.push({
    text: place.address ? `Found you — ${place.address}` : `Found you on Google`,
    tone: 'neutral',
  });

  if (place.rating !== null && place.reviewCount !== null) {
    const strong = place.rating >= GOOD_RATING;
    const many = place.reviewCount >= STRONG_REVIEWS;
    out.push({
      text: `${place.rating.toFixed(1)}★ from ${place.reviewCount} review${
        place.reviewCount === 1 ? '' : 's'
      }${strong && many ? ' — people clearly like you' : ''}`,
      tone: strong ? 'good' : 'bad',
    });
  }

  if (!place.website) {
    out.push({ text: 'No website on your listing at all', tone: 'bad' });
  } else {
    const host = prettyHost(place.website);
    if (host) out.push({ text: `Website on file: ${host}`, tone: 'neutral' });
  }

  if (!place.hoursSet) {
    out.push({ text: 'No opening hours on your Google listing', tone: 'bad' });
  }

  if (place.googlePhotoCount !== null && place.googlePhotoCount < 5) {
    out.push({
      text: place.googlePhotoCount === 0 ? 'No photos on your Google listing' : `Only ${place.googlePhotoCount} photo${place.googlePhotoCount === 1 ? '' : 's'} on your Google listing`,
      tone: 'bad',
    });
  }

  if (!place.phone) {
    out.push({ text: 'No phone number on your listing', tone: 'bad' });
  }

  return out;
}

/** What we learned by actually opening their site. */
export function siteDiscoveries(site: SiteFacts): Discovery[] {
  const out: Discovery[] = [];

  if (!site.checked) return out;

  if (!site.reachable) {
    // Only a failure that would hit a customer too is bad news. A 403 or a timeout to our checker is just unknown.
    out.push(
      siteConfirmedDown(site)
        ? { text: site.failureReason ?? 'The website on your listing doesn’t open', tone: 'bad' }
        : { text: inconclusiveNote(site), tone: 'neutral' }
    );
    return out;
  }

  if (site.totalMs !== null) {
    const secs = (site.totalMs / 1000).toFixed(1);
    if (site.totalMs > SLOW_MS) {
      out.push({ text: `Your site took ${secs}s to load for our checker`, tone: 'bad' });
    } else if (site.totalMs < FAST_MS) {
      out.push({ text: `Your site loaded in ${secs}s — that part's fine`, tone: 'good' });
    }
  }

  if (site.https === false) {
    out.push({ text: 'Browsers show a "Not secure" warning on your site', tone: 'bad' });
  }

  if (site.hasViewportMeta === false) {
    out.push({ text: 'No mobile setup — it renders zoomed-out on a phone', tone: 'bad' });
  }

  if (site.hasTelLink === false) {
    out.push({ text: 'No tap-to-call link on your homepage', tone: 'bad' });
  }

  if (site.menuIsPdfOrImage) {
    out.push({ text: 'Your menu is a PDF or a picture: pinch-and-zoom on a phone', tone: 'bad' });
  }

  if (site.marketplaceLinks.length > 0) {
    out.push({
      text: `Order links go to ${listAnd(site.marketplaceLinks)}`,
      tone: 'bad',
    });
  }

  if (site.directOrderingLinks.length > 0) {
    out.push({ text: 'You do have direct ordering — good', tone: 'good' });
  }

  if (site.bookingLinks.length > 0) {
    out.push({ text: 'Online booking is already wired up', tone: 'good' });
  }

  if (site.copyrightYear !== null) {
    const currentYear = new Date().getFullYear();
    if (site.copyrightYear < currentYear - 1) {
      out.push({
        text: `Footer still says © ${site.copyrightYear}`,
        tone: 'bad',
      });
    }
  }

  if (site.deadLinks.length > 0) {
    out.push({ text: `Your “${site.deadLinks[0].label}” button ${site.deadLinks[0].reason}`, tone: 'bad' });
  }

  if (site.photoCount !== null) {
    if (site.photoCount < 3) {
      out.push({ text: site.photoCount === 0 ? 'We didn’t find photos on your homepage' : `We found only ${site.photoCount} photo${site.photoCount === 1 ? '' : 's'} on your homepage`, tone: 'bad' });
    } else if (site.stockPhotoHosts.length === 0) {
      out.push({ text: `${site.photoCount} photos on your homepage`, tone: 'good' });
    }
  }

  if (site.stockPhotoHosts.length > 0) {
    out.push({ text: `Some images come from ${listAnd(site.stockPhotoHosts)}, a stock-photo library`, tone: 'bad' });
  }

  if (site.hasLocalBusinessSchema === false) {
    out.push({ text: 'Your business details aren’t spelled out for search engines', tone: 'bad' });
  }

  return out;
}
