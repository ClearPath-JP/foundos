"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CAL = "https://cal.com/foundos.ai/strategy-call";
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Scroll-triggered reveal — WQF style (dramatic, staggered) ── */
function Reveal({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale";
}) {
  const variants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
      variants={variants[direction]}
      className={className}
    >{children}</motion.div>
  );
}

/* Staggered children container */
function StaggerContainer({ children, className = "", stagger = 0.1 }: {
  children: React.ReactNode; className?: string; stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger }}
      className={className}
    >{children}</motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.8, ease }}
      className={className}
    >{children}</motion.div>
  );
}

/* Line that draws on scroll */
function DrawLine({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <motion.div
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease }}
      className={className}
      style={{ transformOrigin: vertical ? "top" : "left", background: "linear-gradient(90deg, rgba(100,140,255,0.15), rgba(100,140,255,0.03))" }}
    />
  );
}

/* GlowCard with mouse tracking */
function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const hm = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
  return <div ref={ref} onMouseMove={hm} className={`glow-card ${className}`}>{children}</div>;
}

function Burger({ open }: { open: boolean }) {
  return <div className="w-6 h-5 relative flex flex-col justify-between">
    <motion.span animate={open ? { rotate: 45, y: 8 } : {}} className="block w-full h-[1.5px] bg-white origin-center" transition={{ duration: 0.3 }} />
    <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-full h-[1.5px] bg-white" transition={{ duration: 0.2 }} />
    <motion.span animate={open ? { rotate: -45, y: -8 } : {}} className="block w-full h-[1.5px] bg-white origin-center" transition={{ duration: 0.3 }} />
  </div>;
}

/* Counter that animates on scroll */
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return <span className="tabular-nums">{value}{suffix}</span>;
}

/* Industry cycler */
const IND = ["restaurants", "cafes", "salons", "gyms", "photographers", "contractors"];
function Cycler() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % IND.length), 2200); return () => clearInterval(t); }, []);
  return <AnimatePresence mode="wait">
    <motion.span key={IND[i]} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.5 }} exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.4, ease }} className="absolute left-0 whitespace-nowrap">for {IND[i]}</motion.span>
  </AnimatePresence>;
}

/* ─── Data ────────────────────────────────────────────────────── */
const NAV = [
  { href: "#services", label: "Services" }, { href: "#work", label: "Work" },
  { href: "#process", label: "Process" }, { href: "#about", label: "About" },
];

const PILLARS = [
  { n: "01", title: "Custom Websites", desc: "Designed around your brand and built to convert. Mobile-first, fast, SEO-ready. No templates, no page builders — real code." },
  { n: "02", title: "Professional Photography", desc: "My photographer shoots your space, your food, your team. Real images that make your business look as good online as it does in person." },
  { n: "03", title: "Ongoing Support", desc: "Your business changes. Your site should too. Menu updates, new photos, seasonal content — all handled. You text me directly." },
  { n: "04", title: "Automations & Growth", desc: "Online ordering, booking systems, email capture, review collection, AI chatbots — added when you're ready, not before." },
];

const PORTFOLIO = [
  {
    title: "Sensei App", tag: "SaaS Platform",
    desc: "A complete operating system for independent martial arts and fitness coaches. Video library, client management, scheduling, Stripe billing — one platform replacing five apps.",
    stats: [{ v: "46", l: "Database Tables" }, { v: "150+", l: "API Endpoints" }, { v: "1", l: "Person Built It" }],
    imgs: ["/portfolio/login-final.png", "/portfolio/coach-dashboard.png", "/portfolio/coach-schedule.png", "/portfolio/coach-payments.png"],
  },
  {
    title: "FRAMELOCK", tag: "Client Project", link: "https://shutter-city.vercel.app",
    desc: "A dark, cinematic photography portfolio for a car photographer in Atlanta. Film-inspired design with masonry gallery and tiered pricing. Built and shipped in under two weeks.",
    stats: [{ v: "33", l: "Photos" }, { v: "<2 wk", l: "Build Time" }, { v: "Live", l: "In Production" }],
    imgs: ["/portfolio/framelock-hero.png", "/portfolio/framelock-gallery.png", "/portfolio/framelock-pricing.png", "/portfolio/framelock-mobile.png"],
  },
];

const PROCESS = [
  { n: "01", title: "Free Strategy Call", desc: "You tell me about your business. I tell you honestly what I think you need. No pressure, no sales pitch. Just a real conversation." },
  { n: "02", title: "Design + Build", desc: "I map out the structure, design the site, and build it — you see progress along the way. Nothing launches until you love it." },
  { n: "03", title: "Photography Shoot", desc: "My photographer comes to your space. We shoot the food, the interior, the team. Real photos that make your site feel alive." },
  { n: "04", title: "Launch + Support", desc: "We go live. I handle hosting, updates, and ongoing support. You text me directly — no tickets, no waiting, no gatekeepers." },
];

/* ─── Page ────────────────────────────────────────────────────── */
export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const px = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOp = useTransform(hp, [0, 0.8], [1, 0]);
  const heroY = useTransform(hp, [0, 1], [0, -80]);

  useEffect(() => { if (!navOpen) return; const c = () => setNavOpen(false); window.addEventListener("scroll", c, { passive: true }); return () => window.removeEventListener("scroll", c); }, [navOpen]);

  return (
    <div className="min-h-screen">

      {/* Progress */}
      <motion.div style={{ scaleX: px, transformOrigin: "0%" }} className="fixed top-[64px] left-0 right-0 h-[2px] z-[60]">
        <div className="w-full h-full" style={{ background: "linear-gradient(90deg, #648CFF, #A78BFA)" }} />
      </motion.div>

      {/* ── Nav ─────────────────────────────────────────── */}
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-white/[0.06]" style={{ background: "rgba(10,15,28,0.75)" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <a href="#top" className="text-[14px] font-semibold tracking-[0.18em] uppercase text-shine">FOUNDOS</a>
          <div className="hidden md:flex items-center gap-10 text-[13px] text-white/35">
            {NAV.map(l => <a key={l.label} href={l.href} className="hover:text-white/80 transition-colors duration-400">{l.label}</a>)}
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-white bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full transition-all duration-400">
              Contact
            </a>
          </div>
          <button onClick={() => setNavOpen(v => !v)} className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"><Burger open={navOpen} /></button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }} className="md:hidden overflow-hidden border-b border-white/5" style={{ background: "rgba(10,15,28,0.95)" }}>
              <div className="px-6 py-6 flex flex-col gap-2">
                {NAV.map(l => <a key={l.label} href={l.href} onClick={() => setNavOpen(false)} className="py-3 text-[16px] text-white/70 border-b border-white/5 last:border-0">{l.label}</a>)}
                <a href={CAL} target="_blank" rel="noopener noreferrer" className="mt-4 py-3.5 text-center rounded-full text-[14px] font-semibold bg-white/10 border border-white/10 text-white">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero — WQF style ───────────────────────────── */}
      <section ref={heroRef} id="top" className="relative bg-hero min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[15%] w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #648CFF 0%, transparent 70%)" }} />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)" }} />
          <div className="absolute top-[60%] left-[50%] w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #648CFF 0%, transparent 70%)" }} />
        </div>

        <motion.div style={{ opacity: heroOp, y: heroY }} className="relative text-center px-6 max-w-[1000px]">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-[11px] sm:text-[12px] tracking-[0.3em] uppercase mb-10 text-white/25">
            Web Development &bull; Photography &bull; Atlanta, GA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(36px,7.5vw,82px)] font-bold leading-[1.02] tracking-[-0.035em] mb-8"
          >
            <span className="text-shine">Building Digital Systems</span>
            <br />
            <span className="text-accent-gradient">For Local Businesses</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}
            className="text-[clamp(16px,1.4vw,20px)] font-light leading-[1.75] max-w-[560px] mx-auto text-white/40 mb-4">
            Custom websites and <span className="text-white/70">professional photography</span> for businesses that serve
            their community. <span className="text-white/70">No templates. No agencies.</span>
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="text-[15px] text-white/25 mb-14 h-[1.2em] relative">
            <Cycler />
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-8 py-4 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase bg-white text-[#0A0F1C] hover:shadow-[0_0_40px_rgba(100,140,255,0.2)] transition-all duration-500 min-h-[52px] inline-flex items-center gap-3">
              Book a Strategy Call <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </a>
            <a href="#work" className="group px-8 py-4 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-500 min-h-[52px] inline-flex items-center gap-3">
              View Work <span className="group-hover:translate-x-1 transition-transform duration-300 opacity-50">&rarr;</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Ethos — WQF "Vision matters. Velocity wins." ─── */}
      <section className="bg-section-dark px-6 sm:px-12 py-24 sm:py-32">
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <p className="text-[clamp(28px,4.5vw,56px)] font-bold leading-[1.12] tracking-[-0.025em]">
              <span className="text-shine">Quality matters.</span>{" "}
              <span className="text-accent-gradient">Speed wins.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.85] max-w-[580px] mx-auto mt-8 text-white/35">
              Your business deserves more than a template. I build real digital systems — designed around
              how you work, photographed in your space, and supported long after launch day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 py-16 sm:py-20 border-y border-white/[0.04]" style={{ background: "#0B1020" }}>
        <StaggerContainer className="max-w-[1100px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10 text-center" stagger={0.1}>
          {[
            { v: "$2,000", l: "Starting price" }, { v: "< 3 weeks", l: "Average delivery" },
            { v: "100%", l: "Completion rate" }, { v: "Direct", l: "Access to me" },
          ].map(s => (
            <StaggerItem key={s.l}>
              <p className="text-[clamp(24px,3.5vw,40px)] font-bold tracking-[-0.02em] text-shine">{s.v}</p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-3 text-white/25">{s.l}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Services — WQF 4-pillar grid ─────────────────── */}
      <section id="services" className="bg-navy px-6 sm:px-12" style={{ paddingTop: "clamp(80px,12vw,180px)", paddingBottom: "clamp(80px,12vw,180px)" }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/25 mb-5">What I Build</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] mb-6 max-w-[700px]">
              Everything your business <span className="text-accent-gradient">needs.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] text-white/35 max-w-[520px] mb-16">
              Website, photography, support, and growth tools — all from one person who picks up the phone.
            </p>
          </Reveal>

          <DrawLine className="h-[1px] w-full mb-0" />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {PILLARS.map((p, i) => (
              <StaggerItem key={p.n}>
                <div className={`p-8 sm:p-10 h-full border-b sm:border-b-0 sm:border-r border-white/[0.04] last:border-r-0 hover:bg-white/[0.02] transition-colors duration-500 ${i === 0 ? "" : ""}`}>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-white/15 mb-6">{p.n} / 04</p>
                  <h3 className="text-[clamp(20px,1.6vw,24px)] font-semibold mb-4 leading-[1.2]">{p.title}</h3>
                  <p className="text-[14px] leading-[1.8] text-white/35">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <DrawLine className="h-[1px] w-full mt-0" />
        </div>
      </section>

      {/* ── Portfolio — WQF showcase style ────────────────── */}
      <section id="work" className="bg-section-deeper px-6 sm:px-12" style={{ paddingTop: "clamp(80px,12vw,180px)", paddingBottom: "clamp(80px,12vw,180px)" }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/25 mb-5">Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] mb-6 max-w-[700px]">
              Shipped and <span className="text-shine">running.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] text-white/35 max-w-[520px] mb-16">
              No mockups. Everything here is live in production.
            </p>
          </Reveal>

          <div className="space-y-8">
            {PORTFOLIO.map((p, pi) => (
              <Reveal key={p.title} delay={pi * 0.12} direction="scale">
                <GlowCard className="p-8 sm:p-12">
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full border border-white/[0.08] text-white/30">{p.tag}</span>
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="group font-mono text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-white/60 transition-colors inline-flex items-center gap-2">
                        Live site <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </a>}
                    </div>
                    <h3 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] mb-4">{p.title}</h3>
                    <p className="text-[15px] leading-[1.8] text-white/35 max-w-[620px] mb-10">{p.desc}</p>

                    <div className="flex flex-wrap gap-10 mb-10">
                      {p.stats.map(s => (
                        <div key={s.l}>
                          <p className="text-[clamp(24px,3vw,36px)] font-bold text-shine">{s.v}</p>
                          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-2 text-white/20">{s.l}</p>
                        </div>
                      ))}
                    </div>

                    <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3" stagger={0.08}>
                      {p.imgs.map(src => (
                        <StaggerItem key={src}>
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.04] group">
                            <Image src={src} alt="" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" sizes="300px" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process — WQF numbered steps ──────────────────── */}
      <section id="process" className="bg-section-dark px-6 sm:px-12" style={{ paddingTop: "clamp(80px,12vw,180px)", paddingBottom: "clamp(80px,12vw,180px)" }}>
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/25 mb-5">Process</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] mb-16 max-w-[600px]">
              From first call to <span className="text-accent-gradient">launch day.</span>
            </h2>
          </Reveal>

          <DrawLine className="h-[1px] w-full" />
          <StaggerContainer stagger={0.1}>
            {PROCESS.map(p => (
              <StaggerItem key={p.n}>
                <div className="flex gap-8 py-10 border-b border-white/[0.04] group hover:border-white/[0.08] transition-colors duration-500">
                  <span className="font-mono text-[12px] text-white/15 mt-1.5 shrink-0 tracking-[0.1em]">{p.n}</span>
                  <div>
                    <h3 className="text-[clamp(20px,1.8vw,26px)] font-semibold mb-3">{p.title}</h3>
                    <p className="text-[15px] leading-[1.8] text-white/35 max-w-[550px]">{p.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section className="bg-navy px-6 sm:px-12 py-24 sm:py-32">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/25 mb-8">Pricing</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(36px,5.5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] mb-8">
              Starting at <span className="text-shine">$2,000</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.85] text-white/35 mb-12 max-w-[560px] mx-auto">
              Custom website. Professional photography. Your own domain. SEO setup.
              Mobile-first design. Monthly support from <span className="text-white/60">$150/mo</span>.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <StaggerContainer className="flex flex-wrap justify-center gap-3 mb-14" stagger={0.05}>
              {["Custom design", "Professional photography", "Your domain", "SEO & Google setup", "Mobile-first", "Ongoing support"].map(t => (
                <StaggerItem key={t}>
                  <span className="px-5 py-2.5 text-[12px] font-medium rounded-full border border-white/[0.06] text-white/30 hover:border-white/[0.12] hover:text-white/50 transition-all duration-400">{t}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>
          <Reveal delay={0.3}>
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-8 py-4 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase bg-white text-[#0A0F1C] hover:shadow-[0_0_40px_rgba(100,140,255,0.2)] transition-all duration-500 min-h-[52px] inline-flex items-center gap-3">
              Book a Free Strategy Call <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </a>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-8 text-white/20">Free 30-min call &bull; No commitment</p>
          </Reveal>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section id="about" className="bg-section-deeper px-6 sm:px-12" style={{ paddingTop: "clamp(80px,12vw,180px)", paddingBottom: "clamp(80px,12vw,180px)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 md:gap-20 items-start">
            <Reveal direction="left">
              <div className="relative w-44 h-44 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden mx-auto md:mx-0 border border-white/[0.06]">
                <Image src="/josh.jpg" alt="Josh Potesta" fill className="object-cover" sizes="224px" />
              </div>
            </Reveal>
            <div>
              <Reveal><p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/25 mb-5">Josh Potesta &bull; Atlanta &bull; 19</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] mb-8">
                  I don&apos;t disappear <span className="text-accent-gradient">after launch.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}><p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.85] text-white/35 mb-5">
                Six years in martial arts — training, teaching, watching coaches run their entire business from their phone. I know what it&apos;s like to be a local business owner the tech world left behind.
              </p></Reveal>
              <Reveal delay={0.3}><p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.85] text-white/35 mb-10">
                Restaurants, cafes, salons, contractors — if you serve your community, I build for you.{" "}
                <span className="text-white/70">You text me. I respond.</span> No tickets. No gatekeepers.
              </p></Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <a href={CAL} target="_blank" rel="noopener noreferrer" className="group px-6 py-3.5 rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase border border-white/15 hover:bg-white hover:text-[#0A0F1C] transition-all duration-500 min-h-[48px] inline-flex items-center gap-2">
                    Book a Call <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                  <a href="mailto:hello@foundos.ai" className="px-6 py-3.5 rounded-full text-[13px] font-medium border border-white/8 text-white/30 hover:text-white/50 hover:border-white/15 transition-all duration-400 min-h-[48px] inline-flex items-center">hello@foundos.ai</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA — WQF "Own what's next" style ──────── */}
      <section className="relative bg-hero px-6 sm:px-12" style={{ paddingTop: "clamp(100px,14vw,200px)", paddingBottom: "clamp(120px,16vw,220px)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-[30%] w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #648CFF 0%, transparent 70%)" }} />
          <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-[700px] mx-auto text-center relative">
          <Reveal>
            <h2 className="text-[clamp(36px,6vw,72px)] font-bold leading-[1.02] tracking-[-0.035em] mb-8">
              <span className="text-shine">Let&apos;s build something</span>
              <br />
              <span className="text-accent-gradient">together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] text-white/35 mb-12 max-w-[480px] mx-auto">
              Tell me about your business. No pressure, no commitment. Just a real conversation about what you need and whether I can help.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-10 py-4.5 rounded-full text-[14px] font-semibold tracking-[0.06em] uppercase bg-white text-[#0A0F1C] hover:shadow-[0_0_50px_rgba(100,140,255,0.25)] transition-all duration-500 min-h-[56px] inline-flex items-center gap-3">
              Book Your Free Strategy Call <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </a>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-8 text-white/15">Free 30-min call &bull; No commitment &bull; No pitch</p>
          </Reveal>
        </div>
      </section>

      {/* ── Footer — WQF dark footer ─────────────────────── */}
      <footer className="bg-footer px-6 sm:px-12 py-14 border-t border-white/[0.04]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
            <div>
              <p className="text-[14px] font-semibold tracking-[0.18em] uppercase text-shine">FOUNDOS</p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-2 text-white/20">Custom Websites &bull; Photography &bull; Atlanta</p>
            </div>
            <div className="flex flex-wrap gap-8 text-[13px] text-white/25">
              {NAV.map(l => <a key={l.label} href={l.href} className="hover:text-white/60 transition-colors">{l.label}</a>)}
            </div>
          </div>
          <div className="h-[1px] bg-white/[0.04] mb-8" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-[10px] tracking-[0.1em] text-white/15">&copy; 2026 FoundOS. All rights reserved.</p>
            <div className="flex items-center gap-8 text-[12px] text-white/20">
              <a href="https://instagram.com/foundos.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors min-h-[44px] flex items-center">Instagram</a>
              <a href="https://tiktok.com/@foundos.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors min-h-[44px] flex items-center">TikTok</a>
              <a href="mailto:hello@foundos.ai" className="hover:text-white/50 transition-colors min-h-[44px] flex items-center">hello@foundos.ai</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
