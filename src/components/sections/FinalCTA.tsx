"use client";

import { motion } from "framer-motion";
import { CAL_LINK } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="relative px-6 overflow-hidden" style={{ paddingTop: "clamp(80px, 10vw, 160px)", paddingBottom: "clamp(80px, 10vw, 160px)" }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="relative z-10 text-center mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-headline">
          Let&apos;s build <span className="accent">something together</span>.
        </h2>
        <p
          className="mx-auto mt-6 max-w-md text-base leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          Book a call and tell me about your business. No pressure, no commitment.
          Just a conversation about what you need and whether I can help.
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-md border px-10 py-4 text-base font-semibold transition-all duration-200"
          style={{
            background: "#f7f8f8",
            color: "#0a0a0a",
            borderColor: "#f7f8f8",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Book Your Free Strategy Call
        </a>
        <p className="mt-4 text-xs" style={{ color: "var(--color-dim)" }}>
          Free 30-minute call. No commitment.
        </p>
      </motion.div>
    </section>
  );
}
