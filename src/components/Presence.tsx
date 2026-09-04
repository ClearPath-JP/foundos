'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * THE PRESENCE DOT — the wordmark's green circle, wired to a clock.
 *
 * ── WHY THIS IS A CLIENT FILE AND THE PAGE IS NOT ─────────────────────────
 *
 * src/app/page.tsx is a Server Component and has to stay one: it is 2,000
 * lines of static copy and a JSON-LD block, none of which should cross to the
 * browser. Putting `'use client'` at the top of that file would ship the whole
 * thing as a client bundle to get one boolean. So the boolean lives here, in
 * two leaves the page renders as children — <PresenceDot /> inside the
 * wordmark, <PresenceNote /> beside the header CTA — and the page above them
 * is untouched.
 *
 * ── WHY THE STATE IS COMPUTED AFTER MOUNT ─────────────────────────────────
 *
 * A time-of-day check run during render is a hydration mismatch waiting to
 * happen: the server renders in whatever region Vercel picked, at whatever
 * second the response was built, and the browser re-renders later somewhere
 * else. React would warn, and on a slow client it would flip the dot mid-
 * hydration. So the hook seeds `true` and corrects in an effect, which runs
 * only in the browser and only after hydration has already matched.
 *
 * `true` is the seed rather than `null` for a reason worth keeping: it is
 * exactly what shipped before this file existed — a static green dot — so a
 * crawler, a no-JS reader, and the first paint of every visit all get today's
 * page, and the only thing the effect ever does is turn the dot amber at
 * night. Nothing is ever missing while JavaScript loads.
 *
 * ── WHY 9 TO 9, AND WHY IT KEEPS TICKING ──────────────────────────────────
 *
 * Josh is in Atlanta, so the window is read in America/New_York and not in the
 * visitor's zone — the claim is about him, not about them. Intl does the whole
 * job including the DST shift, which is the reason there is no offset
 * arithmetic anywhere in this file. The minute interval matters more than it
 * looks: this page is a twenty-screen scroll, so somebody who lands at 8:52pm
 * is plausibly still reading at 9:05, and a dot that lies for thirteen minutes
 * is worse than no dot.
 */

const ZONE = 'America/New_York';
const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;

/** Hour 0-23 in Atlanta. `h23` rather than hour12:false, which yields 24. */
function atlantaHour(now: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONE,
    hour: 'numeric',
    hourCycle: 'h23',
  }).format(now);
  const h = Number.parseInt(parts, 10);
  return Number.isFinite(h) ? h % 24 : OPEN_HOUR;
}

function useAround(): boolean {
  const [around, setAround] = useState(true);

  useEffect(() => {
    const read = () => {
      const h = atlantaHour(new Date());
      setAround(h >= OPEN_HOUR && h < CLOSE_HOUR);
    };
    read();
    const id = window.setInterval(read, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return around;
}

/**
 * The dot itself. Decorative — `aria-hidden` — because the state it is showing
 * is spoken by <PresenceNote /> below, and the dot lives inside the wordmark
 * link, where any text at all would end up in that link's accessible name
 * ("foundos it is after nine in Atlanta…"). One announcement, in the right
 * place, is the whole point.
 *
 * The size and gap come in as a style object because they are derived from the
 * wordmark's font-size in brand.ts (9px and 6px at the 22px desktop mark), not
 * from anything this component knows.
 */
export function PresenceDot({ style }: { style?: CSSProperties }) {
  const around = useAround();
  return (
    <span
      aria-hidden="true"
      className="eb-dot"
      data-state={around ? 'around' : 'away'}
      style={style}
    />
  );
}

export type PresenceCopy = {
  around: { note: string; sr: string };
  away: { note: string; sr: string };
};

/**
 * The line that turns the dot from decoration into a reason to text.
 *
 * The visible half is `aria-hidden` and the spoken half is the sr-only
 * sentence, so a screen-reader user hears the state once and in full sentences
 * rather than twice, as a two-word fragment and then again as prose.
 *
 * Copy is passed in from page.tsx rather than written here, because that file
 * is where every string on this page lives and a second home for copy is how
 * two versions of a sentence start existing.
 */
export function PresenceNote({ copy }: { copy: PresenceCopy }) {
  const around = useAround();
  const state = around ? copy.around : copy.away;

  return (
    <span className="eb-presence">
      <span aria-hidden="true" className="eb-lab eb-presence-t">
        {state.note}
      </span>
      <span className="eb-sr">{state.sr}</span>
    </span>
  );
}
