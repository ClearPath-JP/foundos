/**
 * Detail-page content for the projects that can be bought today, doc §4 and §5.
 * Keyed by slug; a live project in config/offer.ts without an entry here has
 * no detail page (generateStaticParams only emits slugs present in both).
 */
export type ProjectDetail = {
  outcome: string;
  scope: readonly string[];
  excluded: readonly string[];
  process: readonly string[];
  timeline: string;
  supply: readonly string[];
  costs: string;
  payment: string;
  faq: readonly { q: string; a: string }[];
  /** Lines in the buy box, next to the button. */
  buy: readonly string[];
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'direct-ordering-launch': {
    outcome:
      'Customers order pickup straight from your website, and the ticket lands on a tablet in your kitchen within seconds. No third-party app takes a cut. I enter your menu, set up the kitchen tablet I supply, and run a test service with your team before it goes public.',
    scope: [
      'One location, pickup ordering on your website, and up to 50 menu items with straightforward options, sent in a clean format',
      'Your menu, options, prices, prep times, hours and tax rate entered and checked with you',
      'One kitchen tablet and stand, supplied, set up and signed in to your kitchen screen',
      'One install visit up to 2 hours within 25 miles of Marietta, with test orders run start to finish',
      'One staff training session up to 60 minutes: accepting, the 86 list, snoozing orders on a slammed night',
      '14 days of close support after launch for problems with the setup',
    ],
    excluded: [
      'A ticket printer, which is quoted and approved before purchase',
      'Online card payment and delivery. Customers pay at pickup',
      'More than 50 items, complex modifiers, travel beyond 25 miles, network repairs and POS integration, which are quoted',
    ],
    process: [
      'A quick fit check: your menu size, how you take orders today, and your target date',
      'I send the fixed scope, with any extra equipment listed and priced',
      'You pay half to get on the schedule. That is when the tablet is ordered',
      'I enter your menu, install the kitchen screen and test it with your team',
      'You approve it, pay the remaining balance, and it goes live on your website',
    ],
    timeline: 'Usually 10 to 15 business days after I have the approved menu, prices and tax settings.',
    supply: [
      'Your menu with prices, options and allergens',
      'Your hours, prep times and tax rate',
      'Wi-Fi at the pickup counter or kitchen',
      'Someone on your team for the test and training',
    ],
    costs:
      'The kitchen tablet and stand are inside the setup price. A ticket printer, if you want paper tickets, is quoted before you pay anything. The Growth plan covers the monthly running of the system.',
    payment:
      'Half to schedule, and the rest after you approve the test service and before it goes public. Customers pay you at pickup, so I never touch your money or card details.',
    faq: [
      {
        q: 'Do you take a percentage of my orders?',
        a: 'No. You pay the one-time setup and the monthly plan. There is no commission and no per-order fee.',
      },
      {
        q: 'Will this replace my POS?',
        a: 'No. Online orders show on their own kitchen screen next to whatever you use today. Ring them in at pickup like any order.',
      },
      {
        q: 'Who owns the tablet?',
        a: 'You do. It’s included in the setup price and stays at your restaurant.',
      },
    ],
    buy: ['Kitchen tablet and stand included', 'Half to schedule, the rest after you approve the test', 'No percentage of your orders'],
  },
  'booking-launch': {
    outcome:
      'Guests book a table on your website and only see times that are really open. Your host runs the night from a tablet showing your actual dining room. I draw your floor plan into the system by hand, supply and set up the host-stand tablet, and run a test service with your staff.',
    scope: [
      'One location and one dining room, plus a patio or bar area if you seat it',
      'Your floor plan built by hand from a walk-through or photos: every table, its seat count, and which tables push together for bigger parties',
      'Your rules set up: hours, party sizes, how long a table is held, and how many guests can arrive in any 15 minutes',
      'One host-stand tablet and stand, supplied, set up and signed in',
      'Booking added to your website, with Book buttons where guests look for them',
      'One staff training session up to 60 minutes: seating, walk-ins, the waitlist, closing a date',
      '14 days of close support after launch',
    ],
    excluded: [
      'Deposits, card holds and no-show fees',
      'Text and email reminders, which need a messaging provider billed separately',
      'Extra tablets or a second dining room, which are quoted',
    ],
    process: [
      'A walk-through of your room, or photos and a rough sketch if that’s easier',
      'I draw the floor plan and send it back. You fix anything I got wrong',
      'You pay half to get on the schedule. That is when the tablet is ordered',
      'I set up your rules, install the host stand and run test bookings with your staff',
      'You approve it, pay the remaining balance, and booking goes live on your website',
    ],
    timeline: 'Usually 7 to 10 business days after the walk-through.',
    supply: [
      'A walk-through or photos of your dining room',
      'Your hours, party-size limits and how long a table usually turns',
      'Wi-Fi at the host stand',
      'Your host or manager for the test and training',
    ],
    costs:
      'The host-stand tablet and stand are inside the setup price. The Growth plan covers the monthly running of the system. There are no per-cover or per-booking fees.',
    payment: 'Half to schedule, and the rest after you approve the test service and before it goes public.',
    faq: [
      {
        q: 'Why is there a setup fee?',
        a: 'Because your floor plan is built by hand, table by table, and the tablet at your host stand is bought for you and set up before your first service.',
      },
      {
        q: 'What if we move tables around?',
        a: 'Send me a photo. Moving or adding tables comes out of your monthly update time.',
      },
      {
        q: 'Who owns the tablet?',
        a: 'You do. It’s included in the setup price and stays at your restaurant.',
      },
    ],
    buy: ['Host-stand tablet and stand included', 'Your real floor plan, built by hand', 'No per-cover or per-booking fees'],
  },
  'social-profile-cleanup': {
    outcome:
      'Your social profiles say the same thing your website and Google say: the right hours, links, phone number and look. Done once, so a customer checking Instagram doesn’t get last year’s information.',
    scope: [
      'Up to 3 profiles, like Instagram, Facebook and one more',
      'Bios, links, hours and contact details updated',
      'Profile and cover images made consistent, using photos and logos you send',
      'One revision round',
    ],
    excluded: [
      'Posting, content creation or ongoing management',
      'New logos or brand design',
      'Ads or paid promotion',
      'Recovering accounts you’ve lost access to',
    ],
    process: [
      'A quick check that your profiles are ones I can work on',
      'You pay the fixed price',
      'I make the changes, and you review them',
      'One round of revisions, then done',
    ],
    timeline: 'Scheduled when you pay. Work starts once I have access to the profiles and your assets.',
    supply: ['Access to each profile', 'Your logo and photos', 'Current hours, links and contact details'],
    costs: 'None. The price is fixed.',
    payment: 'Paid up front after the eligibility check. If a profile turns out not to be workable, that part is refunded.',
    faq: [
      {
        q: 'Is this included in a monthly plan?',
        a: 'No. Monthly plans cover your website and Google profile. This is a one-time cleanup of your other social profiles.',
      },
      {
        q: 'Will you post for me after?',
        a: 'Not as part of this project. Ongoing posting is quoted separately.',
      },
    ],
    buy: ['Fixed price, paid after a quick check', 'Up to 3 profiles, one revision round'],
  },
};
