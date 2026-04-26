"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CAL = "https://cal.com/foundos.ai/strategy-call";

/* ─── Palette ─────────────────────────────────────────────────── */
const c = {
  bg: "#0a0a0a",
  text: "#f7f8f8",
  muted: "#8a8f98",
  dim: "#62666d",
  surface: "#111111",
  surfaceUp: "#161617",
  border: "rgba(255,255,255,0.06)",
  glow: "rgba(255,255,255,0.08)",
};

/* ─── Data ────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: "Custom Websites",
    desc: "Built around your brand, not dragged from a template. Mobile-first, fast, designed to convert visitors into customers.",
    tags: ["Next.js", "Tailwind", "SEO", "Mobile-first"],
  },
  {
    title: "Professional Photography",
    desc: "I work with a photographer who shoots your space, food, and products. Real photos make real websites — no stock images.",
    tags: ["Food & interior", "Lifestyle shots", "Brand photography"],
  },
  {
    title: "Monthly Support",
    desc: "Your business changes. Your site should too. Menu updates, new photos, seasonal content — handled. You text me, I respond.",
    tags: ["Content updates", "Direct access", "No tickets"],
  },
  {
    title: "Automations & Add-ons",
    desc: "Online ordering, booking systems, email capture, review collection, AI chatbots — added when you're ready, not before.",
    tags: ["Booking", "Email", "Reviews", "AI"],
  },
];

const PORTFOLIO = [
  {
    title: "Sensei App",
    tag: "SaaS Product",
    desc: "A full platform for independent martial arts and fitness coaches. Video library, client management, scheduling, Stripe billing — one system replacing five apps.",
    stats: [
      { val: "46", label: "Database tables" },
      { val: "150+", label: "API endpoints" },
      { val: "1", label: "Person built it" },
    ],
    images: [
      { src: "/portfolio/login-final.png", label: "Login" },
      { src: "/portfolio/coach-dashboard.png", label: "Dashboard" },
      { src: "/portfolio/coach-schedule.png", label: "Schedule" },
      { src: "/portfolio/coach-payments.png", label: "Payments" },
    ],
  },
  {
    title: "FRAMELOCK",
    tag: "Client Project",
    desc: "A dark, cinematic photography portfolio for a car photographer in Atlanta. Film-inspired design with masonry gallery and tiered pricing.",
    stats: [
      { val: "33", label: "Photos loaded" },
      { val: "<2wk", label: "Build time" },
      { val: "Live", label: "In production" },
    ],
    images: [
      { src: "/portfolio/framelock-hero.png", label: "Hero" },
      { src: "/portfolio/framelock-gallery.png", label: "Gallery" },
      { src: "/portfolio/framelock-pricing.png", label: "Pricing" },
      { src: "/portfolio/framelock-mobile.png", label: "Mobile" },
    ],
    link: "https://shutter-city.vercel.app",
  },
];

const PROCESS = [
  { step: "01", title: "Free strategy call", desc: "You tell me about your business. I tell you what I think you need. No pressure." },
  { step: "02", title: "Design + build", desc: "I create the site, you see progress along the way. Nothing launches until you love it." },
  { step: "03", title: "Photography shoot", desc: "My photographer comes to your space. We shoot the food, the interior, the team. Real photos, not stock." },
  { step: "04", title: "Launch + support", desc: "We go live. I handle hosting, updates, and support. You text me directly — no tickets, no waiting." },
];

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

/* ─── Primitives ─────────────────────────────────────────────── */
function R({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }} className={className}>{children}</motion.div>;
}

function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((w, i) => (
        <motion.span key={`${w}-${i}`} initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.06 }}
          className="mr-[0.28em] inline-block">{w}</motion.span>
      ))}
    </span>
  );
}

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  }, []);
  return <div ref={ref} onMouseMove={handleMouse} className={`glow-card ${className}`}>{children}</div>;
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <motion.span animate={open ? { rotate: 45, y: 8 } : {}} className="block w-full h-[1.5px] bg-white origin-center" transition={{ duration: 0.3 }} />
      <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-full h-[1.5px] bg-white" transition={{ duration: 0.2 }} />
      <motion.span animate={open ? { rotate: -45, y: -8 } : {}} className="block w-full h-[1.5px] bg-white origin-center" transition={{ duration: 0.3 }} />
    </div>
  );
}

function AnimLine({ width = "40%", className = "" }: { width?: string; className?: string }) {
  return (
    <div className={`mx-auto overflow-hidden ${className}`} style={{ maxWidth: width }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1px] origin-left" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
    </div>
  );
}

/* ─── Industry Cycler ─────────────────────────────────────────── */
const INDUSTRIES = ["restaurants", "cafes", "salons", "gyms", "photographers", "contractors", "coaches", "you"];
function IndustryCycler() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx((i) => (i + 1) % INDUSTRIES.length), 2000); return () => clearInterval(t); }, []);
  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom" style={{ width: "clamp(120px, 15vw, 200px)" }}>
      <AnimatePresence mode="wait">
        <motion.span key={INDUSTRIES[idx]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute left-0 text-white/50">
          for {INDUSTRIES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const px = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => { if (!navOpen) return; const cl = () => setNavOpen(false); window.addEventListener("scroll", cl, { passive: true }); return () => window.removeEventListener("scroll", cl); }, [navOpen]);

  return (
    <div className="min-h-screen relative" style={{ background: c.bg, color: c.text }}>

      {/* Progress */}
      <motion.div style={{ scaleX: px, transformOrigin: "0%" }} className="fixed top-16 left-0 right-0 h-[1px] z-50">
        <div className="w-full h-full bg-white/20" />
      </motion.div>

      {/* ── Nav ─────────────────────────────────────────── */}
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg border-b" style={{ background: "rgba(10,10,10,0.85)", borderColor: c.border }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="text-[15px] font-semibold tracking-[0.15em] uppercase">FOUNDOS</a>
          <div className="hidden md:flex items-center gap-8 text-[13px]" style={{ color: c.dim }}>
            {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="hover:text-white transition-colors duration-300">{l.label}</a>)}
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="ml-2 px-5 py-2 rounded-full text-[13px] font-medium bg-white text-black hover:bg-white/90 transition-all">Book a Call</a>
          </div>
          <button onClick={() => setNavOpen((v) => !v)} className="md:hidden p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Menu">
            <Burger open={navOpen} />
          </button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }} className="md:hidden overflow-hidden border-b" style={{ background: "rgba(10,10,10,0.95)", borderColor: c.border }}>
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((l) => <a key={l.label} href={l.href} onClick={() => setNavOpen(false)} className="py-3 text-[16px] border-b border-white/5 last:border-0">{l.label}</a>)}
                <a href={CAL} target="_blank" rel="noopener noreferrer" className="mt-3 py-3.5 text-center rounded-full text-[15px] font-medium bg-white text-black">Book a Call</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section id="top" className="relative min-h-[100svh] flex items-center justify-center px-6 sm:px-10">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.02]"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-[800px] text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono-label mb-8" style={{ color: c.dim }}>
            Web Development &bull; Photography &bull; Atlanta
          </motion.p>

          <motion.h1 className="text-[clamp(40px,8vw,80px)] font-semibold leading-[1.02] tracking-[-0.03em] mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <span className="text-shine">I build websites</span>{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">
              <IndustryCycler />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[clamp(16px,1.5vw,20px)] font-light leading-[1.7] max-w-[560px] mx-auto" style={{ color: c.muted }}>
            Custom websites for local businesses. <span className="text-white/90">No templates.</span> No agencies.
            No ticket numbers. Just a builder in your corner — <span className="text-white/90">with a
            photographer</span> who shoots your space.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-8 py-4 sm:py-3.5 rounded-full text-[14px] font-medium bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all min-h-[48px] inline-flex items-center gap-2">
              Book a Free Call <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <a href="#work" className="group px-8 py-4 sm:py-3.5 rounded-full text-[14px] font-medium border border-white/15 hover:bg-white/5 transition-all min-h-[48px] inline-flex items-center gap-2">
              See My Work <span className="group-hover:translate-x-1 transition-transform" style={{ color: c.dim }}>&rarr;</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ──────────────────────────────────────── */}
      <div className="overflow-hidden py-3 border-y" style={{ borderColor: c.border }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap gap-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[11px] tracking-[0.2em] uppercase" style={{ color: c.dim }}>
              Custom Websites &bull; Professional Photography &bull; Restaurants &bull; Cafes &bull; Salons &bull; Gyms &bull; Contractors &bull; Starting at $2,000 &bull; Atlanta Based &bull;&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Stats ──────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { val: "$2k", label: "Starting price" },
            { val: "<3 wk", label: "Avg delivery" },
            { val: "100%", label: "Completion rate" },
            { val: "Direct", label: "Access to me" },
          ].map((s, i) => (
            <R key={s.label} delay={i * 0.08}>
              <div>
                <p className="text-[clamp(28px,4vw,44px)] font-semibold text-shine">{s.val}</p>
                <p className="font-mono-label mt-2" style={{ color: c.dim }}>{s.label}</p>
              </div>
            </R>
          ))}
        </div>
      </section>

      <AnimLine />

      {/* ── Services ────────────────────────────────────── */}
      <section id="services" className="px-6 sm:px-10" style={{ paddingTop: "clamp(100px,14vw,200px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[1200px] mx-auto">
          <R><p className="font-mono-label mb-4" style={{ color: c.dim }}>What I Do</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-4">
              <WordReveal text="Everything your business" /> <span className="text-gradient">needs.</span>
            </h2>
          </R>
          <R delay={0.2}><p className="text-[clamp(15px,1.2vw,18px)] font-light max-w-[500px] mb-14" style={{ color: c.muted }}>Website, photography, support, and automations — all from one person who actually picks up the phone.</p></R>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <R key={s.title} delay={i * 0.1}>
                <GlowCard className="p-6 sm:p-8 h-full">
                  <div className="relative z-10">
                    <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold mb-3">{s.title}</h3>
                    <p className="text-[14px] leading-[1.75] mb-5" style={{ color: c.muted }}>{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((t) => <span key={t} className="px-3 py-1 text-[11px] tracking-[0.05em] rounded-full border" style={{ borderColor: c.border, color: c.dim }}>{t}</span>)}
                    </div>
                  </div>
                </GlowCard>
              </R>
            ))}
          </div>
        </div>
      </section>

      <AnimLine />

      {/* ── Portfolio ───────────────────────────────────── */}
      <section id="work" className="px-6 sm:px-10" style={{ paddingTop: "clamp(80px,10vw,160px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[1200px] mx-auto">
          <R><p className="font-mono-label mb-4" style={{ color: c.dim }}>Work</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-4">
              <WordReveal text="Real things I've" /> <span className="text-shine">built.</span>
            </h2>
          </R>
          <R delay={0.2}><p className="text-[clamp(15px,1.2vw,18px)] font-light max-w-[500px] mb-14" style={{ color: c.muted }}>No mockups. Everything here is shipped and running in production.</p></R>

          <div className="space-y-8">
            {PORTFOLIO.map((p, pi) => (
              <R key={p.title} delay={pi * 0.15}>
                <GlowCard className="p-6 sm:p-8">
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-[11px] tracking-[0.1em] uppercase rounded-full border" style={{ borderColor: c.border, color: c.dim }}>{p.tag}</span>
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-white transition-colors" style={{ color: c.dim }}>See it live &rarr;</a>}
                    </div>
                    <h3 className="text-[clamp(24px,3vw,36px)] font-semibold mb-3">{p.title}</h3>
                    <p className="text-[15px] leading-[1.7] max-w-[600px] mb-6" style={{ color: c.muted }}>{p.desc}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-8">
                      {p.stats.map((s) => (
                        <div key={s.label}>
                          <p className="text-[clamp(20px,2vw,28px)] font-semibold">{s.val}</p>
                          <p className="text-[12px]" style={{ color: c.dim }}>{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Screenshots */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {p.images.map((img) => (
                        <div key={img.label} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                          <Image src={img.src} alt={img.label} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" sizes="300px" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <p className="absolute bottom-2 left-3 text-[11px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </R>
            ))}
          </div>
        </div>
      </section>

      <AnimLine />

      {/* ── Process ─────────────────────────────────────── */}
      <section id="process" className="px-6 sm:px-10" style={{ paddingTop: "clamp(80px,10vw,160px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[800px] mx-auto">
          <R><p className="font-mono-label mb-4" style={{ color: c.dim }}>Process</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-14">
              <WordReveal text="How it" /> <span className="text-gradient">works.</span>
            </h2>
          </R>

          <div className="space-y-0">
            {PROCESS.map((p, i) => (
              <R key={p.step} delay={i * 0.08}>
                <div className="flex gap-6 py-8 border-b" style={{ borderColor: c.border }}>
                  <span className="text-[clamp(14px,1.2vw,16px)] font-mono tabular-nums shrink-0 mt-1" style={{ color: c.dim }}>{p.step}</span>
                  <div>
                    <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold mb-2">{p.title}</h3>
                    <p className="text-[15px] leading-[1.75]" style={{ color: c.muted }}>{p.desc}</p>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      <AnimLine />

      {/* ── Pricing — single line ────────────────────────── */}
      <section className="px-6 sm:px-10" style={{ paddingTop: "clamp(80px,10vw,160px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[700px] mx-auto text-center">
          <R><p className="font-mono-label mb-4" style={{ color: c.dim }}>Pricing</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6">
              Starting at <span className="text-shine">$2,000</span>
            </h2>
          </R>
          <R delay={0.2}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] mb-10" style={{ color: c.muted }}>
              Custom website, professional photography of your space, your own domain,
              SEO setup, and a site that actually looks like your business.
              Monthly support starts at $150/mo.
            </p>
          </R>
          <R delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["Custom design", "Professional photos", "Your own domain", "SEO & Google setup", "Mobile-first", "Ongoing support"].map((t) => (
                <span key={t} className="px-4 py-2 text-[12px] tracking-[0.05em] rounded-full border" style={{ borderColor: c.border, color: c.muted }}>{t}</span>
              ))}
            </div>
          </R>
          <R delay={0.4}>
            <p className="text-[13px] mb-8" style={{ color: c.dim }}>
              Every project starts with a free call. You don&apos;t pay until we both agree on the plan.
            </p>
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 sm:py-3.5 rounded-full text-[14px] font-medium bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all min-h-[48px] inline-flex items-center">
              Book a Free Strategy Call
            </a>
          </R>
        </div>
      </section>

      <AnimLine />

      {/* ── About ───────────────────────────────────────── */}
      <section id="about" className="px-6 sm:px-10" style={{ paddingTop: "clamp(80px,10vw,160px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16 items-start">
            <R>
              <div className="relative w-40 h-40 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden mx-auto md:mx-0">
                <Image src="/josh.jpg" alt="Josh Potesta" fill className="object-cover" sizes="224px" />
              </div>
            </R>

            <div>
              <R><p className="font-mono-label mb-4" style={{ color: c.dim }}>Josh Potesta &bull; Atlanta &bull; 19</p></R>
              <R delay={0.1}>
                <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6">
                  <WordReveal text="I don't disappear" /> <span className="text-shine">after launch.</span>
                </h2>
              </R>
              <R delay={0.2}>
                <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] mb-4" style={{ color: c.muted }}>
                  I&apos;ve spent 6 years in martial arts — training, teaching, watching coaches
                  run their entire business from their phone. I know what it&apos;s like to be
                  a local business owner who got left behind by the tech world.
                </p>
              </R>
              <R delay={0.3}>
                <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] mb-8" style={{ color: c.muted }}>
                  Restaurants, cafes, salons, contractors, photographers — if you serve
                  your community, I want to build for you. You text me. I respond.
                  No support tickets. No gatekeepers.
                </p>
              </R>
              <R delay={0.4}>
                <div className="flex flex-wrap gap-3">
                  <a href={CAL} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full text-[14px] font-medium border border-white/15 hover:bg-white hover:text-black transition-all min-h-[48px] inline-flex items-center">
                    Book a Call
                  </a>
                  <a href="mailto:hello@foundos.ai"
                    className="px-6 py-3 rounded-full text-[14px] font-medium border border-white/10 hover:border-white/20 transition-all min-h-[48px] inline-flex items-center" style={{ color: c.muted }}>
                    hello@foundos.ai
                  </a>
                </div>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="relative px-6 sm:px-10" style={{ paddingTop: "clamp(80px,10vw,160px)", paddingBottom: "clamp(100px,12vw,180px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />
        <div className="max-w-[600px] mx-auto text-center relative">
          <R>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6">
              <WordReveal text="Let's build something" /> <span className="text-glow text-shine">together.</span>
            </h2>
          </R>
          <R delay={0.2}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.7] mb-10" style={{ color: c.muted }}>
              Book a call, tell me about your business. No pressure, no commitment.
              Just a conversation about what you need.
            </p>
          </R>
          <R delay={0.3}>
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-10 py-4 rounded-full text-[15px] font-medium bg-white text-black hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all min-h-[52px] inline-flex items-center gap-2">
              Book Your Free Strategy Call <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <p className="font-mono-label mt-6" style={{ color: c.dim }}>Free 30-minute call &bull; No commitment</p>
          </R>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="px-6 sm:px-10 py-12 border-t" style={{ borderColor: c.border }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[14px] font-semibold tracking-[0.1em] uppercase">FOUNDOS</p>
            <p className="text-[12px] mt-1" style={{ color: c.dim }}>Custom websites &bull; Atlanta</p>
          </div>
          <div className="flex items-center gap-8 text-[13px]" style={{ color: c.dim }}>
            <a href="https://instagram.com/foundos.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors min-h-[44px] flex items-center">Instagram</a>
            <a href="https://tiktok.com/@foundos.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors min-h-[44px] flex items-center">TikTok</a>
            <a href="mailto:hello@foundos.ai" className="hover:text-white transition-colors min-h-[44px] flex items-center">hello@foundos.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
