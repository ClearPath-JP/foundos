"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════
   AMISTAD COFFEE CO. — Spec Site
   Latin-Inspired Specialty Coffee · Midtown Atlanta
   ═══════════════════════════════════════════════════════════ */

/* ─── Scroll Reveal ─────────────────────────────────────── */
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
      { threshold: 0.15 }
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
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────── */

const CLASSICS = [
  { name: "Latte", price: "$6" },
  { name: "Cappuccino", price: "$5.50" },
  { name: "Flat White", price: "$5.50" },
  { name: "Cortado", price: "$5" },
  { name: "Iced Coffee", price: "$5" },
  { name: "Americano", price: "$4.50" },
  { name: "Drip Coffee", price: "$3.50" },
];

const SPECIALTIES = [
  {
    name: "Horchata",
    price: "$7",
    desc: "Spiced rice milk latte",
    tag: "fan favorite",
  },
  {
    name: "Mazapán",
    price: "$7",
    desc: "Mexican peanut candy latte",
    tag: "house original",
  },
  {
    name: "Elote",
    price: "$7",
    desc: "Sweet corn infused milk latte",
    tag: "only here",
  },
  {
    name: "Matcha con Fresas",
    price: "$7.50",
    desc: "Iced strawberry matcha",
    tag: "seasonal",
  },
];

const TEAS = [
  { name: "Matcha Latte", price: "$6" },
  { name: "Chai Latte", price: "$6" },
];

const ADDONS = [
  { name: "Extra Shot", price: "+$1" },
  { name: "Oat or Almond Milk", price: "+$1" },
  { name: "House Made Syrup", price: "+$1" },
];

const HOURS = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "7 AM – 3 PM" },
  { day: "Wednesday", time: "7 AM – 3 PM" },
  { day: "Thursday", time: "7 AM – 3 PM" },
  { day: "Friday", time: "7 AM – 3 PM" },
  { day: "Saturday", time: "7 AM – 3 PM" },
  { day: "Sunday", time: "7 AM – 3 PM" },
];

const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "Our Story" },
  { href: "#visit", label: "Visit" },
];

/* ─── Styles (scoped) ───────────────────────────────────── */
const S = {
  /* Tokens */
  "--green-deep": "#1B4332",
  "--green-mid": "#2D6A4F",
  "--green-soft": "#40916C",
  "--green-light": "#B7E4C7",
  "--cream": "#FDF6EC",
  "--cream-dark": "#F5EBDA",
  "--warm": "#D4A574",
  "--warm-dark": "#B8875A",
  "--text-dark": "#1A1A1A",
  "--text-body": "#3D3D3D",
  "--text-muted": "#6B6B6B",
  "--white": "#FFFFFF",
} as const;

/* ─── Component ─────────────────────────────────────────── */
export default function AmistadPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div
      style={{
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        background: S["--cream"],
        color: S["--text-body"],
        overflowX: "hidden",
      }}
    >
      <style>{`
        /* ── Global overrides for this page ── */
        ::selection { background: rgba(27, 67, 50, 0.2); }

        .ami-serif {
          font-family: var(--font-dm-serif), "Georgia", serif;
        }

        /* ── Nav ── */
        .ami-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.4s, box-shadow 0.4s;
        }
        .ami-nav--scrolled {
          background: rgba(253, 246, 236, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(27, 67, 50, 0.08);
        }
        .ami-nav__logo {
          font-family: var(--font-dm-serif), serif;
          font-size: 22px;
          color: ${S["--green-deep"]};
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .ami-nav__links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .ami-nav__link {
          font-size: 13px;
          font-weight: 500;
          color: ${S["--text-muted"]};
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.2s;
        }
        .ami-nav__link:hover { color: ${S["--green-deep"]}; }
        .ami-nav__hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .ami-hamburger {
          display: block;
          width: 22px;
          height: 2px;
          background: ${S["--green-deep"]};
          position: relative;
          transition: background 0.2s;
        }
        .ami-hamburger::before,
        .ami-hamburger::after {
          content: "";
          position: absolute;
          left: 0; width: 100%; height: 2px;
          background: ${S["--green-deep"]};
          transition: transform 0.3s ease;
        }
        .ami-hamburger::before { top: -6px; }
        .ami-hamburger::after { top: 6px; }
        .ami-hamburger--open { background: transparent; }
        .ami-hamburger--open::before { transform: rotate(45deg) translate(4px, 4px); }
        .ami-hamburger--open::after { transform: rotate(-45deg) translate(4px, -4px); }

        /* ── Mobile menu ── */
        .ami-mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(253, 246, 236, 0.98);
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(20px);
        }
        .ami-mobile-menu__inner {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: center;
        }
        .ami-mobile-menu__link {
          font-family: var(--font-dm-serif), serif;
          font-size: 32px;
          color: ${S["--green-deep"]};
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .ami-mobile-menu__link:hover { opacity: 0.6; }

        /* ── Hero ── */
        .ami-hero {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          background: linear-gradient(180deg, ${S["--green-deep"]} 0%, ${S["--green-mid"]} 100%);
          overflow: hidden;
        }
        .ami-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(212, 165, 116, 0.15) 0%, transparent 70%);
        }
        .ami-hero__greeting {
          font-family: var(--font-dm-serif), serif;
          font-size: clamp(16px, 2.5vw, 20px);
          color: ${S["--green-light"]};
          margin-bottom: 20px;
          letter-spacing: 0.02em;
          position: relative;
          z-index: 1;
        }
        .ami-hero__title {
          font-family: var(--font-dm-serif), serif;
          font-size: clamp(48px, 10vw, 100px);
          color: ${S["--white"]};
          line-height: 1.0;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }
        .ami-hero__subtitle {
          font-family: var(--font-dm-serif), serif;
          font-size: clamp(28px, 5vw, 48px);
          color: ${S["--warm"]};
          margin-bottom: 24px;
          font-style: italic;
          position: relative;
          z-index: 1;
        }
        .ami-hero__tagline {
          font-size: clamp(14px, 2vw, 16px);
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .ami-hero__ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .ami-hero__scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 1;
        }
        .ami-hero__scroll-text {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.4);
        }
        .ami-hero__scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%);
        }

        /* ── Buttons ── */
        .ami-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 36px;
          font-family: var(--font-jakarta), system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ami-btn:hover { transform: translateY(-1px); opacity: 0.9; }
        .ami-btn--primary {
          background: ${S["--warm"]};
          color: ${S["--white"]};
        }
        .ami-btn--outline {
          background: transparent;
          color: ${S["--white"]};
          border: 1px solid rgba(255,255,255,0.3);
        }
        .ami-btn--outline:hover { border-color: rgba(255,255,255,0.6); }
        .ami-btn--dark {
          background: ${S["--green-deep"]};
          color: ${S["--white"]};
        }

        /* ── Sections ── */
        .ami-section {
          padding: clamp(80px, 12vh, 140px) 24px;
        }
        .ami-container {
          max-width: 960px;
          margin: 0 auto;
        }
        .ami-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: ${S["--green-soft"]};
          margin-bottom: 12px;
        }
        .ami-heading {
          font-family: var(--font-dm-serif), serif;
          font-size: clamp(32px, 6vw, 52px);
          color: ${S["--green-deep"]};
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }
        .ami-body {
          font-size: clamp(15px, 2vw, 17px);
          line-height: 1.8;
          color: ${S["--text-body"]};
          max-width: 560px;
        }

        /* ── Divider ── */
        .ami-divider {
          width: 48px;
          height: 2px;
          background: ${S["--warm"]};
          margin: 48px 0;
        }
        .ami-divider--center {
          margin-left: auto;
          margin-right: auto;
        }

        /* ── Story section ── */
        .ami-story {
          background: ${S["--white"]};
        }
        .ami-story__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        .ami-story__img-placeholder {
          aspect-ratio: 4/5;
          background: linear-gradient(135deg, ${S["--green-deep"]} 0%, ${S["--green-mid"]} 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .ami-story__img-text {
          font-family: var(--font-dm-serif), serif;
          font-size: 48px;
          color: rgba(255,255,255,0.15);
          position: absolute;
        }

        /* ── Specialty cards ── */
        .ami-specialties {
          background: ${S["--green-deep"]};
          color: ${S["--white"]};
        }
        .ami-specialties .ami-label { color: ${S["--warm"]}; }
        .ami-specialties .ami-heading { color: ${S["--white"]}; }
        .ami-specialty-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .ami-specialty-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: clamp(24px, 4vw, 36px);
          transition: border-color 0.3s, transform 0.3s;
        }
        .ami-specialty-card:hover {
          border-color: rgba(212, 165, 116, 0.4);
          transform: translateY(-2px);
        }
        .ami-specialty-card__tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: ${S["--warm"]};
          background: rgba(212, 165, 116, 0.12);
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .ami-specialty-card__name {
          font-family: var(--font-dm-serif), serif;
          font-size: clamp(22px, 3vw, 28px);
          color: ${S["--white"]};
          margin-bottom: 6px;
        }
        .ami-specialty-card__desc {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .ami-specialty-card__price {
          font-family: var(--font-dm-serif), serif;
          font-size: 20px;
          color: ${S["--warm"]};
        }

        /* ── Classic menu ── */
        .ami-menu-section {
          background: ${S["--cream"]};
        }
        .ami-menu-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          margin-top: 48px;
        }
        .ami-menu-category {
          margin-bottom: 40px;
        }
        .ami-menu-category__title {
          font-family: var(--font-dm-serif), serif;
          font-size: 20px;
          color: ${S["--green-deep"]};
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(27, 67, 50, 0.12);
        }
        .ami-menu-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0;
        }
        .ami-menu-item__name {
          font-size: 15px;
          font-weight: 500;
          color: ${S["--text-dark"]};
        }
        .ami-menu-item__dots {
          flex: 1;
          border-bottom: 1px dotted rgba(27, 67, 50, 0.15);
          margin: 0 12px;
          min-width: 24px;
          position: relative;
          top: -4px;
        }
        .ami-menu-item__price {
          font-family: var(--font-dm-serif), serif;
          font-size: 15px;
          color: ${S["--green-soft"]};
          flex-shrink: 0;
        }
        .ami-menu-note {
          font-size: 12px;
          color: ${S["--text-muted"]};
          font-style: italic;
          margin-top: 16px;
          line-height: 1.6;
        }

        /* ── Visit ── */
        .ami-visit {
          background: ${S["--white"]};
        }
        .ami-visit__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          margin-top: 48px;
        }
        .ami-visit__map-placeholder {
          aspect-ratio: 1;
          background: ${S["--cream-dark"]};
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(27, 67, 50, 0.08);
        }
        .ami-visit__map-text {
          font-size: 13px;
          color: ${S["--text-muted"]};
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ami-visit__address {
          font-size: 16px;
          color: ${S["--text-dark"]};
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .ami-hours-table {
          width: 100%;
        }
        .ami-hours-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(27, 67, 50, 0.06);
        }
        .ami-hours-row__day {
          font-size: 14px;
          font-weight: 500;
          color: ${S["--text-dark"]};
        }
        .ami-hours-row__time {
          font-size: 14px;
          color: ${S["--text-muted"]};
        }
        .ami-hours-row--closed .ami-hours-row__time {
          color: ${S["--warm-dark"]};
          font-style: italic;
        }

        /* ── Community banner ── */
        .ami-community {
          background: linear-gradient(135deg, ${S["--green-deep"]} 0%, ${S["--green-mid"]} 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ami-community::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(212,165,116,0.1) 0%, transparent 60%);
        }
        .ami-community .ami-heading {
          color: ${S["--white"]};
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .ami-community .ami-body {
          color: rgba(255,255,255,0.6);
          max-width: 480px;
          margin: 0 auto 32px;
        }
        .ami-community .ami-label { color: ${S["--warm"]}; }

        /* ── Footer ── */
        .ami-footer {
          background: ${S["--green-deep"]};
          color: rgba(255,255,255,0.5);
          padding: 60px 24px 32px;
        }
        .ami-footer__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 48px;
        }
        .ami-footer__brand {
          font-family: var(--font-dm-serif), serif;
          font-size: 20px;
          color: ${S["--white"]};
          margin-bottom: 4px;
        }
        .ami-footer__tagline {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .ami-footer__links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
        }
        .ami-footer__links a {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ami-footer__links a:hover { color: ${S["--white"]}; }
        .ami-footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .ami-footer__credit {
          color: rgba(255,255,255,0.25);
        }
        .ami-footer__credit a {
          color: rgba(255,255,255,0.35);
          text-decoration: none;
        }
        .ami-footer__credit a:hover {
          color: ${S["--warm"]};
        }

        /* ── Sticky mobile CTA ── */
        .ami-sticky {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 98;
          padding: 12px 16px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          background: rgba(27, 67, 50, 0.95);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .ami-sticky .ami-btn { width: 100%; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ami-nav__links { display: none; }
          .ami-nav__hamburger { display: block; }
          .ami-sticky { display: block; }
          .ami-story__grid { grid-template-columns: 1fr; }
          .ami-specialty-grid { grid-template-columns: 1fr; }
          .ami-menu-columns { grid-template-columns: 1fr; }
          .ami-visit__grid { grid-template-columns: 1fr; }
          .ami-footer__top { flex-direction: column; gap: 32px; }
          .ami-footer__links { align-items: flex-start; }
          .ami-hero__scroll { display: none; }
          .ami-footer { padding-bottom: 100px; }
        }
      `}</style>

      {/* ════════ NAV ════════ */}
      <nav className={`ami-nav ${scrolled ? "ami-nav--scrolled" : ""}`}>
        <a href="#top" className="ami-nav__logo">
          Amistad Coffee
        </a>
        <div className="ami-nav__links">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="ami-nav__link">
              {l.label}
            </a>
          ))}
        </div>
        <button
          className="ami-nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`ami-hamburger ${menuOpen ? "ami-hamburger--open" : ""}`}
          />
        </button>
      </nav>

      {/* ════════ MOBILE MENU ════════ */}
      {menuOpen && (
        <div className="ami-mobile-menu" onClick={() => setMenuOpen(false)}>
          <div
            className="ami-mobile-menu__inner"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="ami-mobile-menu__link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ════════ HERO ════════ */}
      <section id="top" className="ami-hero">
        <Reveal>
          <p className="ami-hero__greeting">Hola, bienvenidos</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="ami-hero__title">Amistad</h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="ami-hero__subtitle">Coffee Co.</p>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="ami-hero__tagline">Coffee + Conchas &middot; Midtown Atlanta</p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="ami-hero__ctas">
            <a href="#menu" className="ami-btn ami-btn--primary">
              View Menu
            </a>
            <a href="#visit" className="ami-btn ami-btn--outline">
              Find Us
            </a>
          </div>
        </Reveal>
        <div className="ami-hero__scroll">
          <span className="ami-hero__scroll-text">Scroll</span>
          <div className="ami-hero__scroll-line" />
        </div>
      </section>

      {/* ════════ SPECIALTY DRINKS ════════ */}
      <section className="ami-section ami-specialties" id="menu">
        <div className="ami-container">
          <Reveal>
            <p className="ami-label">Signature Drinks</p>
            <h2 className="ami-heading">
              Not Your Average
              <br />
              Coffee Shop.
            </h2>
          </Reveal>
          <div className="ami-specialty-grid">
            {SPECIALTIES.map((drink, i) => (
              <Reveal key={drink.name} delay={i * 0.1}>
                <div className="ami-specialty-card">
                  <span className="ami-specialty-card__tag">{drink.tag}</span>
                  <h3 className="ami-specialty-card__name">{drink.name}</h3>
                  <p className="ami-specialty-card__desc">{drink.desc}</p>
                  <span className="ami-specialty-card__price">{drink.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FULL MENU ════════ */}
      <section className="ami-section ami-menu-section">
        <div className="ami-container">
          <Reveal>
            <p className="ami-label">Full Menu</p>
            <h2 className="ami-heading">
              Café con
              <br />
              Amistad.
            </h2>
          </Reveal>
          <div className="ami-menu-columns">
            <Reveal delay={0.1}>
              <div className="ami-menu-category">
                <h3 className="ami-menu-category__title">Classic Coffee</h3>
                {CLASSICS.map((item) => (
                  <div key={item.name} className="ami-menu-item">
                    <span className="ami-menu-item__name">{item.name}</span>
                    <span className="ami-menu-item__dots" />
                    <span className="ami-menu-item__price">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="ami-menu-category">
                <h3 className="ami-menu-category__title">Tea</h3>
                {TEAS.map((item) => (
                  <div key={item.name} className="ami-menu-item">
                    <span className="ami-menu-item__name">{item.name}</span>
                    <span className="ami-menu-item__dots" />
                    <span className="ami-menu-item__price">{item.price}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="ami-menu-category">
                <h3 className="ami-menu-category__title">Add-Ons</h3>
                {ADDONS.map((item) => (
                  <div key={item.name} className="ami-menu-item">
                    <span className="ami-menu-item__name">{item.name}</span>
                    <span className="ami-menu-item__dots" />
                    <span className="ami-menu-item__price">{item.price}</span>
                  </div>
                ))}
                <p className="ami-menu-note">
                  House made syrups: vanilla, caramel, honey, mocha, strawberry,
                  blueberry
                </p>
              </div>
              <div className="ami-menu-category">
                <h3 className="ami-menu-category__title">Food &amp; Drink</h3>
                <div className="ami-menu-item">
                  <span className="ami-menu-item__name">
                    Pan Dulce / Conchas
                  </span>
                  <span className="ami-menu-item__dots" />
                  <span className="ami-menu-item__price">varies</span>
                </div>
                <div className="ami-menu-item">
                  <span className="ami-menu-item__name">Agua Fresca</span>
                  <span className="ami-menu-item__dots" />
                  <span className="ami-menu-item__price">seasonal</span>
                </div>
                <p className="ami-menu-note">
                  Specialty lattes contain dairy. Oat and almond milk available
                  as substitutes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ OUR STORY ════════ */}
      <section className="ami-section ami-story" id="story">
        <div className="ami-container">
          <div className="ami-story__grid">
            <Reveal>
              <div className="ami-story__img-placeholder">
                <span className="ami-story__img-text">AC</span>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="ami-label">Our Story</p>
              <h2 className="ami-heading">
                Built on
                <br />
                Friendship.
              </h2>
              <div className="ami-divider" />
              <p className="ami-body">
                Amistad means friendship. We opened our doors because we believe
                coffee is better when it&apos;s shared — with your people, your
                neighbors, your community.
              </p>
              <br />
              <p className="ami-body" style={{ color: S["--text-muted"] }}>
                Every drink on our menu is inspired by the flavors we grew up
                with. Horchata from weekend mercados. Mazapán crumbled on the
                kitchen table. Elote from the street cart on the corner. This is
                coffee with soul.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ VISIT ════════ */}
      <section className="ami-section ami-visit" id="visit">
        <div className="ami-container">
          <Reveal>
            <p className="ami-label">Visit Us</p>
            <h2 className="ami-heading">
              Come Say
              <br />
              Hola.
            </h2>
          </Reveal>
          <div className="ami-visit__grid">
            <Reveal delay={0.1}>
              <p className="ami-visit__address">
                1270 W Peachtree St NW
                <br />
                Atlanta, GA 30309
                <br />
                Midtown &middot; Near Arts Center
              </p>
              <div className="ami-hours-table">
                {HOURS.map((h) => (
                  <div
                    key={h.day}
                    className={`ami-hours-row ${h.time === "Closed" ? "ami-hours-row--closed" : ""}`}
                  >
                    <span className="ami-hours-row__day">{h.day}</span>
                    <span className="ami-hours-row__time">{h.time}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="ami-visit__map-placeholder">
                <span className="ami-visit__map-text">
                  Google Maps Embed
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ COMMUNITY CTA ════════ */}
      <section className="ami-section ami-community">
        <div className="ami-container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <p className="ami-label">Join the Community</p>
            <h2 className="ami-heading">
              Your Table
              <br />
              Is Ready.
            </h2>
            <p className="ami-body">
              Follow along on Instagram for new drinks, pop-ups, and everything
              happening at the shop.
            </p>
            <a
              href="https://instagram.com/amistadcoffeeco"
              target="_blank"
              rel="noopener noreferrer"
              className="ami-btn ami-btn--primary"
            >
              Follow @amistadcoffeeco
            </a>
          </Reveal>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="ami-footer">
        <div className="ami-container">
          <div className="ami-footer__top">
            <div>
              <p className="ami-footer__brand">Amistad Coffee Co.</p>
              <p className="ami-footer__tagline">
                Coffee + Conchas &middot; Midtown Atlanta
              </p>
            </div>
            <div className="ami-footer__links">
              <a
                href="https://instagram.com/amistadcoffeeco"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a href="tel:+12053325634">
                (205) 332-5634
              </a>
              <a
                href="https://maps.google.com/?q=1270+W+Peachtree+St+NW+Atlanta+GA+30309"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="ami-footer__bottom">
            <span>&copy; 2026 Amistad Coffee Co.</span>
            <span className="ami-footer__credit">
              Site by{" "}
              <a
                href="https://foundos.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                FoundOS
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ════════ STICKY MOBILE CTA ════════ */}
      <div className="ami-sticky">
        <a href="#visit" className="ami-btn ami-btn--primary">
          Visit Us &middot; Midtown ATL
        </a>
      </div>
    </div>
  );
}
