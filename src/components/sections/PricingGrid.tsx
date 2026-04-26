"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { CAL_LINK } from "@/lib/constants";

const packages = [
  {
    name: "Launch",
    price: "$1,500",
    description: "Get online fast. A real website that represents your business, not a template with your name on it.",
    includes: ["Custom 3-5 page website", "Mobile responsive design", "Contact form + Google Maps", "SEO + Google Business Profile setup", "Analytics + conversion tracking", "1 month free maintenance"],
    timeline: "2-3 weeks",
    cta: "Most Popular",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$3,500",
    description: "Website + lead generation + automations. Built to bring in new clients on autopilot.",
    includes: ["Everything in Launch", "Lead capture landing page", "Automated email follow-ups", "Google review automation", "Ad-ready infrastructure (pixels + tracking)", "Missed client follow-ups", "3 months free maintenance"],
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

function PricingCard({ pkg, index }: { pkg: typeof packages[number]; index: number }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      className="glow-card relative flex flex-col p-10"
      style={{
        borderColor: pkg.highlight ? "rgba(255,255,255,0.2)" : undefined,
        background: pkg.highlight ? "rgba(255,255,255,0.04)" : undefined,
      }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <span className="mb-5 inline-block self-start rounded-full px-3 py-1 text-xs font-medium" style={{
          background: pkg.highlight ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
          color: pkg.highlight ? "var(--color-foreground)" : "var(--color-muted)",
          border: `1px solid ${pkg.highlight ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
        }}>
          {pkg.cta}
        </span>
        <h3 className="mb-1 text-xl font-semibold" style={{ color: "var(--color-foreground)" }}>{pkg.name}</h3>
        <span className="text-3xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>{pkg.price}</span>
        <span className="text-xs mb-4 block" style={{ color: "var(--color-dim)" }}>{pkg.timeline} delivery</span>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{pkg.description}</p>
        <ul className="mb-8 flex-1 space-y-2.5">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-silver)" }}>
              <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: pkg.highlight ? "var(--color-foreground)" : "var(--color-dim)" }} />
              {item}
            </li>
          ))}
        </ul>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          className="block rounded-md py-3 text-center text-sm font-semibold transition-all duration-200"
          style={{
            background: pkg.highlight ? "var(--color-foreground)" : "transparent",
            color: pkg.highlight ? "#0a0a0a" : "var(--color-silver)",
            border: pkg.highlight ? "1px solid var(--color-foreground)" : "1px solid rgba(255,255,255,0.15)",
          }}
          onMouseEnter={(e) => {
            if (pkg.highlight) e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.15)";
            else e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            if (pkg.highlight) e.currentTarget.style.boxShadow = "none";
            else e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          Book a Call
        </a>
      </div>
    </motion.div>
  );
}

export default function PricingGrid() {
  return (
    <section id="pricing" className="section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Pricing</p>
          <h2 className="section-headline">
            Transparent pricing. <span className="accent">No surprises</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-lg story-body text-center">
            Every package starts with a free strategy call. You don&apos;t pay anything until we both agree on what makes sense.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>

        <motion.p
          className="mt-12 text-sm text-center leading-relaxed max-w-2xl mx-auto"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="accent">Flexible payment</span> — pay in full, split 50/50, or spread it monthly.
          We accept Stripe, Zelle, Venmo, card, and bank transfer.
        </motion.p>
      </div>
    </section>
  );
}
