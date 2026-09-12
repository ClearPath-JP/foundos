import type { Metadata } from 'next';
import Link from 'next/link';

import { LedgerHead, Rule, SHELL } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';
import { PackageRow, SHOP_CSS, SoonMark, StatusMark, ldScript, pricingJsonLd } from '@/components/shop';
import {
  BASE_MINIMUM_MONTHS,
  DISCOUNT_TIERS,
  MINIMUM_MONTHS,
  PACKAGES,
  SERVICES,
  SETUP_ROUNDS_DOWN_TO,
  SYSTEMS,
  WEBSITE,
  quote,
  tierLabel,
  usd,
  usdExact,
  type PackageGroup,
} from '@/config/pricing';

/**
 * /pricing — the price list first, then how the discount works, then the
 * packages, then the terms. Every number comes out of config/pricing.ts; there
 * is no dollar string in this file.
 *
 * ── WHY THE ORDER IS CHART → DISCOUNT → PACKAGES ─────────────────────────
 *
 * The h1 promises "one price list", so the list comes first. The packages are
 * that list with the discount applied, and a package only makes sense to a
 * reader who has just seen what the discount is.
 *
 * ⚠️ EVERY RULE THE MATHS FOLLOWS IS SAID ON THE PAGE. Two fresh-eyes reviews
 * checked the figures by hand and each one found a number that looked like a
 * contradiction — "20% off" beside $1,250 instead of $1,280, a website at $97
 * under a rule that rounds to 9, "two systems" when the website was quietly
 * not counted. None was a wrong price; every one was an unstated rule. So the
 * rules are listed in DISCOUNTS.notes and the wood band works one package
 * through them step by step. If a rule in config/pricing.ts changes, the note
 * that states it changes in the same commit.
 *
 * ⚠️ "WHERE I WOULD START", NOT "MOST POPULAR". Nothing has been bought yet, so
 * "most popular" would be a claim about customers who do not exist.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'pricing',
  title: 'Pricing for Atlanta food trucks and restaurants — foundos',
  description:
    'Setup and monthly prices for every system I build for Atlanta food trucks and restaurants, the discount for building more than one at once, and the terms.',
  shareTitle: 'Pricing for trucks and restaurants',
  shareDescription: 'Every system and every package, with setup and monthly prices, the discounts, and the terms.',
});

const HEAD = {
  label: 'Pricing',
  h1: 'One price list. The same for everybody.',
  stand:
    'For food trucks and restaurants around Atlanta. Every system has a setup price and a monthly price. Build more than one at once and the setup drops — and a package is just those systems added up by the same rules, so the two always land on the same number.',
};

const GROUPS: readonly { id: string; group: PackageGroup; label: string }[] = [
  { id: 'trucks', group: 'truck', label: 'If you run a truck' },
  { id: 'restaurants', group: 'restaurant', label: 'If you run a restaurant' },
  { id: 'both', group: 'both', label: 'If you run both' },
];

const AI = SYSTEMS.find((s) => s.slug === 'ai-receptionist');
const AI_NOTE =
  AI?.includedMinutes && AI.overageCentsPerMinute
    ? `${AI.name} includes ${AI.includedMinutes} call minutes a month; past that, ${AI.overageCentsPerMinute}¢ a minute.`
    : null;

function off(percent: number): string {
  return percent > 0 ? `${percent}% off` : 'Full price';
}

const CHART = {
  label: 'Every price',
  h2: 'Every system, priced on its own.',
  stand: 'The website is in every build. Everything below it goes on top.',
  caption: AI_NOTE ?? '',
};

const SERVICES_CHART = {
  h3: 'Services — my time, not software',
  stand:
    'Quoted next to a build, never inside one. These take no package discount and are not in the ceiling above, because a shoot and a person do not get cheaper when you buy a second system.',
};

const DISCOUNTS = {
  label: 'Discounts',
  h2: 'Build more at once, and the setup drops.',
  stand:
    'Systems built together share the same site and the same accounts, so there is less work — that is where the discount comes from. Monthly cost grows with every system, so that discount stays small.',
  notes: [
    {
      lead: 'Count the systems, not the website',
      rest: 'The website is in every build and does not count toward the number. The website plus two systems is the two-system discount.',
    },
    {
      lead: 'It comes off the website too',
      rest: 'Once a discount applies, the percentage comes off the website as well as the systems.',
    },
    {
      lead: 'Two things never take one',
      rest: 'The AI Receptionist monthly, because calls cost me by the minute, and the Second Location add-on.',
    },
    {
      lead: 'How totals are rounded',
      rest: `Setup rounds down to the nearest ${usd(SETUP_ROUNDS_DOWN_TO)}, so it only ever drops, by up to ${usd(SETUP_ROUNDS_DOWN_TO - 1)}. Once a system is added, the monthly rounds to the nearest price ending in 9. The website on its own stays at ${usd(WEBSITE.monthly)}.`,
    },
    {
      lead: 'A discount locks in for six months',
      rest: `Any discounted build has a ${MINIMUM_MONTHS}-month minimum. Leave before that and the setup discount is owed. Every other build has a ${BASE_MINIMUM_MONTHS}-month minimum.`,
    },
  ],
};

/* The worked example: the recommended truck package, run through the rules. */
const EXAMPLE = PACKAGES.find((p) => p.group === 'truck' && p.recommended) ?? PACKAGES[0];
const EX = quote(EXAMPLE.systems);
const FIGURES = [
  { k: `${EXAMPLE.name} setup, added up`, v: usd(EX.full.setup) },
  { k: `${EX.tier.setupPercentOff}% off`, v: usdExact(EX.exact.setup) },
  { k: `Rounded down to the nearest ${usd(SETUP_ROUNDS_DOWN_TO)}`, v: usd(EX.price.setup) },
  { k: 'Monthly, added up', v: usd(EX.full.monthly) },
  { k: `${EX.tier.monthlyPercentOff}% off`, v: usdExact(EX.exact.monthly) },
  { k: 'Rounded to the nearest price ending in 9', v: usd(EX.price.monthly) },
];

/* The case where the monthly rounds UP, stated rather than left for someone to find. */
const ONE = quote([EXAMPLE.systems[0]]);
const ROUND_UP_NOTE =
  ONE.price.monthly > ONE.full.monthly
    ? `Setup only ever rounds down. The monthly can land a few dollars either side, and it rounds with even one system added: the website plus ${ONE.lines[1]?.name ?? 'one system'} is ${usd(ONE.price.monthly)} a month, not ${usd(ONE.full.monthly)}.`
    : null;

const PACKAGES_COPY = {
  label: 'Packages',
  h2: 'Or start from a package.',
  stand: 'Each one is a set of systems from the chart above, priced by the same rules. Pick one, or tell me what to swap.',
  legend: `marks a system that is coming soon. It can be in your plan today and is not charged until it is ready. Every package with two or more systems has the ${MINIMUM_MONTHS}-month minimum.`,
};

const TERMS = {
  label: 'How paying works',
  h2: 'The terms, before you ask.',
  rows: [
    { lead: 'Paying for the build', rest: 'Half the setup to start, and half when it launches.' },
    {
      lead: 'The minimum',
      rest: `${BASE_MINIMUM_MONTHS} months on any build, ${MINIMUM_MONTHS} on a build with a package discount.`,
    },
    {
      lead: 'How it rolls out',
      rest: 'One system at a time, one every two to four weeks, so each one is working before the next goes in.',
    },
    {
      lead: 'Anything that texts',
      rest: 'Truck Tracker, Review Booster, Text Club and Text-Back need your texting number registered with the carriers first. That takes days to weeks, and I tell you where it stands.',
    },
    {
      lead: 'Card fees and hardware',
      rest: 'Card processing fees are yours, the same as any card reader. Order printers and print jobs are billed at what they cost me, with the invoice.',
    },
    { lead: 'If you cancel', rest: 'After the minimum, cancel any month and you keep the site.' },
  ],
};

const CLOSE = "Tell me what you run and I'll tell you which package, or which two systems, you actually need.";

export default function PricingPage() {
  return (
    <ServicePage slug="pricing" label={HEAD.label} h1={HEAD.h1} stand={HEAD.stand} close={CLOSE} css={SHOP_CSS}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(pricingJsonLd()) }} />

      <nav aria-label="On this page">
        <div className={`${SHELL} sh-jump`}>
          {[
            ['#every-price', CHART.label],
            ['#discounts', DISCOUNTS.label],
            ['#trucks', 'Trucks'],
            ['#restaurants', 'Restaurants'],
            ['#both', 'Both'],
            ['#terms', 'Terms'],
          ].map(([href, label]) => (
            <a key={href} className="eb-lab sh-jump-a" href={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── The price list, on the bone field ───────────────────────────────
          The one light ground on this page, under the table of numbers. Rich
          on bone carries body text at about 13:1. */}
      <section aria-labelledby="sh-chart-h" id="every-price" className="eb-g-bone">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={CHART.label} />
          <h2 className="eb-d eb-h2" id="sh-chart-h">
            {CHART.h2}
          </h2>
          <p className="eb-stand eb-stand--flush">{CHART.stand}</p>
          <div className="sh-tw">
            <table className="sh-t">
              <thead>
                <tr>
                  <th scope="col">What</th>
                  <th scope="col">Setup</th>
                  <th scope="col">Monthly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <Link className="sh-link" href="/systems#website">
                      {WEBSITE.name}
                    </Link>
                    <span className="sh-t-st">
                      <StatusMark status="live" />
                    </span>
                  </th>
                  <td className="sh-t-strong">{usd(WEBSITE.setup)}</td>
                  <td className="sh-t-strong">{usd(WEBSITE.monthly)}</td>
                </tr>
                {SYSTEMS.map((s) => (
                  <tr key={s.slug}>
                    <th scope="row">
                      <Link className="sh-link" href={`/systems#${s.slug}`}>
                        {s.name}
                      </Link>
                      <span className="sh-t-st">
                        <StatusMark status={s.status} />
                      </span>
                    </th>
                    <td>+{usd(s.setup)}</td>
                    <td>+{usd(s.monthly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sh-cap">{CHART.caption}</p>

          {/* ── Services: hours, kept out of the systems table on purpose ───
              A second, smaller table rather than more rows in the first one.
              They are priced differently (one-time, or a monthly that is a
              person's time), they take no discount, and they are not in the
              ceiling — putting them in the same table would imply all three
              are the same kind of thing. */}
          <h3 className="eb-h3 sh-sub" id="services">
            {SERVICES_CHART.h3}
          </h3>
          <p className="sh-cap sh-cap--lead">{SERVICES_CHART.stand}</p>
          <div className="sh-tw">
            <table className="sh-t">
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">One time</th>
                  <th scope="col">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => (
                  <tr key={s.slug}>
                    <th scope="row">
                      {s.name}
                      <span className="sh-t-st">
                        <StatusMark status={s.status} />
                      </span>
                      <span className="sh-t-st sh-t-note">{s.note}</span>
                    </th>
                    <td>{s.ask ? 'Ask' : s.oneTime !== undefined ? usd(s.oneTime) : '—'}</td>
                    <td>{s.ask ? 'Ask' : s.monthly !== undefined ? usd(s.monthly) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Rule />

      <section aria-labelledby="sh-disc-h" id="discounts">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={DISCOUNTS.label} />
          <h2 className="eb-d eb-h2" id="sh-disc-h">
            {DISCOUNTS.h2}
          </h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{DISCOUNTS.stand}</p>
          <div className="sh-tw">
            <table className="sh-t sh-t--tiers">
              <thead>
                <tr>
                  <th scope="col">Systems</th>
                  <th scope="col">Setup</th>
                  <th scope="col">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {DISCOUNT_TIERS.map((t) => (
                  <tr key={t.minSystems}>
                    <th scope="row">{tierLabel(t)}</th>
                    <td className={t.setupPercentOff > 0 ? 'sh-t-strong' : undefined}>{off(t.setupPercentOff)}</td>
                    <td className={t.monthlyPercentOff > 0 ? 'sh-t-strong' : undefined}>
                      {off(t.monthlyPercentOff)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="sv-rows eb-mt" role="list">
            {DISCOUNTS.notes.map((n) => (
              <li key={n.lead} className="sv-row">
                <span className="sv-row-l">{n.lead}</span>
                <span className="sv-row-r">{n.rest}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── One package, worked out, on the wood field ───────────────────────
          ⚠️ NOTHING IN THIS BAND MAY DROP BELOW 19px/700. Ink on wood is
          4.24:1 — legal for large-scale text only. Same device, same classes
          and same floor as the arithmetic band on /online-ordering. */}
      <Rule />
      <section aria-label={`${EXAMPLE.name}, worked out`} className="eb-g-wood">
        <div className={`${SHELL} sv-math`}>
          <dl className="sv-figs">
            {FIGURES.map((f) => (
              <div key={f.k} className="sv-fig">
                <dt className="sv-fig-k">{f.k}</dt>
                <dd className="sv-fig-v">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="sv-math-p">
            {`That is ${EXAMPLE.name}: ${usd(EX.price.setup)} to set up and ${usd(EX.price.monthly)} a month, whether you pick the package or choose the same ${EX.systems.length} systems yourself.`}
          </p>
          {ROUND_UP_NOTE && <p className="sv-math-p">{ROUND_UP_NOTE}</p>}
        </div>
      </section>
      <Rule />

      <section aria-labelledby="sh-pk-h" id="packages">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={PACKAGES_COPY.label} />
          <h2 className="eb-d eb-h2" id="sh-pk-h">
            {PACKAGES_COPY.h2}
          </h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{PACKAGES_COPY.stand}</p>
          <p className="sh-cap sh-legend">
            <SoonMark />
            {PACKAGES_COPY.legend}
          </p>
          {GROUPS.map((g) => (
            <div key={g.id} className="sh-group" id={g.id}>
              <h3 className="eb-h3">{g.label}</h3>
              <ul className="sh-pks" role="list">
                {PACKAGES.filter((p) => p.group === g.group).map((p) => (
                  <PackageRow key={p.slug} pkg={p} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Rule />

      <section aria-labelledby="sh-terms-h" id="terms">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={TERMS.label} />
          <h2 className="eb-d eb-h2" id="sh-terms-h">
            {TERMS.h2}
          </h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <ul className="sv-rows" role="list">
            {TERMS.rows.map((r) => (
              <li key={r.lead} className="sv-row">
                <span className="sv-row-l">{r.lead}</span>
                <span className="sv-row-r">{r.rest}</span>
              </li>
            ))}
          </ul>
          <div className="eb-btns">
            <Link className="eb-btn eb-btn--b" href="/systems">
              What each system does
            </Link>
          </div>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
