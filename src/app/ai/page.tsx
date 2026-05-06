"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── Constants ──────────────────────────────────── */
const CAL = "https://cal.com/foundos.ai/strategy-call";
const PHONE = "4704898838";
const TEXT_MSG = "Hey Josh — interested in working together.";
const TEXT_LINK = `sms:+1${PHONE}?body=${encodeURIComponent(TEXT_MSG)}`;

/* ─── Scroll Reveal ──────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Scenario Card ──────────────────────────────── */
function Scenario({
  title,
  before,
  after,
  delay,
}: {
  title: string;
  before: string;
  after: string;
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        className="scenario"
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div className="scenario__header">
          <h3 className="scenario__name">{title}</h3>
          <span
            className={`scenario__badge ${
              flipped ? "scenario__badge--after" : "scenario__badge--before"
            }`}
          >
            {flipped ? "With AI" : "Without AI"}
          </span>
        </div>
        <p
          className={`scenario__text ${
            flipped ? "scenario__text--after" : "scenario__text--before"
          }`}
        >
          {flipped ? after : before}
        </p>
        <p className="scenario__hint">
          {flipped ? "" : "Hover or tap to see the difference"}
        </p>
      </div>
    </Reveal>
  );
}

/* ─── ROI Calculator ─────────────────────────────── */
function Calculator() {
  const [calls, setCalls] = useState(5);
  const [value, setValue] = useState(150);

  const monthlyLoss = calls * value * 4;
  const aiCost = 200;
  const roi = monthlyLoss - aiCost;

  return (
    <div className="calc">
      <div className="calc__group">
        <div className="calc__label">
          <span className="calc__label-text">Calls you miss per week</span>
          <span className="calc__label-value">{calls}</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={calls}
          onChange={(e) => setCalls(+e.target.value)}
          className="calc__range"
        />
      </div>

      <div className="calc__group">
        <div className="calc__label">
          <span className="calc__label-text">Average customer value</span>
          <span className="calc__label-value">${value}</span>
        </div>
        <input
          type="range"
          min={50}
          max={500}
          step={10}
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          className="calc__range"
        />
      </div>

      <div className="calc__divider" />

      <div className="calc__result">
        <p className="calc__result-line">
          You&apos;re leaving{" "}
          <strong>${monthlyLoss.toLocaleString()}/mo</strong> on the table.
        </p>
        <p className="calc__result-line">
          An AI phone agent costs <strong>$200/mo</strong>.
        </p>
        <p className="calc__roi">
          +${roi.toLocaleString()}/mo
        </p>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function AIPage() {
  return (
    <>
      {/* ── Nav ─────────────────────────────────── */}
      <nav className="ai-nav">
        <a href="/" className="ai-nav__logo">
          FOUNDOS
        </a>
        <a href="/" className="ai-nav__back">
          &larr; Back
        </a>
      </nav>

      <div className="ai-page">
        {/* ── Hero ──────────────────────────────── */}
        <Reveal>
          <div className="ai-hero">
            <h1 className="heading heading--gradient ai-hero__title">
              How AI Actually Works
              <br />
              for Your Business
            </h1>
            <p className="ai-hero__sub">
              Not the hype. Not the fear. Just what it does, how it helps, and
              why it matters right now.
            </p>
          </div>
        </Reveal>

        {/* ── Section 1: Reality ────────────────── */}
        <Reveal>
          <div className="ai-sect">
            <h2 className="ai-sect__title">
              It&apos;s not what you think it is.
            </h2>
            <p className="ai-sect__text">
              Most business owners hear &ldquo;AI&rdquo; and picture robots. Or
              the thing that&apos;s going to take everyone&apos;s jobs.
            </p>
            <p className="ai-sect__text">
              In reality, AI is software that recognizes patterns and makes
              decisions based on them. Your phone&apos;s autocomplete?
              That&apos;s AI. Google Maps finding the fastest route? AI. Netflix
              knowing what you want to watch? AI.
            </p>
            <p className="ai-sect__text">
              The same technology can now{" "}
              <strong>answer your business phone at 2am</strong>, respond to a
              lead before they move on, and keep your operations running while
              you sleep. It&apos;s not futuristic &mdash; it&apos;s available
              right now. The only question is whether you use it before your
              competitors do.
            </p>
          </div>
        </Reveal>

        {/* ── Section 2: Before / After ─────────── */}
        <div className="ai-sect">
          <Reveal>
            <h2 className="ai-sect__title">
              What AI looks like in a real business.
            </h2>
          </Reveal>

          <div className="scenarios">
            <Scenario
              delay={0.06}
              title="The Missed Call"
              before="A customer calls at 7pm. You're with your family. They leave a voicemail. By morning, they've already called your competitor."
              after="AI picks up, takes their info, books an appointment, and texts you a summary. You finish dinner. The customer is locked in."
            />
            <Scenario
              delay={0.12}
              title="The Forgotten Follow-Up"
              before="You met a potential customer last week. Meant to follow up. Forgot. They went somewhere else."
              after="AI sends a personalized message 48 hours later. Automatically. Every single time. Nobody falls through the cracks."
            />
            <Scenario
              delay={0.18}
              title="The Bottleneck"
              before="You need to update your menu on your website. You email your web person. It takes 5 days and costs $150."
              after="You text me. It's done in minutes. Your site stays current because maintaining it is built into the system."
            />
          </div>
        </div>

        {/* ── Section 3: Calculator ─────────────── */}
        <div className="ai-sect">
          <Reveal>
            <h2 className="ai-sect__title">What&apos;s it costing you?</h2>
            <p className="ai-sect__text">
              Drag the sliders. See the math. This is real money.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Calculator />
          </Reveal>
        </div>

        {/* ── Section 4: Limitations ────────────── */}
        <Reveal>
          <div className="ai-sect">
            <h2 className="ai-sect__title">
              What AI can&apos;t do.
            </h2>
            <p className="ai-sect__text">And this matters:</p>
            <div className="limits">
              <div className="limit">
                <div className="limit__icon" />
                <p className="limit__text">
                  It can&apos;t replace your expertise or your relationships with
                  customers
                </p>
              </div>
              <div className="limit">
                <div className="limit__icon" />
                <p className="limit__text">
                  It can&apos;t make judgment calls that require context only you
                  have
                </p>
              </div>
              <div className="limit">
                <div className="limit__icon" />
                <p className="limit__text">
                  It can&apos;t set itself up &mdash; it needs someone who
                  understands your business to configure it right
                </p>
              </div>
              <div className="limit">
                <div className="limit__icon" />
                <p className="limit__text">
                  It&apos;s a tool. The best tool available. But still a tool
                  &mdash; and <strong>tools need a builder</strong>
                </p>
              </div>
            </div>
            <p className="ai-sect__text" style={{ marginTop: 24 }}>
              That&apos;s where I come in.
            </p>
          </div>
        </Reveal>

        {/* ── CTA ───────────────────────────────── */}
        <Reveal>
          <div className="ai-cta">
            <h2 className="heading ai-cta__title">
              Ready to see what AI
              <br />
              does for your business?
            </h2>
            <p className="ai-cta__sub">
              Tell me what you do. I&apos;ll tell you exactly how AI fits in.
            </p>
            <div className="ai-cta__btns">
              <a href={TEXT_LINK} className="btn">
                Text Me
              </a>
              <a
                href={CAL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                Book a Call
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
