import Link from 'next/link';

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
 * foundos.ai homepage — rebuilt 2026-09-03 to the brand spec (§2.1 → §2.11).
 *
 * What this replaced: "the letter" — a splash overlay, five banner bars in the
 * old accent colour, a component that tinted nine words that same colour, seven
 * emoji, a glass mobile dock, and 197 lines of inline CSS. All of it is gone.
 * The page is now black on white, one family, two weights, and the only colour
 * on it is the dot after the wordmark.
 *
 * Order matters and it is not cosmetic. The audit box is the front door of the
 * business, so it sits third — right after the two lines that name the problem
 * — instead of below the whole service list where it used to hide. Anything
 * added later goes *under* it, never above it.
 *
 * Constraints a future editor must not break:
 *
 *   1. This file stays a SERVER component. There is no client state on the
 *      page: the sticky header is `position: sticky`, the hero's second button
 *      is a plain `#report` anchor, and every piece of interactivity lives
 *      inside InstantReport, which is the client leaf. Adding 'use client'
 *      here would drag the whole page into the bundle for nothing.
 *
 *   2. No hex codes. Colours come from the six `@theme` tokens in globals.css
 *      (bg-paper, text-ink, text-muted, border-hairline, bg-surface, bg-dot).
 *      Green appears exactly once per view — the dot — and never on a link, a
 *      button or an icon.
 *
 *   3. No price strings. Both numbers in §2.8 are read from PRICES in
 *      config/brand.ts so Josh can change a price in one place. If you find
 *      yourself typing a dollar sign in this file, stop.
 *
 *   4. The h1 must outrank every h2 on every screen. This is the constraint
 *      that replaced "three lines at 375px", and it replaced it because the
 *      two could not both hold. The headline is 78 characters; the spec asks
 *      for 36px on mobile and a three-line maximum, and 36px would need 464px
 *      of column to make three lines. No phone has it.
 *
 *      The first attempt kept the three-line rule and clamped the hero to
 *      ~27px to get it. That fit — and it left the h1 measuring 3% larger than
 *      the section headings, so a phone showed six headings of equal rank and
 *      no title. A fresh-eyes review found the page's entry point had become
 *      the black phone-number button. Hierarchy is worth more than a line.
 *
 *      So: 32px over four lines at 390px, 56px at desktop, with the section
 *      headings down to 22px to get out of the way. Mobile scale is 32 / 26 /
 *      22 — hero, audit box, everything else. If the copy changes, re-measure
 *      the wrap, but never at the cost of the h1 outranking the h2s.
 *
 *   5. Focus rings are NOT declared here. globals.css sets a black 2px ring on
 *      `:focus-visible` outside `@layer base` on purpose, so an unlayered rule
 *      beats any utility a component could add. Don't re-declare it, and never
 *      add `focus:outline-none`.
 *
 *   6. §2.6 ships only what `DEMOS` holds — two concept sites we own outright.
 *      contact.ts carries the reason in full: a spec build made for a live
 *      prospect (Williamson, Caribbean Spice, Clahvay, Istanbul) reads as
 *      "client" to every visitor, which is untrue and risks the deal. A build
 *      graduates onto this page the day that client pays.
 *
 * STANDING CONFLICT, logged in DECISIONS.md: the v2 business cards in
 * circulation are printed with "See exactly what I'd build for your business
 * →". The §2.4 heading below says *restaurant*, per the newer spec. A prospect
 * scanning a card lands on a page that says something slightly different.
 * Josh's call whether to reprint or to soften the heading — not an accident,
 * don't quietly "fix" it either way.
 */

/**
 * The one column the whole page lives in.
 *
 * 820px is the narrowest max-width that still holds the desktop hero to three
 * lines at 56px — at 760px it wraps to four. The 20px mobile gutter is what
 * keeps characters-per-line sane down to a 360px phone. Measured, not chosen;
 * don't tighten either without re-measuring the hero wrap.
 */
const SHELL = 'mx-auto w-full max-w-[820px] px-5 sm:px-8';

/** Nothing reads past 65 characters. */
const MEASURE = 'max-w-[65ch]';

/** Body: 18px desktop / 17px mobile, 1.6. Supporting lines are muted, primary lines are black. */
const PARA = `${MEASURE} text-[17px] leading-[1.6] text-muted sm:text-[18px]`;

/** Section heading: 32px / 26px, weight 600. There are no eyebrow labels above these — sentence case, nothing else. */
/**
 * The mobile type scale is 32 / 26 / 22 — hero, audit box, every other section.
 *
 * It used to be 27 / 26 / 26, which is not a scale. The hero was clamped down
 * until it fit the spec's "three lines at 375px" and nothing else moved, so on
 * a phone the h1 measured 3% larger than the h2s and the page had six headings
 * of equal rank and no title. The eye had no entry point and landed on the
 * black button instead.
 *
 * The spec asks for a 36px mobile hero AND a three-line maximum, and those two
 * cannot both hold for a 78-character headline — 36px would need 464px of
 * column and no phone has it. Something had to give. Giving up type size costs
 * one extra line; giving up hierarchy costs the reader the top of the page. So
 * the hero is 32px over four lines, and the section headings drop to 22px to
 * get out of its way.
 */
const H2 = 'text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[32px]';

/**
 * Buttons: 8px radius, 48px minimum target. Hover changes colour and nothing
 * else — no lift, no shadow, no transform.
 */
const BTN =
  'inline-flex min-h-[48px] items-center justify-center rounded-[8px] px-6 text-[16px] font-semibold no-underline transition-colors';
const BTN_PRIMARY = `${BTN} bg-ink text-paper hover:bg-muted`;
const BTN_SECONDARY = `${BTN} border border-ink bg-paper text-ink hover:bg-surface`;

/**
 * The dot is sized in `em` off the mark's own font-size, so the header mark
 * (20px) and the footer mark (16px) stay in proportion instead of carrying two
 * hand-tuned pixel values. 9px and 6px at a 20px mark — the numbers live in
 * brand.ts, this is just the divisor.
 */
const MARK_PX = 20;
const DOT_STYLE = {
  width: `${WORDMARK.dotSize / MARK_PX}em`,
  height: `${WORDMARK.dotSize / MARK_PX}em`,
  marginLeft: `${WORDMARK.dotGap / MARK_PX}em`,
};

/**
 * `foundos` and the dot. The dot is decorative — it means "running" — so it is
 * aria-hidden, which leaves the link's accessible name as the word alone.
 */
function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-semibold tracking-[-0.02em] text-ink ${className}`}>
      {WORDMARK.text}
      <span aria-hidden="true" className="inline-block shrink-0 rounded-full bg-dot" style={DOT_STYLE} />
    </span>
  );
}

/** §2.5. Bold lead-in, plain sentence, no icons — the lead-in does the icon's job. */
const BUILDS = [
  {
    lead: 'A website that actually sells',
    rest: 'ordering and payments built in, so you stop handing a cut of every ticket to the apps.',
  },
  {
    lead: 'Bookings customers make themselves',
    rest: 'at midnight, straight into your calendar.',
  },
  {
    lead: 'An AI that answers every call',
    rest: 'takes the order, books the table. A ringing phone stops being a lost customer.',
  },
  {
    lead: 'Reviews asked for automatically',
    rest: 'and the regulars who drifted away quietly brought back.',
  },
  {
    lead: 'Your Google listing fixed',
    rest: "so you're the obvious choice the moment someone searches nearby.",
  },
  {
    lead: 'Every order, call, and dollar on one screen',
    rest: "so you finally see what's working.",
  },
] as const;

/**
 * Structured data. The spec's section list has no entry for it, so building
 * strictly to the list would silently drop the whole block — it is carried
 * forward deliberately. `name` is the mark without ".ai", and the description
 * is the hero's own sentence from brand.ts so the two can't drift.
 */
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

export default function HomePage() {
  return (
    <div id="top" className="bg-paper text-ink">
      {/* Escaping `<` is the documented guard against an XSS injection through
          a stringified payload. Nothing here is user input today; the escape
          stays so it can't become a hole when something dynamic is added. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, '\\u003c') }}
      />

      {/* ── 2.1 Header ─────────────────────────────────────────────────────
          Sticky with pure CSS. No scroll listener, no client component. */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
        <div className={`${SHELL} flex h-16 items-center justify-between`}>
          {/* min-h-11 is 44px — the tap-target floor. The header row is already
              64px, so this costs nothing visually and makes the wordmark and
              the two links thumb-sized on a phone. */}
          <a href="#top" className="inline-flex min-h-11 items-center no-underline">
            <Wordmark className="text-[20px]" />
          </a>
          <nav className="flex items-center gap-6 text-[14px]">
            <a
              href={`sms:${PHONE}`}
              className="inline-flex min-h-11 items-center text-muted no-underline hover:text-ink"
            >
              Text me
            </a>
            {/* Mobile keeps one ask. Calendly is the desktop-only second door. */}
            <a
              href={CAL}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-11 items-center text-muted no-underline hover:text-ink sm:inline-flex"
            >
              Book 20 minutes
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── 2.2 Hero ─────────────────────────────────────────────────────
            Headline, subhead, two buttons. Nothing else above the fold. */}
        <section className={`${SHELL} pb-12 pt-16 sm:pb-16 sm:pt-24`}>
          <h1 className="text-balance text-[clamp(2rem,8.2vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            I build and run the online side of restaurants and food businesses in
            Atlanta.
          </h1>

          <p className={`${PARA} mt-6`}>
            You&apos;re good at what you do.
            <br />
            The internet doesn&apos;t show it.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className={BTN_PRIMARY} href={`sms:${PHONE}`}>
              Text me — {PHONE_PRETTY}
            </a>
            {/* An anchor, not a button — it moves the page, it doesn't act. */}
            <a className={BTN_SECONDARY} href="#report">
              See what I&apos;d build for you ↓
            </a>
          </div>
        </section>

        {/* ── 2.3 The problem ───────────────────────────────────────────── */}
        <section className={`${SHELL} pb-16 sm:pb-24`}>
          <p className={PARA}>
            Your hours are wrong on Google.
            <br />
            Your menu is a photo from three years ago.
            <br />
            The phone rings while your hands are full.
          </p>
          <p className={`${MEASURE} mt-6 text-[17px] font-semibold leading-[1.6] text-ink sm:text-[18px]`}>
            So I build the part you don&apos;t have time for.
          </p>
        </section>

        {/* ── 2.4 The audit box ──────────────────────────────────────────────
            The front door. It stays directly under §2.3 — do not push it below
            the service list again. `scroll-mt-16` clears the sticky header when
            the hero button lands here.

            On "it gets the most vertical space of any section": taken literally
            that is unreachable. Measured at rest, this section is 484px and
            §2.5 is 906px, because §2.5 has six items of real copy and this one
            has a heading and an input. Closing a 422px gap with padding means
            ~400px of empty white, which reads as a broken page, not as
            emphasis. So the spec's intent is served a different way — this
            heading is the only h2 on the page that steps above the 26/32
            section scale, and the section carries the most padding. It should
            read as the most important thing below the hero, because it is.
            Everything under it is a reason to come back up here and type. */}
        <section id="report" className="scroll-mt-16 border-t border-hairline">
          <div className={`${SHELL} py-24 sm:py-32`}>
            <h2 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.015em] text-ink sm:text-[40px]">
              See exactly what I&apos;d build for your restaurant.
            </h2>
            <p className={`${PARA} mt-5`}>
              Type the name. I&apos;ll pull your Google listing and your site and show
              you what&apos;s costing you customers right now — and what I&apos;d do
              about it.
            </p>
            {/* The widget owns the input, the result panel (the one motion
                moment on the site), the "Free. About 10 seconds. No email."
                line, and the phone capture. Nothing about it belongs here. */}
            <div className="mt-10">
              <InstantReport />
            </div>
          </div>
        </section>

        {/* ── 2.5 What I build ──────────────────────────────────────────── */}
        <section className="border-t border-hairline">
          <div className={`${SHELL} py-14 sm:py-20`}>
            <h2 className={H2}>What I build.</h2>

            <ul className={`${MEASURE} mt-8 border-t border-hairline`}>
              {BUILDS.map((item) => (
                <li
                  key={item.lead}
                  className="border-b border-hairline py-4 text-[17px] leading-[1.6] text-muted sm:text-[18px]"
                >
                  <strong className="font-semibold text-ink">{item.lead}</strong> —{' '}
                  {item.rest}
                </li>
              ))}
            </ul>

            <p className={`${MEASURE} mt-8 text-[17px] font-semibold leading-[1.6] text-ink sm:text-[18px]`}>
              Then I run it. Every week. So you never think about it again.
            </p>
            <p className={`${PARA} mt-3`}>
              You own all of it — your domain, your site, your data. If you ever
              leave, you take it with you.
            </p>
          </div>
        </section>

        {/* ── 2.6 Open something I've built ──────────────────────────────── */}
        <section className="border-t border-hairline">
          <div className={`${SHELL} py-14 sm:py-20`}>
            <h2 className={H2}>Open something I&apos;ve built.</h2>
            <p className={`${PARA} mt-4`}>
              These are concepts — the businesses aren&apos;t real, everything on the
              sites works. Click around, place a fake order, try the booking.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {DEMOS.map((demo) => (
                <li key={demo.href}>
                  <Link
                    href={demo.href}
                    className="flex h-full flex-col gap-2 border border-hairline bg-surface p-6 no-underline hover:border-ink"
                  >
                    <span className="text-[18px] font-semibold text-ink">{demo.label}</span>
                    <span className="text-[17px] leading-[1.6] text-muted">{demo.note}</span>
                    <span className="mt-2 text-[14px] font-semibold text-ink">Open →</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[14px] leading-[1.6] text-muted">
              Concept businesses. Built to show you the real thing, not a template.
            </p>
          </div>
        </section>

        {/* ── 2.7 Don't take my word for it ──────────────────────────────── */}
        <section className="border-t border-hairline">
          <div className={`${SHELL} py-14 sm:py-20`}>
            <h2 className={H2}>Don&apos;t take my word for it.</h2>
            <p className={`${PARA} mt-4`}>
              Call the AI receptionist and order a slab of ribs out loud. It&apos;ll
              take the order — and tell you it&apos;s AI.
            </p>
            <div className="mt-8">
              <a className={BTN_PRIMARY} href={`tel:${DEMO_LINE}`}>
                Call {DEMO_LINE_PRETTY}
              </a>
            </div>
          </div>
        </section>

        {/* ── 2.8 What it costs ──────────────────────────────────────────────
            Owners bounce when they assume an agency quote is coming, so the
            number is on the page instead of in a call. Every figure below is
            read from PRICES — there is no price string in this file. */}
        <section className="border-t border-hairline">
          <div className={`${SHELL} py-14 sm:py-20`}>
            <h2 className={H2}>What it costs.</h2>

            <p className={`${PARA} mt-6`}>
              <strong className="font-semibold text-ink">
                The site — {PRICES.site.display}, {PRICES.site.cadence}.
              </strong>{' '}
              Built from your real menu, photos, and hours. You own it outright.
            </p>

            <p className={`${PARA} mt-5`}>
              <strong className="font-semibold text-ink">
                Running it — {PRICES.running.prefix} {PRICES.running.display}{' '}
                {PRICES.running.cadence}.
              </strong>{' '}
              Hosting, Google listing kept correct, review requests, menu changes, a
              monthly one-page report. Cancel any time; you keep the site.
            </p>

            <p className={`${PARA} mt-5`}>
              <strong className="font-semibold text-ink">
                Online ordering, bookings, the AI receptionist
              </strong>{' '}
              — added when you want them, priced when we talk. Most pay for themselves
              in saved delivery-app fees the first month.
            </p>

            <p className={`${PARA} mt-6`}>
              Free to start: type your name above and I&apos;ll build a sample first.
              If you don&apos;t like it, you owe nothing and you never hear from me
              again.
            </p>
          </div>
        </section>

        {/* ── 2.9 Who's building it ──────────────────────────────────────────
            NO PHOTO, AND THAT IS THE DECISION — not a gap waiting to be filled.

            This ran for a while as a 240px grey square holding a photo's place.
            A fresh-eyes review put it plainly: a page with no images reads as
            "I chose type"; a page with a bordered grey box where a face
            obviously belongs reads as "the photo isn't back from the shoot" —
            and it re-reads every other restrained thing on the page as unfinished
            too. The box was worse than no box, in the one section whose entire
            job is making a stranger believe there's a person here.

            Neither photo in public/ could fill it. josh.jpg is a 320px snapshot
            at a music night with another woman's face centred in frame and more
            people behind — nobody in it agreed to appear on a business site.
            josh.png has him looking down at a laptop, which reads as busy rather
            than reachable in a section headed "you text me, I answer".

            So the paragraphs carry it alone, and they can: they're the most
            human writing on the page. When Josh has a portrait he's happy with —
            facing the lens, plain background — this becomes a two-column row
            again with a real <Image> and real alt text. Until then, nothing here
            is missing. */}
        <section className="border-t border-hairline">
          <div className={`${SHELL} py-14 sm:py-20`}>
            <h2 className={H2}>One person. Not an agency.</h2>

            <div className="mt-8 flex flex-col gap-5">
              <p className={PARA}>
                I&apos;m Josh. I&apos;m in Atlanta, I work in a gym, and I&apos;ve
                been building sites for restaurants and food businesses because most
                of them are getting robbed by delivery apps and a Wix template from
                2019.
              </p>
              <p className={PARA}>
                You text me, I answer. No account manager, no ticket system.
              </p>
              <p className={PARA}>If I can&apos;t help you, I&apos;ll tell you that too.</p>
            </div>
          </div>
        </section>

        {/* ── 2.10 Final call ────────────────────────────────────────────── */}
        <section className="border-t border-hairline">
          <div className={`${SHELL} py-14 sm:py-20`}>
            <p className={`${MEASURE} text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink sm:text-[24px]`}>
              Tell me what you run and I&apos;ll tell you straight whether I can help.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className={BTN_PRIMARY} href={`sms:${PHONE}`}>
                Text me — {PHONE_PRETTY}
              </a>
              <a className={BTN_SECONDARY} href={CAL} target="_blank" rel="noreferrer">
                Book 20 minutes
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── 2.11 Footer ──────────────────────────────────────────────────────
          One line, and one line only down to 360px.

          Each separator is bound to the item that FOLLOWS it, inside the same
          flex child. When the row wrapped with the dots as their own children,
          a phone got "foundos · hello@foundos.ai · Atlanta, GA ·" and then a
          line break — a dot dangling at the end of the line with nothing after
          it. Now a separator can only ever wrap down together with its item.

          The dots are aria-hidden so a screen reader reads four items rather
          than four middle dots. Both links carry the same 44px tap floor as the
          header; the row is taller than a pure text line as a result, which is
          the right trade for the last thing on a 5,000px page. */}
      <footer className="border-t border-hairline">
        <div
          className={`${SHELL} flex flex-wrap items-center gap-x-3 gap-y-1 py-8 text-[14px] leading-[1.6] text-muted`}
        >
          <Wordmark className="text-[16px]" />

          <span className="inline-flex items-center gap-x-3">
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 items-center no-underline hover:text-ink"
            >
              {EMAIL}
            </a>
          </span>

          <span className="inline-flex items-center gap-x-3">
            <span aria-hidden="true">·</span>
            <span>
              {LOCATION.city}, {LOCATION.region}
            </span>
          </span>

          <span className="inline-flex items-center gap-x-3">
            <span aria-hidden="true">·</span>
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center no-underline hover:text-ink"
            >
              Privacy
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
