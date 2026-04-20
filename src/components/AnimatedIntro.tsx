"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import cubeAnimation from "../../public/cube-intro.json";

export default function AnimatedIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"build" | "reveal" | "done">("build");

  useEffect(() => {
    // Phase 1: Cube builds (Lottie plays ~1s loop x2)
    const revealTimer = setTimeout(() => {
      setPhase("reveal");
    }, 2000);

    // Phase 2: Text reveals, then fade out
    const doneTimer = setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 600);
    }, 3800);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
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
          {/* Subtle radial glow behind cube */}
          <motion.div
            className="absolute"
            style={{
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Lottie cube animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: phase === "reveal" ? 0.9 : 1,
              opacity: 1,
              y: phase === "reveal" ? -10 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Lottie
              animationData={cubeAnimation}
              loop={true}
              autoplay={true}
              style={{ width: 200, height: 200 }}
            />
          </motion.div>

          {/* FOUNDOS text */}
          <motion.h1
            className="text-shine mt-6 text-4xl font-bold tracking-[0.3em] sm:text-5xl"
            initial={{ opacity: 0, y: 16, letterSpacing: "0.6em" }}
            animate={{
              opacity: phase === "reveal" ? 1 : 0,
              y: phase === "reveal" ? 0 : 16,
              letterSpacing: phase === "reveal" ? "0.3em" : "0.6em",
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            FOUNDOS
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-3 text-sm tracking-[0.5em] uppercase"
            style={{ color: "#62666d" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "reveal" ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Build &middot; Automate &middot; Scale
          </motion.p>

          {/* Bottom line accent */}
          <motion.div
            className="absolute bottom-16"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
            initial={{ width: 0 }}
            animate={{ width: phase === "reveal" ? 200 : 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
