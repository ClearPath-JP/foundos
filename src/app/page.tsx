import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { CloseBand } from '@/components/fx/cards';
import { LiquidBackground } from '@/components/fx/LiquidBackground';
import Shell from '@/components/fx/Shell';
import { CONTACT, LIVE_PROJECTS, PLANS, TERM_MONTHS, usd } from '@/config/offer';
import { WORK } from '@/config/work';

import { SITE_URL } from './site';

/**
 * The homepage — the business-card front door. An owner scans the card on their phone. The first screen gives
 * them one concrete promise ("kept right"), the price with its term, and two buttons: Text Josh and the demos.
 * 2026-10-04 conversion review: the automated audit is no longer the hero (a blocked scan must not be the first
 * thing an owner sees); it stays one link away. The concept work sits directly under the hero as proof.
 * Everything else lives behind those links, so this page stays short (feedback memo "homepage = short front door").
 *
 * Replaces the 2026-10-01 long homepage (hero sheet, handles, ladder, commission math, steps, FAQ); that version is
 * in git at 696e4b9. The ladder, commission math and FAQ still live on /plans and /restaurant-systems.
 */

const TITLE = 'foundos | Restaurant websites, ordering and booking, brought to a 2026 standard';
const DESCRIPTION =
  'Restaurant websites, online ordering and table booking, built and kept up for you by Josh in Marietta. From $299 a month, no cut of your sales. Get a free digital audit of your restaurant.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  /* Page-level openGraph replaces layout.tsx's whole block, so every field is restated. */
  openGraph: { title: TITLE, description: DESCRIPTION, url: './', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

const [care, growth] = PLANS;
/** The two one-time system setups, named in the price list so neither is a surprise later. */
const bookingSetup = LIVE_PROJECTS.find((p) => p.slug === 'booking-launch');
const orderingSetup = LIVE_PROJECTS.find((p) => p.slug === 'direct-ordering-launch');
/** The desktop hero mockup: the booking concept on a phone. */
const heroWork = WORK.find((w) => w.slug === 'cinder-and-fig') ?? WORK[0];

/** Only verified facts: no street address, no ratings, no hours. */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'foundos',
  url: SITE_URL,
  email: CONTACT.email,
  telephone: '+1-404-436-3393',
  founder: { '@type': 'Person', name: 'Josh Potesta' },
  address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' },
  areaServed: { '@type': 'City', name: 'Marietta' },
  description: 'Managed websites, online ordering and table booking for independent restaurants.',
  makesOffer: PLANS.map((p) => ({
    '@type': 'Offer',
    name: p.name,
    priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthly, priceCurrency: 'USD', unitText: 'MONTH' },
  })),
};

/** Where to go after the audit. Same names as the header. */
const DOORS = [
  { href: '/work', t: 'See my work', d: 'Two restaurants built end to end. Open them and try them.' },
  { href: '/restaurant-systems', t: 'Systems', d: 'Online ordering and table booking, with the staff screens.' },
  { href: '/plans', t: 'Plans & pricing', d: `${care.name} ${usd(care.monthly)}/mo · ${growth.name} ${usd(growth.monthly)}/mo` },
] as const;

/** What "a 2026 standard" means, in owner language: what customers expect now, and what it replaces. */
const STANDARD = [
  {
    t: 'Built for the phone in their hand',
    d: 'Menu, call and directions in one tap each. Most people look you up on a phone, often standing outside.',
  },
  {
    t: 'A menu that’s easy on a phone',
    d: 'Real text on a real page instead of a PDF or a photo of the printed menu: easier to read and scroll on a phone, and quick to update when a price changes.',
  },
  {
    t: 'Your own food, photographed well',
    d: 'Real dishes and your real room, not stock photos or three blurry pictures from 2019. People eat with their eyes first.',
  },
  {
    t: 'Order or book without calling',
    d: 'Pickup orders and table bookings straight from your site, landing on a tablet your staff already watch. No app taking a cut.',
  },
  {
    t: 'Google says what your door says',
    d: 'Hours, photos, takeout and your link set up on your Google Business Profile, and matching your website.',
  },
  {
    t: 'Every button works, and it stays current',
    d: 'No dead “Order Online” links, no 2021 in the footer. Holiday hours and new prices changed when you text me.',
  },
] as const;

export default function HomePage() {
  return (
    <Shell current={null}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, '\\u003c') }}
      />

      {/* ── Hero: the promise, the price, Text Josh, the demos ─────────── */}
      <section className="fx-hero hm-hero">
        <LiquidBackground />
        <div className="fx-wrap hm-hero-grid">
          <div className="hm-hero-copy">
            <p className="fx-eyebrow">Restaurants in Marietta &amp; metro Atlanta</p>
            <h1 className="fx-h1 hm-h1">
              Your restaurant’s website, <span className="fx-accent">kept right.</span>
            </h1>
            <p className="fx-lede hm-lede">
              I build and manage restaurant websites for Marietta and metro Atlanta, so customers can find your menu,
              check your hours, and reach you easily. When you need pickup ordering or table booking, I set that up with
              your staff.
            </p>
            <p className="hm-price">
              <strong>{usd(care.monthly)} a month</strong> for a managed website. No website setup fee, a{' '}
              {TERM_MONTHS}-month first term, and never a cut of your sales.
            </p>

            <div className="fx-btns hm-ctas">
              <a href={`sms:${CONTACT.phone}`} className="fx-btn fx-btn--p fx-btn--lg">
                Text Josh your restaurant’s name
              </a>
              <Link href="/work" className="fx-btn fx-btn--s fx-btn--lg">
                See the restaurant demos
              </Link>
            </div>

            <p className="hm-josh">
              <Image src="/josh-face.jpg" alt="Josh Potesta" width={52} height={52} className="hm-josh-img" priority />
              <span>
                Josh · <a href={`sms:${CONTACT.phone}`}>{CONTACT.phonePretty}</a> ·{' '}
                <Link href="/audit">Or run a free website check</Link>
              </span>
            </p>
          </div>

          <div className="hm-hero-art" aria-hidden="true">
            <div className="hm-phone">
              <Image src={heroWork.images.phone} alt="" width={390} height={844} sizes="300px" priority />
            </div>
            <p className="hm-hero-cap">{heroWork.name} · concept build</p>
          </div>
        </div>

        <div className="fx-wrap">
          <nav aria-label="Or look around">
            <ol className="hm-doors" role="list">
              {DOORS.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className="hm-door">
                    <span className="hm-door-t">{d.t}</span>
                    <span className="hm-door-d">{d.d}</span>
                    <span className="hm-door-go" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ── Work: phone screenshots on a phone, desktop ones on a desktop ── */}
      <section className="fx-sec fx-lsec" aria-labelledby="work-h">
        <LiquidBackground className="fx-liquid--bottom" />
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="work-h">
            My work. Open them, place an order, book a table.
          </h2>
          <ul className="fx-work-grid hm-work" role="list">
            {WORK.map((item) => (
              <li key={item.slug}>
                <Link href={`/work/${item.slug}`} className="fx-wcard" aria-label={`${item.name}: ${item.type}. See the project`}>
                  <span className="fx-wcard-img">
                    <Image className="wc-desk" src={item.images.desktop} alt="" width={1440} height={900} sizes="(min-width:760px) 45vw, 1px" />
                    <Image className="wc-phone" src={item.images.phone} alt="" width={390} height={844} sizes="(max-width:759px) 92vw, 1px" />
                  </span>
                  <span className="fx-wcard-body">
                    <span className="fx-wcard-tags">
                      <span className="fx-wcard-tag">{item.kind === 'concept' ? 'Concept' : 'Client'}</span>
                    </span>
                    <span className="fx-wcard-name">{item.name}</span>
                    <span className="fx-wcard-sys">{item.systemLabel}</span>
                    <span className="fx-wcard-more">See how I built it</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="fx-note">Both are concept restaurants, built to show the whole job. They’re labelled that way everywhere.</p>
        </div>
      </section>

      {/* ── What a 2026 standard means ───────────────────────────────── */}
      <section className="fx-sec fx-sec--tint" aria-labelledby="std-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="std-h">
            What “a 2026 standard” means
          </h2>
          <p className="fx-p">
            Most restaurant websites were built once and left alone. Customers notice. These six are what a site has to
            do now. The free website check looks at the parts a computer can test, and I go through the rest by hand.
          </p>
          <ol className="hm-std" role="list">
            {STANDARD.map((s, i) => (
              <li key={s.t}>
                <p className="hm-std-t">
                  <span className="hm-std-n">{i + 1}.</span> {s.t}
                </p>
                <p className="hm-std-d">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="fx-btns">
            <Link href="/audit" className="fx-btn fx-btn--p fx-btn--lg">
              See how your restaurant measures up
            </Link>
          </div>
        </div>
      </section>

      {/* ── Prices as a menu ─────────────────────────────────────────── */}
      <section className="fx-sec fx-sec--tint" aria-labelledby="price-h">
        <div className="fx-wrap">
          <h2 className="fx-h2 fx-h2--first" id="price-h">
            Two plans. No cut of your sales.
          </h2>
          <ul className="hm-menu" role="list">
            <li>
              <Link href="/plans/digital-care" className="hm-menu-row">
                <span className="hm-menu-t">{care.name}</span>
                <span className="hm-menu-dots" aria-hidden="true" />
                <span className="hm-menu-n">
                  {usd(care.monthly)}
                  <small>/mo</small>
                </span>
              </Link>
              <p className="hm-menu-d">
                Your website, managed: built, hosted and kept up to date. Menu, hours, photos, Google. No website setup
                fee, {TERM_MONTHS}-month first term.
              </p>
            </li>
            <li>
              <Link href="/plans/growth" className="hm-menu-row">
                <span className="hm-menu-t">{growth.name}</span>
                <span className="hm-menu-dots" aria-hidden="true" />
                <span className="hm-menu-n">
                  {usd(growth.monthly)}
                  <small>/mo</small>
                </span>
              </Link>
              <p className="hm-menu-d">
                Everything in {care.name}, plus pickup ordering or table booking on a tablet your staff watch.{' '}
                {TERM_MONTHS}-month first term, plus a one-time setup with the tablet and stand included
                {bookingSetup && orderingSetup
                  ? `: ${usd(bookingSetup.price)} for booking, ${orderingSetup.from ? 'from ' : ''}${usd(orderingSetup.price)} for ordering`
                  : ''}
                .
              </p>
            </li>
          </ul>
          <p className="fx-p">
            <Link href="/plans" className="fx-more">
              See everything that’s included, and the fine print
            </Link>
          </p>
        </div>
      </section>

      <CloseBand
        title="You’ll work directly with Josh."
        body="I’m Josh Potesta, based in Marietta. Text me your restaurant’s name and I’ll tell you what I’d fix first, or that you’re already in good shape."
      />
    </Shell>
  );
}
