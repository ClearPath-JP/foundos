import { siteConfirmedDown, siteInspected } from './site-status.ts';
import type {
  DeterministicFinding,
  Facts,
  ReportBuild,
  ReportFinding,
  TapFallbackInput,
} from './types';

/**
 * The truth layer.
 *
 * Every `fact` string produced here is derived from a measured value. The model
 * downstream may re-rank and re-phrase, but it is given these facts as its only
 * source of figures (spec §5.4). If the model call fails we render these
 * directly, which is why each one is already readable on its own.
 *
 * 2026-10-04 accuracy pass: a site our checker couldn't open (403, timeout,
 * server error) produces no finding at all, because that isn't proof customers
 * can't open it. "Not found" claims only fire on a page we could actually read.
 * Claims the code can't measure (Google can't read PDFs, a dated footer means
 * closed, X% of visitors are on phones) are gone.
 */

const SLOW_MS = 3000;
const LOW_REVIEWS = 25;
const LOW_RATING = 4.3;

export function deriveFindings(facts: Facts): DeterministicFinding[] {
  const { place, site } = facts;
  const out: DeterministicFinding[] = [];
  const currentYear = new Date().getFullYear();

  // ---- Universal ----------------------------------------------------------

  if (!place.website) {
    out.push({
      code: 'no_website',
      weight: 100,
      fact: 'Your Google listing has no website on it.',
      metric: 'No site',
    });
  } else if (siteConfirmedDown(site)) {
    out.push({
      code: 'site_unreachable',
      weight: 95,
      fact: site.failureReason ?? 'The website on your Google listing doesn’t open.',
      metric: site.status ? `HTTP ${site.status}` : 'Doesn’t open',
    });
  }

  const siteUp = Boolean(place.website) && siteInspected(site);
  /** The page's own text was readable, so "we didn't find X" means X isn't there. */
  const readable = siteUp && site.readable === true;

  if (siteUp) {
    if (site.https === false) {
      out.push({
        code: 'no_https',
        weight: 70,
        fact: 'Your site loads over an insecure connection, so browsers show visitors a "Not secure" warning.',
        metric: 'No HTTPS',
      });
    }
    if (site.hasViewportMeta === false) {
      out.push({
        code: 'no_viewport',
        weight: 65,
        fact: 'Your site isn’t set up for phone screens, so on a phone it shows zoomed out and visitors have to pinch to read it.',
        metric: 'Not mobile-ready',
      });
    }
    if (site.hasTelLink === false) {
      out.push({
        code: 'no_tel',
        weight: 60,
        fact: 'We didn’t find a tap-to-call link on your homepage, so a visitor on a phone has to copy your number by hand.',
        metric: 'No tap-to-call',
      });
    }
    if (site.totalMs !== null && site.totalMs > SLOW_MS) {
      out.push({
        code: 'slow',
        weight: 50,
        fact: `Your site took ${(site.totalMs / 1000).toFixed(1)} seconds to load for our checker.`,
        metric: `${(site.totalMs / 1000).toFixed(1)}s load`,
      });
    }
    if (site.hasLocalBusinessSchema === false) {
      out.push({
        code: 'no_schema',
        weight: 30,
        fact: 'Your homepage doesn’t spell out your hours, address and type of business in the format search engines read.',
        metric: 'No markup',
      });
    }
    if (site.copyrightYear !== null && site.copyrightYear < currentYear - 1) {
      out.push({
        code: 'stale',
        weight: 25,
        fact: `The footer on your site still says © ${site.copyrightYear}.`,
        metric: `© ${site.copyrightYear}`,
      });
    } else if (site.lastModifiedYear !== null && site.lastModifiedYear < currentYear - 1) {
      out.push({
        code: 'stale',
        weight: 25,
        fact: `Your homepage was last changed in ${site.lastModifiedYear}, according to your own web server.`,
        metric: `Updated ${site.lastModifiedYear}`,
      });
    }
    if (site.deadLinks.length > 0) {
      const d = site.deadLinks[0];
      const more = site.deadLinks.length - 1;
      out.push({
        code: 'dead_buttons',
        weight: 75,
        fact: `Your “${d.label}” button ${d.reason}${more > 0 ? `, and ${more} more link${more === 1 ? '' : 's'} on your homepage ${more === 1 ? 'is' : 'are'} broken too` : ''}.`,
        metric: `${site.deadLinks.length} broken`,
      });
    }
    if (readable && site.photoCount !== null && site.photoCount < 3) {
      out.push({
        code: 'few_photos',
        weight: 52,
        fact:
          site.photoCount === 0
            ? 'We didn’t find any photos on your homepage.'
            : `We found only ${site.photoCount} photo${site.photoCount === 1 ? '' : 's'} on your homepage.`,
        metric: `${site.photoCount} photo${site.photoCount === 1 ? '' : 's'}`,
      });
    } else if (site.stockPhotoHosts.length > 0) {
      out.push({
        code: 'stock_photos',
        weight: 40,
        fact: `Some images on your site come from ${listAnd(site.stockPhotoHosts)}, a stock-photo library.`,
        metric: 'Stock photos',
      });
    }
    const heavy = (site.bytes ?? 0) >= 1_200_000 || (site.scriptCount ?? 0) >= 35;
    if (heavy) {
      const parts = [
        (site.bytes ?? 0) >= 1_200_000 ? `${(site.bytes! / 1_000_000).toFixed(1)} MB of code` : null,
        (site.scriptCount ?? 0) >= 35 ? `${site.scriptCount} separate scripts` : null,
      ].filter(Boolean);
      out.push({
        code: 'too_complex',
        weight: 34,
        fact: `Your homepage loads ${parts.join(' and ')}. That’s a lot for a phone on cell signal.`,
        metric: parts.length === 2 ? 'Heavy page' : (parts[0] ?? 'Heavy page'),
      });
    } else if ((site.linkCount ?? 0) >= 80) {
      out.push({
        code: 'too_complex',
        weight: 30,
        fact: `Your homepage has ${site.linkCount} different links, so the menu and the phone number compete with a lot else.`,
        metric: `${site.linkCount} links`,
      });
    }
  }

  if (place.googlePhotoCount !== null && place.googlePhotoCount < 5) {
    out.push({
      code: 'few_google_photos',
      weight: 44,
      fact:
        place.googlePhotoCount === 0
          ? 'Your Google listing has no photos.'
          : `Your Google listing has only ${place.googlePhotoCount} photo${place.googlePhotoCount === 1 ? '' : 's'}.`,
      metric: `${place.googlePhotoCount} on Google`,
    });
  }

  if (!place.hoursSet) {
    out.push({
      code: 'no_hours',
      weight: 45,
      fact: 'Your Google listing has no opening hours set, so people can’t see when you’re open.',
      metric: 'Hours missing',
    });
  }

  if (place.rating !== null && place.rating < LOW_RATING) {
    out.push({
      code: 'low_rating',
      weight: 42,
      fact: `Your Google rating is ${place.rating.toFixed(1)}.`,
      metric: `${place.rating.toFixed(1)} ★`,
    });
  }

  if (place.reviewCount !== null && place.reviewCount < LOW_REVIEWS) {
    out.push({
      code: 'few_reviews',
      weight: 40,
      fact: `You have ${place.reviewCount} Google review${place.reviewCount === 1 ? '' : 's'}.`,
      metric: `${place.reviewCount} reviews`,
    });
  }

  // ---- Restaurants --------------------------------------------------------

  if (place.category === 'restaurant') {
    const apps = site.marketplaceLinks;
    const hasDirect = site.directOrderingLinks.length > 0;

    if (siteUp && apps.length > 0 && !hasDirect) {
      out.push({
        code: 'marketplace_only',
        weight: 98,
        fact: `Your site’s order links go to ${listAnd(apps)}, and we didn’t find ordering of your own. Those apps charge a commission on each order.`,
        metric: `${apps.length} app${apps.length === 1 ? '' : 's'}`,
      });
    } else if (!place.website && (place.delivery || place.takeout)) {
      out.push({
        code: 'no_direct_ordering',
        weight: 96,
        fact: 'Google shows you doing takeout or delivery, but you have no site of your own to take those orders on.',
        metric: 'Apps only',
      });
    } else if (readable && !hasDirect && apps.length === 0 && site.hasOrderButton === false) {
      out.push({
        code: 'no_ordering_at_all',
        weight: 88,
        fact: 'We didn’t find any way to order on your homepage, so orders have to come by phone or in person.',
        metric: 'Phone only',
      });
    }

    if (siteUp && site.menuIsPdfOrImage) {
      out.push({
        code: 'menu_not_readable',
        weight: 55,
        fact: 'Your menu is posted as a PDF or a picture. On a phone that means pinching and zooming to read it.',
        metric: 'PDF menu',
      });
    }

    if (place.takeout === null && place.delivery === null) {
      out.push({
        code: 'listing_flags_missing',
        weight: 35,
        fact: 'Your Google listing doesn’t say whether you do takeout or delivery.',
        metric: 'Flags unset',
      });
    }
  }

  // ---- Studios, salons, services -----------------------------------------

  if (place.category === 'studio' || place.category === 'service') {
    // Only claim "no booking" when there's no site, or a site we could actually read.
    if (site.bookingLinks.length === 0 && (!place.website || readable)) {
      out.push({
        code: 'no_booking',
        weight: 85,
        fact: place.website
          ? 'There is no way to book you online — every new customer has to call during your working hours.'
          : 'You have no site, so there is no way to book you online at all.',
        metric: 'No online booking',
      });
    }
    if (place.category === 'studio' && place.reservable === null) {
      out.push({
        code: 'not_reservable',
        weight: 38,
        fact: 'Your Google listing has no booking link, so the "Book" button never appears when someone finds you on Maps.',
        metric: 'No Maps booking',
      });
    }
  }

  // ---- Shops --------------------------------------------------------------

  if (place.category === 'shop' && site.hasEcommerce !== true && (!place.website || readable)) {
    out.push({
      code: 'no_online_store',
      weight: 80,
      fact: place.website
        ? 'Nothing on your site can be bought — every sale has to happen in person.'
        : 'You have no site, so nothing you sell can be bought online.',
      metric: 'No online sales',
    });
  }

  return rank(out, facts);
}

/** Nudge ranking toward whatever the visitor told us hurts most. */
function rank(findings: DeterministicFinding[], facts: Facts): DeterministicFinding[] {
  const pain = facts.answers.painPoint?.toLowerCase() ?? '';
  const boost = (code: string): number => {
    if (!pain) return 0;
    if (pain.includes('call') && ['no_tel', 'no_ordering_at_all', 'no_booking'].includes(code)) return 12;
    if (pain.includes('website') && ['no_website', 'site_unreachable', 'no_viewport'].includes(code)) return 12;
    if (pain.includes('fee') && ['marketplace_only', 'no_direct_ordering'].includes(code)) return 12;
    if (pain.includes('booking') && ['no_booking', 'not_reservable'].includes(code)) return 12;
    return 0;
  };

  return [...findings].sort(
    (a, b) => b.weight + boost(b.code) - (a.weight + boost(a.code))
  );
}

function listAnd(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

// ---- Deterministic fallback (used when the model call fails) --------------

const CONSEQUENCE: Record<string, string> = {
  no_website: 'Everyone who looks you up lands on someone else’s page instead of yours.',
  site_unreachable: 'A customer who taps the website link on your listing gets nothing.',
  no_https: 'Visitors get warned away before they ever see your name.',
  no_viewport: 'Anyone who opens it on a phone has to work to read it.',
  no_tel: 'The easiest thing a customer can do — call you — takes work.',
  slow: 'On a phone with weak signal it will feel slower still.',
  no_schema: 'Search engines have to piece your details together instead of reading them straight off your site.',
  stale: 'It’s a small detail, but dated details make a site look less looked-after.',
  no_hours: 'When people filter for places open now, Google has no hours to go on.',
  low_rating: 'On Maps, people see your rating right next to everyone else’s.',
  few_reviews: 'More recent reviews give a first-time customer more to go on.',
  marketplace_only: 'Regulars who order through an app pay you less per order than if they ordered from you.',
  no_direct_ordering: 'Orders placed through the apps carry their commission.',
  no_ordering_at_all: 'When the phone is busy during a rush, some callers give up.',
  menu_not_readable: 'A menu page that reads well on a phone is easier for customers to use, and easier for you to keep up to date.',
  listing_flags_missing: 'People who filter Maps for takeout or delivery may not see you.',
  no_booking: 'Anyone who finds you after hours has no way to commit.',
  not_reservable: 'The one-tap booking path on Maps never appears for you.',
  no_online_store: 'You are limited to whoever physically walks in.',
  dead_buttons: 'A customer who taps it gets nothing and has to find another way to reach you.',
  few_photos: 'Photos of your food and your room help a first-time visitor decide.',
  stock_photos: 'Your own photos show customers your actual food and your actual room.',
  too_complex: 'Heavy pages take longer to show the menu on a phone.',
  few_google_photos: 'Your listing is often the first thing people see, and photos help them decide.',
};

const SERVICE_MAP: Record<string, ReportBuild> = {
  no_website: {
    title: 'A site of your own, live in about two weeks',
    why: 'Built around how you actually run, on your own domain, and you own all of it.',
  },
  site_unreachable: {
    title: 'A site that opens, on hosting I manage',
    why: 'Hosting is part of the monthly plan, and a broken site has an urgent route to me.',
  },
  no_viewport: {
    title: 'A mobile-first rebuild',
    why: 'Designed for the phone first, then the desktop.',
  },
  no_tel: {
    title: 'Tap-to-call on every screen',
    why: 'One tap, no copying numbers. It is the cheapest fix on this list.',
  },
  marketplace_only: {
    title: 'Commission-free ordering on your own site',
    why: 'The same order, minus the app’s cut, and you keep the customer’s details.',
  },
  no_direct_ordering: {
    title: 'Pickup ordering on your own site, to a kitchen tablet',
    why: 'Runs alongside your current setup, pay at pickup, and no commission to me.',
  },
  no_ordering_at_all: {
    title: 'Online ordering so the phone stops being the bottleneck',
    why: 'Orders arrive while your staff keep working the line.',
  },
  menu_not_readable: {
    title: 'A menu page that reads well on a phone',
    why: 'Easy to scroll on a phone, and easy to update when prices change.',
  },
  no_booking: {
    title: 'Online booking that runs itself',
    why: 'People book at 11pm without you touching your phone.',
  },
  not_reservable: {
    title: 'Booking wired into your Google listing',
    why: 'The "Book" button shows up right where people already find you.',
  },
  no_online_store: {
    title: 'An online store for what you already sell',
    why: 'Sell past closing time and past the front door.',
  },
  few_reviews: {
    title: 'A simple way to ask for reviews',
    why: 'Happy customers get a direct link to leave a review, at the right moment.',
  },
  low_rating: {
    title: 'A simple way to ask for reviews',
    why: 'Steady new reviews from happy customers give people more to go on.',
  },
  no_hours: {
    title: 'Your Google profile cleaned up and kept current',
    why: 'Hours, category, photos, and details — maintained as part of the monthly.',
  },
  no_schema: {
    title: 'Your Google profile cleaned up and kept current',
    why: 'Your hours, address and type of business spelled out so search engines read them correctly.',
  },
  listing_flags_missing: {
    title: 'Your Google profile cleaned up and kept current',
    why: 'Takeout, delivery and the other basics set on your listing.',
  },
  slow: {
    title: 'A lighter, faster site',
    why: 'Built lean, so it loads quickly on cell service.',
  },
  stale: {
    title: 'Ongoing upkeep, included',
    why: 'Send me prices, hours and specials, and I update them inside your plan’s update time.',
  },
  dead_buttons: {
    title: 'Every button checked and working',
    why: 'Order, menu, book and call all go where they say, checked before launch.',
  },
  few_photos: {
    title: 'Real photos of your food, front and center',
    why: 'Your own dishes and your room on the homepage, so people are hungry before they reach the menu.',
  },
  stock_photos: {
    title: 'Real photos of your food, front and center',
    why: 'Your own dishes and your room, not a stock library everyone else uses too.',
  },
  too_complex: {
    title: 'A simpler, faster site',
    why: 'Menu, hours, order and call in one tap each, and nothing else in the way on a phone.',
  },
  few_google_photos: {
    title: 'Your Google profile cleaned up and kept current',
    why: 'Fresh food and room photos on your listing, where people decide before they ever click.',
  },
  no_https: {
    title: 'A secure site on your own domain',
    why: 'No warnings, no scary interstitials between you and a customer.',
  },
};

const DEFAULT_BUILD: ReportBuild = {
  title: 'A 20-minute call to scope the rest',
  why: 'I will tell you exactly what I would build first and what it costs. No pitch.',
};

export function toFallbackFindings(
  findings: DeterministicFinding[]
): ReportFinding[] {
  return findings.slice(0, 5).map((f) => ({
    code: f.code,
    headline: f.fact,
    consequence: CONSEQUENCE[f.code] ?? 'This one quietly costs you customers.',
    impact: f.metric ?? null,
  }));
}

export function toBuilds(findings: DeterministicFinding[]): ReportBuild[] {
  const seen = new Set<string>();
  const builds: ReportBuild[] = [];

  for (const f of findings) {
    const build = SERVICE_MAP[f.code];
    if (build && !seen.has(build.title)) {
      seen.add(build.title);
      builds.push(build);
    }
    if (builds.length === 3) break;
  }

  if (builds.length === 0) builds.push(DEFAULT_BUILD);
  return builds;
}

// ---- 3-tap fallback ------------------------------------------------------

/**
 * Used when Places can't identify the business (or is over quota). Produces a
 * real, honest report from three taps — nothing here claims to have looked
 * anything up.
 */
export function tapFallbackFindings(input: TapFallbackInput): DeterministicFinding[] {
  const out: DeterministicFinding[] = [];

  if (input.hasWebsite === false) {
    out.push({
      code: 'no_website',
      weight: 100,
      fact: 'You told me you have no website, which means every person who looks you up lands somewhere you do not control.',
      metric: 'No site',
    });
  }

  if (input.whoAnswersPhone === 'nobody') {
    out.push({
      code: 'no_ordering_at_all',
      weight: 95,
      fact: 'You told me the phone often goes unanswered. Every one of those calls was someone ready to spend money.',
      metric: 'Calls missed',
    });
  } else if (input.whoAnswersPhone === 'me') {
    out.push({
      code: 'no_booking',
      weight: 90,
      fact: 'You are the one answering the phone, which means the busier you get the more you miss.',
      metric: 'Owner answering',
    });
  }

  if (input.category === 'restaurant') {
    out.push({
      code: 'no_direct_ordering',
      weight: 88,
      fact: 'Restaurants that take orders through the delivery apps hand over a cut of every single ticket.',
      metric: 'Commission leak',
    });
  }
  if (input.category === 'studio' || input.category === 'service') {
    out.push({
      code: 'no_booking',
      weight: 85,
      fact: 'If someone cannot book you at 11pm from their phone, you only get the customers patient enough to call back.',
      metric: 'No online booking',
    });
  }
  if (input.category === 'shop') {
    out.push({
      code: 'no_online_store',
      weight: 80,
      fact: 'Without an online store you are limited to whoever physically walks through the door.',
      metric: 'No online sales',
    });
  }

  // Dedupe by code, keeping the heaviest.
  const best = new Map<string, DeterministicFinding>();
  for (const f of out) {
    const existing = best.get(f.code);
    if (!existing || f.weight > existing.weight) best.set(f.code, f);
  }

  return [...best.values()].sort((a, b) => b.weight - a.weight);
}
