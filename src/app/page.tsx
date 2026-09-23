import Image from 'next/image';
import Link from 'next/link';

import MarkReveal from '@/components/MarkReveal';
import InstantReport from '@/components/report/InstantReport';
/* The leaf, not the shop barrel: the homepage wants the words, not the cards. */
import { SYSTEM_COPY, WEBSITE_COPY } from '@/components/shop/catalog';
import {
  LedgerHead,
  Linked,
  Marked,
  MobileActionBar,
  NAV,
  Rule,
  SHELL,
  SiteFooter,
  SiteHeader,
  TextMeButton,
  siteCss,
  siteFontClass,
} from '@/components/site';
import {
  CAL,
  DEMO_LINE,
  DEMO_LINE_PRETTY,
  DESCRIPTION,
  EMAIL,
  LOCATION,
  PHONE,
  PRICES,
  WORDMARK,
} from '@/config/brand';
import { BASE_MINIMUM_MONTHS, SYSTEMS, WEBSITE, usd } from '@/config/pricing';
import { DEMOS } from '@/lib/contact';
/* site.ts imports nothing, so the one origin string costs the page nothing. */
import { SITE_URL } from './site';

/**
 * The homepage — the short front door. Restructured 2026-09-11.
 *
 * ── THE BRIEF, IN JOSH'S WORDS ────────────────────────────────────────────
 *
 *   "start the home page talking about who i target, showing my system
 *    solutions, price, for more info they can click buttons that lead to pages
 *    to explain more, when someone comes to my site on mobile they dont want to
 *    be overwhelmed with all words, get home page for the most important of
 *    what i offer, other pages to explain pain points ect or objections"
 *
 * So the page is short blocks, and every one ends in a way to go deeper:
 *
 *   hero — who it is for (the two doors) — the systems, priced — prices —
 *   the free report — two concept builds — the demo line — how it goes —
 *   who I am — the long version — close
 *
 * ── WHAT MOVED, AND WHERE ─────────────────────────────────────────────────
 *
 * The page was ~3,300 words and ~18,000px on a phone. What left it:
 *   • The five checks and the "none of those five breaks" coda, the whole
 *     delivery-apps argument with its wood arithmetic band, and the four-step
 *     funnel with the ads-honesty note → /why. Cut out of this file by script,
 *     byte for byte, with every ⚠️ note that guards them: src/app/why/copy.ts.
 *   • The objections → /questions.
 *   • BUILDS, the seven-row "what I build" list, is gone rather than moved. Two
 *     of its rows (bookings, a one-screen dashboard) were things that are not on
 *     the price list, and /systems is now the list — priced, with a status.
 *   • The FAQPage structured data went with the five checks, because Google
 *     requires FAQ markup to match content visible on the same page.
 *
 * ── WHAT DID NOT CHANGE ───────────────────────────────────────────────────
 *
 * The design system: the grounds, the type scale, the contrast floors, the
 * skim-path mark. It lives in src/components/site/css.ts, and the long design
 * brief that used to head this file is in its git history (every commit before
 * 2026-09-11). The hero, the cream report card, the concept-work field, the
 * demo line, the ledger, the about block and the close are this page's own and
 * their CSS is PAGE_CSS below, carried over verbatim.
 *
 * ⚠️ NO PRICE STRINGS. Every foundos price on this page is read out of
 * config/pricing.ts — through PRICES in brand.ts for the ledger, and straight
 * off SYSTEMS for the system rows — so it cannot disagree with /pricing.
 */

/* No `metadata` export: the homepage inherits title, description and OpenGraph
   from src/app/layout.tsx, the single place those strings live. */

/* ── copy carried over verbatim ───────────────────────────────────────────
   Cut from the previous version of this file by script. Held in constants so
   an apostrophe never has to be escaped — expanding "you're" into "you are" six
   times is how a page stops sounding like Josh. */

/**
 * Every short string on the page, verbatim.
 *
 * These live here rather than inline in JSX for one reason and it matters: an
 * apostrophe inside JSX text has to be escaped, and the cheapest way to dodge
 * that is to expand the contraction — "you're" becomes "you are". Do that six
 * times and the page stops sounding like Josh and starts sounding like a
 * brochure. In a plain string no character needs escaping, so the copy in this
 * file is byte-for-byte what he wrote. Keep new copy here for the same reason.
 */
const HERO = {
  h1: 'I make websites for Atlanta restaurants and food trucks.',
  subA: "You're good at what you do.",
  subB: "The internet doesn't show it.",
  cta: "See what I'd build for you ↓",
};

const AUDIT = {
  h2: "See exactly what I'd build for you.",
  p: "Type the name. I'll pull your Google listing and your site and show you what's costing you customers right now — and what I'd do about it.",
  /**
   * Moved up from §2.8, where it sat four screens below the box it justifies.
   *
   * ⚠️ This promise is BOUNDED on purpose and it has to stay bounded. It used
   * to read "I'll build a sample first", which named no unit of work: a reader
   * could take it as the ten-second automated report they just ran or as a
   * whole spec site, and one man cannot hand a whole spec site to every
   * stranger who types a name. So the free thing is stated twice and both
   * times it is countable — the report runs itself, and the hand-built part is
   * ONE page. Don't widen it back to "a sample", and don't pluralise the page.
   */
  risk: "Free: text me and I'll build your menu page. Don't like it? You owe nothing.",
};

const WORK_COPY = {
  h2: "Open something I've built.",
  p: 'Two sample sites. Tap around and place a test order.',
  fine: 'Concept businesses. Built the same way I would build yours.',
};

const PROOF = {
  h2: "Don't take my word for it.",
  p: "Call my phone answering line and order ribs out loud. It takes the order, and tells you it's AI.",
  /** With the number below it this reads "Call (276) 295-1209" — §2.7's button. */
  verb: 'Call',
};

const CLOSE = "Tell me what you run and I'll tell you straight whether I can help.";

/**
 * §2.9 of page.tsx. No photo, and that is the settled decision.
 *
 * ⚠️ Two things in the first sentence are load-bearing and both were wrong
 * once. TENSE: it read "I've been building sites for restaurants…", which is
 * present-perfect continuous and therefore describes an ongoing practice with
 * clients. Every build in the repo is spec work for a prospect who did not
 * hire him, so the sentence was literally true and its implicature was false,
 * and the next question — "which ones?" — has no answer. Plain present tense.
 * WORD: it also read "getting robbed by delivery apps". The section directly
 * above spends ~800 words NOT saying that ("Nobody in that kitchen is
 * overcharging anyone", "most owners do the sensible thing"), and the source
 * content file flags robbed/stealing/sucker as the exact framing that loses
 * the room. One sentence here undid the most careful section on the page. The
 * Wix-template jab is his, it is specific, and it stays.
 */
const ABOUT = [
  "I'm Josh, in Atlanta. I make sites for restaurants and food trucks, because I keep finding good ones stuck on an old template and paying DoorDash a cut of every order.",
  "I'm also a Meta Certified Digital Marketing Associate.",
  'You text me, I answer.',
  "If I can't help you, I'll tell you that too.",
] as const;

/**
 * The two concept builds, paired with the screenshots in public/work. Both
 * are ours outright. DEMOS supplies the label, the note and the href; only
 * the image and its alt text live here.
 *
 * ⚠️ There is no third card and there must not be one. src/lib/contact.ts
 * carries the reason in full: every other build in the repo was made for a
 * live prospect who has not hired us, and putting their name here reads as
 * "client" to every visitor. Two is complete.
 */
const WORK = [
  {
    src: '/work/truck.png',
    alt: "The food truck concept site: a dark hero for El Fuego Smash, Mexican smash burgers in Metro Atlanta, with today's parking spot at Kestrel Athletic Club, the 11am to 2:30pm window, a directions button, and the rest of the week's stops listed underneath.",
  },
  {
    src: '/work/bakery.png',
    alt: "The bakery concept site: a dark hero for Panadería La Rosa in Marietta, Georgia, showing today's 8am to 9pm opening hours, the street address, the fresh-bread times, and the full week of hours underneath.",
  },
] as const;

/* ── the front door's own copy (2026-09-11) ───────────────────────────────
   New strings, written for the restructure. Every price in them is read off
   config/pricing.ts, and every claim is one the site already makes elsewhere. */

/**
 * The mono label above each section heading. Words, never numbers: the old
 * §-numbers leaking into the UI read as a page generated from a schema.
 */
const LABELS = {
  who: 'Who it is for',
  systems: 'What I make',
  audit: 'Start here',
  work: 'Two concept builds',
  proof: 'Call it yourself',
  how: 'After you say yes',
  about: 'Who you are dealing with',
  more: 'The long version',
};

/** Section headings. Deliberately not one shape — `costs` is a question. */
const HEADINGS = {
  who: 'Food trucks and restaurants. Anyone who cooks.',
  systems: 'What I make, and what it costs.',
  about: 'One person. Not an agency.',
};

const HERO_CTA = 'See what I build ↓';

/**
 * The two doors. Each goes to the long page written for that business, so a
 * truck owner never has to read a restaurant's argument to find his own.
 */
const DOORS = [
  {
    href: '/food-truck-location',
    lead: 'You run a food truck',
    rest: 'People ask where you are today, and the answer changes every day.',
    go: 'For trucks →',
  },
  {
    href: '/online-ordering',
    lead: 'You run a restaurant',
    rest: 'Orders go through an app that takes a cut, and the phone rings while your hands are full.',
    go: 'For restaurants →',
  },
] as const;

const DOORS_TAIL = 'Bakery, caterer, coffee shop? Same thing.';

/**
 * ⚠️ READ OFF THE PRICE LIST, NEVER TYPED. The rows are the website plus every
 * system marked live in config/pricing.ts — the same filter /systems uses — so
 * the day a system is flipped to live it shows up here with its price.
 */
const READY = SYSTEMS.filter((s) => s.status === 'live' && s.countsTowardDiscount);

const SYSTEM_ROWS = [
  {
    href: '/systems#website',
    name: WEBSITE.name,
    line: WEBSITE_COPY.headline,
    price: `${usd(WEBSITE.setup)} once, then ${usd(WEBSITE.monthly)} a month`,
  },
  ...READY.map((s) => ({
    href: `/systems#${s.slug}`,
    name: s.name,
    line: SYSTEM_COPY[s.slug].headline,
    price: `Add ${usd(s.setup)} once, then ${usd(s.monthly)} a month`,
  })),
];

const SYSTEMS_STAND = 'Start with the website. Add anything else you want on top.';

/**
 * The one line of terms under the price list, in words an owner uses. The
 * ceiling row, the package discount and the second price section were cut
 * 2026-09-22 after a phone walkthrough: a non-technical owner saw the same
 * prices twice, hit the all-systems total, and left. /pricing still has all of it.
 */
const TERMS = `Pay at least ${BASE_MINIMUM_MONTHS} months. After that, cancel any month and you keep the site.`;

const COSTS_CTA = 'Full price list';

/**
 * How it goes, cut from six steps to four.
 *
 * ⚠️ SOURCE: foundos-system-rulebook.md §6, the fulfilment runbook — the same
 * source the six-step version was held to. Nothing here is promised that the
 * runbook does not already commit to. Two changes, both toward the truth:
 * step one says "half the setup" because /pricing's terms say half to start;
 * and the old "I fix the Google listing and switch on the review requests" step
 * is gone, because those are now Google Boost and Review Booster — systems with
 * their own price — and a free-sounding step here contradicted the price list.
 */
const HOW = {
  deadline: 'Seven days from your payment to the site being live. Miss it and your first month is free.',
};

/** The two pages that hold everything this page no longer says. */
const MORE = [
  {
    href: '/why',
    lead: 'Why this matters',
    rest: 'Five things to check on your own phone, and the delivery-app arithmetic nobody shows you.',
  },
  {
    href: '/questions',
    lead: 'Questions people ask',
    rest: 'Contracts, cancelling, the apps, the AI phone, and what happens if you are not a tech person.',
  },
] as const;

/* ── structured data ──────────────────────────────────────────────────────
 *
 * Carried forward from page.tsx — the section list has no slot for it, and
 * building strictly to the list would silently drop the structured data.
 *
 * ⚠️ ONE SCRIPT TAG, ONE @graph, AND IT STAYS THAT WAY. Two
 * <script type="application/ld+json"> blocks on one URL is legal and every
 * consumer reads both, but it also means two places for the next node to go
 * and no shared `@id` for anything to point at, which is how one page ends up
 * describing two different businesses. Everything true of foundos.ai/ goes in
 * the array at the bottom of this block.
 *
 * ⚠️ NOTHING HERE MAY CLAIM ANYTHING THE PAGE DOES NOT. Structured data is the
 * one part of this file a visitor never reads, which is exactly why it is the
 * easiest place to quietly invent a client, an office or an opening time. Every
 * field below is either read out of config/brand.ts or is a sentence already
 * rendered somewhere the reader can see it.
 */

/**
 * Where he will drive. Georgia is spelled out rather than taken from
 * LOCATION.region ('GA') because a bare City node called "Decatur" matches a
 * town in Illinois just as well as the one twenty minutes from him, and the
 * whole job of this field is to say which one.
 */
const GEORGIA = { '@type': 'State', name: 'Georgia' } as const;

/**
 * NODE 1 — the business, and the node every other page on this site can point
 * at once those pages get structured data of their own.
 *
 * `@id` is the reason it is written out at all. Without one this is an
 * anonymous blob that nothing can reference; with one, /online-ordering can
 * later say "provided by ${SITE_URL}/#business" instead of describing a second
 * company with the same name. `#business` and not the bare URL, because the URL
 * identifies the PAGE and this node is the COMPANY — conflating those two is
 * the most common way a graph ends up contradicting itself.
 */
const BUSINESS = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: WORDMARK.text,
  description: DESCRIPTION,
  /* Was the literal 'https://foundos.ai'. site.ts asked, in writing, for this
     file to import it the next time the block was opened; this is that. */
  url: SITE_URL,
  telephone: `+1${PHONE}`,
  email: EMAIL,
  /**
   * Both point at src/app/opengraph-image.tsx — the 1200x630 share card, drawn
   * at build time out of the brand, no photography and no asset file. It is a
   * real route that returns a real PNG, which is the whole test: a structured
   * data image that 404s is worse than none.
   *
   * `logo` gets the same URL rather than the favicon, and that is deliberate.
   * src/app/icon.svg is the green dot alone on white — correct as a 32px tab
   * tile, and not a logo: it carries no wordmark, so a consumer that renders it
   * beside a search result shows a green circle attached to nobody. The card
   * draws the actual wordmark, dot included. Neither file is a square, branded
   * PNG of the kind Google's logo guidance really wants; if one is ever drawn,
   * `logo` is the field that changes and `image` stays here.
   */
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/opengraph-image`,
  /**
   * ⚠️ NOT "$$", and the audit that asked for "$$" is worth arguing with here.
   * Google's own LocalBusiness documentation defines priceRange as "either a
   * numerical range or a normalized number of currency signs" — both are
   * allowed — and this site prints the actual numbers four screens down in §11.
   * "$$" is a claim nobody can check against anything on the page; a range read
   * straight out of PRICES cannot drift from the ledger the visitor is looking
   * at, because it IS the ledger. Renders "$400–$2,150": a site on its own and
   * every system at one location, both straight off the price list in
   * config/pricing.ts. A band, not a quote, which is what the field is.
   */
  priceRange: `${PRICES.site.display}–${PRICES.system.display}`,
  /**
   * ⚠️ SIX TOWNS, AND NOT ONE OF THEM IS A LANDING PAGE. This is the honest way
   * to state a service area and it is the ONLY place the list appears. The
   * alternative — a page per town — is a doorway set, named in Google's own
   * spam policy, and the penalty lands on the whole domain rather than on the
   * thirty pages. The rule and the reasoning live at the top of
   * src/components/service/services.ts; this field is what exists instead.
   *
   * It is a claim about where he will drive, not a claim to have an office in
   * six towns. `address` below still says Atlanta and still says nothing else.
   */
  areaServed: [
    LOCATION.city,
    'Marietta',
    'Smyrna',
    'Decatur',
    'Sandy Springs',
    'Kennesaw',
  ].map((name) => ({ '@type': 'City', name, containedInPlace: GEORGIA })),
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCATION.city,
    addressRegion: LOCATION.region,
    addressCountry: 'US',
  },
  /**
   * ⚠️ THIS IS THE PRESENCE LINE IN THE HEADER. IT IS NOT SHOP HOURS AND IT MAY
   * NOT BE WIDENED, SPLIT BY WEEKDAY, OR "CORRECTED" TO LOOK LIKE A STOREFRONT.
   *
   * There is no shop. Josh works a job in a gym and answers his phone, so a
   * storefront's opening times would be an invention — the same kind of
   * invention as a testimonial, and it would be the only unverifiable thing on
   * the page. What IS true, and is already published on every page of this
   * site, is the window the presence dot runs on: it turns amber outside
   * 9am–9pm Atlanta time, and the screen-reader sentence beside it says so in
   * words — "It is between 9am and 9pm in Atlanta right now. You text me, I
   * answer." This encodes that sentence and not one minute more. A reader can
   * check it against the header of the page it is embedded in.
   *
   * Seven days because the dot makes no distinction between them; it reads the
   * hour and nothing else.
   *
   * ⚠️ TWO HAND-KEPT NUMBERS. OPEN_HOUR (9) and CLOSE_HOUR (21) live in
   * src/components/Presence.tsx. That file is a 'use client' module, and under
   * RSC every export of one becomes a client reference — a Server Component
   * cannot read a plain constant back out of it — so they are duplicated here
   * rather than imported. Same trap, and the same discipline, as the OG_IMAGE
   * copy in src/components/service/metadata.ts: if that window changes, change
   * it here in the SAME COMMIT. Schema that contradicts the header is worse
   * than no schema at all.
   */
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '09:00',
    closes: '21:00',
  },
  /* The credential is asserted in two places on purpose: the visible sentence
     in ABOUT and this node. They have to keep saying the same thing — a
     hasCredential with no matching copy on the page is the kind of markup
     Google treats as a mismatch. Change one, change the other. */
  founder: {
    '@type': 'Person',
    name: 'Josh Potesta',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Meta Certified Digital Marketing Associate',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Meta' },
    },
  },
  sameAs: ['https://instagram.com/josh.potesta'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [BUSINESS],
};

/* ── the skim path ────────────────────────────────────────────────────────
 *
 * ⚠️ NOT DECORATION. Josh's brief for the device: "if someone is looking
 * through my site quickly i want them to be able to pick up all the important
 * info quickly while skimming". Read only the coloured phrases and you get the
 * argument. Five of the eight moved to /why with the sections they sat in; the
 * three below are the front door's beats: what the free report shows you, how
 * fast it changes, and what you risk. The rules — never inside the h1, only on
 * claims, never on ember or wood — are on `.eb-mark` in css.ts.
 */
const MARKS = {
  /** Inside the cream card. The one mark on a light ground. */
  costingNow: "what's costing you customers right now",
  /** How it goes. How fast it changes. */
  sevenDays: 'Seven days from your payment to the site being live.',
  /** The last line of ABOUT. What you risk, which is nothing. */
  tellYou: "If I can't help you, I'll tell you that too.",
} as const;

/** The one inline link left on the page: the demo line's sentence, to the page about the AI phone. */
const LINKS = {
  phone: { href: '/ai-phone-answering', phrase: 'phone answering line' },
} as const;

export default function HomePage() {
  return (
    <div className={`eb ${siteFontClass}`} id="top">
      <style>{siteCss(PAGE_CSS)}</style>

      {/* Renders nothing. Watches the skim-path phrases and turns each one
          colour as it scrolls in — see components/MarkReveal.tsx. */}
      <MarkReveal />

      {/* Escaping `<` is the documented guard against injection through a
          stringified payload. Nothing here is user input today. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, '\\u003c') }}
      />

      <SiteHeader />

      <main>
        {/* ── Hero — the ember field ────────────────────────────────────────
            Who it is for, in one sentence, and the two things to do next. The
            subhead is ink on ember at 4.24:1 — legal only because it is large
            and bold. The second button now goes to the systems, not the report:
            "what does he sell" is the first question, and the report is two
            short blocks further down. */}
        <section className="eb-g-ember">
          <div className={`${SHELL} eb-hero`}>
            <h1 className="eb-d eb-h1 eb-hero-h">{HERO.h1}</h1>
            <Rule bleed />
            <p className="eb-hero-sub">
              {HERO.subA}
              <br />
              {HERO.subB}
            </p>
            <div className="eb-btns">
              <TextMeButton />
              <a className="eb-btn eb-btn--b" href="#systems">
                {HERO_CTA}
              </a>
            </div>
          </div>
        </section>
        <Rule />

        {/* ── Who it is for — two doors ─────────────────────────────────────
            Whole rows are the tap target. Each goes to the long page written
            for that kind of business. */}
        <section aria-labelledby="who-h">
          <div className={`${SHELL} eb-sec eb-sec--tight`}>
            <LedgerHead label={LABELS.who} />
            <h2 className="eb-d eb-h2" id="who-h">
              {HEADINGS.who}
            </h2>
            <ul className="eb-offers eb-mt" role="list">
              {DOORS.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className="eb-offer">
                    <span className="eb-offer-lead">{d.lead}</span>
                    <span className="eb-offer-rest">{d.rest}</span>
                    <span className="eb-offer-go eb-lab" aria-hidden="true">
                      {d.go}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eb-p eb-mt-s">{DOORS_TAIL}</p>
          </div>
        </section>
        <Rule />

        {/* ── The systems, priced ───────────────────────────────────────────
            The website and the systems that can be built today, each with its
            price, each row a link to its card on /systems. See the note on
            SYSTEM_ROWS: nothing here is typed. */}
        <section aria-labelledby="systems-h" id="systems" className="eb-anchor">
          <div className={`${SHELL} eb-sec eb-sec--tight`}>
            <LedgerHead label={LABELS.systems} />
            <h2 className="eb-d eb-h2" id="systems-h">
              {HEADINGS.systems}
            </h2>
            <p className="eb-stand eb-stand--flush">{SYSTEMS_STAND}</p>
            <ul className="eb-offers" role="list">
              {SYSTEM_ROWS.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="eb-offer">
                    <span className="eb-offer-lead">
                      {r.name}
                      <span className="eb-offer-price">{r.price}</span>
                    </span>
                    <span className="eb-offer-rest">{r.line}</span>
                    <span className="eb-offer-go eb-lab" aria-hidden="true">
                      How it works →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eb-p eb-mt-s">{TERMS}</p>
            <div className="eb-btns">
              <Link className="eb-btn eb-btn--a" href="/pricing">
                {COSTS_CTA}
              </Link>
            </div>
          </div>
        </section>
        <Rule />

        {/* ── The free report — the cream order-pad card ────────────────────
            Unchanged. The one thing a stranger can do here without talking to
            anybody, and the phone bar's second button still lands on it. */}
        <section id="report" className="eb-report-anchor">
          <div className={`${SHELL} eb-sec`}>
            <div className="eb-pad">
              <div className="eb-pad-in">
                <LedgerHead label={LABELS.audit} />
                <h2 className="eb-d eb-h2 eb-pad-h">{AUDIT.h2}</h2>
                <div className="eb-rule eb-rule--inset" aria-hidden="true" />
                <p className="eb-pad-p">
                  <Marked text={AUDIT.p} phrases={[MARKS.costingNow]} />
                </p>
                <div className="eb-pad-widget">
                  <InstantReport />
                </div>
                <div className="eb-rule eb-rule--inset" aria-hidden="true" />
                <p className="eb-pad-p eb-pad-p--risk">{AUDIT.risk}</p>
              </div>
            </div>
          </div>
        </section>
        <Rule />

        {/* ── Two concept builds — the bone field ───────────────────────────
            "Showing my system solutions": the two builds we own outright,
            labelled as concepts because they are. */}
        <section className="eb-g-bone">
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.work} />
            <h2 className="eb-d eb-h2">{WORK_COPY.h2}</h2>
            <p className="eb-stand eb-stand--flush">{WORK_COPY.p}</p>
            <ul className="eb-work">
              {DEMOS.map((demo, i) => (
                <li key={demo.href}>
                  <Link href={demo.href} className="eb-work-a">
                    <span className="eb-work-shot">
                      <Image
                        src={WORK[i].src}
                        alt={WORK[i].alt}
                        width={1200}
                        height={800}
                        sizes="(min-width: 900px) 46vw, 92vw"
                        className="eb-work-img"
                      />
                    </span>
                    <span className="eb-work-meta">
                      <span className="eb-work-t">{demo.label}</span>
                      <span className="eb-work-n">{demo.note}</span>
                      <span className="eb-lab eb-work-go">Open →</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eb-fine">{WORK_COPY.fine}</p>
          </div>
        </section>
        <Rule />

        {/* ── The demo line ─────────────────────────────────────────────────
            Ember as type, legal at 40px+. */}
        <section>
          <div className={`${SHELL} eb-sec eb-sec--tight`}>
            <LedgerHead label={LABELS.proof} />
            <h2 className="eb-d eb-h2">{PROOF.h2}</h2>
            <p className="eb-stand eb-stand--flush">
              <Linked text={PROOF.p} phrase={LINKS.phone.phrase} href={LINKS.phone.href} />
            </p>
            <a className="eb-tel" href={`tel:${DEMO_LINE}`}>
              <span className="eb-lab eb-tel-lab">{PROOF.verb}</span>
              <span className="eb-tel-n">{DEMO_LINE_PRETTY}</span>
            </a>
          </div>
        </section>
        <Rule />

        {/* ── After you say yes — one promise ───────────────────────────── */}
        <section>
          <div className={`${SHELL} eb-sec eb-sec--tight`}>
            <LedgerHead label={LABELS.how} />
            <p className="eb-lede eb-lede--strong">
              <Marked text={HOW.deadline} phrases={[MARKS.sevenDays]} />
            </p>
          </div>
        </section>
        <Rule />

        {/* ── One person. Not an agency. — the rich shift ───────────────────
            No photo, and that is the decision. */}
        <section className="eb-g-rich">
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.about} />
            <h2 className="eb-d eb-h2">{HEADINGS.about}</h2>
            <div className="eb-about">
              {ABOUT.map((p) => (
                <p key={p} className="eb-p eb-p--wide">
                  <Marked text={p} phrases={[MARKS.tellYou]} />
                </p>
              ))}
            </div>
          </div>
        </section>
        <Rule />

        {/* ── The long version ──────────────────────────────────────────────
            Everything this page stopped saying, one tap away. Same ruled rows
            as the doors, so it reads as navigation and not as a new section. */}
        <section aria-labelledby="more-h">
          <div className={`${SHELL} eb-sec eb-sec--tight`}>
            <LedgerHead label={LABELS.more} />
            <h2 className="eb-sr" id="more-h">
              {LABELS.more}
            </h2>
            <ul className="eb-offers" role="list">
              {MORE.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="eb-offer">
                    <span className="eb-offer-lead">{m.lead}</span>
                    <span className="eb-offer-rest">{m.rest}</span>
                    <span className="eb-offer-go eb-lab" aria-hidden="true">
                      Read →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Close — ember again, closing the bookend ──────────────────────── */}
        <section className="eb-g-ember">
          <div className={`${SHELL} eb-close`}>
            <p className="eb-d eb-h2 eb-close-h">{CLOSE}</p>
            <Rule bleed />
            <div className="eb-btns">
              <TextMeButton />
              <a className="eb-btn eb-btn--b" href={CAL} target="_blank" rel="noreferrer">
                {NAV.book}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Below 640px only. The second action is the free report — the one thing
          a stranger can do here without talking to anybody. */}
      <MobileActionBar secondary={{ href: '#report', label: 'Free report' }} />
    </div>
  );
}

/* ── this page's stylesheet ───────────────────────────────────────────────
   Scoped to `.eb`, and it is only HALF of what the page ships. The design
   system — the five values and the token set, the four grounds, the two type
   voices, prose, the skim-path mark, Rule, LedgerHead, the section rhythm, the
   sticky header, the button slabs, the footer and the phone bar — lives in
   src/components/site/css.ts, and `siteCss` emits it BEFORE this. What is left
   here is what only the homepage draws: the hero field, the cream order-pad
   card, the five checks, the four steps, the wood arithmetic band, the build
   list, the concept-work cards, the demo line, the ledger table, the about
   block and the close.

   ⚠️ BASE FIRST, PAGE SECOND, ALWAYS — that is the layering `siteCss`
   enforces and the only reason a rule down here can override one up there at
   equal specificity. Nothing in the base names a class from this file; where a
   base rule needed a page-side companion (the bounded ledger heads, the
   .eb-work-a / .eb-tel hover) the companion is down here with a note saying so.

   No backticks anywhere in here — the whole thing is a template literal. Read
   the file header before changing a value; most of these numbers were chosen
   against a measurement, not a preference. */
const PAGE_CSS = `
/* ---- hero --------------------------------------------------------------- */
.eb-hero{padding-top:32px;padding-bottom:44px;}
.eb-hero-h{color:var(--bone);margin-bottom:22px;}
/* The fourth display clamp, and the reason there is one — see .eb-h1. It is
   set in the BODY face on purpose: it is a sentence a person says, not a
   headline, and at 1.2 leading it stays a lede rather than becoming a second
   type wall arguing with the first. */
.eb-hero-sub{margin-top:22px;font-size:clamp(1.375rem,3.4vw,2.375rem);line-height:1.2;
  font-weight:700;letter-spacing:-.01em;color:var(--ink);text-wrap:balance;}
@media (min-width:640px){
  .eb-hero{padding-top:60px;padding-bottom:64px;}
}

/* ---- ledger heads inside this page's two panels ------------------------- */
/* The BOUNDED instances of LedgerHead, named rather than inferred. Inside a
   padded panel the hairline should stop at the panel, so the negative margin
   equals that panel's own padding — 20px, 40px from 640 up, which is what both
   of them use. A ledger head anywhere else inherits the shell behaviour from
   css.ts, which is the right default; this list is the exception, and it is
   two long. It lives in the page because .eb-pad-in and .eb-note are the
   page's classes — the base is not allowed to reach into them. Both selectors
   are (0,2,0) against the base's (0,1,0), so they win on specificity and do
   not depend on being emitted second. */
.eb-pad-in>.eb-lh,.eb-note>.eb-lh{margin-right:-20px;}
@media (min-width:640px){.eb-pad-in>.eb-lh,.eb-note>.eb-lh{margin-right:-40px;}}
@media (min-width:1024px){
  /* the two bounded instances keep their own panel-relative behaviour */
  .eb-pad-in>.eb-lh,.eb-note>.eb-lh{max-width:none;}
}

/* ---- the cream order pad ------------------------------------------------ */
/* 88, not 64. The sticky header is 65px tall including its own rule, so a 64px
   scroll margin lands the top edge of the card exactly underneath it: tapping
   "See what I'd build for you" from the hero, or "Free report" from the phone
   bar, put the label and the first line of the heading behind the header. 88
   clears it with 23px to spare. The id and the class are on the same element;
   the id selector is here as well because the anchor is what the browser is
   actually scrolling to and a future refactor that drops the class should not
   silently take the margin with it. */
/* 64px header row + 1px rule + 44px service nav + 1px rule, plus the same
   ~22px of air the old 88px allowed under a 64px header. */
#report,.eb-report-anchor{scroll-margin-top:132px;}
.eb-pad{
  background:var(--bone);
  background-image:repeating-linear-gradient(to bottom,transparent 0 27px,rgba(35,31,32,.14) 27px 28px);
  border:1px solid var(--rich);
  color:var(--rich);
  /* roles, re-pointed for the cream ground */
  --fg:color-mix(in srgb, var(--rich) 92%, var(--bone));
  --dim:color-mix(in srgb, var(--rich) 66%, var(--bone));
  --strong:var(--rich);
  --rule:var(--rich);
  --rule-soft:color-mix(in srgb, var(--rich) 24%, var(--bone));
  --btn-a-bg:var(--rich); --btn-a-fg:var(--bone);
  --btn-b-bg:transparent; --btn-b-fg:var(--rich); --btn-b-bd:var(--rich);
  /* The card is a light ground inside a dark section, so it has to re-point
     the skim colour or the marked phrase in it would be painted the spine's
     light ember onto cream. Same value as .eb-g-bone, and the ONE mark on a
     light ground actually lives here — "what's costing you customers right
     now", in the standfirst above the box.
     #903c27 is 5.97:1 on the cream. It also has to hold over the card's ruled
     lines, which are rgba(35,31,32,.14) on bone — a 1px band every 28px that
     effectively darkens the ground to #d3cbbb where it crosses a line of type.
     The mark measures 4.56:1 there, which is why the mix is 60/40 and not the
     70/30 an earlier pass used: 70/30 was 5.14:1 on the cream and 3.92:1 on
     the hairline. If you ever lighten this, check it against BOTH grounds. */
  --mark-fg:color-mix(in srgb, var(--ember) 60%, var(--rich));
  /* the six tokens the widget speaks in */
  --color-paper:var(--bone);
  --color-ink:var(--rich);
  --color-muted:color-mix(in srgb, var(--rich) 66%, var(--bone));
  --color-hairline:color-mix(in srgb, var(--rich) 34%, var(--bone));
  --color-surface:color-mix(in srgb, var(--rich) 8%, var(--bone));
}
/* 27px of padding drops the first line of type onto the first ruled line, and
   28px leading keeps every line after it on one. */
.eb-pad-in{padding:27px 20px 41px;}
@media (min-width:640px){.eb-pad-in{padding:27px 40px 55px;}}
.eb-pad-h{color:var(--rich);}
.eb-pad-p{font-size:var(--t-body);line-height:28px;color:var(--fg);max-width:60ch;}
.eb-pad-p--risk{font-weight:700;color:var(--rich);}
/* The risk paragraph is set 700 outright, so a mark inside it would have no
   weight step left and would be leaning on hue alone. It has no mark today —
   see the note at that render site — and this rule is what keeps the skim
   path's weight rule honest if one is ever put back. Chivo's variable axis
   runs to 900. (Lives here rather than beside .eb-mark in css.ts because
   .eb-pad-p--risk is this page's class; the base may not name it.) */
.eb-pad-p--risk .eb-mark{font-weight:800;}
.eb-pad-widget{margin-top:28px;}

/* Reaching inside <InstantReport />. Its own selectors top out at (0,1,1), so
   (0,2,0) wins on specificity and no !important is needed. */
.eb-pad .ir *{border-radius:0;}
.eb-pad .ir :is(.ir-tick,.ir-spin){border-radius:50%;}
/* Transparent so the ruled lines of the paper run behind it — and capped,
   because nobody's business name is 820px long. .ir-input is flex:1 1 220px, so
   inside a full-width card at 1440 it grew to 897px: a field eleven inches wide
   asking for four words reads as an unfinished layout and, worse, makes the
   button that follows it look like an afterthought floating in the middle of
   the card. 420px holds about 45 characters of 17px type, which is longer than
   any restaurant name plus its city. */
.eb-pad .ir-input{background:transparent;max-width:420px;}
.eb-pad .ir-label{font-family:var(--f-mono);font-size:var(--t-label);letter-spacing:.06em;text-transform:uppercase;}
.eb-pad .ir-go,.eb-pad .ir-alt{font-family:var(--f-mono);font-size:var(--t-fine);letter-spacing:.04em;}
/* size only, not family: .ir-fine was the last string on the page rendering
   at a size the scale does not own. */
.eb-pad .ir-fine{font-size:var(--t-fine);}
.eb-pad .ir-head h2,.eb-pad .ir-sec h3,.eb-pad .ir-cta-h{font-family:var(--f-display);font-stretch:86%;}

/* ---- five checks / four steps ------------------------------------------- */
.eb-checks{list-style:none;margin:0;padding:0;}
.eb-check{display:flex;gap:18px;padding:24px 0;border-top:1px solid var(--rule-soft);}
.eb-check:first-child{border-top:0;padding-top:0;}
.eb-check-n{flex:0 0 auto;width:2.4ch;font-size:var(--t-num);font-weight:700;line-height:1;color:var(--wood);
  letter-spacing:-.02em;}
.eb-check-body{min-width:0;}
/* ⚠️ 44rem, NOT A ch VALUE, AND THAT IS THE WHOLE FIX. The ch unit resolves
   against the element's OWN font. This one is Chivo Mono at 13-14px where a
   character advances 0.6em, so the 62ch it used to carry measured 546px on a
   phone and 588px at desktop — while the .eb-p directly above it, at 64ch of
   17-18px Chivo, measured 669px and 708px. The instruction wrapped 120px
   narrower than the paragraph it belongs to, and because they sit in the same
   left-aligned column the difference showed as two ragged right edges in one
   block. Both are now a measured 704-708px. If .eb-p's measure ever moves,
   move this with it; do not translate it back into ch. */
.eb-do{margin-top:14px;font-size:var(--t-fine);line-height:1.6;color:var(--strong);max-width:44rem;}
@media (min-width:640px){
  .eb-check{gap:32px;padding:30px 0;}
}

/* ---- from yes to live: the track ---------------------------------------- */
/* The third enumerated run on the page, set as a schedule rather than as a
   third copy of .eb-checks — see the note above the markup. The numeral is a
   mono marker sitting on the hairline instead of a 32px slab in a left gutter,
   which is the whole visual difference at a glance, and at 900px the six steps
   go three-across so the eye reads two rows of a timetable rather than six more
   rows of a list. */
.eb-steps{list-style:none;margin:0;padding:0;display:grid;}
.eb-step{padding:16px 0 22px;border-top:1px solid var(--rule);}
/* ⚠️ --t-lede, NOT --t-fine, AND THE REASON IS CONTRAST NOT TASTE. Wood on ink
   measures 4.18:1. That clears the 3:1 bar for WCAG large-scale text and fails
   the 4.5:1 bar for everything else, so a wood numeral is legal at 19px bold
   and illegal at 14px bold. The first draft of this marker was 13/14px and was
   a real accessibility regression sitting inside a comment about how careful
   this page is. The 01-05 numerals in .eb-check-n are safe for the same reason
   at 26/32px. If a future edit wants a smaller marker here, it has to change
   the colour to --dim (5.6:1) at the same time. */
.eb-step-n{display:block;margin-bottom:8px;font-size:var(--t-lede);font-weight:700;
  letter-spacing:.04em;line-height:1;color:var(--wood);}
.eb-step-p{font-size:var(--t-body);line-height:1.6;color:var(--fg);}
@media (min-width:900px){
  .eb-steps{grid-template-columns:repeat(3,minmax(0,1fr));column-gap:30px;}
  .eb-step{padding:14px 0 30px;}
}

/* ---- prose blocks ------------------------------------------------------- */
.eb-block{padding-top:26px;}
.eb-block:first-child{padding-top:0;}
@media (min-width:640px){.eb-block{padding-top:32px;}}

/* The one recessed block on the page. Flat stacking, no shadow, no blur. */
.eb-note{margin-top:34px;padding:26px 20px;background:var(--rich);border:1px solid var(--rule-soft);}
.eb-note-p{font-size:var(--t-lede);line-height:1.5;font-weight:700;color:var(--strong);max-width:56ch;
  margin-bottom:18px;}
@media (min-width:640px){
  .eb-note{padding:32px 40px;}
}
.eb-g-rich .eb-note{background:var(--ink);}
/* The vertical padding is a tap target, not spacing, and it is free.
   These sit INSIDE sentences ("When I check a site…", "…the AI receptionist…"),
   so they measured 20px and 23px tall and dropped the page from 8/8 to 7/8 on
   the 44px floor the moment the internal links went in. WCAG 2.5.8 exempts a
   link inside a block of text, but the floor is reachable anyway: on an inline
   element, padding-block grows the hit box and does NOT grow the line box, so
   the paragraph around it does not move a pixel. There is no background and no
   border on these, so nothing about them looks different either.
   Do not convert them to inline-block chasing the same result — that DOES
   change the line box, and it would push every paragraph they sit in. */
.eb-inline-a{color:inherit;text-decoration:underline;text-underline-offset:3px;
  text-decoration-thickness:1px;padding-block:12px;}
.eb-inline-a:hover{color:var(--strong);}

/* ---- the worked arithmetic, on wood ------------------------------------- */
.eb-math{padding-top:52px;padding-bottom:52px;}
/* --t-lede is 19px / 21px and this is set at 700, so it clears the WCAG
   large-scale floor (18.66px bold) at both ends — which is the only reason ink
   is legal on wood at all (4.24:1). Do not drop the weight, and do not shrink
   --t-lede without re-checking this one block. */
/* Deliberately NOT monospace, though a ledger panel full of arithmetic is
   exactly where a designer reaches for it. Mono reads as "data" to someone who
   works in software and as a typewriter to everyone else, and a fresh-eyes
   review called this the single hardest block on the page to read — in the one
   block whose whole job is a 55-year-old following six numbers on a phone.
   Mono stays on the labels and the ledger amounts, where it is a texture rather
   than something anybody has to read a sentence in. */
.eb-math-p{font-size:var(--t-lede);line-height:1.5;font-weight:700;color:var(--ink);max-width:56ch;}
.eb-math-p+.eb-math-p{margin-top:20px;}
@media (min-width:640px){
  .eb-math{padding-top:56px;padding-bottom:56px;}
}

/* The four numbers, as a ledger above the argument. See APPS_FIGURES.
   ⚠️ EVERY SIZE IN HERE IS ABOVE THE WCAG LARGE-SCALE FLOOR AND HAS TO STAY
   THERE. Ink on wood is 4.24:1, which fails the 4.5:1 body-text bar and clears
   the 3:1 large-text bar. --t-lede is 19px at 700 (large-scale starts at
   18.66px bold) and --t-num is 26px. Drop either weight, or either token, and
   this becomes a real accessibility regression rather than a style note. */
.eb-figs{margin:0 0 26px;max-width:32rem;border-top:1px solid var(--rule);}
.eb-fig{display:flex;align-items:baseline;justify-content:space-between;gap:18px;
  padding:11px 0;border-bottom:1px solid var(--rule);}
.eb-fig-k{margin:0;font-size:var(--t-lede);line-height:1.3;font-weight:700;color:var(--ink);}
.eb-fig-v{margin:0;flex:0 0 auto;font-family:var(--f-display);font-stretch:86%;
  font-size:var(--t-num);font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--ink);}
@media (min-width:640px){
  .eb-figs{margin-bottom:34px;}
  .eb-fig{padding:13px 0;}
}

/* ---- what I build ------------------------------------------------------- */
/* The skim strip. Rows are links, so the whole block is the tap target; the
   border sits on the row rather than between rows so the last one closes. */
.eb-offers{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);}
.eb-offer{display:block;padding:18px 0;border-bottom:1px solid var(--rule-soft);
  text-decoration:none;color:inherit;}
.eb-offer:hover{background:var(--rich);}
.eb-offer-lead{display:block;font-size:var(--t-body);font-weight:700;line-height:1.35;
  color:var(--strong);}
.eb-offer-rest{display:block;margin-top:5px;font-size:var(--t-body);line-height:1.55;
  color:var(--fg);max-width:56ch;}
.eb-offer-go{display:block;margin-top:10px;color:var(--dim);}
@media (min-width:900px){
  .eb-offer{display:grid;grid-template-columns:minmax(0,16rem) minmax(0,1fr) auto;
    gap:28px;align-items:baseline;padding:19px 0;}
  .eb-offer-rest{margin-top:0;}
  .eb-offer-go{margin-top:0;}
}
@media (prefers-reduced-motion:no-preference){
  .eb-offer{transition:background-color .15s linear;}
}

.eb-builds{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);}
.eb-build{display:block;padding:18px 0;border-bottom:1px solid var(--rule-soft);max-width:72ch;}
.eb-build-lead{display:block;font-size:var(--t-body);font-weight:700;line-height:1.35;color:var(--strong);}
.eb-build-rest{display:block;margin-top:5px;font-size:var(--t-body);line-height:1.55;color:var(--fg);}
@media (min-width:640px){
  .eb-build{display:grid;grid-template-columns:minmax(0,15rem) minmax(0,1fr);gap:28px;
    align-items:baseline;padding:19px 0;max-width:none;}
  .eb-build-rest{margin-top:0;max-width:52ch;}
}

/* ---- work --------------------------------------------------------------- */
.eb-work{list-style:none;margin:0;padding:0;display:grid;gap:24px;}
@media (min-width:900px){.eb-work{grid-template-columns:1fr 1fr;gap:32px;}}
.eb-work-a{display:block;text-decoration:none;color:inherit;border:1px solid var(--rule-soft);}
.eb-work-a:hover{border-color:var(--rule);}
/* THE CROP, AND WHY IT IS NOW A REAL ONE.
   public/work/*.png are 1200x800@2x captures (2400x1600 actual) of a whole
   page. This used to magnify them with width:208.7% and margin-top:-43.48%,
   which showed the source window x 0-1150, y 500-1280 — and that window slices
   the demo's own layout down the middle. The today card spans x 564-1838 of
   the capture and the week panel sits under it, so what a visitor actually saw
   was the "Directions" button, "WHERE WE'LL BE THIS WEEK" and "HOURS" cut in
   half at a hard vertical edge. That does not read as a crop. It reads as CSS
   that failed, on the one section whose job is "open something I've built".
   It also cost the sharpness it was buying: the sizes attribute had to be quoted at the
   magnified width, the optimizer answered with a variant that was then laid
   out 1.6x larger than its own pixels, and the result was soft as well as
   sliced.
   So: no magnification, no percentage margin, and object-fit does the framing.
   The frame is 1150/780 (1.474) against a 3:2 source, so cover trims 21px from
   each side and nothing else — the capture arrives whole. The demo's body copy
   is small at this scale and that is correct; a thumbnail of a website should
   read as a website, and the label, the note and "Open →" underneath say which
   one. Change the frame ratio and object-position together if you re-frame;
   never reintroduce a width above 100%. */
.eb-work-shot{display:block;overflow:hidden;aspect-ratio:1150/780;border:1px solid var(--rule);}
.eb-work-img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center;}
.eb-work-meta{display:block;padding:20px;}
.eb-work-t{display:block;font-size:var(--t-body);font-weight:700;color:var(--strong);}
.eb-work-n{display:block;margin-top:6px;font-size:var(--t-body);line-height:1.5;color:var(--fg);}
.eb-work-go{display:block;margin-top:16px;color:var(--strong);}

/* ---- the demo line ------------------------------------------------------ */
.eb-tel{display:inline-flex;flex-direction:column;gap:10px;margin-top:36px;padding:24px 26px;
  min-height:54px;text-decoration:none;border:1px solid var(--rule);color:inherit;}
.eb-tel:hover{background:var(--rich);border-color:var(--strong);}
.eb-tel-lab{color:var(--dim);}
/* ember as type rather than as a field — legal because this is 40px+.
   ⚠️ SET IN THE DISPLAY FACE, NOT IN MONO, AND THAT IS A BUG FIX RATHER THAN
   A PREFERENCE. In a monospaced font every glyph occupies the same advance, so
   a bracket — which is a thin mark — is centred inside a full-width slot with
   half a character of white on each side of it. At 52px that is roughly 15px
   of air inside each bracket, and the demo line rendered as "( 276 ) 295-1209".
   Turning tracking off does not touch it; the space is the font's own metric.
   Archivo sets the brackets against the digits. The mono texture is not lost:
   it stays on every label, on Open →, on the buttons and on the 01-05 numerals,
   none of which contain a bracket or a comma. */
.eb-tel-n{font-family:var(--f-display);font-stretch:86%;font-size:clamp(2rem,8vw,3.25rem);
  font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;
  color:var(--ember);}


/* The other half of the hover transition declared in css.ts. The base rule
   covers .eb-btn and .eb-nav-a, which are system classes; these two are this
   page's own — the concept-work cards and the demo-line panel — so they opt
   in here rather than being named from the base. Same declaration, and it must
   stay the same: two hover speeds on one page reads as one of them lagging. */
@media (prefers-reduced-motion:no-preference){
  .eb-work-a,.eb-tel{transition:background-color .15s linear,color .15s linear,border-color .15s linear;}
}
/* ---- the ledger table --------------------------------------------------- */
.eb-ledger{margin:0;border-top:1px solid var(--rule);}
.eb-row{padding:26px 0;border-bottom:1px solid var(--rule-soft);}
.eb-row-l{margin:0;}
/* 1.55 rather than the default ~1.2 because the third label runs to two lines
   in some column widths, and 11px uppercase set solid is the least legible
   string on the page. balance splits it near the middle instead of leaving a
   two-word widow. */
.eb-row-lab{display:block;line-height:1.55;text-wrap:balance;color:var(--dim);}
/* Display face, same reason as .eb-tel-n: "$1,500" in a monospaced font puts
   the comma alone in a full-width advance and the amount reads "$1 , 500" at
   32px. Archivo closes it. tabular-nums keeps the four amounts on a common
   digit width so the column still lines up. */
.eb-row-amt{display:block;margin-top:8px;font-family:var(--f-display);font-stretch:86%;
  font-size:var(--t-num);font-weight:700;line-height:1.1;letter-spacing:-.02em;
  font-variant-numeric:tabular-nums;color:var(--strong);}
.eb-row-r{margin:14px 0 0;font-size:var(--t-body);line-height:1.6;color:var(--fg);max-width:52ch;}
/* THE TRACK IS 24rem, AND IT IS MEASURED, NOT CHOSEN.
   It was measured against Chivo Mono at 0.58em per character: the longest
   amount, "from $150 a month." at 18 characters, needed 334px and 24rem less
   32px of padding gives 352px. The amounts are now set in Archivo, which is
   narrower still, so the track has more room than it needs rather than less —
   it stays at 24rem because the binding constraint is the other column: the
   third row's 45-character label is 317px at 11px tracked and wraps below
   about 22rem, and 52ch of body prose wants what is left.
   The two columns start at 900px rather than 768px for the same reason: at 768
   a 384px left track leaves the body column 272px, which is too narrow to set
   18px prose in. Below 900 the row stacks, which it already did. */
@media (min-width:900px){
  .eb-row{display:grid;grid-template-columns:minmax(0,24rem) minmax(0,1fr);gap:0;padding:26px 0;}
  /* the vertical 1px rule that divides the two columns */
  .eb-row-r{margin:0;padding-left:32px;border-left:1px solid var(--rule-soft);}
  .eb-row-l{padding-right:32px;}
}

/* ---- about -------------------------------------------------------------- */
.eb-about{margin-top:28px;display:flex;flex-direction:column;gap:18px;}

/* ---- close -------------------------------------------------------------- */
.eb-close{padding-top:48px;padding-bottom:48px;}
/* 18ch and balanced. At 20ch the closing line broke after "I" — "Tell me what
   you run and I" / "'ll tell you straight…" — which is the worst available
   break in the sentence and it was the last thing on the page. balance splits
   it near the middle instead of filling line one and orphaning the remainder. */
.eb-close-h{color:var(--ink);margin-bottom:24px;max-width:18ch;text-wrap:balance;}
@media (min-width:640px){.eb-close{padding-top:66px;padding-bottom:66px;}}

/* ---- 2026-09-11: the short front door ---------------------------------- */
/* The doors, the system rows and the long-version rows all reuse .eb-offer —
   the skim strip's ruled, whole-row-is-the-link device — so three new blocks
   cost three rules. ⚠️ Rules above for .eb-checks, .eb-math/.eb-figs,
   .eb-builds, .eb-block and .eb-note no longer render on this page: that
   content moved to /why, which draws it with the service family's sv- classes.
   They are left in place until /why is signed off, then they go. */
.eb-anchor{scroll-margin-top:132px;}
.eb-mt-s{margin-top:18px;}
/* The price under a system's name: body face, not mono, for the "$1,500 reads
   as $1 , 500" reason on .eb-row-amt. */
.eb-offer-price{display:block;margin-top:6px;font-weight:400;font-size:var(--t-body);line-height:1.4;
  color:var(--fg);font-variant-numeric:tabular-nums;}
/* Four steps, not six: two across at 900 instead of three, so there is no row
   of one. */
@media (min-width:900px){.eb-steps--4{grid-template-columns:repeat(2,minmax(0,1fr));}}
`;
