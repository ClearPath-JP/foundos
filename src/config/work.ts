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
  /** How it was built, step by step, in the order it happened. Only steps that really happened. */
  process: readonly { t: string; d: string }[];
  /** Everything that was made for it, not just the website. */
  made: readonly { t: string; d: string }[];
  /** What a visitor should try when they open it. */
  tryIt: readonly string[];
  images: {
    phone: string;
    desktop: string;
    detail: string;
  };
  /** Alt text and caption for `images.detail`. */
  detailAlt: string;
  detailCaption: string;
  /** Heading and button for the "Try it yourself" block. */
  tryTitle: string;
  tryCta: string;
  /** The concept disclaimer shown under the main button. */
  note: string;
  /** Which monthly plan a real version of this build runs on. */
  plan: 'digital-care' | 'growth';
  /** One line on what the plan covers for this build. */
  planLine: string;
  /** The system, in a few words, for the Work grid card. */
  systemLabel: string;
  /** Optional staff/owner screen for the build's system. */
  staff?: { url: string; label: string; how: string };
  /** Optional muted scroll-through loops of the live site. `images.desktop`/`images.phone` double as their posters. */
  videos?: {
    phone: string;
    desktop: string;
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
    process: [
      {
        t: 'Start with who it’s for',
        d: 'Before any design: students and people on a short lunch break, who want to order fast and pick up on the way. That decided everything after it, down to “pickup first” and a one-line promise: Big flavor. Quick stop.',
      },
      {
        t: 'Name, look and words',
        d: 'A color palette and two typefaces, the walking-chile mascot and badge, then every dish name and description written to match. A heat guide so nobody gets surprised.',
      },
      {
        t: 'Build it on a phone first',
        d: 'The ordering flow was designed on a phone screen: pick a dish, choose the protein and heat, add to the cart, pick a time. Big buttons, nothing to pinch or zoom.',
      },
      {
        t: 'Get a second opinion, then fix it',
        d: 'The first version was one long page, and an outside review called it overwhelming. So it was split into separate pages: Menu, Catering, Visit and Our Story, each doing one job.',
      },
      {
        t: 'Build the kitchen side',
        d: 'An order is only useful if the kitchen sees it. The kitchen screen shows each ticket with a chime, lets staff accept it with a ready time, and has an 86 list for things that run out.',
      },
      {
        t: 'Test it start to finish, then launch',
        d: 'Real orders placed from a phone and watched arriving on the kitchen screen, then published on its own web address for anyone to try.',
      },
    ],
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
      {
        t: 'Catering and story pages',
        d: 'A catering page with packages and an inquiry form, a visit page with directions and the neighborhood, and an Our Story page starring the mascot as a made-up founder.',
      },
      { t: 'Built for phones', d: 'Designed on a phone screen first, since that’s where a pickup order gets placed.' },
    ],
    tryIt: [
      'Add a Quick Trip combo and pick your heat',
      'Change the pickup time in the cart',
      'Fill out the catering form (nothing is sent)',
    ],
    detailAlt: 'The Wandering Chile menu: meal deals with prices and Add to Order buttons, then the taco section.',
    detailCaption: 'The meal deals and menu, each item one tap from the cart.',
    tryTitle: 'Place an order. It takes a minute.',
    tryCta: 'Try the ordering demo',
    note: 'The restaurant, address, hours and menu are made up. Ordering is a working demo: nothing is charged and no order is sent.',
    plan: 'growth',
    planLine: 'Website plus online pickup ordering: the Growth plan with the one-time Direct Ordering Launch setup.',
    systemLabel: 'Online pickup ordering',
    images: {
      phone: '/work/wandering-chile-phone.jpg',
      desktop: '/work/wandering-chile-desktop.jpg',
      detail: '/work/wandering-chile-menu.jpg',
    },
    videos: {
      phone: '/work/wandering-chile-scroll-mobile.mp4',
      desktop: '/work/wandering-chile-scroll-desktop.mp4',
    },
  },
  {
    slug: 'cinder-and-fig',
    name: 'Cinder & Fig',
    kind: 'concept',
    url: 'https://cinder-and-fig.vercel.app',
    type: 'Upscale Mediterranean dinner, reservations first',
    summary:
      'A made-up Buckhead restaurant with the full guest-to-staff loop: a website built to be found, a booking system with real table inventory, and the host-stand screen the staff use to run the night.',
    process: [
      {
        t: 'Study the neighborhood',
        d: 'I looked at how the busiest dinner spots in Buckhead organize their sites: reservations first, then the menu, private events and how to get there. I took the order, not the words or the look.',
      },
      {
        t: 'Brand, story and menu',
        d: 'Warm walnut, limestone, olive and bronze. An owner’s story, a full menu with prices, and a gatherings page for private dinners, all written before a single page was built.',
      },
      {
        t: 'Pictures that match the food',
        d: 'The dining room, bar and front of the building, plus food photos checked against each menu description, so what a guest sees is what they order.',
      },
      {
        t: 'A booking system with real tables',
        d: 'Not a contact form pretending to book. Each table has a seat count, guests only see times that are actually open, and two people can’t take the same table.',
      },
      {
        t: 'The host stand, built from the floor plan',
        d: 'Every table drawn on a map of the room, so the host sees who’s seated, who’s next and which table is free. Walk-ins and a waitlist live on the same screen.',
      },
      {
        t: 'Make it easy to find, then launch',
        d: 'Restaurant and menu details marked up for Google and AI answers, questions answered on the page, a sharper hero, then published for anyone to try.',
      },
    ],
    made: [
      {
        t: 'Brand and words',
        d: 'The look, the menu with every price, an Our Story page and a gatherings page, written so guests know what to expect before they arrive.',
      },
      {
        t: 'Online table booking',
        d: 'Party size, date and time against real table inventory. A double tap can’t double-book, and guests get a private link to change or cancel.',
      },
      {
        t: 'Host stand for staff',
        d: 'Tonight’s book on a laptop or tablet: guest list by stage, a floor plan of every table, walk-ins and a waitlist. New bookings appear within seconds, and staff move each table from seated to paid.',
      },
      {
        t: 'Built to be found',
        d: 'Restaurant, menu and FAQ structured data, answer-first FAQs and a neighborhood section, the groundwork for Google and AI answers.',
      },
      { t: 'Built for phones', d: 'Designed on a phone first, with Book, Directions and Call always one thumb away.' },
    ],
    tryIt: [
      'Book a table for tonight or later this week',
      'Open the host stand and watch your booking appear',
      'Change or cancel it from your private link',
    ],
    detailAlt: 'The Cinder & Fig host stand: the guest list by stage, a floor plan with every table’s status, and a selected party’s meal progress.',
    detailCaption: 'The host stand: bookings land within seconds, tables show who’s seated and how far along they are, and walk-ins go straight to a free table.',
    tryTitle: 'Book a table, then watch it arrive.',
    tryCta: 'Book a demo table',
    note: 'The restaurant, menu and photos are a concept. Booking is a working demo with real table inventory: no table is held, and no email, text or payment is sent.',
    plan: 'growth',
    planLine: 'Website plus online booking and the staff screen: the Growth plan.',
    systemLabel: 'Table booking + live host stand',
    staff: {
      url: 'https://cinder-and-fig.vercel.app/staff',
      label: 'Open the host stand',
      how: 'Ask me for the demo PIN.',
    },
    images: {
      phone: '/work/cinder-fig-phone.jpg',
      desktop: '/work/cinder-fig-desktop.jpg',
      detail: '/work/cinder-fig-host-stand.jpg',
    },
  },
];

/** The entry the homepage features. */
export const FEATURED_WORK = WORK[0];
