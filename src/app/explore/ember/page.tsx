import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Archivo, Chivo, Chivo_Mono } from 'next/font/google';

import InstantReport from '@/components/report/InstantReport';
import {
  CAL,
  DEMO_LINE,
  DEMO_LINE_PRETTY,
  DESCRIPTION,
  EMAIL,
  LOCATION,
  PHONE,
  PHONE_PRETTY,
  PRICES,
  WORDMARK,
} from '@/config/brand';
import { DEMOS } from '@/lib/contact';

/**
 * EMBER — /explore/ember. Flat colour, hard type, 1px rules.
 *
 * ── WHY THIS EXISTS ───────────────────────────────────────────────────────
 *
 * Five previous directions came back as "boring and just white". Two
 * reference sites were then measured, and this page is built to those
 * measurements rather than to taste. The whole effect on both references came
 * from three things and no fourth: FLAT COLOUR FIELDS, HARD TYPE, and 1px
 * RULES that run edge to edge. Verified on the references: zero photography
 * in the hero, zero grain, zero backdrop-filter, zero box-shadow, zero
 * gradients used as decoration. There are none of those here either.
 *
 * ── THE SEVEN DEVICES, AND WHERE EACH ONE LIVES ───────────────────────────
 *
 *  1. RADIUS ZERO, everywhere. The shipped homepage uses 8px and that is a
 *     large part of why it reads as a template. Nothing on this page is
 *     rounded — including inside <InstantReport />, which hard-codes 8px in
 *     about fourteen places. See "REACHING INSIDE THE WIDGET" below.
 *
 *     One exception, and it is not a lapse: the wordmark dot. It is a circle
 *     because brand.ts says the mark is a circle and that mark is already on
 *     foundos.ai and on printed cards. Radius zero is a rule about the layout.
 *     It does not extend to redrawing the logo. (The widget's tick and spinner
 *     keep their 50% for the same reason — a square spinner is a bug.)
 *
 *  2. RULES THAT RUN PAST THE COLUMN. The reference measured a 1585px rule
 *     inside a 1502px viewport. Anything past the viewport edge is invisible,
 *     so what is actually observable is: the rule ignores the text column and
 *     touches both screen edges. That is what `<Rule />` does — it is a
 *     sibling of the padded shell, not a child, so it needs no negative
 *     margin and cannot cause horizontal overflow. Rules sit at every section
 *     boundary and directly under most headlines.
 *
 *  3. SUB-1.0 LEADING ON DISPLAY TYPE. `.eb-d` is line-height .85. The
 *     headline is a block, not a set of lines.
 *
 *  4. DIRECTIONAL TRACKING. Negative on display (-.035em), positive on the
 *     mono labels (+.06em). One rule, applied everywhere, no exceptions.
 *
 *  5. TWO VOICES, FAR APART. Archivo (display) and Chivo Mono (labels), with
 *     Chivo carrying body copy in between.
 *
 *     SIX TYPE STEPS, and this is now a checkable claim rather than a slogan.
 *     An earlier version of this comment said FOUR, and seventeen distinct
 *     font-size declarations shipped underneath it — 11 13 14 16 17 18 19 20
 *     21 22 24 26 32 34 and three clamps — because every component stepped
 *     itself at its own breakpoint. That is the more dangerous kind of wrong:
 *     the next editor believes the comment and adds a fifth on top of
 *     thirteen. The six live as tokens at the top of the stylesheet
 *     (--t-label --t-fine --t-body --t-lede --t-lead --t-num), all stepping
 *     together at 640px, plus the three display clamps (h1, h2, the demo
 *     number). Nothing in the stylesheet sets a raw px font-size. Change a
 *     token; do not add a seventh.
 *
 *     One thing is outside the scale and stays outside it: the wordmark, 22px
 *     in the header and 16px in the footer, set as an inline style because the
 *     dot's diameter and gap are derived from that number (brand.ts holds them
 *     as 9 and 6 at the desktop size). It is the logo being drawn, not the
 *     page being typeset.
 *
 *     The rule the scale is protecting: there are no mid-size headings. Every
 *     h3 on the page is set at body size in the body face, differing only by
 *     weight and colour. Adding a 28px sub-heading later quietly undoes it.
 *
 *  6. A DARK SPINE WITH FIELDS LAID ON IT. The page is not a colour scheme.
 *     It is #1a1a1a from top to bottom with five flat fields dropped onto it:
 *     ember (hero), bone (the audit card), wood (the worked arithmetic), bone
 *     again (the two concept screenshots), and ember again (the close).
 *     Everything else is the spine.
 *
 *  7. GROUND SWAPS AS NAVIGATION. Measured with the document laid out, not
 *     guessed: 15,271px tall at 1440 and 18,401px at 390. An earlier version
 *     of this comment said "~7,000px", which was out by half a page and made
 *     four field changes sound like plenty. They are not: the fields have to
 *     do the chapter work over that distance. There are five of them now, and
 *     the gaps between them matter more than the count. The bone
 *     field at section 08 is there because without it the ink runs unbroken
 *     from the end of the wood band at 5,751px to the rich shift at 14,237px:
 *     8,486px, more than half the page, on one colour. With it the longest
 *     single-ground run is 5,132px. `.eb-g-rich` under "One person." is
 *     a sixth, near-black shift, but be honest about what it is worth: #231f20
 *     on #1a1a1a is 1.06:1 and invisible on a phone in daylight. It is warmth,
 *     not navigation, and it is not load-bearing.
 *
 * ── THE MECHANISM: GROUNDS ARE VARIABLE SETS ──────────────────────────────
 *
 * There is no `dark:` variant and no colour written twice. A ground class
 * (`.eb-g-ember`, `.eb-g-bone`, `.eb-g-wood`, `.eb-g-rich`) re-points a small
 * set of custom properties on itself and every descendant inherits them:
 *
 *     --fg        prose colour on this ground
 *     --dim       meta / label colour on this ground
 *     --rule      the 1px hairline colour on this ground
 *     --btn-a-*   the solid button on this ground
 *     --btn-b-*   the second button on this ground
 *
 * The same `.eb-btn eb-btn--a` string is a bone slab on the dark spine, an
 * ink slab on ember, and a rich slab on the cream card. Nothing is restated.
 *
 * This is also how the FOCUS RING is solved, and it is the correct fix — do
 * not replace it with hand-written ring colours. globals.css sets, unlayered,
 * `:focus-visible { outline: 2px solid var(--color-ink) }`. On this page
 * `--color-ink` is bone on the dark spine, bone on ember, and rich on the
 * cream card. A black ring on #1a1a1a would be invisible; there isn't one.
 * (Same trick as /explore/ledger, which proved it against this widget.)
 *
 * ── REACHING INSIDE THE WIDGET ────────────────────────────────────────────
 *
 * <InstantReport /> speaks only in the six globals.css `@theme` tokens, so
 * `.eb-pad` re-points those six as well and the entire widget — input, "Show
 * me →", spinner, tick, panels, findings, PhoneCapture — comes out as cream
 * paper with rich ink on it, with no change to the component. The two things
 * tokens can't carry are handled by specificity, not by !important: the
 * widget's own selectors top out at (0,1,1), so `.eb-pad .ir *` at (0,2,0)
 * wins and squares every corner, and `.eb-pad .ir-input` at (0,2,0) makes the
 * field transparent so the ruled lines of the paper run behind it.
 *
 * ── PALETTE: FIVE VALUES ──────────────────────────────────────────────────
 *
 *   --ink   #1a1a1a  page ground AND the hairline colour on light fields
 *   --ember #d94f2b  hero and close, nowhere else
 *   --bone  #f0e7d4  the order-pad card, the concept-work field, and
 *                    reversed headlines on ember
 *   --wood  #b76745  the arithmetic band, and the 01-05 numerals
 *   --rich  #231f20  ruled lines on the cream, never pure black on cream
 *
 * Every other colour on the page is a `color-mix()` of two of those five, so
 * a tint can't drift into being a sixth hue. A one-man shop reads more
 * credible with five values than with fifteen.
 *
 * `--dot` #1D9E75 is the sixth declaration and it is NOT a palette value —
 * it is the logo. brand.ts defines the wordmark dot as a green circle, it is
 * on foundos.ai and on the cards already in people's hands, and the page is
 * not entitled to redraw it. It is the one radius and the one green here, it
 * appears twice (header, footer), and both times on the ink spine.
 *
 * ── CONTRAST, BECAUSE THE PALETTE FORCES A DECISION ───────────────────────
 *
 * Ember and wood both land near L*≈0.205. Against them, ink is 4.24:1 and
 * bone is 3.35:1 — neither clears 4.5:1, so NEITHER FIELD MAY CARRY BODY-SIZE
 * TEXT. That is a hard constraint, not a preference, and it decided the
 * layout: the ember fields carry only display type and button slabs, and the
 * long delivery-apps argument stays on the dark spine where prose is 11:1.
 * The one thing that sits on wood is the worked arithmetic, set at 21px/700
 * mono — which is WCAG large-scale text, where the bar is 3:1 and 4.24
 * clears it. If someone later drops a 17px paragraph onto ember or wood, it
 * is a real accessibility regression, not a style note.
 *
 * ── COPY ──────────────────────────────────────────────────────────────────
 *
 * Every word comes from src/app/page.tsx or docs/site-content-2026-09-03.md,
 * with one exception recorded below. Where a paragraph is split (the "Check
 * it:" line, the "$18 plate" arithmetic), the split is formatting: the
 * characters either side are untouched.
 *
 * THE EXCEPTION — the honesty pass. Six strings were rewritten because they
 * described a business that does not exist yet: a client population ("Most pay
 * for themselves…" in §11), an ongoing practice with clients (the present-
 * perfect "I've been building…" in §12), an unsourced majority plus the one
 * word the rest of the page is built to avoid ("most of them are getting
 * robbed" in §12), an unsourced superlative ("the best discovery tool a small
 * restaurant has ever had" in §06), and an unbounded offer of free custom work
 * to every visitor ("I'll build a sample first" in §04). Each rewrite carries
 * its own ⚠️ note at the constant. A page that claims less than it can prove
 * is the whole reason §09 works; these five were quietly spending that.
 *
 * The same pass also widened "restaurant" to the food business generally —
 * trucks, bakeries, caterers, bars, coffee — per Josh: "dont say just
 * restraunt, anyone in the FOOD business." The replacements are concrete nouns
 * (counter, menu, catering date), never a category list and never "business
 * owner".
 *
 * Two things a future editor will be tempted to change and must not:
 *
 *   • The ads paragraph in §09 ("I don't run ads… When that changes I'll put
 *     it on this page.") is the most valuable sentence on the site. Do not
 *     soften it, move it to the end, or shorten it.
 *   • The "before you believe anybody's math about your place. Mine included."
 *     line in §06 is the credibility anchor for that whole section. It stays
 *     last, and it stays first-person.
 *
 * ── PRICES ────────────────────────────────────────────────────────────────
 *
 * foundos prices are read from PRICES in config/brand.ts and appear in §11
 * only. The dollar figures in §06 are NOT foundos prices — they are the
 * delivery-app worked example ($18 counter, $24 listing, $16.80 on the 30%
 * plan, $20.40 on 15%) and the sourced Atlanta oxtail comparison. They are
 * quoted copy and they do not belong in brand.ts. Don't "fix" them.
 */

export const metadata: Metadata = {
  title: 'Ember — design exploration',
  robots: { index: false, follow: false },
};

/**
 * Three faces, declared here rather than in the root layout so no other route
 * pays for type it doesn't render. next/font scopes a font to the component
 * that loads it; the three `.variable` classes go on the page's root element.
 *
 * Archivo carries a real WIDTH axis (wdth 62–125), which is why it is here
 * instead of a second family: `font-stretch: 86%` gives the hero a genuinely
 * narrower cut so a 78-character sentence can be set enormously without
 * running to seven lines on a phone. One family, two very different voices.
 *
 * Deliberately NOT used: Bebas Neue, Oswald, Montserrat, Poppins, Lato. All
 * free, all the default of every canned restaurant template — which is the
 * exact category this page cannot be mistaken for.
 */
const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-eb-display',
});

const body = Chivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-body',
});

const mono = Chivo_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-mono',
});

/** The one column. Rules are allowed outside it; nothing else is. */
const SHELL = 'mx-auto w-full max-w-[1200px] px-5 sm:px-10';

/* ── copy ─────────────────────────────────────────────────────────────────
   All of it lifted verbatim. Held in constants rather than inline JSX so an
   apostrophe never has to be escaped and so a diff shows a copy change as a
   copy change. */

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
  h1: 'I build and run the online side of restaurants and food businesses in Atlanta.',
  subA: "You're good at what you do.",
  subB: "The internet doesn't show it.",
  cta: "See what I'd build for you ↓",
};

const PROBLEM = {
  lines: [
    'Your hours are wrong on Google.',
    'Your menu is a photo from three years ago.',
    'The phone rings while your hands are full.',
  ],
  strong: "So I build the part you don't have time for.",
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
  risk: "Free to start: the report above runs on its own and takes about ten seconds. If it turns up something worth fixing, text me and I'll build one page — your menu, on a real mobile page, with your prices and your photos — and send you the link. No charge, no meeting. If you don't like it, you owe nothing and you never hear from me again.",
};

const CHECKS_STAND =
  'Every one of these takes about two minutes to check on your own phone. Do it standing behind your own counter before you talk to anybody, me included.';

const APPS_STAND =
  "You already know about the commission. So I'll skip that part and go to the ones that cost you more.";

const FUNNEL_STAND =
  "There are four steps, and every one of them is a place you can lose somebody. Each one is simple on its own. It's just usually nobody's job.";

const JARGON = {
  lead: 'Those four words an ad guy will say at you.',
  para: "Awareness, consideration, conversion, retention. That's all they mean. You already run most of it in your head every service. You just don't have anything set up to keep doing it while you're on the line.",
};

/**
 * ⚠️ `honesty` is the single most valuable paragraph on the site. Verbatim,
 * first, and at the top of its block. Do not soften it, do not move it to the
 * end, do not shorten it.
 */
const ADS = {
  label: 'Where I actually am with ads',
  honesty:
    "I don't run ads. I'm studying for Meta's media buying certification, the 410-101, and I haven't sat the exam yet. I've never managed a dollar of anybody else's ad spend. When that changes I'll put it on this page.",
  why: "Here's why I'm telling you instead of quietly leaving it off. An ad is a bill you pay to send people somewhere. If the place you're sending them doesn't open the menu or take an order, the ad just buys you a faster way to lose them. Steps two, three and four are the thing an ad lands on, and that's the part I build. Get those right and step one turns into a decision you make later with real numbers, instead of a guess you pay for every month.",
  /** One sentence, split only so the first half can link back up to the box. */
  pointA: 'The report at the top of this page grades you on the first two steps.',
  pointB: 'Takes about ten seconds.',
};

const BUILD_TAIL = {
  /** One sentence, not three. The staccato version read as a deck. */
  strong: 'Then I run it every week so you never have to think about it.',
  own: 'You own all of it — your domain, your site, your data. If you ever leave, you take it with you.',
};

const WORK_COPY = {
  h2: "Open something I've built.",
  p: "These are concepts — the businesses aren't real, everything on the sites works. Click around, place a fake order, try the booking.",
  fine: 'Concept businesses. Built the same way I would build yours.',
};

const PROOF = {
  h2: "Don't take my word for it.",
  p: "Call the AI receptionist and order a slab of ribs out loud. It'll take the order — and tell you it's AI.",
  /** With the number below it this reads "Call (276) 295-1209" — §2.7's button. */
  verb: 'Call',
};

/**
 * The section headings.
 *
 * ⚠️ These are deliberately NOT all the same shape. Eight of nine used to be
 * sentence-case declaratives of three to six words ending in a period, and
 * two of them ("What I build." / "What it costs.") were a matched pair — the
 * every-heading-cut-from-one-template tell. Two now break it on purpose:
 * `builds` runs long and `costs` is a question. If a later edit tidies them
 * back into a matched set, the tell comes back.
 *
 * `apps` stays exactly as it is, no period. It is the one heading that sounds
 * like a person naming a section out loud rather than a schema field.
 */
const HEADINGS = {
  checks: 'Five things I check first.',
  /** No period: the content file writes this one without one. Left as written. */
  apps: 'About the delivery apps',
  builds: 'What I build, and what each part of it is for.',
  funnel: 'How a stranger becomes a regular.',
  costs: 'So what does this cost?',
  about: 'One person. Not an agency.',
};

/**
 * The mono label above each section heading.
 *
 * ⚠️ THESE ARE WORDS, NOT NUMBERS, AND THAT IS THE FIX. They used to read 04,
 * 05, 06 … 12 — the spec's own §-numbers leaking into the UI. A reader sees a
 * ledger that starts at 04 and concludes either that 01-03 are missing or that
 * the page was generated from a schema, which is the exact impression this
 * page exists to avoid. Worse, section "05" sat directly above list item "01"
 * in the same mono face.
 *
 * The numeral device is not gone; it is now reserved for the two lists that
 * are genuinely enumerated (the five checks and the four steps) and the run of
 * fulfilment steps. "Where I actually am with ads" already proved the label
 * works without a number. Do not put digits back here.
 */
const LABELS = {
  audit: 'Start here',
  checks: 'Check these yourself',
  apps: 'What the apps cost you',
  builds: 'The systems I provide',
  work: 'Two concept builds',
  funnel: 'Four steps',
  proof: 'Call it yourself',
  costs: 'Prices',
  how: 'After you say yes',
  about: 'Who you are dealing with',
};

/**
 * "How it works" — the section Josh asked for ("the systems i provide, how it
 * works") that the page did not have. It explained WHAT he builds and WHY it
 * matters, and never what happens between an owner saying yes and the thing
 * being live.
 *
 * ⚠️ SOURCE: every line here is a step in foundos-system-rulebook.md §6
 * (Runbook — Fulfillment). The intake list is its step 2, the build is step 3,
 * the domain is step 4, the listing and review requests are steps 5 and 6, the
 * phone pass is Gate 2 (step 7), and the link plus the sixty-second video is
 * step 8. `deadline` and `late` are that runbook's own terms, quoted. Nothing
 * here is promised that the runbook does not already commit to, and nothing
 * new may be added to this list unless it is in the runbook first.
 */
const HOW = {
  h2: 'From yes to live in seven days.',
  steps: [
    {
      n: '01',
      para: "You pay, and I text you the three things I need: your real menu with the prices on it, ten or more photos of the food and the room, and your logo if you've got one. Send what you have and I'll fill the gaps.",
    },
    {
      n: '02',
      para: 'I turn the sample you already looked at into the real thing — your menu, your photos, your hours, and ordering that puts the money in your account.',
    },
    {
      n: '03',
      para: "Your domain gets pointed at it. If you don't have one, I buy it on your card, so it's in your name and not mine.",
    },
    {
      n: '04',
      para: 'I fix the Google listing — hours, photos, categories, the link back to the site — and switch on the review requests.',
    },
    {
      n: '05',
      para: 'Then I go through the whole thing on my own phone before you ever see it. I place a test order. I tap every number and every hour on the site.',
    },
    {
      n: '06',
      para: 'It goes live. You get the link and a sixty-second video showing you how to change a menu item yourself.',
    },
  ],
  deadline: 'Seven days from your payment to the site being live. Miss it and your first month is free.',
  late: "If your photos and menu take longer than that, I go live on the sample content and swap yours in the day they land. Missing material is my problem to work around, not a reason to hold your site.",
};

const CLOSE = "Tell me what you run and I'll tell you straight whether I can help.";
const NAV = { text: 'Text me', book: 'Book 20 minutes' };

/**
 * §2.5 of page.tsx. Bold lead-in, plain sentence, no icons.
 *
 * ⚠️ THE ROWS ARE DELIBERATELY UNEVEN. This block sits dead centre of the page
 * and it was the most template-shaped thing on it: six rows of one grammar and
 * near-identical length, three of them turning on the same "so you…" hinge,
 * with "actually" and "finally" doing marketing-filler work and "the obvious
 * choice" arriving out of a stock-phrase drawer. All of that is gone.
 *
 * What replaced it is asymmetry: one row is four words and carries no second
 * half at all, one runs past thirty, and the rest sit between. Two rows finish
 * the lead as a lower-case continuation; two answer it with a whole sentence.
 * A future edit that evens these back out, or gives every row a `rest`, puts
 * the tell straight back. `rest: null` on row five is the point, not an
 * oversight — see the render, which omits the span entirely.
 */
const BUILDS = [
  {
    lead: 'A website that takes the order',
    rest: 'Ordering and payment on your own site, at your own prices, so the money lands in your account instead of a cut of every ticket going to the app.',
  },
  {
    lead: 'Bookings customers make themselves',
    rest: 'at midnight, straight into your calendar.',
  },
  {
    lead: 'An AI that answers every call',
    rest: 'takes the order, books the table or the catering date. A ringing phone stops being a lost customer.',
  },
  {
    lead: 'Reviews asked for automatically',
    rest: 'and the regulars who drifted away quietly brought back.',
  },
  {
    /** The four-word row. It needs no second half and must not be given one. */
    lead: 'Your Google listing, fixed',
    rest: null,
  },
  {
    lead: 'Every order, call, and dollar on one screen',
    rest: 'You look in one place at the end of the week and know what worked.',
  },
] as const;

/** docs/site-content-2026-09-03.md — "Five things I check first." */
const CHECKS = [
  {
    n: '01',
    title: 'Your menu is a picture.',
    body: "A PDF, or a photo of the printed menu taped onto a page. Google can't read the words inside either one, so the dishes in it don't come up when somebody searches for them by name. And a customer holding a phone at a red light has to pinch and drag around a page that was laid out for paper. Most of them give up and order somewhere else.",
    check: 'Check it: open your menu on your phone and try to read a price without zooming.',
  },
  {
    n: '02',
    title: "Google doesn't know when you're open.",
    body: `Blank hours, or hours that were right two years ago. Someone drives fifteen minutes across town on a Sunday and finds the lights off. You lost that customer and you'll probably read about it in a review. There's a quieter cost too. With no hours on file you fall out of Google's "Open now" filter, so you don't come up at all for the person searching at 9pm for somewhere still serving.`,
    check: 'Check it: search your own name on your phone. The hours sit right under it. Look at the holidays as well.',
  },
  {
    n: '03',
    title: 'Nobody can tap to call you.',
    body: "Your number sits on the page as plain text. On a phone that means copying it by hand and pasting it into the dialer. Sounds like nothing. It's the easiest thing a hungry person can do and your site makes them work for it.",
    check: "Check it: pull your site up on your phone and tap the number. If nothing happens, there's your answer.",
  },
  {
    n: '04',
    title: 'Every online order goes through an app.',
    body: "DoorDash, Uber Eats, Grubhub, Slice. If the only order button on your site sends people to one of those, a cut of every ticket leaves the building before you've paid for the chicken. The bigger loss is quieter. The app knows who ordered and how to reach them. You don't, so you can't text that person about Tuesday.",
    check: 'Check it: tap your own order button and see whose logo you land on.',
  },
  {
    n: '05',
    title: 'The site loads fine at your desk and nowhere else.',
    body: "On your office wifi it opens instantly. On a phone with two bars in a parking lot it's a white screen for six seconds, and people don't wait out white screens. When I check a site I count anything past three seconds as a problem, and if it hasn't loaded in eight I treat it as down. It's almost always one enormous background photo nobody ever resized.",
    check: 'Check it: turn wifi off on your phone and count out loud while your own site loads.',
  },
] as const;

/** docs/site-content-2026-09-03.md — "About the delivery apps", part one. */
const APPS_BEFORE = [
  {
    lead: 'Your app price is the only price a lot of people have ever seen',
    paras: [
      'When the apps take their cut, most owners do the sensible thing and raise the price on the app to cover it. Nothing wrong with that. But think about who is actually reading that number.',
      'Somebody who found you on DoorDash has never stood at your counter. They have never seen the menu on your wall. They have no second number to compare against. That is just what your food costs, as far as they know.',
      'There is a Jamaican place near me here in Atlanta. Oxtail runs $31.99 on DoorDash. The same plate is around $18 at the counter. I checked both in August 2026. Nobody in that kitchen is overcharging anyone, and the owner is the one printing the cheaper number. But plenty of people scrolling that app have quietly filed him under expensive, and he will never hear about it. That is the loss. It does not show up on any statement.',
    ],
  },
  {
    lead: 'Marking it up gets you less back than it looks like',
    paras: [
      'This is the part I would want to know if it were my place. The commission comes off the subtotal on the app, and the subtotal is your marked up price, not your counter price. So the markup raises the fee along with it.',
    ],
  },
] as const;

/**
 * The worked arithmetic. Set in mono on the wood field — the one place a
 * saturated field carries running text, at 21px/700 so it is WCAG
 * large-scale. It is the most teachable thing on the page; keep all three.
 */
const APPS_MATH = [
  'Say a plate is $18 at your counter and you list it at $24 on the app to cover the cut. On the 30% plan you keep $16.80 of that $24. The customer paid six dollars more than your regular price, and you finished a dollar twenty under it.',
  'Run the same plate on the 15% plan and you keep $20.40. Now you are $2.40 ahead and the markup did its job.',
  'Same menu, same markup, opposite outcome. The plans run from about 15% up to 30% depending on which one you signed, so that one number decides whether any of this works.',
] as const;

/** "About the delivery apps", part two. */
const APPS_AFTER = [
  {
    lead: 'You never get the phone number',
    paras: [
      'On a delivery order you get a first name and a masked number that stops working once the driver is gone. No email you can write to. No number you can text on a slow Tuesday.',
      'The app has all of it.',
      'So a regular you earned through the app still has to be bought back from the app on the next order, and the one after that, for as long as they keep eating your food. You did the work of turning a stranger into a regular. You are renting them back by the plate.',
    ],
  },
  {
    lead: 'Two things worth checking on your own phone tonight',
    paras: [
      'Both are free and neither one involves me.',
      'Pull up your own listing on the app and set it next to your printed menu. Read down the two columns. I would bet you set those app prices once when you signed up and have not looked at them side by side since.',
      "Then open your merchant portal and find your actual commission rate. Not what you think it is. The number on the plan you are on right now. Everything above runs on that one figure, so find it before you believe anybody's math about your place. Mine included.",
    ],
  },
  {
    lead: "I'm not going to tell you to leave the apps",
    paras: [
      'They put you in front of people who have never heard of you, which nothing else does as cheaply. Somebody scrolls past your photo at nine at night and orders. Keep that.',
      "What I build is the other lane. Ordering that lives on your own site, at your counter prices. The kitchen ticket prints the same way it does now. The customer's name and number land somewhere you own.",
      'Then the people who already love you have a door that does not take a cut of every plate. And the app goes back to the job it is genuinely good at, which is introducing you to strangers.',
    ],
  },
] as const;

/**
 * The last of those blocks is pulled out and rendered differently from the
 * other two, and that is the fix for the worst structural problem on the page.
 *
 * Six consecutive sections were built from one skeleton — mono label, display
 * h2, full-bleed rule, dim standfirst, enumerated set — so a reader scrolling
 * fast saw list, list, list, list, list, list. One section had to run as
 * argument instead, and this is the passage that earns it: the concession
 * ("keep the apps, they are good at the thing they are good at") is the most
 * human writing here, and h3-ing it into a labelled sub-block was the thing
 * flattening it. It now runs as paragraphs with no heading above them.
 *
 * The lead is a sentence, not a title, so it needs a full stop. It is added
 * here at render rather than in the string so the copy above stays byte-for-
 * byte as written — and normalised first, so a copy edit that supplies its own
 * period can never produce two.
 */
const APPS_TAIL = APPS_AFTER[APPS_AFTER.length - 1];
const asSentence = (s: string) => `${s.replace(/[.\s]+$/, '')}.`;

/** docs/site-content-2026-09-03.md — "How a stranger becomes a regular." */
const FUNNEL = [
  {
    n: '01',
    lead: 'Somebody two miles from you is hungry right now and has never heard of you.',
    para: "They're not comparing you to anybody. They don't know you exist. Before you spend a dollar telling them, the free version has to be working: whether your Google listing is right, whether the hours are right, whether the photos are yours and recent, whether you're even filed under the right category. That's what somebody two miles out sees first. It costs nothing but the work, so it's where I start.",
  },
  {
    n: '02',
    lead: "They found you, and now they're picking between you and the place next door.",
    para: "This happens on a phone and it's over in seconds. They look at your photos. They check how many stars you've got. They tap the menu and find out whether it opens or whether it's a PDF that loads sideways. Nothing about your cooking is involved yet, which is the frustrating part, because the cooking is the thing you're actually good at. So I rebuild the menu as a real page, get current photos on it, and set the review requests to go out on their own so your rating isn't just whoever was annoyed enough to type something.",
  },
  {
    n: '03',
    lead: 'They want it. Ordering is the last thing in the way.',
    para: "Ten seconds or three minutes. That's the whole difference, and it gets decided by things that sound too small to matter. A checkout that demands an account. A phone number that doesn't dial when you tap it. An app taking a cut of a ticket your own site could have taken for free. I put ordering and payment on your site so the order comes to you and the money stays yours. If they'd rather talk to somebody, the AI picks up, takes the order, and nobody sits on hold.",
  },
  {
    n: '04',
    lead: 'They came once. Can you reach them again?',
    para: "You already paid to get them in the door. Getting them back costs almost nothing by comparison, and it's still the step that gets put off, because nothing breaks when you skip it. So here's the plain version of the question. Do you have their number? If somebody ordered from you in March and hasn't been back since, is there anything at all that reminds them you exist? I set up the review ask and the win-back text, and the list that makes either of them possible.",
  },
] as const;

/**
 * §2.8 of page.tsx, re-set as a ledger. `amount` is null on the third row on
 * purpose — ordering, bookings and the AI receptionist are deliberately
 * unpriced on the site (see the note in brand.ts), and an empty column in a
 * ledger is the honest way to show a line that has no number yet.
 */
const COSTS = [
  {
    label: 'The site',
    amount: `${PRICES.site.display}, ${PRICES.site.cadence}.`,
    body: 'Built from your real menu, photos, and hours. You own it outright.',
  },
  {
    label: 'Running it',
    amount: `${PRICES.running.prefix} ${PRICES.running.display} ${PRICES.running.cadence}.`,
    body: 'Hosting, Google listing kept correct, review requests, menu changes, a monthly one-page report. Cancel any time; you keep the site.',
  },
  {
    label: 'Online ordering, bookings, the AI receptionist',
    amount: null,
    /**
     * ⚠️ This line used to end "Most pay for themselves in saved delivery-app
     * fees the first month." There is no client population to say "most" about
     * — and §09 volunteers, four screens up, that he has never managed a
     * dollar of anybody else's spend. A reader who takes §09 seriously catches
     * the whiplash immediately, and it costs him the section that earned the
     * trust. The promise is replaced by the mechanism: the owner is handed the
     * one number that decides it and told he can get it without us, which is
     * the same move §06 already closes on. Do not put an outcome back here
     * until there is a named client whose bill it actually happened to.
     */
    body: 'Added when you want them, priced when we talk. Find your real commission rate in your merchant portal first and work out what a month of app orders costs you. That number decides whether any of this is worth it, and you can get it without me.',
  },
] as const;

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
  "I'm Josh. I'm in Atlanta, I work in a gym, and I build sites for food businesses — restaurants, trucks, bakeries, caterers — because I keep finding good ones running on a Wix template from 2019 and handing a cut of every ticket to an app.",
  'You text me, I answer. No account manager, no ticket system.',
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

/** Carried forward from page.tsx — the section list has no slot for it, and
 *  building strictly to the list would silently drop the structured data. */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: WORDMARK.text,
  description: DESCRIPTION,
  url: 'https://foundos.ai',
  telephone: `+1${PHONE}`,
  email: EMAIL,
  areaServed: { '@type': 'City', name: LOCATION.city },
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCATION.city,
    addressRegion: LOCATION.region,
    addressCountry: 'US',
  },
  founder: { '@type': 'Person', name: 'Josh Potesta' },
  sameAs: ['https://instagram.com/josh.potesta'],
};

/* ── pieces ───────────────────────────────────────────────────────────── */

/**
 * A 1px line, edge to edge.
 *
 * Normally a sibling of the padded shell, so it reaches both screen edges on
 * its own. `bleed` is for the two rules that have to live INSIDE the shell —
 * the one under the hero headline and the one above the closing buttons —
 * where it pulls the line back out to the gutter with a negative margin. The
 * margin exactly equals the gutter, so the line stops at the viewport edge
 * and the document never gets wider than the screen.
 */
function Rule({ soft = false, bleed = false }: { soft?: boolean; bleed?: boolean }) {
  const cls = ['eb-rule', soft && 'eb-rule--soft', bleed && 'eb-rule--bleed']
    .filter(Boolean)
    .join(' ');
  return <div aria-hidden="true" className={cls} />;
}

/**
 * The ledger head: a tiny mono label, then a hairline that runs from the end
 * of the label out to the screen edge. The single most stealable device on
 * either reference, and it is four lines of CSS.
 *
 * `heading` promotes the label from a decorative <span> to a real <h3>, with
 * no visual change at all — `.eb-lab` sets size, weight and colour outright,
 * and preflight has already zeroed the UA heading margins. It exists for one
 * block: the ads-honesty note in the funnel section, which is the most
 * valuable copy on the site and was the only block there missing from the
 * document outline. A screen-reader user navigating by heading was skipping
 * straight past it while reaching less important h3s. Keep it a heading.
 */
function LedgerHead({ label, heading = false }: { label: string; heading?: boolean }) {
  return (
    <div className="eb-lh">
      {heading ? <h3 className="eb-lab">{label}</h3> : <span className="eb-lab">{label}</span>}
      <span aria-hidden="true" className="eb-lh-line" />
    </div>
  );
}

/** `foundos` and the dot. The dot is decorative, so the link reads as one word. */
function Wordmark({ px }: { px: number }) {
  return (
    <span className="eb-mark" style={{ fontSize: `${px}px` }}>
      {WORDMARK.text}
      <span
        aria-hidden="true"
        className="eb-dot"
        style={{
          width: `${WORDMARK.dotSize / px}em`,
          height: `${WORDMARK.dotSize / px}em`,
          marginLeft: `${WORDMARK.dotGap / px}em`,
        }}
      />
    </span>
  );
}

export default function EmberPage() {
  return (
    <div className={`eb ${display.variable} ${body.variable} ${mono.variable}`} id="top">
      <style>{CSS}</style>

      {/* Escaping `<` is the documented guard against injection through a
          stringified payload. Nothing here is user input today; the escape
          stays so it can't become a hole when something dynamic is added. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, '\\u003c') }}
      />

      {/* ── 01 Header ─────────────────────────────────────────────────────
          Sticky with pure CSS, no scroll listener. It has to survive four
          grounds, so it carries its own opaque ink background rather than
          inheriting one. Nav sits in the label voice, which is also the
          button voice — the page has no third small-type style. */}
      <header className="eb-head">
        <div className={`${SHELL} eb-head-row`}>
          <a href="#top" className="eb-head-mark">
            <Wordmark px={22} />
          </a>
          <nav className="eb-nav">
            <a href={`sms:${PHONE}`} className="eb-nav-a eb-lab">
              {NAV.text}
            </a>
            <a href={CAL} target="_blank" rel="noreferrer" className="eb-nav-a eb-lab eb-nav-a--wide">
              {NAV.book}
            </a>
          </nav>
        </div>
        <Rule />
      </header>

      <main>
        {/* ── 02 Hero — the ember field ───────────────────────────────────
            The h1 is the only display string on the page allowed above 44px
            on a phone, and the only reversed one (bone on ember, per the
            reference). The subhead is ink at 21px/700 because ink on ember
            is 4.24:1 — fine for large-scale text, not fine at 17px. */}
        <section className="eb-g-ember">
          <div className={`${SHELL} eb-hero`}>
            {/* No ledger label here, and none on the wood band either. On a
                field this saturated the only two label colours available are
                ink (4.24:1) and bone (3.35:1), and neither clears 4.5:1 for
                11px text. The reference heroes are the type wall and nothing
                else anyway, so the constraint and the design agree. */}
            <h1 className="eb-d eb-h1 eb-hero-h">{HERO.h1}</h1>
            <Rule bleed />
            <p className="eb-hero-sub">
              {HERO.subA}
              <br />
              {HERO.subB}
            </p>
            <div className="eb-btns">
              <a className="eb-btn eb-btn--a" href={`sms:${PHONE}`}>
                {NAV.text} — {PHONE_PRETTY}
              </a>
              <a className="eb-btn eb-btn--b" href="#report">
                {HERO.cta}
              </a>
            </div>
          </div>
        </section>
        <Rule />

        {/* ── 03 The problem ───────────────────────────────────────────────
            Three sections on this page carry no heading at all — this one, the
            wood arithmetic band, and the tail of the delivery-apps argument —
            because a heading would be wrong in each case. A section with no
            accessible name is invisible to a screen reader's landmark list, so
            each of the three gets an aria-label instead. */}
        <section aria-label="The problem">
          <div className={`${SHELL} eb-sec eb-sec--tight`}>
            <p className="eb-lede">
              {PROBLEM.lines.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <p className="eb-lede eb-lede--strong">{PROBLEM.strong}</p>
          </div>
        </section>

        {/* ── 04 The audit box — the cream order-pad card ─────────────────
            The front door of the business, and the loudest thing below the
            hero for free: it is the only light element in the top two thirds
            of the page, so it captures the eye by contrast alone. Everything
            below it is a reason to come back up here and type. (The other
            cream is the field under section 08, four screens further down.
            They never share a viewport, and one is a bordered panel inside the
            column while the other is a full-bleed field — different objects.)

            The ruled lines are one repeating-linear-gradient. The card holds
            no image, no shadow and no radius. `scroll-mt` clears the sticky
            header when the hero button lands here. */}
        <section id="report" className="eb-report-anchor">
          <div className={`${SHELL} eb-sec`}>
            <div className="eb-pad">
              <div className="eb-pad-in">
                <LedgerHead label={LABELS.audit} />
                <h2 className="eb-d eb-h2 eb-pad-h">{AUDIT.h2}</h2>
                <div className="eb-rule eb-rule--inset" aria-hidden="true" />
                <p className="eb-pad-p">{AUDIT.p}</p>
                <div className="eb-pad-widget">
                  <InstantReport />
                </div>
                <div className="eb-rule eb-rule--inset" aria-hidden="true" />
                {/* The promise belongs beside the ask, not four screens below it. */}
                <p className="eb-pad-p eb-pad-p--risk">{AUDIT.risk}</p>
              </div>
            </div>
          </div>
        </section>
        <Rule />

        {/* ── 05 Five things I check first ────────────────────────────────
            The value-giving section, so it gets room: every item is its own
            ruled row with a wood numeral, and the "Check it:" instruction is
            pulled onto its own mono line. Nothing about the sentence changed
            — only where the line break is. */}
        <section>
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.checks} />
            <h2 className="eb-d eb-h2">{HEADINGS.checks}</h2>
          </div>
          <Rule />
          <div className={`${SHELL} eb-sec--after-rule`}>
            <p className="eb-stand">{CHECKS_STAND}</p>
            {/* ⚠️ role="list" AND A VISIBLE, UNHIDDEN NUMERAL. Both are load
                bearing. `list-style:none` makes Safari and VoiceOver drop list
                semantics entirely, so role="list" puts them back; the numerals
                used to carry aria-hidden, which left a screen-reader user with
                an unnumbered, unannounced run of paragraphs sitting under copy
                that promises "Five things I check first". Every list on this
                page now announces itself and counts out loud. Do not re-hide
                the numerals. */}
            <ol className="eb-checks" role="list">
              {CHECKS.map((c) => (
                <li key={c.n} className="eb-check">
                  <span className="eb-check-n eb-mono">
                    {c.n}
                  </span>
                  <div className="eb-check-body">
                    <h3 className="eb-h3">{c.title}</h3>
                    <p className="eb-p">{c.body}</p>
                    <p className="eb-do eb-mono">{c.check}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <Rule />

        {/* ── 06 About the delivery apps ──────────────────────────────────
            The long argument runs on the dark spine, where prose is ~11:1.
            Only the arithmetic moves onto the wood field, in mono, big
            enough to be legible against it. The last line of the section —
            "before you believe anybody's math about your place. Mine
            included." — is the credibility anchor and it stays last. */}
        <section>
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.apps} />
            <h2 className="eb-d eb-h2">{HEADINGS.apps}</h2>
          </div>
          <Rule />
          <div className={`${SHELL} eb-sec--after-rule`}>
            <p className="eb-stand">{APPS_STAND}</p>
            {APPS_BEFORE.map((block) => (
              <div key={block.lead} className="eb-block">
                <h3 className="eb-h3">{block.lead}</h3>
                {block.paras.map((p) => (
                  <p key={p} className="eb-p">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* The wood band. Full bleed, hard edges, mono. */}
        <Rule />
        <section aria-label="Worked example" className="eb-g-wood">
          <div className={`${SHELL} eb-math`}>
            {/* No label, for the same contrast reason as the hero: 11px ink on
                wood is 4.24:1. The two rules that frame the band do the
                announcing instead. */}
            {APPS_MATH.map((p) => (
              <p key={p} className="eb-math-p">
                {p}
              </p>
            ))}
          </div>
        </section>
        <Rule />

        <section aria-label="More on the delivery apps">
          <div className={`${SHELL} eb-sec--after-rule`}>
            {APPS_AFTER.slice(0, -1).map((block) => (
              <div key={block.lead} className="eb-block">
                <h3 className="eb-h3">{block.lead}</h3>
                {block.paras.map((p) => (
                  <p key={p} className="eb-p">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {/* ⚠️ THE ONE SECTION THAT RUNS AS PROSE. No label, no heading, no
                numerals, no standfirst — see the note on APPS_TAIL. The lead
                is set as a lede paragraph rather than an h3 precisely so this
                passage reads as somebody talking instead of another labelled
                sub-block. Do not put a heading back on it. */}
            <div className="eb-block">
              <p className="eb-lede">{asSentence(APPS_TAIL.lead)}</p>
              {/* eb-mt carries the gap the h3 used to. No new CSS was added
                  for this block; it is built entirely from classes the page
                  already had. */}
              <div className="eb-mt">
                {APPS_TAIL.paras.map((p) => (
                  <p key={p} className="eb-p">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Rule />

        {/* ── 07 What I build — ledger rows, not cards ────────────────────── */}
        <section>
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.builds} />
            <h2 className="eb-d eb-h2">{HEADINGS.builds}</h2>
          </div>
          <Rule />
          <div className={`${SHELL} eb-sec--after-rule`}>
            <ul className="eb-builds" role="list">
              {BUILDS.map((item) => (
                <li
                  key={item.lead}
                  className={`eb-build${item.rest ? '' : ' eb-build--solo'}`}
                >
                  <span className="eb-build-lead">{item.lead}</span>
                  {/* The four-word row has no second half — that asymmetry is the
                      point, it stops six rows sharing one grammar. But on the
                      desktop two-column grid an absent second child leaves an
                      empty cell, and a fresh-eyes review read that as an
                      unfinished field rather than a short row. --solo makes the
                      lead span both columns, so the row is deliberately short
                      instead of apparently broken. */}
                  {item.rest && <span className="eb-build-rest">{item.rest}</span>}
                </li>
              ))}
            </ul>
            <p className="eb-lede eb-lede--strong eb-mt">{BUILD_TAIL.strong}</p>
            <p className="eb-p">{BUILD_TAIL.own}</p>
          </div>
        </section>
        <Rule />

        {/* ── 08 Work I have built — the bone field ───────────────────────
            Two real screenshots of two builds we own outright. Both are
            labelled as concepts in the copy above and below them, because
            they are: the businesses are not real. There is no third card and
            no placeholder — see the note on WORK.

            This section carries the page's one light FIELD, and it does two
            jobs at once. The screenshots are near-black captures; on the ink
            spine they were two dark rectangles with no edge, and on cream they
            read as objects. And the second half of the page needed it: from
            the wood band to the close, everything else is one unbroken ink
            ground for roughly 6,000px, which is half the scroll on one colour.
            Measured at 1440: without this field the ink runs unbroken from
            5,751px to 14,237px. The rich shift under section 12 is a 1.06:1
            move and does not register on a phone in daylight; this does. */}
        <section className="eb-g-bone">
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.work} />
            <h2 className="eb-d eb-h2">{WORK_COPY.h2}</h2>
            <p className="eb-stand eb-stand--flush">{WORK_COPY.p}</p>
            <ul className="eb-work">
              {DEMOS.map((demo, i) => (
                <li key={demo.href}>
                  <Link href={demo.href} className="eb-work-a">
                    {/* The span is the crop frame — see .eb-work-shot. `sizes`
                        is the frame width times the 208.7% magnification, not
                        the frame width, or the optimizer serves a source too
                        small for the crop and it comes out soft. */}
                    <span className="eb-work-shot">
                      <Image
                        src={WORK[i].src}
                        alt={WORK[i].alt}
                        width={1200}
                        height={800}
                        sizes="(min-width: 900px) 1140px, 210vw"
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

        {/* ── 09 How a stranger becomes a regular ─────────────────────────
            Four steps, then the two closing blocks. The ads paragraph is the
            most valuable thing on the site: it is set in the recessed rich
            block so it reads as a stated position rather than a footnote, and
            it is verbatim. Do not soften it, move it, or shorten it. */}
        <section>
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.funnel} />
            <h2 className="eb-d eb-h2">{HEADINGS.funnel}</h2>
          </div>
          <Rule />
          <div className={`${SHELL} eb-sec--after-rule`}>
            <p className="eb-stand">{FUNNEL_STAND}</p>
            <ol className="eb-checks" role="list">
              {FUNNEL.map((s) => (
                <li key={s.n} className="eb-check">
                  <span className="eb-check-n eb-mono">
                    {s.n}
                  </span>
                  <div className="eb-check-body">
                    <h3 className="eb-h3">{s.lead}</h3>
                    <p className="eb-p">{s.para}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="eb-block">
              <h3 className="eb-h3">{JARGON.lead}</h3>
              <p className="eb-p">{JARGON.para}</p>
            </div>

            <div className="eb-note">
              <LedgerHead label={ADS.label} heading />
              <p className="eb-note-p">{ADS.honesty}</p>
              <p className="eb-p">{ADS.why}</p>
              <p className="eb-p">
                <a href="#report" className="eb-inline-a">
                  {ADS.pointA}
                </a>{' '}
                {ADS.pointB}
              </p>
            </div>
          </div>
        </section>
        <Rule />

        {/* ── 10 Do not take my word for it ───────────────────────────────
            The demo line set as the biggest mono string on the page. Ember on
            ink at 40px+ is large-scale text, so the colour is legal here and
            it is the one place ember appears as type rather than as a field. */}
        <section>
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.proof} />
            <h2 className="eb-d eb-h2">{PROOF.h2}</h2>
            <p className="eb-stand eb-stand--flush">{PROOF.p}</p>
            {/* Reads "Call (276) 295-1209" — §2.7's button, line-broken so the
                number can be the largest mono string on the page. */}
            <a className="eb-tel" href={`tel:${DEMO_LINE}`}>
              <span className="eb-lab eb-tel-lab">{PROOF.verb}</span>
              <span className="eb-tel-n eb-mono">{DEMO_LINE_PRETTY}</span>
            </a>
          </div>
        </section>
        <Rule />

        {/* ── 11 What it costs — the ledger table ─────────────────────────
            Small mono label, a hairline to the page edge, then two columns
            divided by a vertical 1px rule. Pure type. Every figure comes from
            PRICES; there is no dollar string in this block. */}
        <section>
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.costs} />
            <h2 className="eb-d eb-h2">{HEADINGS.costs}</h2>
          </div>
          <Rule />
          <div className={SHELL}>
            <dl className="eb-ledger">
              {COSTS.map((row) => (
                <div key={row.label} className="eb-row">
                  <dt className="eb-row-l">
                    <span className="eb-lab eb-row-lab">{row.label}</span>
                    {row.amount && <span className="eb-row-amt eb-mono">{row.amount}</span>}
                  </dt>
                  <dd className="eb-row-r">{row.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <Rule />

        {/* ── How it works ────────────────────────────────────────────────
            Josh asked for "the systems i provide, how it works" and the page
            had only the first half: it said what he builds and why it matters
            and never said what happens between an owner saying yes and the
            site being live. That gap is the difference between a page that
            describes a service and one an owner can picture buying.

            It sits AFTER the prices on purpose. Step one is a payment, so it
            cannot be read before the number it refers to.

            Every step is a step in foundos-system-rulebook.md §6 — see the
            note on HOW. No standfirst here, deliberately: five sections above
            open label / heading / rule / dim standfirst / list, and this one
            drops straight into the steps. */}
        <section>
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.how} />
            <h2 className="eb-d eb-h2">{HOW.h2}</h2>
          </div>
          <Rule />
          <div className={`${SHELL} eb-sec--after-rule`}>
            <ol className="eb-checks" role="list">
              {HOW.steps.map((s) => (
                <li key={s.n} className="eb-check">
                  <span className="eb-check-n eb-mono">{s.n}</span>
                  <div className="eb-check-body">
                    <p className="eb-p">{s.para}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="eb-lede eb-lede--strong eb-mt">{HOW.deadline}</p>
            <p className="eb-p eb-mt">{HOW.late}</p>
          </div>
        </section>
        <Rule />

        {/* ── 12 One person. Not an agency. ───────────────────────────────
            NO PHOTO, AND THAT IS THE DECISION — not a gap waiting to be
            filled. A bordered grey box where a face obviously belongs reads
            as "the shoot isn't back", and it re-reads every other restrained
            thing on the page as unfinished. Neither photo in public/ is
            usable. The paragraphs carry it, and they can.

            The ground shifts to the warm near-black here — the only place
            rich is used as a field. Do not mistake it for navigation: #231f20
            on #1a1a1a is 1.06:1, which is a warmth you can measure and cannot
            see on a phone in daylight. The chapter break in the second half is
            the bone field at section 08; this is a two-percent grace note
            sitting on top of it, and the rules above and below do the dividing. */}
        <section className="eb-g-rich">
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={LABELS.about} />
            <h2 className="eb-d eb-h2">{HEADINGS.about}</h2>
            <div className="eb-about">
              {ABOUT.map((p) => (
                <p key={p} className="eb-p eb-p--wide">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
        <Rule />

        {/* ── 13 Final call — ember again, closing the bookend ────────────
            Ember appears exactly twice on the page: the hero and here. The
            line is display type, so ink on ember is legal; both buttons are
            solid slabs for the same reason — a 13px outlined label on ember
            would not clear 4.5:1. */}
        <section className="eb-g-ember">
          <div className={`${SHELL} eb-close`}>
            <p className="eb-d eb-h2 eb-close-h">{CLOSE}</p>
            <Rule bleed />
            <div className="eb-btns">
              <a className="eb-btn eb-btn--a" href={`sms:${PHONE}`}>
                {NAV.text} — {PHONE_PRETTY}
              </a>
              <a className="eb-btn eb-btn--b" href={CAL} target="_blank" rel="noreferrer">
                {NAV.book}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────
          One row, wrapping cleanly at 360px. Each separator is bound to the
          item that FOLLOWS it, inside the same flex child, so a dot can never
          be left dangling at the end of a wrapped line. */}
      <footer>
        <Rule />
        <div className={`${SHELL} eb-foot`}>
          <Wordmark px={16} />
          <span className="eb-foot-i">
            <span aria-hidden="true">·</span>
            <a href={`mailto:${EMAIL}`} className="eb-foot-a">
              {EMAIL}
            </a>
          </span>
          <span className="eb-foot-i">
            <span aria-hidden="true">·</span>
            <span>
              {LOCATION.city}, {LOCATION.region}
            </span>
          </span>
          <span className="eb-foot-i">
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="eb-foot-a">
              Privacy
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ── the stylesheet ───────────────────────────────────────────────────────
   Scoped to `.eb`. No backticks anywhere in here — the whole thing is a
   template literal. Read the file header before changing a value; most of
   these numbers were chosen against a measurement, not a preference. */
const CSS = `
.eb{
  /* the five values, and nothing else is ever written as a hex below */
  --ink:#1a1a1a; --ember:#d94f2b; --bone:#f0e7d4; --wood:#b76745; --rich:#231f20;

  /* NOT a sixth palette value — this is the logo. brand.ts defines the dot as
     a #1D9E75 circle, it is on foundos.ai and on the business cards already in
     circulation, and the mark is not the page's to redraw. It appears exactly
     once per view, on the ink spine, and nothing else on the page is green.
     Radius zero is a rule about the layout; it does not reach the wordmark. */
  --dot:#1D9E75;

  --f-display:var(--font-eb-display),var(--font-inter),ui-sans-serif,system-ui,sans-serif;
  --f-body:var(--font-eb-body),var(--font-inter),ui-sans-serif,system-ui,sans-serif;
  --f-mono:var(--font-eb-mono),ui-monospace,SFMono-Regular,Menlo,monospace;

  /* ── THE TYPE SCALE: SIX STEPS, DECLARED ONCE ─────────────────────────
     Every font-size below is one of these tokens or one of the three display
     clamps. Nothing sets a raw px size, which is the only way a scale claim
     stays true — an earlier version of this file claimed four sizes while
     shipping seventeen, because each component stepped itself at its own
     breakpoint. If you need a size that isn't here, change a token; do not
     add a seventh. The step is at 640px for all six at once. */
  --t-label:11px;  /* mono, uppercase, tracked: the ledger heads and Open →   */
  --t-fine:13px;   /* mono asides: Check it, buttons, the fine print          */
  --t-body:17px;   /* everything that is a sentence, h3s included             */
  --t-lede:19px;   /* standfirsts, the arithmetic, the ads note               */
  --t-lead:21px;   /* the hero subhead and the two section ledes              */
  --t-num:26px;    /* the wood numerals and the ledger amounts                */

  /* per-ground roles. Every ground class below re-points these. */
  --fg:color-mix(in srgb, var(--bone) 88%, var(--ink));
  --dim:color-mix(in srgb, var(--bone) 58%, var(--ink));
  /* emphasis text: bold leads, amounts, h3s. It is a ROLE, not a colour —
     hard-coding var(--bone) here is what made a light ground impossible. */
  --strong:var(--bone);
  --rule:var(--bone);
  --rule-soft:color-mix(in srgb, var(--bone) 26%, var(--ink));
  --btn-a-bg:var(--bone); --btn-a-fg:var(--ink);
  --btn-b-bg:transparent; --btn-b-fg:var(--bone); --btn-b-bd:var(--bone);

  /* the six globals.css @theme tokens, re-pointed for the dark spine. This is
     what makes the unlayered :focus-visible ring in globals.css come out bone
     instead of an invisible black. Do not replace it with a hand-written ring. */
  --color-paper:var(--ink);
  --color-ink:var(--bone);
  --color-muted:color-mix(in srgb, var(--bone) 58%, var(--ink));
  --color-hairline:color-mix(in srgb, var(--bone) 26%, var(--ink));
  --color-surface:var(--rich);
  --color-dot:var(--dot);

  background:var(--ink);
  color:var(--bone);
  font-family:var(--f-body);
  -webkit-font-smoothing:antialiased;
}
/* The one breakpoint the scale steps at. Six values move together, so the
   page cannot drift into having a tablet size that exists nowhere else. */
@media (min-width:640px){
  .eb{--t-fine:14px; --t-body:18px; --t-lede:21px; --t-lead:26px; --t-num:32px;}
}
/* Clip on main, not on the root: overflow on an ancestor of the sticky header
   would give it a scroll container and it would stop sticking. */
.eb main{overflow-x:clip;}

/* ---- grounds ------------------------------------------------------------ */
.eb-g-rich{background:var(--rich);}
/* The one light FIELD (as opposed to the cream card in 04, which is a bordered
   panel inside the shell). It carries §08, where two dark screenshots need a
   ground to sit against, and it is the break in the second half's rhythm: the
   run of unbroken ink from the wood band to the close is otherwise about
   6,000px, half the page on one colour. Roles are the cream card's, because
   the constraint is the same one — ink prose on bone, never the reverse.
   Measured at 1440: it cuts the longest single-ground run from 8,486px to
   5,132px of a 15,271px page. */
.eb-g-bone{
  background:var(--bone);
  color:var(--rich);
  --fg:color-mix(in srgb, var(--rich) 92%, var(--bone));
  --dim:color-mix(in srgb, var(--rich) 66%, var(--bone));
  --strong:var(--rich);
  --rule:var(--rich);
  --rule-soft:color-mix(in srgb, var(--rich) 24%, var(--bone));
  --btn-a-bg:var(--rich); --btn-a-fg:var(--bone);
  --btn-b-bg:transparent; --btn-b-fg:var(--rich); --btn-b-bd:var(--rich);
  --color-ink:var(--rich);
  --color-paper:var(--bone);
}
.eb-g-ember{
  background:var(--ember);
  color:var(--ink);
  --fg:var(--ink);
  --dim:var(--ink);
  --strong:var(--ink);
  --rule:var(--ink);
  --rule-soft:color-mix(in srgb, var(--ink) 40%, var(--ember));
  /* ember is 4.24:1 against ink and 3.35:1 against bone, so both buttons are
     solid slabs — a 13px outlined label here would not clear 4.5:1. */
  --btn-a-bg:var(--ink); --btn-a-fg:var(--bone);
  --btn-b-bg:var(--bone); --btn-b-fg:var(--ink); --btn-b-bd:var(--bone);
  /* the ring: bone clears 3:1 against both the ember field and the ink slab */
  --color-ink:var(--bone);
  --color-paper:var(--ember);
}
.eb-g-wood{
  background:var(--wood);
  color:var(--ink);
  --fg:var(--ink);
  --dim:var(--ink);
  --strong:var(--ink);
  --rule:var(--ink);
  --color-ink:var(--ink);
}

/* ---- the two voices ----------------------------------------------------- */
.eb-d{
  font-family:var(--f-display);
  font-weight:700;
  font-stretch:86%;
  line-height:.85;
  letter-spacing:-.035em;
}
.eb-h1{font-size:clamp(2.75rem,10.6vw,8rem);}
.eb-h2{font-size:clamp(1.625rem,5.4vw,2.75rem);line-height:.88;letter-spacing:-.03em;}
.eb-lab{
  font-family:var(--f-mono);
  font-size:var(--t-label);
  font-weight:500;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:var(--dim);
}
.eb-mono{font-family:var(--f-mono);}

/* Body copy and the only sub-heading style. There is no mid-size heading on
   this page and adding one undoes device 5 — see the file header. */
.eb-p{font-size:var(--t-body);line-height:1.62;color:var(--fg);max-width:64ch;}
/* The adjacency has to name the lede as well. In the build tail a paragraph
   follows .eb-lede--strong, so .eb-p + .eb-p never matched and the two sat at
   a measured 0px apart, reading as one wrapped block. */
:is(.eb-p,.eb-lede)+.eb-p{margin-top:14px;}
.eb-lede+.eb-p{margin-top:18px;}
.eb-p--wide{max-width:70ch;}
.eb-h3{font-size:var(--t-body);line-height:1.5;font-weight:700;color:var(--strong);margin-bottom:10px;max-width:62ch;}
.eb-lede{font-size:var(--t-lead);line-height:1.45;color:var(--fg);max-width:52ch;}
.eb-lede--strong{margin-top:22px;font-weight:700;color:var(--strong);}
.eb-stand{font-size:var(--t-lede);line-height:1.5;color:var(--dim);max-width:60ch;margin-bottom:44px;}
/* The flush variant is the one used where no full-bleed rule separates the h2
   from its standfirst (08 and 10). Without a top margin the two sat 0px apart
   — .eb-h2 has no margin-bottom, by design, because everywhere else a rule and
   64px of section padding do the separating. */
.eb-stand--flush{margin-top:26px;margin-bottom:32px;}
.eb-fine{margin-top:18px;font-size:var(--t-fine);line-height:1.6;color:var(--dim);}
.eb-mt{margin-top:36px;}
@media (min-width:640px){
  .eb-stand--flush{margin-top:34px;}
}

/* ---- rules -------------------------------------------------------------- */
.eb-rule{height:1px;width:100%;background:var(--rule);}
.eb-rule--soft{background:var(--rule-soft);}
/* the inset variant is for rules inside a padded box; it stops at the box */
.eb-rule--inset{margin:22px 0;}
/* For a rule that has to sit inside the 1200px shell — under the hero
   headline, above the closing buttons. calc(50% - 50vw) is measured off the
   shell's own content box, so the line lands exactly on the viewport edge at
   every width instead of stopping at the column like the text does. On a
   desktop with a visible scrollbar 100vw overshoots the layout viewport by the
   scrollbar's width, which is the literal over-bleed the reference measured
   (1585px of rule inside a 1502px viewport) — and the overflow-x:clip on main
   means it costs no horizontal scroll. Verified at 390 and 1440.
   (Backticks would end this whole stylesheet. There are none in here.) */
.eb-rule--bleed{width:auto;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);}

/* The default is the SHELL case, and it has to be the default: this device is
   described three inches above as a hairline that "runs from the end of the
   label out to the screen edge", and it did not. -40px assumes the shell
   gutter IS the screen edge, which is only true below about 1280px. Measured
   at 1440 the line stopped at 1312 while every section rule ran the full
   width, and the shortfall grows with the window — 360px short at 1920.
   calc(50% - 50vw) is measured off the column's own content box, the same
   arithmetic as .eb-rule--bleed, with the same over-bleed by the scrollbar
   width that main's overflow-x:clip absorbs. */
.eb-lh{display:flex;align-items:center;gap:14px;margin-bottom:20px;
  margin-right:calc(50% - 50vw);}
.eb-lh-line{flex:1 1 auto;height:1px;background:var(--rule);}
/* The two BOUNDED instances, named rather than inferred. Inside a padded panel
   the hairline should stop at the panel, so the negative margin equals that
   panel's own padding — 20px, 40px from 640 up, which is what both of them
   use. A new ledger head anywhere else inherits the shell behaviour, which is
   the right default; this list is the exception, and it is two long. */
.eb-pad-in>.eb-lh,.eb-note>.eb-lh{margin-right:-20px;}
@media (min-width:640px){.eb-pad-in>.eb-lh,.eb-note>.eb-lh{margin-right:-40px;}}

/* ---- shell rhythm ------------------------------------------------------- */
.eb-sec{padding-top:64px;padding-bottom:64px;}
.eb-sec--tight{padding-top:56px;padding-bottom:56px;}
.eb-sec--after-rule{padding-top:44px;padding-bottom:72px;}
@media (min-width:640px){
  .eb-sec{padding-top:96px;padding-bottom:96px;}
  .eb-sec--tight{padding-top:80px;padding-bottom:80px;}
  .eb-sec--after-rule{padding-top:64px;padding-bottom:112px;}
}

/* ---- header ------------------------------------------------------------- */
.eb-head{position:sticky;top:0;z-index:50;background:var(--ink);}
.eb-head-row{display:flex;align-items:center;justify-content:space-between;height:64px;}
.eb-head-mark{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;}
.eb-mark{display:inline-flex;align-items:baseline;font-family:var(--f-display);font-weight:700;
  font-stretch:86%;letter-spacing:-.03em;color:var(--bone);}
/* The one radius and the one green on the page, and both are correct. This is
   the mark from brand.ts — a circle, #1D9E75 — the same one on foundos.ai and
   on the cards already handed out. A square ember dot is a different logo. It
   sits on the ink spine in the header and the footer, never on ember, so the
   green has room and clashes with nothing. */
.eb-dot{display:inline-block;flex:0 0 auto;border-radius:50%;background:var(--dot);}
.eb-nav{display:flex;align-items:center;gap:22px;}
.eb-nav-a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;color:var(--dim);}
.eb-nav-a:hover{color:var(--bone);}
.eb-nav-a--wide{display:none;}
@media (min-width:640px){.eb-nav-a--wide{display:inline-flex;}}

/* ---- hero --------------------------------------------------------------- */
.eb-hero{padding-top:56px;padding-bottom:56px;}
.eb-hero-h{color:var(--bone);margin-bottom:28px;}
.eb-hero-sub{margin-top:28px;font-size:var(--t-lead);line-height:1.35;font-weight:700;color:var(--ink);}
@media (min-width:640px){
  .eb-hero{padding-top:88px;padding-bottom:88px;}
}

/* ---- buttons ------------------------------------------------------------ */
.eb-btns{display:flex;flex-direction:column;gap:12px;margin-top:34px;align-items:stretch;}
@media (min-width:560px){.eb-btns{flex-direction:row;align-items:flex-start;}}
.eb-btn{
  display:inline-flex;align-items:center;justify-content:center;
  min-height:54px;padding:0 22px;border-radius:0;border:1px solid transparent;
  font-family:var(--f-mono);font-size:var(--t-fine);font-weight:600;letter-spacing:.06em;
  text-transform:uppercase;text-decoration:none;text-align:center;cursor:pointer;
}
.eb-btn--a{background:var(--btn-a-bg);color:var(--btn-a-fg);border-color:var(--btn-a-bg);}
.eb-btn--b{background:var(--btn-b-bg);color:var(--btn-b-fg);border-color:var(--btn-b-bd);}
/* Hover swaps the two treatments. A flat swap keeps every state above 4.5:1,
   which an opacity or tint hover would not. */
.eb-btn--a:hover{background:var(--btn-b-bg);color:var(--btn-b-fg);border-color:var(--btn-b-bd);}
.eb-btn--b:hover{background:var(--btn-a-bg);color:var(--btn-a-fg);border-color:var(--btn-a-bg);}
/* One exception to "the ground decides the ring". On ember the ring is bone,
   which is right for the ink-filled button but puts a bone ring around a
   bone-filled one — readable only through the 2px offset gap. Ink clears 3:1
   against both the bone slab (13.9) and the ember field (4.24), so this one
   button gets it. Verified by tabbing the page, not by eye. */
.eb-g-ember .eb-btn--b:focus-visible{outline-color:var(--ink);}
@media (prefers-reduced-motion:no-preference){
  .eb-btn,.eb-nav-a,.eb-work-a,.eb-tel{transition:background-color .15s linear,color .15s linear,border-color .15s linear;}
}

/* ---- the cream order pad ------------------------------------------------ */
.eb-report-anchor{scroll-margin-top:64px;}
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
.eb-pad-widget{margin-top:28px;}

/* Reaching inside <InstantReport />. Its own selectors top out at (0,1,1), so
   (0,2,0) wins on specificity and no !important is needed. */
.eb-pad .ir *{border-radius:0;}
.eb-pad .ir :is(.ir-tick,.ir-spin){border-radius:50%;}
.eb-pad .ir-input{background:transparent;}
.eb-pad .ir-label{font-family:var(--f-mono);font-size:var(--t-label);letter-spacing:.06em;text-transform:uppercase;}
.eb-pad .ir-go,.eb-pad .ir-alt{font-family:var(--f-mono);font-size:var(--t-fine);letter-spacing:.04em;}
/* size only, not family: .ir-fine was the last string on the page rendering
   at a size the scale does not own. */
.eb-pad .ir-fine{font-size:var(--t-fine);}
.eb-pad .ir-head h2,.eb-pad .ir-sec h3,.eb-pad .ir-cta-h{font-family:var(--f-display);font-stretch:86%;}

/* ---- five checks / four steps ------------------------------------------- */
.eb-checks{list-style:none;margin:0;padding:0;}
.eb-check{display:flex;gap:18px;padding:30px 0;border-top:1px solid var(--rule-soft);}
.eb-check:first-child{border-top:0;padding-top:0;}
.eb-check-n{flex:0 0 auto;width:2.4ch;font-size:var(--t-num);font-weight:700;line-height:1;color:var(--wood);
  letter-spacing:-.02em;}
.eb-check-body{min-width:0;}
.eb-do{margin-top:14px;font-size:var(--t-fine);line-height:1.6;color:var(--strong);max-width:62ch;}
@media (min-width:640px){
  .eb-check{gap:32px;padding:38px 0;}
}

/* ---- prose blocks ------------------------------------------------------- */
.eb-block{padding-top:34px;}
.eb-block:first-child{padding-top:0;}
@media (min-width:640px){.eb-block{padding-top:46px;}}

/* The one recessed block on the page. Flat stacking, no shadow, no blur. */
.eb-note{margin-top:44px;padding:30px 20px;background:var(--rich);border:1px solid var(--rule-soft);}
.eb-note-p{font-size:var(--t-lede);line-height:1.5;font-weight:700;color:var(--strong);max-width:56ch;
  margin-bottom:18px;}
@media (min-width:640px){
  .eb-note{padding:40px;}
}
.eb-g-rich .eb-note{background:var(--ink);}
.eb-inline-a{color:inherit;text-decoration:underline;text-underline-offset:3px;
  text-decoration-thickness:1px;}
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
  .eb-math{padding-top:80px;padding-bottom:80px;}
}

/* ---- what I build ------------------------------------------------------- */
.eb-builds{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);}
.eb-build{display:block;padding:20px 0;border-bottom:1px solid var(--rule-soft);max-width:72ch;}
.eb-build-lead{display:block;font-size:var(--t-body);font-weight:700;line-height:1.35;color:var(--strong);}
.eb-build-rest{display:block;margin-top:5px;font-size:var(--t-body);line-height:1.55;color:var(--fg);}
@media (min-width:640px){
  .eb-build--solo{display:block;}
  .eb-build{display:grid;grid-template-columns:minmax(0,15rem) minmax(0,1fr);gap:28px;
    align-items:baseline;padding:22px 0;max-width:none;}
  .eb-build-rest{margin-top:0;max-width:52ch;}
}

/* ---- work --------------------------------------------------------------- */
.eb-work{list-style:none;margin:0;padding:0;display:grid;gap:24px;}
@media (min-width:900px){.eb-work{grid-template-columns:1fr 1fr;gap:32px;}}
.eb-work-a{display:block;text-decoration:none;color:inherit;border:1px solid var(--rule-soft);}
.eb-work-a:hover{border-color:var(--rule);}
/* THE CROP, AND WHY THERE IS ONE.
   public/work/*.png are 1200x800@2x captures of a whole page. Shown entire at
   a 544px card they render at 0.23 scale, which put the demo's own body copy
   at four or five pixels: two dark rectangles, on the one section whose job is
   "open something I've built". They are the only two images we are allowed to
   use, so the fix is magnification, not replacement.
   The window is x 0-1150, y 500-1280 of the 2400x1600 capture — the business
   name, the strapline and the today card, with the browser-chrome strip and
   the empty right third dropped. Both captures share a layout, so one window
   serves both. The arithmetic: the image is laid at 2400/1150 = 208.7% of the
   frame, so 1150 source px span the frame exactly; the top offset is
   500/1150 = 43.48% of the frame width, because a percentage margin resolves
   against the containing block's INLINE size; and the frame's ratio is
   1150/780. Effective scale is 0.30 at 390 and 0.47 at 1440 — 2.1x and 2.0x
   what shipped, which is the difference between a texture and a screenshot you
   can read. Re-crop by changing these three numbers together. */
.eb-work-shot{display:block;overflow:hidden;aspect-ratio:1150/780;border:1px solid var(--rule);}
.eb-work-img{display:block;width:208.7%;max-width:none;height:auto;margin-top:-43.48%;}
.eb-work-meta{display:block;padding:20px;}
.eb-work-t{display:block;font-size:var(--t-body);font-weight:700;color:var(--strong);}
.eb-work-n{display:block;margin-top:6px;font-size:var(--t-body);line-height:1.5;color:var(--fg);}
.eb-work-go{display:block;margin-top:16px;color:var(--strong);}

/* ---- the demo line ------------------------------------------------------ */
.eb-tel{display:inline-flex;flex-direction:column;gap:10px;margin-top:36px;padding:24px 26px;
  min-height:54px;text-decoration:none;border:1px solid var(--rule);color:inherit;}
.eb-tel:hover{background:var(--rich);border-color:var(--strong);}
.eb-tel-lab{color:var(--dim);}
/* ember as type rather than as a field — legal because this is 40px+ */
.eb-tel-n{font-size:clamp(2rem,8vw,3.25rem);font-weight:700;line-height:1;letter-spacing:-.03em;
  color:var(--ember);}

/* ---- the ledger table --------------------------------------------------- */
.eb-ledger{margin:0;border-top:1px solid var(--rule);}
.eb-row{padding:26px 0;border-bottom:1px solid var(--rule-soft);}
.eb-row-l{margin:0;}
/* 1.55 rather than the default ~1.2 because the third label runs to two lines
   in some column widths, and 11px uppercase set solid is the least legible
   string on the page. balance splits it near the middle instead of leaving a
   two-word widow. */
.eb-row-lab{display:block;line-height:1.55;text-wrap:balance;color:var(--dim);}
.eb-row-amt{display:block;margin-top:8px;font-size:var(--t-num);font-weight:700;line-height:1.1;
  letter-spacing:-.02em;color:var(--strong);}
.eb-row-r{margin:14px 0 0;font-size:var(--t-body);line-height:1.6;color:var(--fg);max-width:52ch;}
/* THE TRACK IS 24rem, AND IT IS MEASURED, NOT CHOSEN.
   Chivo Mono advances 0.58em per character. The longest amount is
   "from $150 a month." — 18 characters, so 18 x 0.58 x 32px = 334px of type.
   The old 20rem track less 32px of padding left 288px, so the line wrapped and
   orphaned "month." on a second line. 24rem less the same padding is 352px,
   which clears it by 18px and also pulls the third row's 45-character label
   (317px at 11px tracked) back onto one line.
   The two columns now start at 900px rather than 768px for the same reason:
   at 768 a 384px left track leaves the body column 272px, which is too narrow
   to set 18px prose in. Below 900 the row stacks, which it already did. */
@media (min-width:900px){
  .eb-row{display:grid;grid-template-columns:minmax(0,24rem) minmax(0,1fr);gap:0;padding:30px 0;}
  /* the vertical 1px rule that divides the two columns */
  .eb-row-r{margin:0;padding-left:32px;border-left:1px solid var(--rule-soft);}
  .eb-row-l{padding-right:32px;}
}

/* ---- about -------------------------------------------------------------- */
.eb-about{margin-top:34px;display:flex;flex-direction:column;gap:18px;}

/* ---- close -------------------------------------------------------------- */
.eb-close{padding-top:64px;padding-bottom:64px;}
.eb-close-h{color:var(--ink);margin-bottom:28px;max-width:20ch;}
@media (min-width:640px){.eb-close{padding-top:96px;padding-bottom:96px;}}

/* ---- footer ------------------------------------------------------------- */
.eb-foot{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;padding-top:26px;
  padding-bottom:26px;font-size:var(--t-fine);line-height:1.6;color:var(--dim);}
.eb-foot-i{display:inline-flex;align-items:center;gap:12px;}
.eb-foot-a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;color:inherit;}
.eb-foot-a:hover{color:var(--bone);}
`;
