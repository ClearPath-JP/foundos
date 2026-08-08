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
  } else if (site.checked && !site.reachable) {
    out.push({
      code: 'site_unreachable',
      weight: 95,
      fact: site.failureReason ?? "Your site didn't load when I tried it.",
      metric: site.status ? `HTTP ${site.status}` : 'No response',
    });
  }

  const siteUp = Boolean(place.website) && site.reachable;

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
        fact: 'Your site has no mobile viewport set, so it renders zoomed-out and unusable on a phone.',
        metric: 'Not mobile-ready',
      });
    }
    if (site.hasTelLink === false) {
      out.push({
        code: 'no_tel',
        weight: 60,
        fact: 'There is no tap-to-call link anywhere on your site, so a visitor on a phone has to copy your number by hand.',
        metric: 'No tap-to-call',
      });
    }
    if (site.totalMs !== null && site.totalMs > SLOW_MS) {
      out.push({
        code: 'slow',
        weight: 50,
        fact: `Your site took ${(site.totalMs / 1000).toFixed(1)} seconds to load for me.`,
        metric: `${(site.totalMs / 1000).toFixed(1)}s load`,
      });
    }
    if (site.hasLocalBusinessSchema === false) {
      out.push({
        code: 'no_schema',
        weight: 30,
        fact: 'Your site has no business markup, so Google has to guess at your hours, address, and category.',
        metric: 'No markup',
      });
    }
    if (site.copyrightYear !== null && site.copyrightYear < currentYear - 1) {
      out.push({
        code: 'stale',
        weight: 25,
        fact: `The footer on your site still says ${site.copyrightYear}, which reads as abandoned to a first-time visitor.`,
        metric: `© ${site.copyrightYear}`,
      });
    }
  }

  if (!place.hoursSet) {
    out.push({
      code: 'no_hours',
      weight: 45,
      fact: 'Your Google listing has no opening hours set, and Google ranks incomplete profiles lower.',
      metric: 'Hours missing',
    });
  }

  if (place.rating !== null && place.rating < LOW_RATING) {
    out.push({
      code: 'low_rating',
      weight: 42,
      fact: `Your Google rating is ${place.rating.toFixed(1)}, and below about 4.3 people start scrolling past.`,
      metric: `${place.rating.toFixed(1)} ★`,
    });
  }

  if (place.reviewCount !== null && place.reviewCount < LOW_REVIEWS) {
    out.push({
      code: 'few_reviews',
      weight: 40,
      fact: `You have ${place.reviewCount} Google review${place.reviewCount === 1 ? '' : 's'}, which is not enough for you to rank against busier competitors nearby.`,
      metric: `${place.reviewCount} reviews`,
    });
  }

  // ---- Restaurants --------------------------------------------------------

  if (place.category === 'restaurant') {
    const apps = site.marketplaceLinks;
    const hasDirect = site.directOrderingLinks.length > 0;

    if (apps.length > 0 && !hasDirect) {
      out.push({
        code: 'marketplace_only',
        weight: 98,
        fact: `Your site sends orders to ${listAnd(apps)} and has no direct ordering of its own, so a cut of every one of those tickets leaves the building.`,
        metric: `${apps.length} app${apps.length === 1 ? '' : 's'}`,
      });
    } else if (!place.website && (place.delivery || place.takeout)) {
      out.push({
        code: 'no_direct_ordering',
        weight: 96,
        fact: 'Google shows you doing takeout or delivery, but you have no site of your own to take those orders on.',
        metric: 'Apps only',
      });
    } else if (siteUp && !hasDirect && apps.length === 0) {
      out.push({
        code: 'no_ordering_at_all',
        weight: 88,
        fact: 'There is no way to place an order from your site, so every order has to come through the phone.',
        metric: 'Phone only',
      });
    }

    if (siteUp && site.menuIsPdfOrImage) {
      out.push({
        code: 'menu_not_readable',
        weight: 55,
        fact: 'Your menu is published as a PDF or an image, which Google cannot read and which is painful to pinch-zoom on a phone.',
        metric: 'Menu unreadable',
      });
    }

    if (place.takeout === null && place.delivery === null) {
      out.push({
        code: 'listing_flags_missing',
        weight: 35,
        fact: 'Your listing does not say whether you do takeout or delivery, so you get filtered out when people search for either.',
        metric: 'Flags unset',
      });
    }
  }

  // ---- Studios, salons, services -----------------------------------------

  if (place.category === 'studio' || place.category === 'service') {
    if (site.bookingLinks.length === 0) {
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

  if (place.category === 'shop' && site.hasEcommerce !== true) {
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
  site_unreachable: 'A customer who taps your link gives up and taps a competitor.',
  no_https: 'Visitors get warned away before they ever see your name.',
  no_viewport: 'Most of your traffic is on a phone, and that is exactly where it breaks.',
  no_tel: 'The easiest thing a customer can do — call you — takes work.',
  slow: 'Every extra second loses a share of the people who tapped through.',
  no_schema: 'Google shows you less often because it is not sure what you are.',
  stale: 'People assume you may have closed.',
  no_hours: 'You drop out of "open now" searches.',
  low_rating: 'People compare you side by side on Maps and pick the higher number.',
  few_reviews: 'You look newer and less proven than you actually are.',
  marketplace_only: 'You are renting your own customers back from the apps.',
  no_direct_ordering: 'Every online order carries a commission you never see.',
  no_ordering_at_all: 'Orders that ring busy during a rush simply walk away.',
  menu_not_readable: 'People who cannot read your menu do not order from it.',
  listing_flags_missing: 'You are invisible in the filters people actually use.',
  no_booking: 'Anyone who finds you after hours has no way to commit.',
  not_reservable: 'The one-tap booking path on Maps never appears for you.',
  no_online_store: 'You are limited to whoever physically walks in.',
};

const SERVICE_MAP: Record<string, ReportBuild> = {
  no_website: {
    title: 'A site of your own, live in about two weeks',
    why: 'Built around how you actually run, on your own domain, and you own all of it.',
  },
  site_unreachable: {
    title: 'A site that stays up, and I watch it',
    why: 'Hosting and uptime monitoring are part of the monthly, so a dead link never costs you a customer again.',
  },
  no_viewport: {
    title: 'A mobile-first rebuild',
    why: 'Roughly 4 in 5 of your visitors are on a phone. That is the version I design first.',
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
    title: 'Direct online ordering, printed to your kitchen',
    why: 'Runs alongside your current setup. No POS change, no commission.',
  },
  no_ordering_at_all: {
    title: 'Online ordering so the phone stops being the bottleneck',
    why: 'Orders arrive while your staff keep working the line.',
  },
  menu_not_readable: {
    title: 'A real menu page Google can read',
    why: 'Every dish becomes its own searchable item instead of a flat image.',
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
    title: 'An automatic review engine',
    why: 'Happy customers get asked at the right moment, so your rating keeps climbing on its own.',
  },
  low_rating: {
    title: 'An automatic review engine',
    why: 'Steady new reviews from happy customers is the only thing that moves that number.',
  },
  no_hours: {
    title: 'Your Google profile cleaned up and kept current',
    why: 'Hours, category, photos, and details — maintained as part of the monthly.',
  },
  no_schema: {
    title: 'Your Google profile cleaned up and kept current',
    why: 'Proper markup so Google knows exactly what you are and shows you more often.',
  },
  listing_flags_missing: {
    title: 'Your Google profile cleaned up and kept current',
    why: 'The filters people search with will actually include you.',
  },
  slow: {
    title: 'A fast, lightweight rebuild',
    why: 'Built to load in under two seconds on cell service.',
  },
  stale: {
    title: 'Ongoing upkeep, included',
    why: 'Prices, hours, and specials change when you text me — not five days later.',
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
