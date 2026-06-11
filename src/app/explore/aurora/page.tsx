'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GradientBackground from '@/components/GradientBackground';
import {
  CAL, EMAIL, brand, heroline, problem, steps, agentMessages,
  integrations, plans, trust, about, closing,
} from '../content';

/* Direction 1 — "Aurora", Stripe edition.
   Soft WebGL "liquid" gradient through an angled hero (the Stripe diagonal),
   then clean white sections. Dark text, glassmorphism, honest founding-client
   trust band, a live agent console, line-icons (no emoji). */

const ICON = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Line icons for the agent console — inline SVG, no icon library.
const AGENT_ICONS = [
  <svg key="m" {...ICON}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  <svg key="d" {...ICON}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  <svg key="t" {...ICON}><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>,
  <svg key="r" {...ICON}><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
];

const planHref = (name: string) =>
  `${CAL}?plan=${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`;

export default function Aurora() {
  const [menuOpen, setMenuOpen] = useState(false);
  const monthly = plans.filter((p) => !p.bespoke);
  const bespoke = plans.find((p) => p.bespoke);

  return (
    <div className="aur-root">
      <style>{CSS}</style>

      {/* The soft WebGL "liquid" gradient we built — lives behind the hero */}
      <GradientBackground />

      {/* nav */}
      <nav className="aur-nav">
        <div className="aur-wrap aur-nav-inner">
          <span className="aur-logo">{brand.name}<span className="aur-logo-dot">{brand.tld}</span></span>
          <div className="aur-nav-links">
            <a href="#system">System</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>
          <div className="aur-nav-right">
            <a href={CAL} className="aur-btn aur-btn-sm">Book a call</a>
            <button
              className="aur-nav-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <svg {...ICON}>
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="aur-mobile-menu">
            <a href="#system" onClick={() => setMenuOpen(false)}>System</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          </div>
        )}
      </nav>

      <main>
        {/* hero — soft Stripe gradient over the liquid wash */}
        <div className="aur-hero-wrap">
          <div aria-hidden className="aur-stripe-band">
            <span className="aur-stripe-blob aur-sb1" />
            <span className="aur-stripe-blob aur-sb2" />
            <span className="aur-stripe-blob aur-sb3" />
            <span className="aur-stripe-blob aur-sb4" />
          </div>
          <section className="aur-hero">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="aur-eyebrow"
            >
              {heroline.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }} className="aur-h1"
            >
              Your business <span className="aur-grad">runs itself.</span>
              <br />You get your <span className="aur-grad">time back.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }} className="aur-sub"
            >
              {heroline.sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }} className="aur-cta-row"
            >
              <a href={CAL} className="aur-btn aur-btn-lg">{heroline.ctaPrimary} →</a>
              <a href="#system" className="aur-btn aur-btn-ghost aur-btn-lg">{heroline.ctaSecondary}</a>
            </motion.div>
            <p className="aur-reassure">{heroline.reassure}</p>

            <div className="aur-trust">
              <span className="aur-trust-label">Works with the tools you already pay for</span>
              <div className="aur-pills">
                {integrations.slice(0, 8).map((t) => (
                  <span key={t} className="aur-pill">{t}</span>
                ))}
              </div>
            </div>
          </section>
        </div>{/* /aur-hero-wrap */}

        {/* white body with the signature Stripe angled top edge */}
        <div className="aur-body">
        <div className="aur-wrap">

          {/* problem */}
          <section className="aur-section">
            <div className="aur-glass aur-problem">
              <h2 className="aur-h2">{problem.title}</h2>
              <p className="aur-p">{problem.body[0]}</p>
              <p className="aur-p">{problem.body[1]}</p>
              <p className="aur-punch">{problem.punch}</p>
              <p className="aur-fix">{problem.fix}</p>
            </div>
          </section>

          {/* system */}
          <section id="system" className="aur-section">
            <div className="aur-section-head">
              <p className="aur-kicker">How it works</p>
              <h2 className="aur-h2">Four steps to a business that runs itself</h2>
            </div>
            <div className="aur-grid-2">
              {steps.map((s) => (
                <div key={s.n} className="aur-glass aur-step">
                  <span className="aur-step-n">{s.n}</span>
                  <h3 className="aur-step-title">{s.title}</h3>
                  <p className="aur-step-short">{s.short}</p>
                  <p className="aur-step-body">{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* agent console — "live" feel: pulsing status + an in-progress row */}
          <section className="aur-section">
            <div className="aur-section-head">
              <p className="aur-kicker">Your invisible employee</p>
              <h2 className="aur-h2">The agent makes smart calls 24/7</h2>
            </div>
            <div className="aur-console">
              <div className="aur-console-bar">
                <span className="aur-dot" /><span className="aur-dot" /><span className="aur-dot" />
                <span className="aur-console-title">foundos agent · live</span>
                <span className="aur-live"><span className="aur-live-dot" />working</span>
              </div>
              <div className="aur-console-body">
                {agentMessages.map((m, i) => (
                  <div key={i} className="aur-msg">
                    <span className="aur-msg-ico">{AGENT_ICONS[i % AGENT_ICONS.length]}</span>
                    <span className="aur-msg-text">{m.text}</span>
                    <span className="aur-msg-done">done</span>
                  </div>
                ))}
                <div className="aur-msg aur-msg-working">
                  <span className="aur-msg-ico aur-msg-ico-live"><span className="aur-pulse-dot" /></span>
                  <span className="aur-msg-text">Scanning 1,204 members for renewals at risk this week<span className="aur-cursor">▍</span></span>
                  <span className="aur-msg-now">now</span>
                </div>
              </div>
            </div>
          </section>

          {/* about — placed before pricing so a skeptic knows who Josh is first */}
          <section id="about" className="aur-section">
            <div className="aur-glass aur-about">
              <div className="aur-about-photo">
                <Image src={about.photo} alt="Josh, founder of foundos.ai" fill sizes="200px" className="aur-about-img" />
              </div>
              <div className="aur-about-copy">
                <h2 className="aur-h2">Hey, I'm {about.name}.</h2>
                {about.lines.map((l, i) => <p key={i} className="aur-p">{l}</p>)}
                <p className="aur-about-kicker">{about.kicker}</p>
                <p className="aur-hand">{about.signoff}</p>
              </div>
            </div>
          </section>

          {/* trust — honest founding-client band (no fabricated testimonials) */}
          <section className="aur-section">
            <div className="aur-section-head">
              <p className="aur-kicker">{trust.eyebrow}</p>
              <h2 className="aur-h2">{trust.title}</h2>
              <span className="aur-scarcity"><span className="aur-scarcity-dot" />{trust.scarcity}</span>
              <p className="aur-p aur-trust-sub">{trust.sub}</p>
            </div>
            <div className="aur-promises">
              {trust.promises.map((pr) => (
                <div key={pr.title} className="aur-glass aur-promise">
                  <span className="aur-promise-check">✓</span>
                  <h3 className="aur-promise-title">{pr.title}</h3>
                  <p className="aur-promise-body">{pr.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* pricing — 3 monthly tiers + bespoke callout */}
          <section id="pricing" className="aur-section">
            <div className="aur-section-head">
              <p className="aur-kicker">Pricing</p>
              <h2 className="aur-h2">Simple monthly pricing. Your website included.</h2>
            </div>
            <div className="aur-grid-3">
              {monthly.map((p) => (
                <div key={p.name} className={`aur-glass aur-plan ${p.popular ? 'aur-plan-pop' : ''}`}>
                  {p.popular && <span className="aur-plan-badge">Most popular</span>}
                  <p className="aur-plan-name">{p.name}</p>
                  <p className="aur-plan-price">{p.price}<span className="aur-plan-cad">{p.cadence}</span></p>
                  <p className="aur-plan-tag">{p.tagline}</p>
                  <ul className="aur-plan-feats">
                    {p.features.map((f) => (
                      <li key={f}><span className="aur-check">✓</span>{f}</li>
                    ))}
                  </ul>
                  {p.anchor && <p className="aur-plan-anchor">{p.anchor}</p>}
                  <a href={planHref(p.name)} className={`aur-btn ${p.popular ? '' : 'aur-btn-ghost'} aur-plan-cta`}>{p.cta} →</a>
                </div>
              ))}
            </div>
            <p className="aur-guarantee">Not sure which plan fits? We figure that out together on the call — and you can move tiers anytime.</p>
            {bespoke && (
              <div className="aur-bespoke">
                <div className="aur-bespoke-copy">
                  <p className="aur-bespoke-name">{bespoke.name} — {bespoke.price} {bespoke.cadence}</p>
                  <p className="aur-bespoke-tag">For high-revenue owners who want a true operating system — with me hands-on in the growth.</p>
                </div>
                <a href={planHref(bespoke.name)} className="aur-btn">{bespoke.cta} →</a>
              </div>
            )}
          </section>

          {/* final cta */}
          <section className="aur-section aur-final">
            <h2 className="aur-final-title">{closing.title}</h2>
            <p className="aur-final-sub">{closing.sub}</p>
            <a href={CAL} className="aur-btn aur-btn-lg">{closing.cta} →</a>
            <p className="aur-reassure">{closing.reassure}</p>
          </section>

        </div>{/* /aur-wrap */}
        </div>{/* /aur-body */}

        {/* footer */}
        <footer className="aur-footer">
          <div className="aur-wrap aur-footer-inner">
            <div className="aur-footer-brand">
              <span className="aur-logo">{brand.name}<span className="aur-logo-dot">{brand.tld}</span></span>
              <p className="aur-footer-tag">The AI operating system for service businesses.</p>
            </div>
            <div className="aur-footer-links">
              <a href="#system">System</a>
              <a href="#pricing">Pricing</a>
              <a href="#about">About</a>
              <a href="/privacy">Privacy</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={CAL} className="aur-btn aur-btn-sm">Book a call</a>
            </div>
          </div>
          <div className="aur-wrap aur-footer-bottom">
            <span>© 2026 {brand.full}</span>
            <span>Built by Josh.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

const CSS = `
.aur-root{position:relative;min-height:100vh;background:transparent;color:#15131f;font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.aur-wrap{max-width:1120px;margin:0 auto;padding:0 24px;}

/* hero sits in a full-bleed wrapper; the white body slides up under it on an angle */
.aur-hero-wrap{position:relative;overflow:hidden;padding-bottom:150px;}
.aur-body{position:relative;z-index:2;background:#ffffff;margin-top:-104px;padding-top:8px;clip-path:polygon(0 104px,100% 0,100% 100%,0 100%);}

/* Stripe-style soft gradient band — pastel + heavily blurred so dark text stays readable */
.aur-stripe-band{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;}
.aur-stripe-band::after{content:"";position:absolute;inset:0;background:radial-gradient(72% 64% at 50% 30%,rgba(255,255,255,.55),transparent 74%);}
.aur-stripe-blob{position:absolute;border-radius:50%;filter:blur(80px);}
.aur-sb1{width:46vw;height:46vw;left:-6vw;top:-14vw;background:radial-gradient(circle at 35% 35%,rgba(99,102,241,.46),transparent 68%);animation:aurDrift1 22s ease-in-out infinite;}
.aur-sb2{width:42vw;height:42vw;right:-6vw;top:-10vw;background:radial-gradient(circle at 60% 40%,rgba(168,85,247,.40),transparent 68%);animation:aurDrift2 26s ease-in-out infinite;}
.aur-sb3{width:44vw;height:44vw;left:34vw;top:12vw;background:radial-gradient(circle at 50% 50%,rgba(236,72,153,.28),transparent 70%);animation:aurDrift3 28s ease-in-out infinite;}
.aur-sb4{width:48vw;height:48vw;left:4vw;top:18vw;background:radial-gradient(circle at 50% 50%,rgba(56,189,248,.26),transparent 70%);animation:aurDrift1 30s ease-in-out infinite;}
@keyframes aurDrift1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(5vw,3vw) scale(1.08);}}
@keyframes aurDrift2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-4vw,2vw) scale(1.1);}}
@keyframes aurDrift3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-3vw,-3vw) scale(.94);}}

.aur-nav{position:sticky;top:0;z-index:30;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:rgba(255,255,255,.62);border-bottom:1px solid rgba(99,102,241,.08);}
.aur-nav-inner{display:flex;align-items:center;justify-content:space-between;height:66px;}
.aur-logo{font-weight:800;font-size:21px;letter-spacing:-.03em;}
.aur-logo-dot{background:linear-gradient(90deg,#6366f1,#a855f7);-webkit-background-clip:text;background-clip:text;color:transparent;}
.aur-nav-links{display:flex;gap:30px;}
.aur-nav-links a{font-size:14px;color:#5b5870;text-decoration:none;font-weight:500;}
.aur-nav-links a:hover{color:#15131f;}
.aur-nav-right{display:flex;align-items:center;gap:10px;}
.aur-nav-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:11px;background:rgba(255,255,255,.7);border:1px solid rgba(99,102,241,.18);color:#3b2f6b;cursor:pointer;}
.aur-nav-toggle svg{width:22px;height:22px;}
.aur-mobile-menu{display:flex;flex-direction:column;gap:2px;padding:8px 20px 16px;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);border-bottom:1px solid rgba(99,102,241,.1);}
.aur-mobile-menu a{padding:13px 8px;font-size:16px;font-weight:600;color:#3b2f6b;text-decoration:none;border-radius:8px;}
.aur-mobile-menu a:hover{background:rgba(99,102,241,.06);}

.aur-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:linear-gradient(90deg,#6366f1,#8b5cf6);color:#fff;font-weight:600;font-size:15px;padding:13px 24px;border-radius:12px;text-decoration:none;box-shadow:0 8px 24px rgba(99,102,241,.28);transition:transform .15s,box-shadow .15s;border:none;cursor:pointer;}
.aur-btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(99,102,241,.36);}
.aur-btn-sm{padding:0 18px;min-height:44px;font-size:14px;border-radius:11px;}
.aur-btn-lg{padding:16px 30px;font-size:16.5px;}
.aur-btn-ghost{background:rgba(255,255,255,.7);color:#3b2f6b;border:1px solid rgba(99,102,241,.25);box-shadow:none;backdrop-filter:blur(8px);}
.aur-btn-ghost:hover{border-color:#8b5cf6;box-shadow:0 6px 18px rgba(99,102,241,.12);}

.aur-hero{position:relative;z-index:1;text-align:center;padding:92px 24px 40px;max-width:820px;margin:0 auto;}
.aur-eyebrow{font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#7c3aed;margin-bottom:22px;}
.aur-h1{font-size:clamp(40px,6.4vw,74px);font-weight:800;line-height:1.04;letter-spacing:-.035em;margin-bottom:26px;}
.aur-grad{display:inline-block;background:linear-gradient(90deg,#5b56e0,#9333ea,#db2777);-webkit-background-clip:text;background-clip:text;color:transparent;}
.aur-sub{font-size:19px;line-height:1.6;color:#403d57;max-width:620px;margin:0 auto 32px;font-weight:450;}
.aur-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.aur-reassure{font-size:14px;color:#8b8aa0;margin-top:18px;}
.aur-hero .aur-reassure{color:#4c4965;font-weight:500;}

.aur-trust{margin-top:56px;}
.aur-trust-label{display:block;font-size:12.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6b6880;margin-bottom:16px;}
.aur-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}
.aur-pill{padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.7);border:1px solid rgba(99,102,241,.14);font-size:13.5px;font-weight:500;color:#4a4860;backdrop-filter:blur(6px);}

.aur-section{padding:60px 0;}
.aur-section-head{text-align:center;max-width:680px;margin:0 auto 40px;}
.aur-kicker{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8b5cf6;margin-bottom:12px;}
.aur-h2{font-size:clamp(28px,3.8vw,42px);font-weight:800;letter-spacing:-.03em;line-height:1.12;}
.aur-p{font-size:16.5px;line-height:1.7;color:#56536b;margin-top:14px;}

.aur-glass{background:rgba(255,255,255,.64);border:1px solid rgba(120,110,190,.12);box-shadow:0 6px 26px rgba(80,70,160,.06);border-radius:24px;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);}
.aur-problem{padding:44px;max-width:760px;margin:0 auto;text-align:center;}
.aur-punch{font-size:19px;font-weight:700;color:#b45309;margin-top:22px;line-height:1.5;}
.aur-fix{font-size:20px;font-weight:800;color:#6d28d9;margin-top:10px;}

.aur-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.aur-step{padding:32px;}
.aur-step-n{font-size:13px;font-weight:700;font-family:var(--font-geist-mono),monospace;color:#a855f7;letter-spacing:.1em;}
.aur-step-title{font-size:23px;font-weight:800;letter-spacing:-.02em;margin-top:8px;}
.aur-step-short{font-size:15px;font-weight:600;color:#6d28d9;margin-top:6px;}
.aur-step-body{font-size:15px;line-height:1.65;color:#605d75;margin-top:12px;}

.aur-console{max-width:760px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 24px 70px rgba(40,30,90,.22);border:1px solid rgba(124,58,237,.18);}
.aur-console-bar{display:flex;align-items:center;gap:8px;padding:14px 18px;background:#1a1530;}
.aur-dot{width:11px;height:11px;border-radius:50%;background:#3b3458;}
.aur-dot:nth-child(1){background:#ef6a5e;}.aur-dot:nth-child(2){background:#f5bd4f;}.aur-dot:nth-child(3){background:#61c454;}
.aur-console-title{margin-left:10px;font-size:13px;font-family:var(--font-geist-mono),monospace;color:#b7b1d8;}
.aur-live{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-size:12px;color:#7ee787;font-weight:600;}
.aur-live-dot{width:8px;height:8px;border-radius:50%;background:#7ee787;box-shadow:0 0 0 0 rgba(126,231,135,.6);animation:aurPulse 1.8s ease-out infinite;}
@keyframes aurPulse{0%{box-shadow:0 0 0 0 rgba(126,231,135,.5);opacity:1;}70%{box-shadow:0 0 0 7px rgba(126,231,135,0);opacity:.55;}100%{box-shadow:0 0 0 0 rgba(126,231,135,0);opacity:1;}}
.aur-console-body{background:#221c3d;padding:10px;}
.aur-msg{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:12px;background:rgba(255,255,255,.04);margin:8px;}
.aur-msg-working{background:rgba(165,180,252,.08);border:1px solid rgba(165,180,252,.14);}
.aur-msg-ico{width:36px;height:36px;border-radius:10px;background:rgba(165,180,252,.13);color:#a5b4fc;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.aur-msg-ico svg{width:19px;height:19px;}
.aur-msg-ico-live{position:relative;}
.aur-pulse-dot{width:10px;height:10px;border-radius:50%;background:#a5b4fc;animation:aurPulse 1.8s ease-out infinite;}
.aur-msg-text{flex:1;font-size:14.5px;line-height:1.5;color:#e7e3fb;}
.aur-cursor{display:inline-block;margin-left:2px;color:#a5b4fc;animation:aurBlink 1.1s step-end infinite;}
@keyframes aurBlink{0%,100%{opacity:1;}50%{opacity:.25;}}
.aur-msg-done{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#7ee787;background:rgba(126,231,135,.12);padding:5px 10px;border-radius:8px;}
.aur-msg-now{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fbbf6b;background:rgba(251,191,107,.12);padding:5px 10px;border-radius:8px;}

.aur-scarcity{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;font-weight:600;color:#6d28d9;background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.16);padding:8px 16px;border-radius:999px;}
.aur-scarcity-dot{width:7px;height:7px;border-radius:50%;background:#7c3aed;box-shadow:0 0 0 0 rgba(124,58,237,.5);animation:aurPulse 2s ease-out infinite;}
.aur-trust-sub{margin-left:auto;margin-right:auto;}
.aur-promises{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.aur-promise{padding:26px 22px;}
.aur-promise-check{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:rgba(124,58,237,.1);color:#7c3aed;font-weight:800;font-size:15px;}
.aur-promise-title{font-size:17.5px;font-weight:800;letter-spacing:-.01em;margin-top:14px;}
.aur-promise-body{font-size:14px;line-height:1.6;color:#605d75;margin-top:8px;}

.aur-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:stretch;}
.aur-plan{padding:30px 26px;position:relative;display:flex;flex-direction:column;gap:14px;}
.aur-plan-pop{border:1.5px solid #8b5cf6;box-shadow:0 16px 50px rgba(124,58,237,.18);}
.aur-plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,#6366f1,#a855f7);color:#fff;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:5px 14px;border-radius:999px;white-space:nowrap;}
.aur-plan-name{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8b5cf6;}
.aur-plan-price{font-size:36px;font-weight:800;letter-spacing:-.03em;}
.aur-plan-cad{font-size:13px;font-weight:500;color:#9b99ad;margin-left:4px;}
.aur-plan-tag{font-size:14.5px;color:#605d75;}
.aur-plan-feats{list-style:none;display:flex;flex-direction:column;gap:10px;flex:1;}
.aur-plan-feats li{display:flex;gap:9px;font-size:14px;line-height:1.45;color:#4a4860;}
.aur-check{color:#8b5cf6;font-weight:800;flex-shrink:0;}
.aur-plan-anchor{font-size:12.5px;line-height:1.5;color:#6d4ec9;background:rgba(124,58,237,.07);border:1px solid rgba(124,58,237,.1);border-radius:10px;padding:10px 12px;}
.aur-plan-cta{justify-content:center;margin-top:4px;}

.aur-guarantee{text-align:center;max-width:600px;margin:24px auto 0;font-size:15px;line-height:1.6;color:#5c5976;}
.aur-bespoke{display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:900px;margin:24px auto 0;padding:24px 30px;border:1px dashed rgba(99,102,241,.32);border-radius:18px;background:rgba(255,255,255,.55);}
.aur-bespoke-name{font-size:17px;font-weight:800;letter-spacing:-.01em;}
.aur-bespoke-tag{font-size:14px;color:#605d75;margin-top:4px;}

.aur-about{display:grid;grid-template-columns:200px 1fr;gap:40px;padding:44px;align-items:center;}
.aur-about-photo{position:relative;width:200px;height:200px;border-radius:24px;overflow:hidden;box-shadow:0 12px 36px rgba(80,70,160,.2);}
.aur-about-img{object-fit:cover;object-position:center 28%;}
.aur-about-kicker{font-size:19px;font-weight:700;color:#15131f;margin-top:20px;line-height:1.45;}
.aur-hand{font-family:var(--font-caveat),cursive;font-size:30px;margin-top:12px;color:#6d28d9;}

.aur-final{text-align:center;max-width:680px;margin:0 auto;}
.aur-final-title{font-size:clamp(32px,5vw,54px);font-weight:800;letter-spacing:-.03em;line-height:1.08;}
.aur-final-sub{font-size:18px;color:#56536b;margin:18px auto 28px;max-width:520px;line-height:1.6;}

.aur-footer{position:relative;z-index:2;background:#14121f;color:#b7b4cc;padding:50px 0 28px;}
.aur-footer-inner{display:flex;justify-content:space-between;align-items:flex-start;gap:30px;flex-wrap:wrap;}
.aur-footer .aur-logo{color:#fff;}
.aur-footer-tag{font-size:13.5px;color:#8b88a0;margin-top:10px;max-width:280px;line-height:1.5;}
.aur-footer-links{display:flex;align-items:center;gap:6px 22px;flex-wrap:wrap;}
.aur-footer-links a{font-size:13.5px;color:#b7b4cc;text-decoration:none;transition:color .15s;padding:11px 0;min-height:44px;display:inline-flex;align-items:center;}
.aur-footer-links a:hover{color:#fff;}
.aur-footer-links a.aur-btn{color:#fff;padding:0 18px;}
.aur-footer-bottom{display:flex;justify-content:space-between;margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);font-size:12.5px;color:#6f6c85;}

@media(prefers-reduced-motion:reduce){
  .aur-stripe-blob,.aur-live-dot,.aur-pulse-dot,.aur-scarcity-dot,.aur-cursor{animation:none;}
}

@media(max-width:980px){
  .aur-promises{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:880px){
  .aur-nav-links{display:none;}
  .aur-nav-toggle{display:inline-flex;}
  .aur-grid-2{grid-template-columns:1fr;}
  .aur-grid-3{grid-template-columns:1fr;max-width:440px;margin-left:auto;margin-right:auto;}
  .aur-about{grid-template-columns:1fr;text-align:center;justify-items:center;}
  .aur-bespoke{flex-direction:column;text-align:center;}
  .aur-footer-inner{flex-direction:column;gap:22px;}
}
@media(max-width:560px){
  .aur-promises{grid-template-columns:1fr;max-width:420px;margin-left:auto;margin-right:auto;}
  .aur-cta-row{flex-direction:column;}
  .aur-btn-lg{width:100%;}
  .aur-footer-bottom{flex-direction:column;gap:6px;}
}
`;
