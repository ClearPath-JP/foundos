import type { PresenceCopy } from '@/components/Presence';

/**
 * The two CTA labels. They are site chrome, not page copy: the same two words
 * are the header nav, the hero buttons, the closing buttons and the phone bar,
 * and if any one of those drifts the page starts offering two different things.
 *
 * Held as constants rather than inline in JSX for the reason the whole copy
 * block in page.tsx is: an apostrophe inside JSX text has to be escaped, and
 * the cheapest way to dodge that is to expand the contraction — "you're"
 * becomes "you are". Do that six times and the site stops sounding like Josh.
 * In a plain string no character needs escaping.
 */
export const NAV = { text: 'Text me', book: 'Book 20 minutes' };

/**
 * The presence line beside the header CTA — the only copy on the site that is
 * not a fixed string.
 *
 * ⚠️ IT EXISTS BECAUSE A BLINKING DOT ON ITS OWN IS DECORATION. The green
 * circle after the wordmark has been on foundos.ai and on the printed cards
 * since brand.ts was written, where its stated meaning is "running" — the
 * visual version of "I run it every week". A dot that pulses and says nothing
 * is just a pulsing dot; the same dot with four words beside it is a reader
 * finding out that the person who wrote all this is awake right now. That is
 * the difference between a decoration and a reason to text, and it is why the
 * line may not be dropped to "save space in the header". If it ever has to go
 * somewhere else, it goes WITH the dot, not instead of it.
 *
 * Both `sr` sentences are what a screen reader actually hears, so they say the
 * window in words rather than leaving a colour to carry it. "You text me, I
 * answer" is lifted from the homepage's about block — the same promise, not a
 * new one.
 *
 * The 9-to-9 window and the America/New_York clock live in
 * components/Presence.tsx. Nothing here claims he is at a desk; it claims what
 * time it is where he is, which is the only part a page can know.
 */
export const PRESENCE: PresenceCopy = {
  around: {
    note: 'Around now',
    sr: 'It is between 9am and 9pm in Atlanta right now. You text me, I answer.',
  },
  away: {
    note: 'Back in the morning',
    sr: 'It is outside 9am to 9pm in Atlanta right now. Text me anyway — I answer in the morning.',
  },
};
