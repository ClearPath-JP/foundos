import type { ReactNode } from 'react';
import Link from 'next/link';

import {
  LedgerHead,
  MobileActionBar,
  Rule,
  SHELL,
  SiteFooter,
  SiteHeader,
  TextMeButton,
  siteCss,
  siteFontClass,
} from '@/components/site';

import { SERVICE_CSS } from './css';
import { SHOP_PAGES, otherServices, type PageSlug } from './services';

/**
 * The scaffolding every service page shares: the ink spine, the sticky header,
 * the page head, the cross-link ledger, the ember close and the phone bar.
 *
 * ── WHAT THIS COMPONENT OWNS AND WHAT IT DOES NOT ─────────────────────────
 *
 * It owns the CHROME and the NEXT STEP, because those are site-level and a page
 * that could make them different is a page that will. It owns nothing else: the
 * argument, every section, every h2 and every word between the head and the
 * cross-links is the page's own, passed in as children. That split is the whole
 * reason these five pages are allowed to exist — see the note at the top of
 * services.ts on why there are five of them and not thirty.
 *
 * ⚠️ THE H1 IS HERE, WHICH MEANS A PAGE MUST NOT RENDER ITS OWN. One h1 per
 * page, and `.eb-h1` (36px → 96px) has to keep clearly outranking `.eb-h2`
 * (26px → 44px) at every width — at 390px that is 36 against 26. A section
 * heading inside `children` is an h2; a sub-heading inside a section is an h3
 * at body size, the way the homepage does it. There are no mid-size headings in
 * this system and adding one quietly undoes the type scale.
 *
 * ⚠️ NO JSON-LD HERE. Structured data for these routes is a separate pass, and
 * two files emitting overlapping graphs for one URL is worse than none.
 */

/**
 * The two things a visitor can do at the foot of any page on this site, and
 * they are the same two the homepage offers. Held as constants for the reason
 * the copy blocks below are: an apostrophe in JSX text has to be escaped, and
 * the cheapest way round that is to expand the contraction, which is how a page
 * stops sounding like Josh.
 *
 * The report lives at /#report on the homepage — the cream order pad. It is not
 * re-rendered here on purpose: <InstantReport /> is a client component that
 * calls a rate-limited, quota-capped API, and putting a second entry point on
 * five more routes multiplies the ways that quota gets spent by crawlers and
 * curious visitors without adding a single thing a reader could not get by
 * tapping through.
 */
const CTA = {
  report: 'Free report',
  reportHref: '/#report',
  more: 'The rest of it',
  /** The one internal link back to the top of the funnel, on every page. */
  homeTitle: 'Start here',
  homeNote:
    'The homepage, and the free report — type your name, it pulls your Google listing and your site and tells you what it finds. About ten seconds, no email.',
};

export type ServicePageProps = {
  /** Which page this is. Drives the cross-link block only. */
  slug: PageSlug;
  /** A page's own stylesheet, shipped after SERVICE_CSS. The shop pages use it. */
  css?: string;
  /** The mono ledger label above the headline. Two or three words. */
  label: string;
  /** The one h1 on the page. */
  h1: string;
  /** The standfirst under it — what this page is going to argue. */
  stand: string;
  /** The closing line on the ember field. Display type, so it may be long. */
  close: string;
  children: ReactNode;
};

export function ServicePage({ slug, css = '', label, h1, stand, close, children }: ServicePageProps) {
  const others = otherServices(slug);
  const shop = SHOP_PAGES.filter((p) => p.slug !== slug);

  return (
    <div className={`eb ${siteFontClass}`} id="top">
      {/* Design system first, this file's own devices second — `siteCss`
          enforces that order, and it is the only reason a rule in SERVICE_CSS
          can override one in SITE_CSS at equal specificity. Both sheets ship
          with their comments stripped. */}
      <style>{siteCss(`${SERVICE_CSS}${css}`)}</style>

      <SiteHeader />

      <main>
        {/* ── The page head ───────────────────────────────────────────────
            Label, headline, standfirst, rule. No field behind it: ember is
            the homepage hero and the close on every page, and a third ember
            band per page would spend the one device that says "this is the
            end, do something". */}
        <section>
          <div className={`${SHELL} sv-hero`}>
            <LedgerHead label={label} />
            <h1 className="eb-d eb-h1 sv-hero-h">{h1}</h1>
            <p className="eb-stand sv-hero-s">{stand}</p>
          </div>
        </section>
        <Rule />

        {children}

        {/* ── The rest of the site ────────────────────────────────────────
            Four ruled rows, not a grid of cards. Every service page links to
            the other three and to the homepage, so none of these routes is an
            orphan reachable only from the sitemap, and a reader who finishes
            one has somewhere honest to go next. */}
        <section aria-labelledby="sv-more-h">
          <div className={`${SHELL} eb-sec`}>
            <LedgerHead label={CTA.more} />
            <h2 className="eb-sr" id="sv-more-h">
              {CTA.more}
            </h2>
            <ul className="sv-more" role="list">
              {shop.map((s) => (
                <li key={s.slug}>
                  <Link className="sv-more-a" href={`/${s.slug}`}>
                    <span className="sv-more-t">{s.label}</span>
                    <span className="sv-more-n">{s.note}</span>
                  </Link>
                </li>
              ))}
              {others.map((s) => (
                <li key={s.slug}>
                  <Link className="sv-more-a" href={`/${s.slug}`}>
                    <span className="sv-more-t">{s.label}</span>
                    <span className="sv-more-n">{s.note}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link className="sv-more-a" href={CTA.reportHref}>
                  <span className="sv-more-t">{CTA.homeTitle}</span>
                  <span className="sv-more-n">{CTA.homeNote}</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
        <Rule />

        {/* ── The close — ember, the same bookend as the homepage ─────────
            ⚠️ DISPLAY TYPE AND BUTTON SLABS ONLY ON THIS FIELD. Ink on ember
            is 4.24:1: legal above the WCAG large-scale floor, illegal at body
            or fine size. A 13px line of small print under these buttons would
            be a real accessibility regression, which is why the explanation of
            what the report is sits in the ledger row above, on the ink spine
            where prose runs at about 11:1. */}
        <section className="eb-g-ember">
          <div className={`${SHELL} sv-close`}>
            <p className="eb-d eb-h2 sv-close-h">{close}</p>
            <Rule bleed />
            <div className="eb-btns">
              <TextMeButton />
              <Link className="eb-btn eb-btn--b" href={CTA.reportHref}>
                {CTA.report}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Below 640px only. The primary action is fixed site-wide (text the
          number); the second one is this family's choice and it points at the
          one thing a stranger can do here without talking to anybody. */}
      <MobileActionBar secondary={{ href: CTA.reportHref, label: CTA.report }} />
    </div>
  );
}

export default ServicePage;
