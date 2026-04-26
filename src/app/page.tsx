"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CAL = "https://cal.com/foundos.ai/strategy-call";

/* ─── 3D Particle Field (Three.js) ────────────────────────────── */
function AnimBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamic import to avoid SSR issues
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 3;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Particle system — 2000 particles in 3D space
      const count = 2000;
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const speeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 8;      // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;  // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;  // z
        scales[i] = Math.random() * 0.5 + 0.5;
        speeds[i] = Math.random() * 0.5 + 0.2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      // Custom shader material for soft glowing points
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: `
          uniform float uTime;
          varying float vOpacity;
          void main() {
            vec3 pos = position;
            // Gentle wave motion
            pos.y += sin(pos.x * 1.5 + uTime * 0.4) * 0.1;
            pos.x += cos(pos.z * 1.2 + uTime * 0.3) * 0.08;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            // Size attenuation (closer = bigger)
            float size = 2.5 * (1.0 / -mvPosition.z);
            gl_PointSize = max(size, 0.5);

            // Depth-based opacity (closer = brighter)
            float depth = smoothstep(8.0, 1.0, -mvPosition.z);
            vOpacity = depth * 0.6;
          }
        `,
        fragmentShader: `
          varying float vOpacity;
          void main() {
            // Circular soft point
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Mouse tracking
      let mouseX = 0, mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", onMouseMove);

      // Resize handler
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // Animation loop
      const clock = new THREE.Clock();
      let animId: number;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Slow rotation + mouse reactivity
        particles.rotation.y = elapsed * 0.05 + mouseX * 0.15;
        particles.rotation.x = elapsed * 0.03 + mouseY * 0.1;

        material.uniforms.uTime.value = elapsed;

        renderer.render(scene, camera);
      };

      animate();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => { if (cleanup) cleanup(); };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

/* ─── Primitives ─────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

function R({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease, delay }} className={className}>{children}</motion.div>;
}

function WordReveal({ text, className = "" , delay = 0 }: { text: string; className?: string; delay?: number }) {
  return <span className={`inline-flex flex-wrap ${className}`}>{text.split(" ").map((w, i) => (
    <motion.span key={`${w}-${i}`} initial={{ opacity: 0, y: 14, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, ease, delay: delay + i * 0.06 }} className="mr-[0.28em] inline-block">{w}</motion.span>
  ))}</span>;
}

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const hm = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
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

/* ─── Industry Cycler ─────────────────────────────────────────── */
const IND = ["restaurants", "cafes", "salons", "gyms", "photographers", "contractors", "coaches"];
function Cycler() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % IND.length), 2200); return () => clearInterval(t); }, []);
  return <span className="inline-block relative h-[1.15em] overflow-hidden align-bottom" style={{ minWidth: "clamp(130px,16vw,220px)" }}>
    <AnimatePresence mode="wait">
      <motion.span key={IND[i]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 0.5 }} exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.4, ease }} className="absolute left-0 whitespace-nowrap">for {IND[i]}</motion.span>
    </AnimatePresence>
  </span>;
}

/* ─── Data ────────────────────────────────────────────────────── */
const PILLARS = [
  { title: "Custom Websites", desc: "Designed around your brand. Mobile-first, fast, built to convert — not dragged from a template library." },
  { title: "Professional Photography", desc: "My photographer shoots your space, food, and team. Real images that make your site feel alive." },
  { title: "Ongoing Support", desc: "Menu updates, new photos, seasonal changes — handled. You text me directly. No tickets." },
  { title: "Automations & Add-ons", desc: "Online ordering, booking, email capture, review collection, AI — added when you're ready." },
];

const PORTFOLIO = [
  {
    title: "Sensei App", tag: "SaaS Product",
    desc: "A full platform for independent coaches. Video library, client management, scheduling, billing — one system replacing five apps.",
    stats: [{ v: "46", l: "DB tables" }, { v: "150+", l: "Endpoints" }, { v: "1", l: "Builder" }],
    imgs: ["/portfolio/login-final.png", "/portfolio/coach-dashboard.png", "/portfolio/coach-schedule.png", "/portfolio/coach-payments.png"],
  },
  {
    title: "FRAMELOCK", tag: "Client Project", link: "https://shutter-city.vercel.app",
    desc: "A dark, cinematic photography portfolio for a car photographer in Atlanta. Masonry gallery, tiered pricing, built in under 2 weeks.",
    stats: [{ v: "33", l: "Photos" }, { v: "<2wk", l: "Build time" }, { v: "Live", l: "Production" }],
    imgs: ["/portfolio/framelock-hero.png", "/portfolio/framelock-gallery.png", "/portfolio/framelock-pricing.png", "/portfolio/framelock-mobile.png"],
  },
];

const PROCESS = [
  { n: "01", t: "Free Strategy Call", d: "You tell me about your business. I tell you what I think you need. No pressure, no pitch." },
  { n: "02", t: "Design + Build", d: "I create the site. You see progress along the way. Nothing launches until you love it." },
  { n: "03", t: "Photography Shoot", d: "My photographer comes to your space. We shoot food, interior, the team. Real photos." },
  { n: "04", t: "Launch + Support", d: "We go live. I handle hosting, updates, support. You text me — I respond." },
];

const NAV = [
  { href: "#pillars", label: "Services" }, { href: "#work", label: "Work" },
  { href: "#process", label: "Process" }, { href: "#about", label: "About" },
];

/* ─── Page ────────────────────────────────────────────────────── */
export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const px = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  useEffect(() => { if (!navOpen) return; const cl = () => setNavOpen(false); window.addEventListener("scroll", cl, { passive: true }); return () => window.removeEventListener("scroll", cl); }, [navOpen]);

  return (
    <div className="min-h-screen relative" style={{ color: "#f7f8f8" }}>
      <AnimBg />

      {/* Progress bar */}
      <motion.div style={{ scaleX: px, transformOrigin: "0%" }} className="fixed top-16 left-0 right-0 h-[1px] z-50"><div className="w-full h-full bg-white/20" /></motion.div>

      {/* ── Nav ─────────────────────────────────────────── */}
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg border-b border-white/[0.06]" style={{ background: "rgba(10,10,10,0.8)" }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="text-[15px] font-semibold tracking-[0.15em] uppercase text-shine">FOUNDOS</a>
          <div className="hidden md:flex items-center gap-8 text-[13px] text-white/40">
            {NAV.map((l) => <a key={l.label} href={l.href} className="hover:text-white transition-colors duration-300">{l.label}</a>)}
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="ml-2 px-5 py-2 rounded-full text-[13px] font-medium bg-white text-black hover:bg-white/90 transition-all">Book a Call &rarr;</a>
          </div>
          <button onClick={() => setNavOpen((v) => !v)} className="md:hidden p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"><Burger open={navOpen} /></button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-b border-white/5" style={{ background: "rgba(10,10,10,0.95)" }}>
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV.map((l) => <a key={l.label} href={l.href} onClick={() => setNavOpen(false)} className="py-3 text-[16px] border-b border-white/5 last:border-0">{l.label}</a>)}
                <a href={CAL} target="_blank" rel="noopener noreferrer" className="mt-3 py-3.5 text-center rounded-full text-[15px] font-medium bg-white text-black">Book a Call</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero — WorldQuant style: big statement, centered ─── */}
      <section id="top" className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-6 sm:px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }}>
          <p className="font-mono-label mb-8 text-white/30">Web Development &bull; Photography &bull; Atlanta</p>

          <h1 className="text-[clamp(40px,8.5vw,90px)] font-bold leading-[1.0] tracking-[-0.04em] mb-6 max-w-[900px]">
            <span className="text-shine">Building Digital Systems</span>
            <br />
            <span className="text-gradient">For Local Businesses</span>
          </h1>

          <p className="text-[clamp(16px,1.5vw,20px)] font-light leading-[1.7] max-w-[520px] mx-auto text-white/50 mb-4">
            Custom websites and professional photography for businesses that serve their community. <span className="text-bright">No templates. No agencies.</span> Just a builder in your corner.
          </p>

          <p className="text-[clamp(15px,1.3vw,18px)] font-light text-white/30 mb-12"><Cycler /></p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-8 py-4 sm:py-3.5 rounded-full text-[14px] font-medium bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all min-h-[48px] inline-flex items-center gap-2">
              Book a Free Strategy Call <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <a href="#work" className="group px-8 py-4 sm:py-3.5 rounded-full text-[14px] font-medium border border-white/15 hover:bg-white/5 transition-all min-h-[48px] inline-flex items-center gap-2 text-white/70">
              See My Work <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Everything below: solid bg */}
      <div className="relative z-10" style={{ background: "#0a0a0a" }}>

      {/* ── Ethos — WorldQuant "Vision matters. Velocity wins." style ── */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 border-y border-white/[0.06]">
        <div className="max-w-[900px] mx-auto text-center">
          <R>
            <p className="text-[clamp(24px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.02em]">
              <span className="text-bright text-shine">Quality matters.</span>{" "}
              <span className="text-gradient">Speed wins.</span>
            </p>
          </R>
          <R delay={0.15}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] max-w-[600px] mx-auto mt-6 text-white/40">
              Your business deserves more than a template. I build real systems — designed around how you work, photographed in your space, and supported after launch.
            </p>
          </R>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { v: "$2k", l: "Starting price" }, { v: "<3 wk", l: "Avg delivery" },
            { v: "100%", l: "Completion rate" }, { v: "Direct", l: "Access to me" },
          ].map((s, i) => (
            <R key={s.l} delay={i * 0.08}>
              <p className="text-[clamp(28px,4vw,44px)] font-bold text-shine">{s.v}</p>
              <p className="font-mono-label mt-2 text-white/30">{s.l}</p>
            </R>
          ))}
        </div>
      </section>

      {/* ── Pillars — WorldQuant 4-feature grid ──────────── */}
      <section id="pillars" className="px-6 sm:px-10" style={{ paddingTop: "clamp(60px,8vw,120px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[1200px] mx-auto">
          <R><p className="font-mono-label mb-4 text-white/30">What I Build</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] mb-14">
              <WordReveal text="Everything your business" /> <span className="text-gradient">needs.</span>
            </h2>
          </R>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white/[0.06] rounded-2xl overflow-hidden">
            {PILLARS.map((p, i) => (
              <R key={p.title} delay={i * 0.08}>
                <div className="p-8 sm:p-10 bg-[#0f0f0f] hover:bg-[#131313] transition-colors duration-500 h-full">
                  <p className="font-mono-label mb-4 text-white/20">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-[clamp(20px,1.8vw,26px)] font-semibold mb-3">{p.title}</h3>
                  <p className="text-[15px] leading-[1.75] text-white/40">{p.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ───────────────────────────────────── */}
      <section id="work" className="px-6 sm:px-10" style={{ paddingTop: "clamp(60px,8vw,120px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[1200px] mx-auto">
          <R><p className="font-mono-label mb-4 text-white/30">Work</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] mb-14">
              <WordReveal text="Shipped and" /> <span className="text-shine">running.</span>
            </h2>
          </R>

          <div className="space-y-6">
            {PORTFOLIO.map((p, pi) => (
              <R key={p.title} delay={pi * 0.1}>
                <GlowCard className="p-6 sm:p-10">
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="font-mono-label px-3 py-1 rounded-full border border-white/[0.08] text-white/30">{p.tag}</span>
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="group font-mono-label text-white/30 hover:text-white transition-colors inline-flex items-center gap-1">
                        Live site <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </a>}
                    </div>
                    <h3 className="text-[clamp(26px,3.5vw,40px)] font-bold mb-3">{p.title}</h3>
                    <p className="text-[15px] leading-[1.75] text-white/40 max-w-[600px] mb-8">{p.desc}</p>

                    <div className="flex flex-wrap gap-8 mb-8">
                      {p.stats.map((s) => (
                        <div key={s.l}>
                          <p className="text-[clamp(22px,2.5vw,32px)] font-bold text-shine">{s.v}</p>
                          <p className="font-mono-label mt-1 text-white/25">{s.l}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {p.imgs.map((src, ii) => (
                        <motion.div key={src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }} transition={{ duration: 0.5, delay: ii * 0.08 }}
                          className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-white/[0.06]">
                          <Image src={src} alt="" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" sizes="300px" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────── */}
      <section id="process" className="px-6 sm:px-10" style={{ paddingTop: "clamp(60px,8vw,120px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[800px] mx-auto">
          <R><p className="font-mono-label mb-4 text-white/30">Process</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] mb-14">
              <WordReveal text="How it" /> <span className="text-gradient">works.</span>
            </h2>
          </R>

          {PROCESS.map((p, i) => (
            <R key={p.n} delay={i * 0.06}>
              <div className="flex gap-6 py-8 border-b border-white/[0.06] group hover:border-white/[0.12] transition-colors">
                <span className="font-mono-label text-white/15 mt-1 shrink-0">{p.n}</span>
                <div>
                  <h3 className="text-[clamp(18px,1.5vw,22px)] font-semibold mb-2 group-hover:text-shine transition-all">{p.t}</h3>
                  <p className="text-[15px] leading-[1.75] text-white/40">{p.d}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>

      {/* ── Pricing — single bold statement ───────────────── */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 border-y border-white/[0.06]">
        <div className="max-w-[700px] mx-auto text-center">
          <R><p className="font-mono-label mb-6 text-white/30">Pricing</p></R>
          <R delay={0.1}>
            <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.02em] mb-6">
              Starting at <span className="text-shine">$2,000</span>
            </h2>
          </R>
          <R delay={0.2}>
            <p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] text-white/40 mb-10">
              Custom website. Professional photography of your space. Your own domain. SEO setup. Mobile-first. Monthly support from <span className="text-bright">$150/mo.</span>
            </p>
          </R>
          <R delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["Custom design", "Professional photos", "Your domain", "SEO setup", "Mobile-first", "Ongoing support"].map((t) => (
                <span key={t} className="px-4 py-2 text-[12px] font-medium rounded-full border border-white/[0.08] text-white/30">{t}</span>
              ))}
            </div>
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-8 py-4 sm:py-3.5 rounded-full text-[14px] font-medium bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all min-h-[48px] inline-flex items-center gap-2">
              Book a Free Strategy Call <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <p className="font-mono-label mt-6 text-white/20">Free 30-min call &bull; No commitment</p>
          </R>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section id="about" className="px-6 sm:px-10" style={{ paddingTop: "clamp(80px,10vw,160px)", paddingBottom: "clamp(80px,10vw,160px)" }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16 items-start">
            <R><div className="relative w-40 h-40 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden mx-auto md:mx-0 border border-white/[0.06]">
              <Image src="/josh.jpg" alt="Josh Potesta" fill className="object-cover" sizes="224px" />
            </div></R>
            <div>
              <R><p className="font-mono-label mb-4 text-white/30">Josh Potesta &bull; Atlanta &bull; 19</p></R>
              <R delay={0.1}>
                <h2 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                  <WordReveal text="I don't disappear" /> <span className="text-shine">after launch.</span>
                </h2>
              </R>
              <R delay={0.2}><p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] text-white/40 mb-4">
                Six years in martial arts — training, teaching, watching coaches run entire businesses from their phones. I know what it&apos;s like to be a local business owner the tech world forgot about.
              </p></R>
              <R delay={0.3}><p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.8] text-white/40 mb-8">
                Restaurants, cafes, salons, contractors, photographers — if you serve your community, I want to build for you. <span className="text-bright">You text me. I respond.</span> No tickets. No gatekeepers.
              </p></R>
              <R delay={0.4}>
                <div className="flex flex-wrap gap-3">
                  <a href={CAL} target="_blank" rel="noopener noreferrer" className="group px-6 py-3 rounded-full text-[14px] font-medium border border-white/15 hover:bg-white hover:text-black transition-all min-h-[48px] inline-flex items-center gap-2">
                    Book a Call <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                  <a href="mailto:hello@foundos.ai" className="px-6 py-3 rounded-full text-[14px] font-medium border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all min-h-[48px] inline-flex items-center">hello@foundos.ai</a>
                </div>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="relative px-6 sm:px-10" style={{ paddingTop: "clamp(80px,10vw,160px)", paddingBottom: "clamp(100px,12vw,180px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.02) 0%, transparent 60%)" }} />
        <div className="max-w-[600px] mx-auto text-center relative">
          <R><h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.02em] mb-6">
            <WordReveal text="Let's build something" /> <span className="text-glow text-shine">together.</span>
          </h2></R>
          <R delay={0.2}><p className="text-[clamp(15px,1.2vw,18px)] font-light leading-[1.7] text-white/40 mb-10">
            Tell me about your business. No pressure, no commitment. Just a conversation about what you need.
          </p></R>
          <R delay={0.3}>
            <a href={CAL} target="_blank" rel="noopener noreferrer"
              className="group px-10 py-4 rounded-full text-[15px] font-medium bg-white text-black hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all min-h-[52px] inline-flex items-center gap-2">
              Book Your Free Strategy Call <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <p className="font-mono-label mt-6 text-white/20">Free 30-min call &bull; No commitment</p>
          </R>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="px-6 sm:px-10 py-12 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div><p className="text-[14px] font-semibold tracking-[0.1em] uppercase text-shine">FOUNDOS</p>
            <p className="text-[12px] mt-1 text-white/25">Custom websites &bull; Atlanta</p></div>
          <div className="flex items-center gap-8 text-[13px] text-white/25">
            <a href="https://instagram.com/foundos.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors min-h-[44px] flex items-center">Instagram</a>
            <a href="https://tiktok.com/@foundos.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors min-h-[44px] flex items-center">TikTok</a>
            <a href="mailto:hello@foundos.ai" className="hover:text-white transition-colors min-h-[44px] flex items-center">hello@foundos.ai</a>
          </div>
        </div>
      </footer>

      </div>{/* end solid-bg */}
    </div>
  );
}
