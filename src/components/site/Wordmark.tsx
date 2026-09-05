import { PresenceDot } from '@/components/Presence';
import { WORDMARK } from '@/config/brand';

/**
 * `foundos` and the dot. The dot is decorative, so a link wrapping this reads
 * as one word.
 *
 * ⚠️ THE CLASS IS `.eb-wm`, NOT `.eb-mark`, AND THE RENAME WAS NOT COSMETIC.
 * `.eb-mark` is the skim path — the phrases that change colour as they scroll
 * in — and the wordmark held that name first. Two things called "mark" in one
 * design system is how a logo ends up inline-flex in the middle of a
 * paragraph. If a later edit needs a third "mark", it needs a third word.
 *
 * `px` is the only prop and it is not a style choice: the dot's diameter and
 * its gap are DERIVED from it. brand.ts holds them as 9 and 6 at the 22px
 * header size, and they are re-expressed here in `em` so the mark scales as
 * one drawing rather than as a word with a fixed dot beside it. The homepage
 * uses 22 in the header and 16 in the footer.
 *
 * The wordmark is the one thing outside the six-step type scale, and that is
 * deliberate: it is the logo being drawn, not the page being typeset. It is
 * also the one radius on the page — brand.ts defines the mark as a circle, it
 * is on foundos.ai and on the printed cards, and radius-zero is a rule about
 * the layout that does not extend to redrawing the logo.
 *
 * The dot is a client leaf (components/Presence.tsx) because it is wired to a
 * clock — green inside 9am-9pm Atlanta, amber outside it. Its proportions are
 * still computed here, because they are the logo's business and not the
 * clock's.
 */
export function Wordmark({ px }: { px: number }) {
  return (
    <span className="eb-wm" style={{ fontSize: `${px}px` }}>
      {WORDMARK.text}
      <PresenceDot
        style={{
          width: `${WORDMARK.dotSize / px}em`,
          height: `${WORDMARK.dotSize / px}em`,
          marginLeft: `${WORDMARK.dotGap / px}em`,
        }}
      />
    </span>
  );
}

export default Wordmark;
