/**
 * The two working systems behind the Growth plan, explained for a restaurant owner. One source of truth for
 * /restaurant-systems. Every line here describes something the demo actually does today (checked against the
 * Cinder & Fig and Wandering Chile builds, 2026-10-03). Planned work lives in NOT_YET, never in the feature lists.
 *
 * Prices are never written here: the page reads them from offer.ts.
 */

export type SystemSlug = 'booking' | 'ordering';

export type SystemSide = { who: string; points: readonly string[] };

export type RestaurantSystem = {
  slug: SystemSlug;
  name: string;
  /** Who it's for, in owner language. */
  forWho: string;
  /** One sentence on what it replaces. */
  replaces: string;
  sides: readonly [SystemSide, SystemSide, SystemSide];
  demo: { name: string; guestUrl: string; guestCta: string; staffUrl: string; staffCta: string };
  /** What I do by hand to set it up at one restaurant: the reason for the one-time setup fee. */
  setup: { title: string; steps: readonly { t: string; d: string }[] };
  /** `crop` is a readable close-up shown on phones instead of the full desktop screen. */
  shot: { src: string; crop: string; alt: string; caption: string };
};

export const SYSTEMS: readonly [RestaurantSystem, RestaurantSystem] = [
  {
    slug: 'booking',
    name: 'Table booking + host stand',
    forWho: 'For sit-down restaurants that take reservations, walk-ins and the odd large party.',
    replaces: 'Replaces the paper book and a per-cover booking app, and cuts down the voicemail callbacks.',
    sides: [
      {
        who: 'Your guests',
        points: [
          'Book from your website, seeing only the times that are really open',
          'Add a mobile number, allergies and the occasion',
          'Change or cancel from a private link, without calling',
        ],
      },
      {
        who: 'Your host',
        points: [
          'Tonight’s bookings, live on a tablet: upcoming, waitlist, seated, finished',
          'Your real floor plan, with every table’s state at a glance',
          'Seat, move tables, take phone bookings and walk-ins, run a waitlist',
          'VIP and allergy flags on every row, and an alert when a guest changes a booking',
        ],
      },
      {
        who: 'You, the owner',
        points: [
          'Pause online booking for an hour or the night, and close dates for holidays or buyouts',
          'Pacing: cap how many guests can arrive in any 15 minutes',
          'A change history on every booking: who did what, and when',
        ],
      },
    ],
    setup: {
      title: 'I build your floor plan in, by hand',
      steps: [
        { t: 'I see your room.', d: 'A walk-through, or photos and a rough sketch if that’s easier.' },
        {
          t: 'I draw every table into the system.',
          d: 'Where it sits, how many it seats, and which tables push together for a party of eight. You check it and fix anything I got wrong.',
        },
        {
          t: 'I set up the host stand.',
          d: 'A tablet and stand, bought for you and signed in at your host stand, with your hours, party sizes and pacing rules.',
        },
        { t: 'We run a test night.', d: 'Your host takes test bookings, seats walk-ins and runs the waitlist before a real guest books.' },
        {
          t: 'I put your Book button where people find you.',
          d: 'On your Google listing, Apple Maps and Instagram, all pointing at your own booking page. Each link is tracked, so your monthly report shows how many bookings came from Google.',
        },
      ],
    },
    demo: {
      name: 'Cinder & Fig',
      guestUrl: 'https://cinder-and-fig.vercel.app/reservations',
      guestCta: 'Book a demo table',
      staffUrl: 'https://cinder-and-fig.vercel.app/staff',
      staffCta: 'Open the host stand',
    },
    shot: {
      src: '/work/cinder-fig-host-stand-v3.jpg',
      crop: '/work/cinder-fig-host-stand-v3-crop.jpg',
      alt: 'The Cinder & Fig host stand: tonight’s guest list with VIP and allergy tags beside a floor plan of ten tables.',
      caption: 'The host stand on a concept build. Names show as initials unless the booking was made on that device.',
    },
  },
  {
    slug: 'ordering',
    name: 'Online ordering + kitchen screen',
    forWho: 'For counter-service spots, trucks and takeout-heavy kitchens.',
    replaces: 'Replaces phone orders read back over the fryer, and paying a marketplace a cut of your pickup orders.',
    sides: [
      {
        who: 'Your customers',
        points: [
          'Order pickup from your website: ASAP or a set time',
          'Choose options and extras, see tax and the total before they order',
          'Follow the order live: received, cooking, ready',
        ],
      },
      {
        who: 'Your kitchen',
        points: [
          'Tickets appear within seconds with a chime, sorted by pickup time',
          'Accept with a ready-in time, which updates the customer’s pickup time',
          'Mark ready and picked up, with Undo and Recall for a wrong tap',
          'An alarm and a red ticket if an order sits unaccepted',
        ],
      },
      {
        who: 'You, the owner',
        points: [
          'An 86 list for items or options (out of guac?), reset every morning',
          'Snooze online orders for 20 or 40 minutes, or the rest of the day. It turns back on by itself',
          'Today’s orders, sales and average time to ready, plus a log of every ticket change',
        ],
      },
    ],
    setup: {
      title: 'I set up your menu and your kitchen screen',
      steps: [
        { t: 'I enter your menu.', d: 'Every item, option, price and your tax rate, checked with you line by line.' },
        {
          t: 'I set up the kitchen screen.',
          d: 'A tablet and stand, bought for you and signed in where the kitchen can see it, with a chime they’ll hear over the line.',
        },
        { t: 'I set your rules.', d: 'Pickup hours, prep times, and how long before an unaccepted ticket turns red.' },
        { t: 'We run a test service.', d: 'Real test orders from a phone, accepted, cooked and marked ready by your team before it goes public.' },
        {
          t: 'I put your Order button where people find you.',
          d: 'On your Google listing, Apple Maps and Instagram, so regulars order from you instead of through an app. Each link is tracked, so your monthly report shows how many orders came from Google.',
        },
      ],
    },
    demo: {
      name: 'The Wandering Chile',
      guestUrl: 'https://the-wandering-chile.vercel.app/menu',
      guestCta: 'Place a demo order',
      staffUrl: 'https://the-wandering-chile.vercel.app/kitchen',
      staffCta: 'Open the kitchen screen',
    },
    shot: {
      src: '/work/wandering-chile-kitchen.jpg',
      crop: '/work/wandering-chile-kitchen-crop.jpg',
      alt: 'The Wandering Chile kitchen screen: new, cooking and ready columns of pickup tickets with tax and totals.',
      caption: 'The kitchen screen on a concept build. “Text OK” means the customer agreed to a ready text; no texts are sent until a messaging provider is connected. Customers pay at pickup.',
    },
  },
];

/** "What happens when…" — the failure cases owners ask about, and what the system does. */
export const SAFEGUARDS: readonly { when: string; then: string; system: 'Both' | 'Booking' | 'Ordering' }[] = [
  {
    when: 'Two guests try to book the last table at the same moment',
    then: 'One gets it. The other is shown the closest times still open, so the same table can’t be booked twice.',
    system: 'Booking',
  },
  {
    when: 'A customer taps “Place order” twice, or their signal drops',
    then: 'One booking or order, not two. A retry finds the one that already went through.',
    system: 'Both',
  },
  {
    when: 'The bag changes after they tapped “Place order”',
    then: 'The old attempt can’t be replayed with the new bag. They review it and place it once.',
    system: 'Ordering',
  },
  {
    when: 'The kitchen runs out of something mid-shift',
    then: 'Tap it on the 86 list. It can’t be ordered until you turn it back on, and the list clears for the next day.',
    system: 'Ordering',
  },
  {
    when: 'The kitchen is slammed',
    then: 'Snooze online orders, or turn up the prep time so new orders quote a later pickup.',
    system: 'Ordering',
  },
  {
    when: 'An order sits and nobody has accepted it',
    then: 'After two minutes the ticket turns red, a banner names it and the chime repeats until someone taps it.',
    system: 'Ordering',
  },
  {
    when: 'The kitchen tablet dies or loses Wi-Fi',
    then: 'If no kitchen screen has checked in for three minutes, online ordering switches itself off, so no order goes unseen.',
    system: 'Ordering',
  },
  {
    when: 'Two screens tap the same ticket',
    then: 'The second tap is refused with “already moved on another screen”, instead of quietly overwriting.',
    system: 'Ordering',
  },
  {
    when: 'Someone bumps or cancels the wrong thing',
    then: 'Undo on the spot, or Recall from the finished list. Cancelled bookings can be restored if the table is still free.',
    system: 'Both',
  },
  {
    when: 'A guest changes or cancels their booking online',
    then: 'The host stand flags the row and says so. Once a party is seated, they can’t change it online any more.',
    system: 'Booking',
  },
  {
    when: 'Something looks wrong and you need to know who did it',
    then: 'Every booking and ticket keeps a history: who, what and when, signed with the name on that screen.',
    system: 'Both',
  },
  {
    when: 'A holiday, a buyout or a storm',
    then: 'Close the date or pause online booking in two taps. Phone bookings and walk-ins still work.',
    system: 'Booking',
  },
  {
    when: 'Someone tampers with prices on their phone',
    then: 'Every price and the tax are worked out again from your menu when the order arrives. What their phone says is ignored.',
    system: 'Ordering',
  },
];

/** How a system goes live at a restaurant. */
export const SETUP: readonly { t: string; d: string }[] = [
  {
    t: 'Your room or your menu, set up',
    d: 'From a photo or sketch of your dining room, I lay out your tables, seats and which ones push together. For ordering, I enter your menu, options and prices.',
  },
  {
    t: 'Your rules',
    d: 'Hours, party sizes, how long a table is held, pacing, prep time and tax rate. You approve all of it before anything goes live.',
  },
  {
    t: 'A test service with your team',
    d: 'Your staff sign in on their own tablet or phone, run real test bookings or orders, and practise the busy-night buttons.',
  },
  {
    t: 'Go live, then I watch it',
    d: 'It goes on your website. I check in after the first services and adjust anything that didn’t fit how you actually work.',
  },
];

/**
 * The same limits in one line per system, shown right beside each price (2026-10-04 conversion review: limits
 * must not be buried at the bottom of a long page). Keep in step with NOT_YET below.
 */
export const LIMITS: Record<SystemSlug, string> = {
  booking:
    'Not included today: deposits or no-show fees, automatic confirmation or reminder texts and emails, and a link to your POS. Guests get an on-screen confirmation and a private link to change or cancel.',
  ordering:
    'Pickup only, paid at pickup. Not included today: online card payment, delivery, a link to your POS, ticket printing, and automatic text or email messages. Tickets show on a separate kitchen tablet.',
};

/** Honest limits. Shown on the page so nobody is surprised. */
export const NOT_YET: readonly { t: string; d: string }[] = [
  {
    t: 'Text and email messages',
    d: 'No confirmations, reminders or “ready” texts are sent. Guests get an on-screen confirmation and a private link. Ordering asks for consent to a ready text, so it can be switched on with a messaging provider, billed separately.',
  },
  { t: 'Online card payment', d: 'Ordering is pay at pickup, and booking takes no deposits or no-show fees.' },
  { t: 'Your till (POS) or a ticket printer', d: 'Tickets show on the kitchen screen, on a tablet.' },
  { t: 'Delivery', d: 'Ordering is pickup only.' },
];
