/**
 * foundos pricing — the one source of truth for every price on the site.
 *
 * Spec: foundos/pricing/01-pricing.md (the numbers, in words) and
 * foundos/pricing/04-shop-and-cart-spec.md (the cart rules). If this file and
 * those docs ever disagree, this file wins and the doc gets updated.
 *
 * ── WHY THIS REPLACED THE "FROM" LADDER ──────────────────────────────────
 *
 * Until 2026-09-11 the site showed four floors ($500 / $1,500 / $4,900 / $150)
 * and the real number was made up in the room. That produced a different price
 * at every door for the same build — $1,200 at one, $1,500 at another — and one
 * of those, said out loud, lost money. This is a price list instead: every
 * system has a setup and a monthly price, the same for everybody, and the only
 * thing that moves it is how many systems go in at once.
 *
 * Two rules for anyone editing a component:
 *   1. No price strings in components. Call quote() or read SYSTEMS/WEBSITE.
 *   2. No price maths in components. The discount, the rounding and the cart
 *      rules all live in quote(), so the package card and the one-at-a-time
 *      total can never disagree.
 *
 * ⚠️ NO IMPORTS, AND NO SYNTAX NODE CANNOT STRIP. pricing.test.ts runs this file
 * directly with `node --test` (Node 24 strips types natively), so: no path
 * aliases, no enums, no namespaces, no parameter properties.
 */

export type SystemSlug =
  | 'truck-tracker'
  | 'online-ordering'
  | 'catering-leads'
  | 'missed-call-text-back'
  | 'review-booster'
  | 'google-boost'
  | 'text-club'
  | 'ai-receptionist'
  | 'second-location';

/**
 * live        — can be sold and built today.
 * coming_soon — shown with its price, can go in a request, never charged for.
 *
 * ⚠️ FLIP THESE HONESTLY. A system goes live when a paying client could have it
 * next week, not when a demo of it exists. Set 2026-09-11 from what is actually
 * built: ordering (the order pages in the demos), the AI phone (the Vapi line),
 * and Google work (it is labour, not software). Everything that needs a texting
 * number waits on carrier registration and has not been built for a client yet.
 */
export type SystemStatus = 'live' | 'coming_soon';

export type BusinessType = 'truck' | 'restaurant';

type Rule = { slug: SystemSlug; note: string };

export type PricedSystem = {
  slug: SystemSlug;
  name: string;
  setup: number;
  monthly: number;
  status: SystemStatus;
  bestFor: readonly BusinessType[];
  /** Counts toward the number of systems that decides the discount. */
  countsTowardDiscount: boolean;
  /** Setup takes the tier discount. */
  discountSetup: boolean;
  /** Monthly takes the tier discount. */
  discountMonthly: boolean;
  /** Only allowed in a build that also has this system. */
  requires?: Rule;
  /** Adding this system removes that one. */
  replaces?: Rule;
  /** Call minutes included in the monthly. Only the AI Receptionist has a metered cost. */
  includedMinutes?: number;
  /** What each minute past the allowance costs, in cents. Must stay above the ~25¢/min worst-case cost. */
  overageCentsPerMinute?: number;
};

/** The base. In every build, never removable, never counted toward a discount tier. */
export const WEBSITE = { name: 'Website', setup: 400, monthly: 97 } as const;

const STANDARD = { countsTowardDiscount: true, discountSetup: true, discountMonthly: true } as const;

export const SYSTEMS: readonly PricedSystem[] = [
  {
    ...STANDARD,
    slug: 'truck-tracker',
    name: 'Truck Tracker',
    setup: 400,
    monthly: 50,
    status: 'coming_soon',
    bestFor: ['truck'],
  },
  {
    ...STANDARD,
    slug: 'online-ordering',
    name: 'Online Ordering',
    setup: 500,
    monthly: 60,
    status: 'live',
    bestFor: ['truck', 'restaurant'],
  },
  {
    ...STANDARD,
    slug: 'catering-leads',
    name: 'Catering Leads',
    setup: 300,
    monthly: 30,
    status: 'coming_soon',
    bestFor: ['truck', 'restaurant'],
  },
  {
    ...STANDARD,
    slug: 'missed-call-text-back',
    name: 'Missed Call Text-Back',
    setup: 150,
    monthly: 30,
    status: 'coming_soon',
    bestFor: ['restaurant'],
  },
  {
    ...STANDARD,
    slug: 'review-booster',
    name: 'Review Booster',
    setup: 300,
    monthly: 40,
    status: 'coming_soon',
    bestFor: ['truck', 'restaurant'],
  },
  {
    ...STANDARD,
    slug: 'google-boost',
    name: 'Show Up on Google Maps',
    setup: 300,
    monthly: 75,
    status: 'live',
    bestFor: ['restaurant'],
  },
  {
    ...STANDARD,
    slug: 'text-club',
    name: 'Text Club',
    setup: 300,
    monthly: 50,
    status: 'coming_soon',
    bestFor: ['truck', 'restaurant'],
  },
  {
    ...STANDARD,
    slug: 'ai-receptionist',
    name: 'Phone Answering',
    setup: 600,
    monthly: 150,
    status: 'live',
    bestFor: ['restaurant'],
    /** Per-minute call costs, so the monthly never takes a discount. */
    discountMonthly: false,
    /**
     * ⚠️ THE CAP IS WHAT KEEPS THIS LINE PROFITABLE. Vapi runs about 7–25¢ a
     * minute all-in. A busy place with EVERY call answered is ~3,750 min a
     * month — $260–560 of cost against $150 of price. Built as overflow and
     * after-hours only it is ~300–400 min, so 300 included costs at most ~$75,
     * and every minute past it is billed above the worst-case cost.
     * (reference_market_pricing, "AI-phone COGS trap", 2026-08-02)
     */
    includedMinutes: 300,
    overageCentsPerMinute: 30,
    replaces: {
      slug: 'missed-call-text-back',
      note: 'Phone Answering already picks up every call, so Missed Call Text-Back was removed.',
    },
  },
  {
    slug: 'second-location',
    name: 'Second Location',
    setup: 200,
    monthly: 30,
    status: 'live',
    bestFor: ['truck', 'restaurant'],
    countsTowardDiscount: false,
    discountSetup: false,
    discountMonthly: false,
    requires: {
      slug: 'online-ordering',
      note: 'Second Location needs Online Ordering, so it was removed.',
    },
  },
];

export type DiscountTier = {
  minSystems: number;
  /** null = and up. */
  maxSystems: number | null;
  setupPercentOff: number;
  monthlyPercentOff: number;
};

/**
 * Big on setup, small on monthly, and that split is the whole design: several
 * systems built at once share one site, one database, one texting number and
 * one Stripe account, so the build genuinely gets cheaper. Monthly cost grows
 * with every system, and monthly is the business, so that discount stays small.
 */
export const DISCOUNT_TIERS: readonly DiscountTier[] = [
  { minSystems: 1, maxSystems: 1, setupPercentOff: 0, monthlyPercentOff: 0 },
  { minSystems: 2, maxSystems: 2, setupPercentOff: 10, monthlyPercentOff: 0 },
  { minSystems: 3, maxSystems: 4, setupPercentOff: 20, monthlyPercentOff: 10 },
  { minSystems: 5, maxSystems: null, setupPercentOff: 30, monthlyPercentOff: 15 },
];

const NO_DISCOUNT: DiscountTier = { minSystems: 0, maxSystems: 0, setupPercentOff: 0, monthlyPercentOff: 0 };

/** Any build that takes a discount commits to this many months. Cancel early and the setup discount is owed. */
export const MINIMUM_MONTHS = 6;

/**
 * Every other build, the website alone included. Without it, $900 plus one
 * month bought a site with ordering to keep — "you keep the site" only
 * applies once the minimum is served.
 */
export const BASE_MINIMUM_MONTHS = 3;

/**
 * Services: work that is Josh's time rather than software he runs.
 *
 * ⚠️ SERVICES NEVER ENTER quote(), AND THAT IS THE POINT. Three consequences,
 * all deliberate:
 *   1. They take no bundle discount. The discount exists because several
 *      systems built at once share one site and one set of accounts — a monthly
 *      photo shoot shares nothing, so discounting it would be discounting hours.
 *   2. They are not in the "every system, one location" ceiling on the homepage.
 *      Adding a $450 labour service to that row would take the advertised
 *      ceiling from $489 a month to over $900 and misrepresent what the systems
 *      cost.
 *   3. They are quoted alongside a build, never inside it.
 *
 * `ask` means it is not sold off a page at all — scoped in person.
 */
export type Service = {
  slug: string;
  name: string;
  /** A one-time price, where there is one. */
  oneTime?: number;
  /** A monthly price, where there is one. */
  monthly?: number;
  status: SystemStatus;
  /** Not sold off a page: a fee plus the client's own spend, scoped in person. */
  ask?: boolean;
  note: string;
};

export const SERVICES: readonly Service[] = [
  {
    slug: 'menu-design',
    name: 'Menu or flyer design',
    oneTime: 400,
    status: 'live',
    note: 'One time, print-ready. Printing is billed at cost, with the invoice.',
  },
  {
    slug: 'social-setup',
    name: 'Social profile setup',
    oneTime: 400,
    status: 'coming_soon',
    note: 'One time. Instagram and Facebook made to match your Google listing and your storefront.',
  },
  {
    /**
     * ⚠️ THE MONTHLY IS PRICED AS HOURS, NOT AS SOFTWARE. One shoot on site
     * plus writing and scheduling is four to six hours a month. Below about
     * $400 it pays less than the work is worth and quietly eats the week that
     * belongs to selling. The cap — one shoot, 8-12 posts, one revision round —
     * is what keeps it a product instead of an open tab.
     */
    slug: 'social-content',
    name: 'Posts every week',
    oneTime: 300,
    monthly: 450,
    status: 'coming_soon',
    note: 'One shoot a month at your place, then 8 to 12 posts written and scheduled for you.',
  },
  {
    /**
     * ⚠️ NO PRICE, AND NOT BECAUSE ONE HAS NOT BEEN PICKED. foundos.ai says in
     * writing, on /why, that Josh has never managed a dollar of anybody else's
     * ad spend. That sentence is the most valuable one on the site. Ads get a
     * price the day it stops being true — after his own spend and client #3 —
     * and the paragraph gets rewritten in the same commit.
     */
    slug: 'ads',
    name: 'Ads',
    status: 'coming_soon',
    ask: true,
    note: 'A management fee plus your own ad spend, scoped in person. Not sold off a page.',
  },
];

export function tierFor(systemCount: number): DiscountTier {
  let tier = NO_DISCOUNT;
  for (const t of DISCOUNT_TIERS) if (systemCount >= t.minSystems) tier = t;
  return tier;
}

/** Setup rounds DOWN to the nearest multiple of this. Exported so the page can say the rule out loud. */
export const SETUP_ROUNDS_DOWN_TO = 50;

/** Setup rounds DOWN to the nearest $50. */
function roundSetup(amount: number): number {
  return Math.floor(amount / SETUP_ROUNDS_DOWN_TO) * SETUP_ROUNDS_DOWN_TO;
}

/** "2", "3–4", "5 or more" — how a tier reads on the page. */
export function tierLabel(t: DiscountTier): string {
  if (t.maxSystems === null) return `${t.minSystems} or more`;
  if (t.minSystems === t.maxSystems) return `${t.minSystems}`;
  return `${t.minSystems}–${t.maxSystems}`;
}

/** Monthly rounds to the nearest price ending in 9: $213 → $209, $278 → $279. */
function roundMonthly(amount: number): number {
  return Math.round((amount - 9) / 10) * 10 + 9;
}

/**
 * Cleans a list of slugs into a valid build: unknown slugs and duplicates are
 * dropped, replacements and requirements applied, and the result put in
 * catalog order so the same build always reads the same way. Every change it
 * makes on its own comes back as a note, because a total that changes without
 * saying why is a total nobody trusts.
 */
export function normalizeCart(input: readonly string[]): { systems: SystemSlug[]; notes: string[] } {
  const wanted = new Set<string>(input);
  const notes: string[] = [];

  for (const s of SYSTEMS) {
    if (s.replaces && wanted.has(s.slug) && wanted.has(s.replaces.slug)) {
      wanted.delete(s.replaces.slug);
      notes.push(s.replaces.note);
    }
  }
  for (const s of SYSTEMS) {
    if (s.requires && wanted.has(s.slug) && !wanted.has(s.requires.slug)) {
      wanted.delete(s.slug);
      notes.push(s.requires.note);
    }
  }

  return { systems: SYSTEMS.filter((s) => wanted.has(s.slug)).map((s) => s.slug), notes };
}

export type QuoteLine = {
  slug: 'website' | SystemSlug;
  name: string;
  setup: number;
  monthly: number;
  status: SystemStatus;
};

export type Quote = {
  systems: SystemSlug[];
  notes: string[];
  /** Website first, then each system at its full price. */
  lines: QuoteLine[];
  tier: DiscountTier;
  /** The plain sum of the lines — what the crossed-out price shows. */
  full: { setup: number; monthly: number };
  /**
   * After the discount, before rounding. Only the worked example prints this:
   * a page that says "20% off" next to a rounded number has to be able to show
   * the unrounded one, or the arithmetic looks wrong to anyone who checks it.
   */
  exact: { setup: number; monthly: number };
  /** What they pay. */
  price: { setup: number; monthly: number };
  /** Never negative. Rounding can nudge a no-discount monthly up by a couple of dollars. */
  saves: { setup: number; monthly: number };
  /** True when any tier discount applies. */
  discounted: boolean;
  /** MINIMUM_MONTHS when a discount applies, BASE_MINIMUM_MONTHS otherwise. Every build has one. */
  minimumMonths: number;
  hasComingSoon: boolean;
};

export function quote(input: readonly string[]): Quote {
  const { systems, notes } = normalizeCart(input);
  const chosen = SYSTEMS.filter((s) => systems.includes(s.slug));
  const tier = tierFor(chosen.filter((s) => s.countsTowardDiscount).length);

  let discountableSetup: number = WEBSITE.setup;
  let fixedSetup = 0;
  let discountableMonthly: number = WEBSITE.monthly;
  let fixedMonthly = 0;
  for (const s of chosen) {
    if (s.discountSetup) discountableSetup += s.setup;
    else fixedSetup += s.setup;
    if (s.discountMonthly) discountableMonthly += s.monthly;
    else fixedMonthly += s.monthly;
  }

  const full = {
    setup: discountableSetup + fixedSetup,
    monthly: discountableMonthly + fixedMonthly,
  };

  // Integer percentages, so 1,500 x 80 / 100 is exactly 1,200 and never
  // 1,199.9999 — which setup's round-DOWN would turn into $1,150.
  const exact = {
    setup: (discountableSetup * (100 - tier.setupPercentOff)) / 100 + fixedSetup,
    monthly: (discountableMonthly * (100 - tier.monthlyPercentOff)) / 100 + fixedMonthly,
  };
  const price =
    chosen.length === 0
      ? { setup: WEBSITE.setup, monthly: WEBSITE.monthly }
      : { setup: roundSetup(exact.setup), monthly: roundMonthly(exact.monthly) };

  const lines: QuoteLine[] = [
    { slug: 'website', name: WEBSITE.name, setup: WEBSITE.setup, monthly: WEBSITE.monthly, status: 'live' },
    ...chosen.map((s) => ({ slug: s.slug, name: s.name, setup: s.setup, monthly: s.monthly, status: s.status })),
  ];

  const discounted = tier.setupPercentOff > 0 || tier.monthlyPercentOff > 0;

  return {
    systems,
    notes,
    lines,
    tier,
    full,
    exact,
    price,
    saves: {
      setup: Math.max(0, full.setup - price.setup),
      monthly: Math.max(0, full.monthly - price.monthly),
    },
    discounted,
    minimumMonths: discounted ? MINIMUM_MONTHS : BASE_MINIMUM_MONTHS,
    hasComingSoon: chosen.some((s) => s.status === 'coming_soon'),
  };
}

export type PackageGroup = 'truck' | 'restaurant' | 'both';

export type PricedPackage = {
  slug: string;
  name: string;
  group: PackageGroup;
  systems: readonly SystemSlug[];
  /** The "most popular" badge. One per group. */
  recommended: boolean;
};

/**
 * Packages are just saved carts. Their prices come out of quote() like any
 * other build, which is what guarantees a package card and the same systems
 * added one at a time land on the same number. pricing.test.ts pins each one.
 */
export const PACKAGES: readonly PricedPackage[] = [
  { slug: 'truck-starter', name: 'Truck Starter', group: 'truck', recommended: false, systems: ['truck-tracker'] },
  {
    slug: 'truck-pro',
    name: 'Truck Pro',
    group: 'truck',
    recommended: true,
    systems: ['truck-tracker', 'online-ordering', 'catering-leads'],
  },
  {
    slug: 'truck-full',
    name: 'Truck Full',
    group: 'truck',
    recommended: false,
    systems: ['truck-tracker', 'online-ordering', 'catering-leads', 'review-booster', 'text-club'],
  },
  {
    slug: 'restaurant-starter',
    name: 'Restaurant Starter',
    group: 'restaurant',
    recommended: false,
    systems: ['online-ordering'],
  },
  {
    slug: 'restaurant-pro',
    name: 'Restaurant Pro',
    group: 'restaurant',
    recommended: true,
    systems: ['online-ordering', 'review-booster', 'google-boost'],
  },
  {
    slug: 'restaurant-full',
    name: 'Restaurant Full',
    group: 'restaurant',
    recommended: false,
    systems: [
      'online-ordering',
      'review-booster',
      'google-boost',
      'catering-leads',
      'missed-call-text-back',
      'text-club',
    ],
  },
  {
    slug: 'restaurant-full-ai',
    name: 'Restaurant Full + AI',
    group: 'restaurant',
    recommended: false,
    systems: ['online-ordering', 'review-booster', 'google-boost', 'catering-leads', 'ai-receptionist', 'text-club'],
  },
  {
    slug: 'restaurant-truck',
    name: 'Restaurant + Truck',
    group: 'both',
    recommended: true,
    systems: ['truck-tracker', 'online-ordering', 'catering-leads', 'review-booster', 'google-boost', 'text-club'],
  },
  {
    slug: 'restaurant-truck-two',
    name: 'Restaurant + Truck, ordering at both',
    group: 'both',
    recommended: false,
    systems: [
      'truck-tracker',
      'online-ordering',
      'catering-leads',
      'review-booster',
      'google-boost',
      'text-club',
      'second-location',
    ],
  },
];

/** Every system in the catalog. quote() drops Text-Back from this on its own. */
export const EVERY_SYSTEM: readonly SystemSlug[] = SYSTEMS.map((s) => s.slug);

/** $1,250 — whole dollars, US grouping. */
export function usd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

/** $213.30 — cents shown only when there are any. For the worked example's unrounded figures. */
export function usdExact(amount: number): string {
  const cents = Math.round(amount * 100) % 100 !== 0;
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 })}`;
}
