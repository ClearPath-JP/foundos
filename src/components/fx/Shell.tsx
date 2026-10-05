import { Fraunces, Manrope } from 'next/font/google';
import Link from 'next/link';

import { CONTACT } from '@/config/offer';

import { FX_CSS } from './css';
import { FX_FLAT_CSS } from './flat-css';
import { FX_HOME_CSS } from './home-css';
import { FX_OFFER_CSS } from './offer-css';
import { FX_PORTFOLIO_CSS } from './portfolio-css';
import { FX_SYSTEMS_CSS } from './systems-css';

const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });
/** Headlines and prices only (2026-10-04 review): a warm menu serif, so the site stops reading as a SaaS template. */
const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-display', axes: ['opsz', 'SOFT'] });

export type NavKey = 'plans' | 'systems' | 'work' | 'audit' | 'contact' | null;

/**
 * Main navigation: four places, short enough to fit one row on a phone. Pricing holds plans, projects and how it
 * works (2026-10-03 consolidation). "Results" waits for authorized examples; "Client login" for a portal.
 */
const NAV: readonly { key: Exclude<NavKey, null | 'contact'>; href: string; label: string }[] = [
  { key: 'plans', href: '/plans', label: 'Plans & pricing' },
  { key: 'systems', href: '/restaurant-systems', label: 'Systems' },
  { key: 'work', href: '/work', label: 'Work' },
  { key: 'audit', href: '/audit', label: 'Free audit' },
];

/** Every page of the restaurant offer: one font, one stylesheet, one header and footer. */
export function Shell({ current, children }: { current: NavKey; children: React.ReactNode }) {
  const here = (k: NavKey) => (current === k ? ('page' as const) : undefined);
  return (
    <div className={`fx ${manrope.variable} ${fraunces.variable}`} id="top">
      <style>{FX_CSS + FX_OFFER_CSS + FX_PORTFOLIO_CSS + FX_SYSTEMS_CSS + FX_HOME_CSS + FX_FLAT_CSS}</style>

      <header className="fx-head">
        <div className="fx-wrap fx-head-row">
          <Link href="/" className="fx-logo" aria-label="foundos home">
            foundos<span className="fx-logo-ai">.ai</span>
          </Link>
          <nav className="fx-nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} className="fx-nav-a" aria-current={here(n.key)}>
                {n.label}
              </Link>
            ))}
            {/* Owners text more than they fill in forms; /contact stays one tap away in the close band. */}
            <a href={`sms:${CONTACT.phone}`} className="fx-btn fx-btn--p fx-btn--sm fx-head-text">
              Text Josh<span className="fx-head-num"> · {CONTACT.phonePretty}</span>
            </a>
          </nav>
          {/* Phones: one row. Texting Josh is the main action (2026-10-04 conversion review: the automated audit is
              no longer the lead); the audit and everything else sit behind Menu (no JS needed). */}
          <div className="fx-mnav">
            <a href={`sms:${CONTACT.phone}`} className="fx-btn fx-btn--p fx-btn--sm">
              Text Josh
            </a>
            <details className="fx-menu">
              <summary aria-label="Menu">
                <span className="fx-menu-bars" aria-hidden="true" />
                Menu
              </summary>
              <nav className="fx-menu-panel" aria-label="Main, small screens">
                <Link href="/">Home</Link>
                {NAV.map((n) => (
                  <Link key={n.key} href={n.href} aria-current={here(n.key)}>
                    {n.label}
                  </Link>
                ))}
                <a href={`sms:${CONTACT.phone}`} className="fx-menu-text">
                  Text Josh · {CONTACT.phonePretty}
                </a>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="fx-foot">
        <div className="fx-wrap fx-foot-row">
          <Link href="/" className="fx-logo" aria-label="foundos home">
            foundos<span className="fx-logo-ai">.ai</span>
          </Link>
          <p className="fx-foot-meta">Josh Potesta · Marietta, GA</p>
          <p className="fx-foot-links">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone}`}>{CONTACT.phonePretty}</a>
            <Link href="/privacy">Privacy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Shell;
