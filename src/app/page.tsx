"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import AnimatedIntro from "@/components/AnimatedIntro";

const CAL_LINK = "https://cal.com/foundos.ai/strategy-call";

/* ─── Helpers ───────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0, 0, 0.2, 1] as const },
  }),
};

function R({ children }: { children: React.ReactNode }) {
  return <span className="accent">{children}</span>;
}

function CubeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="200 180 680 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M540 240 L780 380 L540 520 L300 380 Z" fill="#fff" opacity="0.95" />
      <path d="M300 380 L540 520 L540 760 L300 620 Z" fill="#fff" opacity="0.55" />
      <path d="M780 380 L540 520 L540 760 L780 620 Z" fill="#fff" opacity="0.3" />
    </svg>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-6 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

/* ─── Cursor parallax ───────────────────────────────────────── */

function useCursorParallax(strength: number = 20) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useTransform(mouseX, [-1, 1], [-strength, strength]);
  const y = useTransform(mouseY, [-1, 1], [-strength, strength]);

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return { x, y };
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 1 — HOOK
   ═══════════════════════════════════════════════════════════════ */

function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 sm:px-10"
      style={{ background: "rgba(10,10,10,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <a href="#" className="flex items-center gap-2">
        <CubeLogo size={24} />
        <span className="text-sm font-semibold tracking-[0.15em] text-foreground">FOUNDOS</span>
      </a>
      <div className="flex items-center gap-6">
        <a href="#services" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>Services</a>
        <a href="#work" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>Work</a>
        <a href="#packages" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>Packages</a>
        <a href="#about" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>About</a>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="rounded-md px-4 py-2 text-sm font-medium transition-colors"
          style={{ background: "#dc2626", color: "#ffffff" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
        >
          Book a Call
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const parallax = useCursorParallax(15);

  return (
    <Section className="pt-40 sm:pt-52 pb-20 text-center relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
      }} />

      {/* Cursor glow */}
      <motion.div className="absolute pointer-events-none" style={{
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 60%)",
        x: parallax.x, y: parallax.y,
        left: "calc(50% - 300px)", top: "calc(50% - 300px)",
      }} />

      <motion.p
        className="mb-6 text-sm font-medium tracking-[0.3em] uppercase relative z-10"
        style={{ color: "#dc2626" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        Your business deserves better
      </motion.p>

      <motion.h1
        className="story-statement mx-auto max-w-4xl relative z-10"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
      >
        We build the <R>system</R> that runs your business.
      </motion.h1>

      <motion.p
        className="mx-auto mt-6 max-w-xl text-lg leading-relaxed relative z-10"
        style={{ color: "#8a8f98" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
      >
        Custom websites, apps, and <R>AI automations</R> — designed for local businesses
        ready to <R>scale</R>.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center relative z-10"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
      >
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="rounded-md px-8 py-3.5 text-sm font-semibold transition-all duration-200"
          style={{ background: "#dc2626", color: "#ffffff" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Book a Free Strategy Call
        </a>
        <a
          href="#problem"
          className="rounded-md border px-8 py-3.5 text-sm font-medium transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.15)", color: "#d0d6e0" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
        >
          See How It Works
        </a>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 2 — THE PROBLEM
   ═══════════════════════════════════════════════════════════════ */

function Problem() {
  return (
    <Section id="problem" className="py-32 sm:py-40">
      <motion.div
        className="text-center"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <h2 className="story-statement mx-auto max-w-3xl">
          Your competitor has a website.<br />
          <R>You don&apos;t.</R>
        </h2>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 max-w-2xl space-y-8"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
      >
        <p className="story-body text-center">
          You&apos;re running your business from your <R>phone</R>. Clients in your DMs.
          Schedule in your head. Payments on Venmo. Reviews you never asked for.
        </p>
        <p className="story-body text-center">
          You&apos;re juggling <R>5 different apps</R> and spending more time on
          admin than on the work you actually <R>love</R>.
        </p>
        <p className="story-body text-center" style={{ color: "#d0d6e0", fontWeight: 500 }}>
          It doesn&apos;t have to be like that.
        </p>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 3 — THE SOLUTION
   ═══════════════════════════════════════════════════════════════ */

function Solution() {
  const services = [
    {
      title: "Custom Websites",
      price: "From $1,500",
      time: "2-3 weeks",
      description: "Fast, mobile-first sites built to make your business look as good online as it is in person.",
      features: ["3-5 page responsive site", "Contact forms & booking", "Google Maps & reviews", "SEO from day one"],
    },
    {
      title: "Branded Mobile Apps",
      price: "From $5,000",
      time: "4-8 weeks",
      description: "Your own app on the App Store. Booking, schedules, push notifications — all your brand.",
      features: ["iOS & Android", "Client portal & booking", "Push notifications", "Payment processing"],
    },
    {
      title: "Lead Generation",
      price: "From $500",
      time: "1-2 weeks",
      description: "Landing pages and automated follow-ups that turn visitors into paying clients on autopilot.",
      features: ["High-converting landing page", "Email capture & lead magnets", "Automated follow-up emails", "Analytics & tracking"],
    },
    {
      title: "AI Agents & Automations",
      price: "From $1,000",
      time: "Ongoing",
      description: "AI chatbots, review requests, payment reminders — systems that run while you sleep.",
      features: ["Website chatbot", "Automated review requests", "Payment reminders", "Client follow-ups"],
    },
  ];

  return (
    <Section id="services">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-6">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#dc2626" }}>
          What we build
        </p>
        <h2 className="story-statement">
          One partner. <R>Everything</R> you need.
        </h2>
        <p className="mt-4 max-w-2xl story-body">
          From your <R>first website</R> to AI-powered automations — we handle it all
          so you can focus on what you do best.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 mt-12">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="rounded-xl border p-8 transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(220,38,38,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: "#f7f8f8" }}>{s.title}</h3>
              <span className="text-sm font-semibold" style={{ color: "#dc2626" }}>{s.price}</span>
            </div>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "#8a8f98" }}>{s.description}</p>
            <ul className="mb-4 space-y-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#d0d6e0" }}>
                  <span style={{ color: "#dc2626" }}>&#x2014;</span> {f}
                </li>
              ))}
            </ul>
            <p className="text-xs font-medium" style={{ color: "#62666d" }}>{s.time}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 4 — THE PROOF
   ═══════════════════════════════════════════════════════════════ */

function Proof() {
  const stats = [
    { stat: "97%", label: "of consumers search online for local businesses", headline: "They're looking for you. Can they find you?" },
    { stat: "5x", label: "more conversions with automated follow-up", headline: "Every lead gets answered. Automatically." },
    { stat: "75%", label: "judge your credibility by your website", headline: "First impressions close deals." },
    { stat: "10+", label: "hours saved per week with automation", headline: "Stop doing admin. Start doing the work." },
  ];

  return (
    <Section>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12 text-center">
        <h2 className="story-statement">
          The numbers <R>don&apos;t lie</R>.
        </h2>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2">
        {stats.map((s, i) => (
          <motion.div
            key={s.stat}
            className="rounded-xl border p-8"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
          >
            <span className="text-5xl font-bold" style={{ color: "#dc2626" }}>{s.stat}</span>
            <p className="mt-1 text-xs" style={{ color: "#62666d" }}>{s.label}</p>
            <p className="mt-4 text-base font-semibold" style={{ color: "#f7f8f8" }}>{s.headline}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 4.5 — THE WORK (Portfolio)
   ═══════════════════════════════════════════════════════════════ */

function Portfolio() {
  const projects = [
    { src: "/portfolio/login-final.png", label: "Branded Login Experience" },
    { src: "/portfolio/coach-schedule.png", label: "Coach Schedule & Calendar" },
    { src: "/portfolio/coach-clients.png", label: "Client Management Dashboard" },
    { src: "/portfolio/coach-payments.png", label: "Payment & Revenue Tracking" },
  ];

  return (
    <Section id="work">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#dc2626" }}>
          Recent work
        </p>
        <h2 className="story-statement">
          Built. <R>Shipped.</R> Running.
        </h2>
        <p className="mt-4 max-w-2xl story-body">
          Sensei App — a full coaching platform built for a <R>martial arts coach</R> who needed
          client management, scheduling, payments, and messaging in <R>one place</R>.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.label}
            className="group relative overflow-hidden rounded-xl border"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={p.src}
                alt={p.label}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)",
              }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm font-medium" style={{ color: "#f7f8f8" }}>{p.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 text-center"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={5}
      >
        <p className="text-sm" style={{ color: "#62666d" }}>
          Want something like this for your business?
        </p>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200"
          style={{ background: "#dc2626", color: "#ffffff" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Book a Free Strategy Call
        </a>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 5 — THE DEAL (Partnership + Packages)
   ═══════════════════════════════════════════════════════════════ */

function Partnership() {
  return (
    <Section>
      <motion.div
        className="rounded-2xl border p-10 sm:p-14 text-center"
        style={{ borderColor: "rgba(220,38,38,0.15)", background: "linear-gradient(135deg, rgba(220,38,38,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <h2 className="story-statement mx-auto max-w-2xl">
          When you grow, <R>I grow</R>.<br />That&apos;s the deal.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: "#8a8f98" }}>
          I&apos;m not a faceless agency. I work with you <R>long-term</R>. Everything
          is customized to <R>your brand</R> — your colors, your voice, your way.
        </p>
        <div className="mx-auto mt-8 grid max-w-lg gap-6 sm:grid-cols-3">
          {[
            { label: "Your brand", detail: "Custom design, your identity" },
            { label: "Your pace", detail: "We move when you're ready" },
            { label: "Your partner", detail: "Direct access, not a ticket" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm font-semibold" style={{ color: "#f7f8f8" }}>{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "#62666d" }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function Packages() {
  const packages = [
    {
      name: "Launch",
      price: "$1,500",
      monthly: "$750/mo \u00d7 2",
      description: "Get online fast. Perfect if you have no web presence yet.",
      includes: ["Custom 3-5 page website", "Mobile responsive", "Contact form + Google Maps", "Basic SEO setup", "1 month free maintenance"],
      cta: "Most Popular",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$3,500",
      monthly: "$875/mo \u00d7 4",
      priceNote: "Save $500",
      description: "Website + lead gen + automations. Built to bring in new clients on autopilot.",
      includes: ["Everything in Launch", "Lead capture landing page", "Automated email follow-ups", "Google review automation", "Missed client follow-ups", "3 months free maintenance"],
      cta: "Best Value",
      highlight: true,
    },
    {
      name: "Full Build",
      price: "$8,000+",
      monthly: "From $2,000/mo \u00d7 4",
      priceNote: "Save $1,500+",
      description: "The complete digital system. Website, app, automations, ongoing support.",
      includes: ["Everything in Growth", "Branded iOS & Android app", "Client booking + payments", "Push notifications", "AI chatbot for your site", "6 months free maintenance", "Priority support"],
      cta: "For Serious Operators",
      highlight: false,
    },
  ];

  return (
    <Section id="packages">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#dc2626" }}>Packages</p>
        <h2 className="story-statement">
          Pick a package. <R>Ship faster.</R>
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            className="relative flex flex-col rounded-xl border p-8 transition-colors"
            style={{
              borderColor: pkg.highlight ? "rgba(220,38,38,0.3)" : "rgba(255,255,255,0.08)",
              background: pkg.highlight ? "rgba(220,38,38,0.04)" : "rgba(255,255,255,0.02)",
            }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(220,38,38,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = pkg.highlight ? "rgba(220,38,38,0.3)" : "rgba(255,255,255,0.08)")}
          >
            <span className="mb-5 inline-block self-start rounded-full px-3 py-1 text-xs font-medium" style={{
              background: pkg.highlight ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.05)",
              color: pkg.highlight ? "#dc2626" : "#8a8f98",
              border: `1px solid ${pkg.highlight ? "rgba(220,38,38,0.3)" : "rgba(255,255,255,0.08)"}`,
            }}>
              {pkg.cta}
            </span>
            <h3 className="mb-1 text-xl font-semibold" style={{ color: "#f7f8f8" }}>{pkg.name}</h3>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold" style={{ color: "#f7f8f8" }}>{pkg.price}</span>
              {pkg.priceNote && <span className="text-sm font-medium" style={{ color: "#dc2626" }}>{pkg.priceNote}</span>}
            </div>
            {pkg.monthly && (
              <p className="mb-3 text-sm font-medium" style={{ color: "#62666d" }}>
                or <span style={{ color: "#8a8f98" }}>{pkg.monthly}</span>
              </p>
            )}
            <p className="mb-6 text-sm leading-relaxed" style={{ color: "#8a8f98" }}>{pkg.description}</p>
            <ul className="mb-8 flex-1 space-y-2.5">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#d0d6e0" }}>
                  <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: pkg.highlight ? "#dc2626" : "#62666d" }} />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={CAL_LINK} target="_blank" rel="noopener noreferrer"
              className="block rounded-md py-3 text-center text-sm font-semibold transition-colors"
              style={{
                background: pkg.highlight ? "#dc2626" : "transparent",
                color: pkg.highlight ? "#ffffff" : "#d0d6e0",
                border: pkg.highlight ? "none" : "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={(e) => {
                if (pkg.highlight) e.currentTarget.style.background = "#b91c1c";
                else e.currentTarget.style.borderColor = "rgba(220,38,38,0.3)";
              }}
              onMouseLeave={(e) => {
                if (pkg.highlight) e.currentTarget.style.background = "#dc2626";
                else e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>

      {/* Payment options */}
      <motion.div
        className="mt-12 rounded-xl border p-8 sm:p-10"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ color: "#f7f8f8" }}>
          Flexible <R>payment options</R>
        </h3>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-sm font-medium" style={{ color: "#d0d6e0" }}>Pay in full</p>
            <p className="text-xs leading-relaxed" style={{ color: "#62666d" }}>Full payment upfront. Work starts immediately. <R>Best price.</R></p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium" style={{ color: "#d0d6e0" }}>50/50 split</p>
            <p className="text-xs leading-relaxed" style={{ color: "#62666d" }}>50% to start, 50% on delivery. <R>Most popular.</R></p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium" style={{ color: "#d0d6e0" }}>Monthly plan</p>
            <p className="text-xs leading-relaxed" style={{ color: "#62666d" }}>Split into <R>3-4 monthly payments</R>. Available on Growth and Full Build.</p>
          </div>
        </div>
        <p className="mt-6 text-xs" style={{ color: "#62666d" }}>
          We accept bank transfer, Zelle, Venmo, and card. All packages include a <R>free strategy call</R> before you commit.
        </p>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 6 — THE HUMAN
   ═══════════════════════════════════════════════════════════════ */

function About() {
  return (
    <Section id="about">
      <motion.div
        className="flex flex-col gap-10 md:flex-row md:items-start"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center rounded-2xl" style={{
          background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)",
        }}>
          <span className="text-4xl font-bold" style={{ color: "#dc2626" }}>JP</span>
        </div>

        <div className="flex-1">
          <h3 className="mb-1 text-xl font-semibold" style={{ color: "#f7f8f8" }}>JP Potesta</h3>
          <p className="mb-5 text-sm font-medium" style={{ color: "#dc2626" }}>
            Founder &amp; Builder &middot; Atlanta, GA &middot; 19
          </p>

          <p className="max-w-xl text-base leading-relaxed" style={{ color: "#8a8f98" }}>
            I come from <R>martial arts and coaching</R>. I&apos;ve seen firsthand how
            small business owners are stuck juggling apps, losing clients, and
            spending time on admin instead of the work they love. I build
            <R> exactly what you need</R> — no templates, no cookie-cutter solutions.
            I ship it, I make sure it works, and I stick around.
          </p>

          <a
            href={CAL_LINK} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block rounded-md px-8 py-3.5 text-sm font-semibold transition-all duration-200"
            style={{ background: "#dc2626", color: "#ffffff" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Let&apos;s Talk About Your Business
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 7 — FINAL CTA
   ═══════════════════════════════════════════════════════════════ */

function FinalCta() {
  return (
    <Section className="py-32 sm:py-40">
      <motion.div
        className="text-center"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <h2 className="story-statement mx-auto max-w-2xl">
          Ready to stop <R>losing clients</R> to businesses with better tech?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed" style={{ color: "#8a8f98" }}>
          Book a <R>free</R> strategy call. No pressure. We&apos;ll figure out exactly what
          your business needs and give you a clear plan.
        </p>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-block rounded-md px-10 py-4 text-base font-semibold transition-all duration-200"
          style={{ background: "#dc2626", color: "#ffffff" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#b91c1c"; e.currentTarget.style.boxShadow = "0 0 40px rgba(220,38,38,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Book Your Free Strategy Call
        </a>
      </motion.div>
    </Section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t px-6 py-12" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <CubeLogo size={20} />
          <span className="text-sm font-semibold tracking-[0.15em]" style={{ color: "#f7f8f8" }}>FOUNDOS</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { name: "Instagram", url: "https://instagram.com/foundos.ai" },
            { name: "TikTok", url: "https://tiktok.com/@foundos.ai" },
            { name: "LinkedIn", url: "https://linkedin.com/in/jppotesta" },
          ].map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer"
              className="text-sm transition-colors" style={{ color: "#62666d" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#62666d")}
            >{name}</a>
          ))}
        </div>
        <a href="mailto:hello@foundos.ai" className="text-xs transition-colors" style={{ color: "#62666d" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#62666d")}
        >hello@foundos.ai</a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE — The Scrolling Story
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  return (
    <>
      {showIntro && <AnimatedIntro onComplete={handleIntroComplete} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Nav />
        <main>
          {/* Ch.1: Hook */}
          <Hero />
          <Divider />

          {/* Ch.2: The Problem */}
          <Problem />
          <Divider />

          {/* Ch.3: The Solution */}
          <Solution />
          <Divider />

          {/* Ch.4: The Proof */}
          <Proof />
          <Divider />

          {/* Ch.4.5: The Work */}
          <Portfolio />

          {/* Ch.5: The Deal */}
          <Partnership />
          <Divider />
          <Packages />
          <Divider />

          {/* Ch.6: The Human */}
          <About />
          <Divider />

          {/* Ch.7: Final CTA */}
          <FinalCta />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
