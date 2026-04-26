"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

function GlowCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      className="glow-card"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function PortfolioCards() {
  return (
    <section id="work" className="section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Work</p>
          <h2 className="section-headline">
            Real things I&apos;ve <span className="accent">built</span>.
          </h2>
          <p className="mt-4 max-w-2xl story-body">
            I don&apos;t show mockups. Everything here is shipped and running.
          </p>
        </motion.div>

        {/* ─── Sensei App ─────────────────────────────────── */}
        <GlowCard>
          <div className="p-8 sm:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium mb-4" style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--color-muted)" }}>
                  SaaS Product
                </span>
                <h3 className="text-2xl font-semibold mb-1" style={{ color: "var(--color-foreground)" }}>Sensei App</h3>
                <p className="text-sm font-medium mb-5" style={{ color: "var(--color-dim)" }}>Full SaaS platform for independent coaches</p>
                <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "var(--color-muted)" }}>
                  Solo martial arts and fitness coaches were running their entire business across 5 different apps. I built <span className="accent">one system</span> that replaces all of it.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "46", label: "Database tables" },
                    { value: "150+", label: "API endpoints" },
                    { value: "1", label: "Person built it" },
                    { value: "Live", label: "In production" },
                  ].map((s) => (
                    <div key={s.label} className="text-center md:text-right">
                      <span className="text-3xl font-bold block" style={{ color: "var(--color-foreground)" }}>{s.value}</span>
                      <span className="text-xs" style={{ color: "var(--color-dim)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-px sm:grid-cols-2" style={{ background: "rgba(255,255,255,0.05)" }}>
            {[
              { src: "/portfolio/login-final.png", label: "Cinematic Login Experience" },
              { src: "/portfolio/coach-dashboard.png", label: "Command Center Dashboard" },
              { src: "/portfolio/coach-schedule.png", label: "Schedule & Calendar" },
              { src: "/portfolio/coach-payments.png", label: "Payment & Revenue Tracking" },
            ].map((p) => (
              <div key={p.label} className="group relative overflow-hidden" style={{ background: "#0a0a0a" }}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={p.src} alt={p.label} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)" }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium" style={{ color: "var(--color-foreground)" }}>{p.label}</p>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>

        {/* Transition */}
        <motion.p
          className="my-12 text-center text-sm"
          style={{ color: "var(--color-dim)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          And here&apos;s what I&apos;ve built for clients.
        </motion.p>

        {/* ─── FRAMELOCK ──────────────────────────────────── */}
        <GlowCard delay={0.1}>
          <div className="p-8 sm:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium mb-4" style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--color-muted)" }}>
                  Client Project
                </span>
                <h3 className="text-2xl font-semibold mb-1" style={{ color: "var(--color-foreground)" }}>FRAMELOCK</h3>
                <p className="text-sm font-medium mb-5" style={{ color: "var(--color-dim)" }}>Photography portfolio for a car photographer in Atlanta</p>
                <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "var(--color-muted)" }}>
                  Andy shoots cars and sports around Atlanta. I built him a <span className="accent">dark, cinematic portfolio</span> with a film-inspired design and masonry gallery.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "33", label: "Photos loaded" },
                    { value: "3", label: "Pricing tiers" },
                    { value: "<2 wks", label: "Build time" },
                    { value: "Live", label: "In production" },
                  ].map((s) => (
                    <div key={s.label} className="text-center md:text-right">
                      <span className="text-3xl font-bold block" style={{ color: "var(--color-foreground)" }}>{s.value}</span>
                      <span className="text-xs" style={{ color: "var(--color-dim)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-px sm:grid-cols-2" style={{ background: "rgba(255,255,255,0.05)" }}>
            {[
              { src: "/portfolio/framelock-hero.png", label: "Hero Carousel" },
              { src: "/portfolio/framelock-gallery.png", label: "Masonry Gallery" },
              { src: "/portfolio/framelock-pricing.png", label: "Services & Pricing" },
              { src: "/portfolio/framelock-mobile.png", label: "Mobile Experience" },
            ].map((p) => (
              <div key={p.label} className="group relative overflow-hidden" style={{ background: "#0a0a0a" }}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={p.src} alt={p.label} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)" }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium" style={{ color: "var(--color-foreground)" }}>{p.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--color-silver)" }}>Built for Andy — a car photographer in Atlanta.</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-dim)" }}>Next.js 16 &middot; Tailwind v4 &middot; Framer Motion &middot; Vercel</p>
            </div>
            <a href="https://shutter-city.vercel.app" target="_blank" rel="noopener noreferrer"
              className="rounded-md border px-5 py-2.5 text-sm font-medium transition-all duration-200 flex-shrink-0"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--color-foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              See it live &rarr;
            </a>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
