"use client";
import { useState } from "react";

/* ── Workflow SVG Diagrams (kept compact, clean) ──── */

function FoundationFlow() {
  const steps = [
    { label: "Discovery", x: 0 },
    { label: "Scope", x: 80 },
    { label: "Build", x: 160 },
    { label: "Photos", x: 240 },
    { label: "Deploy", x: 320 },
  ];
  return (
    <svg viewBox="0 0 390 44" fill="none" className="card-flow-svg">
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="6" width="64" height="32" rx="8" stroke={i === 0 || i === 4 ? "#e05533" : "#ccc"} strokeWidth={i === 0 || i === 4 ? "2" : "1.5"} fill="none" />
          <text x={s.x + 32} y="26" textAnchor="middle" fontSize="9" fill={i === 0 || i === 4 ? "#e05533" : "#555"} fontWeight="600" fontFamily="var(--font-inter),sans-serif">{s.label}</text>
          {i < 4 && <path d={`M${s.x + 64} 22 L${s.x + 80} 22`} stroke="#ddd" strokeWidth="1.5" />}
          {i < 4 && <path d={`M${s.x + 76} 18 L${s.x + 80} 22 L${s.x + 76} 26`} stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}
    </svg>
  );
}

function OperationsFlow() {
  return (
    <svg viewBox="0 0 390 90" fill="none" className="card-flow-svg">
      {/* Inputs */}
      {["Phone Call", "Lead Form", "Chat"].map((label, i) => (
        <g key={label}>
          <rect x="0" y={i * 30} width="80" height="24" rx="6" stroke="#ccc" strokeWidth="1.5" fill="none" />
          <text x="40" y={i * 30 + 16} textAnchor="middle" fontSize="8" fill="#555" fontWeight="600" fontFamily="var(--font-inter),sans-serif">{label}</text>
          <path d={`M80 ${i * 30 + 12} Q120 ${i * 30 + 12} 140 44`} stroke="#ddd" strokeWidth="1" />
        </g>
      ))}
      {/* AI hub */}
      <circle cx="168" cy="44" r="26" stroke="#e05533" strokeWidth="2" fill="none" />
      <text x="168" y="41" textAnchor="middle" fontSize="9" fill="#e05533" fontWeight="800" fontFamily="var(--font-inter),sans-serif">AI</text>
      <text x="168" y="52" textAnchor="middle" fontSize="7" fill="#e05533" fontFamily="var(--font-inter),sans-serif">24/7</text>
      {/* Outputs */}
      {["Books Appt", "Sends Text", "Summary"].map((label, i) => (
        <g key={label}>
          <path d={`M194 44 Q220 44 250 ${i * 30 + 12}`} stroke="#e05533" strokeWidth="1" />
          <rect x="250" y={i * 30} width="80" height="24" rx="6" stroke="#e05533" strokeWidth="1.5" fill="none" />
          <text x="290" y={i * 30 + 16} textAnchor="middle" fontSize="8" fill="#e05533" fontWeight="600" fontFamily="var(--font-inter),sans-serif">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function IntelligenceFlow() {
  return (
    <svg viewBox="0 0 390 80" fill="none" className="card-flow-svg">
      {/* Sources */}
      {["Calls", "CRM", "Revenue", "Traffic"].map((label, i) => (
        <g key={label}>
          <rect x="0" y={i * 20} width="68" height="16" rx="4" stroke="#ccc" strokeWidth="1.2" fill="none" />
          <text x="34" y={i * 20 + 12} textAnchor="middle" fontSize="7.5" fill="#555" fontFamily="var(--font-inter),sans-serif">{label}</text>
          <path d={`M68 ${i * 20 + 8} Q100 ${i * 20 + 8} 120 40`} stroke="#ddd" strokeWidth="0.8" />
        </g>
      ))}
      {/* Hub */}
      <rect x="120" y="22" width="80" height="36" rx="8" stroke="#e05533" strokeWidth="2" fill="none" />
      <text x="160" y="38" textAnchor="middle" fontSize="8" fill="#e05533" fontWeight="800" fontFamily="var(--font-inter),sans-serif">FoundOS</text>
      <text x="160" y="50" textAnchor="middle" fontSize="7" fill="#e05533" fontFamily="var(--font-inter),sans-serif">Data Hub</text>
      {/* Arrow */}
      <path d="M200 40 L220 40" stroke="#e05533" strokeWidth="1.5" />
      <path d="M216 36 L222 40 L216 44" stroke="#e05533" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Outputs */}
      {["Dashboard", "Growth View", "Alerts"].map((label, i) => (
        <g key={label}>
          <rect x="224" y={6 + i * 24} width="80" height="18" rx="4" stroke="#e05533" strokeWidth="1.2" fill="none" />
          <text x="264" y={18 + i * 24} textAnchor="middle" fontSize="7.5" fill="#e05533" fontWeight="600" fontFamily="var(--font-inter),sans-serif">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function FullSystemFlow() {
  const layers = ["Website", "AI Agent", "Automation", "Intelligence"];
  return (
    <svg viewBox="0 0 390 80" fill="none" className="card-flow-svg">
      {/* Stacked layers */}
      {layers.map((label, i) => (
        <g key={label}>
          <rect x="0" y={i * 20} width="90" height="16" rx="4" stroke={i === 0 ? "#e05533" : "#ccc"} strokeWidth={i === 0 ? "2" : "1.2"} fill="none" />
          <text x="45" y={i * 20 + 12} textAnchor="middle" fontSize="8" fill={i === 0 ? "#e05533" : "#555"} fontWeight={i === 0 ? "700" : "500"} fontFamily="var(--font-inter),sans-serif">{label}</text>
        </g>
      ))}
      {/* Bracket */}
      <path d="M94 8 L108 8 L108 72 L94 72" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Arrow */}
      <path d="M108 40 L130 40" stroke="#e05533" strokeWidth="2" strokeLinecap="round" />
      <path d="M126 36 L132 40 L126 44" stroke="#e05533" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* OS Box */}
      <rect x="134" y="16" width="88" height="48" rx="10" stroke="#e05533" strokeWidth="2.5" fill="none" />
      <text x="178" y="38" textAnchor="middle" fontSize="11" fill="#e05533" fontWeight="800" fontFamily="var(--font-inter),sans-serif">Business</text>
      <text x="178" y="52" textAnchor="middle" fontSize="11" fill="#e05533" fontWeight="800" fontFamily="var(--font-inter),sans-serif">OS</text>
      {/* Results arrow */}
      <path d="M222 40 L244 40" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M240 36 L246 40 L240 44" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Results */}
      {["Save Money", "Save Time", "Scale Up"].map((label, i) => (
        <g key={label}>
          <rect x="248" y={8 + i * 24} width="84" height="18" rx="4" stroke="#222" strokeWidth="1.2" fill="none" />
          <text x="290" y={20 + i * 24} textAnchor="middle" fontSize="8" fill="#1a1a1a" fontWeight="600" fontFamily="var(--font-inter),sans-serif">{label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Card Data ── */
const TIERS = [
  {
    number: "01",
    title: "Foundation",
    subtitle: "Website + Photography",
    price: "Starting at $2,000",
    desc: "Your digital front door. Custom-designed, built to convert, live in days. Professional photography included.",
    expandedDesc: "Discovery call, custom design from scratch, professional photography of your space, and a production-grade site deployed to your own domain. No templates. No stock photos. You get a real web presence that works from day one.",
    Workflow: FoundationFlow,
  },
  {
    number: "02",
    title: "Operations",
    subtitle: "AI + Automation",
    price: "From $200/mo",
    desc: "An AI agent that answers your phone, books appointments, and follows up with leads — while you sleep.",
    expandedDesc: "Every call, form, and chat — filtered, qualified, and routed automatically. Your AI agent speaks in your voice, knows your hours, books to your calendar, and follows up instantly. You stop doing admin.",
    Workflow: OperationsFlow,
  },
  {
    number: "03",
    title: "Intelligence",
    subtitle: "Dashboards + Data",
    price: "From $3,500",
    desc: "See your business in real-time. Custom CRM, reporting, and analytics built around how you actually work.",
    expandedDesc: "All your data — calls, leads, revenue, traffic — centralized. A custom dashboard built for your business model. No more guessing what's working. You see the full picture.",
    Workflow: IntelligenceFlow,
  },
  {
    number: "04",
    title: "Full System",
    subtitle: "Complete Business OS",
    price: "From $5,000",
    desc: "Everything — website, AI, automation, and custom software — architected as one connected system.",
    expandedDesc: "Website, AI agent, automation workflows, and intelligence dashboard — all built to talk to each other. The same infrastructure Fortune 500 companies run — at a fraction of the cost.",
    Workflow: FullSystemFlow,
  },
];

/* ── Main Component ── */
export default function TierCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="cards-grid">
      {TIERS.map((tier, index) => {
        const isActive = activeCard === index;

        return (
          <div
            key={tier.number}
            className={`card ${isActive ? "card--active" : ""}`}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
            onClick={() => setActiveCard(isActive ? null : index)}
          >
            {/* Header row */}
            <div className="card__header">
              <span className="card__number">{tier.number}</span>
              <span className="card__price">{tier.price}</span>
            </div>

            {/* Title block */}
            <h3 className="card__title">{tier.title}</h3>
            <p className="card__subtitle">{tier.subtitle}</p>

            {/* Description */}
            <p className="card__desc">{tier.desc}</p>

            {/* Expanded: deeper description + workflow */}
            <div className="card__reveal">
              <div className="card__divider" />
              <p className="card__reveal-text">{tier.expandedDesc}</p>
              <div className="card__flow">
                <tier.Workflow />
              </div>
            </div>

            {/* Expand hint */}
            <p className="card__hint">
              {isActive ? "" : "See the full workflow \u2192"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
