import Link from 'next/link';

import {
  SYSTEMS,
  WEBSITE,
  quote,
  usd,
  type PricedPackage,
  type PricedSystem,
  type Service as PricedService,
  type SystemStatus,
} from '@/config/pricing';

import {
  ADS_COPY,
  PACKAGE_COPY,
  SERVICE_COPY,
  STATUS_LABEL,
  SYSTEM_COPY,
  WEBSITE_COPY,
  bestForLabel,
  textAbout,
  type SystemCopy,
} from './catalog';

/**
 * The shop's pieces. Server components, no client script: the only interactive
 * part is "How it works", and that is a native <details>, which opens on a
 * phone with JavaScript off.
 *
 * ⚠️ NO PRICE MATHS IN HERE. A piece reads a system's own numbers or calls
 * quote(); it never multiplies, discounts or rounds. That is what keeps the
 * package rows and the price chart on the same number.
 *
 * ⚠️ WHY PACKAGES ARE ROWS AND NOT CARDS. The first build was three boxes per
 * group with the middle one outlined, and a fresh-eyes review called it on
 * sight: that is the stock SaaS tier table, and at three to a row the short
 * packages left 250-300px of empty box above their button. A ruled ledger row
 * is the device the rest of this site already uses for lists, puts both prices
 * in bold in one glance, and is about half the height on a phone.
 */

/** The hollow square on its own, inline before a name, with the words for a screen reader. */
export function SoonMark() {
  return (
    <>
      <span aria-hidden="true" className="sh-st-i sh-st-i--soon sh-inl" />
      <span className="eb-sr">Coming soon: </span>
    </>
  );
}

export function StatusMark({ status }: { status: SystemStatus }) {
  return (
    <span className={`eb-lab sh-st${status === 'coming_soon' ? ' sh-st--soon' : ''}`}>
      <span aria-hidden="true" className="sh-st-i" />
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Setup and monthly as two bold figures, never one bold and one buried in a sentence. */
function Price({ setup, monthly, plus = false }: { setup: number; monthly: number; plus?: boolean }) {
  const p = plus ? '+' : '';
  return (
    <p className="sh-price">
      <span className="sh-fig">
        <span className="sh-amt">
          {p}
          {usd(setup)}
        </span>
        <span className="sh-unit">setup</span>
      </span>
      <span className="sh-fig">
        <span className="sh-amt">
          {p}
          {usd(monthly)}
        </span>
        <span className="sh-unit">a month</span>
      </span>
    </p>
  );
}

function Details({ copy, showWhat = true }: { copy: SystemCopy; showWhat?: boolean }) {
  return (
    <>
      {copy.steps ? (
        <ol className="sh-steps">
          {copy.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      ) : (
        showWhat && copy.what && <p className="sh-what">{copy.what}</p>
      )}
      <dl className="sh-dl">
        {copy.goodFit && (
          <div>
            <dt className="sh-dl-k">Good fit if</dt>
            <dd className="sh-dl-v">{copy.goodFit}</dd>
          </div>
        )}
        <div>
          <dt className="sh-dl-k">What I need from you</dt>
          <dd className="sh-dl-v">{copy.need}</dd>
        </div>
        {copy.faq.map((f) => (
          <div key={f.q}>
            <dt className="sh-dl-v sh-q">{f.q}</dt>
            <dd className="sh-dl-v">{f.a}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function HowItWorks({ copy }: { copy: SystemCopy }) {
  return (
    <details className="sh-more">
      <summary className="sh-sum">How it works</summary>
      <div className="sh-more-body">
        <Details copy={copy} />
      </div>
    </details>
  );
}

/**
 * The base every build sits on. Full width, split in two above 760px so the
 * right half carries what you get instead of sitting empty.
 */
export function WebsiteCard() {
  const copy = WEBSITE_COPY;
  return (
    <article className="sh-card sh-wide sh-split" id="website">
      <div className="sh-split-l">
        <div className="sh-card-top">
          <StatusMark status="live" />
          <span className="eb-lab sh-tag">In every build</span>
        </div>
        <h3 className="sh-name">{WEBSITE.name}</h3>
        <p className="sh-out">{copy.headline}</p>
        <Price setup={WEBSITE.setup} monthly={WEBSITE.monthly} />
        <div className="sh-act">
          <a className="sh-btn" href={textAbout('the website')}>
            Text me about it
          </a>
        </div>
      </div>
      <div className="sh-split-r">
        {copy.what && <p className="sh-what">{copy.what}</p>}
        <Details copy={copy} showWhat={false} />
        {copy.page && (
          <Link className="sh-link" href={copy.page.href}>
            {copy.page.label}
          </Link>
        )}
      </div>
    </article>
  );
}

/** A system that can be built now: a full card, priced as what it adds on top of the website. */
export function SystemCard({ system }: { system: PricedSystem }) {
  const copy = SYSTEM_COPY[system.slug];
  return (
    <article className="sh-card" id={system.slug}>
      <div className="sh-card-top">
        <StatusMark status={system.status} />
        <span className="eb-lab sh-tag">{bestForLabel(system.bestFor)}</span>
      </div>
      <h3 className="sh-name">{system.name}</h3>
      <p className="sh-out">{copy.headline}</p>
      <Price setup={system.setup} monthly={system.monthly} plus />
      {copy.priceNote && <p className="sh-fine">{copy.priceNote}</p>}
      <HowItWorks copy={copy} />
      <div className="sh-act">
        <a className="sh-btn" href={textAbout(system.name)}>
          Text me about it
        </a>
        {copy.page && (
          <Link className="sh-link" href={copy.page.href}>
            {copy.page.label}
          </Link>
        )}
      </div>
    </article>
  );
}

/**
 * A system that is priced but not built. A row, not a card, so it cannot be
 * mistaken for something ready — and no button of its own; the section has one.
 */
export function SoonRow({ system }: { system: PricedSystem }) {
  const copy = SYSTEM_COPY[system.slug];
  return (
    <li className="sh-srow" id={system.slug}>
      <div className="sh-srow-h">
        <h3 className="sh-srow-name">{system.name}</h3>
        <p className="sh-srow-price">
          <strong>+{usd(system.setup)}</strong> setup · <strong>+{usd(system.monthly)}</strong> a month
        </p>
      </div>
      <p className="sh-out">{copy.headline}</p>
      <details className="sh-more sh-more--row">
        <summary className="sh-sum">How it will work</summary>
        <div className="sh-more-body">
          <Details copy={copy} />
          {copy.page && (
            <Link className="sh-link" href={copy.page.href}>
              {copy.page.label}
            </Link>
          )}
        </div>
      </details>
    </li>
  );
}

/**
 * A service — Josh's time. Same card as a system, priced as labour: a one-time
 * fee, a monthly, or both, and never a "+" because it does not sit on top of
 * the website the way a system does.
 */
export function ServiceCard({ service }: { service: PricedService }) {
  const copy = SERVICE_COPY[service.slug];
  if (!copy) return null;

  return (
    <article className="sh-card" id={service.slug}>
      <div className="sh-card-top">
        <StatusMark status={service.status} />
        <span className="eb-lab sh-tag">My time, not software</span>
      </div>
      <h3 className="sh-name">{service.name}</h3>
      <p className="sh-out">{copy.headline}</p>
      <p className="sh-price">
        {service.oneTime !== undefined && (
          <span className="sh-fig">
            <span className="sh-amt">{usd(service.oneTime)}</span>
            <span className="sh-unit">{service.monthly === undefined ? 'one time' : 'to start'}</span>
          </span>
        )}
        {service.monthly !== undefined && (
          <span className="sh-fig">
            <span className="sh-amt">{usd(service.monthly)}</span>
            <span className="sh-unit">a month</span>
          </span>
        )}
      </p>
      {copy.priceNote && <p className="sh-fine">{copy.priceNote}</p>}
      <HowItWorks copy={copy} />
      <div className="sh-act">
        <a className="sh-btn" href={textAbout(service.name)}>
          Text me about it
        </a>
      </div>
    </article>
  );
}

/** Ads: on the shelf, not for sale off a page. */
export function AdsCard() {
  return (
    <article className="sh-card" id="ads">
      <div className="sh-card-top">
        <span className="eb-lab sh-tag">Ask about it</span>
        <span className="eb-lab sh-tag">Trucks · Restaurants</span>
      </div>
      <h3 className="sh-name">{ADS_COPY.name}</h3>
      <p className="sh-out">{ADS_COPY.headline}</p>
      <p className="sh-what sh-mt">{ADS_COPY.what}</p>
      <div className="sh-act">
        <a className="sh-btn" href={textAbout('ads')}>
          Ask about ads
        </a>
      </div>
    </article>
  );
}

const SYSTEM_NAME = new Map(SYSTEMS.map((s) => [s.slug, s.name]));

/** A package: a saved cart, priced by quote() like any other build, set as one ledger row. */
export function PackageRow({ pkg }: { pkg: PricedPackage }) {
  const q = quote(pkg.systems);
  const discounted = q.discounted;

  return (
    <li className="sh-pk" id={pkg.slug}>
      <div>
        <div className="sh-pk-top">
          <h4 className="sh-pk-name">{pkg.name}</h4>
          {pkg.recommended && <span className="eb-lab sh-pick">Where I would start</span>}
        </div>
        <p className="sh-pk-blurb">{PACKAGE_COPY[pkg.slug]}</p>
        {/* Each name carries its own separator inside a no-wrap span, so a
            line can end in "·" but never start with one, and no name breaks. */}
        <p className="sh-pk-inc">
          {q.lines.map((line, i) => (
            <span key={line.slug}>
              <span className="sh-nw">
                {line.status === 'coming_soon' && <SoonMark />}
                {line.slug === 'website' ? line.name : (SYSTEM_NAME.get(line.slug) ?? line.name)}
                {i < q.lines.length - 1 && ' ·'}
              </span>{' '}
            </span>
          ))}
        </p>
      </div>
      <div>
        <Price setup={q.price.setup} monthly={q.price.monthly} />
        {discounted && (
          <p className="sh-pk-was">
            <span className="sh-nw">
              <span className="eb-sr">Added up, before the discount: </span>
              <s>
                {usd(q.full.setup)} + {usd(q.full.monthly)}/mo
              </s>
            </span>{' '}
            <span className="sh-nw">you save {usd(q.saves.setup)} on setup</span>
          </p>
        )}
        <a className="sh-link" href={textAbout(pkg.name)}>
          Text me about {pkg.name}
        </a>
      </div>
    </li>
  );
}
