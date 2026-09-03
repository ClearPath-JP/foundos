'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CAL, EMAIL, brand, problem, steps, services, agentMessages,
  integrations, pricing, trust, about, closing,
} from '../content';

/* Direction — "Velvet": near-black + violet + gold, "elite studio".
   Inspired by the hand-crafted, gamified-studio feel of themamboguild.com,
   held to foundos' brand (violet primary = the business card, gold = the warm
   accent that keeps it from reading like generic AI-SaaS). Mobile-first.
   No fake terminal, no "AI" theatrics — concrete services, real outcomes,
   a real founder. Shared truth (offer, pricing, steps) comes from content.ts. */

const V = {
  eyebrow: 'The done-for-you system for local business',
  h1a: 'I make your business run itself.',
  h1b: 'So you get your life back.',
  sub: 'Your website, your bookings, your follow-ups, even your phone — I build them into one system that runs while you sleep. Any local business, from the studio on the corner to the brand ready to scale.',
  ctaPrimary: 'Book a 20-min call',
  ctaSecondary: 'See how it works',
  reassure: "No pitch. No commitment. I'll tell you honestly if it's a fit.",
  whoFor: ['Studios', 'Restaurants', 'Salons', 'Clinics', 'Shops', 'Contractors', 'Growing brands'],
  trustLabel: 'Works with the tools you already pay for',
  buildKicker: 'What I build',
  buildTitle: 'Everything your business needs — built and run for you',
  buildSub: 'Take what you need. It all runs from one place, and I set it up for you.',
  doesKicker: 'While you sleep',
  doesTitle: 'The kind of work it does without you',
  doesSub: 'Quietly, every day, it does the follow-ups you never get to — the ones that keep customers coming back and revenue climbing.',
  vision: 'The owners who systemize win. The ones stuck doing it all by hand get left behind.',
};

const ICON = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Line icons for the "what I build" services grid (mirrors the 6 services).
const SERVICE_ICONS = [
  <svg key="web" {...ICON}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  <svg key="cal" {...ICON}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  <svg key="phone" {...ICON}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  <svg key="star" {...ICON}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  <svg key="pin" {...ICON}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  <svg key="grid" {...ICON}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>,
];

// Line icons for the "what it does while you sleep" outcome cards.
const OUTCOME_ICONS = [
  <svg key="m" {...ICON}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  <svg key="d" {...ICON}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  <svg key="t" {...ICON}><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>,
  <svg key="r" {...ICON}><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
];

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Entrance reveal — pure CSS so content is ALWAYS visible at rest, even with
// no JS / a JS error / a browser that skips the animation. No scroll-observer
// to get stuck on. Staggered via animation-delay.
const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div className={className ? `vel-rev ${className}` : 'vel-rev'} style={delay ? { animationDelay: `${delay}s` } : undefined}>
    {children}
  </div>
);

export default function Velvet() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="vel-root">
      <style>{CSS}</style>

      {/* background field — near-black, violet glow, a warm gold ember, fine grid, grain */}
      <div aria-hidden className="vel-bg">
        <span className="vel-glow vel-glow-v" />
        <span className="vel-glow vel-glow-g" />
        <div className="vel-grid" />
        <div className="vel-vignette" />
      </div>
      <div aria-hidden className="vel-grain" />

      {/* nav */}
      <nav className="vel-nav">
        <div className="vel-wrap vel-nav-inner">
          <span className="vel-logo">
            <span className="vel-logo-mark" />
            {brand.name}<span className="vel-logo-dot">{brand.tld}</span>
          </span>
          <div className="vel-nav-links">
            <a href="#trap">Why</a>
            <a href="#system">System</a>
            <a href="#build">What I build</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="vel-nav-right">
            <a href={CAL} className="vel-btn vel-btn-sm">Book a call</a>
            <button className="vel-nav-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="vel-mobile-menu">
            <a href="#trap" onClick={() => setMenuOpen(false)}>Why</a>
            <a href="#system" onClick={() => setMenuOpen(false)}>System</a>
            <a href="#build" onClick={() => setMenuOpen(false)}>What I build</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href={CAL} className="vel-btn vel-btn-sm vel-mobile-cta" onClick={() => setMenuOpen(false)}>Book a call</a>
          </div>
        )}
      </nav>

      <main>
        {/* hero */}
        <section className="vel-hero vel-wrap">
          <p className="vel-eyebrow vel-rise" style={{ animationDelay: '0s' }}>
            <span className="vel-eyebrow-dot" />{V.eyebrow}
          </p>
          <h1 className="vel-h1 vel-rise" style={{ animationDelay: '.06s' }}>
            {V.h1a}<br />
            <span className="vel-grad">{V.h1b}</span>
          </h1>
          <p className="vel-sub vel-rise" style={{ animationDelay: '.14s' }}>{V.sub}</p>
          <div className="vel-cta-row vel-rise" style={{ animationDelay: '.2s' }}>
            <a href={CAL} className="vel-btn vel-btn-lg">{V.ctaPrimary} →</a>
            <a href="#system" className="vel-btn vel-btn-ghost vel-btn-lg">{V.ctaSecondary}</a>
          </div>
          <p className="vel-reassure vel-rise" style={{ animationDelay: '.26s' }}>{V.reassure}</p>
          <div className="vel-whofor vel-rise" style={{ animationDelay: '.32s' }}>
            {V.whoFor.map((w, i) => (
              <React.Fragment key={w}>
                {i > 0 && <span className="vel-whofor-sep" />}
                <span className="vel-whofor-item">{w}</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="vel-wrap">
          {/* industry chooser — the funnel */}
          <section className="vel-section">
            <div className="vel-section-head">
              <p className="vel-kicker">Which are you?</p>
              <h2 className="vel-h2">Built for your world</h2>
              <p className="vel-p vel-section-sub">Pick your industry and I&apos;ll show you exactly how I&apos;d grow it — the systems, the math, the whole plan.</p>
            </div>
            <div className="vel-chooser">
              <a href="/studios" className="vel-choice vel-choice-live">
                <span className="vel-choice-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.2" /><path d="M12 7.5v6M12 10.5l-4 3M12 10.5l4 3M9 21l3-4 3 4" /></svg></span>
                <span className="vel-choice-name">Studios</span>
                <span className="vel-choice-tag">Dance · Yoga · Fitness</span>
                <span className="vel-choice-cta">See how I grow it →</span>
              </a>
              <span className="vel-choice vel-choice-soon">
                <span className="vel-choice-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M7 3v9M4 3v4a3 3 0 0 0 6 0V3M7 12v9M17 3c-1.7 0-3 2-3 5s1.3 4 3 4v9" /></svg></span>
                <span className="vel-choice-name">Restaurants</span>
                <span className="vel-choice-tag">Ordering · Catering · Phone</span>
                <span className="vel-choice-soon-tag">Coming soon</span>
              </span>
              <span className="vel-choice vel-choice-soon">
                <span className="vel-choice-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" /></svg></span>
                <span className="vel-choice-name">Salons</span>
                <span className="vel-choice-tag">Booking · Reviews · Rebook</span>
                <span className="vel-choice-soon-tag">Coming soon</span>
              </span>
              <span className="vel-choice vel-choice-soon">
                <span className="vel-choice-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></svg></span>
                <span className="vel-choice-name">Shops</span>
                <span className="vel-choice-tag">Storefront · Sales · Loyalty</span>
                <span className="vel-choice-soon-tag">Coming soon</span>
              </span>
            </div>
          </section>

          {/* trust strip */}
          <section className="vel-trust-strip">
            <p className="vel-trust-strip-label">{V.trustLabel}</p>
            <div className="vel-chips">
              {integrations.map((t) => <span key={t} className="vel-chip">{t}</span>)}
            </div>
          </section>

          {/* the trap */}
          <section id="trap" className="vel-section">
            <Reveal className="vel-panel vel-trap">
              <p className="vel-kicker">The trap</p>
              <h2 className="vel-h2">{problem.title}</h2>
              {problem.body.map((b, i) => <p key={i} className="vel-p">{b}</p>)}
              <p className="vel-punch">{problem.punch}</p>
              <p className="vel-fix">{problem.fix}</p>
            </Reveal>
          </section>

          {/* how it works */}
          <section id="system" className="vel-section">
            <Reveal className="vel-section-head">
              <p className="vel-kicker">How it works</p>
              <h2 className="vel-h2">Four steps to a business that runs itself</h2>
            </Reveal>
            <div className="vel-grid-2">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.06} className="vel-panel vel-step">
                  <span className="vel-step-n">{s.n}</span>
                  <h3 className="vel-step-title">{s.title}</h3>
                  <p className="vel-step-short">{s.short}</p>
                  <p className="vel-step-body">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* what I build — concrete services (replaces the old AI console) */}
          <section id="build" className="vel-section">
            <Reveal className="vel-section-head">
              <p className="vel-kicker">{V.buildKicker}</p>
              <h2 className="vel-h2">{V.buildTitle}</h2>
              <p className="vel-p vel-section-sub">{V.buildSub}</p>
            </Reveal>
            <div className="vel-services">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 0.05} className="vel-panel vel-service">
                  <span className="vel-service-ico">{SERVICE_ICONS[i % SERVICE_ICONS.length]}</span>
                  <h3 className="vel-service-title">{s.title}</h3>
                  <p className="vel-service-body">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* what it does while you sleep — honest outcome cards, no terminal */}
          <section className="vel-section">
            <Reveal className="vel-section-head">
              <p className="vel-kicker">{V.doesKicker}</p>
              <h2 className="vel-h2">{V.doesTitle}</h2>
              <p className="vel-p vel-section-sub">{V.doesSub}</p>
            </Reveal>
            <div className="vel-does">
              {agentMessages.map((m, i) => (
                <Reveal key={i} delay={(i % 2) * 0.06} className="vel-doescard">
                  <span className="vel-doescard-ico">{OUTCOME_ICONS[i % OUTCOME_ICONS.length]}</span>
                  <p className="vel-doescard-text">{m.text}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* about */}
          <section id="about" className="vel-section">
            <Reveal className="vel-panel vel-about">
              <div className="vel-about-photo">
                <Image src={about.photo} alt="Josh, founder of foundos.ai" fill sizes="210px" className="vel-about-img" />
                <span className="vel-about-ring" />
              </div>
              <div className="vel-about-copy">
                <p className="vel-kicker">The builder</p>
                <h2 className="vel-h2">Hey, I&apos;m {about.name}.</h2>
                {about.lines.map((l, i) => <p key={i} className="vel-p">{l}</p>)}
                <p className="vel-about-kicker">{about.kicker}</p>
                <p className="vel-hand">{about.signoff}</p>
              </div>
            </Reveal>
          </section>

          {/* why now — founding-client trust */}
          <section className="vel-section">
            <Reveal className="vel-section-head">
              <p className="vel-kicker">{trust.eyebrow}</p>
              <h2 className="vel-h2">{trust.title}</h2>
              <span className="vel-scarcity"><span className="vel-scarcity-dot" />{trust.scarcity}</span>
              <p className="vel-p vel-section-sub">{trust.sub}</p>
            </Reveal>
            <div className="vel-promises">
              {trust.promises.map((pr, i) => (
                <Reveal key={pr.title} delay={i * 0.05} className="vel-panel vel-promise">
                  <span className="vel-promise-check"><Check /></span>
                  <h3 className="vel-promise-title">{pr.title}</h3>
                  <p className="vel-promise-body">{pr.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* pricing — single floor anchor */}
          <section id="pricing" className="vel-section">
            <Reveal className="vel-section-head">
              <p className="vel-kicker">{pricing.eyebrow}</p>
              <h2 className="vel-h2">{pricing.title}</h2>
            </Reveal>
            <Reveal className="vel-price">
              <div className="vel-price-glow" aria-hidden />
              <div className="vel-price-head">
                <p className="vel-price-anchor">{pricing.anchor}</p>
                <p className="vel-price-anchor-sub">{pricing.anchorSub}</p>
              </div>
              <p className="vel-price-body">{pricing.body}</p>
              <ul className="vel-price-points">
                {pricing.points.map((pt) => (
                  <li key={pt}><span className="vel-price-check"><Check /></span>{pt}</li>
                ))}
              </ul>
              <a href={CAL} className="vel-btn vel-btn-lg vel-price-cta">{pricing.cta} →</a>
              <p className="vel-price-reassure">{pricing.reassure}</p>
            </Reveal>
          </section>

          {/* final cta */}
          <section className="vel-section vel-final">
            <Reveal>
              <p className="vel-vision">{V.vision}</p>
              <h2 className="vel-final-title">{closing.title}</h2>
              <p className="vel-final-sub">{closing.sub}</p>
              <a href={CAL} className="vel-btn vel-btn-lg">{closing.cta} →</a>
              <p className="vel-reassure">{closing.reassure}</p>
            </Reveal>
          </section>
        </div>{/* /vel-wrap */}

        {/* footer */}
        <footer className="vel-footer">
          <div className="vel-wrap vel-footer-inner">
            <div className="vel-footer-brand">
              <span className="vel-logo vel-logo-foot">
                <span className="vel-logo-mark" />
                {brand.name}<span className="vel-logo-dot">{brand.tld}</span>
              </span>
              <p className="vel-footer-tag">The done-for-you operating system for local business.</p>
            </div>
            <div className="vel-footer-links">
              <a href="#system">System</a>
              <a href="#build">What I build</a>
              <a href="#pricing">Pricing</a>
              <a href="#about">About</a>
              <a href="/privacy">Privacy</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={CAL} className="vel-btn vel-btn-sm">Book a call</a>
            </div>
          </div>
          <div className="vel-wrap vel-footer-bottom">
            <span>© 2026 {brand.full}</span>
            <span>Built by Josh.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

const CSS = `
.vel-root{
  --body:#0a0812;--ink:#f6f4fc;--tx:#c3bede;--dim:#8b85a8;
  --line:rgba(180,160,255,.12);
  --v1:#8b5cf6;--v2:#a855f7;--vhi:#c4b5fd;
  --gold:#f3b64b;--gold2:#ffd685;
  --panel1:rgba(150,130,255,.055);--panel2:rgba(150,130,255,.015);
  position:relative;min-height:100vh;background:var(--body);color:var(--tx);
  font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;
}
.vel-wrap{max-width:1120px;margin:0 auto;padding:0 22px;}
.vel-grad{background:linear-gradient(96deg,#b98bff 0%,#a855f7 34%,#f3b64b 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 30px rgba(168,85,247,.28));}

/* background */
.vel-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(130% 90% at 50% -10%,#160f2b 0%,#0c091a 46%,#0a0812 100%);overflow:hidden;}
.vel-glow{position:absolute;border-radius:50%;filter:blur(120px);}
.vel-glow-v{width:60vw;height:60vw;left:-14vw;top:-22vw;background:radial-gradient(circle,rgba(139,92,246,.42),transparent 62%);}
.vel-glow-g{width:46vw;height:46vw;right:-14vw;top:12vw;background:radial-gradient(circle,rgba(243,182,75,.16),transparent 66%);}
.vel-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:34px 34px;-webkit-mask-image:radial-gradient(110% 70% at 50% 0%,#000 26%,transparent 72%);mask-image:radial-gradient(110% 70% at 50% 0%,#000 26%,transparent 72%);}
.vel-vignette{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,8,18,0) 60%,rgba(10,8,18,.85) 100%);}
.vel-grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.05;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

/* nav */
.vel-nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(10,8,18,.6);border-bottom:1px solid var(--line);}
.vel-nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px;}
.vel-logo{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-display),var(--font-inter),sans-serif;font-weight:800;font-size:20px;letter-spacing:-.03em;color:var(--ink);}
.vel-logo-mark{width:17px;height:17px;border-radius:6px;background:linear-gradient(135deg,#a855f7,#f3b64b);box-shadow:0 0 16px rgba(168,85,247,.55);}
.vel-logo-dot{background:linear-gradient(90deg,#a855f7,#f3b64b);-webkit-background-clip:text;background-clip:text;color:transparent;}
.vel-nav-links{display:flex;gap:28px;}
.vel-nav-links a{font-size:14px;color:var(--dim);text-decoration:none;font-weight:500;transition:color .15s;}
.vel-nav-links a:hover{color:var(--ink);}
.vel-nav-right{display:flex;align-items:center;gap:10px;}
.vel-nav-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:11px;background:rgba(150,130,255,.06);border:1px solid var(--line);color:var(--tx);cursor:pointer;}
.vel-nav-toggle svg{width:22px;height:22px;}
.vel-mobile-menu{display:flex;flex-direction:column;gap:2px;padding:8px 18px 18px;background:rgba(10,8,18,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);}
.vel-mobile-menu a{padding:14px 8px;font-size:16px;font-weight:600;color:var(--ink);text-decoration:none;border-radius:8px;}
.vel-mobile-cta{justify-content:center;margin-top:8px;color:#fff;}

/* buttons */
.vel-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(180deg,#9061f9,#6d28d9);color:#fff;font-weight:600;font-size:15px;padding:13px 24px;border-radius:12px;text-decoration:none;border:1px solid rgba(196,168,255,.3);box-shadow:0 10px 30px rgba(109,40,217,.42),0 0 40px rgba(139,92,246,.22);transition:transform .15s,box-shadow .15s;cursor:pointer;}
.vel-btn:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(109,40,217,.54),0 0 60px rgba(139,92,246,.34);}
.vel-btn-sm{padding:0 18px;min-height:42px;font-size:13.5px;border-radius:10px;}
.vel-btn-lg{padding:16px 30px;font-size:16px;}
.vel-btn-ghost{background:rgba(150,130,255,.06);color:#ece7fb;border:1px solid rgba(190,168,255,.24);box-shadow:none;backdrop-filter:blur(6px);}
.vel-btn-ghost:hover{border-color:rgba(243,182,75,.5);background:rgba(150,130,255,.1);box-shadow:0 0 24px rgba(243,182,75,.14);}

/* hero */
.vel-hero{position:relative;z-index:2;text-align:center;padding:88px 22px 26px;max-width:900px;margin:0 auto;}
.vel-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--gold2);padding:7px 15px;border:1px solid rgba(243,182,75,.24);border-radius:999px;background:rgba(243,182,75,.06);margin-bottom:26px;}
.vel-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold);}
.vel-h1{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(38px,6.6vw,78px);font-weight:800;line-height:1.03;letter-spacing:-.035em;margin-bottom:22px;color:#fff;text-shadow:0 2px 50px rgba(0,0,0,.4);}
.vel-sub{font-size:18.5px;line-height:1.62;color:#d3cfe6;max-width:660px;margin:0 auto 30px;}
.vel-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.vel-reassure{font-size:13.5px;color:var(--dim);margin-top:18px;}
.vel-whofor{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 4px;margin-top:38px;padding-top:26px;border-top:1px solid var(--line);max-width:720px;margin-left:auto;margin-right:auto;}
.vel-whofor-item{font-family:var(--font-geist-mono),monospace;font-size:12.5px;letter-spacing:.03em;color:var(--tx);}
.vel-whofor-sep{width:4px;height:4px;border-radius:50%;background:var(--v1);opacity:.55;margin:0 8px;}
.vel-rise{opacity:0;animation:velRise .62s cubic-bezier(.22,1,.36,1) both;}
@keyframes velRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
/* reveal defaults to visible (base opacity 1); the animation only adds a fade-up on load */
.vel-rev{animation:velRise .6s cubic-bezier(.22,1,.36,1) both;}

/* content wrapper sits above the fixed background */
main{position:relative;z-index:2;}

/* trust strip */
.vel-trust-strip{padding:26px 0 8px;text-align:center;}
.vel-trust-strip-label{font-family:var(--font-geist-mono),monospace;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-bottom:16px;}
.vel-chips{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;}
.vel-chip{font-family:var(--font-geist-mono),monospace;font-size:12.5px;padding:7px 14px;border-radius:8px;background:rgba(150,130,255,.05);border:1px solid var(--line);color:var(--tx);}

/* industry chooser — the funnel */
.vel-chooser{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:980px;margin:0 auto;}
.vel-choice{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:26px 24px;border-radius:18px;background:linear-gradient(180deg,var(--panel1),var(--panel2));border:1px solid var(--line);text-decoration:none;transition:transform .18s,border-color .18s,box-shadow .18s;}
.vel-choice-live:hover{transform:translateY(-4px);border-color:rgba(243,182,75,.45);box-shadow:0 16px 44px rgba(109,40,217,.24);}
.vel-choice-soon{opacity:.6;}
.vel-choice-ico{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:13px;background:rgba(139,92,246,.14);border:1px solid rgba(168,85,247,.2);color:var(--vhi);margin-bottom:9px;}
.vel-choice-ico svg{width:23px;height:23px;}
.vel-choice-live .vel-choice-ico{background:rgba(243,182,75,.12);border-color:rgba(243,182,75,.26);color:var(--gold2);}
.vel-choice-name{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:19px;font-weight:800;letter-spacing:-.015em;color:var(--ink);}
.vel-choice-tag{font-family:var(--font-geist-mono),monospace;font-size:12px;letter-spacing:.02em;color:var(--dim);}
.vel-choice-cta{margin-top:8px;font-size:13.5px;font-weight:700;color:var(--gold2);}
.vel-choice-soon-tag{margin-top:8px;font-family:var(--font-geist-mono),monospace;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);}
@media(max-width:820px){.vel-chooser{grid-template-columns:1fr 1fr;}}
@media(max-width:460px){.vel-chooser{grid-template-columns:1fr;max-width:360px;}}

/* sections */
.vel-section{padding:54px 0;}
.vel-section-head{text-align:center;max-width:720px;margin:0 auto 38px;}
.vel-section-sub{margin-left:auto;margin-right:auto;}
.vel-kicker{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:13px;}
.vel-h2{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(27px,4vw,43px);font-weight:800;letter-spacing:-.03em;line-height:1.12;color:var(--ink);}
.vel-p{font-size:16px;line-height:1.72;color:var(--tx);margin-top:14px;}

.vel-panel{background:linear-gradient(180deg,var(--panel1),var(--panel2));border:1px solid var(--line);border-radius:20px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

/* trap */
.vel-trap{padding:46px;max-width:820px;margin:0 auto;text-align:center;}
.vel-punch{font-size:18.5px;font-weight:700;color:var(--vhi);margin-top:24px;line-height:1.5;}
.vel-fix{font-size:21px;font-weight:800;margin-top:10px;background:linear-gradient(90deg,#c4b5fd,#f3b64b);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* steps */
.vel-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.vel-step{padding:32px;transition:border-color .2s,transform .2s;}
.vel-step:hover{border-color:rgba(243,182,75,.34);transform:translateY(-3px);}
.vel-step-n{display:inline-block;font-family:var(--font-display),var(--font-inter),sans-serif;font-size:30px;font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#a855f7,#f3b64b);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 18px rgba(168,85,247,.4));}
.vel-step-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:23px;font-weight:800;letter-spacing:-.02em;margin-top:6px;color:var(--ink);}
.vel-step-short{font-size:15px;font-weight:600;color:var(--gold2);margin-top:6px;}
.vel-step-body{font-size:14.5px;line-height:1.66;color:var(--dim);margin-top:12px;}

/* what I build — services */
.vel-services{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.vel-service{padding:28px 26px;transition:border-color .2s,transform .2s;}
.vel-service:hover{border-color:rgba(168,85,247,.4);transform:translateY(-3px);}
.vel-service-ico{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:13px;background:rgba(139,92,246,.14);border:1px solid rgba(168,85,247,.2);color:var(--vhi);margin-bottom:16px;}
.vel-service-ico svg{width:23px;height:23px;}
.vel-service-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:18px;font-weight:800;letter-spacing:-.015em;line-height:1.2;color:var(--ink);}
.vel-service-body{font-size:14.5px;line-height:1.62;color:var(--dim);margin-top:9px;}

/* what it does while you sleep — outcome cards */
.vel-does{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:900px;margin:0 auto;}
.vel-doescard{position:relative;display:flex;align-items:flex-start;gap:15px;padding:24px 26px;border-radius:18px;background:linear-gradient(180deg,var(--panel1),var(--panel2));border:1px solid var(--line);border-left:2px solid rgba(243,182,75,.5);}
.vel-doescard-ico{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:rgba(243,182,75,.1);border:1px solid rgba(243,182,75,.22);color:var(--gold2);}
.vel-doescard-ico svg{width:21px;height:21px;}
.vel-doescard-text{font-size:15px;line-height:1.55;color:#e2ddf2;margin:0;padding-top:3px;}

/* about */
.vel-about{display:grid;grid-template-columns:210px 1fr;gap:42px;padding:46px;align-items:center;}
.vel-about-photo{position:relative;width:210px;height:210px;border-radius:22px;overflow:hidden;flex-shrink:0;box-shadow:0 14px 44px rgba(0,0,0,.5);}
.vel-about-img{object-fit:cover;object-position:center 26%;}
.vel-about-ring{position:absolute;inset:0;border-radius:22px;border:1px solid rgba(243,182,75,.42);box-shadow:inset 0 0 34px rgba(168,85,247,.24);pointer-events:none;}
.vel-about-kicker{font-size:18px;font-weight:700;color:var(--ink);margin-top:22px;line-height:1.45;}
.vel-hand{font-family:var(--font-caveat),cursive;font-size:31px;margin-top:10px;background:linear-gradient(90deg,#c4b5fd,#f3b64b);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* why now */
.vel-scarcity{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;font-weight:600;color:var(--gold2);background:rgba(243,182,75,.08);border:1px solid rgba(243,182,75,.22);padding:8px 16px;border-radius:999px;}
.vel-scarcity-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 0 rgba(243,182,75,.5);animation:velRing 2s ease-out infinite;}
@keyframes velRing{0%{box-shadow:0 0 0 0 rgba(243,182,75,.5);}70%{box-shadow:0 0 0 7px rgba(243,182,75,0);}100%{box-shadow:0 0 0 0 rgba(243,182,75,0);}}
.vel-promises{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.vel-promise{padding:26px 22px;}
.vel-promise-check{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:rgba(243,182,75,.14);color:var(--gold2);}
.vel-promise-check svg{width:17px;height:17px;}
.vel-promise-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:17.5px;font-weight:800;letter-spacing:-.01em;margin-top:14px;color:var(--ink);}
.vel-promise-body{font-size:14px;line-height:1.6;color:var(--dim);margin-top:8px;}

/* pricing — single floor anchor */
.vel-price{position:relative;max-width:640px;margin:0 auto;background:linear-gradient(180deg,rgba(150,130,255,.08),rgba(150,130,255,.02));border:1px solid rgba(190,168,255,.2);border-radius:24px;padding:46px 44px 40px;text-align:center;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.44);}
.vel-price-glow{position:absolute;top:-40%;left:50%;transform:translateX(-50%);width:80%;height:70%;background:radial-gradient(circle,rgba(168,85,247,.22),transparent 68%);pointer-events:none;}
.vel-price-head{position:relative;padding-bottom:22px;margin-bottom:24px;border-bottom:1px solid var(--line);}
.vel-price-anchor{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(30px,4.6vw,42px);font-weight:800;letter-spacing:-.03em;color:#fff;line-height:1.04;}
.vel-price-anchor-sub{font-size:16px;font-weight:600;color:var(--gold2);margin-top:9px;}
.vel-price-body{position:relative;font-size:15.5px;line-height:1.65;color:var(--tx);max-width:520px;margin:0 auto;}
.vel-price-points{position:relative;list-style:none;display:flex;flex-direction:column;gap:13px;max-width:480px;margin:24px auto 0;text-align:left;}
.vel-price-points li{display:flex;gap:11px;font-size:14.5px;line-height:1.5;color:#e2ddf2;}
.vel-price-check{flex-shrink:0;display:inline-flex;color:var(--gold);margin-top:1px;}
.vel-price-check svg{width:18px;height:18px;}
.vel-price-cta{position:relative;margin-top:28px;}
.vel-price-reassure{position:relative;font-size:13.5px;color:var(--dim);margin-top:16px;}

/* final */
.vel-final{text-align:center;max-width:760px;margin:0 auto;}
.vel-vision{font-size:16px;line-height:1.6;color:var(--gold2);max-width:600px;margin:0 auto 18px;font-weight:600;}
.vel-final-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(30px,4.8vw,52px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:var(--ink);}
.vel-final-sub{font-size:18px;color:var(--tx);margin:18px auto 30px;max-width:540px;line-height:1.6;}

/* footer */
.vel-footer{position:relative;z-index:2;border-top:1px solid var(--line);padding:44px 0 40px;margin-top:22px;background:rgba(8,6,14,.5);}
.vel-footer-inner{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:22px;}
.vel-footer-brand{display:flex;flex-direction:column;gap:9px;}
.vel-logo-foot{font-size:18px;}
.vel-footer-tag{font-size:13px;color:var(--dim);max-width:280px;line-height:1.5;}
.vel-footer-links{display:flex;align-items:center;gap:8px 20px;flex-wrap:wrap;}
.vel-footer-links a{font-size:13.5px;color:var(--tx);text-decoration:none;transition:color .15s;padding:6px 0;}
.vel-footer-links a:hover{color:var(--ink);}
.vel-footer-links a.vel-btn{color:#fff;padding:0 18px;}
.vel-footer-bottom{display:flex;justify-content:space-between;margin-top:22px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--dim);}

@media(prefers-reduced-motion:reduce){
  .vel-scarcity-dot{animation:none;}
  .vel-rise,.vel-rev{opacity:1;transform:none;animation:none;}
}
@media(max-width:980px){
  .vel-promises{grid-template-columns:repeat(2,1fr);}
  .vel-services{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:860px){
  .vel-nav-links{display:none;}
  .vel-nav-toggle{display:inline-flex;}
  .vel-grid-2{grid-template-columns:1fr;}
  .vel-does{grid-template-columns:1fr;}
  .vel-about{grid-template-columns:1fr;text-align:center;justify-items:center;}
  .vel-trap{padding:34px 24px;}
}
@media(max-width:560px){
  .vel-promises{grid-template-columns:1fr;max-width:420px;margin:0 auto;}
  .vel-services{grid-template-columns:1fr;max-width:420px;margin:0 auto;}
  .vel-cta-row{flex-direction:column;}
  .vel-btn-lg{width:100%;}
  .vel-hero{padding:60px 20px 22px;}
  .vel-price{padding:34px 22px 30px;}
  .vel-footer-bottom{flex-direction:column;gap:6px;}
}
`;
