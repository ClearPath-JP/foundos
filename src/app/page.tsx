"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import Image from "next/image";

const CAL = "https://cal.com/foundos.ai/strategy-call";
const PHONE = "4704898838"; // JP's number for text CTA
const TEXT_MSG = "Hey Josh — I need a website.";
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

/* ─── Dot Grid Background ────────────────────────── */
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

/* ─── Portfolio Carousel ─────────────────────────── */
function Carousel({ projects }: { projects: typeof PROJECTS }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const touchStartRef = useRef(0);

  const count = projects.length;

  const goTo = useCallback(
    (idx: number) => {
      setActive(((idx % count) + count) % count);
    },
    [count]
  );

  // Auto-rotate every 4s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 4000);
  }, [count]);

  const next = useCallback(() => {
    goTo(active + 1);
    resetTimer();
  }, [active, goTo, resetTimer]);

  const prev = useCallback(() => {
    goTo(active - 1);
    resetTimer();
  }, [active, goTo, resetTimer]);

  const p = projects[active];

  return (
    <div className="carousel">
      {/* Screenshot display */}
      <div
        className="carousel__viewport"
        onTouchStart={(e) => {
          touchStartRef.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const diff = touchStartRef.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
          }
        }}
      >
        {/* Arrows */}
        <button
          className="carousel__arrow carousel__arrow--left"
          onClick={prev}
          aria-label="Previous project"
        >
          &larr;
        </button>
        <button
          className="carousel__arrow carousel__arrow--right"
          onClick={next}
          aria-label="Next project"
        >
          &rarr;
        </button>

        {/* Image */}
        <div className="carousel__img-wrap">
          {projects.map((proj, i) => (
            <div
              key={proj.title}
              className="carousel__slide"
              style={{
                opacity: i === active ? 1 : 0,
                zIndex: i === active ? 1 : 0,
              }}
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                className="carousel__img"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Browser chrome overlay */}
        <div className="carousel__chrome">
          <div className="carousel__dots-chrome">
            <span />
            <span />
            <span />
          </div>
          <div className="carousel__url">{p.url}</div>
        </div>
      </div>

      {/* Info bar */}
      <div className="carousel__info">
        <div className="carousel__meta">
          <p className="mono carousel__tag">{p.tag}</p>
          <h3 className="heading carousel__title">{p.title}</h3>
          <p className="carousel__desc">{p.desc}</p>
        </div>
        <div className="carousel__actions">
          <a
            href={p.link}
            target={p.external ? "_blank" : undefined}
            rel={p.external ? "noopener noreferrer" : undefined}
            className="btn btn--sm"
          >
            View Site
          </a>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="carousel__pips">
        {projects.map((proj, i) => (
          <button
            key={proj.title}
            className={`carousel__pip ${i === active ? "carousel__pip--active" : ""}`}
            onClick={() => {
              goTo(i);
              resetTimer();
            }}
            aria-label={`View ${proj.title}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

const PROJECTS = [
  {
    title: "Heirloom BBQ",
    tag: "Restaurant",
    desc: "Wood-fired barbecue spot. Full menu, catering info, and location details with an earthy, fire-inspired palette.",
    link: "https://heirloom-bbq.vercel.app",
    external: true,
    image: "/portfolio/heirloom.png",
    url: "heirloombbq.com",
  },
  {
    title: "FRAMELOCK",
    tag: "Photography",
    desc: "Dark, cinematic portfolio for an Atlanta car photographer. Masonry gallery with tiered pricing.",
    link: "https://shutter-city.vercel.app",
    external: true,
    image: "/portfolio/framelock.png",
    url: "framelock.co",
  },
  {
    title: "Babygirl",
    tag: "Bar & Lounge",
    desc: "Upscale brunch and cocktail spot in East Lake. Seasonal menu tabs, photo gallery, and walk-in details.",
    link: "/demo/babygirl",
    external: false,
    image: "/portfolio/babygirl.png",
    url: "babygirlatl.com",
  },
  {
    title: "Clahvay",
    tag: "Barbershop",
    desc: "Premium barbershop with online booking, service menu, and brand photography. Clean, modern, mobile-first.",
    link: "https://clahvay.vercel.app",
    external: true,
    image: "/portfolio/clahvay.png",
    url: "clahvay.com",
  },
  {
    title: "Amistad Coffee",
    tag: "Coffee Shop",
    desc: "Latin-inspired cafe in Midtown. Menu, hours, and story page designed to match their warm, community energy.",
    link: "https://amistad-coffee.vercel.app",
    external: true,
    image: "/portfolio/amistad.png",
    url: "amistadcoffee.com",
  },
  {
    title: "Station 11",
    tag: "Café",
    desc: "Caribbean-Asian café in a historic Midtown firehouse. Menu, reservations, and interior photography.",
    link: "https://station11-atl.vercel.app",
    external: true,
    image: "/portfolio/station11.png",
    url: "station11atl.com",
  },
];

const SERVICES = [
  {
    title: "Custom Website",
    desc: "Designed and built from scratch around your brand. No templates. Mobile-first, fast, and 100% yours.",
  },
  {
    title: "Professional Photography",
    desc: "My photographer comes to your space. We shoot your product, your interior, your team. Real images, not stock.",
  },
  {
    title: "Monthly Support",
    desc: "Content changes, updates, new photos \u2014 you text me, it gets done. No tickets. No waiting.",
  },
  {
    title: "Growth Tools",
    desc: "Booking systems, Google reviews, email capture, SEO. Added when you\u2019re ready, not forced upfront.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "You Text Me",
    desc: "Tell me about your business. I\u2019ll tell you exactly what I\u2019d build. No forms. No waiting.",
  },
  {
    n: "02",
    title: "I Build It",
    desc: "Custom site designed and coded in days, not months. You see progress and give feedback the whole way.",
  },
  {
    n: "03",
    title: "You Go Live",
    desc: "Your site launches on your own domain. I handle hosting, updates, and support. You own everything.",
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Nav ─────────────────────────────────── */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#top" className="nav__logo">
          FOUNDOS
        </a>
        <div className="nav__links">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
          <a
            href={TEXT_LINK}
            className="btn btn--sm"
          >
            Text Me
          </a>
        </div>
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          />
        </button>
      </nav>

      {/* ── Mobile Menu ────────────────────────── */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div
            className="mobile-menu__inner"
            onClick={(e) => e.stopPropagation()}
          >
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
              href={TEXT_LINK}
              className="btn"
              style={{ marginTop: 16 }}
            >
              Text Me
            </a>
          </div>
        </div>
      )}

      {/* ── Hero ────────────────────────────────── */}
      <section id="top" className="hero">
        <DotGrid />
        <div className="hero__content">
          <p className="mono hero__label">
            Custom Web Design &mdash; Atlanta, GA
          </p>
          <h1 className="heading hero__title">
            Your Website.
            <br />
            Live This Week.
          </h1>
          <p className="hero__sub">
            Custom-built websites for local businesses. No templates. No
            agencies. You talk directly to the person who builds it.
          </p>
          <div className="hero__ctas">
            <a
              href={TEXT_LINK}
              className="btn"
            >
              Text Me
            </a>
            <a href="#work" className="btn btn--ghost">
              See the Work
            </a>
          </div>
          <p className="mono hero__response">
            I reply in minutes. Yes, really.
          </p>
        </div>
        <div className="hero__scroll">
          <span className="mono">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── Work (Carousel) ─────────────────────── */}
      <section id="work" className="section">
        <div className="container">
          <Reveal>
            <p className="mono section__label">Work</p>
            <h2 className="heading section__title">
              Real Work.
              <br />
              Real Businesses.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Carousel projects={PROJECTS} />
          </Reveal>
        </div>
      </section>

      {/* ── Services ────────────────────────────── */}
      <section id="services" className="section section--alt">
        <div className="container">
          <Reveal>
            <p className="mono section__label">What You Get</p>
            <h2 className="heading section__title">
              Everything Your
              <br />
              Business Needs Online.
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
              Three Steps.
              <br />
              That&apos;s It.
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
            <h2 className="heading pricing__number">$2,000</h2>
            <p className="pricing__includes">
              Custom design. Professional photography. Your own domain.
              <br />
              Live in days, not months.
            </p>
            <p className="pricing__retainer">
              + $150/mo for hosting, updates, and direct support.
            </p>
            <p className="pricing__ownership mono">
              You own your code. You own your domain. No lock-in.
            </p>
            <div className="hero__ctas" style={{ marginTop: "2rem" }}>
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
          </Reveal>
        </div>
      </section>

      {/* ── About ───────────────────────────────── */}
      <section id="about" className="section">
        <div className="container about">
          <Reveal className="about__photo-wrap">
            <Image
              src="/josh.jpg"
              alt="Josh Poteat"
              width={280}
              height={280}
              className="about__photo"
            />
          </Reveal>
          <Reveal delay={0.15} className="about__text">
            <p className="mono section__label">About</p>
            <h2 className="heading about__heading">
              One Person.
              <br />
              No Handoffs.
            </h2>
            <p className="about__bio">
              I&apos;m Josh &mdash; a web developer in Atlanta. I build
              custom websites for local businesses using the same tools agencies
              use, at a fraction of the cost. You work directly with me &mdash;
              the same person who designs, builds, and maintains your site.
            </p>
            <p className="about__bio about__bio--dim">
              No account managers. No junior devs. No surprise invoices. You
              text me, I respond in minutes. Your site stays fast, secure, and
              up to date &mdash; every single month.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────── */}
      <section className="section cta-final">
        <div className="container cta-final__inner">
          <Reveal>
            <h2 className="heading cta-final__title">
              Ready for a
              <br />
              Real Website?
            </h2>
            <p className="cta-final__sub">
              Text me what your business does. I&apos;ll tell you exactly what
              I&apos;d build &mdash; no pressure, no commitment. If it makes
              sense, your site can be live this week.
            </p>
            <div className="hero__ctas">
              <a href={TEXT_LINK} className="btn btn--lg">
                Text Me Now
              </a>
              <a
                href={CAL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                Or Book a Call
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="footer">
        <div className="container footer__top">
          <div>
            <p className="heading footer__brand">FOUNDOS</p>
            <p className="mono footer__tagline">
              Custom websites. Built fast. Owned by you.
            </p>
          </div>
          <div className="footer__links">
            <a
              href="https://instagram.com/foundos.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@foundos.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
            <a href="mailto:josh@foundos.ai">josh@foundos.ai</a>
          </div>
        </div>
        <div className="container">
          <div className="footer__bottom">
            <p className="mono">&copy; 2026 FoundOS</p>
            <div style={{ display: "flex", gap: 24 }}>
              <a
                href="/privacy"
                className="mono"
                style={{ color: "var(--text-dim)", textDecoration: "none" }}
              >
                Privacy
              </a>
              <p className="mono">Atlanta, GA</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Sticky Mobile CTA ───────────────────── */}
      <div className={`sticky-cta ${showSticky ? "sticky-cta--show" : ""}`}>
        <a
          href={TEXT_LINK}
          className="btn sticky-cta__btn"
        >
          Text Me
        </a>
      </div>
    </>
  );
}
