import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CloseBand, contactFor } from "@/components/fx/cards";
import { CommissionMath } from "@/components/fx/commission";
import Shell from "@/components/fx/Shell";
import { LiquidBackground } from "@/components/fx/LiquidBackground";
import {
  BOTH_SYSTEMS,
  PLAN_TERMS,
  PLANS,
  PROJECTS,
  TERM_MONTHS,
  usd,
  type LiveProject,
} from "@/config/offer";
import {
  LIMITS,
  NOT_YET,
  SAFEGUARDS,
  SYSTEMS,
  type RestaurantSystem,
} from "@/config/systems";

const TITLE = "Restaurant systems: booking and online ordering | foundos";
const DESCRIPTION =
  "Restaurant reservations and online pickup ordering for restaurants in Marietta and around Atlanta: what each system does for guests, staff and owners, what happens when things go wrong, and how they are set up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "./restaurant-systems",
    siteName: "foundos",
    type: "website",
    locale: "en_US",
  },
};

const growth = PLANS[1];
const live = (slug: string) =>
  PROJECTS.find(
    (p): p is LiveProject => p.slug === slug && p.status === "live",
  );
const launch = live("direct-ordering-launch");
const bookingLaunch = live("booking-launch");
const setupFor = (s: RestaurantSystem) =>
  s.slug === "booking" ? bookingLaunch : launch;
const contactSlug = (s: RestaurantSystem) => setupFor(s)?.slug ?? growth.slug;

/** The price at a glance, for the chooser cards. The full sentence is in each system's section. */
function shortPrice(s: RestaurantSystem): string {
  const monthly = `${usd(growth.monthly)} a month`;
  const setup = setupFor(s);
  return setup
    ? `${monthly} + ${setup.from ? "from " : ""}${usd(setup.price)} one-time setup, tablet included`
    : monthly;
}

/** What each system costs, read from the offer so a price is never typed twice. */
/** Structured data: the two systems as services offered by foundos, priced from offer.ts. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "foundos restaurant systems",
  itemListElement: SYSTEMS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: `${s.forWho} ${s.replaces}`,
      serviceType:
        s.slug === "booking"
          ? "Restaurant reservation system"
          : "Restaurant online ordering system",
      areaServed: { "@type": "State", name: "Georgia" },
      provider: {
        "@type": "ProfessionalService",
        name: "foundos",
        url: "https://foundos.ai",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Marietta",
          addressRegion: "GA",
          addressCountry: "US",
        },
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: growth.monthly,
        description: priceLine(s),
      },
    },
  })),
};

function priceLine(s: RestaurantSystem): string {
  const setup = setupFor(s);
  if (!setup) return `${growth.name} plan, ${usd(growth.monthly)} a month`;
  const what =
    s.slug === "booking"
      ? "your floor plan built by hand, your rules, the host-stand tablet and stand, and a test service with your staff"
      : "your menu and tax set up, the kitchen tablet and stand, and a test service with your team";
  return `${growth.name} plan, ${usd(growth.monthly)} a month, plus a one-time ${setup.name}: ${setup.from ? "from " : ""}${usd(setup.price)} for ${what}`;
}

function SystemSection({ s }: { s: RestaurantSystem }) {
  const setup = setupFor(s);
  return (
    <section
      className="fx-sec fx-lsec"
      id={s.slug}
      aria-labelledby={`${s.slug}-h`}
    >
      <LiquidBackground className="fx-liquid--top" />
      <div className="fx-wrap">
        <p className="fx-kicker">
          {s.slug === "booking" ? "System one" : "System two"}
        </p>
        <h2 className="fx-h2" id={`${s.slug}-h`}>
          {s.name}
        </h2>
        <p className="fx-p">
          {s.forWho} {s.replaces}
        </p>
        <p className="fx-sys-price">{shortPrice(s)}</p>
        <p className="sy-nocut-s">
          {TERM_MONTHS}-month first term. No cut of your{" "}
          {s.slug === "booking" ? "bookings, no fee per guest" : "orders, no fee per order"}.
        </p>
        <p className="sy-limits">{LIMITS[s.slug]}</p>

        <div className="fx-sys-sides">
          {s.sides.map((side) => (
            <div key={side.who} className="fx-sys-side">
              <h3 className="fx-sys-who">{side.who}</h3>
              <ul className="fx-checks" role="list">
                {side.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sy-setup">
          <p className="sy-setup-h">{s.setup.title}</p>
          <ol className="sy-setup-list">
            {s.setup.steps.map((st) => (
              <li key={st.t}>
                <strong>{st.t}</strong> {st.d}
              </li>
            ))}
          </ol>
          {setup && (
            <p className="fx-note">
              That’s the one-time {setup.name}, {setup.from ? "from " : ""}
              {usd(setup.price)}, and the tablet is yours to keep.{" "}
              <Link href={`/projects/${setup.slug}`}>See the full scope</Link>
            </p>
          )}
        </div>

        <figure className="fx-shot">
          <Image
            className="fx-sys-wide"
            src={s.shot.src}
            alt={s.shot.alt}
            width={1440}
            height={900}
            sizes="(min-width:1120px) 1040px, 92vw"
          />
          <Image
            className="fx-sys-narrow"
            src={s.shot.crop}
            alt={s.shot.alt}
            width={s.slug === "booking" ? 362 : 446}
            height={s.slug === "booking" ? 316 : 450}
            sizes="92vw"
          />
          <figcaption>{s.shot.caption}</figcaption>
        </figure>

        <div className="fx-sys-try">
          <p className="fx-sys-try-t">
            Try it on <strong>{s.demo.name}</strong>, a concept restaurant built
            to show the system working. The demo runs on sample data that
            clears itself; your restaurant gets its own setup, tested with your
            staff before it goes live.
          </p>
          <div className="fx-sys-try-btns">
            <a
              href={s.demo.guestUrl}
              className="fx-btn fx-btn--p fx-btn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.demo.guestCta}
              <span className="fx-sr"> (opens in a new tab)</span>
            </a>
            <a
              href={s.demo.staffUrl}
              className="fx-btn fx-btn--s fx-btn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.demo.staffCta}
              <span className="fx-sr"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="fx-note">
            The staff screen needs a PIN. Text me and I’ll send it, or walk you
            through it live.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function RestaurantSystemsPage() {
  return (
    <Shell current="systems">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c"),
        }}
      />
      <section className="fx-phead">
        <LiquidBackground />
        <div className="fx-wrap">
          <p className="fx-eyebrow">Restaurant systems</p>
          <h1 className="fx-h1">
            Not just a website. The tools that run the service.
          </h1>
          <p className="fx-lede">
            Table booking or pickup ordering on your website, running on a
            tablet I set up for your staff.
          </p>
          <p className="sy-nocut">
            I never take a percentage of your orders or your bookings. One flat
            monthly price, whether you do 50 or 500.
          </p>
        </div>
      </section>

      <section className="fx-sec fx-sec--join" aria-labelledby="pick-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="pick-h">
            Which one is yours?
          </h2>
          <div className="fx-plans">
            {SYSTEMS.map((s) => (
              <article
                key={s.slug}
                className="fx-plan"
                aria-labelledby={`card-${s.slug}`}
              >
                <div className="fx-plan-body">
                  <h3 className="fx-plan-name" id={`card-${s.slug}`}>
                    {s.name}
                  </h3>
                  <p className="fx-plan-for">{s.forWho}</p>
                  <p className="fx-sys-short">{shortPrice(s)}</p>
                  <p className="sy-limits">{LIMITS[s.slug]}</p>
                </div>
                <div className="fx-plan-cta">
                  <a
                    href={`#${s.slug}`}
                    className="fx-btn fx-btn--p fx-btn--lg"
                  >
                    See how it works
                  </a>
                  <Link href={contactFor(contactSlug(s))} className="fx-more">
                    Ask about it for your restaurant
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="fx-note">
            <strong>Need booking and ordering?</strong> Add the second system
            for {usd(BOTH_SYSTEMS.addMonthly)} a month, so{" "}
            {usd(growth.monthly + BOTH_SYSTEMS.addMonthly)} in total. Set up
            together, both are {usd(BOTH_SYSTEMS.setup)}, with both tablets
            included.{" "}
            <Link href={contactFor("both-systems")}>Ask about both</Link>
          </p>
          <p className="fx-note">
            Both systems sit on the Growth plan, which includes your website
            too. Just need a website? That’s Digital Care.
          </p>
          <p className="fx-sys-links">
            <Link href="/plans/growth" className="fx-more">
              What’s in Growth
            </Link>
            <Link href="/plans/digital-care" className="fx-more">
              What’s in Digital Care
            </Link>
          </p>
        </div>
      </section>

      {SYSTEMS.map((s) => (
        <SystemSection key={s.slug} s={s} />
      ))}

      <section
        className="fx-sec fx-sec--tint"
        id="commission"
        aria-labelledby="commission-h"
      >
        <div className="fx-wrap">
          <CommissionMath />
        </div>
      </section>

      <section className="fx-sec fx-sec--tint" aria-labelledby="wrong-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="wrong-h">
            Busy nights break things. Here’s what happens.
          </h2>
          <p className="fx-p">
            The questions owners ask before trusting a system with a Friday
            night, and what these systems do about them.
          </p>
          <details className="fx-details">
            <summary>See all {SAFEGUARDS.length} answers</summary>
            <table className="fx-table fx-sys-table">
              <thead>
                <tr>
                  <th scope="col">When…</th>
                  <th scope="col">What happens</th>
                </tr>
              </thead>
              <tbody>
                {SAFEGUARDS.map((g) => (
                  <tr key={g.when}>
                    <th scope="row">
                      {g.when}
                      <span className="fx-sys-tag">
                        {g.system === "Both" ? "Booking + ordering" : g.system}
                      </span>
                    </th>
                    <td>{g.then}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      </section>

      <section className="fx-sec" aria-labelledby="yours-h">
        <div className="fx-wrap">
          <p className="fx-kicker">Straight answers</p>
          <h2 className="fx-h2" id="yours-h">
            Your data, support, and what isn’t included
          </h2>
          <div className="fx-sys-answers">
            <div className="fx-sys-answer">
              <h3 className="fx-h3">Your guests stay yours</h3>
              <p className="fx-p">
                Bookings, orders and guest details live in a database for your
                restaurant, not on a marketplace that markets other restaurants
                to your guests. Staff sign in with your PIN and their own name,
                and every change is logged under that name.
              </p>
            </div>
            <div className="fx-sys-answer">
              <h3 className="fx-h3">Support hours, and if it goes down</h3>
              <p className="fx-p">
                {PLAN_TERMS.hours} On {growth.name}, I acknowledge requests within
                one business day. There’s no evening or weekend on-call today.
              </p>
              <p className="fx-p">
                If a screen or the internet drops during service, online ordering
                pauses itself after three minutes so no order goes unseen, and
                phone orders, phone bookings and walk-ins carry on as normal. Text
                me and I’ll fix it in support hours.
              </p>
            </div>
            <div className="fx-sys-answer">
              <h3 className="fx-h3">Not included today</h3>
              <ul className="fx-sys-not" role="list">
                {NOT_YET.map((n) => (
                  <li key={n.t}>
                    <strong>{n.t}.</strong> {n.d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CloseBand
        title="Want to see it on a real Friday?"
        body="Text me. I’ll walk you through the host stand or the kitchen screen live, with your menu or your room in mind, in about fifteen minutes."
      />
    </Shell>
  );
}
