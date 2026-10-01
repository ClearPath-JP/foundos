/**
 * The restaurant offer — the one source of truth for every plan and project on
 * the site, adopted 2026-10-01 from "FoundOS Website and Offer Implementation"
 * (repo root .docx). Two monthly plans, one ordering project, a short catalog.
 *
 * ⚠️ THIS IS THE FOURTH PRICE MODEL. pricing.ts (the $400 + $97 system list of
 * 2026-09-11) is left in place because /pricing, /systems and the service pages
 * still read it; none of them are linked from the new navigation. When those
 * pages are retired, pricing.ts goes with them.
 *
 * Rules carried over from pricing.ts:
 *   1. No price strings in components. Read PLANS / PROJECTS and format with usd().
 *   2. `live` means a paying restaurant could have it next week. Everything else
 *      is `request`: listed with its scope, never given a price on a page.
 *
 * Nothing here is checkout. Every button goes to /contact with the product
 * preselected; the agreement and first payment link follow a conversation. The
 * doc is explicit that recurring billing never starts from an unqualified form,
 * and that terms need counsel review before checkout goes live.
 */

export const TERM_MONTHS = 12;

export type PlanSlug = 'digital-care' | 'growth';

export type Plan = {
  slug: PlanSlug;
  name: string;
  monthly: number;
  /** One line under the price on a card. */
  pitch: string;
  /** Who it is for, in owner language. */
  forWho: string;
  /** Three short inclusions for the card. */
  highlights: readonly string[];
  cta: string;
};

/** Exactly two, in this order: pages destructure it as [care, growth]. */
export const PLANS: readonly [Plan, Plan] = [
  {
    slug: 'digital-care',
    name: 'Digital Care',
    monthly: 299,
    pitch: 'A managed website and dependable digital upkeep for your restaurant.',
    forWho: 'For restaurants that want an accurate website and someone keeping the details right.',
    highlights: [
      'Website built, hosted and maintained',
      'Hours, menu prices and photos updated for you',
      'Google profile kept accurate, monthly report',
    ],
    cta: 'Start Digital Care',
  },
  {
    slug: 'growth',
    name: 'Growth',
    monthly: 499,
    pitch: 'Digital Care plus follow-up that helps your team stay on top of inquiries.',
    forWho: 'For restaurants with catering, private events or other inquiries worth following up.',
    highlights: [
      'Everything in Digital Care, with twice the update time',
      'Up to two follow-up workflows, like catering or review requests',
      'Monthly inquiry and performance review',
    ],
    cta: 'Start Growth',
  },
];

/** The comparison table, doc §2. `care` and `growth` are what each plan gets on that row. */
export const COMPARISON: readonly { row: string; care: string; growth: string }[] = [
  {
    row: 'Website',
    care: 'Initial site up to 5 pages, built from a proven layout. Hosting, SSL and maintenance.',
    growth: 'Everything in Digital Care',
  },
  {
    row: 'Updates',
    care: 'Up to 60 minutes of small edits a month',
    growth: 'Up to 120 minutes of small edits a month',
  },
  {
    row: 'Google profile',
    care: 'Initial cleanup, a monthly accuracy check, and updates to hours and links you send',
    growth: 'Same, plus up to 2 posts a month from photos and news you send',
  },
  {
    row: 'Search basics',
    care: 'Clear page titles, readable content, business details and structured data where it fits',
    growth: 'Same, plus 1 focused improvement a month, inside the update time',
  },
  {
    row: 'Forms',
    care: '1 inquiry form that emails you',
    growth: 'Same, plus up to 2 standard customer follow-up workflows',
  },
  {
    row: 'Reviews',
    care: 'Your review link, and a monthly summary of new reviews',
    growth: 'Same, plus a review request workflow if it is one of your two',
  },
  {
    row: 'Reporting',
    care: 'Visits and actions like calls and form sends, in a monthly email',
    growth: 'Same, plus how inquiries and workflows performed',
  },
  {
    row: 'Response time',
    care: 'Acknowledged within 2 business days',
    growth: 'Acknowledged within 1 business day',
  },
];

/** Shared by both plan pages: what the site includes, what an edit is, what it isn't. */
export const PLAN_TERMS = {
  site: 'Home, menu, about, catering or inquiry, and contact pages, or the equivalent. You supply the approved menu, prices, logo and photos. Two rounds of revisions before launch. Launch is usually 15 to 20 business days after everything arrives.',
  edits:
    'Small edits are text you send, menu prices, hours, photos and changes to existing sections. The time includes making and checking the change. Unused time does not roll over.',
  notIncluded:
    'New designs, new integrations, large menu imports, ad spend, ordering software, hardware, domain renewal, text message and phone usage, and full social media management. Any of these can be quoted.',
  hours: 'Monday to Friday, 9am to 5pm Eastern. A broken site or form has an urgent route.',
  term: `No website setup fee. A ${TERM_MONTHS}-month first term pays for the build, then the plan continues month to month with 30 days’ notice to cancel.`,
  firstPayment:
    'The first month is paid when you sign and covers the build. The next payment is one month later. If your restaurant isn’t a fit for the standard scope, the first payment is refunded before any work starts.',
  ownership:
    'Your domain, Google profile, merchant accounts and content stay yours. I get access, not ownership. Once the first term is paid, the custom website content and build files are yours to take.',
  location: 'One restaurant location and one website per plan. A second location gets its own quote.',
} as const;

export type ProjectStatus = 'live' | 'request';

export type Project = {
  slug: string;
  name: string;
  /** "From" when the final price depends on a compatibility check. */
  from?: boolean;
  /** One line for the card. */
  pitch: string;
  /** The standard scope in one line. Required on request-only products, which show it instead of a price. */
  scope?: string;
  cta: string;
} & (
  | {
      status: 'live';
      price: number;
      /** Three short inclusions for the card. */
      points: readonly string[];
      /** The one line next to the button: what costs extra, or how it's paid. */
      fine: string;
    }
  | { status: Exclude<ProjectStatus, 'live'>; scope: string }
);

export const PROJECTS: readonly Project[] = [
  {
    slug: 'direct-ordering-launch',
    name: 'Direct Ordering Launch',
    status: 'live',
    price: 1500,
    from: true,
    pitch:
      'Give customers a direct way to order from you. I set up a supported ordering system, connect it to your website and help your team launch.',
    points: [
      'Ordering set up and linked from your website',
      'Printer or tablet configured, and a test order run with your team',
      'No percentage of your orders, ever',
    ],
    fine: 'Hardware and ordering provider fees are separate.',
    cta: 'Check compatibility',
  },
  {
    slug: 'social-profile-cleanup',
    name: 'Social Profile Cleanup',
    status: 'live',
    price: 249,
    pitch: 'Your Instagram, Facebook and one more profile made accurate and consistent, once.',
    points: [
      'Up to 3 profiles: bios, links, hours and contact details',
      'Made to match your website and Google profile',
      'One revision round',
    ],
    fine: 'Fixed price, paid after a quick check that it fits.',
    cta: 'Check if it fits',
  },
  {
    slug: 'content-session',
    name: 'Content Session',
    status: 'request',
    pitch: 'Photos and short videos of your food and your place.',
    scope: 'One local shoot up to 90 minutes, 15 edited photos and 3 short vertical videos.',
    cta: 'Ask about availability',
  },
  {
    slug: 'menu-refresh',
    name: 'Menu Refresh',
    status: 'request',
    pitch: 'A cleaner menu for print and web.',
    scope: 'Up to 2 pages from your text and prices, as a PDF for print and web, with 2 revision rounds.',
    cta: 'Ask about it',
  },
  {
    slug: 'automation-installation',
    name: 'Automation Installation',
    status: 'request',
    pitch: 'One follow-up or admin task set up to run on its own.',
    scope: 'One supported workflow with an approved trigger, sequence and destination, tested and handed off.',
    cta: 'Ask about it',
  },
  {
    slug: 'ad-campaign-launch',
    name: 'Ad Campaign Launch',
    status: 'request',
    pitch: 'One campaign set up and checked, on one platform.',
    scope: 'One platform, one campaign, up to 2 ad versions from your material, tracking, and a 14-day check. Ad spend is separate.',
    cta: 'Ask about it',
  },
  {
    slug: 'brand-refresh',
    name: 'Brand Refresh',
    status: 'request',
    pitch: 'A refreshed look for a restaurant that has outgrown its old one.',
    scope: 'Quoted after a look at your current brand and what you need.',
    cta: 'Ask about it',
  },
  {
    slug: 'ai-receptionist',
    name: 'AI Phone Answering',
    status: 'request',
    pitch: 'A phone line that answers common questions when your team can’t.',
    scope: 'Scoped separately, with its own usage budget.',
    cta: 'Join the interest list',
  },
];

export type LiveProject = Extract<Project, { status: 'live' }>;
export type RequestProject = Extract<Project, { status: 'request' }>;

export const LIVE_PROJECTS = PROJECTS.filter((p): p is LiveProject => p.status === 'live');
export const REQUEST_PROJECTS = PROJECTS.filter((p): p is RequestProject => p.status === 'request');

/** Every value the inquiry form's "interested in" field accepts. */
export const INTERESTS: readonly { value: string; label: string }[] = [
  ...PLANS.map((p) => ({ value: p.slug, label: `${p.name} plan` })),
  ...PROJECTS.map((p) => ({ value: p.slug, label: p.name })),
  { value: 'not-sure', label: 'Not sure yet' },
];

export function interestLabel(value: string): string | null {
  return INTERESTS.find((i) => i.value === value)?.label ?? null;
}

/** $1,500 — whole dollars, US grouping. */
export function usd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export const CONTACT = {
  email: 'josh@foundos.ai',
  phone: '4044363393',
  phonePretty: '(404) 436-3393',
} as const;
