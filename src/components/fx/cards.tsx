import Link from 'next/link';

import { CONTACT, LIVE_PROJECTS, PLANS, REQUEST_PROJECTS, TERM_MONTHS, usd, type LiveProject } from '@/config/offer';

/** Where every buy button goes: the inquiry form with the product preselected. No checkout yet. */
export const contactFor = (slug: string) => `/contact?interest=${slug}`;

/** The two plan cards, doc §6/§7. Same weight on purpose — no "most popular" without sales evidence. */
export function PlanCards({ details = true }: { details?: boolean }) {
  return (
    <div className="fx-plans">
      {PLANS.map((p) => (
        <article key={p.slug} className={`fx-plan fx-plan--${p.slug}`} aria-labelledby={`plan-${p.slug}`}>
          <div className="fx-plan-body">
            <h3 className="fx-plan-name" id={`plan-${p.slug}`}>
              {p.name}
            </h3>
            <p className="fx-price">
              <span className="fx-price-n">{usd(p.monthly)}</span>
              <span className="fx-price-u">per month</span>
            </p>
            <p className="fx-plan-pitch">{p.pitch}</p>
            <p className="fx-plan-for">{p.forWho}</p>
            <ul className="fx-checks" role="list">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          {/* Term next to the button, never behind a link (doc §6). */}
          <p className="fx-plan-term">No website setup fee. {TERM_MONTHS}-month first term. One location.</p>
          <div className="fx-plan-cta">
            <Link href={contactFor(p.slug)} className="fx-btn fx-btn--p fx-btn--lg">
              {p.cta}
            </Link>
            {details && (
              <Link href={`/plans/${p.slug}`} className="fx-more">
                What’s included in {p.name}
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectPrice({ p }: { p: LiveProject }) {
  return (
    <p className="fx-price">
      {p.from && <span className="fx-price-from">From</span>}
      <span className="fx-price-n">{usd(p.price)}</span>
      <span className="fx-price-u">one time</span>
    </p>
  );
}

/** The two projects that can be bought today, ordering first and visually leading. */
export function ProjectCards() {
  return (
    <div className="fx-projects">
      {LIVE_PROJECTS.map((p, i) => (
        <article
          key={p.slug}
          className={`fx-project${i === 0 ? ' fx-project--lead' : ''}`}
          aria-labelledby={`proj-${p.slug}`}
        >
          <div className="fx-plan-body">
            <h3 className="fx-plan-name" id={`proj-${p.slug}`}>
              {p.name}
            </h3>
            <ProjectPrice p={p} />
            <p className="fx-plan-for">{p.pitch}</p>
            <ul className="fx-checks" role="list">
              {p.points.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <p className="fx-plan-term">{p.fine}</p>
          <div className="fx-plan-cta">
            <Link href={contactFor(p.slug)} className="fx-btn fx-btn--p fx-btn--lg">
              {p.cta}
            </Link>
            <Link href={`/projects/${p.slug}`} className="fx-more">
              See the full scope
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Request-only products: name and standard scope, no price on the page (doc §1, "launch catalog discipline"). */
export function RequestList() {
  return (
    <ul className="fx-req" role="list">
      {REQUEST_PROJECTS.map((p) => (
        <li key={p.slug}>
          <span className="fx-req-n">{p.name}</span>
          <span className="fx-req-s">{p.scope}</span>
          <Link href={contactFor(p.slug)}>{p.cta}</Link>
        </li>
      ))}
    </ul>
  );
}

export type Qa = { q: string; a: React.ReactNode };

export function Faq({ items }: { items: readonly Qa[] }) {
  return (
    <div className="fx-faq">
      {items.map((it) => (
        <details key={it.q}>
          <summary>{it.q}</summary>
          <div className="fx-faq-a">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/** The dark closing band every page ends on. */
export function CloseBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="fx-dark" aria-labelledby="close-h">
      <div className="fx-wrap fx-close">
        <div>
          <h2 className="fx-h2 fx-h2--first" id="close-h">
            {title}
          </h2>
          <p className="fx-p">{body}</p>
        </div>
        <div className="fx-btns">
          <Link href="/contact" className="fx-btn fx-btn--p fx-btn--lg">
            Tell me about your restaurant
          </Link>
          <a href={`sms:${CONTACT.phone}`} className="fx-btn fx-btn--s fx-btn--lg">
            Text Josh · {CONTACT.phonePretty}
          </a>
        </div>
      </div>
    </section>
  );
}
