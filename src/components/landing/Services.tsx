import Image from 'next/image';
import Link from 'next/link';

import { AUDIT_EMAIL } from '@/config/audit';
import { NEXT_STEPS, SERVICES, TERMS, WHY_MONTHLY, usd, type Service } from '@/config/services';
import { WORK } from '@/config/work';

/**
 * The services and pricing sections of the landing page. Server-rendered, no script.
 * Every price and claim comes from src/config/services.ts (Josh confirmed the prices 2026-10-12).
 *
 * Every button leads to the request form (#request), which comes to Josh's email. josh@foundos.ai is the one
 * plain-text fallback. Josh, 2026-10-12: no Instagram button until he's posting content. No phone, no booking link
 * (the old Calendly link 404s), no hello@ address.
 */

/** Pre-filled subject only. Nothing personal goes in the URL. */
export function mailto(subject: string): string {
  return `mailto:${AUDIT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

function PriceLine({ service, light = false }: { service: Service; light?: boolean }) {
  const p = service.price;
  return (
    <p className={light ? 'svc-price svc-price--light' : 'svc-price'}>
      {p.kind === 'monthly' ? (
        <span className="svc-price-big">
          {usd(p.monthly)}
          <span className="svc-price-per">/month</span>
        </span>
      ) : (
        <span className="svc-price-big">
          <span className="svc-price-per svc-price-from">from </span>
          {usd(p.oneTime)}
          <span className="svc-price-per"> one-time</span>
        </span>
      )}
      <span className="svc-price-sub">{service.priceNote}</span>
    </p>
  );
}

/** The form is the main route. `subject` pre-fills the plain email fallback. */
export function ContactButtons({ subject, label }: { subject: string; label: string }) {
  return (
    <div className="svc-btns">
      <a href="/#request" className="fx-btn fx-btn--p">
        {label} <span aria-hidden="true">↓</span>
      </a>
      <p className="svc-btns-alt">
        or email <a href={mailto(subject)}>{AUDIT_EMAIL}</a>
      </p>
    </div>
  );
}

/** The three offers. Each card holds everything: who it's for, the price, 3-4 plain lines, the full list behind a
    tap, and one button. No second details section to scroll to. */
export function ServiceCards() {
  return (
    <section className="lp-sec svc-sec" id="services" aria-labelledby="services-h">
      <div className="fx-wrap">
        <p className="lp-ch-kicker">Pricing</p>
        <h2 className="lp-h2 svc-h2" id="services-h">
          Simple, clear pricing.
        </h2>
        <ul className="svc-cards" role="list">
          {SERVICES.map((s) => (
            <li
              key={s.slug}
              id={`svc-${s.slug}`}
              className={s.featured ? 'svc-card svc-card--featured' : 'svc-card'}
            >
              {s.featured && <span className="svc-card-badge">Website included</span>}
              <h3 className="svc-card-t">{s.name}</h3>
              <p className="svc-card-o">{s.forWho}</p>
              <PriceLine service={s} />
              <ul className="svc-list svc-card-list" role="list">
                {s.short.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <details className="svc-excl">
                <summary>See everything included</summary>
                <ul className="svc-list" role="list">
                  {s.includes.map((i) => (
                    <li key={i} className={i.startsWith('·') ? 'svc-list-sub' : undefined}>
                      {i.replace(/^·\s*/, '')}
                    </li>
                  ))}
                </ul>
                <p className="svc-list-cap svc-card-cap">Not included</p>
                <ul className="svc-list svc-list--x" role="list">
                  {s.excludes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                {s.notes?.map((n) => (
                  <p key={n} className="svc-note">
                    {n}
                  </p>
                ))}
              </details>
              <a href="#request" className="fx-btn fx-btn--p svc-card-btn">
                {s.cta}
              </a>
            </li>
          ))}
        </ul>
        <p className="svc-cards-alt">
          Questions first? Email <a href={mailto('A question about FoundOS')}>{AUDIT_EMAIL}</a>
        </p>
      </div>
    </section>
  );
}

/** Why $299 a month: what the monthly price actually pays for. */
export function WhyMonthly() {
  return (
    <section className="lp-checks svc-why" aria-labelledby="why-h">
      <div className="fx-wrap">
        <p className="lp-checks-kicker">What the monthly price covers</p>
        <h2 className="lp-h2 lp-h2--light" id="why-h">
          Not just a website. A website that’s taken care of.
        </h2>
        <ul className="svc-why-list" role="list">
          {WHY_MONTHLY.map((w) => (
            <li key={w.t}>
              <h3 className="svc-why-t">{w.t}</h3>
              <p className="svc-why-d">{w.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** What happens after someone reaches out, then the plain terms. No minimum term until Josh sets one. */
export function NextSteps() {
  return (
    <section className="lp-sec svc-terms" id="next" aria-labelledby="next-h">
      <div className="fx-wrap">
        <p className="lp-ch-kicker">How it works</p>
        <h2 className="lp-h2 svc-h2" id="next-h">
          What happens next.
        </h2>
        <ol className="svc-steps" role="list">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.t}>
              <span className="svc-flow-dot" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="svc-step-t">{s.t}</h3>
                <p className="svc-step-d">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="svc-list-cap svc-terms-cap">Good to know</p>
        <ul className="svc-list" role="list">
          {TERMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The two concept builds, labelled Concept, opening their /work pages. */
export function WorkConcepts() {
  return (
    <section className="lp-sec svc-work" id="work" aria-labelledby="work-h">
      <div className="fx-wrap">
        <p className="lp-ch-kicker">Work</p>
        <h2 className="lp-h2 svc-h2" id="work-h">
          See the kind of thing I build.
        </h2>
        <p className="lp-ch-p">
          These are concept builds: fictional restaurants made end to end to show the experience. They aren’t paid
          client work, and they’re labelled that way.
        </p>
        <ul className="svc-work-list" role="list">
          {WORK.map((w) => (
            <li key={w.slug}>
              <Link href={`/work/${w.slug}`} className="svc-work-card">
                <Image src={w.images.desktop} alt="" width={1440} height={900} sizes="(min-width:860px) 520px, 92vw" />
                <span className="svc-work-tag">{w.kind === 'concept' ? 'Concept' : 'Client'}</span>
                <span className="svc-work-t">{w.name}</span>
                <span className="svc-work-d">{w.type}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Contact: the two verified routes. */
export function ContactSection() {
  return (
    <section className="lp-sec svc-contact" id="contact" aria-labelledby="contact-h">
      <div className="fx-wrap">
        <h2 className="lp-h2 svc-h2" id="contact-h">
          Talk to Josh.
        </h2>
        <p className="lp-ch-p">
          Tell me about your business and what you’d like your website to do. The form comes straight to my inbox,
          and I reply personally.
        </p>
        <ContactButtons subject="About a website for my business" label="Fill out the form" />
      </div>
    </section>
  );
}
