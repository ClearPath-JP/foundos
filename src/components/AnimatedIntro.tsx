"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import cubeAnimation from "../../public/cube-intro.json";

// ─── Floating particles ────────────────────────────────────────
function Particles() {
  return (
    <div className="particles-container" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            opacity: 0.1 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// ─── Glitch text component ─────────────────────────────────────
function GlitchText({ text, show }: { text: string; show: boolean }) {
  return (
    <motion.div
      className="glitch-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      <h1
        className={`glitch-text text-4xl font-bold tracking-[0.3em] sm:text-5xl ${show ? "glitch-active" : ""}`}
        data-text={text}
      >
        {text}
      </h1>
    </motion.div>
  );
}

// ─── Animated line connections ──────────────────────────────────
function ConnectionLines({ show }: { show: boolean }) {
  return (
    <svg
      className="absolute pointer-events-none"
      width="400"
      height="200"
      viewBox="0 0 400 200"
      style={{ top: "55%", left: "50%", transform: "translateX(-50%)" }}
    >
      {/* Left line */}
      <motion.line
        x1="200" y1="20" x2="60" y2="120"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      />
      {/* Center line */}
      <motion.line
        x1="200" y1="20" x2="200" y2="140"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />
      {/* Right line */}
      <motion.line
        x1="200" y1="20" x2="340" y2="120"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />

      {/* Endpoint dots */}
      {[
        { cx: 60, cy: 120, delay: 0.9 },
        { cx: 200, cy: 140, delay: 1.1 },
        { cx: 340, cy: 120, delay: 1.3 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="3"
          fill="rgba(255,255,255,0.15)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0 }}
          transition={{ duration: 0.3, delay: dot.delay }}
        />
      ))}

      {/* Labels */}
      {[
        { x: 60, y: 145, label: "Websites", delay: 1.0 },
        { x: 200, y: 165, label: "Automations", delay: 1.2 },
        { x: 340, y: 145, label: "Apps", delay: 1.4 },
      ].map((item, i) => (
        <motion.text
          key={i}
          x={item.x}
          y={item.y}
          textAnchor="middle"
          fill="rgba(255,255,255,0.25)"
          fontSize="11"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 5 }}
          transition={{ duration: 0.4, delay: item.delay }}
        >
          {item.label}
        </motion.text>
      ))}
    </svg>
  );
}

// ─── Cycling text ──────────────────────────────────────────────
function CyclingText({ show }: { show: boolean }) {
  const words = ["for gyms", "for coaches", "for salons", "for you"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 600);
    return () => clearInterval(interval);
  }, [show, words.length]);

  return (
    <motion.div
      className="mt-3 h-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          className="text-sm tracking-[0.4em] uppercase"
          style={{ color: "#62666d" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main intro ────────────────────────────────────────────────
export default function AnimatedIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"build" | "reveal" | "services" | "done">(
    "build"
  );

  useEffect(() => {
    // Phase 1: Cube builds with particles (0-1.8s)
    const revealTimer = setTimeout(() => setPhase("reveal"), 1800);

    // Phase 2: Glitch text + cycling words (1.8-3.2s)
    const servicesTimer = setTimeout(() => setPhase("services"), 3200);

    // Phase 3: Lines draw to services (3.2-5s)
    const doneTimer = setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 600);
    }, 5200);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(servicesTimer);
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
          {/* Particle background */}
          <Particles />

          {/* Radial glow */}
          <motion.div
            className="absolute"
            style={{
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Lottie cube */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: phase === "build" ? 1 : 0.85,
              opacity: 1,
              y: phase !== "build" ? -20 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Lottie
              animationData={cubeAnimation}
              loop
              autoplay
              style={{ width: 180, height: 180 }}
            />
          </motion.div>

          {/* Glitch FOUNDOS */}
          <GlitchText
            text="FOUNDOS"
            show={phase === "reveal" || phase === "services"}
          />

          {/* Cycling "for X" text */}
          <CyclingText show={phase === "reveal" || phase === "services"} />

          {/* Service connection lines */}
          <ConnectionLines show={phase === "services"} />

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-12"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
            initial={{ width: 0 }}
            animate={{
              width: phase !== "build" ? 240 : 0,
            }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
