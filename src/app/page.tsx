"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
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

function A({ children }: { children: React.ReactNode }) {
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
   NAV
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
        <a href="#problem" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>The Problem</a>
        <a href="#services" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>Services</a>
        <a href="#packages" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>Packages</a>
        <a href="#about" className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>About</a>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.25)", color: "#f7f8f8", background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(255,255,255,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Book a Call
        </a>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 1 — HERO
   Cut through the noise. Relationship first.
   ═══════════════════════════════════════════════════════════════ */

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

      {/* Cursor glow — white, not red */}
      <motion.div className="absolute pointer-events-none" style={{
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
        x: parallax.x, y: parallax.y,
        left: "calc(50% - 300px)", top: "calc(50% - 300px)",
      }} />

      <motion.p
        className="mb-6 text-sm font-medium tracking-[0.3em] uppercase relative z-10"
        style={{ color: "#8a8f98" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        Cut through the noise
      </motion.p>

      <motion.h1
        className="story-statement mx-auto max-w-4xl relative z-10"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
      >
        Everyone&apos;s talking about AI.<br />
        Nobody&apos;s <A>sitting down with you</A>.
      </motion.h1>

      <motion.p
        className="mx-auto mt-6 max-w-xl text-lg leading-relaxed relative z-10"
        style={{ color: "#8a8f98" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
      >
        I&apos;m not an agency. I&apos;m a person who builds <A>custom websites</A>,
        apps, and automations for your business — after I actually understand it.
        <A> Relationship first</A>, tech second.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center relative z-10"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
      >
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="rounded-md border px-8 py-3.5 text-sm font-semibold transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "#f7f8f8", background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f8f8"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#f7f8f8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f7f8f8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
        >
          Book a Free Strategy Call
        </a>
        <a
          href="#problem"
          className="rounded-md border px-8 py-3.5 text-sm font-medium transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8a8f98" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          See How It Works
        </a>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 2 — THE PROBLEM
   Not about missing a website. About overwhelm.
   ═══════════════════════════════════════════════════════════════ */

function Problem() {
  return (
    <Section id="problem" className="py-32 sm:py-40">
      <motion.div
        className="text-center"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <h2 className="story-statement mx-auto max-w-3xl">
          The problem isn&apos;t your business.<br />
          It&apos;s the <A>noise around it</A>.
        </h2>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 max-w-2xl space-y-8"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
      >
        <p className="story-body text-center">
          Every day there&apos;s a new AI tool, a new platform, someone telling you
          that you need to <A>upgrade everything</A>. You don&apos;t know who to trust.
          You don&apos;t know where to start. And everyone selling you something has
          their own agenda.
        </p>
        <p className="story-body text-center">
          You don&apos;t need more tools. You don&apos;t need a 47-page proposal from
          an agency that&apos;s never met you. You need someone who actually
          <A> understands your business</A> and builds exactly what makes sense.
        </p>
        <p className="story-body text-center" style={{ color: "#d0d6e0", fontWeight: 500 }}>
          Custom. Not cookie-cutter. Built by a person, not a template.
        </p>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 3 — THE SOLUTION
   Reframed: I sit down with you.
   ═══════════════════════════════════════════════════════════════ */

function Solution() {
  const services = [
    {
      title: "Custom Websites",
      description: "We start by talking about your business, your clients, what makes you different. Then I build a site that actually reflects who you are and helps people find you.",
      features: ["Designed around your brand", "Fast, mobile-first", "Contact forms and booking built in", "SEO so people actually find you"],
    },
    {
      title: "Branded Mobile Apps",
      description: "Your own app, your logo, your colors. Clients book, pay, and stay connected through something that feels like yours — not someone else's platform.",
      features: ["iOS and Android", "Client portal and booking", "Push notifications", "Payment processing"],
    },
    {
      title: "Lead Generation",
      description: "Most business owners lose leads because nobody follows up fast enough. I build landing pages and automated sequences that turn visitors into clients while you sleep.",
      features: ["High-converting landing pages", "Email capture and follow-up", "Automated outreach sequences", "Analytics so you see what's working"],
    },
    {
      title: "AI Agents and Automations",
      description: "The stuff you do every day that eats your time — review requests, payment reminders, client follow-ups. I automate it so you can focus on the actual work.",
      features: ["Smart chatbots for your site", "Automated review collection", "Payment and booking reminders", "Client follow-up sequences"],
    },
  ];

  return (
    <Section id="services">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-6">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>
          How I work
        </p>
        <h2 className="story-statement">
          I sit down with you first. <A>Then I build</A>.
        </h2>
        <p className="mt-4 max-w-2xl story-body">
          No templates. No one-size-fits-all packages sold over email.
          I learn your business, understand your clients, and build something
          that <A>actually makes sense</A> for where you are right now.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 mt-12">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="rounded-xl border p-8 transition-all duration-200"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <h3 className="mb-3 text-lg font-semibold" style={{ color: "#f7f8f8" }}>{s.title}</h3>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "#8a8f98" }}>{s.description}</p>
            <ul className="space-y-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#d0d6e0" }}>
                  <span className="block h-1 w-1 flex-shrink-0 rounded-full" style={{ background: "#62666d" }} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 4 — SOCIAL PROOF (stats)
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
          The numbers <A>speak for themselves</A>.
        </h2>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2">
        {stats.map((s, i) => (
          <motion.div
            key={s.stat}
            className="rounded-xl border p-8 transition-all duration-200"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <span className="text-5xl font-bold" style={{ color: "#f7f8f8" }}>{s.stat}</span>
            <p className="mt-1 text-xs" style={{ color: "#62666d" }}>{s.label}</p>
            <p className="mt-4 text-base font-semibold" style={{ color: "#d0d6e0" }}>{s.headline}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 5 — THE WORK (Portfolio)
   ═══════════════════════════════════════════════════════════════ */

function Portfolio() {
  {/* TODO: Screenshots currently have yellow accent colors — need to re-capture
      with red accent theme (matching the login page) and replace these images.
      Files to update: login-final.png, coach-schedule.png, coach-clients.png, coach-payments.png */}
  const projects = [
    { src: "/portfolio/login-final.png", label: "Branded Login Experience" },
    { src: "/portfolio/coach-schedule.png", label: "Coach Schedule & Calendar" },
    { src: "/portfolio/coach-clients.png", label: "Client Management Dashboard" },
    { src: "/portfolio/coach-payments.png", label: "Payment & Revenue Tracking" },
  ];

  return (
    <Section id="work">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>
          Recent work
        </p>
        <h2 className="story-statement">
          Built. <A>Shipped.</A> Running.
        </h2>
        <p className="mt-4 max-w-2xl story-body">
          Sensei App — a coaching platform built specifically for solo martial arts and fitness coaches.
          Not a template. Not a generic CRM. A full operating system designed around how coaches
          actually work: <A>one coach, their clients, everything in one place</A>.
        </p>
      </motion.div>

      {/* ─── Sensei App product pitch ─────────────────────────── */}
      <motion.div
        className="mb-10 rounded-xl border p-8 sm:p-10"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 max-w-xl">
            <h3 className="text-xl font-semibold mb-1" style={{ color: "#f7f8f8" }}>
              Sensei App
            </h3>
            <p className="text-sm font-medium mb-4" style={{ color: "#62666d" }}>
              The coaching OS for independent trainers
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#8a8f98" }}>
              If you&apos;re a solo coach running things from your phone — juggling notes in one app,
              scheduling in another, taking payments on Venmo — Sensei App replaces all of it.
              Your own <A>branded login</A>, your clients, your schedule, your payments, your messages.
              One place. Built for how you actually work.
            </p>
            <ul className="space-y-2.5 mb-6">
              {[
                "Your own branded coach portal — your name, your identity",
                "Client tracking with progress, notes, and session history",
                "Built-in scheduling and attendance",
                "Payments and revenue tracking through Stripe",
                "Direct coach-to-client messaging",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#d0d6e0" }}>
                  <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#f7f8f8" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-right flex-shrink-0">
            <span className="text-3xl font-bold" style={{ color: "#f7f8f8" }}>$99</span>
            <span className="text-sm" style={{ color: "#62666d" }}>/month</span>
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: "#8a8f98" }}>
              If you&apos;re a coach and this interests you, text me directly:
            </p>
            <a
              href="sms:4044363393"
              className="mt-3 inline-block rounded-md border px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "#f7f8f8" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f8f8"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#f7f8f8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f7f8f8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
            >
              404-436-3393
            </a>
          </div>
        </div>
      </motion.div>

      {/* ─── Portfolio screenshots ────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.label}
            className="group relative overflow-hidden rounded-xl border transition-all duration-200"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <div className="relative aspect-video overflow-hidden">
              {/* TODO: Re-capture these screenshots with red accent theme to match login page */}
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
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={7}
      >
        <p className="text-sm" style={{ color: "#62666d" }}>
          Want something like this for your business?
        </p>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md border px-6 py-3 text-sm font-semibold transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.25)", color: "#f7f8f8" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f8f8"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#f7f8f8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f7f8f8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
        >
          Let&apos;s Talk About Yours
        </a>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 6 — PARTNERSHIP
   Stronger. Not a freelancer. Not an agency.
   ═══════════════════════════════════════════════════════════════ */

function Partnership() {
  return (
    <Section>
      <motion.div
        className="rounded-2xl border p-10 sm:p-14 text-center"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <h2 className="story-statement mx-auto max-w-3xl">
          I&apos;m not a freelancer who disappears.<br />
          I&apos;m not an agency that sends you a <A>ticket number</A>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: "#8a8f98" }}>
          I&apos;m your builder. You tell me what your business needs, I make it real.
          When things change, we adapt together. When you grow, <A>I grow with you</A>.
          That&apos;s how this works.
        </p>
        <div className="mx-auto mt-10 grid max-w-xl gap-8 sm:grid-cols-3">
          {[
            { label: "Your brand", detail: "Everything custom to your identity, your colors, your voice" },
            { label: "Your pace", detail: "We move when you're ready, no pressure, no corporate timelines" },
            { label: "Direct access", detail: "You text me. I respond. No support tickets, no gatekeepers" },
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

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 7 — PACKAGES
   Clean pricing + detailed How It Works below
   ═══════════════════════════════════════════════════════════════ */

function Packages() {
  const packages = [
    {
      name: "Launch",
      price: "$1,500",
      description: "Get online fast. A real website that represents your business, not a template with your name on it.",
      includes: ["Custom 3-5 page website", "Mobile responsive design", "Contact form + Google Maps", "Basic SEO setup", "1 month free maintenance"],
      cta: "Most Popular",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$3,500",
      description: "Website + lead generation + automations. Built to bring in new clients on autopilot while you focus on the work.",
      includes: ["Everything in Launch", "Lead capture landing page", "Automated email follow-ups", "Google review automation", "Missed client follow-ups", "3 months free maintenance"],
      cta: "Best Value",
      highlight: true,
    },
    {
      name: "Full Build",
      price: "$8,000+",
      description: "The complete digital system. Website, app, automations, ongoing support. For when you're ready to go all in.",
      includes: ["Everything in Growth", "Branded iOS & Android app", "Client booking + payments", "Push notifications", "AI chatbot for your site", "6 months free maintenance", "Priority support"],
      cta: "For Serious Operators",
      highlight: false,
    },
  ];

  return (
    <Section id="packages">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>Packages</p>
        <h2 className="story-statement">
          Transparent pricing. <A>No surprises</A>.
        </h2>
        <p className="mx-auto mt-4 max-w-lg story-body text-center">
          Every package starts with a free strategy call. You don&apos;t pay anything until
          we both agree on what makes sense.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            className="relative flex flex-col rounded-xl border p-8 transition-all duration-200"
            style={{
              borderColor: pkg.highlight ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
              background: pkg.highlight ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
            }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = pkg.highlight ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <span className="mb-5 inline-block self-start rounded-full px-3 py-1 text-xs font-medium" style={{
              background: pkg.highlight ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
              color: pkg.highlight ? "#f7f8f8" : "#8a8f98",
              border: `1px solid ${pkg.highlight ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
            }}>
              {pkg.cta}
            </span>
            <h3 className="mb-1 text-xl font-semibold" style={{ color: "#f7f8f8" }}>{pkg.name}</h3>
            <span className="text-3xl font-bold mb-3" style={{ color: "#f7f8f8" }}>{pkg.price}</span>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: "#8a8f98" }}>{pkg.description}</p>
            <ul className="mb-8 flex-1 space-y-2.5">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#d0d6e0" }}>
                  <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: pkg.highlight ? "#f7f8f8" : "#62666d" }} />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={CAL_LINK} target="_blank" rel="noopener noreferrer"
              className="block rounded-md py-3 text-center text-sm font-semibold transition-all duration-200"
              style={{
                background: pkg.highlight ? "#f7f8f8" : "transparent",
                color: pkg.highlight ? "#0a0a0a" : "#d0d6e0",
                border: pkg.highlight ? "1px solid #f7f8f8" : "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={(e) => {
                if (pkg.highlight) { e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.15)"; }
                else { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }
              }}
              onMouseLeave={(e) => {
                if (pkg.highlight) { e.currentTarget.style.boxShadow = "none"; }
                else { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }
              }}
            >
              Book a Call
            </a>
          </motion.div>
        ))}
      </div>

      {/* ─── How It Works ──────────────────────────────────────── */}
      <motion.div
        className="mt-16 rounded-xl border p-8 sm:p-12"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
      >
        <h3 className="mb-2 text-xl font-semibold" style={{ color: "#f7f8f8" }}>
          How it <A>actually works</A>
        </h3>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: "#8a8f98" }}>
          From first call to launch day — here&apos;s what the process looks like.
        </p>

        {/* Timeline */}
        <div className="space-y-10">
          {[
            {
              week: "Before you pay anything",
              title: "Free strategy call",
              body: "We hop on a call. You tell me about your business, your clients, what's working and what's not. I'll tell you honestly what I think you need — and if we're a good fit. No pressure, no sales pitch.",
            },
            {
              week: "Week 1",
              title: "Strategy + design",
              body: "I map out the structure, create mockups, and get your feedback. Nothing gets built until you're happy with the direction. We go back and forth until it feels right.",
            },
            {
              week: "Week 2",
              title: "Build",
              body: "I build everything out. You get progress updates along the way. If something needs to change, we change it. This is collaborative, not a black box.",
            },
            {
              week: "Week 3",
              title: "Review + launch",
              body: "Final review together. We make sure everything works, looks great on every device, and matches your brand. Then we go live.",
            },
            {
              week: "After launch",
              title: "Ongoing support",
              body: "I don't disappear. Every package includes free maintenance. If something breaks or you want changes, you text me directly.",
            },
          ].map((step, idx) => (
            <div key={step.week} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="glow-dot h-3 w-3 flex-shrink-0 rounded-full" style={{ background: "#f7f8f8" }} />
                {idx < 4 && <div className="mt-1 w-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />}
              </div>
              <div className="pb-2">
                <p className="text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "#62666d" }}>{step.week}</p>
                <p className="mt-1 text-base font-semibold" style={{ color: "#f7f8f8" }}>{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed max-w-lg" style={{ color: "#8a8f98" }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Expected timelines by package */}
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <h4 className="mb-6 text-sm font-semibold tracking-[0.1em] uppercase" style={{ color: "#62666d" }}>
            Expected timelines
          </h4>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold" style={{ color: "#f7f8f8" }}>Launch</p>
              <p className="mt-1 text-sm" style={{ color: "#8a8f98" }}>2-3 weeks from kickoff to live</p>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#f7f8f8" }}>Growth</p>
              <p className="mt-1 text-sm" style={{ color: "#8a8f98" }}>3-5 weeks including automations</p>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#f7f8f8" }}>Full Build</p>
              <p className="mt-1 text-sm" style={{ color: "#8a8f98" }}>6-10 weeks for website + app + systems</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Payment options ───────────────────────────────────── */}
      <motion.div
        className="mt-6 rounded-xl border p-8 sm:p-12"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={5}
      >
        <h3 className="mb-2 text-xl font-semibold" style={{ color: "#f7f8f8" }}>
          Flexible <A>payment options</A>
        </h3>
        <p className="mb-3 text-sm leading-relaxed" style={{ color: "#8a8f98" }}>
          I want to make this work for your budget — not the other way around.
        </p>
        <p className="mb-8 text-base leading-relaxed" style={{ color: "#d0d6e0" }}>
          We work with your budget. Need to spread $3,500 over 6 months? We can do that.
          $1,500 over 3 months? Done. You tell me what works and we&apos;ll figure out a plan.
          <A> Zero pressure. Maximum flexibility.</A>
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
            <p className="mb-2 text-sm font-semibold" style={{ color: "#f7f8f8" }}>Pay in full</p>
            <p className="text-xs leading-relaxed" style={{ color: "#8a8f98" }}>
              Full payment upfront. Work starts immediately. Fastest turnaround.
            </p>
          </div>
          <div className="rounded-lg border p-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
            <p className="mb-2 text-sm font-semibold" style={{ color: "#f7f8f8" }}>50/50 split</p>
            <p className="text-xs leading-relaxed" style={{ color: "#8a8f98" }}>
              50% to start, 50% on delivery. The most popular option.
            </p>
          </div>
          <div className="rounded-lg border p-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
            <p className="mb-2 text-sm font-semibold" style={{ color: "#f7f8f8" }}>Monthly installments</p>
            <p className="text-xs leading-relaxed" style={{ color: "#8a8f98" }}>
              X amount for X months until it&apos;s paid off. We match your cash flow.
              Available on all packages — just tell me what you can do per month.
            </p>
          </div>
          <div className="rounded-lg border p-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
            <p className="mb-2 text-sm font-semibold" style={{ color: "#f7f8f8" }}>Custom plan</p>
            <p className="text-xs leading-relaxed" style={{ color: "#8a8f98" }}>
              None of these fit? Let&apos;s talk. I&apos;d rather work something out than lose
              a good client over payment structure.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {["Stripe", "Zelle", "Venmo", "Card", "Bank transfer"].map((method) => (
            <span
              key={method}
              className="rounded-full border px-4 py-1.5 text-xs font-medium"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8a8f98" }}
            >
              {method}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed" style={{ color: "#62666d" }}>
          Every engagement starts with a <A>free strategy call</A> before you commit anything. You don&apos;t
          pay a dollar until we both agree on the plan, the price, and the timeline. No deposits to
          &quot;hold your spot.&quot; No pressure. Just a conversation.
        </p>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 8 — ABOUT (The Human)
   Real photo, real story.
   ═══════════════════════════════════════════════════════════════ */

function About() {
  return (
    <Section id="about">
      <motion.div
        className="flex flex-col gap-10 md:flex-row md:items-start"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <div className="flex-shrink-0">
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <Image
              src="/josh.jpg"
              alt="Josh Potesta"
              fill
              className="object-cover"
              sizes="176px"
              priority={false}
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="mb-1 text-xl font-semibold" style={{ color: "#f7f8f8" }}>Josh Potesta</h3>
          <p className="mb-5 text-sm font-medium" style={{ color: "#8a8f98" }}>
            Founder & Builder &middot; Atlanta, GA &middot; 19
          </p>

          <div className="max-w-xl space-y-4">
            <p className="text-base leading-relaxed" style={{ color: "#8a8f98" }}>
              I&apos;m 19 years old and I&apos;ve spent the last <A>6 years in martial arts</A> — training,
              teaching, watching coaches run their entire business from their phone with notes in one app,
              schedule in another, and payments on Venmo. I lived in that world. I know what it&apos;s like.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#8a8f98" }}>
              I started building tools for coaches because I saw the gap firsthand. Then I realized it wasn&apos;t just coaches.
              It&apos;s barbers, dog trainers, landscapers, personal trainers — <A>small business owners everywhere</A> getting
              left behind while everyone talks about AI and digital transformation.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#8a8f98" }}>
              When I work with someone, I genuinely care about their success. I want to see them grow. I want
              to <A>make them happy</A> — that&apos;s my priority. Not just delivering a project and disappearing.
              I stick around because I&apos;m invested in the people I build for.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#8a8f98" }}>
              That&apos;s what I do now. I build for people who need someone
              <A> in their corner</A>. Not a sales pitch. Not a proposal. A real conversation,
              then real work that actually helps your business grow.
            </p>
          </div>

          <a
            href={CAL_LINK} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block rounded-md border px-8 py-3.5 text-sm font-semibold transition-all duration-200"
            style={{ borderColor: "rgba(255,255,255,0.25)", color: "#f7f8f8" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f8f8"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#f7f8f8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f7f8f8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
          >
            Let&apos;s Talk About Your Business
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 9 — FINAL CTA
   Human. Warm. "Let's build something together."
   ═══════════════════════════════════════════════════════════════ */

function FinalCta() {
  return (
    <Section className="py-32 sm:py-40">
      <motion.div
        className="text-center"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <h2 className="story-statement mx-auto max-w-2xl">
          Let&apos;s build <A>something together</A>.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed" style={{ color: "#8a8f98" }}>
          Book a call and tell me about your business. No pressure, no commitment.
          Just a conversation about what you need and whether I can help.
        </p>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-block rounded-md border px-10 py-4 text-base font-semibold transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "#f7f8f8" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f8f8"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#f7f8f8"; e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f7f8f8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.boxShadow = "none"; }}
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
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
   PAGE
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
          <Hero />
          <Divider />
          <Problem />
          <Divider />
          <Solution />
          <Divider />
          <Proof />
          <Divider />
          <Portfolio />
          <Partnership />
          <Divider />
          <Packages />
          <Divider />
          <About />
          <Divider />
          <FinalCta />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
