'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CAL, brand, heroline, problem, steps, agentMessages,
  integrations, plans, about, closing,
} from '../content';

/* Direction — "Spectrum": bold launch-energy. A huge living blue→violet→pink→orange
   gradient hero, then clean white sections punched with vibrant colored accents,
   colorful step cards, friendly agent cards, and a gradient-bordered popular plan. */

const ACCENTS = [
  { name: 'blue', from: '#2563eb', to: '#3b82f6', soft: 'rgba(37,99,235,0.10)', ring: 'rgba(37,99,235,0.30)' },
  { name: 'violet', from: '#7c3aed', to: '#a855f7', soft: 'rgba(124,58,237,0.10)', ring: 'rgba(124,58,237,0.30)' },
  { name: 'pink', from: '#ec4899', to: '#f472b6', soft: 'rgba(236,72,153,0.10)', ring: 'rgba(236,72,153,0.30)' },
  { name: 'orange', from: '#fb923c', to: '#f97316', soft: 'rgba(251,146,60,0.12)', ring: 'rgba(251,146,60,0.32)' },
];

function Check() {
  return (
    <svg className="spc-check" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="spc-arrow" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Spectrum() {
  const words = heroline.rotating;
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((p) => (p + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <div className="spc-root">
      <style>{`
.spc-root{position:relative;min-height:100vh;background:#ffffff;color:#0d1020;font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.spc-wrap{max-width:1160px;margin:0 auto;padding:0 24px;}

/* ===== nav ===== */
.spc-nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(13,16,32,0.55);border-bottom:1px solid rgba(255,255,255,0.12);}
.spc-nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px;}
.spc-logo{font-weight:800;font-size:21px;letter-spacing:-0.03em;color:#fff;}
.spc-logo-dot{background:linear-gradient(90deg,#60a5fa,#c084fc,#f9a8d4,#fdba74);-webkit-background-clip:text;background-clip:text;color:transparent;}
.spc-nav-links{display:flex;gap:30px;}
.spc-nav-links a{font-size:14px;color:rgba(255,255,255,0.78);text-decoration:none;font-weight:500;transition:color .15s;}
.spc-nav-links a:hover{color:#fff;}
.spc-nav-cta{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#0d1020;font-weight:700;font-size:13.5px;padding:9px 18px;border-radius:999px;text-decoration:none;transition:transform .15s,box-shadow .15s;box-shadow:0 6px 20px rgba(0,0,0,0.22);}
.spc-nav-cta:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(0,0,0,0.3);}

/* ===== hero ===== */
.spc-hero{position:relative;overflow:hidden;color:#fff;text-align:center;}
.spc-hero-bg{position:absolute;inset:0;z-index:0;background:linear-gradient(120deg,#2563eb 0%,#7c3aed 32%,#ec4899 64%,#fb923c 100%);background-size:300% 300%;animation:spcShift 16s ease-in-out infinite;}
@keyframes spcShift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
.spc-hero-glow{position:absolute;inset:0;z-index:1;background:radial-gradient(120% 80% at 50% -20%,rgba(255,255,255,0.20),rgba(255,255,255,0) 55%);pointer-events:none;}
.spc-hero-grain{position:absolute;inset:0;z-index:1;background:radial-gradient(85% 95% at 50% 60%,rgba(13,16,32,0.30),rgba(13,16,32,0) 70%);pointer-events:none;}
.spc-hero-inner{position:relative;z-index:2;max-width:880px;margin:0 auto;padding:96px 24px 116px;}
.spc-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.32);padding:7px 16px;border-radius:999px;margin-bottom:26px;backdrop-filter:blur(6px);}
.spc-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 10px rgba(255,255,255,0.9);}
.spc-h1{font-size:clamp(42px,7vw,84px);font-weight:800;line-height:1.02;letter-spacing:-0.04em;text-shadow:0 2px 22px rgba(13,16,32,0.38);}
.spc-rot{display:inline-flex;flex-wrap:wrap;justify-content:center;gap:0 .28em;min-height:1.06em;}
.spc-rot-word{color:#ffd86b;text-shadow:0 2px 22px rgba(13,16,32,0.42);}
.spc-sub{font-size:clamp(17px,2vw,20px);line-height:1.6;color:rgba(255,255,255,0.92);max-width:660px;margin:26px auto 36px;}
.spc-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.spc-arrow{width:18px;height:18px;flex-shrink:0;}
.spc-btn-white{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0d1020;font-weight:700;font-size:16px;padding:16px 30px;border-radius:999px;text-decoration:none;box-shadow:0 14px 40px rgba(0,0,0,0.26);transition:transform .15s,box-shadow .15s;}
.spc-btn-white:hover{transform:translateY(-2px);box-shadow:0 18px 48px rgba(0,0,0,0.34);}
.spc-btn-glass{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.14);color:#fff;font-weight:600;font-size:16px;padding:16px 28px;border-radius:999px;text-decoration:none;border:1px solid rgba(255,255,255,0.4);backdrop-filter:blur(8px);transition:background .15s,transform .15s;}
.spc-btn-glass:hover{background:rgba(255,255,255,0.24);transform:translateY(-2px);}
.spc-reassure-hero{font-size:14px;color:rgba(255,255,255,0.82);margin-top:20px;}

/* ===== integrations strip ===== */
.spc-strip{position:relative;z-index:3;margin-top:-46px;}
.spc-strip-card{max-width:1000px;margin:0 auto;background:#fff;border-radius:24px;box-shadow:0 24px 70px rgba(13,16,32,0.16);border:1px solid rgba(13,16,32,0.06);padding:26px 30px;text-align:center;}
.spc-strip-label{font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a90a6;margin-bottom:16px;}
.spc-pills{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;}
.spc-pill{padding:8px 16px;border-radius:999px;background:#f4f5fb;border:1px solid rgba(13,16,32,0.06);font-size:13.5px;font-weight:600;color:#3b4156;}

/* ===== generic section ===== */
.spc-section{padding:78px 0;}
.spc-head{text-align:center;max-width:720px;margin:0 auto 48px;}
.spc-kicker{display:inline-block;font-size:12.5px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;background:linear-gradient(90deg,#2563eb,#7c3aed,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:14px;}
.spc-h2{font-size:clamp(30px,4.2vw,46px);font-weight:800;letter-spacing:-0.035em;line-height:1.1;}
.spc-grad-text{background:linear-gradient(90deg,#2563eb,#7c3aed,#ec4899,#fb923c);-webkit-background-clip:text;background-clip:text;color:transparent;}
.spc-lead{font-size:18px;line-height:1.65;color:#525a72;margin-top:16px;}

/* ===== problem ===== */
.spc-problem{max-width:860px;margin:0 auto;background:#0d1020;color:#fff;border-radius:30px;padding:54px 56px;text-align:center;position:relative;overflow:hidden;}
.spc-problem::before{content:"";position:absolute;inset:0;background:radial-gradient(80% 120% at 50% -20%,rgba(124,58,237,0.5),rgba(13,16,32,0) 60%);pointer-events:none;}
.spc-problem-inner{position:relative;z-index:1;}
.spc-problem h2{font-size:clamp(26px,3.6vw,38px);font-weight:800;letter-spacing:-0.03em;line-height:1.14;margin-bottom:18px;}
.spc-problem p{font-size:16px;line-height:1.7;color:rgba(255,255,255,0.78);margin-top:14px;text-align:left;}
.spc-punch{font-size:18px !important;font-weight:700;color:#fdba74 !important;margin-top:24px !important;text-align:center !important;}
.spc-fix{display:inline-block;font-size:22px;font-weight:800;margin-top:14px;background:linear-gradient(90deg,#60a5fa,#c084fc,#f9a8d4);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* ===== steps ===== */
.spc-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.spc-step{position:relative;background:#fff;border:1px solid rgba(13,16,32,0.07);border-radius:24px;padding:28px 24px 26px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 28px rgba(13,16,32,0.05);transition:transform .18s,box-shadow .18s;}
.spc-step:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(13,16,32,0.10);}
.spc-step-bar{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--c1),var(--c2));}
.spc-step-n{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;font-family:var(--font-geist-mono),monospace;font-weight:800;font-size:16px;color:#fff;background:linear-gradient(135deg,var(--c1),var(--c2));box-shadow:0 8px 20px var(--cring);margin-bottom:16px;}
.spc-step-title{font-size:21px;font-weight:800;letter-spacing:-0.02em;}
.spc-step-short{font-size:14px;font-weight:700;margin-top:6px;color:var(--c1);}
.spc-step-body{font-size:14px;line-height:1.6;color:#5a6178;margin-top:12px;}

/* ===== agent ===== */
.spc-agent-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:920px;margin:0 auto;}
.spc-agent-card{display:flex;align-items:flex-start;gap:16px;background:var(--csoft);border:1px solid var(--cring);border-radius:20px;padding:22px 24px;}
.spc-agent-ico{flex-shrink:0;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;background:#fff;box-shadow:0 6px 16px rgba(13,16,32,0.08);}
.spc-agent-text{font-size:15px;line-height:1.55;color:#2b3147;font-weight:500;}
.spc-agent-tag{display:inline-block;margin-top:10px;font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:var(--c1);}

/* ===== pricing ===== */
.spc-plans{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:start;}
.spc-plan{position:relative;background:#fff;border:1px solid rgba(13,16,32,0.08);border-radius:24px;padding:30px 24px;display:flex;flex-direction:column;gap:14px;box-shadow:0 8px 28px rgba(13,16,32,0.05);}
.spc-plan-pop{border:none;padding:0;background:linear-gradient(135deg,#2563eb,#7c3aed,#ec4899,#fb923c);box-shadow:0 22px 60px rgba(124,58,237,0.28);}
.spc-plan-pop-inner{background:#fff;border-radius:22px;margin:2px;padding:30px 24px;display:flex;flex-direction:column;gap:14px;height:100%;}
.spc-plan-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,#7c3aed,#ec4899);color:#fff;font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;padding:6px 16px;border-radius:999px;white-space:nowrap;box-shadow:0 8px 20px rgba(124,58,237,0.4);z-index:2;}
.spc-plan-name{font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;background:linear-gradient(90deg,#2563eb,#7c3aed);-webkit-background-clip:text;background-clip:text;color:transparent;}
.spc-plan-price{font-size:34px;font-weight:800;letter-spacing:-0.03em;color:#0d1020;}
.spc-plan-cad{font-size:13px;font-weight:600;color:#8a90a6;margin-left:5px;}
.spc-plan-tag{font-size:13.5px;color:#5a6178;line-height:1.45;}
.spc-plan-feats{list-style:none;display:flex;flex-direction:column;gap:11px;flex:1;margin:4px 0;}
.spc-plan-feats li{display:flex;gap:10px;font-size:13.5px;line-height:1.5;color:#3b4156;}
.spc-check{width:18px;height:18px;flex-shrink:0;color:#7c3aed;margin-top:1px;}
.spc-plan-cta{display:inline-flex;align-items:center;justify-content:center;gap:7px;font-weight:700;font-size:14.5px;padding:13px 18px;border-radius:999px;text-decoration:none;transition:transform .15s,box-shadow .15s;}
.spc-plan-cta-pop{background:linear-gradient(90deg,#2563eb,#7c3aed,#ec4899);color:#fff;box-shadow:0 10px 26px rgba(124,58,237,0.32);}
.spc-plan-cta-pop:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(124,58,237,0.4);}
.spc-plan-cta-ghost{background:#f4f5fb;color:#2b3147;border:1px solid rgba(13,16,32,0.08);}
.spc-plan-cta-ghost:hover{transform:translateY(-2px);border-color:rgba(124,58,237,0.4);}
.spc-plan-best{font-size:12px;line-height:1.5;color:#8a90a6;border-top:1px solid rgba(13,16,32,0.07);padding-top:12px;}

/* ===== about ===== */
.spc-about{display:grid;grid-template-columns:240px 1fr;gap:48px;max-width:980px;margin:0 auto;align-items:center;background:#f7f8fd;border:1px solid rgba(13,16,32,0.06);border-radius:30px;padding:48px;}
.spc-about-photo{position:relative;width:240px;height:240px;border-radius:24px;overflow:hidden;box-shadow:0 18px 50px rgba(13,16,32,0.18);}
.spc-about-photo::after{content:"";position:absolute;inset:0;border-radius:24px;padding:3px;background:linear-gradient(135deg,#2563eb,#7c3aed,#ec4899,#fb923c);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
.spc-about-img{object-fit:cover;object-position:center 28%;}
.spc-about h2{font-size:clamp(26px,3.4vw,38px);font-weight:800;letter-spacing:-0.03em;}
.spc-about p{font-size:15.5px;line-height:1.7;color:#525a72;margin-top:13px;}
.spc-about-kicker{font-size:18px !important;font-weight:700;color:#0d1020 !important;margin-top:20px !important;line-height:1.45;}
.spc-hand{font-family:var(--font-caveat),cursive;font-size:30px;margin-top:10px;background:linear-gradient(90deg,#7c3aed,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;display:inline-block;}

/* ===== final ===== */
.spc-final{position:relative;overflow:hidden;border-radius:34px;max-width:1000px;margin:0 auto;color:#fff;text-align:center;}
.spc-final-bg{position:absolute;inset:0;z-index:0;background:linear-gradient(120deg,#2563eb 0%,#7c3aed 34%,#ec4899 66%,#fb923c 100%);background-size:300% 300%;animation:spcShift 16s ease-in-out infinite;}
.spc-final-glow{position:absolute;inset:0;z-index:1;background:radial-gradient(120% 100% at 50% -10%,rgba(255,255,255,0.4),rgba(255,255,255,0) 55%);pointer-events:none;}
.spc-final-inner{position:relative;z-index:2;padding:72px 32px;}
.spc-final-title{font-size:clamp(30px,4.6vw,52px);font-weight:800;letter-spacing:-0.035em;line-height:1.08;text-shadow:0 4px 30px rgba(0,0,0,0.18);}
.spc-final-sub{font-size:18px;color:rgba(255,255,255,0.92);margin:18px auto 30px;max-width:540px;line-height:1.6;}
.spc-final-reassure{font-size:14px;color:rgba(255,255,255,0.82);margin-top:20px;}

/* ===== footer ===== */
.spc-footer{border-top:1px solid rgba(13,16,32,0.08);margin-top:80px;}
.spc-footer-inner{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;padding:30px 0;}
.spc-footer-logo{font-weight:800;font-size:18px;letter-spacing:-0.03em;color:#0d1020;}
.spc-footer-links{display:flex;gap:22px;flex-wrap:wrap;}
.spc-footer-links a{font-size:14px;color:#525a72;text-decoration:none;font-weight:500;}
.spc-footer-links a:hover{color:#0d1020;}

/* ===== responsive ===== */
@media(max-width:900px){
  .spc-nav-links{display:none;}
  .spc-steps{grid-template-columns:1fr 1fr;}
  .spc-plans{grid-template-columns:1fr 1fr;}
  .spc-agent-grid{grid-template-columns:1fr;}
  .spc-about{grid-template-columns:1fr;text-align:center;justify-items:center;padding:40px 28px;}
  .spc-problem{padding:44px 28px;}
}
@media(max-width:560px){
  .spc-hero-inner{padding:72px 20px 96px;}
  .spc-steps{grid-template-columns:1fr;}
  .spc-plans{grid-template-columns:1fr;}
  .spc-cta-row{flex-direction:column;}
  .spc-btn-white,.spc-btn-glass{width:100%;justify-content:center;}
  .spc-problem p{text-align:center;}
}
`}</style>

      {/* ===== nav ===== */}
      <nav className="spc-nav">
        <div className="spc-wrap spc-nav-inner">
          <span className="spc-logo">{brand.name}<span className="spc-logo-dot">{brand.tld}</span></span>
          <div className="spc-nav-links">
            <a href="#system">System</a>
            <a href="#agent">Agent</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>
          <a href={CAL} className="spc-nav-cta">Book a call</a>
        </div>
      </nav>

      {/* ===== hero ===== */}
      <header className="spc-hero">
        <div aria-hidden className="spc-hero-bg" />
        <div aria-hidden className="spc-hero-glow" />
        <div aria-hidden className="spc-hero-grain" />
        <div className="spc-hero-inner">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="spc-eyebrow"
          >
            <span className="spc-eyebrow-dot" />{heroline.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }} className="spc-h1"
          >
            Your business{' '}
            <span className="spc-rot">
              <motion.span
                key={wi}
                initial={{ opacity: 0.72, y: 8, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="spc-rot-word"
              >
                {words[wi]}
              </motion.span>
            </span>
            <br />while you live your life.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }} className="spc-sub"
          >
            {heroline.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }} className="spc-cta-row"
          >
            <a href={CAL} className="spc-btn-white">{heroline.ctaPrimary}<Arrow /></a>
            <a href="#system" className="spc-btn-glass">{heroline.ctaSecondary}</a>
          </motion.div>
          <p className="spc-reassure-hero">{heroline.reassure}</p>
        </div>
      </header>

      {/* ===== integrations strip ===== */}
      <section className="spc-strip spc-wrap">
        <div className="spc-strip-card">
          <p className="spc-strip-label">Connects the tools you already run</p>
          <div className="spc-pills">
            {integrations.map((t) => (
              <span key={t} className="spc-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <main>
        {/* ===== problem ===== */}
        <section className="spc-section spc-wrap">
          <div className="spc-problem">
            <div className="spc-problem-inner">
              <h2>{problem.title}</h2>
              <p>{problem.body[0]}</p>
              <p>{problem.body[1]}</p>
              <p>{problem.body[2]}</p>
              <p className="spc-punch">{problem.punch}</p>
              <br />
              <span className="spc-fix">{problem.fix}</span>
            </div>
          </div>
        </section>

        {/* ===== system / steps ===== */}
        <section id="system" className="spc-section spc-wrap">
          <div className="spc-head">
            <p className="spc-kicker">How it works</p>
            <h2 className="spc-h2">Four steps to a business that <span className="spc-grad-text">runs itself</span></h2>
          </div>
          <div className="spc-steps">
            {steps.map((s, i) => {
              const c = ACCENTS[i % ACCENTS.length];
              return (
                <div
                  key={s.n}
                  className="spc-step"
                  style={{ ['--c1' as string]: c.from, ['--c2' as string]: c.to, ['--cring' as string]: c.ring }}
                >
                  <span className="spc-step-bar" />
                  <span className="spc-step-n">{s.n}</span>
                  <h3 className="spc-step-title">{s.title}</h3>
                  <p className="spc-step-short">{s.short}</p>
                  <p className="spc-step-body">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== agent ===== */}
        <section id="agent" className="spc-section spc-wrap">
          <div className="spc-head">
            <p className="spc-kicker">Your invisible employee</p>
            <h2 className="spc-h2">The agent makes <span className="spc-grad-text">smart calls 24/7</span></h2>
            <p className="spc-lead">It learns your business and quietly does the revenue work while you sleep.</p>
          </div>
          <div className="spc-agent-grid">
            {agentMessages.map((m, i) => {
              const c = ACCENTS[i % ACCENTS.length];
              return (
                <div
                  key={i}
                  className="spc-agent-card"
                  style={{ ['--c1' as string]: c.from, ['--csoft' as string]: c.soft, ['--cring' as string]: c.ring }}
                >
                  <span className="spc-agent-ico">{m.icon}</span>
                  <div>
                    <p className="spc-agent-text">{m.text}</p>
                    <span className="spc-agent-tag">Handled automatically</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== pricing ===== */}
        <section id="pricing" className="spc-section spc-wrap">
          <div className="spc-head">
            <p className="spc-kicker">Pricing</p>
            <h2 className="spc-h2">Simple monthly pricing. <span className="spc-grad-text">Your website included.</span></h2>
          </div>
          <div className="spc-plans">
            {plans.map((p) => (
              p.popular ? (
                <div key={p.name} className="spc-plan spc-plan-pop">
                  <span className="spc-plan-badge">Most popular</span>
                  <div className="spc-plan-pop-inner">
                    <p className="spc-plan-name">{p.name}</p>
                    <p className="spc-plan-price">{p.price}<span className="spc-plan-cad">{p.cadence}</span></p>
                    <p className="spc-plan-tag">{p.tagline}</p>
                    <ul className="spc-plan-feats">
                      {p.features.map((f) => (
                        <li key={f}><Check />{f}</li>
                      ))}
                    </ul>
                    <a href={CAL} className="spc-plan-cta spc-plan-cta-pop">{p.cta}<Arrow /></a>
                    <p className="spc-plan-best">{p.best}</p>
                  </div>
                </div>
              ) : (
                <div key={p.name} className="spc-plan">
                  <p className="spc-plan-name">{p.name}</p>
                  <p className="spc-plan-price">{p.price}<span className="spc-plan-cad">{p.cadence}</span></p>
                  <p className="spc-plan-tag">{p.tagline}</p>
                  <ul className="spc-plan-feats">
                    {p.features.map((f) => (
                      <li key={f}><Check />{f}</li>
                    ))}
                  </ul>
                  <a href={CAL} className="spc-plan-cta spc-plan-cta-ghost">{p.cta}<Arrow /></a>
                  <p className="spc-plan-best">{p.best}</p>
                </div>
              )
            ))}
          </div>
        </section>

        {/* ===== about ===== */}
        <section id="about" className="spc-section spc-wrap">
          <div className="spc-about">
            <div className="spc-about-photo">
              <Image src={about.photo} alt="Josh, founder of foundos.ai" fill sizes="240px" className="spc-about-img" />
            </div>
            <div>
              <h2>Hey, I&apos;m {about.name}.</h2>
              {about.lines.map((l, i) => <p key={i}>{l}</p>)}
              <p className="spc-about-kicker">{about.kicker}</p>
              <p className="spc-hand">{about.signoff}</p>
            </div>
          </div>
        </section>

        {/* ===== final cta ===== */}
        <section className="spc-section spc-wrap">
          <div className="spc-final">
            <div aria-hidden className="spc-final-bg" />
            <div aria-hidden className="spc-final-glow" />
            <div className="spc-final-inner">
              <h2 className="spc-final-title">{closing.title}</h2>
              <p className="spc-final-sub">{closing.sub}</p>
              <a href={CAL} className="spc-btn-white">{closing.cta}<Arrow /></a>
              <p className="spc-final-reassure">{closing.reassure}</p>
            </div>
          </div>
        </section>
      </main>

      {/* ===== footer ===== */}
      <footer className="spc-footer">
        <div className="spc-wrap spc-footer-inner">
          <span className="spc-footer-logo">{brand.full}</span>
          <div className="spc-footer-links">
            <a href="#system">System</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href={CAL}>Book a call</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
