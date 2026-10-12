/**
 * The FoundOS offer — the ONE price source for the whole site (Josh confirmed, 2026-10-12).
 *
 *   Website & Care   $299/month, no upfront setup fee for a standard website
 *   Growth           $499/month TOTAL (Website & Care + one scoped system), never "$499 on top"
 *   Direct Ordering  from $1,500 one-time, quoted separately, never part of the $299
 *
 * offer.ts (the retired restaurant pages) reads its numbers from PRICES below, so the two can't disagree.
 * The 2026-10-11 draft ($300 setup + $150/mo site, $400 + $125, $300 + $100, "Complete" $850 + $299) is retired
 * and must not be published.
 *
 * Rules:
 *   - No minimum contract term on the site until Josh finalizes it. Terms live in the written agreement.
 *   - No launch timeline promise. The most that's said: an initial preview in about 3 business days for a simple
 *     site, after all the materials arrive — and it's worded as an aim.
 *   - No guaranteed Google or AI search rankings. No invented clients, testimonials or results.
 *   - Owner.com replacement and complex POS migrations are outside the $299 package.
 *   - Voice: "I" for Josh, "FoundOS" for the company. No team implied.
 *   - Checked by services.test.ts (npm run test:services). ⚠️ No imports and nothing Node can't strip: the test
 *     runs this file directly.
 */

export const PRICES = {
  care: 299,
  growth: 499,
  orderingFrom: 1500,
} as const;

export type Price = { kind: 'monthly'; monthly: number; setup: 0 } | { kind: 'from'; oneTime: number };

export type Service = {
  slug: 'website-care' | 'growth' | 'direct-ordering';
  name: string;
  /** Who it's for, in one plain line. */
  forWho: string;
  price: Price;
  /** The fine print under the price. */
  priceNote: string;
  /** What you get, 3-4 short lines. This is what most people read. */
  short: readonly string[];
  /** The full list, behind "See everything included". */
  includes: readonly string[];
  excludes: readonly string[];
  notes?: readonly string[];
  /** Button label. */
  cta: string;
  featured?: boolean;
};

export const SERVICES: readonly Service[] = [
  {
    slug: 'website-care',
    name: 'Website & Care',
    forWho: 'A website that feels like your business, looked after for you.',
    price: { kind: 'monthly', monthly: PRICES.care, setup: 0 },
    priceNote: 'No setup fee.',
    short: [
      'A custom website, up to 5 pages',
      'Looks great on phones',
      'Hosting, security and updates handled',
      '2 small changes every month',
    ],
    includes: [
      'Designed around your business, not a template',
      'Up to 5 pages, built for phones first',
      'Clear buttons to call, book, order, visit or ask for a quote',
      'Your menu or services',
      'Contact form, hours, map and social links',
      'Links to the ordering or booking you already use (Square, Toast, Clover and similar)',
      'Basic local SEO and AEO, so Google and AI assistants can read your business details',
      'Hosting, SSL security and maintenance',
      'Basic visitor analytics',
      '2 small content changes a month (hours, a price, a photo, some text)',
    ],
    excludes: [
      'Replacing an ordering platform like Owner.com',
      'Complex POS migrations',
      'New online ordering setups (that’s Direct Ordering)',
      'Paid ads',
      'Third-party fees: domain renewal, subscriptions, card processing',
    ],
    notes: ['No one can honestly guarantee a Google ranking, and I don’t.'],
    cta: 'Get started',
  },
  {
    slug: 'growth',
    name: 'Growth',
    forWho: 'Your website, plus one system that saves you time.',
    price: { kind: 'monthly', monthly: PRICES.growth, setup: 0 },
    priceNote: 'Total per month, website included.',
    short: [
      'Everything in Website & Care',
      'Plus one time-saving system for your business',
      'We pick the system together',
    ],
    includes: [
      'Everything in Website & Care',
      'One system, scoped together and written down, for example:',
      '· Automatic follow-up when someone sends an inquiry',
      '· A simple tracker for leads and inquiries',
      '· Instagram DM replies for common questions',
      '· Automatic answers to routine questions',
    ],
    excludes: [
      'Unlimited automations: it’s one system, agreed in writing',
      'New online ordering setups (that’s Direct Ordering)',
      'Third-party subscriptions, unless quoted',
    ],
    notes: ['Automatic replies say they’re automatic, and hand off to you when a person should answer.'],
    cta: 'Get started',
    featured: true,
  },
  {
    slug: 'direct-ordering',
    name: 'Direct Ordering',
    forWho: 'For restaurants that need their own online ordering set up.',
    price: { kind: 'from', oneTime: PRICES.orderingFrom },
    priceNote: 'One-time setup, quoted for you.',
    short: [
      'Your own online ordering, set up for you',
      'Kitchen printer and POS hookup, where supported',
      'Already on Square, Toast or Clover? You likely don’t need this. I link the ordering you have.',
    ],
    includes: [
      'Online ordering with your menu, options and pickup',
      'Kitchen printer setup, where a compatible printer is confirmed',
      'POS connection, where your POS supports it',
      'A test run with your team before it goes live',
    ],
    excludes: [
      'Hardware, unless quoted',
      'Third-party subscriptions',
      'Card processing fees (charged by the payment processor)',
      'The monthly website plan (separate)',
    ],
    cta: 'Ask about ordering',
  },
];

/** Why the monthly price is worth it. Shown next to the price cards. */
export const WHY_MONTHLY = [
  {
    t: 'Built for you, not a template',
    d: 'Designed around your business, not a theme with your logo swapped in.',
  },
  {
    t: 'Hosting and security handled',
    d: 'Hosting, security and updates are on me. Nothing for you to manage.',
  },
  {
    t: 'Changes without the hassle',
    d: 'New hours or a menu change? Send it and I make it.',
  },
  {
    t: 'A local person to call',
    d: 'I’m based in the Marietta area. You deal with me, not a support ticket.',
  },
] as const;

/** What happens after someone gets in touch. No launch-date promise. */
export const NEXT_STEPS = [
  { t: 'Fill out the form', d: 'It comes straight to me. I reply personally.' },
  { t: 'A short conversation', d: 'About your business and what you already use. In person if you’re nearby.' },
  { t: 'One clear price', d: 'In writing, before anything starts. No surprise fees.' },
  {
    t: 'A first preview',
    d: 'For a simple site, I aim for a first look about 3 business days after I have your photos and details.',
  },
] as const;

/** Facts about how the service works. ⚠️ No minimum term here until Josh finalizes it. */
export const TERMS = [
  'You own your domain and your content: your words, photos, logo and customer information.',
  'Third-party costs (domain renewal, payment processing, subscriptions, hardware) are separate and always named up front.',
  'You keep the POS and tools you already use whenever possible.',
  'Final terms are set out in a written agreement before any work starts.',
] as const;

export function usd(n: number): string {
  return `$${n.toLocaleString('en-US')}`;
}
