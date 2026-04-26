"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CAL = "https://cal.com/foundos.ai/strategy-call";

/* ─── Bracket Button ─────────────────────────────────────────── */
function BracketBtn({ children, href, dark = false }: { children: React.ReactNode; href: string; dark?: boolean }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="btn-bracket" style={{ color: dark ? "var(--black)" : "var(--white)" }}>
      <span className="btn-bracket__tl" /><span className="btn-bracket__tr" />
      {children}
      <span className="btn-bracket__bl" /><span className="btn-bracket__br" />
    </a>
  );
}

/* ─── Data ────────────────────────────────────────────────────── */
const NAV = [
  { href: "#services", label: "Services" }, { href: "#work", label: "Work" },
  { href: "#process", label: "Process" }, { href: "#about", label: "About" },
];

const FEATURES = [
  { n: "01", title: "Custom Websites", desc: "Built from scratch around your brand. Mobile-first, fast-loading, SEO-ready. Real code, real design — not a template with your name on it.", stat: "Starting at $2K", bg: "var(--black)", color: "var(--white)" },
  { n: "02", title: "Photography", desc: "My photographer comes to your space. We shoot your food, your interior, your team. Real images that make your business look as good online as it does in person.", stat: "Included in build", bg: "var(--teal)", color: "var(--black)" },
  { n: "03", title: "Growth Tools", desc: "Online ordering, booking systems, email capture, Google reviews, AI chatbots. We add what you need, when you need it — not everything at once.", stat: "Add when ready", bg: "var(--orange)", color: "var(--black)" },
  { n: "04", title: "Ongoing Support", desc: "Your menu changes. Your hours shift. Your photos get better. I handle all of it — you text me directly and it gets done. No tickets, no waiting, no agencies.", stat: "$150/mo", bg: "var(--off-white)", color: "var(--black)" },
];

const FOCUS_ITEMS = ["Websites", "Photography", "Restaurants", "Cafes", "Salons", "Gyms", "Contractors", "Automations", "SEO"];

const PORTFOLIO = [
  { title: "Sensei App", tag: "SaaS Platform", desc: "A complete operating system for independent martial arts and fitness coaches. Video library, client management, scheduling, billing — one system replacing five apps.", stats: "46 DB Tables · 150+ Endpoints · Solo Built", link: "" },
  { title: "FRAMELOCK", tag: "Client Project", desc: "Dark, cinematic photography portfolio for a car photographer in Atlanta. Film-inspired design with masonry gallery and tiered pricing. Built and shipped in under two weeks.", stats: "33 Photos · 3 Tiers · Live in Production", link: "https://shutter-city.vercel.app" },
];

const PROCESS = [
  { n: "01", title: "Free Strategy Call", desc: "You tell me about your business. I tell you what I think you need. No pressure, no pitch." },
  { n: "02", title: "Design + Build", desc: "I design and build the site. You see progress along the way. Nothing launches until you love it." },
  { n: "03", title: "Photography Shoot", desc: "My photographer comes to your space. We shoot food, interior, the team. Real photos." },
  { n: "04", title: "Launch + Support", desc: "We go live. I handle hosting, updates, support. You text me — I respond." },
];

/* ─── Page ────────────────────────────────────────────────────── */
export default function Page() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* ── Nav scroll state ──────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Loading overlay ───────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  /* ── Three.js hero particle sphere ─────────────── */
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Fibonacci sphere — responsive particle count
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 800 : 2000;
      const positions = new Float32Array(count * 3);
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        positions[i * 3] = Math.cos(theta) * radius * 2;
        positions[i * 3 + 1] = y * 2;
        positions[i * 3 + 2] = Math.sin(theta) * radius * 2;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        size: 1.8,
        color: 0x888888,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, mat);
      points.position.x = 1.5; // Offset right
      scene.add(points);

      let mouseX = 0, mouseY = 0;
      const onMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
      };
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      };
      window.addEventListener("resize", onResize);

      let targetRotX = 0, targetRotY = 0;
      let animId: number;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        points.rotation.y += 0.0008;
        targetRotY += (mouseX - targetRotY) * 0.02;
        targetRotX += (mouseY - targetRotX) * 0.02;
        points.rotation.y += targetRotY * 0.01;
        points.rotation.x += targetRotX * 0.01;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose(); geo.dispose(); mat.dispose();
      };
    })();

    return () => { if (cleanup) cleanup(); };
  }, []);

  /* ── GSAP ScrollTrigger setup ──────────────────── */
  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero entrance
        gsap.from(".hero-line", {
          y: 80, opacity: 0, duration: 1.2, ease: "power4.out",
          stagger: 0.15, delay: 0.8,
        });
        gsap.from(".hero-bottom", { y: 20, opacity: 0, duration: 1, ease: "power3.out", delay: 1.2 });

        // Ethos section
        gsap.from(".ethos-heading", {
          scrollTrigger: { trigger: ".ethos-section", start: "top 75%" },
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
        });
        gsap.from(".ethos-body", {
          scrollTrigger: { trigger: ".ethos-section", start: "top 75%" },
          y: 40, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.2,
        });

        // Feature cards
        gsap.from(".feature-card", {
          scrollTrigger: { trigger: ".feature-grid", start: "top 80%" },
          y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
          stagger: 0.15,
        });

        // Focus items — scrub opacity
        document.querySelectorAll(".focus-item").forEach((item) => {
          gsap.fromTo(item,
            { opacity: 0.12 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        });

        // Portfolio entrance
        gsap.from(".portfolio-section", {
          scrollTrigger: { trigger: ".portfolio-section", start: "top 75%" },
          y: 40, opacity: 0, duration: 1, ease: "power3.out",
        });

        // Process items
        gsap.from(".process-item", {
          scrollTrigger: { trigger: ".process-section", start: "top 75%" },
          y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
          stagger: 0.12,
        });

        // About
        gsap.from(".about-heading", {
          scrollTrigger: { trigger: ".about-section", start: "top 75%" },
          scale: 0.85, opacity: 0, duration: 1, ease: "power3.out",
        });
        gsap.from(".about-body", {
          scrollTrigger: { trigger: ".about-section", start: "top 70%" },
          y: 30, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.2,
        });

        // CTA card
        gsap.from(".cta-card", {
          scrollTrigger: { trigger: ".cta-card", start: "top 80%" },
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
        });
      });
    })();

    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <>
      {/* ── Loading Overlay ──────────────────────────── */}
      <div className="loader" style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "all", transition: "opacity 0.6s ease" }}>
        <p className="mono" style={{ color: "var(--white)", opacity: 0.3 }}>FOUNDOS</p>
      </div>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className={`nav-bar ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" style={{ textDecoration: "none" }}>
          <div style={{ lineHeight: 1.1 }}>
            <span style={{ display: "block", fontSize: 11, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--white)", opacity: 0.6 }}>Custom Websites</span>
            <span style={{ display: "block", fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em", textTransform: "uppercase", color: "var(--white)" }}>FOUNDOS</span>
          </div>
        </a>
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV.map(l => <a key={l.label} href={l.href} className="nav-link">{l.label}</a>)}
          <BracketBtn href={CAL}>Contact Us</BracketBtn>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section id="top" className="relative bg-black" style={{ height: "100vh", overflow: "hidden" }}>
        <canvas ref={heroCanvasRef} className="scene" />

        <div style={{ position: "absolute", bottom: 180, left: 40, right: 40, zIndex: 1 }}>
          <p className="hero-line heading" style={{ fontSize: "clamp(48px, 9vw, 130px)", color: "var(--white)" }}>
            Building Digital
          </p>
          <p className="hero-line heading" style={{ fontSize: "clamp(48px, 9vw, 130px)", color: "var(--white)" }}>
            Systems
          </p>
          <p className="hero-line heading" style={{ fontSize: "clamp(48px, 9vw, 130px)", color: "var(--white)", textAlign: "right" }}>
            For Local Businesses
          </p>
        </div>

        {/* Bottom bar */}
        <div className="hero-bottom" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 40px", zIndex: 1 }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <BracketBtn href={CAL}>Contact Us</BracketBtn>
            <p className="mono hidden sm:block" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
              Custom websites &bull; Photography &bull; Atlanta, GA
            </p>
            <span className="mono hidden sm:block" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>FOUNDOS.AI</span>
          </div>
        </div>
      </section>

      {/* ── Ethos ───────────────────────────────────────── */}
      <section className="ethos-section bg-light" style={{ minHeight: "100vh", padding: "clamp(80px,12vw,160px) 40px", borderTopLeftRadius: 24, borderTopRightRadius: 24, position: "relative", zIndex: 2, marginTop: -24 }}>
        <div className="ethos-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
          <div>
            <p className="mono" style={{ color: "rgba(17,17,17,0.4)", marginBottom: 24 }}>Our Ethos</p>
            <h2 className="ethos-heading heading" style={{ fontSize: "clamp(36px, 5vw, 72px)", color: "var(--black)" }}>
              Quality Matters.
              <br />
              Speed Wins.
            </h2>
          </div>
          <div className="ethos-body">
            <div style={{ borderTop: "1px solid rgba(17,17,17,0.15)", paddingTop: 32, marginBottom: 32 }} />
            <p className="body-text" style={{ color: "var(--black)", maxWidth: 520, marginBottom: 16 }}>
              Your business deserves more than a template. I build real digital systems — designed around
              how you work, photographed in your space, and supported long after launch day.
            </p>
            <p className="body-text" style={{ color: "rgba(17,17,17,0.6)", maxWidth: 520, marginBottom: 32 }}>
              No agencies. No ticket numbers. No disappearing after launch.
              Just one person who picks up the phone, knows your business,
              and builds exactly what you need.
            </p>
            <BracketBtn href={CAL} dark>Book a Call</BracketBtn>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ───────────────────────────────── */}
      <section id="services" className="feature-grid">
        {FEATURES.map((f, i) => (
          <div key={f.n} className="feature-card" style={{ background: f.bg, color: f.color }}>
            <div style={{ flex: 1, position: "relative", minHeight: 280 }}>
              {/* Decorative gradient */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: `radial-gradient(circle at ${30 + i * 15}% ${40 + i * 10}%, currentColor 0%, transparent 60%)` }} />
            </div>
            <div className="feature-card__content">
              <p className="mono" style={{ marginBottom: 12, opacity: 0.4 }}>{f.n} / 04</p>
              <h3 className="heading" style={{ fontSize: "clamp(22px,2.2vw,30px)", marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.65, marginBottom: 16, textTransform: "none" }}>{f.desc}</p>
              <p className="mono" style={{ opacity: 0.9, fontWeight: 600, fontSize: 12 }}>{f.stat}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Focus / Skills List ──────────────────────────── */}
      <section className="bg-light" style={{ padding: "clamp(100px,14vw,200px) 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <p className="mono" style={{ color: "rgba(17,17,17,0.35)", marginBottom: 16 }}>Our Focus</p>
          <p className="heading" style={{ fontSize: "clamp(20px,3vw,40px)", color: "rgba(17,17,17,0.15)", marginBottom: 60 }}>
            What We Build. Who We Serve.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {FOCUS_ITEMS.map(item => (
              <p key={item} className="focus-item" style={{ fontSize: "clamp(36px, 7vw, 100px)", color: "var(--black)" }}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ───────────────────────────────────── */}
      <section className="portfolio-section bg-light" style={{ padding: "clamp(80px,10vw,160px) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p className="mono" style={{ color: "rgba(17,17,17,0.35)", marginBottom: 16 }}>Portfolio</p>
          <h2 className="heading" style={{ fontSize: "clamp(32px,5vw,64px)", color: "var(--black)", marginBottom: 16 }}>
            Shipped &amp; Running
          </h2>
          <p className="body-text" style={{ color: "rgba(17,17,17,0.6)", maxWidth: 480, marginBottom: 48 }}>
            No mockups. Everything here is live in production.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {PORTFOLIO.map(p => (
              <div key={p.title} style={{ background: "var(--white)", borderRadius: 16, padding: "clamp(32px,4vw,52px)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380 }}>
                <div>
                  <p className="mono" style={{ color: "rgba(17,17,17,0.3)", marginBottom: 20 }}>{p.tag}</p>
                  <h3 className="heading" style={{ fontSize: "clamp(28px,3vw,40px)", color: "var(--black)", marginBottom: 16 }}>{p.title}</h3>
                  <p className="body-text" style={{ color: "rgba(17,17,17,0.6)", fontSize: 15, marginBottom: 20 }}>{p.desc}</p>
                  <p className="mono" style={{ color: "rgba(17,17,17,0.35)", fontSize: 10, letterSpacing: "0.1em" }}>{p.stats}</p>
                </div>
                <div style={{ marginTop: 28, display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {p.link && <BracketBtn href={p.link} dark>View Site</BracketBtn>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Team ────────────────────────────────── */}
      <section className="about-section bg-black" style={{ padding: "clamp(80px,12vw,180px) 40px" }}>
        {/* Marquee */}
        <div style={{ overflow: "hidden", marginBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 16 }}>
          <div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mono" style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, marginRight: 40 }}>
                About &bull; Josh Potesta &bull; Atlanta &bull; 19 Years Old &bull; Martial Arts &bull; Web Development &bull; Photography &bull;&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 className="about-heading heading" style={{ fontSize: "clamp(36px, 7vw, 100px)", color: "var(--white)", marginBottom: 32 }}>
            I Don&apos;t Disappear
            <br />After Launch
          </h2>
          <div className="about-body" style={{ maxWidth: 600, margin: "0 auto" }}>
            <p className="mono" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.8, fontSize: 13, textTransform: "none", letterSpacing: "0.02em" }}>
              Six years in martial arts — training, teaching, watching coaches run their entire business from their phone.
              Restaurants, cafes, salons, contractors — if you serve your community, I build for you.
              You text me. I respond. No tickets. No gatekeepers.
            </p>
            <BracketBtn href={CAL}>Book a Call</BracketBtn>
          </div>
        </div>

        {/* Photo */}
        <div style={{ maxWidth: 200, margin: "60px auto 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Image src="/josh.jpg" alt="Josh Potesta" width={200} height={200} style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(100%)" }} />
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="process-section bg-light" style={{ padding: "clamp(80px,12vw,180px) 40px", borderTopLeftRadius: 24, borderTopRightRadius: 24, position: "relative", zIndex: 2, marginTop: -24 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p className="mono" style={{ color: "rgba(17,17,17,0.35)", marginBottom: 16 }}>Process</p>
          <h2 className="heading" style={{ fontSize: "clamp(32px,5vw,64px)", color: "var(--black)", marginBottom: 48 }}>
            From First Call
            <br />To Launch Day
          </h2>

          <div style={{ borderTop: "1px solid rgba(17,17,17,0.1)" }}>
            {PROCESS.map(p => (
              <div key={p.n} className="process-item" style={{ display: "flex", gap: 32, padding: "32px 0", borderBottom: "1px solid rgba(17,17,17,0.1)" }}>
                <span className="mono" style={{ color: "rgba(17,17,17,0.2)", marginTop: 4, flexShrink: 0 }}>{p.n}</span>
                <div>
                  <h3 className="heading" style={{ fontSize: "clamp(20px,2vw,28px)", color: "var(--black)", marginBottom: 8 }}>{p.title}</h3>
                  <p className="body-text" style={{ color: "rgba(17,17,17,0.55)", fontSize: 14 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Card ────────────────────────────────────── */}
      <section style={{ padding: "0 24px 24px" }}>
        <div className="cta-card cta-grid bg-orange" style={{ borderRadius: 24, padding: "clamp(60px,8vw,120px) clamp(32px,5vw,80px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", minHeight: "60vh" }}>
          <div>
            <h2 className="heading" style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "var(--black)", marginBottom: 20 }}>
              Let&apos;s Build
              <br />Something
              <br />Together
            </h2>
            <p className="mono" style={{ color: "rgba(17,17,17,0.6)", marginBottom: 32, fontSize: 13, textTransform: "none", letterSpacing: "0.02em", maxWidth: 400 }}>
              Book a call, tell me about your business. No pressure, no commitment. Just a conversation about what you need.
            </p>
            <BracketBtn href={CAL} dark>Contact Us</BracketBtn>
          </div>
          <div className="cta-deco" style={{ textAlign: "right" }}>
            <p className="heading" style={{ fontSize: "clamp(80px,12vw,200px)", color: "rgba(17,17,17,0.08)", lineHeight: 0.9 }}>
              F<br />O<br />S
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="bg-black" style={{ padding: "60px 40px 32px" }}>
        <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {NAV.map(l => (
              <a key={l.label} href={l.href} className="heading" style={{ fontSize: "clamp(28px,4vw,48px)", color: "var(--white)", textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <a href="https://instagram.com/foundos.ai" target="_blank" rel="noopener noreferrer" className="mono" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Instagram</a>
            <a href="https://tiktok.com/@foundos.ai" target="_blank" rel="noopener noreferrer" className="mono" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>TikTok</a>
            <a href="mailto:hello@foundos.ai" className="mono" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>hello@foundos.ai</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p className="mono" style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>&copy; 2026 FoundOS. All rights reserved.</p>
          <p className="mono" style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>Site by Josh Potesta</p>
        </div>
      </footer>
    </>
  );
}
