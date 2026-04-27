"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   BRAND COLORS
   ═══════════════════════════════════════════════════════════════ */
const C = {
  dark: "#161616",
  green: "#124213",
  greenCta: "#1B4D0D",
  greenActive: "#29941E",
  cream: "#F7F7F7",
  grayBg: "#F6F6F6",
  grayText: "#575757",
  crimson: "#8B1A1A",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "MENU", href: "#menu" },
  { label: "GALLERY", href: "#gallery" },
  { label: "CONTACT", href: "#contact" },
];

const SANDWICHES = [
  { name: "Brisket", price: "$16" },
  { name: "Spicy Korean Pork", price: "$15" },
  { name: "Pulled Pork", price: "$13" },
  { name: "Turkey Breast", price: "$15" },
];

const PLATTERS = [
  { name: "Brisket", price: "$20" },
  { name: "Spicy Korean Pork", price: "$19" },
  { name: "Pulled Pork", price: "$17" },
  { name: "Turkey Breast", price: "$18" },
  { name: "1/2 Chicken", price: "$18" },
];

const WINGS = [{ name: "Pound of Wings", price: "$20" }];

const TACOS = [{ name: "2 Tacos", price: "$12" }];

const REGULAR_SIDES = [
  "BBQ Beans",
  "Collards",
  "Brunswick Stew",
  "Traditional Slaw",
  "Fries",
  "Korean Sweet Potatoes",
  "Kimchi Slaw",
  "Cucumber Radish Salad",
  "Local Kimchi",
  "Sweet & Spicy Tofu",
];

const BY_THE_POUND = [
  { name: "Brisket", price: "$32" },
  { name: "Spicy Korean Pork", price: "$28" },
  { name: "Pulled Pork", price: "$20" },
  { name: "Turkey Breast", price: "$22" },
  { name: "Buns & Pickles", price: "$1.50" },
];

const SAUCES = [
  { name: "Table", desc: "Classic Mild" },
  { name: "Korean", desc: "Sweet Heat" },
  { name: "Kitchen", desc: "Spicy Fresh" },
  { name: "Settler", desc: "Peppery Vinegar" },
];

const AWARDS = [
  { title: "Michelin Bib Gourmand", year: "2023" },
  { title: "Michelin Bib Gourmand", year: "2024" },
  { title: "Michelin Bib Gourmand", year: "2025" },
  { title: "James Beard Semi-Finalist", year: "2020 & 2023" },
];

const HOURS = [
  { day: "Tuesday - Saturday", time: "11 am - 8 pm" },
  { day: "Sunday & Monday", time: "Closed" },
];

const GALLERY_ITEMS = [
  "Smoked Brisket",
  "Korean Pork Tacos",
  "The Pit",
  "Chef Cody & JiJi",
  "Heirloom Exterior",
  "Spicy Korean Wings",
  "Brunswick Stew",
  "The Smoker",
  "Kimchi Slaw",
];

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Reveal>
      <h2
        className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-center mb-4"
        style={{ color: light ? C.dark : C.cream }}
      >
        {children}
      </h2>
      <div
        className="w-16 h-[3px] mx-auto mb-12 md:mb-16"
        style={{ background: C.crimson }}
      />
    </Reveal>
  );
}

function MenuItem({ name, price, delay = 0 }: { name: string; price: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-baseline gap-2 py-3 group">
        <span className="font-[family-name:var(--font-lora)] text-base md:text-lg text-white/90 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="flex-1 border-b border-dotted border-white/20 relative bottom-1" />
        <span className="font-[family-name:var(--font-oswald)] text-base md:text-lg font-semibold text-white/80">
          {price}
        </span>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SMOKE EFFECT
   ═══════════════════════════════════════════════════════════════ */

function SmokeEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: `radial-gradient(circle, ${C.crimson} 0%, transparent 70%)`,
          top: "5%",
          right: "-10%",
          animation: "smokeDrift1 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.035]"
        style={{
          background: `radial-gradient(circle, ${C.green} 0%, transparent 70%)`,
          top: "40%",
          left: "-8%",
          animation: "smokeDrift2 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #4a3728 0%, transparent 70%)",
          bottom: "10%",
          right: "10%",
          animation: "smokeDrift3 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%", background: C.crimson }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60]"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR
   ═══════════════════════════════════════════════════════════════ */

function AnnouncementBar() {
  return (
    <div
      className="w-full py-2.5 text-center z-50 relative"
      style={{ background: C.green }}
    >
      <a
        href="https://olo.spoton.com/5eb427e79adef3c194e5d5cc"
        target="_blank"
        rel="noopener noreferrer"
        className="font-[family-name:var(--font-oswald)] text-xs md:text-sm tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
      >
        Now Open for Online Ordering & Pick Up
        <span className="inline-block ml-2 translate-y-[-1px]">&rarr;</span>
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(22,22,22,0.95)" : "rgba(22,22,22,0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? `1px solid rgba(255,255,255,0.06)`
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="font-[family-name:var(--font-oswald)] text-white font-bold text-lg md:text-xl tracking-[0.12em] uppercase leading-tight"
          >
            Heirloom Market
            <span className="block text-[10px] md:text-xs font-normal tracking-[0.3em] opacity-60">
              BBQ
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                  style={{ background: C.greenActive }}
                />
              </button>
            ))}
            <a
              href="https://olo.spoton.com/5eb427e79adef3c194e5d5cc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.15em] uppercase px-5 py-2.5 text-white transition-all hover:brightness-110"
              style={{ background: C.greenCta }}
            >
              Order Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-white"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-white"
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(22,22,22,0.97)" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => scrollTo(link.href)}
                className="font-[family-name:var(--font-oswald)] text-2xl tracking-[0.25em] text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
              href="https://olo.spoton.com/5eb427e79adef3c194e5d5cc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-oswald)] text-sm tracking-[0.2em] uppercase px-8 py-3 mt-4 text-white"
              style={{ background: C.greenCta }}
            >
              Order Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleWords = ["Heirloom", "Market", "BBQ"];

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: C.dark }}
    >
      {/* Atmospheric background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 40%, rgba(18,66,19,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 30% 60%, rgba(139,26,26,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 70% 30%, rgba(74,55,40,0.15) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Korean name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-lora)] text-sm md:text-base tracking-[0.4em] text-white/40 mb-6"
        >
          &#xC5D0;&#xC5B4;&#xB8F8; &#xB9C8;&#xCF13; &#xBC14;&#xBCA0;&#xD050;
        </motion.p>

        {/* Title — word by word stagger */}
        <h1 className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 mb-8">
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4 + i * 0.15,
              }}
              className="font-[family-name:var(--font-oswald)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider text-white"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-[family-name:var(--font-lora)] italic text-lg md:text-xl text-white/50 mb-4 max-w-xl mx-auto"
        >
          &ldquo;The smallest of places with the biggest of hearts.&rdquo;
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-[family-name:var(--font-oswald)] text-xs md:text-sm tracking-[0.35em] uppercase text-white/30 mb-12"
        >
          Southern BBQ &times; Korean Flavors &mdash; Atlanta, GA
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://olo.spoton.com/5eb427e79adef3c194e5d5cc"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-oswald)] text-sm tracking-[0.2em] uppercase px-8 py-3.5 text-white transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{ background: C.greenCta }}
          >
            Order Pick Up Now &rarr;
          </a>
          <button
            onClick={() =>
              document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-[family-name:var(--font-oswald)] text-sm tracking-[0.2em] uppercase px-8 py-3.5 text-white/80 border border-white/20 hover:border-white/50 hover:text-white transition-all"
          >
            View Menu
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-white/20"
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AWARDS BAR
   ═══════════════════════════════════════════════════════════════ */

function AwardsBar() {
  return (
    <section
      className="py-10 md:py-14 overflow-hidden"
      style={{ background: C.green }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {AWARDS.map((award, i) => (
            <Reveal key={`${award.title}-${award.year}`} delay={i * 0.1}>
              <div className="flex items-center gap-3 group">
                {/* Badge icon */}
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                  style={{
                    borderColor: award.title.includes("Michelin")
                      ? C.crimson
                      : "#C9A84C",
                  }}
                >
                  <span
                    className="font-[family-name:var(--font-oswald)] text-xs md:text-sm font-bold"
                    style={{
                      color: award.title.includes("Michelin")
                        ? C.crimson
                        : "#C9A84C",
                    }}
                  >
                    {award.title.includes("Michelin") ? "M" : "JB"}
                  </span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-oswald)] text-xs md:text-sm tracking-[0.1em] uppercase text-white/90 leading-tight">
                    {award.title}
                  </p>
                  <p className="font-[family-name:var(--font-lora)] text-xs text-white/50">
                    {award.year}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════════════════════ */

function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28" style={{ background: C.dark }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Our Story</SectionHeading>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Text */}
          <Reveal>
            <div>
              {/* Definition */}
              <div className="mb-8 pl-6 border-l-2" style={{ borderColor: C.crimson }}>
                <p className="font-[family-name:var(--font-oswald)] text-lg md:text-xl font-semibold text-white tracking-wide uppercase mb-1">
                  Heirloom{" "}
                  <span className="font-normal text-white/40 text-sm normal-case tracking-wider">
                    [air-loom]
                  </span>
                </p>
                <p className="font-[family-name:var(--font-lora)] italic text-white/50 text-sm md:text-base leading-relaxed">
                  Something of special value handed down from one generation to
                  another. A variety that has survived for centuries due to the
                  efforts of private farmers.
                </p>
              </div>

              <p className="font-[family-name:var(--font-lora)] text-white/70 leading-relaxed mb-4">
                Heirloom Market BBQ is where Southern smoke meets Korean soul.
                Born from the shared passion of two chefs &mdash; one from
                Texas, one from South Korea &mdash; this is a place where
                brisket is slow-smoked with the same devotion as kimchi is
                fermented.
              </p>
              <p className="font-[family-name:var(--font-lora)] text-white/70 leading-relaxed mb-6">
                Simple. Classic. Fresh. Every plate tells a story of two
                cultures, one fire, and a relentless pursuit of flavor.
              </p>
              <p className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.3em] uppercase text-white/30">
                Atlanta, GA &mdash; Est. 2010s
              </p>
            </div>
          </Reveal>

          {/* Image placeholder */}
          <Reveal delay={0.2}>
            <div
              className="aspect-[4/3] rounded-sm overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, #2a1f17 0%, ${C.dark} 100%)`,
              }}
            >
              <div className="text-center">
                <p className="font-[family-name:var(--font-oswald)] text-white/15 text-sm tracking-[0.3em] uppercase">
                  Photo
                </p>
                <p className="font-[family-name:var(--font-lora)] italic text-white/10 text-xs mt-1">
                  Pit & Smoke
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Chef Bios */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <div className="relative pl-6 border-l border-white/10">
              <p
                className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: C.greenActive }}
              >
                Pitmaster
              </p>
              <h3 className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-3">
                Chef Cody Taylor
              </h3>
              <p className="font-[family-name:var(--font-lora)] text-white/60 text-sm leading-relaxed">
                Texas born. Tennessee raised. Atlanta trained. Cody started
                cooking at 15 and never stopped. His pursuit of smoked meat
                perfection has become his hidden treasure &mdash; a lifetime of
                fire and flavor distilled into every cut.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative pl-6 border-l border-white/10">
              <p
                className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: C.greenActive }}
              >
                Chef &amp; Co-Founder
              </p>
              <h3 className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-3">
                Chef Jiyeon Lee &ldquo;JiJi&rdquo;
              </h3>
              <p className="font-[family-name:var(--font-lora)] text-white/60 text-sm leading-relaxed">
                South Korean ex-pat. Former K-pop sensation turned chef. JiJi
                grew up with grilled meats, pickled vegetables, and generations
                of flavor. Trained in Western techniques, she bridges Korean
                heritage with Southern BBQ culture in every dish.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MENU SECTION
   ═══════════════════════════════════════════════════════════════ */

function MenuCategory({
  title,
  subtitle,
  items,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  items: { name: string; price: string }[];
  delay?: number;
}) {
  return (
    <div className="mb-10">
      <Reveal delay={delay}>
        <h3 className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold uppercase tracking-[0.15em] text-white mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="font-[family-name:var(--font-lora)] italic text-white/40 text-sm mb-4">
            {subtitle}
          </p>
        )}
      </Reveal>
      {items.map((item, i) => (
        <MenuItem key={item.name + item.price} name={item.name} price={item.price} delay={delay + i * 0.04} />
      ))}
    </div>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="py-20 md:py-28" style={{ background: C.green }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>The Menu</SectionHeading>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
          {/* Left column */}
          <div>
            <MenuCategory
              title="Sandwiches"
              subtitle="6 oz, on a General Muir Bun, includes 1 side"
              items={SANDWICHES}
            />
            <MenuCategory
              title="Platters"
              subtitle="9 oz, on a General Muir Bun, includes 1 side"
              items={PLATTERS}
              delay={0.1}
            />
            <MenuCategory
              title="Wings"
              subtitle="Our signature sweet and smoky wings"
              items={WINGS}
              delay={0.15}
            />
            <MenuCategory
              title="Tacos"
              subtitle="Choice of smoked meats or crispy tofu, kimchi slaw, jalapenos, cilantro, corn tortilla, KB sauce. +$1 for Brisket"
              items={TACOS}
              delay={0.2}
            />
          </div>

          {/* Right column */}
          <div>
            <MenuCategory
              title="By The Pound"
              subtitle="Sauce included"
              items={BY_THE_POUND}
              delay={0.05}
            />

            {/* Sides */}
            <Reveal delay={0.1}>
              <div className="mb-10">
                <h3 className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold uppercase tracking-[0.15em] text-white mb-1">
                  Sides
                </h3>
                <p className="font-[family-name:var(--font-lora)] italic text-white/40 text-sm mb-4">
                  Individual $5 / Pint $10 / Quart $20
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {REGULAR_SIDES.map((side) => (
                    <span
                      key={side}
                      className="font-[family-name:var(--font-lora)] text-white/70 text-sm"
                    >
                      {side}
                    </span>
                  ))}
                </div>
                <p className="font-[family-name:var(--font-lora)] italic text-white/40 text-xs mt-4">
                  Mac N Cheese &mdash; $6 / $12 / $22
                </p>
              </div>
            </Reveal>

            {/* Sauces */}
            <Reveal delay={0.15}>
              <div className="mb-10">
                <h3 className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold uppercase tracking-[0.15em] text-white mb-4">
                  Our Sauces
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SAUCES.map((sauce) => (
                    <div key={sauce.name} className="py-2">
                      <p className="font-[family-name:var(--font-oswald)] text-sm font-semibold text-white/90 uppercase tracking-wider">
                        {sauce.name}
                      </p>
                      <p className="font-[family-name:var(--font-lora)] italic text-white/40 text-xs">
                        {sauce.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="text-center mt-8">
            <a
              href="https://olo.spoton.com/5eb427e79adef3c194e5d5cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-[family-name:var(--font-oswald)] text-sm tracking-[0.2em] uppercase px-10 py-4 text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              Order Pick Up Now &rarr;
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY SECTION
   ═══════════════════════════════════════════════════════════════ */

function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-28" style={{ background: C.dark }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Gallery</SectionHeading>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_ITEMS.map((label, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div
                className="aspect-square rounded-sm overflow-hidden flex items-center justify-center group cursor-pointer relative"
                style={{
                  background: `linear-gradient(${135 + i * 15}deg, #2a1f17 0%, #1a1410 50%, ${C.dark} 100%)`,
                }}
              >
                <div className="text-center transition-transform duration-500 group-hover:scale-110">
                  <p className="font-[family-name:var(--font-lora)] italic text-white/10 text-xs md:text-sm">
                    {label}
                  </p>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, rgba(18,66,19,0.3) 0%, transparent 60%)`,
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATERING CTA
   ═══════════════════════════════════════════════════════════════ */

function CateringCTA() {
  return (
    <section
      className="py-16 md:py-20"
      style={{
        background: `linear-gradient(135deg, ${C.green} 0%, #0d3310 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <p className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            Events &amp; Catering
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white mb-6">
            Bring Heirloom to You
          </h2>
          <p className="font-[family-name:var(--font-lora)] text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
            From backyard cookouts to corporate events, let us bring the smoke
            and soul of Heirloom Market to your next gathering.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:heirloombbqcatering@gmail.com"
              className="font-[family-name:var(--font-oswald)] text-sm tracking-[0.2em] uppercase px-8 py-3.5 text-white transition-all hover:brightness-110"
              style={{ background: C.greenCta }}
            >
              Get a Catering Quote &rarr;
            </a>
            <a
              href="mailto:info@heirloommarketbbq.com"
              className="font-[family-name:var(--font-oswald)] text-sm tracking-[0.2em] uppercase px-8 py-3.5 text-white/70 border border-white/20 hover:border-white/40 hover:text-white transition-all"
            >
              General Inquiries
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════════════════ */

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: C.grayBg }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading light>Find Us</SectionHeading>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info */}
          <Reveal>
            <div>
              <div className="mb-8">
                <h3
                  className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.25em] uppercase mb-3"
                  style={{ color: C.green }}
                >
                  Address
                </h3>
                <p
                  className="font-[family-name:var(--font-lora)] leading-relaxed"
                  style={{ color: C.grayText }}
                >
                  2243 Akers Mill Rd
                  <br />
                  Atlanta, GA 30339
                </p>
              </div>

              <div className="mb-8">
                <h3
                  className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.25em] uppercase mb-3"
                  style={{ color: C.green }}
                >
                  Hours
                </h3>
                {HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between max-w-xs mb-1">
                    <span
                      className="font-[family-name:var(--font-lora)]"
                      style={{ color: C.grayText }}
                    >
                      {h.day}
                    </span>
                    <span
                      className="font-[family-name:var(--font-oswald)] text-sm tracking-wider"
                      style={{ color: h.time === "Closed" ? C.crimson : C.grayText }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h3
                  className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.25em] uppercase mb-3"
                  style={{ color: C.green }}
                >
                  Phone
                </h3>
                <p style={{ color: C.grayText }}>
                  <a
                    href="tel:7708501008"
                    className="font-[family-name:var(--font-lora)] hover:underline"
                  >
                    770-850-1008
                  </a>
                  <br />
                  <a
                    href="tel:7706122502"
                    className="font-[family-name:var(--font-lora)] hover:underline"
                  >
                    770-612-2502
                  </a>
                </p>
              </div>

              <div>
                <h3
                  className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.25em] uppercase mb-3"
                  style={{ color: C.green }}
                >
                  Email
                </h3>
                <a
                  href="mailto:info@heirloommarketbbq.com"
                  className="font-[family-name:var(--font-lora)] hover:underline"
                  style={{ color: C.grayText }}
                >
                  info@heirloommarketbbq.com
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.15}>
            <div className="aspect-square md:aspect-auto md:h-full min-h-[350px] rounded-sm overflow-hidden">
              <iframe
                title="Heirloom Market BBQ Location"
                src="https://www.google.com/maps?q=2243+Akers+Mill+Rd+Atlanta+GA+30339&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-12 md:py-16" style={{ background: C.dark }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 mb-12">
          {/* Brand */}
          <div>
            <p className="font-[family-name:var(--font-oswald)] text-white font-bold text-lg tracking-[0.12em] uppercase mb-2">
              Heirloom Market BBQ
            </p>
            <p className="font-[family-name:var(--font-lora)] italic text-white/30 text-sm">
              Southern BBQ. Korean Soul.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <a
              href="https://olo.spoton.com/5eb427e79adef3c194e5d5cc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
            >
              Online Ordering
            </a>
            <a
              href="mailto:heirloombbqcatering@gmail.com"
              className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
            >
              Catering
            </a>
            <a
              href="https://olo.spoton.com/5eb427e79adef3c194e5d5cc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
            >
              Gift Cards
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <a
              href="https://instagram.com/heirloommarketbbq"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/heirloommarketbbq"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-oswald)] text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-lora)] text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Heirloom Market BBQ. All rights
            reserved.
          </p>
          <p className="font-[family-name:var(--font-lora)] text-white/15 text-xs">
            Built by{" "}
            <a
              href="https://foundos.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white/50 transition-colors"
            >
              FoundOS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function HeirloomPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main className="relative" style={{ background: C.dark, color: C.cream }}>
      <SmokeEffect />
      <ScrollProgress />
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <AwardsBar />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <CateringCTA />
      <ContactSection />
      <Footer />

      {/* Global keyframes for smoke animation */}
      <style>{`
        @keyframes smokeDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.1); }
          66% { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes smokeDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.05); }
          66% { transform: translate(-30px, 50px) scale(0.9); }
        }
        @keyframes smokeDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, -25px) scale(1.15); }
        }
      `}</style>
    </main>
  );
}
