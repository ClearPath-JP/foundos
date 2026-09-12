import type { Metadata } from 'next';
import Link from 'next/link';

import { LedgerHead, Rule, SHELL } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';
import {
  AdsCard,
  SHOP_CSS,
  ServiceCard,
  SoonRow,
  SystemCard,
  WebsiteCard,
  ldScript,
  systemsJsonLd,
  textAbout,
} from '@/components/shop';
import { DISCOUNT_TIERS, SERVICES, SYSTEMS, tierLabel } from '@/config/pricing';

/**
 * /systems — the shop. Every system as a product: what it does, its price, how
 * it works, and a way to ask about it.
 *
 * ⚠️ ONE PAGE, NOT NINE. The pricing spec asked for /systems/[slug], one page
 * per system. Five of the nine already have a long page of their own
 * (/online-ordering, /restaurant-websites, /ai-phone-answering,
 * /google-business-profile, /food-truck-location), and a second, thinner page
 * about the same thing is the near-duplicate problem services.ts warns about.
 * So each system links to its long page where one exists, and the others carry
 * their explanation inline in "How it works".
 *
 * ⚠️ READY AND COMING SOON DO NOT LOOK ALIKE, ON PURPOSE. A system that can be
 * built now gets a full card and its own button. One that cannot gets a ruled
 * row on the bone field with its price and its explanation and no button of
 * its own — the list shares one. Giving both the same card made the unbuilt
 * ones read as for sale.
 *
 * Two bands, not four: an earlier build gave the website and the add-ons a
 * band each, and both were a heading over one or two cards on 5,000px of ink.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'systems',
  title: 'Systems for Atlanta food trucks and restaurants — foundos',
  description:
    'Every system I build for Atlanta food trucks and restaurants: what each one does, what it needs from you, and what it costs to set up and run.',
  shareTitle: 'Every system, with its price on it',
  shareDescription: 'What each system does for a truck or a restaurant, and what it costs to set up and run.',
});

const HEAD = {
  label: 'Systems',
  h1: 'Every system I build, with its price on it.',
  stand:
    "For food trucks and restaurants around Atlanta. Each one sits on top of your website and has a setup price and a monthly price, and they're the same for everybody. Build more than one at once and the setup drops.",
};

const READY = SYSTEMS.filter((s) => s.status === 'live' && s.countsTowardDiscount);
const SOON = SYSTEMS.filter((s) => s.status === 'coming_soon' && s.countsTowardDiscount);
const ADDONS = SYSTEMS.filter((s) => !s.countsTowardDiscount);

/** Read off the tiers, so this sentence cannot disagree with the discount chart. */
const DISCOUNT_LINE = DISCOUNT_TIERS.filter((t) => t.setupPercentOff > 0)
  .map((t) => `${tierLabel(t)} systems at once, ${t.setupPercentOff}% off setup`)
  .join('. ');

const SECTIONS = {
  ready: {
    label: 'Ready now',
    h2: 'Ready for your place now.',
    stand: 'Every build starts with the website. Open "How it works" on anything below to see what happens and what I need from you.',
    addons: 'Add-ons and services',
    addonsStand:
      'The Second Location is a system. The rest is my time — quoted next to a build, never inside it, and it takes no package discount.',
  },
  soon: {
    label: 'Coming soon',
    h2: 'Priced and planned. Not built yet.',
    stand:
      "You can put any of these in your plan today, and you're not charged for one until it's ready. The ones that send texts also wait on carrier registration, which takes days to weeks.",
    /* Two services are coming soon as well, and they live in the add-ons block
       above. Without this line, "Coming soon" in the jump row looks like it
       covers all of them and quietly skips two. */
    elsewhere: 'Two services are coming soon too — social profile setup, and posts every week. They are up in',
    elsewhereLink: 'add-ons and services',
    cta: 'Tell me which one you want',
  },
  next: {
    lede: DISCOUNT_LINE
      ? `Buying more than one? ${DISCOUNT_LINE}. The website does not count toward the number.`
      : 'Buying more than one? The packages are on the pricing page.',
    cta: 'Packages and discounts',
  },
};

const CLOSE = "Tell me what you run and I'll tell you which of these you actually need.";

export default function SystemsPage() {
  return (
    <ServicePage slug="systems" label={HEAD.label} h1={HEAD.h1} stand={HEAD.stand} close={CLOSE} css={SHOP_CSS}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(systemsJsonLd()) }} />

      <nav aria-label="On this page">
        <div className={`${SHELL} sh-jump`}>
          {[
            ['#ready', SECTIONS.ready.label],
            ['#addons', SECTIONS.ready.addons],
            ['#soon', SECTIONS.soon.label],
            ['/pricing', 'Pricing'],
          ].map(([href, label]) => (
            <a key={href} className="eb-lab sh-jump-a" href={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>
      <Rule />

      <section aria-labelledby="sh-ready-h" id="ready">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={SECTIONS.ready.label} />
          <h2 className="eb-d eb-h2" id="sh-ready-h">
            {SECTIONS.ready.h2}
          </h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{SECTIONS.ready.stand}</p>
          <div className="sh-grid">
            <WebsiteCard />
          </div>
          <div className={`sh-grid${READY.length % 3 === 0 ? ' sh-grid--3' : ''}`}>
            {READY.map((s) => (
              <SystemCard key={s.slug} system={s} />
            ))}
          </div>
          <h3 className="eb-h3 sh-sub" id="addons">
            {SECTIONS.ready.addons}
          </h3>
          <p className="eb-p sh-mt-s">{SECTIONS.ready.addonsStand}</p>
          <div className="sh-grid">
            {ADDONS.map((s) => (
              <SystemCard key={s.slug} system={s} />
            ))}
            {SERVICES.filter((s) => !s.ask).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
            <AdsCard />
          </div>
        </div>
      </section>

      {/* ── Coming soon, on the bone field ──────────────────────────────────
          The one light ground on this page, and it is under the systems that
          are not built yet, so ready and not-ready are two different grounds
          as well as two different shapes. */}
      <Rule />
      <section aria-labelledby="sh-soon-h" id="soon" className="eb-g-bone">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={SECTIONS.soon.label} />
          <h2 className="eb-d eb-h2" id="sh-soon-h">
            {SECTIONS.soon.h2}
          </h2>
          <p className="eb-stand eb-stand--flush">{SECTIONS.soon.stand}</p>
          <p className="eb-p sh-mt-s">
            {SECTIONS.soon.elsewhere}{' '}
            <Link className="sh-link" href="#addons">
              {SECTIONS.soon.elsewhereLink}
            </Link>
            .
          </p>
          <ul className="sh-soon" role="list">
            {SOON.map((s) => (
              <SoonRow key={s.slug} system={s} />
            ))}
          </ul>
          <div className="eb-btns">
            <a className="eb-btn eb-btn--a" href={textAbout('the coming-soon systems')}>
              {SECTIONS.soon.cta}
            </a>
          </div>
        </div>
      </section>
      <Rule />

      <section aria-label="Packages">
        <div className={`${SHELL} eb-sec`}>
          <p className="eb-lede eb-lede--strong">{SECTIONS.next.lede}</p>
          <div className="eb-btns">
            <Link className="eb-btn eb-btn--a" href="/pricing">
              {SECTIONS.next.cta}
            </Link>
          </div>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
