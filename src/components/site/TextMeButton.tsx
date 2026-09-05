import { PHONE, PHONE_PRETTY } from '@/config/brand';

import { NAV } from './copy';

/**
 * The primary slab: "TEXT ME — (404) 436-3393", wired to sms:.
 *
 * It is a component rather than four lines of JSX because it appears twice on
 * the homepage already and will appear on every page after it, and because of
 * the two notes below — both of which are the kind of thing that survives one
 * copy-paste and not three.
 *
 * ⚠️ THE NON-BREAKING SPACE IS LOAD-BEARING AND A PLAIN SPACE DOES NOT WORK.
 * `.eb-btn` is display:inline-flex, so each run of text becomes an anonymous
 * flex item and CSS strips the leading and trailing whitespace of every one of
 * them. With an ordinary space the run "Text me — " was trimmed to "Text me —"
 * and the button rendered "TEXT ME —(404) 436-3393", measured at 107.9px of
 * lead where 118.8px is one space wider. A no-break space is not white space
 * as far as that trimming is concerned, so it survives — and it also stops a
 * phone number ever being split from the dash that introduces it.
 *
 * ⚠️ THE NUMBER IS WRAPPED IN `.eb-num` SO THE BUTTON'S TRACKING SKIPS IT.
 * `.eb-btn` sets +.06em, which is right for a tracked uppercase label and
 * wrong for every character that is not a letter: applied to "(404) 436-3393"
 * it puts the added space INSIDE the brackets and the button reads
 * "( 404 ) 436-3393". `.eb-num` turns tracking off for the digits and nothing
 * else.
 *
 * `variant` picks which of the two ground-supplied treatments it takes —
 * `a` is the solid slab, `b` the outlined one. On the dark spine `a` is bone
 * on ink; on ember it is ink on bone; on the cream card it is rich on bone.
 * Nothing is restated, the ground decides. See "grounds are variable sets" in
 * the header of src/app/page.tsx.
 */
export function TextMeButton({ variant = 'a' }: { variant?: 'a' | 'b' }) {
  return (
    <a className={`eb-btn eb-btn--${variant}`} href={`sms:${PHONE}`}>
      {NAV.text} —&nbsp;<span className="eb-num">{PHONE_PRETTY}</span>
    </a>
  );
}

export default TextMeButton;
