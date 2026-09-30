'use client';

import { MotionConfig } from 'motion/react';

import { BlurFade } from '@/components/ui/blur-fade';

/**
 * A section entrance for the homepage: Magic UI BlurFade, triggered once when
 * the block scrolls into view. MotionConfig "user" drops the movement for
 * anyone with reduced motion turned on. Never used on the hero — the headline
 * has to be visible the moment the page paints.
 */
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <MotionConfig reducedMotion="user">
      <BlurFade inView inViewMargin="-80px" direction="up" offset={14} duration={0.5} delay={delay} blur="8px">
        {children}
      </BlurFade>
    </MotionConfig>
  );
}

export default Reveal;
