'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted, looping scroll-through of a live build. Decorative (its parent is aria-hidden).
 * Starts paused on its poster and only plays when the visitor hasn't asked for reduced motion.
 */
export function LoopVideo({ src, poster, width, height }: { src: string; poster: string; width: number; height: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (reduce.matches) video.pause();
      else video.play().catch(() => {}); // autoplay can be refused (e.g. data saver); the poster stays
    };
    sync();
    reduce.addEventListener('change', sync);
    return () => reduce.removeEventListener('change', sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
    />
  );
}
