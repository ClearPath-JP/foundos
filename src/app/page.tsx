import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { LiquidBackground } from '@/components/fx/LiquidBackground';
import { AuditForm } from '@/components/landing/AuditForm';
import { LandingShell } from '@/components/landing/LandingShell';

/**
 * foundos.ai is one landing page (2026-10-09, launch pack `foundos-launch-pack/01-PRODUCT-PAGE-FORM.md`):
 * a free 3-point digital growth audit for service businesses, reviewed by Josh by hand.
 * Reel → comment AUDIT → DM → this page → Tally form → Josh emails the audit.
 *
 * Copy is the pack's, verbatim. No prices, no portfolio, no nav: the old restaurant-offer homepage is in git at
 * 918db3a, and its pages redirect here (next.config.ts).
 */

const TITLE = 'Free 3-Point Digital Growth Audit | FoundOS';
const DESCRIPTION =
  'Request a free review from Josh at FoundOS. Get three practical improvements for your service business’s website, lead capture, and follow-up.';

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

const FAQ = [
  {
    q: 'What will I receive?',
    a: 'A short Loom video or PDF with three practical improvements and the change I’d tackle first, sent to your email and your Instagram DM. I review every business personally.',
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
] as const;

export default function HomePage() {
  return (
    <LandingShell>
      {/* ── Hero: the promise on the left, the live form on the right (stacked on a phone) ── */}
      <section className="lp-hero" id="request" aria-labelledby="hero-h">
        <LiquidBackground />
        <div className="fx-wrap lp-hero-grid">
          <div className="lp-hero-copy">
            <p className="fx-eyebrow">Free 3-point digital growth audit</p>
            <h1 className="lp-h1" id="hero-h">
              Your next inquiry should have a <span className="lp-grad">clear next step.</span>
            </h1>
            <p className="lp-lede">
              I’m Josh, founder of FoundOS. I’ll personally review your website or business profile and send you a short
              Loom video or PDF with three practical ways to make your offer clearer, capture inquiries, and improve
              follow-up, by email and Instagram DM.
            </p>
            <ul className="lp-ticks" role="list">
              <li>Free. Reviewed personally by Josh.</li>
              <li>No obligation to buy.</li>
            </ul>
          </div>

          <div className="lp-form-card">
            <h2 className="lp-form-h">Request your free audit</h2>
            <p className="lp-form-intro">
              Share your website or business profile and a little context. I’ll send your audit to the email and
              Instagram account you give me, and ask there if I need anything else.{' '}
              <Link href="/privacy">Privacy notice</Link>.
            </p>
            <AuditForm />
          </div>
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
              A practical review from the person behind FoundOS.
            </h2>
            <p className="fx-p">
              I’m Josh. FoundOS helps service businesses with websites, lead capture, marketing automation, and
              follow-up. For this audit, I’ll focus on three useful improvements you can understand and act on.
            </p>
            <p className="lp-sign">— Josh</p>
            <a href="#request" className="fx-btn fx-btn--p fx-btn--lg lp-again">
              Get my free audit <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </section>

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
