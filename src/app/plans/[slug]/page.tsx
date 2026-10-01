import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CloseBand, contactFor, Faq } from '@/components/fx/cards';
import { PLANS_FAQ } from '@/components/fx/faq';
import Shell from '@/components/fx/Shell';
import { COMPARISON, PLAN_TERMS, PLANS, TERM_MONTHS, usd } from '@/config/offer';

/**
 * /plans/digital-care and /plans/growth. Every detail page uses the doc's §6
 * order: outcome and price, standard scope, exclusions, process and timeline,
 * what the client supplies, optional costs, FAQs, then the purchase action —
 * with the term sitting next to the button, not behind a link.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return PLANS.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => PLANS.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const plan = find((await params).slug);
  if (!plan) return {};
  const title = `${plan.name}, ${usd(plan.monthly)} a month | foundos`;
  return {
    title,
    description: `${plan.pitch} No website setup fee, ${TERM_MONTHS}-month first term.`,
    openGraph: {
      title,
      description: plan.pitch,
      url: `./plans/${plan.slug}`,
      siteName: 'foundos',
      type: 'website',
      locale: 'en_US',
    },
  };
}

/** Growth's workflow explanation, doc §3. Only shown on the Growth page. */
const GROWTH_WORKFLOWS = {
  intro:
    'With Digital Care, a catering inquiry reaches you. With Growth, it reaches you, the customer gets an immediate reply, and a set follow-up helps your team act on it. You still confirm availability, quotes and bookings.',
  example: [
    'The customer gets a receipt confirmation right away',
    'You get a reminder after one business day if it’s still unanswered',
    'The customer gets one approved follow-up after two business days, if appropriate',
    'Follow-up stops when they reply, book, opt out, or you close it',
  ],
  limits:
    'A standard workflow is one trigger, one approved sequence and one destination, set up after your website launches. Workflows start with email; text messages and phone services need a separate usage allowance. Review requests go to every eligible customer, never only the happy ones, and never with an incentive.',
};

const SUPPLY = [
  'Your approved menu and prices',
  'Your logo and photos you have the right to use',
  'Hours, contact details and where inquiries should go',
  'Access to your domain and Google profile (you keep ownership)',
] as const;

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const plan = find((await params).slug);
  if (!plan) notFound();
  const col = plan.slug === 'growth' ? 'growth' : 'care';
  const other = PLANS.find((p) => p.slug !== plan.slug);

  return (
    <Shell current="plans">
      <section className="fx-phead">
        <div className="fx-wash" aria-hidden="true" />
        <div className="fx-wrap">
          <p className="fx-crumb">
            <Link href="/plans">Plans</Link> / {plan.name}
          </p>
          <h1 className="fx-h1" style={{ marginTop: 14 }}>
            {plan.name}
          </h1>
          <p className="fx-lede">{plan.pitch}</p>
        </div>
      </section>

      <div className="fx-wrap fx-detail">
        <aside className="fx-buy" aria-label={`Start ${plan.name}`}>
          <p className="fx-plan-name">{plan.name}</p>
          <p className="fx-price">
            <span className="fx-price-n">{usd(plan.monthly)}</span>
            <span className="fx-price-u">per month</span>
          </p>
          <ul className="fx-buy-lines" role="list">
            <li>
              <strong>No website setup fee.</strong> The build is covered by the plan.
            </li>
            <li>
              <strong>{TERM_MONTHS}-month first term,</strong> then month to month with 30 days’ notice.
            </li>
            <li>
              <strong>First month due when you sign.</strong> Refunded if your restaurant isn’t a fit.
            </li>
            <li>One location, one website.</li>
          </ul>
          <Link href={contactFor(plan.slug)} className="fx-btn fx-btn--p fx-btn--lg">
            {plan.cta}
          </Link>
          <p className="fx-note">Starts with a conversation, not a charge.</p>
        </aside>

        <div className="fx-detail-main">
          <div className="fx-block">
            <h2 className="fx-h3">What’s included</h2>
            <p className="fx-p">{plan.forWho}</p>
            <ul className="fx-checks" role="list">
              {COMPARISON.map((r) => (
                <li key={r.row}>
                  <strong>{r.row}:</strong> <span style={{ fontWeight: 500 }}>{r[col]}</span>
                </li>
              ))}
            </ul>
          </div>

          {col === 'growth' && (
            <div className="fx-block">
              <h2 className="fx-h3">How the follow-up works</h2>
              <p className="fx-p">{GROWTH_WORKFLOWS.intro}</p>
              <p className="fx-p" style={{ fontWeight: 700, color: 'var(--text)' }}>
                Example: a catering inquiry
              </p>
              <ol className="fx-checks" role="list">
                {GROWTH_WORKFLOWS.example.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p className="fx-p">{GROWTH_WORKFLOWS.limits}</p>
            </div>
          )}

          <div className="fx-block">
            <h2 className="fx-h3">Your website</h2>
            <p className="fx-p">{PLAN_TERMS.site}</p>
            <p className="fx-p">{PLAN_TERMS.edits}</p>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">Not included</h2>
            <p className="fx-p">{PLAN_TERMS.notIncluded}</p>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">What you send me</h2>
            <ul className="fx-x" role="list">
              {SUPPLY.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">Service hours</h2>
            <p className="fx-p">{PLAN_TERMS.hours}</p>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">Payment and ownership</h2>
            <p className="fx-p">{PLAN_TERMS.term}</p>
            <p className="fx-p">{PLAN_TERMS.firstPayment}</p>
            <p className="fx-p">{PLAN_TERMS.ownership}</p>
          </div>

          {other && (
            <div className="fx-block">
              <p className="fx-p">
                Looking at the other plan?{' '}
                <Link href={`/plans/${other.slug}`} className="fx-more">
                  {other.name}, {usd(other.monthly)} a month
                </Link>
              </p>
            </div>
          )}

          <div className="fx-block">
            <h2 className="fx-h3">Questions</h2>
            <Faq items={PLANS_FAQ} />
          </div>
        </div>
      </div>

      <CloseBand
        title={`Ready to start ${plan.name}?`}
        body="Tell me about your restaurant. I’ll confirm it fits, then send the agreement. Nothing is billed before that."
      />
    </Shell>
  );
}
