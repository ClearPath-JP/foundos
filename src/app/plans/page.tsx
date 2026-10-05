import type { Metadata } from 'next';
import Link from 'next/link';

import { CloseBand, Faq, OfferLadder, ProjectCards, RequestList } from '@/components/fx/cards';
import { PLANS_FAQ } from '@/components/fx/faq';
import { PlanTable } from '@/components/fx/plan-table';
import Shell from '@/components/fx/Shell';
import { LiquidBackground } from '@/components/fx/LiquidBackground';
import { BOTH_SYSTEMS, COMPARISON, PLAN_TERMS, PLANS, TERM_MONTHS, usd } from '@/config/offer';

/**
 * Pricing, in one place (2026-10-03 consolidation): the three ways to start, the plan table, one-time projects,
 * how it works and the fine print. /projects and /how-it-works redirect to the sections here.
 */

const TITLE = 'Pricing: restaurant websites, booking and online ordering | foundos';
const DESCRIPTION = `Digital Care (${usd(PLANS[0].monthly)}/month) for a managed restaurant website, or Growth (${usd(
  PLANS[1].monthly,
)}/month) for the website plus table booking, online ordering or catering follow-up. No setup fee on the website, and no cut of your orders.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './plans', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

const [care, growth] = PLANS;

const STEPS = [
  { t: 'Tell me about your restaurant', d: 'Pick a path, or just describe what’s not working. I confirm it fits before anything is billed.' },
  { t: 'Sign and send what I need', d: 'The agreement, then your menu, prices, logo, photos, hours and account access. You keep ownership of all of it.' },
  { t: 'Approve the work', d: 'You see your site, and your booking or ordering setup, before anything goes live. Two rounds of changes.' },
  { t: 'I keep it right', d: 'Send changes by text or email. You get a short summary every month of what changed and how it did.' },
] as const;

const AFTER = [
  { t: 'Asking for a change', d: 'Text, email or the contact form. Small edits like hours, prices and photos come out of your monthly update time.' },
  { t: 'Your monthly summary', d: 'Visits and actions like calls and form sends, plus what changed. Growth adds how bookings, orders or inquiries went.' },
  { t: 'When something breaks', d: `${PLAN_TERMS.hours} Acknowledged within 2 business days on Digital Care and 1 on Growth.` },
  { t: 'If you leave', d: `After the ${TERM_MONTHS}-month first term, cancel with 30 days’ notice. ${PLAN_TERMS.ownership}` },
] as const;

const growthName = PLANS[1].name;

export default function PricingPage() {
  return (
    <Shell current="plans">
      <section className="fx-phead">
        <LiquidBackground />
        <div className="fx-wrap">
          <p className="fx-eyebrow">Pricing</p>
          <h1 className="fx-h1">One monthly price. No cut of your sales.</h1>
          <p className="fx-lede">
            Your website is built into every plan, so there’s no setup fee for it. Add table booking or online ordering
            when you want them. You never pay foundos a percentage of an order or a fee per guest.
          </p>
          <nav className="fx-jump" aria-label="On this page">
            <a href="#start">Three ways to start</a>
            <a href="#compare">Compare plans</a>
            <a href="#projects">One-time projects</a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">Questions</a>
          </nav>
        </div>
      </section>

      <section className="fx-sec fx-sec--join" id="start" aria-labelledby="start-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="start-h">
            Three ways to start
          </h2>
          <OfferLadder />
          <p className="fx-note">
            {growth.name} includes one system. Catering and event follow-up can be your system instead of booking or
            ordering.
          </p>
          <p className="fx-note">
            <strong>Need booking and ordering?</strong> Add the second system for {usd(BOTH_SYSTEMS.addMonthly)} a
            month. Set up together, both are {usd(BOTH_SYSTEMS.setup)}, with both tablets included.
          </p>
          <Link href="/restaurant-systems" className="fx-more">
            See how the systems work, and what happens on a busy night
          </Link>
        </div>
      </section>

      <section className="fx-sec fx-sec--tint" id="compare" aria-labelledby="compare-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="compare-h">
            {care.name} or {growth.name}, side by side
          </h2>
          <PlanTable />
          <details className="fx-details">
            <summary>Full details, line by line</summary>
            <table className="fx-table">
              <thead>
                <tr>
                  <th scope="col">Included</th>
                  <th scope="col">
                    {care.name} · {usd(care.monthly)}/mo
                  </th>
                  <th scope="col">
                    {growth.name} · {usd(growth.monthly)}/mo
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((r) => (
                  <tr key={r.row}>
                    <th scope="row">{r.row}</th>
                    <td data-plan={care.name}>{r.care}</td>
                    <td data-plan={growth.name}>{r.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
          <details className="fx-details">
            <summary>The fine print, in plain words</summary>
            <dl className="fx-fine">
              <dt>Your website</dt>
              <dd>{PLAN_TERMS.site}</dd>
              <dt>What counts as an update</dt>
              <dd>{PLAN_TERMS.edits}</dd>
              <dt>Not included</dt>
              <dd>{PLAN_TERMS.notIncluded}</dd>
              <dt>The term</dt>
              <dd>{PLAN_TERMS.term}</dd>
              <dt>Paying</dt>
              <dd>{PLAN_TERMS.firstPayment}</dd>
            </dl>
          </details>
        </div>
      </section>

      <section className="fx-sec" id="projects" aria-labelledby="projects-h">
        <div className="fx-wrap">
          <p className="fx-kicker">One-time setups and projects</p>
          <h2 className="fx-h2" id="projects-h">
            Paid once, with a clear scope.
          </h2>
          <p className="fx-p">
            Booking Launch and Direct Ordering Launch are one-time setups on top of the {growthName} plan, not
            standalone purchases. Social Profile Cleanup is the one project you can buy without a monthly plan.
          </p>
          <ProjectCards />
          <h3 className="fx-h3 fx-req-h">Also available, priced after a short conversation</h3>
          <RequestList />
        </div>
      </section>

      <section className="fx-sec fx-sec--tint" id="how-it-works" aria-labelledby="how-h">
        <div className="fx-wrap">
          <p className="fx-kicker">How it works</p>
          <h2 className="fx-h2" id="how-h">
            Four steps, and you approve every one.
          </h2>
          <p className="fx-p">
            Your website usually launches 15 to 20 business days after I have everything I need. After that, it’s kept
            right for as long as you’re on a plan.
          </p>
          <ol className="fx-steps" role="list">
            {STEPS.map((s) => (
              <li key={s.t}>
                <p className="fx-step-t">{s.t}</p>
                <p className="fx-step-d">{s.d}</p>
              </li>
            ))}
          </ol>
          <h3 className="fx-h3 fx-after-h">Once you’re a client</h3>
          <ul className="fx-handles" role="list">
            {AFTER.map((a) => (
              <li key={a.t} className="fx-help-item">
                <p className="fx-help-t">{a.t}</p>
                <p className="fx-help-d">{a.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="fx-sec" id="faq" aria-labelledby="faq-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="faq-h">
            Questions about pricing
          </h2>
          <Faq items={PLANS_FAQ} />
        </div>
      </section>

      <CloseBand
        title="Not sure which path fits?"
        body="Text me what your restaurant does most: walk-ins, reservations, takeout or catering. I’ll tell you which one fits, or that you don’t need any of it yet."
      />
    </Shell>
  );
}
