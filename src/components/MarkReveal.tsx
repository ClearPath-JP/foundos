'use client';

import { useEffect } from 'react';

/**
 * THE SKIM-PATH REVEAL. Renders nothing; it only decides WHEN each `.eb-mark`
 * gets its `is-in` class. Everything about how the mark looks is CSS in
 * page.tsx — see the block at `.eb-mark`.
 *
 * ⚠️ WHAT THIS FIRES IS A COLOUR CHANGE, NOT A HIGHLIGHT SWEEP. It used to
 * animate a translucent wash in behind the words. It now transitions `color`
 * from the paragraph's own to `--mark-fg`, because the eight marks are a skim
 * path — a fast reader should be able to read only the coloured phrases and
 * get the argument — and a wash is decoration where a colour is a signal. The
 * timing contract below is unchanged and was retuned for nothing: 0.9 / -18% /
 * 90ms all still say "fire when the sentence is on screen and being read".
 *
 * ⚠️ THE WEIGHT IS NOT THIS FILE'S JOB AND MUST NOT BECOME IT. `.eb-mark` is
 * 700 from first paint, before this observer has run and on any browser where
 * it never does. That is deliberate twice over: the skim path stays legible
 * without colour (which is the accessibility half of the feature), and nothing
 * this component does can reflow a paragraph. If a later change moves the
 * weight into `is-in`, every marked paragraph re-measures mid-scroll.
 *
 * ── WHY IT OBSERVES THE DOM INSTEAD OF OWNING THE SPANS ───────────────────
 *
 * The eight marked phrases sit inside eight different paragraphs spread over
 * twenty screens of copy, and every one of those paragraphs is server-rendered
 * static text. Turning each into a client component to give it an observer
 * would ship the copy twice — once as HTML and once as RSC props. One leaf,
 * one observer, one query.
 *
 * ── THE FOUR RULES, AND WHERE EACH ONE IS ENFORCED ────────────────────────
 *
 *  • FIRE ONCE, NEVER REVERSE. `unobserve` on the element that fired, before
 *    the timer is even set. A phrase that drains back to body colour when you
 *    scroll up reads as a bug in the page rather than as motion.
 *  • THRESHOLD 0.9, not 0 — the reveal should land when the sentence is fully
 *    on screen and being read, not when its first pixel appears.
 *  • rootMargin -18% at the bottom pulls the trigger line up off the fold, so
 *    nothing turns colour in the strip of screen a reader has not reached.
 *  • 90ms BETWEEN SIBLINGS. Two marks almost never share a viewport (that is a
 *    layout rule, held in page.tsx). The one place it can happen is a tall
 *    desktop screen catching two ends of a section at once, and staggering
 *    them reads as sequence where firing together reads as a page-load flash.
 *
 * Reduced motion needs nothing here: the CSS paints every mark in its final
 * colour outright under `prefers-reduced-motion: reduce`, so the class this
 * adds is a no-op rather than a second code path to keep in step.
 *
 * If IntersectionObserver is missing, every mark is coloured immediately. The
 * failure mode is "the skim path is just there", never "the sentence is not on
 * it" — which matters more now than it did, because the marks carry meaning.
 */
export default function MarkReveal() {
  useEffect(() => {
    const marks = Array.from(document.querySelectorAll<HTMLElement>('.eb-mark'));
    if (marks.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      for (const el of marks) el.classList.add('is-in');
      return;
    }

    const timers: number[] = [];

    const io = new IntersectionObserver(
      (entries, observer) => {
        let step = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          timers.push(window.setTimeout(() => el.classList.add('is-in'), step * 90));
          step += 1;
        }
      },
      { threshold: 0.9, rootMargin: '0px 0px -18% 0px' },
    );

    for (const el of marks) io.observe(el);

    return () => {
      io.disconnect();
      for (const id of timers) window.clearTimeout(id);
    };
  }, []);

  return null;
}
