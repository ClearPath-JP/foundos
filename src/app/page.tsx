"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedIntro from "@/components/AnimatedIntro";

const CAL_LINK = "https://cal.com/foundos.ai/strategy-call";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0, 0, 0.2, 1] as const },
  }),
};

// ─── Cube Logo (inline, small) ─────────────────────────────────
function CubeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="200 180 680 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M540 240 L780 380 L540 520 L300 380 Z" fill="#fff" opacity="0.95" />
      <path d="M300 380 L540 520 L540 760 L300 620 Z" fill="#fff" opacity="0.55" />
      <path d="M780 380 L540 520 L540 760 L780 620 Z" fill="#fff" opacity="0.3" />
    </svg>
  );
}

// ─── Section wrapper ────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-24 sm:py-32 ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

// ─── Nav ────────────────────────────────────────────────────────
function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 sm:px-10"
      style={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <a href="#" className="flex items-center gap-2">
        <CubeLogo size={24} />
        <span className="text-sm font-semibold tracking-[0.15em] text-foreground">
          FOUNDOS
        </span>
      </a>

      <div className="flex items-center gap-6">
        <a
          href="#products"
          className="hidden text-sm sm:block"
          style={{ color: "#8a8f98" }}
        >
          Products
        </a>
        <a
          href="#services"
          className="hidden text-sm sm:block"
          style={{ color: "#8a8f98" }}
        >
          Services
        </a>
        <a
          href="#packages"
          className="hidden text-sm sm:block"
          style={{ color: "#8a8f98" }}
        >
          Packages
        </a>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.85)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#ffffff")
          }
        >
          Book a Call
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <Section className="pt-40 sm:pt-52 pb-20 text-center">
      <motion.p
        className="mb-6 text-sm font-medium tracking-[0.3em] uppercase"
        style={{ color: "#62666d" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        Software for operators
      </motion.p>

      <motion.h1
        className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        style={{ color: "#f7f8f8", letterSpacing: "-0.03em" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        We build the system that runs your business.
      </motion.h1>

      <motion.p
        className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
        style={{ color: "#8a8f98" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        Custom software, apps, and AI automations — designed for local businesses
        that are ready to scale.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      >
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md px-8 py-3.5 text-sm font-semibold transition-colors"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.85)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#ffffff")
          }
        >
          Book a Free Strategy Call
        </a>
        <a
          href="#products"
          className="rounded-md border px-8 py-3.5 text-sm font-medium transition-colors"
          style={{
            borderColor: "rgba(255,255,255,0.15)",
            color: "#d0d6e0",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
          }
        >
          See What We Build
        </a>
      </motion.div>
    </Section>
  );
}

// ─── Products ───────────────────────────────────────────────────
function Products() {
  const products = [
    {
      name: "Sensei App",
      tag: "Available Now",
      tagColor: "#22c55e",
      price: "$99/mo",
      priceNote: "Founding member price",
      description:
        "The operating system for martial arts coaches. Video review, client management, billing, and AI-powered feedback — all in one place.",
      features: [
        "Video upload + AI analysis",
        "Client portal & scheduling",
        "Built-in billing (Stripe)",
        "White-label ready",
      ],
    },
    {
      name: "More Products",
      tag: "Coming Soon",
      tagColor: "#62666d",
      price: null,
      priceNote: null,
      description:
        "Industry-specific operating systems for HVAC, salons, restaurants, and more. Each one built from the ground up for how your business actually works.",
      features: [
        "Job dispatch & routing",
        "Customer lifecycle tracking",
        "Automated follow-ups",
        "Revenue dashboards",
      ],
    },
  ];

  return (
    <Section id="products">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="mb-12"
      >
        <p
          className="mb-3 text-sm font-medium tracking-[0.3em] uppercase"
          style={{ color: "#62666d" }}
        >
          Products
        </p>
        <h2
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "#f7f8f8", letterSpacing: "-0.02em" }}
        >
          Software that works like you do.
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            className="group rounded-xl border p-8 transition-colors"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i + 1}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
            }
          >
            <div className="mb-4 flex items-center gap-3">
              <h3
                className="text-xl font-semibold"
                style={{ color: "#f7f8f8" }}
              >
                {p.name}
              </h3>
              <span
                className="rounded-full px-3 py-0.5 text-xs font-medium"
                style={{
                  background: `${p.tagColor}15`,
                  color: p.tagColor,
                  border: `1px solid ${p.tagColor}30`,
                }}
              >
                {p.tag}
              </span>
            </div>

            {p.price && (
              <div className="mb-4">
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#f7f8f8" }}
                >
                  {p.price}
                </span>
                {p.priceNote && (
                  <span className="ml-2 text-sm" style={{ color: "#62666d" }}>
                    {p.priceNote}
                  </span>
                )}
              </div>
            )}

            <p className="mb-6 leading-relaxed" style={{ color: "#8a8f98" }}>
              {p.description}
            </p>

            <ul className="space-y-2">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#d0d6e0" }}
                >
                  <span style={{ color: "#62666d" }}>&#x2014;</span>
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

// ─── Services ───────────────────────────────────────────────────
function Services() {
  const services = [
    {
      title: "Custom Websites",
      price: "From $1,500",
      description:
        "Fast, modern sites that actually convert. Mobile-first, SEO-ready, built to make your business look as good online as it is in person.",
      details: "2-3 weeks to launch",
      features: [
        "3-5 page responsive site",
        "Contact forms & booking integration",
        "Google Maps & reviews",
        "SEO optimized from day one",
        "Hosting & maintenance included",
      ],
    },
    {
      title: "Branded Mobile Apps",
      price: "From $5,000",
      description:
        "Your own app on the App Store. Client booking, class schedules, push notifications, payments -- all branded to your business.",
      details: "4-8 weeks to launch",
      features: [
        "iOS & Android",
        "Client portal & booking",
        "Push notifications",
        "Payment processing",
        "Your brand, your colors",
      ],
    },
    {
      title: "Lead Generation",
      price: "From $500",
      description:
        "Landing pages, email capture, and automated follow-up sequences that turn visitors into paying clients on autopilot.",
      details: "1-2 weeks to launch",
      features: [
        "High-converting landing page",
        "Email capture & lead magnets",
        "Automated follow-up emails",
        "Analytics & tracking",
        "A/B testing ready",
      ],
    },
    {
      title: "AI Agents & Automations",
      price: "From $1,000",
      description:
        "Stop doing repetitive work. AI chatbots, automated booking, review requests, payment reminders, client follow-ups -- systems that run while you sleep.",
      details: "Ongoing partnership",
      features: [
        "Website chatbot for booking",
        "Automated review requests",
        "Payment & invoice reminders",
        "Client re-engagement sequences",
        "Custom workflow automations",
      ],
    },
  ];

  return (
    <Section id="services">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="mb-6"
      >
        <p
          className="mb-3 text-sm font-medium tracking-[0.3em] uppercase"
          style={{ color: "#62666d" }}
        >
          Services
        </p>
        <h2
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "#f7f8f8", letterSpacing: "-0.02em" }}
        >
          Everything you need to go digital.
        </h2>
        <p
          className="mt-4 max-w-2xl text-base leading-relaxed"
          style={{ color: "#8a8f98" }}
        >
          Most small businesses know they need a better online presence but don&apos;t
          know where to start. We handle everything -- from your first website to
          AI-powered automations that bring in clients while you focus on what you
          do best.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 mt-12">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="rounded-xl border p-8 transition-colors"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i + 1}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
            }
          >
            <div className="mb-4 flex items-center justify-between">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#f7f8f8" }}
              >
                {s.title}
              </h3>
              <span
                className="text-sm font-medium"
                style={{ color: "#d0d6e0" }}
              >
                {s.price}
              </span>
            </div>
            <p
              className="mb-5 text-sm leading-relaxed"
              style={{ color: "#8a8f98" }}
            >
              {s.description}
            </p>
            <ul className="mb-5 space-y-2">
              {s.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#d0d6e0" }}
                >
                  <span style={{ color: "#62666d" }}>&#x2014;</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-xs" style={{ color: "#62666d" }}>
              {s.details}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-12 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={5}
      >
        <p className="mb-4 text-sm" style={{ color: "#8a8f98" }}>
          Not sure what you need? Let&apos;s figure it out together.
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md border px-8 py-3.5 text-sm font-medium transition-colors"
          style={{
            borderColor: "rgba(255,255,255,0.15)",
            color: "#d0d6e0",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
          }
        >
          Book a Free Strategy Call
        </a>
      </motion.div>
    </Section>
  );
}

// ─── Founder ────────────────────────────────────────────────────
function Founder() {
  return (
    <Section id="founder">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="mb-8"
      >
        <p
          className="mb-3 text-sm font-medium tracking-[0.3em] uppercase"
          style={{ color: "#62666d" }}
        >
          About
        </p>
        <h2
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "#f7f8f8", letterSpacing: "-0.02em" }}
        >
          Built by someone who gets it.
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-col gap-10 md:flex-row md:items-start"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        {/* Photo placeholder */}
        <div
          className="flex h-36 w-36 flex-shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="text-4xl font-bold" style={{ color: "#62666d" }}>
            JP
          </span>
        </div>

        <div className="flex-1">
          <h3
            className="mb-1 text-xl font-semibold"
            style={{ color: "#f7f8f8" }}
          >
            JP Potesta
          </h3>
          <p
            className="mb-5 text-sm font-medium"
            style={{ color: "#62666d" }}
          >
            Founder &amp; Builder, FoundOS &middot; Atlanta, GA
          </p>

          <div className="space-y-4 max-w-xl">
            <p
              className="text-base leading-relaxed"
              style={{ color: "#8a8f98" }}
            >
              I&apos;m 19, based in Atlanta, and I build software for people who run
              real businesses. I come from martial arts and coaching -- I&apos;ve seen
              firsthand how many small business owners are stuck juggling five
              different apps, losing clients in their DMs, and spending more time
              on admin than on the work they actually love.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#8a8f98" }}
            >
              I started FoundOS because I believe every local business deserves
              the same quality software that big companies have -- without the
              six-figure price tag or the six-month timeline. I work directly
              with you, understand how your business actually operates, and build
              exactly what you need. No templates. No cookie-cutter solutions.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#8a8f98" }}
            >
              Whether it&apos;s a website that brings in new clients, an app your
              customers actually use, or automations that save you hours every
              week -- I build it, I ship it, and I make sure it works.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Full-Stack Development",
              "AI & Automations",
              "Mobile Apps",
              "Lead Generation",
              "Martial Arts",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#8a8f98",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-md px-8 py-3.5 text-sm font-semibold transition-colors"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.85)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#ffffff")
            }
          >
            Let&apos;s Talk About Your Business
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

// ─── Packages ──────────────────────────────────────────────────
function Packages() {
  const packages = [
    {
      name: "Launch",
      price: "$1,500",
      description: "Get online fast. Perfect for businesses with no web presence yet.",
      includes: [
        "Custom 3-5 page website",
        "Mobile responsive",
        "Contact form + Google Maps",
        "Basic SEO setup",
        "1 month free maintenance",
      ],
      cta: "Most Popular",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$3,500",
      priceNote: "Save $500",
      description: "Website + lead generation + automations. Built to bring in new clients on autopilot.",
      includes: [
        "Everything in Launch",
        "Lead capture landing page",
        "Automated email follow-ups",
        "Google review request automation",
        "Missed client follow-up system",
        "3 months free maintenance",
      ],
      cta: "Best Value",
      highlight: true,
    },
    {
      name: "Full Build",
      price: "$8,000+",
      priceNote: "Save $1,500+",
      description: "The complete digital system. Website, mobile app, automations, and ongoing support.",
      includes: [
        "Everything in Growth",
        "Branded iOS & Android app",
        "Client booking + payments",
        "Push notifications",
        "AI chatbot for your site",
        "6 months free maintenance",
        "Priority support",
      ],
      cta: "For Serious Operators",
      highlight: false,
    },
  ];

  return (
    <Section id="packages">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="mb-12"
      >
        <p
          className="mb-3 text-sm font-medium tracking-[0.3em] uppercase"
          style={{ color: "#62666d" }}
        >
          Packages
        </p>
        <h2
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "#f7f8f8", letterSpacing: "-0.02em" }}
        >
          Pick a package. Save money. Ship faster.
        </h2>
        <p
          className="mt-4 max-w-2xl text-base leading-relaxed"
          style={{ color: "#8a8f98" }}
        >
          Bundle services together and get more for less. Every package includes
          a strategy call, custom design, and hands-on support from start to finish.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            className="relative flex flex-col rounded-xl border p-8 transition-colors"
            style={{
              borderColor: pkg.highlight
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.08)",
              background: pkg.highlight
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.02)",
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i + 1}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = pkg.highlight
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.08)")
            }
          >
            {/* Badge */}
            <span
              className="mb-5 inline-block self-start rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: pkg.highlight
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.05)",
                color: pkg.highlight ? "#f7f8f8" : "#8a8f98",
                border: `1px solid ${pkg.highlight ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {pkg.cta}
            </span>

            <h3
              className="mb-1 text-xl font-semibold"
              style={{ color: "#f7f8f8" }}
            >
              {pkg.name}
            </h3>

            <div className="mb-4 flex items-baseline gap-2">
              <span
                className="text-3xl font-bold"
                style={{ color: "#f7f8f8" }}
              >
                {pkg.price}
              </span>
              {pkg.priceNote && (
                <span className="text-sm font-medium" style={{ color: "#22c55e" }}>
                  {pkg.priceNote}
                </span>
              )}
            </div>

            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: "#8a8f98" }}
            >
              {pkg.description}
            </p>

            <ul className="mb-8 flex-1 space-y-2.5">
              {pkg.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "#d0d6e0" }}
                >
                  <span
                    className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: pkg.highlight ? "#f7f8f8" : "#62666d" }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md py-3 text-center text-sm font-semibold transition-colors"
              style={{
                background: pkg.highlight ? "#ffffff" : "transparent",
                color: pkg.highlight ? "#0a0a0a" : "#d0d6e0",
                border: pkg.highlight ? "none" : "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={(e) => {
                if (pkg.highlight) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                } else {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (pkg.highlight) {
                  e.currentTarget.style.background = "#ffffff";
                } else {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }
              }}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-8 text-center text-sm"
        style={{ color: "#62666d" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
      >
        All packages include a free strategy call. Payment plans available.
      </motion.p>
    </Section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="border-t px-6 py-12"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <CubeLogo size={20} />
          <span
            className="text-sm font-semibold tracking-[0.15em]"
            style={{ color: "#f7f8f8" }}
          >
            FOUNDOS
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: "#62666d" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#62666d")}
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: "#62666d" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#62666d")}
          >
            TikTok
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: "#62666d" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#62666d")}
          >
            LinkedIn
          </a>
        </div>

        <a
          href="mailto:hello@foundos.ai"
          className="text-xs transition-colors"
          style={{ color: "#62666d" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#62666d")}
        >
          hello@foundos.ai
        </a>
      </div>
    </footer>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

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

          {/* Divider */}
          <div className="mx-auto max-w-5xl px-6">
            <div
              className="h-px w-full"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>

          <Products />

          <div className="mx-auto max-w-5xl px-6">
            <div
              className="h-px w-full"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>

          <Services />

          <div className="mx-auto max-w-5xl px-6">
            <div
              className="h-px w-full"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>

          <Packages />

          <div className="mx-auto max-w-5xl px-6">
            <div
              className="h-px w-full"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>

          <Founder />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
