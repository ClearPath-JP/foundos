"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import Image from "next/image";
import HeroSVGAnimation from "@/components/animations/HeroSVGAnimation";
import TierCards from "@/components/animations/TierCards";

/* ─── Constants ──────────────────────────────────── */
const CAL = "https://cal.com/foundos.ai/strategy-call";
const PHONE = "4704898838";
const TEXT_MSG = "Hey Josh — interested in working together.";
const TEXT_LINK = `sms:+1${PHONE}?body=${encodeURIComponent(TEXT_MSG)}`;
const EMAIL_LINK = "mailto:josh@foundos.ai";

/* ─── Desktop Detection (SMS fails on desktop) ───── */
function useCTA() {
  const [link, setLink] = useState(CAL);
  const [label, setLabel] = useState("Let\u2019s Talk");

  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setLink(mobile ? TEXT_LINK : EMAIL_LINK);
    setLabel(mobile ? "Text Me" : "Email Me");
  }, []);

  return { link, label };
}

/* ─── SVG Sketch Draw-on-Scroll ──────────────────── */
function Sketch({
  d,
  viewBox,
  className = "",
  delay = 0,
  duration = 0.8,
  stroke = "var(--sketch)",
  strokeWidth = 2.5,
  preserveAspectRatio = "none",
}: {
  d: string;
  viewBox: string;
  className?: string;
  delay?: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  preserveAspectRatio?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [len, setLen] = useState(1000);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg ref={svgRef} viewBox={viewBox} className={`sketch-svg ${className}`} preserveAspectRatio={preserveAspectRatio}>
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: len,
          strokeDashoffset: drawn ? 0 : len,
          transition: `stroke-dashoffset ${duration}s ease ${delay}s`,
        }}
      />
    </svg>
  );
}

/* ─── Scroll Reveal ──────────────────────────────── */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── Bottom Nav ─────────────────────────────────── */
function BottomNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const { link, label } = useCTA();

  useEffect(() => { const t = setTimeout(() => setVisible(true), 600); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const ids = ["work", "ai", "about"];
    const onScroll = () => {
      let cur = "";
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) cur = id; }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lc = (id: string) => `bottom-nav__link${active === id ? " bottom-nav__link--active" : ""}`;

  return (
    <nav className={`bottom-nav${visible ? " bottom-nav--visible" : ""}`}>
      <a href="#work" className={lc("work")}>Work</a>
      <a href="#ai" className={lc("ai")}>AI</a>
      <a href="#about" className={lc("about")}>About</a>
      <a href={link} className="bottom-nav__cta">{label}</a>
    </nav>
  );
}

/* ─── Sketch SVG Paths ───────────────────────────── */
const PATHS = {
  underline1: "M 2,10 C 40,4 80,16 120,8 C 160,2 190,14 198,10",
  box: "M 3,4 C 25,-1 75,2 97,3 C 101,25 99,75 97,97 C 75,101 25,99 3,97 C -1,75 1,25 3,4",
  arrowDown: "M 12,4 C 11,12 13,24 12,36 M 5,28 L 12,39 L 19,28",
  topLine: "M 0,2 C 30,1 70,3 100,2",
};

/* ─── Icons ──────────────────────────────────────── */
function PhoneIcon() {
  return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="ai-card__icon"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>);
}
function ClockIcon() {
  return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="ai-card__icon"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
}
function BrainIcon() {
  return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="ai-card__icon"><path d="M12 2a4 4 0 014 4v1a3 3 0 012.83 2A3 3 0 0120 12.17 3 3 0 0118 16a4 4 0 01-2 3.46V21h-4v-1.54A4 4 0 0110 16a3 3 0 01-1.17-3.83A3 3 0 019 7V6a4 4 0 014-4z" /></svg>);
}

/* ─── Data ───────────────────────────────────────── */
const AI_CARDS = [
  { icon: PhoneIcon, title: "It answers your phone.", desc: "An AI voice agent picks up every call, qualifies the lead, books the appointment, and texts you a summary. You never miss a customer again." },
  { icon: ClockIcon, title: "It runs your follow-ups.", desc: "Every new lead gets a response in seconds. Every past customer gets a check-in at the right time. Automatically. No CRM degree required." },
  { icon: BrainIcon, title: "It learns your business.", desc: "Every system I build is configured around your actual workflow \u2014 your hours, your menu, your pricing, your voice. The AI represents you because it was built for you." },
];

const PROJECTS = [
  { title: "Heirloom BBQ", tag: "Restaurant", desc: "Custom site + menu system + fire-inspired palette", link: "https://heirloom-bbq.vercel.app", image: "/portfolio/heirloom.png", external: true },
  { title: "FRAMELOCK", tag: "Photography", desc: "Portfolio site + masonry gallery + tiered pricing", link: "https://shutter-city.vercel.app", image: "/portfolio/framelock.png", external: true },
  { title: "Babygirl", tag: "Bar & Lounge", desc: "Full site + seasonal menu tabs + photo gallery", link: "/demo/babygirl", image: "/portfolio/babygirl.png", external: false },
  { title: "Clahvay", tag: "Barbershop", desc: "Booking system + service menu + brand photography", link: "https://clahvay.vercel.app", image: "/portfolio/clahvay.png", external: true },
  { title: "Amistad Coffee", tag: "Coffee Shop", desc: "Menu + hours + story page with community energy", link: "https://amistad-coffee.vercel.app", image: "/portfolio/amistad.png", external: true },
  { title: "Station 11", tag: "Caf\u00e9", desc: "Menu + reservations + interior photography", link: "https://station11-atl.vercel.app", image: "/portfolio/station11.png", external: true },
];

const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Supabase", "Claude AI", "n8n", "Stripe", "Vapi"];

/* ─── Page ───────────────────────────────────────── */
export default function Page() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { link: ctaLink, label: ctaLabel } = useCTA();

  /* Intro: sketch plays ~3s at center, then collapses to header */
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 5500);
    return () => clearTimeout(t);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (imgRef.current) { imgRef.current.style.left = `${e.clientX}px`; imgRef.current.style.top = `${e.clientY}px`; }
  }, []);

  const onProjectEnter = useCallback((i: number, e: React.MouseEvent) => {
    setHoverIdx(i);
    if (imgRef.current) { imgRef.current.style.left = `${e.clientX}px`; imgRef.current.style.top = `${e.clientY}px`; }
  }, []);

  return (
    <>
      {/* ── Intro: draws at center, collapses to top-left header ── */}
      <div className={`intro ${introDone ? "intro--done" : ""}`}>
        <div className="intro__inner">
          <HeroSVGAnimation />
        </div>
      </div>

      {/* ── Site content: fades in after intro collapses ── */}
      <div className={`site-content ${introDone ? "site-content--visible" : ""}`}>

      {/* ── Hero ────────────────────────────────── */}
      <section id="top" className="hero">
        <div className="hero__content">
          <p className="mono hero__label">
            Business Architect &mdash; Atlanta, GA
          </p>
          <h1 className="heading hero__title">
            I find what&apos;s broken.
            <br />
            Then I build the fix.
            <Sketch d={PATHS.underline1} viewBox="0 0 200 20" className="hero__underline" delay={0.5} duration={1} stroke="var(--accent)" strokeWidth={3} />
          </h1>
          <p className="hero__sub">
            AI agents. Automation. Custom software. Websites. I look at how your
            business actually runs and build the technology that fills the gaps.
          </p>
          <div className="hero__ctas">
            <a href={ctaLink} className="btn">{ctaLabel}</a>
            <a href="#work" className="btn btn--ghost">See the Work</a>
          </div>
        </div>
      </section>

      {/* ── Tiers ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="mono section__label">What I Build</p>
            <h2 className="heading section__title">Four levels. One architect.</h2>
          </Reveal>
          <TierCards />
        </div>
      </section>

      {/* ── Why AI ───────────────────────────────── */}
      <section id="ai" className="section ai-section">
        <div className="container">
          <Reveal>
            <p className="mono section__label" style={{ color: "var(--accent)" }}>Why AI</p>
            <h2 className="heading section__title">
              AI is here. But nobody&apos;s showing you what to do with it.
            </h2>
          </Reveal>
          <div className="ai-cards">
            {AI_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1} className="ai-card">
                <Sketch d={PATHS.topLine} viewBox="0 0 100 4" className="ai-card__sketch-top" delay={i * 0.15 + 0.2} duration={0.5} stroke="var(--accent)" strokeWidth={3} />
                <card.icon />
                <h3 className="ai-card__title">{card.title}</h3>
                <p className="ai-card__desc">{card.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div style={{ marginTop: "var(--s6)", textAlign: "center" }}>
              <a href="/ai" className="btn btn--ghost btn--sm">See How AI Works for Your Business &rarr;</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Work (with descriptions) ─────────────── */}
      <section id="work" className="section">
        <div className="container">
          <Reveal>
            <p className="mono section__label">Work</p>
            <h2 className="heading section__title">Real businesses. Real systems.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="project-list" onMouseMove={onMouseMove} onMouseLeave={() => setHoverIdx(null)}>
              {PROJECTS.map((p, i) => (
                <a
                  key={p.title}
                  href={p.link}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noopener noreferrer" : undefined}
                  className="project-row"
                  onMouseEnter={(e) => onProjectEnter(i, e)}
                >
                  <div className="project-row__left">
                    <span className="project-row__name">{p.title}</span>
                    <span className="project-row__desc">{p.desc}</span>
                  </div>
                  <span className="project-row__type">{p.tag}</span>
                  <div className="project-row__mobile-img">
                    <Image src={p.image} alt={p.title} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
        <div ref={imgRef} className="cursor-img" style={{ opacity: hoverIdx !== null ? 1 : 0, transform: `translate(-50%, -60%) scale(${hoverIdx !== null ? 1 : 0.85})` }}>
          {PROJECTS.map((p, i) => (
            <Image key={p.title} src={p.image} alt="" fill sizes="400px" style={{ objectFit: "cover", objectPosition: "top", opacity: hoverIdx === i ? 1 : 0, transition: "opacity 0.15s ease" }} />
          ))}
        </div>
      </section>

      {/* ── About ───────────────────────────────── */}
      <section id="about" className="section">
        <div className="container about">
          <Reveal className="about__photo-wrap">
            <div className="about__photo-inner">
              <Image src="/josh.jpg" alt="Josh Poteat" fill sizes="(max-width: 768px) 260px, 50vw" className="about__photo" />
            </div>
            <Sketch d={PATHS.box} viewBox="0 0 100 100" className="about__frame" delay={0.3} duration={1.2} stroke="var(--sketch)" strokeWidth={1.5} preserveAspectRatio="none" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mono section__label">About</p>
            <h2 className="heading about__heading">One person. Full stack.</h2>
            <p className="about__bio">
              I&apos;m Josh &mdash; a builder in Atlanta. I build custom AI
              systems, wire automation into real business workflows, and ship
              production software. <strong>Not demos. Real products for real businesses.</strong>
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

      {/* ── Stack ────────────────────────────────── */}
      <div className="stack-section">
        <div className="container">
          <Reveal>
            <p className="mono stack-label">Built With</p>
            <div className="stack-strip">
              {STACK.map((s) => <span key={s} className="stack-tag">{s}</span>)}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="section cta-final">
        <div className="container cta-final__inner">
          <Sketch d={PATHS.box} viewBox="0 0 100 100" className="cta-final__sketch" delay={0.2} duration={1.4} strokeWidth={2} />
          <Reveal>
            <h2 className="heading cta-final__title">Tell me about<br />your business.</h2>
            <p className="cta-final__sub">
              I&apos;ll tell you exactly what I&apos;d build &mdash; no pitch
              deck, no commitment. Just a real conversation about what your
              business needs.
            </p>
            <div className="cta-final__ctas">
              <a href={ctaLink} className="btn btn--lg">{ctaLabel}</a>
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">Book a Call</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="footer">
        <div className="container footer__top">
          <div>
            <p className="footer__brand">FOUNDOS</p>
            <p className="footer__tagline hand">business architecture for the AI era</p>
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

      </div>{/* end site-content */}

      <BottomNav />
    </>
  );
}
