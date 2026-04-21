"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
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
   NAV — with mobile hamburger
   ═══════════════════════════════════════════════════════════════ */

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
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
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hidden text-sm sm:block" style={{ color: "#8a8f98" }}>
              {link.label}
            </a>
          ))}
          <a
            href={CAL_LINK} target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-block rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200"
            style={{ borderColor: "rgba(255,255,255,0.25)", color: "#f7f8f8", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(255,255,255,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Book a Call
          </a>
          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-white"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 sm:hidden"
            style={{ background: "rgba(10,10,10,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-2xl font-semibold"
                style={{ color: "#f7f8f8" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={CAL_LINK} target="_blank" rel="noopener noreferrer"
              className="mt-4 rounded-md border px-8 py-3.5 text-base font-semibold"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#f7f8f8" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMenuOpen(false)}
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
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

      {/* Cursor glow */}
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
        I build custom software for businesses that <A>agencies ignore</A>.
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
          href="#work"
          className="rounded-md border px-8 py-3.5 text-sm font-medium transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8a8f98" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          See What I&apos;ve Built
        </a>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROOF BAR — quick trust before they scroll
   ═══════════════════════════════════════════════════════════════ */

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.span
      className="text-3xl font-bold block tabular-nums" style={{ color: "#f7f8f8" }}
      onViewportEnter={() => {
        if (hasAnimated) return;
        setHasAnimated(true);
        const duration = 1200;
        const steps = 30;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) { setCount(value); clearInterval(timer); }
          else { setCount(Math.floor(current)); }
        }, duration / steps);
      }}
      viewport={{ once: true }}
    >
      {count}{suffix}
    </motion.span>
  );
}

function ProofBar() {
  const stats = [
    { value: 2, suffix: "", label: "Products shipped" },
    { value: 150, suffix: "+", label: "Endpoints built" },
    { value: 3, suffix: " wks", label: "Avg delivery", prefix: "<" },
    { value: 100, suffix: "%", label: "Completion rate" },
  ];

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="text-center"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
          >
            <span className="text-3xl font-bold block tabular-nums" style={{ color: "#f7f8f8" }}>
              {"prefix" in s && s.prefix}{<AnimatedNumber value={s.value} suffix={s.suffix} />}
            </span>
            <span className="text-xs mt-1 block" style={{ color: "#62666d" }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES — stacked rows, scannable
   ═══════════════════════════════════════════════════════════════ */

function ServiceIcon({ type }: { type: string }) {
  const props = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "web": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18" /><circle cx="6.5" cy="6" r=".5" fill="currentColor" /><circle cx="9" cy="6" r=".5" fill="currentColor" /></svg>;
    case "app": return <svg {...props}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4" /></svg>;
    case "lead": return <svg {...props}><path d="M3 20l4-4m0 0l4 4m-4-4V4" /><path d="M14 4l3 3 3-3" /><path d="M17 7v6" /><circle cx="17" cy="17" r="3" /></svg>;
    case "ai": return <svg {...props}><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /><circle cx="12" cy="12" r="4" /><path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>;
    default: return null;
  }
}

function Services() {
  const services = [
    {
      icon: "web",
      title: "Custom Websites",
      description: "A site designed around your brand, not dragged from a template library.",
      features: ["Mobile-first design", "SEO built in", "Booking integration", "Contact forms"],
    },
    {
      icon: "app",
      title: "Branded Mobile Apps",
      description: "Your own app with your logo and colors — clients book, pay, and connect through it.",
      features: ["iOS & Android", "Client portal", "Push notifications", "Payment processing"],
    },
    {
      icon: "lead",
      title: "Lead Generation",
      description: "Landing pages and automated sequences that turn visitors into clients while you sleep.",
      features: ["High-converting pages", "Email capture", "Automated follow-ups", "Analytics dashboard"],
    },
    {
      icon: "ai",
      title: "AI Agents & Automations",
      description: "The stuff that eats your time — review requests, reminders, follow-ups — handled automatically.",
      features: ["Smart chatbots", "Review collection", "Payment reminders", "Client follow-ups"],
    },
  ];

  return (
    <Section id="services">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>
          Services
        </p>
        <h2 className="story-statement">
          What I <A>build</A>.
        </h2>
      </motion.div>

      <div>
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="group py-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between transition-colors duration-300"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
          >
            <div className="flex gap-4 sm:flex-1">
              <div className="flex-shrink-0 mt-0.5 transition-colors duration-300" style={{ color: "#62666d" }}
                onMouseEnter={() => {}}
              >
                <div className="group-hover:text-white transition-colors duration-300">
                  <ServiceIcon type={s.icon} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: "#f7f8f8" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed max-w-md" style={{ color: "#8a8f98" }}>{s.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 sm:w-64 sm:flex-shrink-0 sm:justify-end pl-11 sm:pl-0">
              {s.features.map((f) => (
                <span key={f} className="text-sm" style={{ color: "#62666d" }}>{f}</span>
              ))}
            </div>
          </motion.div>
        ))}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WORK — Products + Client Portfolio combined
   ═══════════════════════════════════════════════════════════════ */

function Work() {
  return (
    <Section id="work">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>
          Work
        </p>
        <h2 className="story-statement">
          Real things I&apos;ve <A>built</A>.
        </h2>
        <p className="mt-4 max-w-2xl story-body">
          I don&apos;t show mockups. Everything here is <A>shipped and running</A>.
        </p>
      </motion.div>

      {/* ─── Sensei App ─────────────────────────────────────── */}
      <motion.div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
      >
        <div className="p-8 sm:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium mb-4"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#8a8f98" }}>
                SaaS Product
              </span>
              <h3 className="text-2xl font-semibold mb-1" style={{ color: "#f7f8f8" }}>
                Sensei App
              </h3>
              <p className="text-sm font-medium mb-5" style={{ color: "#62666d" }}>
                Full SaaS platform for independent coaches
              </p>
              <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "#8a8f98" }}>
                Solo martial arts and fitness coaches were running their entire business across 5 different apps.
                Notes here, schedule there, payments on Venmo, messages on Instagram. I built <A>one system</A> that
                replaces all of it — their own branded portal with clients, scheduling, payments, and messaging
                in one place.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Branded coach portal — their name, their identity",
                  "Client tracking with progress, notes, and session history",
                  "Built-in scheduling and attendance",
                  "Stripe payment processing and revenue tracking",
                  "Direct coach-to-client messaging",
                  "Admin dashboard for platform management",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#d0d6e0" }}>
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#f7f8f8" }} />
                    {item}
                  </li>
                ))}
              </ul>
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
                    <span className="text-3xl font-bold block" style={{ color: "#f7f8f8" }}>{s.value}</span>
                    <span className="text-xs" style={{ color: "#62666d" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-px sm:grid-cols-2" style={{ background: "rgba(255,255,255,0.05)" }}>
          {[
            { src: "/portfolio/login-final.png", label: "Branded Login Experience" },
            { src: "/portfolio/coach-schedule.png", label: "Coach Schedule & Calendar" },
            { src: "/portfolio/coach-clients.png", label: "Client Management Dashboard" },
            { src: "/portfolio/coach-payments.png", label: "Payment & Revenue Tracking" },
          ].map((p) => (
            <div key={p.label} className="group relative overflow-hidden" style={{ background: "#0a0a0a" }}>
              <div className="relative aspect-video overflow-hidden">
                <img src={p.src} alt={p.label} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)" }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-medium" style={{ color: "#f7f8f8" }}>{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "#d0d6e0" }}>
              Are you a coach? Sensei App is available now — <A>$99/month</A>.
            </p>
            <p className="text-xs mt-1" style={{ color: "#62666d" }}>
              Your own branded platform. Set up in a week.
            </p>
          </div>
          <a href="mailto:hello@foundos.ai"
            className="rounded-md border px-5 py-2.5 text-sm font-medium transition-all duration-200 flex-shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#f7f8f8" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          >
            Email me
          </a>
        </div>
      </motion.div>

      {/* Transition text */}
      <motion.p
        className="my-10 text-center text-sm"
        style={{ color: "#62666d" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
      >
        And here&apos;s what I&apos;ve built for clients.
      </motion.p>

      {/* ─── FRAMELOCK ──────────────────────────────────────── */}
      <motion.div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
      >
        <div className="p-8 sm:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium mb-4"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#8a8f98" }}>
                Client Project
              </span>
              <h3 className="text-2xl font-semibold mb-1" style={{ color: "#f7f8f8" }}>
                FRAMELOCK
              </h3>
              <p className="text-sm font-medium mb-5" style={{ color: "#62666d" }}>
                Photography portfolio for a car photographer in Atlanta
              </p>
              <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "#8a8f98" }}>
                Andy shoots cars and sports around Atlanta — meets, exotics, night games. He needed a site that
                matched the energy of his work. I built him a <A>dark, cinematic portfolio</A> with a film-inspired
                design, masonry gallery with category filters, and pricing tiers that let clients book on the spot.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Dark cinematic theme with amber accent",
                  "Film strip hero carousel with 33 real photos",
                  "Category-filtered masonry gallery",
                  "3-tier pricing with booking integration",
                  "Fully responsive — optimized for every screen",
                  "Smooth Framer Motion page transitions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#d0d6e0" }}>
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#f7f8f8" }} />
                    {item}
                  </li>
                ))}
              </ul>
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
                    <span className="text-3xl font-bold block" style={{ color: "#f7f8f8" }}>{s.value}</span>
                    <span className="text-xs" style={{ color: "#62666d" }}>{s.label}</span>
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
                <p className="text-sm font-medium" style={{ color: "#f7f8f8" }}>{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "#d0d6e0" }}>
              Built for Andy — a car photographer in Atlanta.
            </p>
            <p className="text-xs mt-1" style={{ color: "#62666d" }}>
              Next.js 16 &middot; Tailwind v4 &middot; Framer Motion &middot; Vercel
            </p>
          </div>
          <a href="https://shutter-city.vercel.app" target="_blank" rel="noopener noreferrer"
            className="rounded-md border px-5 py-2.5 text-sm font-medium transition-all duration-200 flex-shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#f7f8f8" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          >
            See it live &rarr;
          </a>
        </div>
      </motion.div>

      {/* CTA under work */}
      <motion.div
        className="mt-10 text-center"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
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
   PROCESS — How It Works (extracted, promoted)
   ═══════════════════════════════════════════════════════════════ */

function Process() {
  const steps = [
    {
      week: "Before you pay anything",
      title: "Free strategy call",
      body: "We hop on a call. You tell me about your business, your clients, what\u2019s working and what\u2019s not. I\u2019ll tell you honestly what I think you need \u2014 and if we\u2019re a good fit. No pressure, no sales pitch.",
    },
    {
      week: "Week 1",
      title: "Strategy + design",
      body: "I map out the structure, create mockups, and get your feedback. Nothing gets built until you\u2019re happy with the direction.",
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
      body: "I don\u2019t disappear. Every package includes free maintenance. If something breaks or you want changes, you text me directly.",
    },
  ];

  return (
    <Section id="process">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>
          Process
        </p>
        <h2 className="story-statement">
          How it <A>actually works</A>.
        </h2>
        <p className="mt-4 max-w-2xl story-body">
          From first call to launch day — here&apos;s what the process looks like.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
      >
        <div className="space-y-10">
          {steps.map((step, idx) => (
            <div key={step.week} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="glow-dot h-3 w-3 flex-shrink-0 rounded-full" style={{ background: "#f7f8f8" }} />
                {idx < steps.length - 1 && <div className="mt-1 w-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />}
              </div>
              <div className="pb-2">
                <p className="text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "#62666d" }}>{step.week}</p>
                <p className="mt-1 text-base font-semibold" style={{ color: "#f7f8f8" }}>{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed max-w-lg" style={{ color: "#8a8f98" }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-center" style={{ color: "#62666d" }}>
          Every project starts with a free call. <A>You don&apos;t pay until we both agree on the plan.</A>
        </p>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING — simplified, clean
   ═══════════════════════════════════════════════════════════════ */

function Pricing() {
  const packages = [
    {
      name: "Launch",
      price: "$1,500",
      description: "Get online fast. A real website that represents your business, not a template with your name on it.",
      includes: ["Custom 3-5 page website", "Mobile responsive design", "Contact form + Google Maps", "Basic SEO setup", "1 month free maintenance"],
      timeline: "2-3 weeks",
      cta: "Most Popular",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$3,500",
      description: "Website + lead generation + automations. Built to bring in new clients on autopilot.",
      includes: ["Everything in Launch", "Lead capture landing page", "Automated email follow-ups", "Google review automation", "Missed client follow-ups", "3 months free maintenance"],
      timeline: "3-5 weeks",
      cta: "Best Value",
      highlight: true,
    },
    {
      name: "Full Build",
      price: "$8,000+",
      description: "The complete digital system. Website, app, automations, ongoing support.",
      includes: ["Everything in Growth", "Branded iOS & Android app", "Client booking + payments", "Push notifications", "AI chatbot for your site", "6 months free maintenance", "Priority support"],
      timeline: "6-10 weeks",
      cta: "For Serious Operators",
      highlight: false,
    },
  ];

  return (
    <Section id="pricing">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>Pricing</p>
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
            <span className="text-3xl font-bold mb-1" style={{ color: "#f7f8f8" }}>{pkg.price}</span>
            <span className="text-xs mb-4 block" style={{ color: "#62666d" }}>{pkg.timeline} delivery</span>
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

      {/* Payment flexibility — simplified */}
      <motion.p
        className="mt-10 text-sm text-center leading-relaxed max-w-2xl mx-auto"
        style={{ color: "#8a8f98" }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
      >
        <A>Flexible payment</A> — pay in full, split 50/50, or spread it monthly.
        We accept Stripe, Zelle, Venmo, card, and bank transfer.
        I&apos;d rather work something out than lose a good client over payment structure.
      </motion.p>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */

function About() {
  return (
    <Section id="about">
      <motion.div
        className="flex flex-col gap-10 md:flex-row md:items-start"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
      >
        <div className="flex-shrink-0">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <Image
              src="/josh.jpg"
              alt="Josh Potesta"
              fill
              className="object-cover"
              sizes="192px"
              priority={false}
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: "#62666d" }}>
            Josh Potesta &middot; Atlanta &middot; 19
          </p>
          <h2 className="story-statement mb-5">
            I don&apos;t disappear <A>after launch</A>.
          </h2>

          <div className="max-w-xl space-y-4">
            <p className="text-base leading-relaxed" style={{ color: "#8a8f98" }}>
              I&apos;ve spent the last <A>6 years in martial arts</A> — training,
              teaching, watching coaches run their entire business from their phone with notes in one app,
              schedule in another, and payments on Venmo. I lived in that world. I know what it&apos;s like.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#8a8f98" }}>
              I started building tools for coaches because I saw the gap firsthand. Then I realized it wasn&apos;t just coaches.
              It&apos;s barbers, dog trainers, landscapers, personal trainers — <A>small business owners everywhere</A> getting
              left behind while everyone talks about AI and digital transformation.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#8a8f98" }}>
              I&apos;m not a freelancer who disappears. I&apos;m not an agency that sends you a ticket number.
              When I work with someone, I genuinely care about their success. You text me. I respond.
              <A> No support tickets. No gatekeepers.</A>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
            {[
              { label: "Your brand", detail: "Everything custom to your identity" },
              { label: "Your pace", detail: "No pressure, no corporate timelines" },
              { label: "Direct access", detail: "You text me. I respond." },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm font-semibold" style={{ color: "#f7f8f8" }}>{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "#62666d" }}>{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={CAL_LINK} target="_blank" rel="noopener noreferrer"
              className="rounded-md border px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "#f7f8f8" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f8f8"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#f7f8f8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f7f8f8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
            >
              Book a Call
            </a>
            <a
              href="mailto:hello@foundos.ai"
              className="rounded-md border px-6 py-3 text-sm font-medium transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8a8f98" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            >
              hello@foundos.ai
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA — solid white button, the only one on the page
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
          style={{ background: "#f7f8f8", color: "#0a0a0a", borderColor: "#f7f8f8" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          Book Your Free Strategy Call
        </a>
        <p className="mt-4 text-xs" style={{ color: "#62666d" }}>
          Free 30-minute call. No commitment.
        </p>
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
   PAGE — the story
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
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
        </div>

        <Nav />
        <main className="relative z-10">
          <Hero />
          <ProofBar />
          <Divider />
          <Services />
          <Divider />
          <Work />
          <Divider />
          <Process />
          <Divider />
          <Pricing />
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
