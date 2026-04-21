"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lottie from "lottie-react";
import cubeAnimation from "../../public/cube-intro.json";

gsap.registerPlugin(SplitText);

// ─── Floating particles ────────────────────────────────────────
function Particles() {
  return (
    <div className="particles-container" aria-hidden>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 5}s`,
            opacity: 0.08 + Math.random() * 0.2,
          }}
        />
      ))}
    </div>
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
      style={{ top: "60%", left: "50%", transform: "translateX(-50%)" }}
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
    }, 900);
    return () => clearInterval(interval);
  }, [show, words.length]);

  return (
    <motion.div
      className="mt-4 h-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          className="text-sm tracking-[0.4em] uppercase"
          style={{ color: "#62666d" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.25 }}
        >
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

// ─── GSAP text reveal ──────────────────────────────────────────
function TextReveal({ show }: { show: boolean }) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const hasAnimated = useRef(false);

  useGSAP(() => {
    if (!show || !textRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    // Split into characters with mask for clip reveal
    splitRef.current = SplitText.create(textRef.current, {
      type: "chars",
      mask: "chars",
    });

    // Animate each character sliding up from behind its mask
    gsap.from(splitRef.current.chars, {
      y: "100%",
      duration: 0.7,
      ease: "power3.out",
      stagger: { each: 0.04, from: "center" },
    });

    // Horizontal line sweep under the text
    gsap.fromTo(
      ".intro-underline",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      }
    );
  }, [show]);

  return (
    <div className="relative z-10 mt-2 flex flex-col items-center">
      <h1
        ref={textRef}
        className="text-4xl font-bold tracking-[0.25em] sm:text-5xl md:text-6xl"
        style={{
          color: "#f7f8f8",
          visibility: show ? "visible" : "hidden",
        }}
      >
        FOUNDOS
      </h1>
      {/* Underline sweep */}
      <div
        className="intro-underline mt-3"
        style={{
          width: "120%",
          maxWidth: 360,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          transformOrigin: "center",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}

// ─── Tagline fade ──────────────────────────────────────────────
function Tagline({ show }: { show: boolean }) {
  return (
    <motion.p
      className="mt-5 text-xs tracking-[0.5em] uppercase"
      style={{ color: "#62666d" }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: show ? 0.7 : 0, y: show ? 0 : 8 }}
      transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
    >
      Build &middot; Automate &middot; Scale
    </motion.p>
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
    // Phase 1: Cube builds with particles (0-2.8s) — let it breathe
    const revealTimer = setTimeout(() => setPhase("reveal"), 2800);

    // Phase 2: Text reveal + tagline + cycling words (2.8-5.5s)
    const servicesTimer = setTimeout(() => setPhase("services"), 5500);

    // Phase 3: Lines draw to services (5.5-7.5s)
    const doneTimer = setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 700);
    }, 7500);

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
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Particle background */}
          <Particles />

          {/* Radial glow — grows with phase */}
          <motion.div
            className="absolute"
            style={{
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: phase === "build" ? 0.6 : 1,
              scale: phase === "build" ? 0.7 : 1,
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />

          {/* Lottie cube */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: phase === "build" ? 1 : 0.75,
              opacity: 1,
              y: phase !== "build" ? -30 : 0,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              scale: { type: "spring", stiffness: 100, damping: 15 },
            }}
          >
            <Lottie
              animationData={cubeAnimation}
              loop
              autoplay
              style={{ width: 200, height: 200 }}
            />
          </motion.div>

          {/* GSAP SplitText character reveal */}
          <TextReveal show={phase === "reveal" || phase === "services"} />

          {/* Tagline */}
          <Tagline show={phase === "reveal" || phase === "services"} />

          {/* Cycling "for X" text */}
          <CyclingText show={phase === "services"} />

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
              width: phase !== "build" ? 280 : 0,
            }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
