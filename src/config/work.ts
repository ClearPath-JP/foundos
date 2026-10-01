/**
 * Portfolio entries. Added 2026-10-01 with the first concept build.
 *
 * ⚠️ A CONCEPT IS LABELLED A CONCEPT, EVERYWHERE IT APPEARS. The Wandering
 * Chile is a made-up restaurant: the name, mascot, menu, address and hours are
 * invented, and the live site says so in its own footer. The offer doc only
 * allows a "Results" section with authorized, verifiable examples, so concepts
 * live under "Work" and never claim customers, orders or numbers. A real
 * client gets `kind: 'client'` only once they have paid and agreed to be shown.
 */

export type WorkKind = 'concept' | 'client';

export type WorkItem = {
  slug: string;
  name: string;
  kind: WorkKind;
  url: string;
  /** What kind of place it is, in a few words. */
  type: string;
  summary: string;
  /** Everything that was made for it, not just the website. */
  made: readonly { t: string; d: string }[];
  /** What a visitor should try when they open it. */
  tryIt: readonly string[];
  images: {
    phone: string;
    desktop: string;
    detail: string;
  };
};

export const WORK: readonly WorkItem[] = [
  {
    slug: 'the-wandering-chile',
    name: 'The Wandering Chile',
    kind: 'concept',
    url: 'https://the-wandering-chile.vercel.app',
    type: 'Quick-service Mexican, pickup first',
    summary:
      'A made-up taco spot, built from nothing so you can see the whole job in one place: the name, the logo, the words on the menu, and a pickup order you can actually place.',
    made: [
      { t: 'Name and logo', d: 'The name, the walking-chile mascot and the badge, built around one idea: food for people on the move.' },
      {
        t: 'Menu and words',
        d: 'Every dish name, description and price, a meal-deal section, and a heat guide so customers know what “hot” means before they order.',
      },
      {
        t: 'Online pickup',
        d: 'Pick a dish, choose the protein and heat, add it to the cart and pick a time. Orders wait on a shelf by the door with the customer’s name on them.',
      },
      { t: 'Built for phones', d: 'Designed on a phone screen first, since that’s where a pickup order gets placed.' },
    ],
    tryIt: [
      'Add a Quick Trip combo and pick your heat',
      'Change the pickup time in the cart',
      'Read the heat guide and the FAQ',
    ],
    images: {
      phone: '/work/wandering-chile-phone.jpg',
      desktop: '/work/wandering-chile-desktop.jpg',
      detail: '/work/wandering-chile-menu.jpg',
    },
  },
];

/** The entry the homepage features. */
export const FEATURED_WORK = WORK[0];
