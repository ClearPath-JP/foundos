import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { LiquidBackground } from '@/components/fx/LiquidBackground';
import { AuditForm } from '@/components/landing/AuditForm';
import { LandingShell } from '@/components/landing/LandingShell';
import {
  ContactSection,
  NextSteps,
  ServiceCards,
  WhyMonthly,
  WorkConcepts,
} from '@/components/landing/Services';
import { PRICES, usd } from '@/config/services';
import { StoryChapters } from '@/components/landing/StoryChapters';

/**
 * foundos.ai is one landing page. 2026-10-09: a free audit page (launch pack `foundos-launch-pack/01-PRODUCT-PAGE-FORM.md`).
 * 2026-10-11: it also sells FoundOS's services with founding-client prices (src/config/services.ts, DRAFT).
 * The audit route is unchanged: Reel → comment AUDIT → DM → this page → Tally form (#request) → Josh sends the audit.
 *
 * Copy is the pack's, verbatim. No prices, no portfolio, no nav: the old restaurant-offer homepage is in git at
 * 918db3a, and its pages redirect here (next.config.ts).
 */

/* DRAFT — NOT APPROVED FOR PUBLIC USE (2026-10-11 services page): TITLE and DESCRIPTION.
   The 2026-10-10 audit-page versions were: 'Free Digital Experience Audit | FoundOS' /
   'Request a Free Digital Experience Audit from Josh at FoundOS: a personalized Loom video on your offer, how easy you
   are to reach, and your follow-up.' */
const TITLE = 'FoundOS | Custom websites for Marietta restaurants and local businesses';
const DESCRIPTION =
  'Custom websites built around your business and looked after every month: $299/month with no upfront setup fee. Hosting, updates, local SEO and a local point of contact. Free website audit available.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './', siteName: 'FoundOS', type: 'website', locale: 'en_US' },
};

/** The three checks. `looks` is what I actually open and test, so the row reads as work, not a slogan. */
const CHECKS = [
  {
    t: 'Make the offer clear',
    d: 'Can someone quickly understand what you do, who you help, and how to get started? I’ll look for confusing wording and missing next steps.',
    looks: ['Your first screen', 'Headline & wording', 'The next step'],
  },
  {
    t: 'Make it easy to inquire',
    d: 'I’ll check your links, calls to action, and request process for friction that could stop an interested visitor from reaching you.',
    looks: ['Buttons & links', 'Forms on a phone', 'Contact options'],
  },
  {
    t: 'Give each inquiry a next step',
    d: 'I’ll review what happens after someone reaches out, using what’s visible and the details you share. You’ll get a practical suggestion for your follow-up process.',
    looks: ['What visitors are told', 'Response expectations', 'What you share'],
  },
] as const;

/* DRAFT — NOT APPROVED FOR PUBLIC USE (2026-10-10): the first, fifth and sixth answers are new or rewritten. */
const FAQ = [
  {
    q: 'Do I have to switch my POS or ordering system?',
    a: 'Usually not. If you already use Square, Toast, Clover or a booking tool, your website links to it. New direct-ordering setups and complex POS migrations are quoted separately and aren’t part of the $299 plan.',
  },
  {
    q: 'Will this get me to the top of Google?',
    a: 'No one can honestly promise that. Every site gets basic local SEO and AEO, which means clear page structure and business details that search engines and AI assistants can read. That gives you a solid foundation, not a guaranteed ranking.',
  },
  {
    q: 'What’s the difference between $299 and $499?',
    a: 'At $299 a month you get the website, hosting, maintenance and two small updates a month. Growth is $499 a month in total, not on top, and adds one system we scope together, like automatic follow-up for inquiries or Instagram DM replies.',
  },
  {
    q: 'What will I receive from the free audit?',
    a: 'A personalized Loom video walking through your offer, how easy it is to reach you, and what’s visible about how you respond and follow up, plus the change I’d tackle first. The length depends on what I find. I’ll send the private link by email, and by Instagram DM if you share your handle.',
  },
  {
    q: 'Do I need a website?',
    a: 'No. Share your Instagram, Google Business Profile, or another public business page instead.',
  },
  {
    q: 'Is this really free?',
    a: 'Yes. The review is free, and you don’t need to book a call or buy anything to receive it.',
  },
  {
    q: 'Will you need my passwords?',
    a: 'No. This audit uses your public pages and the information you choose to share.',
  },
  {
    q: 'How long does it take?',
    a: 'My goal is five business days from your request. It’s a goal, not a guarantee. Requests are handled in a queue, and if I’m running behind, I’ll message you with an updated time.',
  },
  {
    q: 'Will you follow up?',
    a: 'Once. A few days after you get the video, I’ll check in personally to see if you have questions. No automated sales emails.',
  },
] as const;

export default function HomePage() {
  return (
    <LandingShell>
      {/* ── 1. Hero (2026-10-11 services page). DRAFT — NOT APPROVED FOR PUBLIC USE: eyebrow, headline, lede, buttons.
           The audit link stays visible here so the Reel → DM → page → form route keeps working. ── */}
      <section className="lp-hero" aria-labelledby="hero-h">
        <LiquidBackground />
        <div className="fx-wrap lp-hero-grid">
          <div className="lp-hero-copy">
            <p className="fx-eyebrow">FoundOS · Marietta, GA</p>
            <h1 className="lp-h1" id="hero-h">
              Your business, <span className="lp-grad">online the way it feels in person.</span>
            </h1>
            <p className="lp-lede">
              I’m Josh, founder of FoundOS. I build custom websites for restaurants and local service businesses,
              designed around your atmosphere, your hospitality and how you actually run, then host and look after
              them every month. You keep the POS and tools you already use.
            </p>
            <p className="lp-hero-price">
              <strong>{usd(PRICES.care)}/month.</strong> No upfront setup fee for a standard website.
            </p>
            <div className="lp-hero-btns">
              <a href="#services" className="fx-btn fx-btn--p fx-btn--lg">
                See pricing <span aria-hidden="true">↓</span>
              </a>
              <a href="#request" className="fx-btn fx-btn--s fx-btn--lg">
                Get a website
              </a>
            </div>
            <p className="lp-hero-audit">
              Or start with a <a href="#request">Free Digital Experience Audit</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Pricing straight after the hero (Josh, 2026-10-12: "sees the pricing, easily understand what's offered"),
           then why the monthly price is worth it. Prices: src/config/services.ts. ── */}
      <ServiceCards />
      <WhyMonthly />

      {/* ── 3. Philosophy + the customer journey: Ch 1–2 of the story. ── */}
      <StoryChapters only={[1, 2]} />
      <NextSteps />

      {/* ── 6. How it connects and how I work: Ch 3–4 of the story (Ch 4 published 2026-10-12). ── */}
      <StoryChapters only={[3, 4]} />

      {/* ── 7. Concept work. ── */}
      <WorkConcepts />

      {/* ── Founder ──────────────────────────────────────────────────── */}
      <section className="lp-sec" aria-labelledby="founder-h">
        <div className="fx-wrap lp-founder">
          <figure className="lp-portrait">
            <Image
              src="/josh-portrait.jpg"
              alt="Josh, founder of FoundOS, working on a laptop"
              width={760}
              height={950}
              sizes="(min-width:860px) 420px, 92vw"
            />
          </figure>
          <div>
            <h2 className="lp-h2" id="founder-h">
              Local, founder-led, and hands-on.
            </h2>
            <p className="fx-p">
              I’m Josh, and I’m based in the Marietta area. FoundOS is new, so I won’t pretend to have a wall of
              client logos. What I do have is the time to learn how your business works, build a website that feels
              like it, and stay the person you call when something needs changing.
            </p>
            <p className="lp-sign">— Josh</p>
            <a href="#request" className="fx-btn fx-btn--p fx-btn--lg lp-again">
              Get started <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. The Free Digital Experience Audit. The existing audit copy (DRAFT, 2026-10-10), moved down from the hero
           word for word, then what I review, then the live form, unchanged. ⚠️ Consent checkbox and offer wording are
           still open; see docs/founder-approval-review-2026-10-11.md and docs/tally-consent-checkbox-guide-DRAFT.md. ── */}
      <section className="lp-sec lp-audit-intro" aria-labelledby="audit-h">
        <div className="fx-wrap">
          {/* DRAFT — NOT APPROVED FOR PUBLIC USE (2026-10-10): eyebrow, lede and the third tick. Headline unchanged. */}
          <p className="fx-eyebrow">Free Digital Experience Audit</p>
          <h2 className="lp-h2" id="audit-h">
            Your next inquiry should have a <span className="lp-grad">clear next step.</span>
          </h2>
          <p className="lp-lede">
            I’m Josh, founder of FoundOS. I’ll personally review your website or business profile and record a Loom
            video walking you through what I see: how clearly your offer comes across, how easy it is to take the
            next step, and what a customer can see about how you respond and follow up. I’ll send the private link by
            email, and by Instagram DM if you share your handle.
          </p>
          <ul className="lp-ticks" role="list">
            <li>Free. Reviewed personally by Josh.</li>
            <li>No obligation to buy.</li>
            <li>My goal is five business days, not a guarantee. If there’s a wait, I’ll tell you.</li>
          </ul>
        </div>
      </section>

      {/* ── The three checks: a dark band, three numbered columns joined by a rail ── */}
      <section className="lp-checks" aria-labelledby="checks-h">
        <div className="fx-wrap">
          <p className="lp-checks-kicker">What I review</p>
          <h2 className="lp-h2 lp-h2--light" id="checks-h">
            Three checks. Three practical next steps.
          </h2>
          <ol className="lp-steps" role="list">
            {CHECKS.map((c, i) => (
              <li key={c.t} className="lp-step">
                <span className="lp-step-n" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="lp-step-t">{c.t}</h3>
                <p className="lp-step-d">{c.d}</p>
                <ul className="lp-step-looks" role="list" aria-label="What I look at">
                  {c.looks.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The form: the same card and live Tally embed that sat in the hero until 2026-10-11, moved, not changed.
           #request is the anchor every CTA (and any shared link) points at. ── */}
      <section className="lp-sec lp-request" id="request" aria-labelledby="request-h">
        <LiquidBackground />
        <div className="fx-wrap lp-request-wrap">
          <div className="lp-form-card">
            <h2 className="lp-form-h" id="request-h">
              Get your free audit, or start your website
            </h2>
            <p className="lp-form-intro">
              Share your website or business profile and a little context. It comes straight to my inbox. I’ll send
              your audit, and if you’re interested in a website, say so in the form and I’ll include a price.{' '}
              <Link href="/privacy">Privacy notice</Link>.
            </p>
            <AuditForm />
          </div>
        </div>
      </section>

      {/* ── 10. Contact, then FAQ. ── */}
      <ContactSection />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="lp-sec lp-faq-sec" aria-labelledby="faq-h">
        <div className="fx-wrap">
          <h2 className="lp-h2" id="faq-h">
            Questions
          </h2>
          <div className="lp-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </LandingShell>
  );
}
