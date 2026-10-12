import type { ReactNode } from 'react';

import {
  FIXES_CAVEAT,
  FIX_LABELS,
  FRICTION_FIXES,
  JOURNEY_CAPTION,
  JOURNEY_STAGES,
  METHOD_STEPS,
  VSL_CHAPTERS,
  VIDEOS_APPROVED_FOR_PUBLIC,
  type VslChapter,
} from '@/config/vsl';

import { ChapterVideo } from './ChapterVideo';

/**
 * The four chapters as one vertical story (2026-10-11, replaces the morning's tab selector). Server-rendered:
 * the copy and visuals read without any video, and an empty slot ships no JavaScript. Only a chapter with
 * `media` attached (and no hold) loads the small ChapterVideo client component.
 */
export function StoryChapters({ only = [1, 2, 3, 4] }: { only?: readonly number[] }) {
  const [belief, diagnosis, solutions, approach] = VSL_CHAPTERS;
  const show = (n: number) => only.includes(n);
  /* 2026-10-11 services page: the page renders Ch 1–2 before the services and Ch 3–4 after FoundOS Complete. */
  return (
    <>
      {show(1) && <ChapterSection chapter={belief} />}
      {show(2) && <ChapterSection chapter={diagnosis} visual={<JourneyMap />} />}
      {show(3) && <ChapterSection chapter={solutions} visual={<FrictionFixes />} />}
      {show(4) && <ChapterSection chapter={approach} visual={<MethodSteps />} />}
    </>
  );
}

/**
 * Empty video slots are for local review only (Josh, 2026-10-11): a production build never shows a "coming soon"
 * frame to real visitors. There, a chapter without a playable video simply shows its written story.
 */
const SHOW_PENDING_SLOTS = process.env.NODE_ENV !== 'production';

function ChapterSection({ chapter, visual }: { chapter: VslChapter; visual?: ReactNode }) {
  const h = `ch-${chapter.id}-h`;
  const playable = Boolean(chapter.media) && !chapter.hold && (VIDEOS_APPROVED_FOR_PUBLIC || SHOW_PENDING_SLOTS);
  const showSlot = playable || SHOW_PENDING_SLOTS;
  return (
    <section className="lp-sec lp-ch" id={`chapter-${chapter.n}`} aria-labelledby={h}>
      <div className="fx-wrap">
        <div className={showSlot ? 'lp-ch-grid' : 'lp-ch-grid lp-ch-grid--solo'}>
          <div className="lp-ch-copy lp-reveal">
            <p className="lp-ch-kicker">
              <span className="lp-ch-n" aria-hidden="true">
                0{chapter.n}
              </span>
              Chapter {chapter.n} · {chapter.title}
            </p>
            <h2 className="lp-h2 lp-ch-h" id={h}>
              {chapter.heading}
            </h2>
            {chapter.body.map((p) => (
              <p key={p} className="lp-ch-p">
                {p}
              </p>
            ))}
          </div>
          {showSlot && (
            <div className="lp-ch-media lp-reveal">
              <ChapterSlot chapter={chapter} />
            </div>
          )}
        </div>
        {visual && <div className="lp-ch-visual lp-reveal">{visual}</div>}
      </div>
    </section>
  );
}

/** The 16:9 slot: the real player once media is attached, otherwise (local only) a static panel with nothing to click.
    DRAFT — NOT APPROVED FOR PUBLIC USE: the panel wording (Josh's revision, review lines 36–37). */
function ChapterSlot({ chapter }: { chapter: VslChapter }) {
  if (chapter.media && !chapter.hold) {
    return <ChapterVideo label={`Chapter ${chapter.n}: ${chapter.title}`} media={chapter.media} />;
  }
  return (
    <div className="vsl-frame vsl-frame--pending">
      <div className="vsl-status">
        <p className="vsl-status-h">{chapter.hold ? 'Not published yet' : 'Video coming soon'}</p>
        <p className="vsl-status-d">
          {chapter.hold
            ? `The Chapter ${chapter.n} video isn’t available yet.`
            : `Chapter ${chapter.n} isn’t available to watch yet.`}
        </p>
      </div>
    </div>
  );
}

/** Ch 2: the seven stages. A vertical rail on a phone, one row on a wide screen. Plain list, no script. */
function JourneyMap() {
  return (
    <figure className="lp-journey">
      <figcaption className="lp-vis-cap">{JOURNEY_CAPTION}</figcaption>
      <ol className="lp-journey-list" role="list">
        {JOURNEY_STAGES.map((s, i) => (
          <li key={s.stage} className="lp-journey-stop">
            <span className="lp-journey-dot" aria-hidden="true">
              {i + 1}
            </span>
            <span className="lp-journey-t">{s.stage}</span>
            <span className="lp-journey-q">{s.q}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Ch 3: hypothetical "what makes it harder → what could help" pairs, ending on "not every business needs every fix". */
function FrictionFixes() {
  return (
    <figure className="lp-fixes">
      <figcaption className="lp-vis-cap">Examples, not a checklist</figcaption>
      <ul className="lp-fixes-list" role="list">
        {FRICTION_FIXES.map((f) => (
          <li key={f.friction} className="lp-fix">
            <p className="lp-fix-before">
              <span className="lp-fix-tag">{FIX_LABELS.friction}</span>
              {f.friction}
            </p>
            <p className="lp-fix-after">
              <span className="lp-fix-tag lp-fix-tag--after">{FIX_LABELS.fix}</span>
              {f.fix}
            </p>
          </li>
        ))}
      </ul>
      <p className="lp-fixes-note">{FIXES_CAVEAT}</p>
    </figure>
  );
}

/** Ch 4: Diagnose → Prioritize → Build → Measure. */
function MethodSteps() {
  return (
    <ol className="lp-method" role="list" aria-label="The method">
      {METHOD_STEPS.map((s, i) => (
        <li key={s.t} className="lp-method-step">
          <span className="lp-method-n" aria-hidden="true">
            {i + 1}
          </span>
          <h3 className="lp-method-t">{s.t}</h3>
          <p className="lp-method-d">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
