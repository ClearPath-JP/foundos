import { COMMISSION_CHECKED, FOUNDOS_YEAR_ONE_MONTHLY, PLATFORM_FEES } from '@/config/commission';
import { PLANS, PROJECTS, usd, type LiveProject } from '@/config/offer';

/**
 * The commission comparison, rewritten 2026-10-04 (conversion review, item 6). The old version compared app
 * DELIVERY fees with foundos PICKUP and claimed a break-even point, which assumed delivery customers would switch.
 * Now: the fee structures side by side (percentage vs flat, with setup and card processing named), what direct
 * pickup does NOT replace, and no promised savings. The worked numbers happen with the owner, from their own app
 * statements. Used on /restaurant-systems.
 */
export function CommissionMath({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const growth = PLANS[1];
  const launch = PROJECTS.find((p): p is LiveProject => p.slug === 'direct-ordering-launch' && p.status === 'live');
  return (
    <div className="fx-cm">
      <p className="fx-kicker">Percentage vs flat price</p>
      <H className="fx-h2" id="commission-h">
        The apps take a percentage of every order. I charge a flat price.
      </H>
      <p className="fx-p">
        Direct ordering is pickup from your own website. It doesn’t replace delivery, or the new customers the apps send
        you. It gives the people who already know you a way to order pickup without an app taking a cut.
      </p>

      <div className="fx-cm-grid">
        <div className="fx-cm-card fx-cm-card--app">
          <p className="fx-cm-label">DoorDash and Uber Eats</p>
          <p className="fx-cm-big">6–30%</p>
          <p className="fx-cm-sub">
            of every order: 6–7% on pickup, 15–30% on delivery, depending on the app and plan. The fee grows with your
            sales.
          </p>
        </div>
        <div className="fx-cm-card fx-cm-card--you">
          <p className="fx-cm-label">Your own pickup ordering</p>
          <p className="fx-cm-big">{usd(growth.monthly)}/mo</p>
          <p className="fx-cm-sub">
            flat, plus a one-time setup {launch ? `${launch.from ? 'from ' : ''}${usd(launch.price)}` : ''} (about{' '}
            {usd(FOUNDOS_YEAR_ONE_MONTHLY)} a month over the first year), plus your normal card processing on orders
            paid at your counter. The same price at any order volume.
          </p>
        </div>
      </div>
      <p className="fx-cm-even">
        <strong>Is it worth it for you?</strong> It depends on how much pickup you already do through the apps, and
        whether regulars would order pickup from you directly. I can’t promise anyone switches from delivery, so I don’t
        put a savings number on this page. Text me your monthly app totals and I’ll work it out with you, including when
        the website-only plan is the better buy.
      </p>

      {/* The fee table stays one tap away so the page reads short on a phone. */}
      <details className="fx-details fx-cm-more">
        <summary>What the apps charge, from their own pricing pages</summary>
        <table className="fx-table fx-cm-table">
          <caption className="fx-cm-cap">
            What the two biggest apps charge restaurants (their own pricing pages, {COMMISSION_CHECKED})
          </caption>
          <thead>
            <tr>
              <th scope="col">App</th>
              <th scope="col">Order type</th>
              <th scope="col">Their cut</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORM_FEES.map((f) => (
              <tr key={`${f.platform}-${f.kind}`}>
                <th scope="row">{f.platform}</th>
                <td data-label="Order type">{f.kind}</td>
                <td data-label="Their cut">{f.fee}</td>
              </tr>
            ))}
            <tr className="fx-cm-row-you">
              <th scope="row">foundos</th>
              <td data-label="Order type">Pickup from your website</td>
              <td data-label="Their cut">0%. A flat monthly price, plus your normal card processing.</td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  );
}
