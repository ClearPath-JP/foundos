"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CAL_LINK } from "@/lib/constants";

export default function AboutSection() {
  return (
    <section id="about" className="section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="flex flex-col gap-12 md:flex-row md:items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-shrink-0">
            <div className="relative h-56 w-56 overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <Image src="/josh.jpg" alt="Josh Potesta" fill className="object-cover" sizes="224px" priority={false} />
            </div>
          </div>

          <div className="flex-1">
            <p className="section-eyebrow">
              Josh Potesta &middot; Atlanta &middot; 19
            </p>
            <h2 className="section-headline mb-6">
              I don&apos;t disappear <span className="accent">after launch</span>.
            </h2>

            <div className="max-w-xl space-y-6">
              <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                I&apos;ve spent the last <span className="accent">6 years in martial arts</span> — training, teaching, watching coaches run their entire business from their phone. I lived in that world. I know what it&apos;s like.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                It&apos;s not just coaches. It&apos;s dance studios, restaurants, salons, contractors, photographers — <span className="accent">local business owners everywhere</span> getting left behind.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                You text me. I respond. <span className="accent">No support tickets. No gatekeepers.</span>
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { label: "Your brand", detail: "Everything custom to your identity" },
                { label: "Your pace", detail: "No pressure, no corporate timelines" },
                { label: "Direct access", detail: "You text me. I respond." },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--color-dim)" }}>{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer"
                className="rounded-md border px-6 py-3 text-sm font-semibold transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "var(--color-foreground)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f8f8"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#f7f8f8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f7f8f8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
              >
                Book a Call
              </a>
              <a href="mailto:hello@foundos.ai"
                className="rounded-md border px-6 py-3 text-sm font-medium transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "var(--color-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                hello@foundos.ai
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
