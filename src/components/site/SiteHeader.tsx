import { PresenceNote } from '@/components/Presence';
import { CAL, PHONE } from '@/config/brand';

import { NAV, PRESENCE } from './copy';
import { Rule } from './Rule';
import { SHELL } from './shell';
import { Wordmark } from './Wordmark';

/**
 * The sticky header, and it is the same header on every page of the site.
 *
 * Sticky with pure CSS, no scroll listener. It has to survive four grounds, so
 * it carries its own opaque ink background rather than inheriting one. Nav
 * sits in the label voice, which is also the button voice — the system has no
 * third small-type style.
 *
 * The presence line sits immediately before the CTA it is arguing for, so the
 * row reads left to right as "foundos ● — around now — text me". The dot at
 * the far left and the words at the right are the same 64px bar and one
 * glance. Do not move one without the other.
 *
 * "Book 20 minutes" is hidden below 640px by `.eb-nav-a--wide`, which is the
 * same breakpoint at which the phone action bar appears — the visitor never
 * loses a way to act, the two just trade places.
 *
 * NO PROPS, AND THAT IS THE POINT. Everything it needs is site-level: the
 * wordmark from brand.ts, the number and the calendar link from lib/contact,
 * the two labels and the presence sentences from ./copy. A header that took
 * props would be a header each page could quietly make different.
 */
export function SiteHeader() {
  return (
    <header className="eb-head">
      <div className={`${SHELL} eb-head-row`}>
        <a href="#top" className="eb-head-mark">
          <Wordmark px={22} />
        </a>
        <nav className="eb-nav">
          <PresenceNote copy={PRESENCE} />
          <a href={`sms:${PHONE}`} className="eb-nav-a eb-lab">
            {NAV.text}
          </a>
          <a href={CAL} target="_blank" rel="noreferrer" className="eb-nav-a eb-lab eb-nav-a--wide">
            {NAV.book}
          </a>
        </nav>
      </div>
      <Rule />
    </header>
  );
}

export default SiteHeader;
