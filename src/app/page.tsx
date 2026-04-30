"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

const CAL = "https://cal.com/foundos.ai/strategy-call";

/* ─── Scroll Reveal (CSS transitions, no heavy libs) ─── */
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
      { threshold: 0.1 }
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Dot Grid Background (lightweight canvas) ───── */
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    const DOT_SPACING = 32;
    const DOT_RADIUS = 1;
    const INFLUENCE = 120;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(devicePixelRatio, 2);
      ctx.scale(Math.min(devicePixelRatio, 2), Math.min(devicePixelRatio, 2));
    };
    resize();

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    const onLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / DOT_SPACING) + 1;
      const rows = Math.ceil(h / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / INFLUENCE);

          const radius = DOT_RADIUS + proximity * 2.5;
          const alpha = 0.12 + proximity * 0.6;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-grid" />;
}

/* ─── Data ───────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

const PROJECTS = [
  {
    title: "Heirloom Market BBQ",
    tag: "Restaurant",
    desc: "Michelin Bib Gourmand BBQ with Southern and Korean roots. Full menu, gallery, catering, and online ordering.",
    link: "/demo/heirloom",
    external: false,
  },
  {
    title: "Babygirl",
    tag: "Restaurant & Bar",
    desc: "Upscale brunch and cocktail spot in East Lake. Seasonal menu tabs, photo gallery, and walk-in details.",
    link: "/demo/babygirl",
    external: false,
  },
  {
    title: "Banshee",
    tag: "Fine Dining",
    desc: "Michelin Bib Gourmand restaurant in East Atlanta Village. Seasonal New American fare with Resy reservations.",
    link: "https://banshee-atl.com",
    external: true,
  },
  {
    title: "Clahvay",
    tag: "Dance & Fitness",
    desc: "Cuban dance studio with video hero, instructor bios, festival schedule, and class booking system.",
    link: "https://clahvay.com",
    external: true,
  },
  {
    title: "Station 11",
    tag: "Neighborhood Cafe",
    desc: "Caribbean-influenced cafe in a historic firehouse. Breakfast, lunch, wok, and coffee bar with warm cafe aesthetic.",
    link: "#",
    external: false,
  },
  {
    title: "MF Phone Repair",
    tag: "Local Service",
    desc: "Phone repair shop with multi-location support, service pricing, reviews, and trust signals.",
    link: "https://www.mfphonerepair.com",
    external: true,
  },
  {
    title: "FRAMELOCK",
    tag: "Photography",
    desc: "Dark, cinematic portfolio for an Atlanta car photographer. Masonry gallery with tiered pricing.",
    link: "https://shutter-city.vercel.app",
    external: true,
  },
  {
    title: "Sensei App",
    tag: "SaaS Platform",
    desc: "Operating system for independent martial arts and fitness coaches. Client management, scheduling, billing \u2014 one platform.",
    link: "#",
    external: false,
  },
];

const SERVICES = [
  {
    title: "Custom Website",
    desc: "Designed and built from scratch around your brand. No templates. Mobile-first, fast, and yours.",
  },
  {
    title: "Professional Photography",
    desc: "My photographer comes to your space. We shoot your food, your interior, your team. Real images, not stock.",
  },
  {
    title: "Monthly Support",
    desc: "Menu changes, hour updates, new photos \u2014 you text me, it gets done. No tickets. No waiting.",
  },
  {
    title: "Growth Tools",
    desc: "Online ordering, Google reviews, email capture, SEO. Added when you\u2019re ready, not forced upfront.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "We Talk",
    desc: "15-minute call. You tell me about your business. I tell you what I\u2019d build. Free, no pressure.",
  },
  {
    n: "02",
    title: "We Build + Shoot",
    desc: "I design and build your site while my photographer shoots your space. You see progress the whole way.",
  },
  {
    n: "03",
    title: "You Launch",
    desc: "We go live. I handle hosting, updates, and support. You run your business \u2014 I keep your site running.",
  },
];

/* ─── Page ───────────────────────────────────────── */
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowSticky(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Nav ─────────────────────────────────── */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#top" className="nav__logo">FOUNDOS</a>
        <div className="nav__links">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav__link">{l.label}</a>
          ))}
          <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
            Book a Call
          </a>
        </div>
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? "hamburger--open" : ""}`} />
        </button>
      </nav>

      {/* ── Mobile Menu Overlay ─────────────────── */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu__inner" onClick={(e) => e.stopPropagation()}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="mobile-menu__link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={CAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ marginTop: 16 }}
            >
              Book a Free Call
            </a>
          </div>
        </div>
      )}

      {/* ── Hero ────────────────────────────────── */}
      <section id="top" className="hero">
        <DotGrid />
        <div className="hero__content">
          <p className="mono hero__label">Web Design + Photography &mdash; Atlanta, GA</p>
          <h1 className="heading hero__title">
            Websites That<br />Fill Tables.
          </h1>
          <p className="hero__sub">
            Custom websites and professional photography for restaurants,
            cafes, and bars that take their food seriously.
          </p>
          <div className="hero__ctas">
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn">
              Book a Free Call
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

      {/* ── Work ────────────────────────────────── */}
      <section id="work" className="section">
        <div className="container">
          <Reveal>
            <p className="mono section__label">Work</p>
            <h2 className="heading section__title">
              {PROJECTS.length} Projects.<br />All Real.
            </h2>
          </Reveal>

          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="work-card">
                <div className="work-card__inner">
                  <p className="mono work-card__tag">{p.tag}</p>
                  <h3 className="heading work-card__title">{p.title}</h3>
                  <p className="work-card__desc">{p.desc}</p>
                  {p.link !== "#" ? (
                    <a
                      href={p.link}
                      target={p.external ? "_blank" : undefined}
                      rel={p.external ? "noopener noreferrer" : undefined}
                      className="work-card__link"
                    >
                      View Site <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : (
                    <span className="work-card__link work-card__link--muted">
                      Coming Soon
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────── */}
      <section id="services" className="section section--alt">
        <div className="container">
          <Reveal>
            <p className="mono section__label">What You Get</p>
            <h2 className="heading section__title">
              Everything Your<br />Business Needs Online.
            </h2>
          </Reveal>

          <div className="services-list">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="service-item">
                <div className="service-item__number mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="service-item__title">{s.title}</h3>
                  <p className="service-item__desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="mono section__label">How It Works</p>
            <h2 className="heading section__title">
              Three Steps.<br />That&apos;s It.
            </h2>
          </Reveal>

          <div className="process-list">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="process-step">
                <span className="process-step__n mono">{s.n}</span>
                <div>
                  <h3 className="process-step__title">{s.title}</h3>
                  <p className="process-step__desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────── */}
      <section className="section section--alt pricing">
        <div className="container pricing__inner">
          <Reveal>
            <p className="mono section__label">Pricing</p>
            <h2 className="heading pricing__number">Starting at $2,000</h2>
            <p className="pricing__includes">
              Custom design. Professional photography. Your own domain.
            </p>
            <p className="pricing__retainer">
              $150/mo for hosting, updates, and direct support.
            </p>
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn">
              Book a Free Call
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── About ───────────────────────────────── */}
      <section id="about" className="section">
        <div className="container about">
          <Reveal className="about__photo-wrap">
            <Image
              src="/josh.jpg"
              alt="Josh Potesta"
              width={280}
              height={280}
              className="about__photo"
            />
          </Reveal>
          <Reveal delay={0.15} className="about__text">
            <p className="mono section__label">About</p>
            <h2 className="heading about__heading">
              I Don&apos;t Disappear<br />After Launch.
            </h2>
            <p className="about__bio">
              I&apos;m Josh &mdash; 19, based in Atlanta. Six years in martial arts
              taught me how small businesses actually run. Restaurants, cafes, salons,
              contractors &mdash; if you serve your community, I build for you.
            </p>
            <p className="about__bio about__bio--dim">
              You text me. I respond. No tickets. No gatekeepers. No agencies.
              Just one person who knows your business and keeps your site running.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────── */}
      <section className="section cta-final">
        <div className="container cta-final__inner">
          <Reveal>
            <h2 className="heading cta-final__title">
              Let&apos;s Build<br />Something.
            </h2>
            <p className="cta-final__sub">
              Book a free call. Tell me about your business. No pressure,
              no commitment &mdash; just a conversation about what you need.
            </p>
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn--lg">
              Book a Free Call
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="footer">
        <div className="container footer__top">
          <div>
            <p className="heading footer__brand">FOUNDOS</p>
            <p className="mono footer__tagline">Custom websites for local businesses.</p>
          </div>
          <div className="footer__links">
            <a href="https://instagram.com/foundos.ai" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com/@foundos.ai" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="mailto:hello@foundos.ai">hello@foundos.ai</a>
          </div>
        </div>
        <div className="container">
          <div className="footer__bottom">
            <p className="mono">&copy; 2026 FoundOS</p>
            <p className="mono">Atlanta, GA</p>
          </div>
        </div>
      </footer>

      {/* ── Sticky Mobile CTA ───────────────────── */}
      <div className={`sticky-cta ${showSticky ? "sticky-cta--show" : ""}`}>
        <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn sticky-cta__btn">
          Book a Free Call
        </a>
      </div>
    </>
  );
}
