/**
 * foundos — the one place brand values live.
 *
 * Spec: foundos-brand-and-site-spec.md §1 (design system) and §2.8 (prices).
 * Build order rule: "Never invent a price, phone number, or business name
 * outside what's in the specs or config/brand.ts."
 *
 * Two rules for anyone editing a component:
 *   1. No hex codes in components. Use the Tailwind tokens below, which are
 *      declared once in globals.css `@theme` from these same six values.
 *   2. No price strings in components. Read them from PRICES so Josh can
 *      change a number here and have the whole site follow.
 *
 * Phone and email are NOT redefined here — they are re-exported from
 * src/lib/contact.ts so a number can never fork between two files.
 */

import {
  CAL,
  DEMO_LINE,
  DEMO_LINE_PRETTY,
  EMAIL,
  PHONE,
  PHONE_PRETTY,
} from '@/lib/contact';

export { CAL, DEMO_LINE, DEMO_LINE_PRETTY, EMAIL, PHONE, PHONE_PRETTY };

/**
 * The whole palette. Six values, no seventh.
 *
 * `dot` is the only colour on the site that isn't black, white, or grey, and it
 * appears exactly once per view: the dot after the wordmark. No green links,
 * no green buttons, no green icons. Black is pure #000000 — never tinted.
 */
export const COLOR = {
  /** Page background. */
  paper: '#FFFFFF',
  /** Text, buttons, rules. */
  ink: '#000000',
  /** Supporting lines under a primary line. */
  muted: '#5F5E5A',
  /** 1px rules and input borders. */
  hairline: '#D3D1C7',
  /** Concept-site cards and code-ish blocks. */
  surface: '#F1EFE8',
  /** The dot. Nothing else. */
  dot: '#1D9E75',
} as const;

/**
 * Type scale. One family (Inter), two weights.
 *
 * Sizes are px and read desktop-first with the mobile step beside them; the
 * components express these as Tailwind utilities, this object is the record of
 * what those utilities are supposed to equal.
 */
export const TYPE = {
  family: 'Inter',
  /** 400 body, 600 headings and buttons. No 700+, no 300. */
  weight: { body: 400, strong: 600 },
  hero: { desktop: 56, mobile: 36, lineHeight: 1.1, tracking: '-0.02em' },
  heading: { desktop: 32, mobile: 26 },
  body: { desktop: 18, mobile: 17, lineHeight: 1.6 },
  meta: { size: 14 },
  /** Max line length. Left-aligned everything; never centre a block of text. */
  measure: '65ch',
} as const;

/**
 * The wordmark: lowercase `foundos` + a small green dot. No icon, and no `.ai`
 * in the mark — the domain keeps it.
 *
 * The dot means "running" — the visual version of "I run it every week." It is
 * the only decorative element on the entire site.
 */
export const WORDMARK = {
  text: 'foundos',
  /** Circle diameter at desktop wordmark size. Scales proportionally. */
  dotSize: 9,
  /** Gap between the last letter and the dot. */
  dotGap: 6,
} as const;

/**
 * Prices — a floor per level of build, not a menu.
 *
 * Every number here is a "from". They are the honest bottom of what Josh has
 * actually quoted in the field, so a visitor can work out roughly where he
 * lands without the page setting a ceiling the room then has to argue against:
 *
 *   site      $500    a page on its own, nothing connected
 *   ordering  $1,500  Taste of Istanbul and Dogos El Sonora were both quoted here
 *   system    $4,900  Williamson Bros, site + ordering across two locations
 *   running   $150    the floor; a two-location build with a phone agent is $549
 *
 * This replaced a flat "$500 one time / from $150 a month", which was 3-10x
 * under everything being said out loud in the room. A prospect who reads a
 * number here and hears a bigger one at the table has caught us, and the page
 * has anchored the negotiation against us before anyone opens their mouth.
 *
 * The real quote is scoped on the call, because what moves it is what gets
 * connected and how much runs through it — one location or three, forty plates
 * a day or four hundred. The page says that in as many words.
 *
 * Change a number here and the homepage follows. `display` is what a visitor
 * reads; `amount` is what Stripe will charge in phase 6.
 */
export const PRICES = {
  /** A site on its own. The floor of the whole ladder. */
  site: {
    amount: 500,
    display: '$500',
    cadence: 'one time',
    prefix: 'from',
  },
  /** A site that takes its own orders. */
  ordering: {
    amount: 1500,
    display: '$1,500',
    cadence: 'one time',
    prefix: 'from',
  },
  /** Everything connected and running. */
  system: {
    amount: 4900,
    display: '$4,900',
    cadence: 'one time',
    prefix: 'from',
  },
  /** The business. Moves with what is actually running. */
  running: {
    amount: 150,
    display: '$150',
    cadence: 'a month',
    /** Reads "from $150 a month" — the floor, not the ceiling. */
    prefix: 'from',
  },
} as const;

/** Where he is. Used in the footer and the JSON-LD. */
export const LOCATION = { city: 'Atlanta', region: 'GA' } as const;

/**
 * What foundos does, in the site's own words. Used in metadata and JSON-LD so
 * the description can't drift from the hero.
 *
 * Never "local businesses" — it's restaurants and food businesses.
 */
export const DESCRIPTION =
  'I build and run the online side of restaurants and food businesses in Atlanta.';
