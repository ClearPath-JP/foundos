'use client';

import { useState } from 'react';

import type { VslMedia } from '@/config/vsl';

type Phase = 'idle' | 'loading' | 'ready' | 'error';

/**
 * One chapter's video, only rendered once `media` is attached in src/config/vsl.ts. Native controls (real
 * progress, seek, keyboard), sound on, captions on by default, preload="none" and no autoplay: nothing downloads
 * until the visitor presses play.
 */
export function ChapterVideo({ label, media }: { label: string; media: VslMedia }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const hasTranscript = media.transcript.some((p) => p.trim() !== '');

  return (
    <>
      <div className="vsl-frame" aria-busy={phase === 'loading'}>
        {phase === 'error' ? (
          <div className="vsl-status" role="alert">
            {/* DRAFT — NOT APPROVED FOR PUBLIC USE: Josh's revision (review line 39). */}
            <p className="vsl-status-h">This video couldn’t be loaded.</p>
            <p className="vsl-status-d">
              Please try again.{hasTranscript ? ' You can read the transcript below.' : ''}
            </p>
            <button type="button" className="fx-btn fx-btn--s fx-btn--sm vsl-retry" onClick={() => setPhase('idle')}>
              Try again
            </button>
          </div>
        ) : (
          <video
            className="vsl-video"
            src={media.src}
            poster={media.poster}
            controls
            playsInline
            preload="none"
            width={1920}
            height={1080}
            aria-label={label}
            onPlay={() => setPhase((p) => (p === 'ready' ? p : 'loading'))}
            onWaiting={() => setPhase('loading')}
            onPause={() => setPhase((p) => (p === 'loading' ? 'idle' : p))}
            onPlaying={() => setPhase('ready')}
            onCanPlay={() => setPhase((p) => (p === 'loading' ? 'ready' : p))}
            onError={() => setPhase('error')}
          >
            <track kind="captions" src={media.captions} srcLang="en" label="English" default />
          </video>
        )}
        {phase === 'loading' && (
          <p className="vsl-loading" role="status">
            Loading…
          </p>
        )}
      </div>

      {hasTranscript && (
        <details className="vsl-transcript">
          <summary>Read the transcript</summary>
          {media.transcript.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </details>
      )}
    </>
  );
}
