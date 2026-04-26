"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAL_LINK, INDUSTRY_CYCLE } from "@/lib/constants";

/* ─── Animated Dot Grid (Linear-inspired, canvas) ──────────── */

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    function draw(now: number) {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cols = Math.floor(w / 40);
      const rows = Math.floor(h / 40);
      const elapsed = (now - startTime) / 1000;

      ctx.clearRect(0, 0, w, h);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = (col + 0.5) * (w / cols);
          const y = (row + 0.5) * (h / rows);

          // Wave pattern — diagonal sweep
          const wave = Math.sin((row + col) * 0.4 + elapsed * 1.2);
          const opacity = 0.03 + (wave + 1) * 0.06; // 0.03 to 0.15

          // Radial fade from center
          const dx = x / w - 0.5;
          const dy = y / h - 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radialFade = Math.max(0, 1 - dist * 1.8);

          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * radialFade})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

/* ─── Industry Cycler ──────────────────────────────────────── */

function IndustryCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % INDUSTRY_CYCLE.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-7 overflow-hidden mt-6">
      <AnimatePresence mode="wait">
        <motion.span
          key={INDUSTRY_CYCLE[index]}
          className="block text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--color-dim)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
        >
          {INDUSTRY_CYCLE[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ─── Hero Section ─────────────────────────────────────────── */

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 0: Dot grid */}
      <DotGrid />

      {/* Layer 1: Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "10%",
            left: "-15%",
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "5%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Layer 2: Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            className="inline-block rounded-full border px-5 py-2 text-xs font-medium tracking-[0.15em] uppercase"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              color: "var(--color-muted)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Custom websites, apps &amp; automations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-8 section-headline"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your business deserves
          <br />
          a <span className="accent">real system</span>.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-lg sm:text-xl leading-relaxed mx-auto max-w-2xl"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          I build custom software for local businesses that agencies ignore.
          No templates. No ticket numbers. Just a system that actually works.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-8 py-3.5 text-sm font-semibold transition-all duration-200"
            style={{
              background: "#f7f8f8",
              color: "#0a0a0a",
              border: "1px solid #f7f8f8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Book a Free Strategy Call
          </a>
          <a
            href="#work"
            className="rounded-md border px-8 py-3.5 text-sm font-medium transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "var(--color-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              e.currentTarget.style.color = "#f7f8f8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "var(--color-muted)";
            }}
          >
            See What I&apos;ve Built
          </a>
        </motion.div>

        {/* Industry cycler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <IndustryCycler />
        </motion.div>
      </div>
    </section>
  );
}
