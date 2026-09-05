import { PHONE } from '@/config/brand';

import { NAV } from './copy';

/**
 * The phone action bar. Below 640px only, and it is the single element on a
 * long page most likely to produce a text message.
 *
 * The whole funnel is "text me", and without this the only ways to do it on a
 * phone are a header link far above the fold and two buttons at either end of
 * a twenty-screen scroll. In between there is nothing to act on.
 *
 * It never covers content: `.eb` carries a matching bottom padding below
 * 640px, so the last line of the footer clears it at rest. That padding is the
 * bar's own height plus the device's home indicator, and it has to move if
 * `.eb-bar-a`'s min-height ever does.
 *
 * THE HIDE IS OPTIONAL AND THAT IS DELIBERATE. The bar's base state is
 * visible. A scroll-driven animation then holds it off-screen over the first
 * and last few percent of the document — both places where a duplicate "Text
 * me" would be arguing with a full-size one already on screen. Any browser
 * without animation-timeline, and anybody who asked for reduced motion, simply
 * gets the bar the whole way down, which is the correct fallback rather than a
 * broken one. It animates transform and opacity and nothing else.
 *
 * ⚠️ THE PRIMARY ACTION IS FIXED AND THE SECOND ONE IS THE PROP. Every page on
 * this site sells the same first action — text the number — so it is not a
 * page's to change. What differs is what else that page has worth tapping: the
 * homepage points at its free-report anchor. A page with nothing second should
 * not render this bar with a filler link in it; give it a real second action or
 * leave the component out.
 */
export function MobileActionBar({ secondary }: { secondary: { href: string; label: string } }) {
  return (
    <nav className="eb-bar" aria-label="Quick actions">
      <a className="eb-bar-a eb-bar-a--p" href={`sms:${PHONE}`}>
        {NAV.text}
      </a>
      <a className="eb-bar-a" href={secondary.href}>
        {secondary.label}
      </a>
    </nav>
  );
}

export default MobileActionBar;
