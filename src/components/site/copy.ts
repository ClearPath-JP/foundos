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
 * The five service pages, as actual navigation.
 *
 * ⚠️ THEY WERE LIVE AND UNREACHABLE. Each one shipped with exactly one inbound
 * link, and every one of those links was a phrase set mid-sentence inside a
 * body paragraph — "When I check a site", "the AI receptionist". A visitor who
 * skimmed, which is every visitor, never saw one. Four pages of real work sat
 * behind prose nobody was obliged to read. Inline links are for a reader who is
 * already deep in an argument; they are not navigation, and they cannot be the
 * only way to a page.
 *
 * Labels are nouns, not page titles. A nav is read at a glance in the corner of
 * the eye, so each is the shortest word that could only mean one of the five.
 *
 * ⚠️ "GOOGLE LISTING" WAS SHORTENED TO "GOOGLE" TO MAKE ROOM FOR THE FIFTH,
 * AND THE MEASUREMENT IS THE REASON. The row scrolls sideways rather than
 * wrapping, because a wrapped nav changes the header's height mid-scroll and
 * every scroll anchor on the site is offset against that height. But scrolling
 * has a cost nobody had paid yet: at 390px the visible track is 350px, and
 * five labels at the old lengths measured 436px — so the fifth item started at
 * x=376 and was simply off the screen. The page a visitor was ON did not
 * appear in its own navigation. Shortening two labels takes the row to about
 * 342px, which fits unscrolled on the narrowest phone worth supporting.
 *
 * ⚠️ SO A SIXTH DOES NOT FIT, and the honest thing to do about that is not to
 * shave another label. It is to ask whether anybody scrolls a nav to find a
 * page — they do not — and whether the sixth idea should have been a page at
 * all. That gate lives in components/service/services.ts.
 *
 * "Trucks" is the one label that names a customer rather than a service,
 * because that is what the page is: the other four are things you buy, and
 * that one is the business it is for. It sits last for the same reason.
 */
/*
 * ⚠️ 2026-09-11, TWICE. First Systems and Pricing took the slots of Websites
 * and Google; then, when the homepage became the short front door, Why and
 * Questions took the slots of Ordering and AI phone. The row is now "what I
 * sell, what it costs, why it matters, what people ask, and the one customer
 * with a page of his own". The labels total 7+7+3+9+6 = 32 characters against
 * the old 36, so it still fits unscrolled at 390px. Every page that left the nav
 * is one tap from /systems, where each system's card links to its long page,
 * and from the cross-link block at the foot of every service page.
 */
export const SERVICES = [
  { href: '/systems', label: 'Systems' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/why', label: 'Why' },
  { href: '/questions', label: 'Questions' },
  { href: '/food-truck-location', label: 'Trucks' },
] as const;

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
