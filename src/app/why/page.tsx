import type { Metadata } from 'next';
import Link from 'next/link';

import MarkReveal from '@/components/MarkReveal';
import { LedgerHead, Linked, Marked, Rule, SHELL } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';

import { SITE_URL } from '../site';
import {
  ADS,
  APPS_AFTER,
  APPS_BEFORE,
  APPS_FIGURES,
  APPS_MATH,
  APPS_STAND,
  APPS_TAIL,
  CHECKS,
  CHECKS_STAND,
  FUNNEL,
  FUNNEL_STAND,
  JARGON,
  PROBLEM,
  WAIT,
  asSentence,
} from './copy';

/**
 * /why — the long version: what costs a food business customers online, what
 * the delivery-app markup really does, and how a stranger becomes a regular.
 *
 * Every word of the argument is the homepage's, moved here verbatim on
 * 2026-09-11 when the homepage became the short front door — see ./copy.ts and
 * the notes that came with it. This file only lays it out, in the service
 * family's devices (numbered rows, the wood arithmetic band, the recessed note),
 * so it reads as one of those pages rather than as half of the old homepage.
 *
 * ⚠️ THE SKIM PATH CAME WITH IT. Four of the homepage's eight marks sat in this
 * copy, and <MarkReveal /> is rendered here so they still turn colour.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'why',
  title: 'Why food businesses lose customers online — foundos',
  description:
    'Five things to check on your own phone, what marking a plate up on the delivery apps really costs, and how a stranger becomes a regular.',
  shareTitle: 'Where food businesses lose customers online',
  shareDescription:
    'Five things to check on your own phone, the delivery-app arithmetic, and how a stranger becomes a regular.',
});

const HEAD = {
  label: 'Why it matters',
  h1: 'Where food businesses lose customers online.',
  stand:
    'The long version: five things to check on your own phone, what the delivery apps really cost you, and how a stranger becomes a regular.',
};

const SECTIONS = {
  checks: { label: 'Check these yourself', h2: 'Five things I check first.' },
  apps: { label: 'What the apps cost you', h2: 'About the delivery apps' },
  funnel: { label: 'Four steps', h2: 'How a stranger becomes a regular.' },
};

/** The four skim-path phrases that live in this copy. Verbatim slices of ./copy. */
const MARKS = {
  hoursWrong: 'Your hours are wrong on Google.',
  chicken: "a cut of every ticket leaves the building before you've paid for the chicken",
  everyWeek: 'Every week the hours stay wrong is another week of people driving over to a locked door.',
  renting: 'You are renting them back by the plate.',
} as const;

const NO_MARKS: readonly string[] = [];

/** The three links that rode this copy on the homepage, each on a phrase already in it. */
const LINKS = {
  websites: { href: '/restaurant-websites', phrase: 'When I check a site' },
  ordering: { href: '/online-ordering', phrase: 'Ordering that lives on your own site' },
  listing: { href: '/google-business-profile', phrase: 'your Google listing' },
} as const;

/**
 * The five checks as an FAQPage — moved from the homepage with the checks,
 * because Google requires FAQ markup to match content visible on the same page.
 * Generated from CHECKS, never retyped. Unlikely to draw a Google rich result
 * (narrowed to government and health sites in 2023); Bing and answer engines
 * still read it.
 */
const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/why#faq`,
  about: { '@id': `${SITE_URL}/#business` },
  mainEntity: CHECKS.map((c) => ({
    '@type': 'Question',
    name: c.title,
    acceptedAnswer: { '@type': 'Answer', text: `${c.body} ${c.check}` },
  })),
};

/* The recessed note's ledger head stops at the panel, not the screen: the
   negative margin equals .sv-note's 20px padding. Same fix as the homepage's
   .eb-note. */
const WHY_CSS = `
.sv-note>.eb-lh{margin-right:-20px;}
@media (min-width:1024px){.sv-note>.eb-lh{max-width:none;}}
.why-anchor{scroll-margin-top:124px;}
`;

const CLOSE = 'Want these five checked on your place? Text me the name.';

export default function WhyPage() {
  return (
    <ServicePage slug="why" label={HEAD.label} h1={HEAD.h1} stand={HEAD.stand} close={CLOSE} css={WHY_CSS}>
      <MarkReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD).replace(/</g, '\\u003c') }}
      />

      {/* ── The problem, in three lines ──────────────────────────────────── */}
      <section aria-label="The problem">
        <div className={`${SHELL} eb-sec eb-sec--tight`}>
          <p className="eb-lede">
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
      <Rule />

      {/* ── Five things I check first ────────────────────────────────────── */}
      <section aria-labelledby="why-checks-h" id="checks" className="why-anchor">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={SECTIONS.checks.label} />
          <h2 className="eb-d eb-h2" id="why-checks-h">
            {SECTIONS.checks.h2}
          </h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{CHECKS_STAND}</p>
          <ol className="sv-list" role="list">
            {CHECKS.map((c) => (
              <li key={c.n} className="sv-item">
                <span className="sv-n">{c.n}</span>
                <div className="sv-body">
                  <h3 className="eb-h3">{c.title}</h3>
                  <p className="eb-p">
                    {c.n === '05' ? (
                      <Linked
                        text={c.body}
                        phrase={LINKS.websites.phrase}
                        href={LINKS.websites.href}
                        className="sv-a"
                      />
                    ) : (
                      <Marked text={c.body} phrases={c.n === '04' ? [MARKS.chicken] : NO_MARKS} />
                    )}
                  </p>
                  <p className="sv-do">{c.check}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="sv-block eb-mt">
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

      {/* ── About the delivery apps ──────────────────────────────────────── */}
      <section aria-labelledby="why-apps-h" id="apps" className="why-anchor">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={SECTIONS.apps.label} />
          <h2 className="eb-d eb-h2" id="why-apps-h">
            {SECTIONS.apps.h2}
          </h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{APPS_STAND}</p>
          {APPS_BEFORE.map((block) => (
            <div key={block.lead} className="sv-block">
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

      {/* ── The arithmetic, on the wood field ────────────────────────────────
          ⚠️ NOTHING IN THIS BAND MAY DROP BELOW 19px/700 and no skim mark may
          land on it: ink on wood is 4.24:1, legal for large-scale text only,
          and no colour reaches 4.5:1 here. Same device as /online-ordering. */}
      <Rule />
      <section aria-label="Worked example" className="eb-g-wood">
        <div className={`${SHELL} sv-math`}>
          <dl className="sv-figs">
            {APPS_FIGURES.map((f) => (
              <div key={f.k} className="sv-fig">
                <dt className="sv-fig-k">{f.k}</dt>
                <dd className="sv-fig-v">{f.v}</dd>
              </div>
            ))}
          </dl>
          {APPS_MATH.map((p) => (
            <p key={p} className="sv-math-p">
              {p}
            </p>
          ))}
        </div>
      </section>
      <Rule />

      <section aria-label="More on the delivery apps">
        <div className={`${SHELL} eb-sec--after-rule`}>
          {APPS_AFTER.slice(0, -1).map((block) => (
            <div key={block.lead} className="sv-block">
              <h3 className="eb-h3">{block.lead}</h3>
              {block.paras.map((p) => (
                <p key={p} className="eb-p">
                  <Marked text={p} phrases={[MARKS.renting]} />
                </p>
              ))}
            </div>
          ))}

          {/* The one passage that runs as prose — no heading. See APPS_TAIL. */}
          <div className="sv-block">
            <p className="eb-lede">{asSentence(APPS_TAIL.lead)}</p>
            <div className="eb-mt">
              {APPS_TAIL.paras.map((p) => (
                <p key={p} className="eb-p">
                  <Linked text={p} phrase={LINKS.ordering.phrase} href={LINKS.ordering.href} className="sv-a" />
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Rule />

      {/* ── How a stranger becomes a regular ─────────────────────────────── */}
      <section aria-labelledby="why-funnel-h" id="funnel" className="why-anchor">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={SECTIONS.funnel.label} />
          <h2 className="eb-d eb-h2" id="why-funnel-h">
            {SECTIONS.funnel.h2}
          </h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{FUNNEL_STAND}</p>
          <ol className="sv-list" role="list">
            {FUNNEL.map((s) => (
              <li key={s.n} className="sv-item">
                <span className="sv-n">{s.n}</span>
                <div className="sv-body">
                  <h3 className="eb-h3">{s.lead}</h3>
                  <p className="eb-p">
                    <Linked text={s.para} phrase={LINKS.listing.phrase} href={LINKS.listing.href} className="sv-a" />
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="sv-block eb-mt">
            <h3 className="eb-h3">{JARGON.lead}</h3>
            <p className="eb-p">{JARGON.para}</p>
          </div>

          {/* ⚠️ The ads honesty paragraph — verbatim, first, and at the top of
              its block. Do not soften it, move it, or shorten it. */}
          <div className="sv-note">
            <LedgerHead label={ADS.label} heading />
            <p className="sv-note-p">{ADS.honesty}</p>
            <p className="eb-p">{ADS.why}</p>
            <p className="eb-p">
              <Link href="/#report" className="sv-a">
                {ADS.pointA}
              </Link>{' '}
              {ADS.pointB}
            </p>
          </div>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
