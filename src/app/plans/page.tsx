import type { Metadata } from 'next';

import { CloseBand, Faq, PlanCards } from '@/components/fx/cards';
import { PLANS_FAQ } from '@/components/fx/faq';
import Shell from '@/components/fx/Shell';
import { COMPARISON, PLAN_TERMS, PLANS, usd } from '@/config/offer';

const TITLE = 'Monthly plans | foundos';
const DESCRIPTION =
  'Digital Care ($299/month) and Growth ($499/month): your restaurant website built and managed, with no setup fee.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './plans', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

const [care, growth] = PLANS;

export default function PlansPage() {
  return (
    <Shell current="plans">
      <section className="fx-phead">
        <div className="fx-wash" aria-hidden="true" />
        <div className="fx-wrap">
          <p className="fx-eyebrow">Monthly plans</p>
          <h1 className="fx-h1">Two plans. Your website is built into both.</h1>
          <p className="fx-lede">
            One restaurant location per plan. No setup fee, a 12-month first term, then month to month.
          </p>
        </div>
      </section>

      <section className="fx-sec fx-sec--join" aria-label="Plans">
        <div className="fx-wrap">
          <PlanCards />
        </div>
      </section>

      <section className="fx-sec fx-sec--tint" aria-labelledby="compare-h">
        <div className="fx-wrap">
          <p className="fx-kicker">Line by line</p>
          <h2 className="fx-h2" id="compare-h">
            Compare the plans
          </h2>
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
        </div>
      </section>

      <section className="fx-sec" aria-labelledby="terms-h">
        <div className="fx-wrap fx-split fx-split--top">
          <div>
            <p className="fx-kicker">The fine print, in plain words</p>
            <h2 className="fx-h2" id="terms-h">
              What both plans include, and what they don’t
            </h2>
          </div>
          <div>
            <div className="fx-block">
              <h3 className="fx-h3">Your website</h3>
              <p className="fx-p">{PLAN_TERMS.site}</p>
            </div>
            <div className="fx-block">
              <h3 className="fx-h3">What counts as an update</h3>
              <p className="fx-p">{PLAN_TERMS.edits}</p>
            </div>
            <div className="fx-block">
              <h3 className="fx-h3">Not included</h3>
              <p className="fx-p">{PLAN_TERMS.notIncluded}</p>
            </div>
            <div className="fx-block">
              <h3 className="fx-h3">The term</h3>
              <p className="fx-p">{PLAN_TERMS.term}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fx-sec fx-sec--tint" aria-labelledby="faq-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="faq-h">
            Questions about the plans
          </h2>
          <Faq items={PLANS_FAQ} />
        </div>
      </section>

      <CloseBand
        title="Not sure which plan fits?"
        body="Tell me how your restaurant takes inquiries today. If you don’t get catering or event requests, Digital Care is the right plan."
      />
    </Shell>
  );
}
