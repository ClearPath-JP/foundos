import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Archivo, Chivo, Chivo_Mono } from 'next/font/google';

import MarkReveal from '@/components/MarkReveal';
import { PresenceDot, PresenceNote } from '@/components/Presence';
import type { PresenceCopy } from '@/components/Presence';
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
 *     together at 640px, plus FOUR display clamps: h1, the hero subhead, h2,
 *     and the demo number. The subhead's clamp is the newest and it was added
 *     against this rule on purpose, not in spite of it — the hero hierarchy was
 *     inverted, with the generic line at 128px and the line that sells at 24px
 *     underneath, and no token in the scale reaches the size the fix needed.
 *     Four is still checkable. Five would want the same argument made again.
 *     Nothing in the stylesheet sets a raw px font-size. Change a token; do not
 *     add a seventh step.
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
 *     guessed. Re-measured 2026-09-04 after the vertical rhythm was cut by
 *     about a third: 13,702px at 1440 (was 15,271) and 18,386px at 390 (was
 *     18,401). An earlier version of this comment said "~7,000px", which was
 *     out by half a page and made four field changes sound like plenty. They
 *     are not: the fields have to do the chapter work over that distance.
 *     There are five of them, and the gaps between them matter more than the
 *     count. The bone field at section 08 is there because without it the ink
 *     runs unbroken from the end of the wood band to the rich shift for more
 *     than half the page on one colour. With it the longest single-ground run
 *     is 4,673px at 1440 and 6,945px at 390 — the phone is still the harder
 *     case, and it is worth knowing that the phone page is nearly all copy: at
 *     390 the document height is set by the word count, not by the padding, so
 *     there is no more air in it to take out.
 *     `.eb-g-rich` under "One person." is a sixth, near-black shift, but be
 *     honest about what it is worth: #231f20 on #1a1a1a is 1.06:1 and
 *     invisible on a phone in daylight. It is warmth, not navigation, and it
 *     is not load-bearing.
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
 * The one thing that sits on wood is the worked arithmetic — the four-row
 * ledger at 19-21px/700 and 26-32px/700, and the paragraphs under it at
 * 19-21px/700 — all of which is WCAG large-scale text, where the bar is 3:1
 * and 4.24 clears it. If someone later drops a 17px paragraph onto ember or
 * wood, it is a real accessibility regression, not a style note. The hero
 * subhead is the same constraint: ink on ember, floored at 22px and bold.
 *
 * ── COPY ──────────────────────────────────────────────────────────────────
 *
 * Every word comes from src/app/page.tsx or docs/site-content-2026-09-03.md,
 * with three exceptions recorded below. Where a paragraph is split (the "Check
 * it:" line, the "$18 plate" arithmetic), the split is formatting: the
 * characters either side are untouched.
 *
 * THE THIRD EXCEPTION — two new blocks, 2026-09-04, both written for this file.
 *
 *   • WAIT, the coda on §05. The page named the pain in five checks and never
 *     named the cost of leaving it, so a reader could agree with all five and
 *     still have no reason to act this month. ⚠️ It contains no statistic, and
 *     it may never contain one: every consequence in it is a restatement of one
 *     the five checks have already argued, with no multiplier attached. The
 *     full constraint, including the paragraph that keeps it from becoming
 *     fear-selling, is on the constant.
 *   • The truck-location row in BUILDS. ⚠️ It describes something that already
 *     runs — the SPOTS picker in /demo/truckos, which a visitor can open from
 *     §08 — and it is written to what that code actually does, not to what the
 *     feature could be. It was NOT added to HOW: every step there is a step in
 *     foundos-system-rulebook.md §6 and the runbook has no location step, so
 *     putting one in would have broken the rule that section is built on.
 *
 * THE SECOND EXCEPTION — the grammar pass on §BUILDS, 2026-09-04. Four of the
 * six "systems I provide" rows were re-set as complete sentences and the fifth
 * was given a description it did not have. This was a layout bug reported as a
 * copy problem: the rows render as two columns on desktop, and a lower-case
 * fragment sitting alone in the right column reads as text that broke rather
 * than as a continuation of the bold label opposite it. The full reasoning is
 * on the constant. Nothing was invented — row five is assembled from HOW step
 * 04 and CHECKS 02, both of which are Josh's. The four ledger labels above the
 * wood band (APPS_FIGURES) are the only other new strings on the page, and
 * they are labels on numbers he already wrote, not claims.
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

/*
 * No `metadata` export here on purpose. The homepage inherits title, description
 * and OpenGraph from src/app/layout.tsx, which is the single place those strings
 * live so they cannot drift from the hero. This file carried a
 * `robots: { index: false }` while it was an exploration at /explore/ember —
 * that is gone, because this page is now the site.
 */

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

/**
 * The one column. Rules are allowed outside it; nothing else is.
 *
 * ⚠️ 1080, not 1200, and the 120px came off for a measured reason. At 1440 a
 * 1200 shell gave a 1140px content box holding a 720px measure, so 37% of every
 * band was empty and the eyebrow hairline ran 420px past the last word it had
 * anything to do with — a rule pointing at nothing, in an audit's words, and
 * worse at 1920. 1080 puts the measure at 72% of the column instead of 63%.
 * The other half of that fix is in .eb-lh, which now stops at the text column
 * rather than at the screen edge. The full-bleed section dividers stay full
 * bleed: those separate bands, and a divider that stops mid-page reads as a
 * broken rule rather than a considered one.
 */
const SHELL = 'mx-auto w-full max-w-[1080px] px-5 sm:px-10';

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
 * The presence line beside the header CTA — the only copy on this page that is
 * not a fixed string, and the only new copy this change introduces.
 *
 * ⚠️ IT EXISTS BECAUSE A BLINKING DOT ON ITS OWN IS DECORATION. The green
 * circle after the wordmark has been on foundos.ai and on the printed cards
 * since brand.ts was written, where its stated meaning is "running" — the
 * visual version of "I run it every week". A dot that pulses and says nothing
 * is just a pulsing dot; the same dot with four words beside it is a reader
 * finding out that the person who wrote all this is awake right now. That is
 * the difference between a decoration and a reason to text, and it is why the
 * line may not be dropped to "save space in the header". If it ever has to go
 * somewhere else, it goes WITH the dot, not instead of it.
 *
 * Both `sr` sentences are what a screen reader actually hears, so they say the
 * window in words rather than leaving a colour to carry it. "You text me, I
 * answer" is lifted from ABOUT — the same promise, not a new one.
 *
 * The 9-to-9 window and the America/New_York clock live in
 * components/Presence.tsx. Nothing here claims he is at a desk; it claims what
 * time it is where he is, which is the only part a page can know.
 */
const PRESENCE: PresenceCopy = {
  around: {
    note: 'Around now',
    sr: 'It is between 9am and 9pm in Atlanta right now. You text me, I answer.',
  },
  away: {
    note: 'Back in the morning',
    sr: 'It is outside 9am to 9pm in Atlanta right now. Text me anyway — I answer in the morning.',
  },
};

/**
 * §2.5 of page.tsx. Bold lead-in, plain sentence, no icons.
 *
 * ⚠️ ONE GRAMMAR, SIX LENGTHS. This is the second attempt at the anti-template
 * problem and the first one broke the block. The original six rows shared one
 * grammar and one length; the fix for that was to vary the GRAMMAR — three rows
 * finished the bold lead as a lower-case fragment, one row carried no second
 * half at all. On a phone that reads as prose and it worked. On the desktop
 * two-column grid it does not: the lead and the rest are two visually separate
 * columns with 28px between them, so "Bookings customers make themselves" sat
 * in one column and "at midnight, straight into your calendar." in the other,
 * and a fragment starting lower-case in its own column reads as broken text
 * rather than as a continuation. The empty row was worse — a blank right column
 * next to a four-word label reads as a field that failed to render.
 *
 * So: every row is now a noun phrase in the left column and one or two COMPLETE
 * sentences in the right, and the anti-template job is carried entirely by
 * length — 9 words on row two, 30 on row one, and the rest spread between. A
 * future edit that evens the lengths out puts the tell back. A future edit that
 * returns to mixed grammar puts the bug back.
 *
 * Row five used to be the empty one. Its description is assembled from what
 * Josh already says elsewhere on this page — HOW step 04 names the four things
 * he fixes on the listing, and CHECKS 02 is where "somebody searching at 9pm"
 * comes from — so it is his sentence, not a new claim.
 */
const BUILDS = [
  {
    lead: 'A website that takes the order',
    rest: 'Ordering and payment on your own site, at your own prices, so the money lands in your account instead of a cut of every ticket going to the app.',
  },
  {
    /** The short row. It carries the rhythm the empty row used to. */
    lead: 'Bookings customers make themselves',
    rest: 'They book at midnight and it lands straight in your calendar.',
  },
  {
    /**
     * ⚠️ THIS ROW IS A TRUE CLAIM, NOT A ROADMAP ITEM, AND THAT IS WHY IT IS
     * ALLOWED TO BE HERE. It is built and a visitor can go and use it: the
     * truck concept at /demo/truckos has SPOTS — four saved pitches, each with
     * a name, a street address and a window. The staff screen asks "Where are
     * you today?", the owner taps one, and the customer view's "Today · we're
     * parked at" block changes to that name, that address and that window with
     * a directions button under it. A second control on the same screen cycles
     * each day of the week through the same saved spots, and that is the "Where
     * we'll be this week" list the customer sees. Nothing here describes
     * anything the demo does not already do.
     *
     * The sentence covers the three cases Josh named — a truck that parks in
     * one place, one that rotates a few regulars, one that moves constantly —
     * because the same control serves all three: a truck with one spot taps the
     * same tile every morning.
     *
     * Placed third rather than appended so the length rhythm holds. Counted off
     * the rendered DOM, the seven descriptions now run 29 / 11 / 29 / 20 / 20 /
     * 26 / 15 words: this row ties the longest, so it goes where the shortest
     * row separates the two of them. Appending it would have put 26 and 29 side
     * by side at the bottom of the list. See the note above on why evening the
     * lengths out puts the template tell back.
     */
    lead: 'Where your truck is parked today',
    rest: 'Park in one spot, rotate a few, or move every day. You tap it on your phone and the site follows — today, and the rest of the week.',
  },
  {
    lead: 'An AI that answers every call',
    rest: 'It takes the order and books the table or the catering date. A ringing phone stops being a lost customer.',
  },
  {
    lead: 'Reviews asked for automatically',
    rest: 'The ask goes out on its own, and the regulars who drifted away get a text that brings them back.',
  },
  {
    lead: 'Your Google listing, fixed',
    rest: 'Hours, photos, categories and the link back to your site, all correct, so you come up for somebody two miles away searching at nine at night.',
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

/**
 * THE COST OF DOING NOTHING — the beat the page was missing.
 *
 * It named the pain in five checks and then went straight to the delivery
 * apps, so a reader could finish §05 agreeing that all five things were true
 * about his place and still have no reason to do anything about it this month.
 *
 * ⚠️ NOT ONE INVENTED NUMBER, AND THAT IS THE WHOLE CONSTRAINT. There is no
 * "restaurants lose 30% of…" here and there must never be one. The page's
 * credibility rests on the fact that every figure on it is checkable — §06
 * ends by telling the owner to go find his own commission rate "before you
 * believe anybody's math about your place. Mine included." A fabricated
 * multiplier in this block would spend that, four screens before it is earned.
 *
 * So every clause in `paras[1]` is a restatement of a consequence the page has
 * ALREADY argued directly above it, with no multiplier attached:
 *   • the locked door is check 02 ("finds the lights off")
 *   • the dishes not coming up is check 01 ("don't come up when somebody
 *     searches for them by name")
 *   • the number the app has and you don't is check 04 ("The app knows who
 *     ordered and how to reach them. You don't.")
 * The only new idea is the FRAME: these are not events, they are a rate. That
 * is an argument, not a statistic, and a reader can check it himself.
 *
 * ⚠️ `paras[2]` IS NOT OPTIONAL. Take it out and this becomes fear-selling,
 * which would undo §06 — the section that earns the trust — from four screens
 * away. "Plenty of places run like this for years and do fine" is the line
 * that keeps the whole block honest. Do not cut it to tighten the section.
 *
 * It renders as prose with no heading, like the tail of §06 and for the same
 * reason: §05 above it and §06 below it are both label / h2 / rule / standfirst
 * / enumerated list, and a third one between them would make the page texture
 * instead of chapters.
 */
const WAIT = {
  lede: "None of those five breaks. That's the whole problem with them.",
  paras: [
    "A fryer that quits, you fix the same day. A menu that's a photo doesn't quit. Wrong hours don't quit. A phone that rang while your hands were full never tells you it rang. Nothing on that list sets off an alarm, so it sits there, working exactly the same way tomorrow as it did today.",
    "Which is why I can't hand you one number for what it costs. It isn't a bill. It's a rate. Every week the hours stay wrong is another week of people driving over to a locked door. Every week the menu is a picture is another week your own dishes don't come up when somebody searches them by name. Every order that goes through the app is one more regular whose number the app has and you don't.",
    "I'm not telling you the sky is falling. Plenty of places run like this for years and do fine. I'm telling you it's the one cost that never shows up on a statement, and it keeps running whether anybody looks at it or not.",
  ],
} as const;

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
 * The four numbers the wood band turns on, pulled out of the prose and set as a
 * ledger above it.
 *
 * ⚠️ THE PARAGRAPHS BELOW ARE UNCHANGED AND THIS DOES NOT REPLACE THEM. An
 * audit called the arithmetic the best content on the page and said it was
 * buried in three paragraphs of prose — on a phone, four dollar figures and two
 * percentages arrive inside 120 words of running text and a 55-year-old has to
 * hold all six in his head to see the point. The table gives him the comparison
 * in one glance; the paragraphs still carry the argument, which is the half a
 * table cannot do. Every number here also appears verbatim below.
 *
 * The labels are the only new words in this block and they are deliberately
 * flat — no claim, no adjective, nothing that is not already true two sentences
 * later. Do not add a fifth row; the fifth number in this argument is the
 * commission rate itself, and §APPS_AFTER's whole point is that the owner has
 * to go and look his own rate up rather than take one from this page.
 */
const APPS_FIGURES = [
  { k: 'Your counter price', v: '$18' },
  { k: 'Listed on the app', v: '$24' },
  { k: 'You keep on the 30% plan', v: '$16.80' },
  { k: 'You keep on the 15% plan', v: '$20.40' },
] as const;

/**
 * The worked arithmetic. Set on the wood field — the one place a saturated
 * field carries running text, at 21px/700 so it is WCAG large-scale. It is the
 * most teachable thing on the page; keep all three.
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
    label: 'A site on its own',
    amount: `${PRICES.site.prefix} ${PRICES.site.display}`,
    body: 'Your menu, your photos, your hours, on a page that opens properly on a phone. Nothing wired to it yet. This is the floor and some places genuinely do not need more than it.',
  },
  {
    label: 'A site that takes orders',
    amount: `${PRICES.ordering.prefix} ${PRICES.ordering.display}`,
    body: 'Ordering and payment on your own site, at your counter prices. The order comes to you and the phone number comes with it, which is the part the apps keep.',
  },
  {
    label: 'The whole thing running',
    amount: `${PRICES.system.prefix} ${PRICES.system.display}`,
    body: 'Ordering, bookings, the phone answered, your Google listing kept right, and the review asks and win-back texts going out without you touching them.',
  },
  {
    label: 'Running it every month',
    amount: `${PRICES.running.prefix} ${PRICES.running.display} ${PRICES.running.cadence}`,
    body: 'This one moves with what is actually running. A truck with a site and a text list sits at the floor. Two locations with ordering and a phone agent sits nearer five hundred. Cancel any month and you keep the site.',
  },
] as const;

/**
 * The standfirst and the closing note are the point of this section, not the
 * numbers. Josh prices on what gets connected and how much runs through it, so
 * a flat figure was never true — and the flat figure that used to be here
 * ($500 one time, from $150 a month) sat 3-10x under everything he says out
 * loud in the room, which anchored the negotiation against him before he
 * opened his mouth.
 *
 * Every figure is a "from". The ladder shows a visitor roughly where he lands
 * and pre-qualifies him out if he was never going to spend it, without capping
 * the real quote. The closing note names the three things that move it and
 * commits to quoting on the call, which is how he actually sells: no proposal
 * documents, no second meeting.
 */
const COSTS_STAND =
  "There isn't one price, and I would rather tell you why than make one up. A site for a truck doing forty plates a day is not the same job as two locations doing four hundred. What moves the number is how much you connect to it and how much runs through it.";

const COSTS_NOTE =
  'Three things decide where you land: how many places you run, how busy you actually get, and how much of it you want me running instead of you. Tell me those on a twenty minute call and I will give you the number on the call. I do not send proposals.';

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

/* ── the skim path ────────────────────────────────────────────────────────
 *
 * ⚠️ THIS IS NOT DECORATION AND IT IS NOT A HIGHLIGHTER. It used to be one —
 * eight phrases with a translucent wash sweeping in behind them, chosen because
 * they were the strongest claims on the page. Josh's brief for the change is
 * the spec, verbatim: "if someone is looking through my site quickly i want
 * them to be able to pick up all the important info quickly while skimming,
 * where they see the color change on a sentence is becuase its the most
 * important".
 *
 * So the test the eight below have to pass is not "is this a good sentence".
 * It is: READ ONLY THE COLOURED PHRASES, TOP TO BOTTOM, AND YOU GET THE WHOLE
 * ARGUMENT. In page order they run:
 *
 *   1 hoursWrong   what is happening to you now
 *   2 costingNow   what that is doing to you, said beside the box that shows it
 *   3 chicken      what it costs on every ticket
 *   4 everyWeek    what it keeps costing while nothing is done  ← the new beat
 *   5 renting      the same cost, compounding, on the apps
 *   6 moneyLands   what changes
 *   7 sevenDays    how fast it changes
 *   8 tellYou      what you risk, which is nothing
 *
 * That order is load bearing. `oweNothing` — "you owe nothing and you never
 * hear from me again" — was marked and is now NOT, and the reason is only its
 * position: it lives in §04, four screens in, and reading a risk-reversal as
 * the second beat of the story breaks the sequence before it starts. The
 * sentence is still there, still bold, still beside the CTA. It just is not on
 * the skim path. `figures` (the oxtail comparison) and `dollarTwenty` came off
 * for the ground reason below; `ownAll` came off because §07 does not need two.
 *
 * Every string below is a verbatim slice of the copy constants above — nothing
 * here is a second copy of a sentence, and nothing here can be edited into one,
 * because <Marked /> finds the phrase inside the real string at render and
 * simply does not mark it if the copy has moved on. A drifted phrase costs a
 * mark; it never costs a word of Josh's writing and it can never crash the page.
 *
 * ⚠️ FIVE RULES. The fifth is new and it is the one that will get broken:
 *
 *   • NEVER INSIDE THE H1. It is 96px on a desktop. It does not need help.
 *   • ONLY ON CLAIMS. Not on a label, not on a heading, not on an instruction.
 *     Every phrase below is something a reader could disagree with.
 *   • ABOUT ONE PER SCREENFUL. Eight over a twenty-screen document. Nine starts
 *     reading as "this site has a highlighter" instead of "this is the point".
 *   • IT HAS TO BE A SENTENCE THAT SURVIVES ALONE. A skimmer reads it with no
 *     paragraph around it. "the money lands in your account" works; "and that
 *     is the part I build" does not.
 *   • ⚠️ CHECK THE GROUND BEFORE YOU ADD ONE. This is a colour change now, so a
 *     mark on the wrong field is either invisible or a contrast regression on
 *     the most important sentence in the section. Measured, and the numbers are
 *     on --mark-fg in the stylesheet: NOTHING can reach 4.5:1 on the wood band
 *     (white itself is only 4.17:1 there) and nothing can reach it on ember, so
 *     both fields degrade the mark to weight-only and NO PHRASE MAY BE PUT ON
 *     THEM. That is why the wood band's `dollarTwenty` is gone: the reveal
 *     there could only have moved that line from 4.18:1 down to 3.39:1.
 */
const MARKS = {
  /** §03. What is happening to you now. The first beat, and the page comes
   *  back to it twice — in check 02 and again in the waiting coda. */
  hoursWrong: 'Your hours are wrong on Google.',
  /** §04, inside the cream card. The one mark on a light ground. */
  costingNow: "what's costing you customers right now",
  /** §05, check 04. What it costs, per ticket. */
  chicken: "a cut of every ticket leaves the building before you've paid for the chicken",
  /** The waiting coda. The beat the page did not have: a rate, not an event. */
  everyWeek:
    'Every week the hours stay wrong is another week of people driving over to a locked door.',
  /** §06, after the band. The line the section is built to earn. */
  renting: 'You are renting them back by the plate.',
  /** §07, the first build row. What changes. */
  moneyLands: 'the money lands in your account',
  /** How it works. How fast it changes. */
  sevenDays: 'Seven days from your payment to the site being live.',
  /** §12, the last line of ABOUT. What you risk, which is nothing. */
  tellYou: "If I can't help you, I'll tell you that too.",
} as const;

/** Nothing to mark. A named constant so the identity is stable across renders. */
const NO_MARKS: readonly string[] = [];

/* ── pieces ───────────────────────────────────────────────────────────── */

/**
 * Wraps one or more verbatim phrases inside a string in `.eb-mark` spans.
 *
 * It walks the phrases in order and consumes the string as it goes, so a
 * phrase list can safely be handed to every paragraph in a block — `everyWeek`
 * lives in the middle one of WAIT's three paragraphs and the other two come out
 * untouched. A phrase that is not found is skipped, which is the whole safety
 * story: if a copy edit changes a sentence, the sentence renders exactly as
 * written and only loses its mark.
 *
 * Keys are on the spans because they sit in an array; the plain string
 * segments between them do not need them.
 */
function Marked({ text, phrases }: { text: string; phrases: readonly string[] }) {
  const out: ReactNode[] = [];
  let rest = text;

  phrases.forEach((phrase, i) => {
    const at = rest.indexOf(phrase);
    if (at === -1) return;
    out.push(rest.slice(0, at));
    out.push(
      <span key={i} className="eb-mark">
        {phrase}
      </span>,
    );
    rest = rest.slice(at + phrase.length);
  });

  if (out.length === 0) return <>{text}</>;
  out.push(rest);
  return <>{out}</>;
}

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

/**
 * `foundos` and the dot. The dot is decorative, so the link reads as one word.
 *
 * ⚠️ THE CLASS IS `.eb-wm`, NOT `.eb-mark`, AND THE RENAME WAS NOT COSMETIC.
 * `.eb-mark` is now the skim path — the eight phrases that change colour — see
 * MARKS above and `--mark-fg` in the stylesheet, and the wordmark held that
 * name first. Two things called "mark" in one 2,000-line file is how a logo ends up
 * inline-flex in the middle of a paragraph. If a later edit needs a third
 * "mark", it needs a third word.
 *
 * The dot is a client leaf now (components/Presence.tsx) because it is wired
 * to a clock. Its size and gap are still computed here, from brand.ts, because
 * they are the logo's proportions and not the component's business.
 */
function Wordmark({ px }: { px: number }) {
  return (
    <span className="eb-wm" style={{ fontSize: `${px}px` }}>
      {WORDMARK.text}
      <PresenceDot
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
      <style>{shipCss(CSS)}</style>

      {/* Renders nothing. It watches the eight skim-path phrases and decides
          when each one turns colour — see components/MarkReveal.tsx. It sits
          here rather than beside the marks because there is one observer for
          all of them, and here is the one place on the page that is neither a
          section nor a piece of copy. */}
      <MarkReveal />

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
            {/* The presence line sits immediately before the CTA it is arguing
                for, in the label voice, so the row reads left to right as
                "foundos ● — around now — text me". The dot at the far left and
                the words at the right are the same 64px bar and one glance. */}
            <PresenceNote copy={PRESENCE} />
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
            {/* The number is wrapped so the button's +.06em label tracking does
                not apply to the parentheses: tracked, "(404)" renders as
                "( 404 )" because the space is added after the opening bracket
                and before the closing one. .eb-num turns tracking off for the
                digits and nothing else. Same span in the closing CTA.

                ⚠️ THE NON-BREAKING SPACE IS LOAD-BEARING AND A PLAIN SPACE DOES
                NOT WORK HERE. .eb-btn is display:inline-flex, so each run of
                text becomes an anonymous flex item and CSS strips the leading
                and trailing whitespace of every one of them. With an ordinary
                space the run "Text me — " was trimmed to "Text me —" and the
                button rendered "TEXT ME —(404) 436-3393", measured at 107.9px
                of lead where 118.8px is one space wider. A no-break space is
                not white space as far as that trimming is concerned, so it
                survives — and it also stops a phone number ever being split
                from the dash that introduces it. */}
            <div className="eb-btns">
              <a className="eb-btn eb-btn--a" href={`sms:${PHONE}`}>
                {NAV.text} —&nbsp;<span className="eb-num">{PHONE_PRETTY}</span>
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
              {/* The first beat of the skim path, and the only one on a lede
                  rather than in body copy. One of three parallel lines carries
                  it on purpose — it is the line check 02 and the waiting coda
                  both come back to, so it is the one the page is arguing. */}
              {PROBLEM.lines.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  <Marked text={line} phrases={i === 0 ? [MARKS.hoursWrong] : NO_MARKS} />
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
                {/* The one mark on a light ground, and the only reason the
                    light value of --mark-fg exists. See the note on .eb-pad:
                    the reveal here is ember darkened toward rich, because plain
                    ember on cream is 3.35:1 and would be a regression on the
                    sentence it is supposed to be pointing at. */}
                <p className="eb-pad-p">
                  <Marked text={AUDIT.p} phrases={[MARKS.costingNow]} />
                </p>
                <div className="eb-pad-widget">
                  <InstantReport />
                </div>
                <div className="eb-rule eb-rule--inset" aria-hidden="true" />
                {/* The promise belongs beside the ask, not four screens below
                    it. It is NOT on the skim path any more and that is a
                    sequencing decision, not a demotion — see the note on MARKS.
                    It is still the whole paragraph in bold, right under the
                    box. Do not re-mark it without moving it. */}
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
                    {/* One of the five, and it is the one this whole page is
                        about. The other four render untouched. */}
                    <p className="eb-p">
                      <Marked
                        text={c.body}
                        phrases={c.n === '04' ? [MARKS.chicken] : NO_MARKS}
                      />
                    </p>
                    <p className="eb-do eb-mono">{c.check}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* ── What waiting costs ─────────────────────────────────────
                A coda on the five checks, not a section of its own. It runs
                as prose with no label, no heading and no numerals — the same
                shape as the tail of §06 and for the same reason: §05 above
                and §06 below are both label / h2 / rule / standfirst / list,
                and a third one wedged between them turns the page into
                texture. It is also why it sits INSIDE §05's div: the reader
                has just been handed five things that are probably wrong at
                his own place, and the next thing he needs is not another
                chapter, it is the answer to "so what if I leave it".
                See the note on WAIT for what may and may not be claimed here. */}
            <div className="eb-block eb-mt">
              <p className="eb-lede">{WAIT.lede}</p>
              <div className="eb-mt">
                {WAIT.paras.map((p) => (
                  <p key={p} className="eb-p">
                    <Marked text={p} phrases={[MARKS.everyWeek]} />
                  </p>
                ))}
              </div>
            </div>
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
                {/* ⚠️ NO MARK HERE ANY MORE. The oxtail comparison ($31.99 on
                    DoorDash / around $18 at the counter) used to carry one and
                    it is still the most concrete number in the section — but it
                    is a claim about somebody else's restaurant, and the skim
                    path is eight sentences about the reader's. The ledger on
                    the wood band directly below sets the same figures out in a
                    table, which is the better job for numbers anyway. */}
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
                announcing instead.

                The ledger goes FIRST and the argument follows it. Both halves
                are load bearing — see the note on APPS_FIGURES — and both are
                set large and bold because ink on wood is 4.24:1 and only legal
                above the WCAG large-scale floor. Nothing in this band may drop
                below 19px/700. */}
            <dl className="eb-figs">
              {APPS_FIGURES.map((f) => (
                <div key={f.k} className="eb-fig">
                  <dt className="eb-fig-k">{f.k}</dt>
                  <dd className="eb-fig-v eb-num">{f.v}</dd>
                </div>
              ))}
            </dl>
            {/* ⚠️ NO MARK ON THIS BAND, AND NOTHING MAY EVER BE PUT ON IT.
                "you finished a dollar twenty under it" was marked here while
                the device was a translucent wash, which could LIFT contrast.
                A colour change cannot. Measured against wood #b76745: the ink
                these lines are set in is 4.18:1, bone is 3.39:1, rich is
                3.91:1, and pure white — the ceiling — is 4.17:1. There is no
                colour, in or out of the palette, that reaches 4.5:1 on this
                field, so every available reveal makes the most important
                sentence in the section harder to read than the ones around it.
                The ledger above and the two rules framing the band do the
                pointing here instead. See the fifth rule on MARKS. */}
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
                    <Marked text={p} phrases={[MARKS.renting]} />
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
              {/* Every row has both halves now, and --solo is gone with the
                  empty one — see the note on BUILDS. If a future row ever needs
                  to be short, make its sentence short; do not leave the cell
                  empty, because an empty right column here reads as a field
                  that failed to render rather than as an intentional silence. */}
              {BUILDS.map((item) => (
                <li key={item.lead} className="eb-build">
                  <span className="eb-build-lead">{item.lead}</span>
                  <span className="eb-build-rest">
                    <Marked text={item.rest} phrases={[MARKS.moneyLands]} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="eb-lede eb-lede--strong eb-mt">{BUILD_TAIL.strong}</p>
            {/* ONE MARK IN THIS SECTION NOW, NOT TWO. "You own all of it" was
                the second, and it is a good sentence — but the skim path is a
                sequence and this section's job in it is a single beat, "what
                changes". Two marks in one section made §07 the one place on the
                page where the device stopped meaning "this is the point". */}
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
                    {/* `sizes` is the CARD's width, which is what the browser
                        actually needs to pick a variant from. It used to be
                        1140px / 210vw — the frame width times a 208.7% CSS
                        magnification that no longer exists — and it made the
                        softness it was meant to prevent: quoting a slot far
                        wider than the card meant the browser picked its
                        candidate against the wrong number, and an audit
                        measured the result as an image being painted about 1.6x
                        larger than the pixels behind it, 3.2x on a retina
                        screen. Verified after the change, with the served file
                        decoded rather than inferred: at 1440/1dpr the browser
                        takes the 750x500 variant for a 480x325 slot, and at
                        390/3dpr it takes the 1080x720 variant for a slot
                        needing 1038x702 device pixels. Both are downscales.
                        Nothing is enlarged.
                        46vw covers the widest the card ever gets (at 900px,
                        before the shell caps, each card is 44vw). See
                        .eb-work-shot for the object-fit that replaced the
                        margin-top crop. */}
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
              <span className="eb-tel-n">{DEMO_LINE_PRETTY}</span>
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
            <p className="eb-stand">{COSTS_STAND}</p>
            <dl className="eb-ledger">
              {COSTS.map((row) => (
                <div key={row.label} className="eb-row">
                  <dt className="eb-row-l">
                    <span className="eb-lab eb-row-lab">{row.label}</span>
                    {row.amount && <span className="eb-row-amt">{row.amount}</span>}
                  </dt>
                  <dd className="eb-row-r">{row.body}</dd>
                </div>
              ))}
            </dl>
            <p className="eb-p eb-mt">{COSTS_NOTE}</p>
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
          {/* ⚠️ A TRACK, NOT A THIRD NUMBERED LIST, AND THE DIFFERENCE IS THE
              POINT. "Five things I check first" (01-05), "How a stranger
              becomes a regular" (01-04) and this one (01-06) were built from
              one component: a 26-32px wood numeral in a left gutter, a bold
              lead, a paragraph, a hairline between rows. Three of those inside
              one scroll and by the third a reader cannot tell he has moved —
              the page stops having chapters and starts having texture.
              So this one runs across instead of down: the numeral sits ON the
              rule above its own paragraph instead of in a gutter beside it, at
              19-21px rather than 26-32px, and at 900px the six steps lay out
              three-across in two rows, which reads as a schedule. It is the
              only list on the page that does. Do not fold it back into
              .eb-checks — and see .eb-step-n before shrinking the numeral,
              because its size is holding a contrast floor. */}
          <div className={`${SHELL} eb-sec--after-rule`}>
            <ol className="eb-steps" role="list">
              {HOW.steps.map((s) => (
                <li key={s.n} className="eb-step">
                  <span className="eb-step-n eb-mono">{s.n}</span>
                  <p className="eb-step-p">{s.para}</p>
                </li>
              ))}
            </ol>
            <p className="eb-lede eb-lede--strong eb-mt">
              <Marked text={HOW.deadline} phrases={[MARKS.sevenDays]} />
            </p>
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
            {/* The last beat of the skim path, and the only one where the mark
                is the whole paragraph — it is one seven-word sentence standing
                on its own, so marking a slice of it would be marking a slice of
                a slice. The ground here is rich #231f20 rather than the ink
                spine; the reveal colour is inherited unchanged and measures
                5.62:1 on it, against 6.00:1 on ink. Both clear the floor. */}
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
              {/* The no-break space is required — see the note in the hero. */}
              <a className="eb-btn eb-btn--a" href={`sms:${PHONE}`}>
                {NAV.text} —&nbsp;<span className="eb-num">{PHONE_PRETTY}</span>
              </a>
              <a className="eb-btn eb-btn--b" href={CAL} target="_blank" rel="noreferrer">
                {NAV.book}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────
          ⚠️ NO SEPARATOR CHARACTERS. There were interpuncts between the four
          items, each bound to the item that followed it so a dot could not be
          orphaned at the end of a wrapped line — and that binding worked, but
          it only moved the problem: at 375px the last item wrapped and the line
          it started read "· Privacy", a dot with nothing before it. There is no
          arrangement of four items and three dots that survives every width.
          The gap does the separating instead (8px down, 20px across), which
          cannot wrap wrong at any width because there is nothing left to wrap.
          Do not put the dots back; if the items ever need stronger separation,
          widen the column gap. */}
      <footer>
        <Rule />
        <div className={`${SHELL} eb-foot`}>
          <Wordmark px={16} />
          <a href={`mailto:${EMAIL}`} className="eb-foot-a">
            {EMAIL}
          </a>
          <span className="eb-foot-s">
            {LOCATION.city}, {LOCATION.region}
          </span>
          <Link href="/privacy" className="eb-foot-a">
            Privacy
          </Link>
        </div>
      </footer>

      {/* ── The phone action bar ──────────────────────────────────────────
          Below 640px only, and it is the single change on this page most
          likely to produce a text message. The whole funnel is "text me" and
          until now the only ways to do it were a header link 19,000px above
          the fold and two buttons at either end of a 23-screen scroll. In
          between — the five checks, the delivery-app argument, the prices,
          the seven days — there was nothing to act on.

          It never covers content: .eb carries a matching bottom padding, so
          the last line of the footer clears it at rest.

          THE HIDE IS OPTIONAL AND THAT IS DELIBERATE. The bar's base state is
          visible. A scroll-driven animation then holds it off-screen over the
          hero and again over the closing CTA — both places where a duplicate
          "Text me" would be arguing with a full-size one on screen. Any
          browser without animation-timeline, and anybody who asked for reduced
          motion, simply gets the bar the whole way down, which is the correct
          fallback rather than a broken one. It animates transform and opacity
          and nothing else. */}
      <nav className="eb-bar" aria-label="Quick actions">
        <a className="eb-bar-a eb-bar-a--p" href={`sms:${PHONE}`}>
          {NAV.text}
        </a>
        <a className="eb-bar-a" href="#report">
          Free report
        </a>
      </nav>
    </div>
  );
}

/* ── the stylesheet ───────────────────────────────────────────────────────
   Scoped to `.eb`. No backticks anywhere in here — the whole thing is a
   template literal. Read the file header before changing a value; most of
   these numbers were chosen against a measurement, not a preference. */
/**
 * Strips comments and collapses whitespace on the way to the browser.
 *
 * The stylesheet below is heavily commented on purpose — it is the only record
 * of why the tracking is directional, why the ledger numerals are not mono, why
 * the mobile bar uses a scroll-driven animation instead of JS. Those notes are
 * for whoever edits this next and they should stay.
 *
 * They just should not be DOWNLOADED. Measured on the live page: the inline
 * stylesheet was 53.7KB, of which 27.8KB — 99 comments, 52% of the CSS and 15%
 * of the whole HTML document — was prose explaining the CSS to a person who
 * will never read it in a browser. Check 05 on this very page tells an owner to
 * turn wifi off and count while their own site loads. Shipping 27KB of my own
 * commentary to a restaurant owner on two bars in a parking lot is exactly the
 * thing being complained about, on the page doing the complaining.
 *
 * Deliberately conservative: block comments, then runs of whitespace, then the
 * space around the punctuation that cannot be ambiguous. It does NOT touch
 * quoted strings or url() values, and there are no data: URIs in this sheet
 * (checked — a base64 payload containing the comment terminator is the usual
 * way a naive stripper corrupts a stylesheet). If a data URI is ever added
 * here, this needs to become a real minifier rather than four regexes.
 */
function shipCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

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

  /* The dot's night state, and the ONLY new colour this page has taken on. It
     is not a palette value and nothing but .eb-dot may use it. It is warm on
     purpose — a step yellower than wood, well clear of ember so the two never
     read as the same thing — because a grey dot reads as broken and a red one
     reads as an error, and the honest meaning here is only "it is late in
     Atlanta". 5.9:1 on the ink spine, which is the only ground it appears on. */
  --dot-away:#c98b2b;

  /* ── THE SKIM COLOUR, PER GROUND ──────────────────────────────────────
     One role, re-pointed by every ground class below exactly like --fg and
     --rule, so the eight marked phrases in the copy never have to know which
     field they landed on.

     ⚠️ THIS USED TO BE A TRANSLUCENT WASH AND IT IS NOW AN OPAQUE TEXT
     COLOUR. The variable was renamed --mark → --mark-fg for exactly that
     reason: same name, different KIND of value is how a highlighter ends up
     painted over a sentence. If you see --mark anywhere, it is stale.

     The dark spine gets ember lightened with bone. Plain ember is not an
     option and this is the measurement that decided it: #d94f2b on #1a1a1a is
     4.23:1, which is legal for the 40px demo number in §10 and NOT legal for a
     17px paragraph. Mixing 30% bone into it gives #e07d5e at 6.00:1 — the same
     hue, no sixth value, and 1.5x the headroom the floor asks for. The default
     body colour it replaces is 11.17:1, so the marked phrase is still the
     lower-contrast text on the line; 6.00 is where that stops mattering.

     It also has to survive the rich field under §12 (#231f20), which the ABOUT
     mark sits on: 5.62:1 there. Both clear 4.5. */
  --mark-fg:color-mix(in srgb, var(--ember) 70%, var(--bone));

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
  --t-num:26px;    /* the 01-05 numerals, the ledger amounts, the app figures */

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
   Re-measured at 1440 on 2026-09-04: it cuts the longest single-ground run to
   4,673px of a 13,702px page. */
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
  /* Ember DARKENED with rich, the mirror of the spine's ember lightened with
     bone. Plain ember on cream is 3.35:1 and would be a contrast regression on
     the marked sentence; 60/40 gives #903c27 at 5.97:1. No mark lives on this
     field today (§08 is two screenshots) — the value is here so that one
     landing here later cannot inherit the spine's light ember onto cream. */
  --mark-fg:color-mix(in srgb, var(--ember) 60%, var(--rich));
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
  /* ⚠️ NO MARKED PHRASE MAY LIVE ON EMBER, and now there is no colour that
     could rescue one. Ink — the colour the copy here is already set in — is
     4.23:1 on this field, and bone is 3.35:1; there is nothing above the
     first and the second is worse. So the reveal is pinned to the text colour
     the ground already uses, which makes it a no-op: a phrase landing here
     keeps its 700 weight and changes colour by nothing, which is the only
     honest failure mode. It is not an invitation to put one here. */
  --mark-fg:var(--ink);
}
.eb-g-wood{
  background:var(--wood);
  color:var(--ink);
  --fg:var(--ink);
  --dim:var(--ink);
  --strong:var(--ink);
  --rule:var(--ink);
  --color-ink:var(--ink);
  /* ⚠️ SAME NO-OP AS EMBER, AND THIS BAND IS THE HARDER CASE OF THE TWO.
     A wash could raise the marked line's contrast here and one used to. A
     colour change can only lower it: measured against wood #b76745, the ink
     these lines are set in is 4.18:1, rich is 3.91:1, bone is 3.39:1, and pure
     white — the arithmetic ceiling for anything lighter than the field — is
     4.17:1. Nothing reaches 4.5:1 on wood, in the palette or out of it. So the
     reveal is pinned to ink and does nothing, and the band carries no marked
     phrase. See the fifth rule on MARKS before you try to put one back. */
  --mark-fg:var(--ink);
}

/* ---- the two voices ----------------------------------------------------- */
.eb-d{
  font-family:var(--f-display);
  font-weight:700;
  font-stretch:86%;
  line-height:.85;
  letter-spacing:-.035em;
}
/* ── THE HERO IS REBALANCED, AND THE RATIO IS THE WHOLE FIX ────────────────
   This was clamp(2.75rem,10.6vw,8rem): 128px at 1440, 44px at 390. Three
   things were wrong with that and they were all the same thing.
   (1) The 128px line is the generic one. "I build and run the online side of
   restaurants and food businesses in Atlanta" is a job description. The line
   that actually sells — "You're good at what you do. The internet doesn't show
   it." — sat 24px underneath it, so the page shouted the boring half and
   whispered the half that lands. (2) Under a 128px headline, an 11-13px mono
   button reads as a footnote, not as the thing to do next. (3) At 390 the 44px
   floor forced the h1 to five lines in a 350px column, which pushed the subhead
   to 365px and the first button to 456px — most of an iPhone SE screen spent
   before anything sellable appears.
   The words did not change. The weight they are given did: the h1 comes down
   to 96px / 36px, the subhead goes up to 38px / 22px, and the buttons go up a
   step to body size. 96:38 is a real hierarchy; 128:24 was a shout followed by
   a mumble. text-wrap:balance stops the h1 leaving a two-word last line.
   ⚠️ The subhead is ink on ember at 4.24:1, which is legal ONLY above the WCAG
   large-scale floor (18.66px bold). Its clamp floor is 22px and its weight is
   700. Do not lower either. */
.eb-h1{font-size:clamp(2.25rem,9.2vw,6rem);text-wrap:balance;}
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

/* ── THE SKIM PATH ────────────────────────────────────────────────────────
   Eight phrases, one span each, and they are NOT decoration. Josh's reason is
   quoted in full on MARKS in the copy block: a reader going fast should be
   able to read only the coloured phrases and come away with the argument. The
   rules for choosing one live there too. This block is only how it paints.

   ⚠️ THE WEIGHT IS PERMANENT AND THE COLOUR IS THE REVEAL, AND THAT SPLIT IS
   DELIBERATE. Two reasons, and neither is taste.
   (1) A colour change alone is invisible to a reader with a red-green colour
   vision deficiency, and this device is a comprehension aid — the one thing on
   the page that must not depend on hue. 400 → 700 carries the whole skim path
   with the colour switched off.
   (2) font-weight is animatable on a variable face and Chivo is one, so it
   COULD have been part of the reveal. It must not be: interpolating weight
   re-measures the text every frame, which reflows the paragraph around it, and
   eight paragraphs twitching as you scroll is a worse bug than no animation.
   Setting it once, up front, also means the skim path is fully readable before
   IntersectionObserver has fired and on any browser where it never does.
   So: color is the only animated property, and it does not affect layout.

   The old build was a translucent wash swept in behind the words with a
   background gradient. Do not reach for background-size here again — it is not
   what --mark-fg holds any more, and MarkReveal's stagger is timed to a colour
   transition.

   --mark-fg is re-pointed by every ground exactly like --fg. Measured, on the
   grounds these eight phrases actually sit on:
     ink spine  #e07d5e on #1a1a1a  6.00:1   (five of the eight)
     rich §12   #e07d5e on #231f20  5.62:1   (tellYou)
     cream card #903c27 on #f0e7d4  5.97:1   (costingNow; 4.56:1 where the
                                              card's 1px ruled line crosses)
   Ember and wood pin --mark-fg to the text colour they already use, so a mark
   landing on either changes nothing but its weight. See the notes there: on
   those two fields no colour on earth reaches 4.5:1, which is why neither
   carries a phrase.

   Under reduced motion the mark is simply painted in its final colour with no
   transition. Which sentence matters is information, and information is not
   what a reduced-motion request is asking to have removed. MarkReveal still
   adds .is-in and it is a no-op here. */
.eb-mark{
  font-weight:700;
  color:inherit;
}
.eb-mark.is-in{color:var(--mark-fg);}
@media (prefers-reduced-motion:no-preference){
  .eb-mark{transition:color .5s cubic-bezier(.22,.61,.36,1);}
}
@media (prefers-reduced-motion:reduce){
  .eb-mark,.eb-mark.is-in{color:var(--mark-fg);}
}
/* The risk paragraph in the cream card is set 700 outright, so a mark inside
   it would have no weight step left and would be leaning on hue alone. It has
   no mark today — see the note at that render site — and this rule is what
   keeps the rule above honest if one is ever put back. Chivo's variable axis
   runs to 900. */
.eb-pad-p--risk .eb-mark{font-weight:800;}

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
.eb-stand{font-size:var(--t-lede);line-height:1.5;color:var(--dim);max-width:60ch;margin-bottom:30px;}
/* The flush variant is the one used where no full-bleed rule separates the h2
   from its standfirst (08 and 10). Without a top margin the two sat 0px apart
   — .eb-h2 has no margin-bottom, by design, because everywhere else a rule and
   64px of section padding do the separating. */
.eb-stand--flush{margin-top:22px;margin-bottom:24px;}
.eb-fine{margin-top:18px;font-size:var(--t-fine);line-height:1.6;color:var(--dim);}
.eb-mt{margin-top:30px;}
@media (min-width:640px){
  .eb-stand--flush{margin-top:26px;}
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
.eb-lh{display:flex;align-items:center;gap:14px;margin-bottom:18px;
  margin-right:calc(50% - 50vw);}
.eb-lh-line{flex:1 1 auto;height:1px;background:var(--rule);}
/* ── WHERE THE EYEBROW RULE STOPS, ONCE THE COLUMN STOPS MOVING ───────────
   Below 1024px the shell gutter IS the screen edge, so running to the viewport
   is the same thing as running to the column and the device reads as intended.
   Above it the two come apart, and running to the edge means the hairline
   travels 300px past the last word of a 64ch measure with nothing on the other
   side of it. That is the "rule pointing at nothing" an audit found in every
   band. So at 1024 and up the eyebrow stops where the prose stops. The
   full-bleed section dividers are untouched: they separate bands, they are not
   pointing at a column, and a divider that stopped mid-page would read as a
   rule that failed rather than one that was placed. */
@media (min-width:1024px){
  /* 44rem is the same 704px the prose measure resolves to, so the hairline and
     the right edge of the paragraphs below it land on one line. Not a ch value,
     for the reason spelled out at .eb-do: this element's own font is 16px Chivo
     and a ch here means something different from a ch three rules down. */
  .eb-lh{margin-right:0;max-width:44rem;}
  /* the two bounded instances keep their own panel-relative behaviour */
  .eb-pad-in>.eb-lh,.eb-note>.eb-lh{max-width:none;}
}
/* The two BOUNDED instances, named rather than inferred. Inside a padded panel
   the hairline should stop at the panel, so the negative margin equals that
   panel's own padding — 20px, 40px from 640 up, which is what both of them
   use. A new ledger head anywhere else inherits the shell behaviour, which is
   the right default; this list is the exception, and it is two long. */
.eb-pad-in>.eb-lh,.eb-note>.eb-lh{margin-right:-20px;}
@media (min-width:640px){.eb-pad-in>.eb-lh,.eb-note>.eb-lh{margin-right:-40px;}}

/* ---- shell rhythm ------------------------------------------------------- */
/* ⚠️ CUT ~35% FROM EVERY BAND, AND THE PAGE IS BETTER FOR IT, NOT WORSE.
   At 1440 the document was 15,705px and a scroll-through found the same shape
   over and over: a heading, a rule, six lines of type, then 200-270px of empty
   ink before the next rule. That is not restraint, it is a page with nothing in
   the lower two thirds of most viewports — and it is paid for by the reader,
   who scrolls a third further to read the same words. The band separations here
   are doing a job the 1px rules already do on their own.
   Every number below is the old one times roughly 0.65. If a future edit wants
   air back, take it in one place that earns it rather than everywhere. */
.eb-sec{padding-top:44px;padding-bottom:44px;}
.eb-sec--tight{padding-top:38px;padding-bottom:38px;}
.eb-sec--after-rule{padding-top:30px;padding-bottom:48px;}
@media (min-width:640px){
  .eb-sec{padding-top:62px;padding-bottom:62px;}
  .eb-sec--tight{padding-top:52px;padding-bottom:52px;}
  .eb-sec--after-rule{padding-top:42px;padding-bottom:72px;}
}

/* ---- header ------------------------------------------------------------- */
.eb-head{position:sticky;top:0;z-index:50;background:var(--ink);}
.eb-head-row{display:flex;align-items:center;justify-content:space-between;height:64px;}
.eb-head-mark{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;}
/* ⚠️ RENAMED FROM .eb-mark. That name now belongs to the skim path, the eight
   phrases that change colour (see .eb-mark, up in "the two voices"), and the
   wordmark cannot share it: display:inline-flex plus the display face on a
   phrase mid-paragraph turns that phrase into an unwrappable bone-coloured
   box. Two things called "mark" in one file is the bug waiting to happen. */
.eb-wm{display:inline-flex;align-items:baseline;font-family:var(--f-display);font-weight:700;
  font-stretch:86%;letter-spacing:-.03em;color:var(--bone);}

/* ── THE PRESENCE DOT ──────────────────────────────────────────────────────
   The one radius and the one green on the page, and both are correct. This is
   the mark from brand.ts — a circle, #1D9E75 — the same one on foundos.ai and
   on the cards already handed out. A square ember dot is a different logo. It
   sits on the ink spine in the header and the footer, never on ember, so the
   green has room and clashes with nothing.

   It now breathes, and it now MEANS something: components/Presence.tsx flips
   data-state to "away" outside 9am-9pm Atlanta time, and PRESENCE puts the
   words beside it. What the dot must never become is an alarm — 2.4s is slow
   enough to read as breathing, and anything under about 1.5s reads as an
   error state on a device somebody is holding.

   THE AMBER IS THE ONE NEW COLOUR ON THE PAGE and it is deliberately inside
   the warm family, a step yellower than wood, so that a night visitor sees a
   different state rather than a different brand. It is not a palette value and
   nothing else may use it. Both states are decorative: the sentence a screen
   reader hears is in .eb-sr, not in the colour. */
.eb-dot{
  --now:var(--dot);
  display:inline-block;flex:0 0 auto;position:relative;
  border-radius:50%;background:var(--now);
}
.eb-dot[data-state="away"]{--now:var(--dot-away);}
/* transform and opacity only, and the ring does not exist at all when reduced
   motion is asked for — no content, no pseudo-element, nothing to stop. */
@media (prefers-reduced-motion:no-preference){
  .eb-dot{animation:eb-breathe 2.4s ease-in-out infinite;}
  .eb-dot::after{
    content:"";position:absolute;inset:0;border-radius:50%;
    background:var(--now);opacity:.45;
    animation:eb-ring 2.4s ease-out infinite;
  }
}
@keyframes eb-breathe{0%,100%{opacity:1} 50%{opacity:.62}}
@keyframes eb-ring{0%{transform:scale(1);opacity:.45} 70%,100%{transform:scale(2.8);opacity:0}}

/* The line that makes the dot a conversion element instead of a decoration.
   Label voice, because the page has no third small-type style, and nowrap
   because a two-line fragment in a 64px header row is worse than a tight one.
   The 44px min-height matches the nav links either side of it so the row does
   not shift when the state changes. */
.eb-presence{display:inline-flex;align-items:center;min-height:44px;}
.eb-presence-t{white-space:nowrap;}
/* The screen-reader sentence. Not Tailwind's .sr-only: this page's stylesheet
   is self-contained inside .eb and does not otherwise depend on a utility
   surviving a content scan. */
.eb-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip-path:inset(50%);white-space:nowrap;border:0;}

.eb-nav{display:flex;align-items:center;gap:22px;}
.eb-nav-a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;color:var(--dim);}
.eb-nav-a:hover{color:var(--bone);}
.eb-nav-a--wide{display:none;}
@media (min-width:640px){.eb-nav-a--wide{display:inline-flex;}}

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

/* ---- buttons ------------------------------------------------------------ */
.eb-btns{display:flex;flex-direction:column;gap:12px;margin-top:30px;align-items:stretch;}
@media (min-width:560px){.eb-btns{flex-direction:row;align-items:flex-start;}}
/* Body size, not --t-fine. .eb-btn is used in exactly two places — the hero and
   the close — and at 13px under a display headline both of them read as small
   print rather than as the next thing to do. This is the other half of the hero
   rebalance described at .eb-h1. */
.eb-btn{
  display:inline-flex;align-items:center;justify-content:center;
  min-height:58px;padding:0 24px;border-radius:0;border:1px solid transparent;
  font-family:var(--f-mono);font-size:var(--t-body);font-weight:600;letter-spacing:.06em;
  text-transform:uppercase;text-decoration:none;text-align:center;cursor:pointer;
}
/* ── NUMERALS OPT OUT OF TRACKING ─────────────────────────────────────────
   +.06em is right for a tracked uppercase label and wrong for every character
   that is not a letter. Applied to "(404) 436-3393" it puts the added space
   INSIDE the brackets, so the button reads "( 404 ) 436-3393", and the same
   tracking on a mono ledger amount opens "$1,500" into "$1 , 500" because a
   monospaced comma already sits in a full-width advance with the ink in the
   middle of it. tabular-nums keeps the digits on a common width so a column of
   amounts still lines up. */
.eb-num{letter-spacing:normal;font-variant-numeric:tabular-nums;}
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
/* 88, not 64. The sticky header is 65px tall including its own rule, so a 64px
   scroll margin lands the top edge of the card exactly underneath it: tapping
   "See what I'd build for you" from the hero, or "Free report" from the phone
   bar, put the label and the first line of the heading behind the header. 88
   clears it with 23px to spare. The id and the class are on the same element;
   the id selector is here as well because the anchor is what the browser is
   actually scrolling to and a future refactor that drops the class should not
   silently take the margin with it. */
#report,.eb-report-anchor{scroll-margin-top:88px;}
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

/* ---- footer ------------------------------------------------------------- */
/* No separator glyphs — see the note on the markup. The row gap is what
   separates the items, so nothing can be orphaned onto a wrapped line. */
.eb-foot{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1.25rem;padding-top:22px;
  padding-bottom:22px;font-size:var(--t-fine);line-height:1.6;color:var(--dim);}
.eb-foot-a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;color:inherit;}
.eb-foot-a:hover{color:var(--bone);}
.eb-foot-s{display:inline-flex;align-items:center;min-height:44px;}

/* ---- the phone action bar ----------------------------------------------- */
/* Hidden by default so no desktop rule has to undo it. Below 640px the header
   already drops "Book 20 minutes", which is the same breakpoint at which a
   visitor stops having a persistent way to act at all. */
.eb-bar{display:none;}
@media (max-width:639px){
  .eb-bar{position:fixed;left:0;right:0;bottom:0;z-index:60;
    display:grid;grid-template-columns:1fr 1fr;gap:1px;
    background:var(--bone);border-top:1px solid var(--bone);
    padding-bottom:env(safe-area-inset-bottom);}
  .eb-bar-a{display:flex;align-items:center;justify-content:center;min-height:56px;padding:0 12px;
    font-family:var(--f-mono);font-size:var(--t-fine);font-weight:600;letter-spacing:.06em;
    text-transform:uppercase;text-decoration:none;text-align:center;
    background:var(--ink);color:var(--bone);}
  .eb-bar-a--p{background:var(--bone);color:var(--ink);}
  /* The bar must never sit on top of the last line of the footer. This is the
     bar's own height plus whatever the device reserves for the home indicator,
     and it has to move if .eb-bar-a's min-height ever does. */
  .eb{padding-bottom:calc(57px + env(safe-area-inset-bottom));}
}
/* Progressive enhancement, and the base state above is the fallback: a browser
   without scroll-driven animations, and anybody who asked for reduced motion,
   gets the bar the whole way down. Where it is supported the bar stays off
   screen over the hero — where two full-size buttons are already on screen —
   and again over the closing CTA, for the same reason. Percentages rather than
   pixels because the document is 15,000px on one phone and 20,000px on
   another; 4% and 94% of the scroll range land on the two CTA blocks at both.
   transform and opacity only, which is the whole of what is animated here. */
@supports (animation-timeline:scroll()){
  @media (max-width:639px) and (prefers-reduced-motion:no-preference){
    .eb-bar{animation:eb-bar-peek linear both;animation-timeline:scroll(root block);}
    @keyframes eb-bar-peek{
      0%,4%{opacity:0;transform:translateY(100%);}
      7%,94%{opacity:1;transform:translateY(0);}
      97%,100%{opacity:0;transform:translateY(100%);}
    }
  }
}
`;
