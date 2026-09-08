import type { Metadata } from 'next';
import Link from 'next/link';

import { Rule, SHELL, LedgerHead } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';

import { JourneyIcon, PhoneAndPin, Tick, TruckAndPins } from './art';

/**
 * /food-truck-location — the fifth service page, and the first one about a
 * business that moves.
 *
 * ── WHY THIS IS ALLOWED TO BE A PAGE ──────────────────────────────────────
 *
 * services.ts holds one rule: a route joins the list when there are 400+ words
 * true of that service and of NOTHING else on the site, and never as a page
 * that is another page with the nouns swapped. This one clears it on material
 * that appears nowhere else here:
 *
 *   - the text-in / page-changes loop, and the confirmation coming back
 *   - the staleness rule (HOW, row 4) — no other page has a reason to argue
 *     that a page should admit when it is out of date
 *   - the SMS arithmetic, and the capped allowance that falls out of it
 *   - 10DLC registration taking 1-3 weeks, which is a scheduling fact
 *   - collecting a list off a window rather than off a checkout
 *
 * ⚠️ IT IS NOT "THE ORDERING PAGE FOR TRUCKS". /online-ordering argues the
 * commission arithmetic and what an order page must survive on a Friday; this
 * page says out loud, in LIMITS, that it does not take orders, and links there.
 * If a future edit finds itself restating the commission argument in a truck
 * accent, the right move is to cut this page, not to widen it.
 *
 * ── WHERE EVERY NUMBER COMES FROM ─────────────────────────────────────────
 *
 *   $1.15/mo     Twilio's published US local number price.
 *   $0.0079      Twilio's published US outbound SMS segment rate.
 *   $32/mo       arithmetic. 500 x 8 x .0079 = 31.60.
 *   $119/mo      arithmetic. 500 x 30 x .0079 = 118.50.
 *   160 chars    the GSM-7 single-segment limit. Above it, billed as two.
 *   1-3 weeks    10DLC brand + campaign registration, the published lead time.
 *
 * As on /online-ordering, the page names the published rate and then tells the
 * reader to go and check it rather than trust this page. That is the only
 * version of a cost claim that survives being fact-checked in front of an
 * owner, on his phone, while he is deciding.
 *
 * ⚠️ NO REACH PERCENTAGE. The note this page came from used "Instagram shows
 * your post to about one in ten". That is folklore, not a published figure; it
 * moves, and it differs per account. So the page tells the reader to open his
 * own Insights and read the real one instead. A statistic an owner can
 * disprove on his own phone costs more than it buys.
 *
 * ⚠️ NO PRICE. None of the other four carry one. The number is said on a call.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'food-truck-location',
  title: 'Food truck location page and text list | Atlanta — foundos',
  description:
    'Your truck moves and the listings do not. Built in Marietta for Atlanta food trucks: what a live location page and a text list cost to run, and when not to buy one.',
  shareTitle: 'Where the truck is today',
  shareDescription:
    'A truck moves; the listings do not. What a live location page and a text list actually cost to run — and when not to buy one.',
});

/* ── copy ─────────────────────────────────────────────────────────────────
   Held in constants, not inline in JSX, for the reason the other four hold
   theirs there: an apostrophe inside JSX text has to be escaped, and the
   cheapest way to dodge that is to expand the contraction — "you're" becomes
   "you are". Do it six times and the page stops sounding like a person. In a
   plain string nothing needs escaping, so what is below is exactly what ships. */

/**
 * The journey strip — the skim path, and the one device on this page that is
 * for somebody who has NOT decided to read.
 *
 * ── WHY IT EXISTS ─────────────────────────────────────────────────────────
 *
 * 1,850 words is about twelve screens on a phone, and every grade of this page
 * said the same thing: the mechanism arrives too late and there is no way to
 * get to it. A truck owner reading this is standing up, between things, and
 * has no reason to trust that screen eight is worth the scroll to it. Four
 * rows, four taps, and he knows what the page contains before he has read any
 * of it — and can jump straight to the part he came for.
 *
 * ⚠️ IT IS FOUR ROWS AND MUST STAY FOUR. The homepage's own skim block holds
 * the same line: "if a fifth is ever wanted, the honest move is to cut one",
 * because a five-row skim block is a list, and a list gets read later or never.
 * The page has five sections; the figure deliberately has no row, because it
 * is not a chapter — it is the proof inside "how it works".
 *
 * ⚠️ THE ANCHORS NEED `scroll-margin-top`. The header is sticky and 132px, so
 * a bare jump puts the heading underneath it. `.tl-anchor` carries that, and
 * every id below has to be on an element that has the class.
 */
const JOURNEY = {
  label: 'The short version',
  /** Structural heading, screen-reader only — the strip is navigation, and a
      display heading here would be a sixth eyebrow-and-headline pair. */
  h2: 'The short version of this page',
  /** ⚠️ NOT THE SAME SENTENCE AS h2. It was, and a screen reader read the
      line out twice in a row: once as the hidden heading, once as the
      standfirst under it. */
  stand: 'Four things. Tap any row to go straight to that part.',
  rows: [
    {
      href: '#gap',
      icon: 'gap' as const,
      lead: 'What is broken',
      rest: 'Three places tell people where you are. You put none of them there.',
    },
    {
      href: '#how',
      icon: 'how' as const,
      lead: 'How it works',
      rest: 'You text a number like a person. The page changes, and it texts you back.',
    },
    {
      href: '#cost',
      icon: 'cost' as const,
      lead: 'What it costs to run',
      rest: 'The carrier rates, the arithmetic, and why the allowance is capped.',
    },
    {
      href: '#limits',
      icon: 'limits' as const,
      lead: 'When not to buy it',
      rest: 'Five reasons, and the first one is that plenty of trucks do not need this.',
    },
  ],
} as const;

const HEAD = {
  label: 'Where you are today',
  h1: 'Your truck moves. Everything that tells people where it is does not.',
  stand: 'A restaurant has one address and it is right forever. A truck has a different one four days a week, and every listing, pin and profile that mentions you is still pointing at wherever you were the day somebody typed it in. This page is about closing that gap, what it costs to run, and when it is not worth doing.',
};

const GAP = {
  label: 'The gap',
  h2: 'Three places say where you are. None of them asked you.',
  paras: [
    'Search a truck by name and you get addresses. Not a schedule. Addresses, stated as fact, the way they would be for a building. One from a directory that scraped a review, one from a listing app somebody filled in two summers ago, one from a delivery platform that needed a pin to draw a map.',
    'Every one of them is a parking lot you stood in once.',
    'I have pulled this up on a phone in front of an owner and watched him read three different addresses for his own truck. None of them was where we were standing. He had not put a single one of them there, and he could not take them down.',
    "The part that costs money is not the wrong pin. It is the person who liked your food in June, went looking for you in September, drove to the address the search handed them, found an empty lot, and did not try again. You never hear about that one. It doesn't leave a review.",
    'Instagram is the usual answer and it is a real one, right up until the address lives in a story that deletes itself at midnight, or in a post the feed shows to some fraction of the people who follow you. I am not going to invent that fraction. Open your own Insights, read the reach on your last post against your follower count, and you will have the true number for your account in about ten seconds. Whatever it turns out to be, it is not everybody, and it is gone by tomorrow.',
  ],
};

const HOW = {
  label: 'How it works',
  h2: 'You text a number. The page changes.',
  stand: "That is the loop, all of it, and it stops there on purpose: anything with a login is a thing that doesn't get done at six in the morning with one hand.",
  /**
   * ⚠️ ONE GRAMMAR, SIX LENGTHS. Left column is a short clause, right column
   * is complete sentences — the same rule /online-ordering documents, and for
   * the same reason: a lower-case fragment alone in the right column of a
   * two-column grid reads as text that broke. The anti-template job is carried
   * by LENGTH instead: these run 34 / 16 / 36 / 45 / 19 / 31 words. Evening
   * them out puts the tell back.
   */
  rows: [
    {
      lead: 'You text it like a person',
      rest: 'It is an ordinary phone number and it goes in your contacts next to everybody else. "Cobb Pkwy till 8" is a complete update. No app, no password, and nothing to remember on a morning you are already behind.',
    },
    {
      lead: 'The page changes in seconds',
      rest: 'Anybody who opens it after that sees where you are and how long you are there for.',
    },
    {
      lead: 'It texts you back',
      rest: 'You get a confirmation with what it heard, the spot and the time, so you know it landed without having to open the site and check for yourself. If it read you wrong, send it again and the last one wins.',
    },
    {
      lead: 'It stops claiming you are there',
      rest: 'When the hour you gave it passes, the page stops saying today. If you did not give one, it holds about eighteen hours and then drops to last seen by itself. A site that confidently sends somebody to yesterday is worse than one that says nothing at all, and it is the part these things usually get wrong.',
    },
    {
      lead: 'Somebody else can send it',
      rest: 'Whoever opens the window can update it from their own phone. It does not have to be you every morning.',
    },
    {
      lead: 'Your regular spots have names',
      rest: 'The lots you work every week get set up once, so the usual by the Chevron is enough on its own and you are not typing a street address into a phone at six in the morning.',
    },
  ],
  tail: 'None of that is clever. It is the shortest path between a decision you already made in the cab and the person deciding whether to drive over.',
};

/**
 * ── THE ONLY PICTURE ON THE PAGE, AND IT IS DRAWN RATHER THAN PHOTOGRAPHED ──
 *
 * The first version of this page had no image of any kind, which is defensible
 * on the other four — they sell arguments — and indefensible here. This one
 * sells a thing that is looked at. Asking a truck owner to buy a screen he has
 * never been shown, off 1,800 words of prose, is the whole complaint.
 *
 * It is markup and not a photograph for three reasons, in order:
 *
 *   1. A photo of a truck would be a stock photo of somebody else's truck, or
 *      a prospect's own pictures lifted off Yelp. The vertical playbook is
 *      explicit that the second one is real copyright exposure, and the first
 *      is the exact step back toward template this site keeps avoiding.
 *   2. What needs showing is not a truck. It is the LOOP — his text going out,
 *      the confirmation coming back, and the page in both of its states. A
 *      photograph cannot show a state change; two cards side by side can.
 *   3. It is the staleness rule made visible. That rule is the strongest
 *      product claim on the page and it was, until now, only asserted. Here it
 *      is the difference between the two cards, and a reader gets it without
 *      reading the row in the table that explains it.
 *
 * ⚠️ IT SITS IN A SECTION WITH NO LEDGER LABEL AND NO H2, ON PURPOSE. Five
 * mono eyebrows in a row is what makes a long page read as texture instead of
 * chapters — /online-ordering breaks its own run the same way, with the
 * unlabelled prose lane after the arithmetic. Do not give this a heading.
 */
const SHOW = {
  thread: [
    { k: 'You, 10:41am', body: 'Cobb Pkwy till 8', dir: 'out', tick: false },
    { k: 'Back, 10:41am', body: 'Updated: Cobb Pkwy lot, till 8pm', dir: 'in', tick: true },
  ],
  cards: [
    {
      state: 'live',
      k: 'Today',
      h: 'Cobb Pkwy lot',
      s: 'until 8pm',
      t: 'Updated 10:41am',
    },
    {
      state: 'stale',
      k: 'Last seen',
      h: 'Cobb Pkwy lot',
      s: 'yesterday',
      t: 'No word since 10:41am yesterday',
    },
  ],
  /**
   * ⚠️ TWO RULES ABOUT THIS CAPTION, AND BOTH WERE LEARNED BY BREAKING THEM.
   *
   * 1. IT MAY NEVER NAME A SIDE. It said "Left is what he sent… Right is the
   *    same page eighteen hours apart", which is true at 900px and false on
   *    every phone, where the figure stacks. A caption describing a layout the
   *    reader is not looking at is a small lie on a page whose whole argument
   *    is that a screen must not claim something that is not so.
   *
   * 2. THE CLOCKS HAVE TO RECONCILE, AND THERE MAY ONLY BE ONE OF THEM. The
   *    first version ran four elements against three different times: a text
   *    at 10:41am, a confirmation at 10:41am, a card reading "Updated 2 hours
   *    ago", and a second card reading "No word since 8:04pm" — a time that
   *    appeared nowhere in the exchange above it. A reader who tries to trace
   *    the story finds it does not join up. Everything now hangs off the one
   *    10:41am text: the live card is that update, the stale card is the same
   *    update the next morning with nothing sent after it.
   *
   * It is also "you", not "he". The page is in second person from the headline
   * down, and the caption was the one place that slipped into third.
   */
  cap: "The text you sent. The confirmation that came back. What your customers saw all afternoon. And the same page the next morning, after you did not send another one. Nobody touched it in between. Everything else on the internet that claims to know where you are is waiting for somebody to remember to go and change it.",
  /**
   * ⚠️ THE BRIDGE EXISTS BECAUSE THE MONEY BAND HAS NO HEADING AND MUST NOT
   * GET ONE. The wood field carries no eyebrow and no h2 — that is the device,
   * and /online-ordering's band does the same. But that page earns the drop by
   * setting the figures up in the prose immediately before them, and this one
   * used to fall out of a caption straight into four dollar signs. On a phone
   * it was the roughest seam on the page, and it was the section about money.
   * One sentence fixes it without adding a sixth eyebrow. Do not delete it and
   * do not promote it to a heading.
   */
  bridge: 'All of that costs something to run every month, and it is the part most people selling it to you will not put in writing.',
} as const;

/**
 * This page's private stylesheet, the way src/app/page.tsx keeps PAGE_CSS.
 *
 * ⚠️ IT IS NOT IN SERVICE_CSS AND MUST NOT GO THERE. That sheet ships on all
 * five routes, and four of them have no figure to draw. This is about a
 * kilobyte that only this page pays for.
 *
 * Nothing below declares a colour, a face or a type step of its own — every
 * value is a custom property already set by the design system. The one literal
 * is #1d9e75, which is the presence dot the header has carried since brand.ts,
 * reused here for the same meaning: this is live right now.
 *
 * ⚠️ NO CORNER RADIUS EXCEPT THE DOTS. Sharp everywhere is a real property of
 * this site — the audit counts exactly two rounded things on the page and both
 * are circles. A 6px radius on these cards would be the first crack in it.
 */
const PAGE_CSS = `
.tl-fig{margin-top:34px;display:grid;gap:26px}
.tl-thread{display:flex;flex-direction:column;gap:12px}
.tl-msg{max-width:20rem;padding:13px 16px;border:1px solid var(--rule)}
.tl-msg--out{align-self:flex-end;background:var(--rich);color:var(--strong)}
.tl-msg--in{align-self:flex-start;color:var(--fg)}
.tl-msg-k{display:block;margin-bottom:7px;font-family:var(--f-mono);font-size:var(--t-label);letter-spacing:.06em;text-transform:uppercase;color:var(--dim)}
.tl-msg-b{font-size:var(--t-body);line-height:1.45}
.tl-cards{display:grid;gap:18px}
.tl-card{background:var(--bone);color:var(--ink);border:1px solid var(--rule);padding:20px}
.tl-card-k{display:block;font-family:var(--f-mono);font-size:var(--t-label);letter-spacing:.06em;text-transform:uppercase;color:color-mix(in srgb,var(--ink) 62%,var(--bone))}
.tl-card-h{margin-top:11px;font-family:var(--f-display);font-stretch:86%;font-size:var(--t-num);font-weight:700;line-height:1.05;letter-spacing:-.02em}
.tl-card-s{margin-top:7px;font-size:var(--t-lede);font-weight:700;line-height:1.35}
.tl-card-t{margin-top:15px;font-family:var(--f-mono);font-size:var(--t-fine);color:color-mix(in srgb,var(--ink) 62%,var(--bone))}
.tl-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:9px}
.tl-dot--live{background:#1d9e75}
.tl-dot--stale{border:1px solid color-mix(in srgb,var(--ink) 45%,var(--bone))}
.tl-cap{margin-top:20px;font-size:var(--t-fine);line-height:1.65;color:var(--dim);max-width:56ch}

/* Anchors. The header is sticky and 132px tall, so a bare jump lands the
   heading underneath it — the same offset .eb-report-anchor uses. */
.tl-anchor{scroll-margin-top:132px}

/* The journey strip. Rows are links, so the whole row is the tap target and
   there is nothing smaller than 44px to aim at. Built on the homepage's offer
   rows, with the values copied rather than the class reused: that block is on
   the signed-off homepage and a shared class is a class nobody can change. */
.tl-j{list-style:none;margin:26px 0 0;padding:0;border-top:1px solid var(--rule)}
/* ⚠️ EXPLICIT AREAS, NOT AUTO-FLOW. With four children and two columns the
   browser flows them icon / lead / rest / arrow, which puts the DESCRIPTION in
   the 22px icon column. It still renders — it just wraps one or two words at a
   time and the row measures over 400px tall. Naming the areas is the whole
   fix, and it is why the arrow is a named area rather than a fourth child left
   to find its own way. */
.tl-j-a{display:grid;grid-template-columns:22px minmax(0,1fr);
  grid-template-areas:"icon lead" ". rest";gap:5px 14px;align-items:start;
  padding:16px 0;border-bottom:1px solid var(--rule-soft);text-decoration:none;color:inherit}
.tl-j-a:hover{background:var(--rich)}
.tl-j-i{grid-area:icon;width:22px;height:22px;margin-top:2px;color:var(--wood)}
.tl-j-lead{grid-area:lead}
.tl-j-rest{grid-area:rest}
.tl-j-go{grid-area:go;display:none}
.tl-j-a:hover .tl-j-i{color:var(--ember)}
.tl-j-lead{font-size:var(--t-body);font-weight:700;line-height:1.35;color:var(--strong)}
.tl-j-rest{font-size:var(--t-body);line-height:1.5;color:var(--fg);max-width:56ch}
.tl-j-go{color:var(--dim)}
@media (prefers-reduced-motion:no-preference){.tl-j-a{transition:background-color .15s linear}
.tl-j-i{transition:color .15s linear}}

/* The drawings. Colour comes from currentColor, so each one takes the ink of
   whatever ground it sits on and can never drift out of the palette.
   NOTE: no backticks anywhere in this string -- PAGE_CSS is a template
   literal, and a backtick in a CSS comment ends it. */
.tl-art{display:block;width:100%;height:auto;color:var(--fg)}
.tl-art--truck{max-width:34rem;margin:30px 0 4px}
.tl-tick{display:inline-block;width:1em;height:1em;vertical-align:-0.14em;margin-right:.45em}
.tl-art--phone{max-width:15rem;margin-top:26px}
.tl-art-pin--ghost{color:var(--dim)}
@media (min-width:900px){
.tl-fig{grid-template-columns:minmax(0,21rem) minmax(0,1fr);gap:44px;align-items:start}
.tl-j-a{grid-template-columns:22px minmax(0,15rem) minmax(0,1fr) auto;
  grid-template-areas:"icon lead rest go";gap:20px;align-items:baseline;padding:18px 0}
.tl-j-i{align-self:start}
.tl-j-go{display:block}
.tl-art--truck{max-width:46rem;margin:34px 0 6px}
.tl-cards{gap:20px}
}
`;

/**
 * The four figures the cost band turns on, set as a ledger above the argument.
 *
 * ⚠️ THE RATE IS PRINTED AT FOUR DECIMALS AND IT HAS TO BE. It was $0.008 in
 * the first draft, which is the friendlier number and which does not reconcile:
 * 15,000 x 0.008 is $120, and the row under it says $119. A reader who checks
 * the arithmetic on the page selling him something and finds it off by a dollar
 * has learned the wrong thing about everything else on it. At $0.0079 both
 * rows come out right — 500 x 8 x .0079 = 31.60, 500 x 30 x .0079 = 118.50 —
 * and the ugly fourth decimal is the price of that.
 */
const FIGURES = [
  { k: 'A number of your own', v: '$1.15/mo' },
  { k: 'One text, one person', v: '$0.0079' },
  { k: 'Eight sends to 500 people', v: '$32/mo' },
  { k: 'The same text every day', v: '$119/mo' },
] as const;

const COST = [
  "Twilio would most likely be carrying yours. They publish a US number at about a dollar fifteen a month and a message out at $0.0079. Go and read the current ones on their pricing page, because they move and I don't watch them for you.",
  'Eight sends a month to five hundred people is four thousand messages, or about thirty-two dollars. Sent every day instead, it is fifteen thousand messages and about a hundred and nineteen. Which is why the allowance in your agreement is a capped number and not the word unlimited.',
  'One nobody mentions: a text over a hundred and sixty characters bills as two. Write long and the bill doubles without a second message reaching anybody. Past the cap it is billed at cost, pennies at a time. Better you know the shape of that now than meet it on a statement in March.',
] as const;

const LIST = {
  label: 'The list',
  h2: 'The number on the window is worth more than the followers.',
  paras: [
    'A location page answers the person who is already looking for you. A list reaches the person who is not. The regular who would have come on Thursday if he had known you were four minutes away.',
    'On a truck there is no checkout to collect it from, so it comes off the window: a card with a code by the reader, and a word people can text to the same number. Somebody standing in your line with a phone already in their hand is the cheapest sign-up you will ever get, and it is the minute they are happiest to give it to you.',
    'It belongs to the business. Exported whenever you ask, in a format anything can read, and it stays yours the day you decide you are done with me. That is the difference between a list and an audience. An audience is rented from whoever owns the app, on terms that can change on a Tuesday without anybody telling you.',
  ],
  /**
   * ⚠️ THIS IS NOT A DISCLAIMER AND IT IS NOT OPTIONAL. The 1-3 week
   * registration is the single fact most likely to embarrass a build: it is a
   * carrier queue, nobody can shorten it, and an owner who hears about it in
   * week three believes he was sold a lie. Saying it here, unprompted, before
   * he has paid anybody, is worth more than the section above it.
   *
   * /online-ordering carries the OTHER half of this — consent collected at the
   * checkout, which cannot be applied backwards to a list already built. The
   * two notes do not repeat each other and neither is sufficient alone.
   */
  note: {
    lead: 'Two things about texting people, and neither one is optional.',
    para: "The first is that STOP has to work, immediately and every time, and it is handled at the carrier end rather than by me remembering to build it. That is the only version of it I would be willing to sign. The second is a scheduling fact rather than a legal one: a business number has to be registered with the US carriers before it can send to a list at all, and that registration takes somewhere between one and three weeks. It starts the day a deposit clears, not the week you want to send. Anybody who tells you a text list can go live on Friday hasn't set one up.",
  },
};

/**
 * ⚠️ THE HONEST SECTION, AND IT IS WHY THE REST OF THE PAGE IS BELIEVABLE.
 * Five limits, and the FIRST one is an argument against buying — printed at the
 * top of the block rather than tucked at the end of it. Do not soften it, do
 * not move it down, and do not cut it to tighten the page. A reader who has
 * been told when not to hire somebody will believe that person about
 * everything else.
 *
 * It is also simply true. A truck that parks in one lot every day is a Google
 * listing problem, and that page is already on this site — which is why the
 * limit carries a link to it rather than a shrug.
 */
const LIMITS = {
  h2: 'What it will not do.',
  stand: 'Five of these, and the first one is a reason not to buy it.',
  items: [
    {
      h3: "If you park in the same lot every day, you don't need this.",
      p: 'You need a Google listing that is right and a page that opens fast on a phone. That is a smaller job and a cheaper one, and you will hear it from me on the call rather than after the invoice. This is for a truck that moves. A truck that sits is a restaurant with a smaller kitchen and it should be sold to like one.',
      link: { href: '/google-business-profile', label: 'What a listing has to have on it' },
    },
    {
      h3: 'It cannot update itself.',
      p: "The page is only ever as true as your last text. Nobody has built the thing that knows where your truck is without you telling it. GPS in the cab sounds like the answer right up until the truck is parked at your house on a Tuesday and the site is telling four hundred people you are open in the driveway. Two seconds a morning is the real price of this. If that's not going to happen, don't buy it.",
    },
    {
      h3: 'It will not build the list for you.',
      p: 'A hundred numbers is a few months of asking at the window. Month one it is forty people and it feels like nothing. Forty people who chose to be on it beat four hundred who scrolled past, so it is not nothing — but it is slow at the start, and anybody selling you a list that is already big is selling you somebody else who bought it.',
    },
    {
      h3: 'It does not take the order.',
      p: 'This is a find-us page. Ordering and payment is a larger build and a different conversation, and plenty of trucks never want it. On a truck the line out front is doing work a checkout cannot do. It is worth reading about before you decide either way.',
      link: { href: '/online-ordering', label: 'What an order page has to do' },
    },
    {
      h3: 'It will not fix a slow Saturday.',
      p: 'If the food is not moving, more people knowing where you are gets you a busier version of the same problem. Nothing on this page is a substitute for the part you are actually good at.',
    },
  ],
  close: 'I am in Marietta and I drive out. For a truck that usually means meeting you at the window during a service, buying lunch, and watching how people actually find you. That is where most of the list above got decided in the first place.',
};

const CLOSE = 'Tell me where you parked last Saturday, and where people thought you were. We can do the rest from there.';

export default function FoodTruckLocationPage() {
  return (
    <ServicePage
      slug="food-truck-location"
      label={HEAD.label}
      h1={HEAD.h1}
      stand={HEAD.stand}
      close={CLOSE}
    >
      {/* ── The journey strip ────────────────────────────────────────────
          Directly under the hero, before any argument, because it is for the
          reader who has not agreed to read one yet. See the note above JOURNEY
          for why it is four rows and why it must stay four. */}
      <section aria-labelledby="tl-j-h">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={JOURNEY.label} />
          <h2 className="eb-sr" id="tl-j-h">
            {JOURNEY.h2}
          </h2>
          <p className="eb-stand eb-stand--flush">{JOURNEY.stand}</p>
          <ul className="tl-j" role="list">
            {JOURNEY.rows.map((r) => (
              <li key={r.href}>
                <a className="tl-j-a" href={r.href}>
                  <JourneyIcon name={r.icon} />
                  <span className="tl-j-lead">{r.lead}</span>
                  <span className="tl-j-rest">{r.rest}</span>
                  <span className="tl-j-go eb-lab" aria-hidden="true">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Rule />

      {/* ── The gap ──────────────────────────────────────────────────────── */}
      <section id="gap" className="tl-anchor">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={GAP.label} />
          <h2 className="eb-d eb-h2">{GAP.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          {GAP.paras.map((p) => (
            <p key={p} className="eb-p">
              {p}
            </p>
          ))}
          {/* The argument above, drawn. It sits AFTER the prose rather than
              above it so it reads as the summary of a point already made,
              not as a picture the paragraphs then explain. */}
          <TruckAndPins />
        </div>
      </section>
      <Rule />

      {/* ── The loop ─────────────────────────────────────────────────────── */}
      <section id="how" className="tl-anchor">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={HOW.label} />
          <h2 className="eb-d eb-h2">{HOW.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{HOW.stand}</p>
          <ul className="sv-rows" role="list">
            {HOW.rows.map((r) => (
              <li key={r.lead} className="sv-row">
                <span className="sv-row-l">{r.lead}</span>
                <span className="sv-row-r">{r.rest}</span>
              </li>
            ))}
          </ul>
          <p className="eb-lede eb-lede--strong eb-mt">{HOW.tail}</p>
        </div>
      </section>

      {/* ── The thing itself ─────────────────────────────────────────────
          No label, no h2 — see the note above SHOW for why, and do not add
          one. The <style> is inline for the same reason page.tsx keeps its own
          PAGE_CSS inline: it belongs to this route and nothing else pays for
          it. It sits after ServicePage's own sheet in source order, which is
          what lets a `tl-` rule win at equal specificity if it ever needs to.

          ⚠️ THE RULE ABOVE IS LOAD-BEARING, NOT DECORATION. Without it this
          section still carried `eb-sec--after-rule`, whose top padding is sized
          to sit under a hairline. Stacked straight onto the previous section's
          bottom padding it measured a 148px hole at 1440 and 112px on a phone,
          and the figure read as something that had come loose rather than as
          the next beat. A section with that class needs a Rule over it. */}
      <style>{PAGE_CSS}</style>
      <Rule />
      <section aria-label="What the owner sends, and what the page shows">
        <div className={`${SHELL} eb-sec--after-rule`}>
          <div className="tl-fig">
            <div className="tl-thread">
              {SHOW.thread.map((m) => (
                <div key={m.k} className={`tl-msg tl-msg--${m.dir}`}>
                  <span className="tl-msg-k">{m.k}</span>
                  <span className="tl-msg-b">
                    {m.tick ? <Tick /> : null}
                    {m.body}
                  </span>
                </div>
              ))}
              {/* Fills the ~200px of dead ground this column left under the
                  bubbles at 1440, and restates what they are. Two jobs, 1KB. */}
              <PhoneAndPin />
            </div>
            <div className="tl-cards">
              {SHOW.cards.map((c) => (
                <div key={c.state} className="tl-card">
                  <span className="tl-card-k">
                    <span className={`tl-dot tl-dot--${c.state}`} aria-hidden="true" />
                    {c.k}
                  </span>
                  <p className="tl-card-h">{c.h}</p>
                  <p className="tl-card-s">{c.s}</p>
                  <p className="tl-card-t">{c.t}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="tl-cap">{SHOW.cap}</p>
          <p className="eb-lede eb-lede--strong eb-mt">{SHOW.bridge}</p>
        </div>
      </section>

      {/* ── What it costs to run, on the wood field ──────────────────────
          ⚠️ NOTHING IN THIS BAND MAY DROP BELOW 19px/700. Ink on wood is
          4.24:1 — legal for WCAG large-scale text, illegal for body text. The
          ledger goes first because four figures in a table are one glance and
          the same four inside 140 words of prose are a memory test on a phone.

          Same constraint, same classes and same reasoning as the band on
          /online-ordering; what differs is what the band is spent on. There the
          arithmetic is the sales argument. Here it is the running cost, printed
          in the largest type on the page — which is the entire point. */}
      <Rule />
      <section id="cost" aria-label="What the texting costs" className="eb-g-wood tl-anchor">
        <div className={`${SHELL} sv-math`}>
          <dl className="sv-figs">
            {FIGURES.map((f) => (
              <div key={f.k} className="sv-fig">
                <dt className="sv-fig-k">{f.k}</dt>
                <dd className="sv-fig-v">{f.v}</dd>
              </div>
            ))}
          </dl>
          {COST.map((p) => (
            <p key={p} className="sv-math-p">
              {p}
            </p>
          ))}
        </div>
      </section>
      <Rule />

      {/* ── The list ─────────────────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={LIST.label} />
          <h2 className="eb-d eb-h2">{LIST.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          {LIST.paras.map((p) => (
            <p key={p} className="eb-p">
              {p}
            </p>
          ))}
          <div className="sv-note">
            <p className="sv-note-p">{LIST.note.lead}</p>
            <p className="eb-p">{LIST.note.para}</p>
          </div>
        </div>
      </section>

      {/* ── The limits, on the cream field ───────────────────────────────
          The one light ground on this page, and it sits under the section that
          argues against buying. Bone carries body copy safely (rich on bone is
          about 13:1); ember and wood do not, which is why the honest section
          gets the paper and the arithmetic gets the band. */}
      <Rule />
      <section id="limits" className="eb-g-bone tl-anchor">
        <div className={`${SHELL} eb-sec`}>
          <h2 className="eb-d eb-h2">{LIMITS.h2}</h2>
          <p className="eb-stand eb-stand--flush">{LIMITS.stand}</p>
          {LIMITS.items.map((item) => (
            <div key={item.h3} className="sv-block">
              <h3 className="eb-h3">{item.h3}</h3>
              <p className="eb-p">{item.p}</p>
              {'link' in item && item.link ? (
                <p className="eb-p">
                  <Link className="sv-a" href={item.link.href}>
                    {item.link.label}
                  </Link>
                </p>
              ) : null}
            </div>
          ))}
          <p className="eb-p eb-mt">{LIMITS.close}</p>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
