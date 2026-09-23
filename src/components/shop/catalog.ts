import { DEMO_LINE_PRETTY, PHONE } from '@/config/brand';
import { SYSTEMS, type BusinessType, type SystemSlug, type SystemStatus } from '@/config/pricing';

/* The call allowance, read off the config so the card and the FAQ cannot drift from it. */
const AI = SYSTEMS.find((s) => s.slug === 'ai-receptionist');
const AI_MINUTES =
  AI?.includedMinutes && AI.overageCentsPerMinute
    ? `${AI.includedMinutes} call minutes a month are included — plenty for missed calls and after hours. Past that it is ${AI.overageCentsPerMinute}¢ a minute.`
    : 'Call minutes are metered, and I tell you the allowance before you sign.';

/**
 * The customer-facing copy for the shop — what each system does, in the words
 * an owner would use. Prices are NOT written here; they come out of
 * config/pricing.ts so a number can only ever change in one place.
 *
 * Source: foundos/pricing/02-systems-catalog.md, moved into the site's voice —
 * first person, because the site is Josh talking ("I host it", not "we host
 * it"), and the same no-villain rule as the service pages.
 *
 * ⚠️ WHAT WAS LEFT OUT ON PURPOSE. Three answers in the catalog doc are still
 * marked DECIDE — call minutes included with the AI Receptionist, whether
 * Text-Back needs a new number, and the text-command controls for ordering.
 * None of them is printed here. A FAQ that answers a question Josh has not
 * answered yet is a promise somebody else wrote for him.
 */

export type SystemCopy = {
  /** The outcome, one line. A card's only job is to earn the tap. */
  headline: string;
  /** Three numbered steps — only where it is a real sequence. */
  steps?: readonly [string, string, string];
  /** Plain description, for the systems that are a service rather than a sequence. */
  what?: string;
  goodFit?: string;
  need: string;
  faq: readonly { q: string; a: string }[];
  /** A line under the price, when the price has a rule attached. */
  priceNote?: string;
  /** The long page about it, where one exists. */
  page?: { href: string; label: string };
};

export const WEBSITE_COPY: SystemCopy = {
  headline: 'A site that shows your food and gets people to your door.',
  what: 'Your menu with real photos, your hours, where you are and a button that actually dials. Fast on a phone, which is where your customers look you up. I host it, keep it secure, and make the small changes for you — hours, prices, a new dish — up to two a month.',
  need: 'Your menu, your logo (a photo of your sign works), and photos of your food. No photos? I will take them.',
  faq: [{ q: 'Can I change my prices later?', a: 'Yes. Text me the change and I update it.' }],
  page: { href: '/restaurant-websites', label: 'The ten things I check on a food site' },
};

export const SYSTEM_COPY: Record<SystemSlug, SystemCopy> = {
  'truck-tracker': {
    headline: 'Customers always know where your truck is.',
    steps: [
      'You text your spot, like "tomorrow 11 to 3 at Marietta Square" or "closed today."',
      'Your site updates itself and texts you back to confirm.',
      'Customers see whether you are open now, where you will be next, and get directions in one tap.',
    ],
    goodFit: 'You move around, and people ask "where are you today?" in your comments and reviews.',
    need: 'The phone number you will text from, and your usual spots.',
    faq: [
      {
        q: 'What if I type the location wrong?',
        a: 'You get a confirmation text. Reply FIX to change it. If a spot is unclear, it asks you instead of guessing.',
      },
      { q: 'Do I need an app?', a: 'No. Regular texting.' },
    ],
    page: { href: '/food-truck-location', label: 'What it costs to run, and when not to buy it' },
  },
  'online-ordering': {
    headline: 'Take pickup orders online without paying app commissions.',
    steps: [
      'Customers pick their food on your site and pay by card.',
      'You get the order by text, on a tablet, or on a printer.',
      'They pick it up. No line, no phone call, no 15–30% app cut.',
    ],
    goodFit: "Your line gets long, your phone rings during the rush, or you're tired of handing an app a cut of every order.",
    need: 'Your full menu with prices, and whether you want orders by text, tablet or printer.',
    faq: [
      {
        q: 'Are there card fees?',
        a: 'Yes — standard card processing, the same as any card reader, and they are yours. An order printer is billed at what it costs me.',
      },
      {
        q: 'Can I stop orders when I am slammed?',
        a: 'Yes. One tap pauses ordering, and one tap marks an item sold out.',
      },
    ],
    page: { href: '/online-ordering', label: 'The arithmetic on an $18 plate' },
  },
  'catering-leads': {
    headline: 'Turn catering requests into booked jobs.',
    steps: [
      'Customers fill out a short form: date, headcount, location and what they want.',
      'They get an instant reply, and you get every detail in one text.',
      'If they do not book, a friendly follow-up goes out for you.',
    ],
    goodFit: "You cater, and requests get lost in DMs, voicemails and emails you don't get to in time.",
    need: 'Your catering menu or price ranges, and your minimum order.',
    faq: [
      {
        q: 'Do I still talk to the customer?',
        a: 'Yes. This makes sure you hear about every request fast, and nobody goes cold before you reply.',
      },
    ],
  },
  'missed-call-text-back': {
    headline: 'Every call you miss gets a text back.',
    steps: [
      "You miss a call because you're busy.",
      'The caller instantly gets a text with your menu and ordering link.',
      'If they reply, you see the conversation and answer when you are free.',
    ],
    goodFit: 'Your phone rings during the rush and nobody can pick it up.',
    need: 'Your business phone number.',
    faq: [
      {
        q: 'What if I add Phone Answering later?',
        a: 'Then every call gets answered, so Text-Back comes off your plan.',
      },
    ],
  },
  'review-booster': {
    headline: 'More Google reviews, without asking in person.',
    steps: [
      'A customer orders.',
      'A little later they get a short text asking how it was, with a link to review you on Google.',
      'More reviews help new customers trust you and help you show up on Google.',
    ],
    goodFit: 'People love your food, but only a few ever leave a review.',
    need: 'Your Google Business Profile link.',
    faq: [
      {
        q: 'Can it send only the happy customers to Google?',
        a: "No. Google doesn't allow that, and it can get your reviews removed. Everybody gets the same link. They can send you private feedback instead if they'd rather.",
      },
    ],
  },
  'google-boost': {
    headline: 'Show up higher when people nearby search for food.',
    what: 'I set up and clean up your Google Business Profile, keep your hours and menu right everywhere, post updates and new photos, and send you a plain monthly report of calls and direction requests.',
    goodFit: "You have a fixed location and people nearby aren't finding you.",
    need: "Access to your Google Business Profile. Don't have one? I'll help you set it up.",
    faq: [
      {
        q: 'How fast does it work?',
        a: 'It usually takes a few months to see a difference. Anybody promising you #1 on Google is guessing.',
      },
    ],
    page: { href: '/google-business-profile', label: 'What actually moves a Google listing' },
  },
  'text-club': {
    headline: 'Bring customers back with a text.',
    steps: [
      'Customers join by texting a word to your number, or ticking a box when they order.',
      'You send specials, new dishes, or where the truck is today.',
      'Regulars come back more often. Anybody can leave by replying STOP.',
    ],
    goodFit: 'You have regulars and want them back more often.',
    need: 'What you would send and how often. Once or twice a week at most is what I recommend.',
    faq: [
      {
        q: 'Can I text my existing customer list?',
        a: 'Only the people who agreed to hear from you. Texting anyone else breaks carrier rules and can get your number blocked.',
      },
    ],
  },
  'ai-receptionist': {
    headline: "The calls you can't get to still get answered.",
    steps: [
      'A call comes in while you are slammed, or after you close.',
      'The AI picks up, says it is your virtual assistant, and handles the common questions — hours, location, menu.',
      "It can text the caller your menu or ordering link mid-call, and passes anything it can't handle to you.",
    ],
    goodFit: 'Calls ring out during the rush, or people call after you close and get nothing.',
    need: 'Your hours, your menu, the questions you get most, and when a call should go to a person.',
    faq: [
      { q: 'Will callers know it is AI?', a: 'Yes. It introduces itself as your virtual assistant.' },
      { q: 'Is there a call limit?', a: AI_MINUTES },
      { q: 'Can I hear it first?', a: `Yes. Call the demo line: ${DEMO_LINE_PRETTY}.` },
    ],
    priceNote: `${AI_MINUTES} The monthly never takes a package discount.`,
    page: { href: '/ai-phone-answering', label: 'What it gets wrong, and how to catch it' },
  },
  'second-location': {
    headline: 'Online ordering for your second spot.',
    what: 'A second ordering location — a restaurant and a truck, or two storefronts — each with its own menu and its own order alerts.',
    need: 'The second menu, if it is different from the first.',
    faq: [],
    priceNote: 'Needs Online Ordering. Never discounted, and does not count toward a package discount.',
  },
};

/**
 * The services — Josh's time, not software. Same shape as a system's copy so
 * the cards read the same, but priced and explained as labour.
 *
 * ⚠️ NO RESULTS ARE PROMISED HERE AND NONE MAY BE ADDED. No follower counts, no
 * "more customers", no reach numbers. The honest claim is availability: the
 * posts go out. The same rule the rest of the site runs on.
 */
export const SERVICE_COPY: Record<string, SystemCopy> = {
  'menu-design': {
    headline: 'A menu that looks like your food.',
    what: 'Your menu or a flyer, laid out properly and print-ready, using the photos I take for the site. Printing is billed at what it costs me, with the invoice shown.',
    need: 'Your current menu with prices, and anything that has changed since it was printed.',
    faq: [
      {
        q: 'Do you do the printing too?',
        a: 'I get it printed and hand you the invoice at cost. No markup on paper.',
      },
    ],
    priceNote: 'One time. Not a monthly, and it takes no package discount.',
  },
  'social-setup': {
    headline: 'Your Instagram and Facebook match your storefront.',
    what: 'Profile photo, a bio that says what you sell and where you are, highlights in an order that makes sense, and your hours, address and phone identical on Instagram, Facebook and Google. Done once, on the same visit as the photos for your site.',
    goodFit: 'Your accounts were set up years ago, or by whoever worked there at the time.',
    need: 'Access to the accounts, and twenty minutes on the phone.',
    faq: [
      {
        q: 'Do I have to give you my password?',
        a: 'No, and you should not give it to anybody. Instagram and Facebook let you add me through Meta Business Suite, and you can remove me in two taps.',
      },
    ],
    priceNote: 'One time. Not a monthly, and it takes no package discount.',
  },
  'social-content': {
    headline: 'Posts that go out whether you remember or not.',
    steps: [
      'I come to you once a month and shoot the food, the room and whatever is new.',
      'I write and schedule eight to twelve posts, plus stories, and send you the month in one message.',
      'You say yes, or tell me what to change. One round of changes, then it runs.',
    ],
    goodFit: 'You know you should be posting, and it is the first thing that falls off in a busy week.',
    need: 'An hour at your place once a month, and a heads-up on specials, closures and events.',
    faq: [
      {
        q: 'Will this get me more customers?',
        a: 'I will not promise you a number. What it does is stop you being invisible for three weeks at a time, so somebody checking you out finds a place that looks open and looked after.',
      },
      { q: 'Can I still post my own things?', a: 'Yes. It is your account. I fill the gaps, I do not take it over.' },
      {
        q: 'Do you need my password?',
        a: 'No. You add me through Meta Business Suite and remove me whenever you want.',
      },
    ],
    priceNote: 'The monthly never takes a package discount — it is a shoot and a person, not software.',
  },
};

/** Ads are on the catalog but not for sale online: a fee plus the ad spend, scoped in person. */
/**
 * ⚠️ THIS COPY IS BOUNDED BY A PROMISE THE SITE ALREADY MADE. /why says, in
 * Josh's words, that he has never managed a dollar of anybody else's ad spend.
 * Until that stops being true, this card names the thing and declines to sell
 * it. Do not add a price, a package or a results claim here first — the
 * paragraph on /why changes first, and only when it is false.
 */
export const ADS_COPY = {
  name: 'Ads',
  headline: 'Get in front of hungry locals on Instagram and Facebook.',
  what: 'A management fee plus your own ad spend, and it is not sold off a page. I have not run ads for anybody else yet, and I say so on the why page — so this one gets scoped in person, after the rest of your setup is working.',
} as const;

/** One line under each package name. Keyed by package slug. */
export const PACKAGE_COPY: Record<string, string> = {
  'truck-starter': 'Your site, and where the truck is today.',
  'truck-pro': 'Starter, plus orders placed ahead and a catering form that answers for you.',
  'truck-full': 'Everything in Pro, plus the part that brings people back.',
  'restaurant-starter': 'Your site, taking its own pickup orders.',
  'restaurant-pro': 'Starter, plus the two things that bring new people in.',
  'restaurant-full': 'Everything in Pro, so a missed call or a catering request never goes cold.',
  'restaurant-full-ai': 'Full, with the phone answered by AI instead of a text back.',
  'restaurant-truck': 'One site for the restaurant and the truck, with nearly everything switched on.',
  'restaurant-truck-two': 'The same, with orders taken at both.',
};

export const STATUS_LABEL: Record<SystemStatus, string> = {
  live: 'Ready now',
  coming_soon: 'Coming soon',
};

const BEST_FOR_LABEL: Record<BusinessType, string> = { truck: 'Trucks', restaurant: 'Restaurants' };

export function bestForLabel(bestFor: readonly BusinessType[]): string {
  return bestFor.map((b) => BEST_FOR_LABEL[b]).join(' · ');
}

/**
 * An sms: link with the thing they were looking at already typed in, so the
 * first message Josh gets says which system or package it is about.
 * "?&body=" is the form both iOS and Android read.
 */
export function textAbout(subject: string): string {
  return `sms:${PHONE}?&body=${encodeURIComponent(`Hi Josh, I saw ${subject} on foundos.ai.`)}`;
}
