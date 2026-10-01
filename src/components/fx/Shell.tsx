import { Manrope } from 'next/font/google';
import Link from 'next/link';

import { CONTACT } from '@/config/offer';

import { FX_CSS } from './css';
import { FX_OFFER_CSS } from './offer-css';

const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });

export type NavKey = 'plans' | 'projects' | 'work' | 'how' | 'contact' | null;

/** Main navigation, doc §6. "Results" waits for authorized, verifiable examples; "Client login" for a portal. */
const NAV: readonly { key: Exclude<NavKey, null | 'contact'>; href: string; label: string }[] = [
  { key: 'plans', href: '/plans', label: 'Plans' },
  { key: 'projects', href: '/projects', label: 'Projects' },
  { key: 'work', href: '/work', label: 'Work' },
  { key: 'how', href: '/how-it-works', label: 'How it works' },
];

/** Every page of the restaurant offer: one font, one stylesheet, one header and footer. */
export function Shell({ current, children }: { current: NavKey; children: React.ReactNode }) {
  const here = (k: NavKey) => (current === k ? ('page' as const) : undefined);
  return (
    <div className={`fx ${manrope.variable}`} id="top">
      <style>{FX_CSS + FX_OFFER_CSS}</style>

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
            <a href={`sms:${CONTACT.phone}`} className="fx-btn fx-btn--p fx-btn--sm">
              Text Josh<span className="fx-head-num"> · {CONTACT.phonePretty}</span>
            </a>
          </nav>
        </div>
        <nav className="fx-wrap fx-subnav" aria-label="Main, small screens">
          {NAV.map((n) => (
            <Link key={n.key} href={n.href} aria-current={here(n.key)}>
              {n.label}
            </Link>
          ))}
        </nav>
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
