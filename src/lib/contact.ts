/**
 * Single source of truth for the ways a visitor can reach JP.
 * The AI demo line and the cell both appear in several places — keep them here
 * so a number never goes stale in one spot and not another.
 */

export const CAL = 'https://calendly.com/josh-potesta';
export const EMAIL = 'hello@foundos.ai';

/** JP's cell, for `sms:` and `tel:`. */
export const PHONE = '4044363393';
export const PHONE_PRETTY = '(404) 436-3393';

/** The live Vapi demo line a prospect can call and order from out loud. */
export const DEMO_LINE = '2762951209';
export const DEMO_LINE_PRETTY = '(276) 295-1209';

/**
 * Demos owned outright — generic builds on licensed stock, with no real
 * business's name or brand attached.
 *
 * ⚠️ Never list a spec build made for a real prospect here — Williamson Bros,
 * Caribbean Spice, Clahvay, Taste of Istanbul, Heirloom, Babygirl, Amistad.
 * None of them have hired us. Showing their name reads as "client" to every
 * visitor, which is untrue, and it puts a live deal at risk if the owner ever
 * sees their restaurant used as someone else's portfolio piece.
 *
 * A build graduates into this list the day that client pays.
 */
export const DEMOS = [
  {
    label: 'Food truck',
    href: '/demo/truckos?biz=truck',
    note: 'Live location, order-ahead, one-tap sold out',
  },
  {
    label: 'Bakery',
    href: '/demo/truckos?biz=bakery',
    note: 'Pre-orders with a deposit, weekly items, sold-out board',
  },
] as const;
