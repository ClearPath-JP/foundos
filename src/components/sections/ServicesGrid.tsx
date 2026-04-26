"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

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
    description: "Your own app with your logo and colors \u2014 clients book, pay, and connect through it.",
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
    description: "The stuff that eats your time \u2014 review requests, reminders, follow-ups \u2014 handled automatically.",
    features: ["Smart chatbots", "Review collection", "Payment reminders", "Client follow-ups"],
  },
];

function ServiceIcon({ type }: { type: string }) {
  const p = {
    width: 24, height: 24, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.5,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "web": return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18" /><circle cx="6.5" cy="6" r=".5" fill="currentColor" /><circle cx="9" cy="6" r=".5" fill="currentColor" /></svg>;
    case "app": return <svg {...p}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4" /></svg>;
    case "lead": return <svg {...p}><path d="M3 4h18l-6 8v6l-6 2V12z" /></svg>;
    case "ai": return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /><path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>;
    default: return null;
  }
}

function GlowCard({ children, index }: { children: React.ReactNode; index: number }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      className="glow-card p-8 sm:p-10"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="section-spacing px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">What I build</p>
          <h2 className="section-headline">
            Everything your business needs.{" "}
            <span className="accent">One system</span>.
          </h2>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <GlowCard key={s.title} index={i}>
              <div
                className="mb-4 transition-colors duration-300"
                style={{ color: "var(--color-dim)" }}
              >
                <ServiceIcon type={s.icon} />
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: "var(--color-foreground)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6 max-w-sm"
                style={{ color: "var(--color-muted)" }}
              >
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border px-3 py-1 text-xs"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "var(--color-dim)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
