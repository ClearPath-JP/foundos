"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import Image from "next/image";
import HeroCanvas from "@/components/HeroCanvas";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
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
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Bottom Nav ─────────────────────────────────── */
function BottomNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ids = ["work", "ai", "about"];
    const onScroll = () => {
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lc = (id: string) =>
    `bottom-nav__link${active === id ? " bottom-nav__link--active" : ""}`;

  return (
    <nav className={`bottom-nav${visible ? " bottom-nav--visible" : ""}`}>
      <a href="#work" className={lc("work")}>Work</a>
      <a href="#ai" className={lc("ai")}>AI</a>
      <a href="#about" className={lc("about")}>About</a>
      <a href={TEXT_LINK} className="bottom-nav__cta">Let&apos;s Talk</a>
    </nav>
  );
}

/* ─── Tier Card with Hover Animation ─────────────── */
function TierCard({
  n,
  title,
  subtitle,
  desc,
  children,
}: {
  n: string;
  title: string;
  subtitle: string;
  desc: string;
  children: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="tier-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="mono tier-card__number">{n}</p>
      <h3 className="tier-card__title">{title}</h3>
      <p className="tier-card__subtitle">{subtitle}</p>
      <p className="tier-card__desc">{desc}</p>
      <div className={`tier-viz ${hovered ? "tier-viz--active" : ""}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Tier Animations ────────────────────────────── */
function TimelineViz() {
  const steps = ["Discovery", "Design", "Build", "Launch"];
  return (
    <div className="viz-timeline">
      {steps.map((s, i) => (
        <div key={s} className="viz-timeline__step" style={{ animationDelay: `${i * 0.3}s` }}>
          <div className={`viz-timeline__dot ${i === steps.length - 1 ? "viz-timeline__dot--launch" : ""}`} />
          {i < steps.length - 1 && <div className="viz-timeline__line" style={{ animationDelay: `${i * 0.3 + 0.15}s` }} />}
          <span className="viz-timeline__label">{s}</span>
        </div>
      ))}
    </div>
  );
}

function FlowViz() {
  const nodes = ["Lead", "Qualify", "Book", "Confirm", "Done"];
  return (
    <div className="viz-flow">
      {nodes.map((n, i) => (
        <div key={n} className="viz-flow__node" style={{ animationDelay: `${i * 0.4}s` }}>
          <div className="viz-flow__circle">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="viz-flow__label">{n}</span>
        </div>
      ))}
    </div>
  );
}

function DashViz() {
  const bars = [60, 85, 45, 70, 55];
  return (
    <div className="viz-dash">
      <div className="viz-dash__metrics">
        <div className="viz-dash__metric">
          <span className="viz-dash__num">147</span>
          <span className="viz-dash__unit">leads</span>
        </div>
        <div className="viz-dash__metric">
          <span className="viz-dash__num">$28k</span>
          <span className="viz-dash__unit">revenue</span>
        </div>
        <div className="viz-dash__metric">
          <span className="viz-dash__num">94%</span>
          <span className="viz-dash__unit">response</span>
        </div>
      </div>
      <div className="viz-dash__bars">
        {bars.map((h, i) => (
          <div
            key={i}
            className="viz-dash__bar"
            style={{ "--bar-h": `${h}%`, animationDelay: `${0.6 + i * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function ConnectedViz() {
  return (
    <svg className="viz-connected" viewBox="0 0 160 120">
      {/* Connecting lines */}
      <line x1="80" y1="15" x2="30" y2="60" className="viz-connected__line" style={{ animationDelay: "0.8s" }} />
      <line x1="80" y1="15" x2="130" y2="60" className="viz-connected__line" style={{ animationDelay: "0.9s" }} />
      <line x1="30" y1="60" x2="80" y2="105" className="viz-connected__line" style={{ animationDelay: "1.0s" }} />
      <line x1="130" y1="60" x2="80" y2="105" className="viz-connected__line" style={{ animationDelay: "1.1s" }} />
      <line x1="30" y1="60" x2="130" y2="60" className="viz-connected__line" style={{ animationDelay: "1.2s" }} />
      <line x1="80" y1="15" x2="80" y2="105" className="viz-connected__line" style={{ animationDelay: "1.3s" }} />
      {/* Nodes */}
      <circle cx="80" cy="15" r="6" className="viz-connected__node" style={{ animationDelay: "0.2s" }} />
      <circle cx="30" cy="60" r="6" className="viz-connected__node" style={{ animationDelay: "0.4s" }} />
      <circle cx="130" cy="60" r="6" className="viz-connected__node" style={{ animationDelay: "0.6s" }} />
      <circle cx="80" cy="105" r="6" className="viz-connected__node" style={{ animationDelay: "0.8s" }} />
      {/* Labels */}
      <text x="80" y="35" className="viz-connected__text" style={{ animationDelay: "0.3s" }}>Web</text>
      <text x="30" y="80" className="viz-connected__text" style={{ animationDelay: "0.5s" }}>AI</text>
      <text x="130" y="80" className="viz-connected__text" style={{ animationDelay: "0.7s" }}>Data</text>
      <text x="80" y="100" className="viz-connected__text" style={{ animationDelay: "0.9s" }}>OS</text>
    </svg>
  );
}

/* ─── AI Section Icons ───────────────────────────── */
function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ai-card__icon">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ai-card__icon">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ai-card__icon">
      <path d="M12 2a4 4 0 014 4v1a3 3 0 012.83 2A3 3 0 0120 12.17 3 3 0 0118 16a4 4 0 01-2 3.46V21h-4v-1.54A4 4 0 0110 16a3 3 0 01-1.17-3.83A3 3 0 019 7V6a4 4 0 014-4z" />
      <path d="M12 2v6M8 10h8" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────── */
const TIERS = [
  { n: "01", title: "Foundation", subtitle: "Website + Photography", desc: "Your digital front door. Custom-designed, built to convert, live in days. Professional photography included." },
  { n: "02", title: "Operations", subtitle: "AI + Automation", desc: "An AI agent that answers your phone, books appointments, and follows up with leads. Systems that work while you sleep." },
  { n: "03", title: "Intelligence", subtitle: "Dashboards + Data", desc: "See your business in real-time. Custom CRM, reporting, and analytics built around how you actually work." },
  { n: "04", title: "Full System", subtitle: "Complete Business OS", desc: "Everything \u2014 website, AI, automation, and custom software \u2014 architected as one connected system." },
];

const AI_CARDS = [
  { icon: PhoneIcon, title: "It answers your phone.", desc: "An AI voice agent picks up every call, qualifies the lead, books the appointment, and texts you a summary. You never miss a customer again." },
  { icon: ClockIcon, title: "It runs your follow-ups.", desc: "Every new lead gets a response in seconds. Every past customer gets a check-in at the right time. Automatically. No CRM degree required." },
  { icon: BrainIcon, title: "It learns your business.", desc: "Every system I build is configured around your actual workflow \u2014 your hours, your menu, your pricing, your voice. The AI represents you because it was built for you." },
];

const PROJECTS = [
  { title: "Heirloom BBQ", tag: "Restaurant", link: "https://heirloom-bbq.vercel.app", image: "/portfolio/heirloom.png", external: true },
  { title: "FRAMELOCK", tag: "Photography", link: "https://shutter-city.vercel.app", image: "/portfolio/framelock.png", external: true },
  { title: "Babygirl", tag: "Bar & Lounge", link: "/demo/babygirl", image: "/portfolio/babygirl.png", external: false },
  { title: "Clahvay", tag: "Barbershop", link: "https://clahvay.vercel.app", image: "/portfolio/clahvay.png", external: true },
  { title: "Amistad Coffee", tag: "Coffee Shop", link: "https://amistad-coffee.vercel.app", image: "/portfolio/amistad.png", external: true },
  { title: "Station 11", tag: "Caf\u00e9", link: "https://station11-atl.vercel.app", image: "/portfolio/station11.png", external: true },
];

const STACK = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel",
  "Supabase", "Claude AI", "n8n", "Stripe", "Vapi",
];

/* ─── Page ───────────────────────────────────────── */
export default function Page() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (imgRef.current) {
      imgRef.current.style.left = `${e.clientX}px`;
      imgRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  const onProjectEnter = useCallback((i: number, e: React.MouseEvent) => {
    setHoverIdx(i);
    if (imgRef.current) {
      imgRef.current.style.left = `${e.clientX}px`;
      imgRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  return (
    <>
      {/* ── Floating Logo ───────────────────────── */}
      <a href="#top" className="logo">FOUNDOS</a>

      {/* ── Hero (Isometric Building Canvas) ───── */}
      <section id="top" className="hero">
        <HeroCanvas />
        <div className="hero__content">
          <p className="mono hero__label">
            Business Architect &mdash; Atlanta, GA
          </p>
          <h1 className="heading heading--gradient hero__title">
            I find what&apos;s
            <br />
            broken. Then I<br />
            build the fix.
          </h1>
          <p className="hero__sub">
            AI agents. Automation. Custom software. Websites. I look at how your
            business actually runs and build the technology that fills the gaps.
          </p>
          <div className="hero__ctas">
            <a href={TEXT_LINK} className="btn">
              Let&apos;s Talk
            </a>
            <a href="#work" className="btn btn--ghost">
              See the Work
            </a>
          </div>
        </div>
        <div className="hero__scroll">
          <span className="mono">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── What I Build — Tiers with Animations ── */}
      <section className="section section--alt section--gradient-top">
        <div className="container">
          <Reveal>
            <p className="mono section__label">What I Build</p>
            <h2 className="heading section__title">
              Four levels.
              <br />
              One architect.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="tiers-grid">
              <TierCard {...TIERS[0]}>
                <TimelineViz />
              </TierCard>
              <TierCard {...TIERS[1]}>
                <FlowViz />
              </TierCard>
              <TierCard {...TIERS[2]}>
                <DashViz />
              </TierCard>
              <TierCard {...TIERS[3]}>
                <ConnectedViz />
              </TierCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why AI — 3-Column Cards on Navy ─────── */}
      <section id="ai" className="section section--deep-navy">
        <div className="container">
          <Reveal>
            <p className="mono section__label">Why AI</p>
            <h2 className="heading section__title ai-heading">
              AI is here. But nobody&apos;s showing you{" "}
              <span className="ai-heading__accent">what to do with it.</span>
            </h2>
            <div className="ai-heading__rule" />
          </Reveal>
          <div className="ai-cards">
            {AI_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1} className="ai-card">
                <card.icon />
                <h3 className="ai-card__title">{card.title}</h3>
                <p className="ai-card__desc">{card.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35}>
            <div style={{ marginTop: "var(--s6)", textAlign: "center" }}>
              <a href="/ai" className="btn btn--ghost btn--sm">
                See How AI Works for Your Business &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Work — Project List + Cursor Image ──── */}
      <section id="work" className="section section--alt">
        <div className="container">
          <Reveal>
            <p className="mono section__label">Work</p>
            <h2 className="heading section__title">
              Real businesses.
              <br />
              Real systems.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div
              className="project-list"
              onMouseMove={onMouseMove}
              onMouseLeave={() => setHoverIdx(null)}
            >
              {PROJECTS.map((p, i) => (
                <a
                  key={p.title}
                  href={p.link}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noopener noreferrer" : undefined}
                  className="project-row"
                  onMouseEnter={(e) => onProjectEnter(i, e)}
                >
                  <span className="project-row__name">{p.title}</span>
                  <span className="project-row__type">{p.tag}</span>
                  <div className="project-row__mobile-img">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div
          ref={imgRef}
          className="cursor-img"
          style={{
            opacity: hoverIdx !== null ? 1 : 0,
            transform: `translate(-50%, -60%) scale(${hoverIdx !== null ? 1 : 0.85})`,
          }}
        >
          {PROJECTS.map((p, i) => (
            <Image
              key={p.title}
              src={p.image}
              alt=""
              fill
              sizes="400px"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                opacity: hoverIdx === i ? 1 : 0,
                transition: "opacity 0.15s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── About ───────────────────────────────── */}
      <section id="about" className="section">
        <div className="container about">
          <Reveal className="about__photo-wrap">
            <Image
              src="/josh.jpg"
              alt="Josh Poteat"
              fill
              sizes="(max-width: 768px) 300px, 50vw"
              className="about__photo"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mono section__label">About</p>
            <h2 className="heading about__heading">
              One person.
              <br />
              Full stack.
            </h2>
            <p className="about__bio">
              I&apos;m Josh &mdash; a builder in Atlanta. I build custom AI
              systems, wire automation into real business workflows, and ship
              production software.{" "}
              <strong>Not demos. Real products for real businesses.</strong>
            </p>
            <p className="about__bio">
              Most agencies sell you a template and disappear. I look at how your
              business actually runs, find the gaps, and build exactly what fills
              them &mdash; using the same tools Fortune 500 companies use.
            </p>
            <p className="about__bio about__bio--dim">
              No account managers. No junior devs. No handoffs. You talk directly
              to the person who designs it, codes it, and maintains it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Tech Stack Strip ────────────────────── */}
      <div className="stack-section">
        <div className="container">
          <Reveal>
            <p className="mono stack-label">Built With</p>
            <div className="stack-strip">
              {STACK.map((s) => (
                <span key={s} className="stack-tag">{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Final CTA ───────────────────────────── */}
      <section className="section cta-final">
        <div className="container cta-final__inner">
          <Reveal>
            <h2 className="heading heading--gradient cta-final__title">
              Tell me about
              <br />
              your business.
            </h2>
            <p className="cta-final__sub">
              I&apos;ll tell you exactly what I&apos;d build &mdash; no pitch
              deck, no commitment. Just a real conversation about what your
              business needs.
            </p>
            <div className="cta-final__ctas">
              <a href={TEXT_LINK} className="btn btn--lg">
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
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="footer">
        <div className="container footer__top">
          <div>
            <p className="footer__brand">FOUNDOS</p>
            <p className="mono footer__tagline">
              Business architecture for the AI era.
            </p>
          </div>
          <div className="footer__links">
            <a href="https://instagram.com/foundos.ai" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com/@foundos.ai" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="mailto:josh@foundos.ai"><strong>josh@foundos.ai</strong></a>
          </div>
        </div>
        <div className="container">
          <div className="footer__bottom">
            <p className="mono">&copy; 2026 FoundOS</p>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="/privacy" className="mono" style={{ color: "var(--text-dim)", textDecoration: "none" }}>Privacy</a>
              <p className="mono">Atlanta, GA</p>
            </div>
          </div>
        </div>
      </footer>

      <BottomNav />
    </>
  );
}
