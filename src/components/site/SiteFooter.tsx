import Link from 'next/link';

import { EMAIL, LOCATION } from '@/config/brand';

import { Rule } from './Rule';
import { SHELL } from './shell';
import { Wordmark } from './Wordmark';

/**
 * The footer: mark, email, city, privacy. Four items and nothing else.
 *
 * ⚠️ NO SEPARATOR CHARACTERS. There were interpuncts between the four items,
 * each bound to the item that followed it so a dot could not be orphaned at
 * the end of a wrapped line — and that binding worked, but it only moved the
 * problem: at 375px the last item wrapped and the line it started read
 * "· Privacy", a dot with nothing before it. There is no arrangement of four
 * items and three dots that survives every width. The gap does the separating
 * instead (8px down, 20px across), which cannot wrap wrong at any width
 * because there is nothing left to wrap. Do not put the dots back; if the
 * items ever need stronger separation, widen the column gap.
 *
 * The wordmark is 16px here against 22px in the header — the dot's diameter
 * and gap follow from that number on their own, see Wordmark.
 *
 * NO PROPS, for the same reason SiteHeader has none: every string is
 * site-level. /privacy is a real route and the only internal link on the
 * site, which is why it is the one `next/link` here.
 */
export function SiteFooter() {
  return (
    <footer>
      <Rule />
      <div className={`${SHELL} eb-foot`}>
        <Wordmark px={16} />
        <a href={`mailto:${EMAIL}`} className="eb-foot-a">
          {EMAIL}
        </a>
        <span className="eb-foot-s">
          {LOCATION.city}, {LOCATION.region}
        </span>
        <Link href="/privacy" className="eb-foot-a">
          Privacy
        </Link>
      </div>
    </footer>
  );
}

export default SiteFooter;
