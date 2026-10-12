import { Bricolage_Grotesque, Inter_Tight } from 'next/font/google';
import Link from 'next/link';

import { AUDIT_EMAIL } from '@/config/audit';
import { FX_CSS } from '@/components/fx/css';
import { FX_HOME_CSS } from '@/components/fx/home-css';

import { LANDING_CSS } from './landing-css';

/* 2026-10-09, JP picked from a specimen: Bricolage Grotesque for headlines, Inter Tight for everything else.
   Inter Tight takes the --font-manrope slot so FX_CSS's body rule picks it up unchanged. */
const body = Inter_Tight({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });
const display = Bricolage_Grotesque({ subsets: ['latin'], display: 'swap', variable: '--font-display', axes: ['opsz'] });

/**
 * The landing-page frame (2026-10-09): same brand tokens, fonts and liquid as the old site, but no navigation.
 * The page has one job, so the header is just the wordmark and "By Josh".
 * 2026-10-11: /work reuses this frame (passing its old page CSS as `extraCss`) so it shows only the verified
 * contact routes, not the old Shell's unverified phone number and redirected nav.
 */
export function LandingShell({ children, extraCss = '' }: { children: React.ReactNode; extraCss?: string }) {
  return (
    <div className={`fx ${body.variable} ${display.variable}`} id="top">
      <style>{FX_CSS + FX_HOME_CSS + extraCss + LANDING_CSS}</style>

      <header className="fx-head lp-head">
        <div className="fx-wrap fx-head-row">
          <Link href="/" className="fx-logo" aria-label="FoundOS home">
            Found<span className="fx-logo-os">OS</span>
          </Link>
          <span className="lp-by">By Josh</span>
        </div>
      </header>

      <main>{children}</main>

      <footer className="lp-foot">
        <div className="fx-wrap lp-foot-row">
          <span>FoundOS</span>
          <span>By Josh</span>
          {/* Josh, 2026-10-12: email, not Instagram, until he's posting content. */}
          <a href={`mailto:${AUDIT_EMAIL}`}>{AUDIT_EMAIL}</a>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingShell;
