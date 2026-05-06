"use client";
import { useState } from "react";

/* ── SVG Workflow Diagrams ── */

function FoundationWorkflow() {
  return (
    <svg viewBox="0 0 420 90" fill="none" className="tier-workflow-svg" aria-hidden="true">
      {[
        { label: "Discovery", x: 4, color: "#e05533", delay: 0.1 },
        { label: "Scope", x: 92, color: "#222", delay: 0.5 },
        { label: "Build", x: 180, color: "#222", delay: 0.9 },
        { label: "Photos", x: 268, color: "#222", delay: 1.3 },
        { label: "🚀 Deploy", x: 356, color: "#e05533", delay: 1.7 },
      ].map(({ label, x, color, delay }, i) => (
        <g key={i}>
          <rect x={x} y="22" width="72" height="40" rx="6" stroke={color} strokeWidth="2" strokeDasharray="230" strokeDashoffset="230" fill="none">
            <animate attributeName="stroke-dashoffset" from="230" to="0" dur="0.45s" begin={`${delay}s`} fill="freeze" />
          </rect>
          <text x={x + 36} y="46" textAnchor="middle" fontSize="9.5" fill={color} fontFamily="var(--font-inter),sans-serif" fontWeight="700" opacity="0">
            {label}
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${delay + 0.4}s`} fill="freeze" />
          </text>
          {i < 4 && (
            <path d={`M${x + 72} 42 L${x + 86} 42`} stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="16" strokeDashoffset="16">
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.2s" begin={`${delay + 0.4}s`} fill="freeze" />
            </path>
          )}
          {i < 4 && (
            <path d={`M${x + 82} 38 L${x + 88} 42 L${x + 82} 46`} stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </g>
      ))}
    </svg>
  );
}

function OperationsWorkflow() {
  return (
    <svg viewBox="0 0 420 120" fill="none" className="tier-workflow-svg" aria-hidden="true">
      {/* Central AI node */}
      <circle cx="210" cy="58" r="32" stroke="#e05533" strokeWidth="2.5" strokeDasharray="210" strokeDashoffset="210" fill="none">
        <animate attributeName="stroke-dashoffset" from="210" to="0" dur="0.8s" begin="0.1s" fill="freeze" />
      </circle>
      <text x="210" y="54" textAnchor="middle" fontSize="11" fill="#e05533" fontFamily="var(--font-inter),sans-serif" fontWeight="800" opacity="0">
        AI Agent
        <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="0.8s" fill="freeze" />
      </text>
      <text x="210" y="67" textAnchor="middle" fontSize="9" fill="#e05533" fontFamily="var(--font-inter),sans-serif" opacity="0">
        24 / 7
        <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="0.9s" fill="freeze" />
      </text>

      {/* Inputs */}
      {[
        { label: "📞 Phone Call", y: 12 },
        { label: "📝 Lead Form", y: 52 },
        { label: "💬 Website Chat", y: 92 },
      ].map(({ label, y }, i) => (
        <g key={i}>
          <rect x="4" y={y} width="100" height="26" rx="5" stroke="#222" strokeWidth="1.8" strokeDasharray="260" strokeDashoffset="260" fill="none">
            <animate attributeName="stroke-dashoffset" from="260" to="0" dur="0.4s" begin={`${0.9 + i * 0.2}s`} fill="freeze" />
          </rect>
          <text x="54" y={y + 17} textAnchor="middle" fontSize="8.5" fill="#1a1a1a" fontFamily="var(--font-inter),sans-serif" fontWeight="600" opacity="0">
            {label}
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${1.2 + i * 0.2}s`} fill="freeze" />
          </text>
          <path d={`M104 ${y + 13} Q156 ${y + 13} 178 58`} stroke="#aaa" strokeWidth="1.2" strokeDasharray="140" strokeDashoffset="140" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="140" to="0" dur="0.4s" begin={`${1.3 + i * 0.2}s`} fill="freeze" />
          </path>
        </g>
      ))}

      {/* Outputs */}
      {[
        { label: "📅 Books Appt", y: 12 },
        { label: "📲 Sends Text", y: 52 },
        { label: "📋 You get Summary", y: 92 },
      ].map(({ label, y }, i) => (
        <g key={i}>
          <rect x="316" y={y} width="100" height="26" rx="5" stroke="#e05533" strokeWidth="1.8" strokeDasharray="260" strokeDashoffset="260" fill="none">
            <animate attributeName="stroke-dashoffset" from="260" to="0" dur="0.4s" begin={`${1.8 + i * 0.2}s`} fill="freeze" />
          </rect>
          <text x="366" y={y + 17} textAnchor="middle" fontSize="8.5" fill="#e05533" fontFamily="var(--font-inter),sans-serif" fontWeight="600" opacity="0">
            {label}
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${2.1 + i * 0.2}s`} fill="freeze" />
          </text>
          <path d={`M242 58 Q260 58 316 ${y + 13}`} stroke="#e05533" strokeWidth="1.2" strokeDasharray="140" strokeDashoffset="140" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="140" to="0" dur="0.4s" begin={`${1.9 + i * 0.2}s`} fill="freeze" />
          </path>
        </g>
      ))}

      <text x="210" y="112" textAnchor="middle" fontSize="8" fill="#aaa" fontFamily="var(--font-inter),sans-serif" fontStyle="italic" opacity="0">
        works while you sleep
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.8s" fill="freeze" />
      </text>
    </svg>
  );
}

function IntelligenceWorkflow() {
  const sources = ["📞 Calls", "📝 CRM", "💰 Revenue", "🌐 Traffic"];
  const outputs = ["📊 Dashboard", "📈 Growth View", "⚡ Live Alerts"];

  return (
    <svg viewBox="0 0 420 115" fill="none" className="tier-workflow-svg" aria-hidden="true">
      {sources.map((label, i) => (
        <g key={i}>
          <rect x="4" y={8 + i * 26} width="88" height="22" rx="4" stroke="#222" strokeWidth="1.6" strokeDasharray="230" strokeDashoffset="230" fill="none">
            <animate attributeName="stroke-dashoffset" from="230" to="0" dur="0.4s" begin={`${0.1 + i * 0.15}s`} fill="freeze" />
          </rect>
          <text x="48" y={23 + i * 26} textAnchor="middle" fontSize="8.5" fill="#1a1a1a" fontFamily="var(--font-inter),sans-serif" opacity="0">
            {label}
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${0.4 + i * 0.15}s`} fill="freeze" />
          </text>
          <path d={`M92 ${19 + i * 26} Q148 ${19 + i * 26} 158 57`} stroke="#ccc" strokeWidth="1" strokeDasharray="120" strokeDashoffset="120" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="120" to="0" dur="0.35s" begin={`${0.6 + i * 0.1}s`} fill="freeze" />
          </path>
        </g>
      ))}

      {/* Central hub */}
      <rect x="158" y="33" width="104" height="48" rx="8" stroke="#e05533" strokeWidth="2.5" strokeDasharray="320" strokeDashoffset="320" fill="none">
        <animate attributeName="stroke-dashoffset" from="320" to="0" dur="0.7s" begin="0.8s" fill="freeze" />
      </rect>
      <text x="210" y="55" textAnchor="middle" fontSize="10" fill="#e05533" fontFamily="var(--font-inter),sans-serif" fontWeight="800" opacity="0">
        FoundOS
        <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="1.4s" fill="freeze" />
      </text>
      <text x="210" y="68" textAnchor="middle" fontSize="8.5" fill="#e05533" fontFamily="var(--font-inter),sans-serif" opacity="0">
        Centralized Data
        <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="1.4s" fill="freeze" />
      </text>

      {/* Arrow out */}
      <path d="M262 57 L280 57" stroke="#e05533" strokeWidth="2" strokeLinecap="round" strokeDasharray="22" strokeDashoffset="22">
        <animate attributeName="stroke-dashoffset" from="22" to="0" dur="0.2s" begin="1.6s" fill="freeze" />
      </path>
      <path d="M275 52 L282 57 L275 62" stroke="#e05533" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {outputs.map((label, i) => (
        <g key={i}>
          <rect x="284" y={18 + i * 30} width="132" height="24" rx="4" stroke="#e05533" strokeWidth="1.6" strokeDasharray="320" strokeDashoffset="320" fill="none">
            <animate attributeName="stroke-dashoffset" from="320" to="0" dur="0.4s" begin={`${1.7 + i * 0.2}s`} fill="freeze" />
          </rect>
          <text x="350" y={34 + i * 30} textAnchor="middle" fontSize="8.5" fill="#e05533" fontFamily="var(--font-inter),sans-serif" fontWeight="600" opacity="0">
            {label}
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${2.0 + i * 0.2}s`} fill="freeze" />
          </text>
          <path d={`M282 57 Q283 57 284 ${30 + i * 30}`} stroke="#e05533" strokeWidth="1" strokeDasharray="60" strokeDashoffset="60" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.3s" begin={`${1.8 + i * 0.1}s`} fill="freeze" />
          </path>
        </g>
      ))}

      <text x="210" y="107" textAnchor="middle" fontSize="8" fill="#aaa" fontFamily="var(--font-inter),sans-serif" fontStyle="italic" opacity="0">
        true overview of your company
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.6s" fill="freeze" />
      </text>
    </svg>
  );
}

function FullSystemWorkflow() {
  const layers = [
    { label: "🌐 Website", color: "#e05533" },
    { label: "🤖 AI Agent", color: "#222" },
    { label: "⚡ Automation", color: "#222" },
    { label: "📊 Intelligence", color: "#222" },
  ];
  const results = ["💰 Save Money", "⏱ Save Time", "📈 Scale Up"];

  return (
    <svg viewBox="0 0 420 120" fill="none" className="tier-workflow-svg" aria-hidden="true">
      {layers.map(({ label, color }, i) => (
        <g key={i}>
          <rect x="8" y={8 + i * 26} width="100" height="22" rx="5" stroke={color} strokeWidth={i === 0 ? 2.5 : 1.8} strokeDasharray="250" strokeDashoffset="250" fill="none">
            <animate attributeName="stroke-dashoffset" from="250" to="0" dur="0.45s" begin={`${0.1 + i * 0.2}s`} fill="freeze" />
          </rect>
          <text x="58" y={23 + i * 26} textAnchor="middle" fontSize="9" fill={color} fontFamily="var(--font-inter),sans-serif" fontWeight={i === 0 ? "700" : "600"} opacity="0">
            {label}
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${0.45 + i * 0.2}s`} fill="freeze" />
          </text>
        </g>
      ))}

      {/* Bracket */}
      <path d="M110 19 L126 19 L126 97 L110 97" stroke="#222" strokeWidth="2" strokeDasharray="230" strokeDashoffset="230" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dashoffset" from="230" to="0" dur="0.5s" begin="1.0s" fill="freeze" />
      </path>

      {/* Arrow to OS */}
      <path d="M126 58 L152 58" stroke="#e05533" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="28" strokeDashoffset="28">
        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.25s" begin="1.5s" fill="freeze" />
      </path>
      <path d="M146 53 L154 58 L146 63" stroke="#e05533" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Business OS box */}
      <rect x="154" y="30" width="108" height="56" rx="10" stroke="#e05533" strokeWidth="3" strokeDasharray="360" strokeDashoffset="360" fill="none">
        <animate attributeName="stroke-dashoffset" from="360" to="0" dur="0.8s" begin="1.6s" fill="freeze" />
      </rect>
      <text x="208" y="55" textAnchor="middle" fontSize="11" fill="#e05533" fontFamily="var(--font-inter),sans-serif" fontWeight="800" opacity="0">
        Business
        <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="2.2s" fill="freeze" />
      </text>
      <text x="208" y="69" textAnchor="middle" fontSize="11" fill="#e05533" fontFamily="var(--font-inter),sans-serif" fontWeight="800" opacity="0">
        OS
        <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="2.2s" fill="freeze" />
      </text>

      {/* Arrow to results */}
      <path d="M262 58 L282 58" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeDasharray="22" strokeDashoffset="22">
        <animate attributeName="stroke-dashoffset" from="22" to="0" dur="0.2s" begin="2.4s" fill="freeze" />
      </path>
      <path d="M277 53 L284 58 L277 63" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {results.map((label, i) => (
        <g key={i}>
          <rect x="286" y={18 + i * 30} width="126" height="24" rx="5" stroke="#222" strokeWidth="1.8" strokeDasharray="310" strokeDashoffset="310" fill="none">
            <animate attributeName="stroke-dashoffset" from="310" to="0" dur="0.4s" begin={`${2.5 + i * 0.2}s`} fill="freeze" />
          </rect>
          <text x="349" y={34 + i * 30} textAnchor="middle" fontSize="9" fill="#1a1a1a" fontFamily="var(--font-inter),sans-serif" fontWeight="600" opacity="0">
            {label}
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin={`${2.8 + i * 0.2}s`} fill="freeze" />
          </text>
          <path d={`M284 58 Q285 58 286 ${30 + i * 30}`} stroke="#aaa" strokeWidth="1.2" strokeDasharray="60" strokeDashoffset="60" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.3s" begin={`${2.5 + i * 0.1}s`} fill="freeze" />
          </path>
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
    desc: "Your digital front door. Custom-designed, built to convert, live in days. Professional photography included.",
    expandedDesc: "We start with a discovery call to learn your business inside and out. Then we build a full scope of work, design your site from scratch — no templates — shoot professional photography that actually represents your brand, and deploy a live production-grade site. You get a real web presence that works from day one.",
    steps: ["Discovery Call", "Scope of Work", "Custom Build", "Photography", "Live Deploy"],
    Workflow: FoundationWorkflow,
  },
  {
    number: "02",
    title: "Operations",
    subtitle: "AI + Automation",
    desc: "An AI agent that answers your phone, books appointments, and follows up with leads — while you sleep.",
    expandedDesc: "Every call, form submission, and chat — filtered, qualified, and routed automatically. Your AI agent speaks in your voice, knows your hours and services, books directly to your calendar, and sends follow-up texts instantly. You stop doing admin. You start doing the work that makes money.",
    steps: ["Inbound Contact", "AI Qualifies", "Books Appointment", "Auto Follow-up", "You Get Summary"],
    Workflow: OperationsWorkflow,
  },
  {
    number: "03",
    title: "Intelligence",
    subtitle: "Dashboards + Data",
    desc: "See your business in real-time. Custom CRM, reporting, and analytics built around how you actually work.",
    expandedDesc: "All your data — calls, leads, revenue, website traffic, customer history — centralized in one place. A custom dashboard built specifically for your business model, not a generic template. No more guessing what's working. You see the full picture: what's growing, what's leaking, and where to focus.",
    steps: ["All Data Sources", "Central Hub", "Live Dashboard", "Growth Tracking", "Smart Alerts"],
    Workflow: IntelligenceWorkflow,
  },
  {
    number: "04",
    title: "Full System",
    subtitle: "Complete Business OS",
    desc: "Everything — website, AI, automation, and custom software — architected as one connected system.",
    expandedDesc: "This is the full stack. Website, AI agent, automation workflows, and a custom intelligence dashboard — all built to talk to each other. One system that saves you money on tools, saves you hours on admin, and gives you the same infrastructure Fortune 500 companies run on — at a fraction of the cost.",
    steps: ["All 4 Layers", "Fully Connected", "One System", "Save Money", "Scale Up"],
    Workflow: FullSystemWorkflow,
  },
];

/* ── Main Component ── */
export default function TierCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="tiers-grid">
      {TIERS.map((tier, index) => {
        const { Workflow } = tier;
        const isActive = activeCard === index;

        return (
          <div
            key={tier.number}
            className={`tier-card tier-card--interactive ${isActive ? "tier-card--expanded" : ""}`}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Existing sketch SVG border (keep your original SketchBox SVG here) */}
            <svg className="tier-card__sketch" viewBox="0 0 400 300" fill="none" preserveAspectRatio="none">
              <rect x="3" y="3" width="394" height="294" rx="12" stroke="#222" strokeWidth="2.5" strokeDasharray="8 4" opacity="0.18" />
            </svg>

            <div className="tier-card__content">
              <p className="tier-card__number">{tier.number}</p>
              <h3 className="tier-card__title">{tier.title}</h3>
              <p className="tier-card__subtitle">{tier.subtitle}</p>
              <p className="tier-card__desc">{tier.desc}</p>
            </div>

            {/* Expanded content — only visible on hover */}
            <div className="tier-card__expanded">
              <p className="tier-card__expanded-desc">{tier.expandedDesc}</p>
              <div className="tier-card__workflow-wrap">
                <Workflow />
              </div>
              <div className="tier-card__steps">
                {tier.steps.map((step, i) => (
                  <span key={i} className="tier-step">
                    {i > 0 && <span className="tier-step__arrow">{"\u2192"}</span>}
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
