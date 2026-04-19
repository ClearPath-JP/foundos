"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnimatedIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"cube" | "done">("cube");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 600);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#0a0a0a" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Cube */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <svg
              width="160"
              height="160"
              viewBox="200 180 680 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top face */}
              <motion.path
                d="M540 240 L780 380 L540 520 L300 380 Z"
                fill="#ffffff"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              {/* Left face */}
              <motion.path
                d="M300 380 L540 520 L540 760 L300 620 Z"
                fill="#ffffff"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 0.55, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              {/* Right face */}
              <motion.path
                d="M780 380 L540 520 L540 760 L780 620 Z"
                fill="#ffffff"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </svg>

            {/* Glare sweep over cube */}
            <div className="cube-glare" />
          </motion.div>

          {/* FoundOS text with shine */}
          <motion.h1
            className="text-shine mt-8 text-4xl font-bold tracking-[0.3em] sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            FOUNDOS
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-3 text-sm tracking-[0.5em] uppercase"
            style={{ color: "#62666d" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            Build &middot; Automate &middot; Scale
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
