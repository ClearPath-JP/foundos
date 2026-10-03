import type { Metadata } from 'next';
import Link from 'next/link';

import Reveal from '@/components/contact/Reveal';
import { CloseBand, Faq, PlanCards, ProjectCards } from '@/components/fx/cards';
import { HOME_FAQ } from '@/components/fx/faq';
import Shell from '@/components/fx/Shell';
import { WorkFeature } from '@/components/fx/work';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { NoiseTexture } from '@/components/ui/noise-texture';
import { CONTACT, PLANS } from '@/config/offer';
import { FEATURED_WORK } from '@/config/work';

import { SITE_URL } from './site';

/**
 * The homepage — managed digital care for restaurants. Rebuilt 2026-10-01 from
 * "FoundOS Website and Offer Implementation" (repo root .docx), §6 page order
 * and §7 copy: hero, what foundos handles, plans, projects, how it works, FAQ.
 * 2026-10-01 evening: price moved up into the hero, the concept build moved to
 * second (proof right after the promise), and "Text Josh" is the main button.
 *
 * Keeps the 2026-09-30 purple system (now in components/fx). The previous
 * homepage — general local tech help with the free checkup — is in git at
 * 2026fb1; its form component (CheckupForm) is untouched.
 */

const TITLE = 'foundos | Restaurant websites, managed for you';
const DESCRIPTION =
  'foundos builds and manages your restaurant’s website, keeps your Google profile accurate and helps inquiries reach your team. From $299 a month, no setup fee.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  /* Page-level openGraph replaces layout.tsx's whole block, so every field is restated. */
  openGraph: { title: TITLE, description: DESCRIPTION, url: './', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

/** Only verified facts: no street address, no ratings, no hours. */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'foundos',
  url: SITE_URL,
  email: CONTACT.email,
  telephone: '+1-404-436-3393',
  founder: { '@type': 'Person', name: 'Josh Potesta' },
  address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' },
  areaServed: { '@type': 'City', name: 'Marietta' },
  description: 'Managed websites and digital upkeep for independent restaurants.',
  makesOffer: PLANS.map((p) => ({
    '@type': 'Offer',
    name: p.name,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: p.monthly,
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
  })),
};

/** What foundos handles, doc §6 — in owner language, each with the moment it matters. */
const HANDLES = [
  {
    t: 'Your website',
    d: 'Built for you, hosted, kept fast and kept up to date.',
    e: 'The menu online still has last year’s prices.',
  },
  {
    t: 'Your business information',
    d: 'Hours, links and details kept right on your site and Google.',
    e: 'Google says you close at 5. You close at 9.',
  },
  {
    t: 'Your forms',
    d: 'Catering and event inquiries land with the right person.',
    e: 'A catering request sat in an inbox nobody checks.',
  },
  {
    t: 'Your follow-up',
    d: 'Customers hear back, and you get reminded when they haven’t.',
    e: 'The party of 40 booked somewhere that answered first.',
  },
] as const;

/**
 * The hero visual: what an owner receives each month, drawn as a sheet. An
 * example of the kinds of work, not a report from any real restaurant — no
 * names and no numbers.
 */
const UPDATE = [
  { t: 'Holiday hours updated on your website and Google' },
  { t: 'Three menu prices changed' },
  { t: 'Catering inquiry sent to you, and the customer got a reply', tag: 'Growth' },
  { t: 'Monthly summary: visits, calls and form sends', bars: true },
] as const;

const STEPS = [
  { t: 'Choose a plan or project', d: 'Tell me about your restaurant. I’ll confirm it fits before anything is billed.' },
  { t: 'Send what I need', d: 'Your menu, prices, logo, photos and access to your accounts.' },
  { t: 'Approve the work', d: 'You see the site before it goes live. Two rounds of changes are included.' },
  { t: 'I keep it right', d: 'Send changes any time. You get a short summary every month.' },
] as const;

export default function HomePage() {
  return (
    <Shell current={null}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, '\\u003c') }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="fx-hero">
        <div className="fx-wash" aria-hidden="true" />
        <NoiseTexture className="fx-noise" aria-hidden="true" frequency={0.65} noiseOpacity={1} />
        <div className="fx-wrap fx-hero-grid">
          <div>
            <p className="fx-eyebrow">For independent restaurants · Marietta &amp; metro Atlanta</p>
            <h1 className="fx-h1">
              Your restaurant’s digital details, <span className="fx-accent">taken care of.</span>
            </h1>
            <p className="fx-lede">
              foundos builds and manages your website, keeps key business information accurate, and helps customer
              inquiries reach the right people.
            </p>
            <p className="fx-price">
              <span className="fx-price-n">${PLANS[0].monthly}</span>
              <span className="fx-price-per">/month</span>
              <span className="fx-price-sub">{PLANS[0].name} plan · Website included · No setup fee</span>
            </p>
            <div className="fx-btns fx-btns--tight">
              <InteractiveHoverButton href={`sms:${CONTACT.phone}`} className="fx-ihb">
                Text Josh · {CONTACT.phonePretty}
              </InteractiveHoverButton>
              <Link href="/audit" className="fx-btn fx-btn--s fx-btn--lg">
                Get my free growth audit →
              </Link>
            </div>
          </div>

          <div className="fx-card-stage" aria-hidden="true">
            <div className="fx-sheet">
              <p className="fx-sheet-k">Example monthly update</p>
              <p className="fx-sheet-h">What got done for your restaurant this month</p>
              <ol className="fx-sheet-list">
                {UPDATE.map((row, i) => (
                  <li key={row.t}>
                    <span className="fx-sheet-n">{i + 1}</span>
                    <div>
                      <p className="fx-sheet-t">{row.t}</p>
                      {'bars' in row && (
                        <>
                          <span className="fx-bar" style={{ width: '86%' }} />
                          <span className="fx-bar fx-bar--short" />
                        </>
                      )}
                      {'tag' in row && <span className="fx-tag">{row.tag}</span>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work: proof right after the promise. A concept, and it says so. ── */}
      <section className="fx-sec fx-sec--tint" aria-labelledby="work-h">
        <div className="fx-wrap">
          <WorkFeature item={FEATURED_WORK} />
        </div>
      </section>

      {/* ── What foundos handles ─────────────────────────────────────── */}
      <section className="fx-sec" aria-labelledby="handles-h">
        <Reveal>
          <div className="fx-wrap">
            <p className="fx-kicker">What foundos handles</p>
            <h2 className="fx-h2" id="handles-h">
              The details customers notice when they’re wrong.
            </h2>
            <ul className="fx-handles" role="list">
              {HANDLES.map((h) => (
                <li key={h.t} className="fx-help-item">
                  <p className="fx-help-t">{h.t}</p>
                  <p className="fx-help-d">{h.d}</p>
                  <p className="fx-help-e">“{h.e}”</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ── Plans ────────────────────────────────────────────────────── */}
      <section className="fx-sec fx-sec--tint" id="plans" aria-labelledby="plans-h">
        <div className="fx-wrap">
          <p className="fx-kicker">Monthly plans</p>
          <h2 className="fx-h2" id="plans-h">
            One price a month. The website is included.
          </h2>
          <p className="fx-p">
            Both plans include building your website, so there is no setup fee. Digital Care keeps everything accurate.
            Growth adds follow-up, for restaurants with catering or events worth chasing.
          </p>
          <PlanCards />
          <p className="fx-p">
            <Link href="/plans" className="fx-more">
              Compare the plans line by line
            </Link>
          </p>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <section className="fx-sec" id="projects" aria-labelledby="projects-h">
        <div className="fx-wrap">
          <p className="fx-kicker">One-time projects</p>
          <h2 className="fx-h2" id="projects-h">
            Need one thing done? Buy just that.
          </h2>
          <p className="fx-p">
            Projects are paid once, and you don’t need a monthly plan to buy one.
          </p>
          <ProjectCards />
          <p className="fx-p">
            <Link href="/projects" className="fx-more">
              See every project, including the ones by request
            </Link>
          </p>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="fx-sec fx-sec--tint" aria-labelledby="how-h">
        <Reveal>
          <div className="fx-wrap">
            <p className="fx-kicker">How it works</p>
            <h2 className="fx-h2" id="how-h">
              You run the restaurant. I keep the rest right.
            </h2>
            <ol className="fx-steps" role="list">
              {STEPS.map((s) => (
                <li key={s.t}>
                  <p className="fx-step-t">{s.t}</p>
                  <p className="fx-step-d">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="fx-sec" aria-labelledby="faq-h">
        <div className="fx-wrap">
          <p className="fx-kicker">Questions</p>
          <h2 className="fx-h2" id="faq-h">
            What owners ask first
          </h2>
          <Faq items={HOME_FAQ} />
        </div>
      </section>

      <CloseBand
        title="You’ll work directly with Josh."
        body="I’m Josh Potesta, the founder of foundos, based in Marietta. Tell me about your restaurant and I’ll tell you which plan fits, or that neither does."
      />
    </Shell>
  );
}
