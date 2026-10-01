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
      'Customers order straight from you, on your website, without a third-party app taking a cut. I set up a supported ordering system, connect it to your site, get the printer working and test it with your team before it goes public.',
    scope: [
      'One location, one supported ordering provider, and up to 50 menu items with straightforward modifiers, sent in a clean format',
      'Pickup settings, business hours, help with payment onboarding, and the ordering link or embed on your website',
      'One compatible printer or device configured, with one install visit up to 2 hours within 25 miles of Marietta',
      'A test order, payment and refund check where supported, modifier and tax settings confirmed, and a printer routing test',
      'One staff training session up to 60 minutes, a launch checklist, and 14 days of support for problems with the setup',
    ],
    excluded: [
      'Hardware, which is quoted and approved before purchase',
      'Ordering provider subscriptions, payment processing and delivery fees',
      'More than 50 items, complex modifiers, travel beyond 25 miles, network repairs, POS migration and custom integrations, which are quoted',
      'Daily menu syncing and ongoing ordering support, unless quoted separately',
    ],
    process: [
      'Check compatibility: your POS or provider, location, menu size, pickup or delivery, existing equipment and target date',
      'I confirm what works and send the fixed scope with every cost listed, including equipment',
      'You pay half the service fee plus approved equipment to get on the schedule',
      'I set it up, install it and test it with your team',
      'You approve it, pay the remaining balance, and it goes public',
    ],
    timeline:
      'Usually 10 to 15 business days after I have access, the approved menu, the equipment and merchant approval. Delays at the ordering provider move the date.',
    supply: [
      'Your menu with prices, modifiers and allergens',
      'Access to your POS or ordering provider account',
      'Your tax settings, hours and pickup rules',
      'Someone on your team for the test and training',
    ],
    costs:
      'Hardware is separate from the $1,500 service fee and is quoted before you pay anything. A receipt printer is typically a few hundred dollars. Payment processing, provider subscriptions and any delivery fees come from the provider, not from me.',
    payment:
      'Half the service fee plus approved equipment to schedule, and the rest after you approve the test and before it goes public. You own the provider account and the money goes straight to you. I never store card details.',
    faq: [
      {
        q: 'Do you take a percentage of my orders?',
        a: 'No. You pay the one-time service fee. The ordering provider charges its own fees, and you see them before you agree to anything.',
      },
      {
        q: 'Will this replace my POS?',
        a: 'No. It uses a supported ordering system that works with your setup. If your POS can’t support it, I’ll tell you before you pay.',
      },
      {
        q: 'Does my monthly plan cover ordering?',
        a: 'Your plan keeps the ordering link on your website working. Equipment, ordering software and day-to-day ordering support are separate.',
      },
    ],
    buy: [
      'Hardware and provider fees separate, and shown before you pay',
      'Half to schedule, the rest after you approve the test',
      'No percentage of your orders',
    ],
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
