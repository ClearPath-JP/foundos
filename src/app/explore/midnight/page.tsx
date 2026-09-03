'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CAL, brand, heroline, problem, steps, agentMessages,
  integrations, plans, about, closing,
} from '../content';

/* Direction — "Midnight": dark AI command center. Near-black field with a
   faint dotted grid + soft indigo/cyan glows. The star is a live agent
   console streaming log lines with done-tags and a blinking cursor.
   Linear × Vercel, dark and premium. */

const TIMES = ['09:14:02', '09:14:08', '09:14:21', '09:14:37'];

export default function Midnight() {
  const words = heroline.rotating;
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((p) => (p + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <div className="mid-root">
      <style>{CSS}</style>

      {/* background field */}
      <div aria-hidden className="mid-bg">
        <div className="mid-grid" />
        <span className="mid-glow mid-glow-indigo" />
        <span className="mid-glow mid-glow-cyan" />
        <div className="mid-vignette" />
      </div>

      {/* nav */}
      <nav className="mid-nav">
        <div className="mid-wrap mid-nav-inner">
          <span className="mid-logo">
            <span className="mid-logo-mark" />
            {brand.name}<span className="mid-logo-dot">{brand.tld}</span>
          </span>
          <div className="mid-nav-links">
            <a href="#problem">Why</a>
            <a href="#system">System</a>
            <a href="#console">Live agent</a>
            <a href="#pricing">Pricing</a>
          </div>
          <a href={CAL} className="mid-btn mid-btn-sm">Book a call</a>
        </div>
      </nav>

      <main className="mid-wrap">
        {/* hero */}
        <section className="mid-hero">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="mid-eyebrow"
          >
            <span className="mid-eyebrow-dot" />{heroline.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }} className="mid-h1"
          >
            Your business{' '}
            <span className="mid-rot">
              <motion.span
                key={wi}
                initial={{ opacity: 0.55, y: 6, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mid-grad"
              >
                {words[wi]}
              </motion.span>
            </span>
            <br />while you live your life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }} className="mid-sub"
          >
            {heroline.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }} className="mid-cta-row"
          >
            <a href={CAL} className="mid-btn mid-btn-lg">{heroline.ctaPrimary} →</a>
            <a href="#system" className="mid-btn mid-btn-ghost mid-btn-lg">{heroline.ctaSecondary}</a>
          </motion.div>

          <p className="mid-reassure">{heroline.reassure}</p>
        </section>

        {/* integrations / trust strip */}
        <section className="mid-trust">
          <p className="mid-trust-label">Connects the tools you already run</p>
          <div className="mid-chips">
            {integrations.map((t) => (
              <span key={t} className="mid-chip">{t}</span>
            ))}
          </div>
        </section>

        {/* problem */}
        <section id="problem" className="mid-section">
          <div className="mid-panel mid-problem">
            <p className="mid-kicker">The trap</p>
            <h2 className="mid-h2">{problem.title}</h2>
            <p className="mid-p">{problem.body[0]}</p>
            <p className="mid-p">{problem.body[1]}</p>
            <p className="mid-p">{problem.body[2]}</p>
            <p className="mid-punch">{problem.punch}</p>
            <p className="mid-fix">{problem.fix}</p>
          </div>
        </section>

        {/* system — 4 steps */}
        <section id="system" className="mid-section">
          <div className="mid-section-head">
            <p className="mid-kicker">How it works</p>
            <h2 className="mid-h2">Four steps to a business that runs itself</h2>
          </div>
          <div className="mid-grid-2">
            {steps.map((s) => (
              <div key={s.n} className="mid-panel mid-step">
                <span className="mid-step-n">{s.n}</span>
                <h3 className="mid-step-title">{s.title}</h3>
                <p className="mid-step-short">{s.short}</p>
                <p className="mid-step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE STAR — live agent console */}
        <section id="console" className="mid-section">
          <div className="mid-section-head">
            <p className="mid-kicker">Your invisible employee</p>
            <h2 className="mid-h2">The agent makes smart calls 24/7</h2>
          </div>
          <div className="mid-console">
            <div className="mid-console-bar">
              <span className="mid-tl mid-tl-r" />
              <span className="mid-tl mid-tl-y" />
              <span className="mid-tl mid-tl-g" />
              <span className="mid-console-title">foundos agent · live</span>
              <span className="mid-console-live"><span className="mid-live-dot" />working</span>
            </div>
            <div className="mid-console-body">
              <div className="mid-log mid-log-sys">
                <span className="mid-ts">09:13:58</span>
                <span className="mid-log-text"><span className="mid-prompt">$</span> agent online · monitoring 4 connected systems</span>
              </div>
              {agentMessages.map((m, i) => (
                <div key={i} className="mid-log">
                  <span className="mid-ts">{TIMES[i] ?? '09:14:00'}</span>
                  <span className="mid-log-ico">{m.icon}</span>
                  <span className="mid-log-text">{m.text}</span>
                  <span className="mid-log-done">✓ done</span>
                </div>
              ))}
              <div className="mid-log mid-log-cursor">
                <span className="mid-ts">09:14:41</span>
                <span className="mid-log-text"><span className="mid-prompt">›</span> watching for the next move<span className="mid-cursor" /></span>
              </div>
            </div>
          </div>
        </section>

        {/* pricing */}
        <section id="pricing" className="mid-section">
          <div className="mid-section-head">
            <p className="mid-kicker">Pricing</p>
            <h2 className="mid-h2">Simple monthly pricing. Your website included.</h2>
          </div>
          <div className="mid-grid-4">
            {plans.map((p) => (
              <div key={p.name} className={`mid-panel mid-plan ${p.popular ? 'mid-plan-pop' : ''}`}>
                {p.popular && <span className="mid-plan-badge">Most popular</span>}
                <p className="mid-plan-name">{p.name}</p>
                <p className="mid-plan-price">{p.price}<span className="mid-plan-cad">{p.cadence}</span></p>
                <p className="mid-plan-tag">{p.tagline}</p>
                <ul className="mid-plan-feats">
                  {p.features.map((f) => (
                    <li key={f}><span className="mid-check">→</span>{f}</li>
                  ))}
                </ul>
                <a href={CAL} className={`mid-btn ${p.popular ? '' : 'mid-btn-ghost'} mid-plan-cta`}>{p.cta} →</a>
              </div>
            ))}
          </div>
        </section>

        {/* about Josh */}
        <section className="mid-section">
          <div className="mid-panel mid-about">
            <div className="mid-about-photo">
              <Image src={about.photo} alt="Josh, founder of foundos.ai" fill sizes="200px" className="mid-about-img" />
              <span className="mid-about-ring" />
            </div>
            <div className="mid-about-copy">
              <p className="mid-kicker">The builder</p>
              <h2 className="mid-h2">Hey, I&apos;m {about.name}.</h2>
              {about.lines.map((l, i) => <p key={i} className="mid-p">{l}</p>)}
              <p className="mid-about-kicker">{about.kicker}</p>
              <p className="mid-hand">{about.signoff}</p>
            </div>
          </div>
        </section>

        {/* final cta */}
        <section className="mid-section mid-final">
          <h2 className="mid-final-title">{closing.title}</h2>
          <p className="mid-final-sub">{closing.sub}</p>
          <a href={CAL} className="mid-btn mid-btn-lg">{closing.cta} →</a>
          <p className="mid-reassure">{closing.reassure}</p>
        </section>

        <footer className="mid-footer">
          <span className="mid-logo mid-logo-foot">{brand.name}<span className="mid-logo-dot">{brand.tld}</span></span>
          <span className="mid-foot-meta">© {new Date().getFullYear()} {brand.full} · Built by Josh</span>
        </footer>
      </main>
    </div>
  );
}

const CSS = `
.mid-root{position:relative;min-height:100vh;background:#080812;color:#e8e8f5;font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.mid-wrap{max-width:1140px;margin:0 auto;padding:0 24px;}

/* background field */
.mid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120% 90% at 50% -10%,#0d0a1a 0%,#080812 60%);overflow:hidden;}
.mid-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:34px 34px;mask-image:radial-gradient(110% 80% at 50% 0%,#000 30%,transparent 75%);-webkit-mask-image:radial-gradient(110% 80% at 50% 0%,#000 30%,transparent 75%);}
.mid-glow{position:absolute;border-radius:50%;filter:blur(120px);}
.mid-glow-indigo{width:55vw;height:55vw;left:-12vw;top:-18vw;background:radial-gradient(circle,rgba(99,102,241,.42),transparent 65%);}
.mid-glow-cyan{width:48vw;height:48vw;right:-14vw;top:32vw;background:radial-gradient(circle,rgba(34,211,238,.22),transparent 65%);}
.mid-vignette{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,8,18,0) 60%,rgba(8,8,18,.85) 100%);}

/* nav */
.mid-nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(8,8,18,.62);border-bottom:1px solid rgba(255,255,255,.08);}
.mid-nav-inner{display:flex;align-items:center;justify-content:space-between;height:66px;}
.mid-logo{display:inline-flex;align-items:center;gap:9px;font-weight:800;font-size:20px;letter-spacing:-.03em;color:#f3f3fb;}
.mid-logo-mark{width:18px;height:18px;border-radius:6px;background:linear-gradient(135deg,#6366f1,#22d3ee);box-shadow:0 0 16px rgba(99,102,241,.6);}
.mid-logo-dot{background:linear-gradient(90deg,#818cf8,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;}
.mid-nav-links{display:flex;gap:30px;}
.mid-nav-links a{font-size:14px;color:#8b8ba8;text-decoration:none;font-weight:500;transition:color .15s;}
.mid-nav-links a:hover{color:#e8e8f5;}

main.mid-wrap{position:relative;z-index:1;}

/* buttons */
.mid-btn{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(180deg,#6366f1,#4f46e5);color:#fff;font-weight:600;font-size:15px;padding:13px 24px;border-radius:11px;text-decoration:none;border:1px solid rgba(255,255,255,.14);box-shadow:0 0 0 1px rgba(99,102,241,.25),0 10px 30px rgba(79,70,229,.4),0 0 40px rgba(99,102,241,.25);transition:transform .15s,box-shadow .15s;}
.mid-btn:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(99,102,241,.4),0 14px 38px rgba(79,70,229,.5),0 0 56px rgba(99,102,241,.4);}
.mid-btn-sm{padding:9px 17px;font-size:13.5px;border-radius:9px;}
.mid-btn-lg{padding:16px 30px;font-size:16px;}
.mid-btn-ghost{background:rgba(255,255,255,.03);color:#d6d6ec;border:1px solid rgba(255,255,255,.15);box-shadow:none;backdrop-filter:blur(6px);}
.mid-btn-ghost:hover{border-color:rgba(255,255,255,.32);background:rgba(255,255,255,.06);box-shadow:0 0 24px rgba(255,255,255,.06);}

/* hero */
.mid-hero{text-align:center;padding:96px 0 44px;max-width:880px;margin:0 auto;}
.mid-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-geist-mono),monospace;font-size:12.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#9b9bc4;padding:7px 15px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.03);margin-bottom:30px;}
.mid-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#22d3ee;box-shadow:0 0 10px #22d3ee;}
.mid-h1{font-size:clamp(42px,6.6vw,78px);font-weight:800;line-height:1.04;letter-spacing:-.04em;margin-bottom:26px;color:#f4f4fc;}
.mid-rot{display:inline-block;position:relative;}
.mid-grad{display:inline-block;background:linear-gradient(90deg,#818cf8,#6366f1 40%,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 26px rgba(99,102,241,.45));}
.mid-sub{font-size:18.5px;line-height:1.62;color:#9a9abd;max-width:660px;margin:0 auto 34px;}
.mid-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.mid-reassure{font-size:13.5px;color:#7a7a99;margin-top:18px;}

/* trust strip */
.mid-trust{padding:18px 0 44px;text-align:center;}
.mid-trust-label{font-family:var(--font-geist-mono),monospace;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#6f6f93;margin-bottom:18px;}
.mid-chips{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;}
.mid-chip{font-family:var(--font-geist-mono),monospace;font-size:12.5px;padding:7px 14px;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#b3b3d4;}

/* sections */
.mid-section{padding:60px 0;}
.mid-section-head{text-align:center;max-width:720px;margin:0 auto 42px;}
.mid-kicker{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#818cf8;margin-bottom:14px;}
.mid-h2{font-size:clamp(28px,3.9vw,44px);font-weight:800;letter-spacing:-.032em;line-height:1.12;color:#f1f1fb;}
.mid-p{font-size:16px;line-height:1.72;color:#9a9abd;margin-top:14px;}

/* panels */
.mid-panel{background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.08);border-radius:20px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

.mid-problem{padding:48px;max-width:820px;margin:0 auto;text-align:center;}
.mid-punch{font-size:18.5px;font-weight:700;color:#22d3ee;margin-top:24px;line-height:1.5;}
.mid-fix{font-size:21px;font-weight:800;margin-top:10px;background:linear-gradient(90deg,#818cf8,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* steps */
.mid-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.mid-step{padding:32px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s;}
.mid-step:hover{border-color:rgba(99,102,241,.4);transform:translateY(-3px);}
.mid-step-n{display:inline-block;font-family:var(--font-geist-mono),monospace;font-size:30px;font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#818cf8,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 18px rgba(99,102,241,.5));}
.mid-step-title{font-size:23px;font-weight:800;letter-spacing:-.02em;margin-top:6px;color:#f1f1fb;}
.mid-step-short{font-size:15px;font-weight:600;color:#a5b4fc;margin-top:6px;}
.mid-step-body{font-size:14.5px;line-height:1.66;color:#8b8bad;margin-top:12px;}

/* console — the star */
.mid-console{max-width:840px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#0b0b18;box-shadow:0 0 0 1px rgba(99,102,241,.18),0 30px 80px rgba(0,0,0,.6),0 0 90px rgba(99,102,241,.18);}
.mid-console-bar{display:flex;align-items:center;gap:8px;padding:13px 16px;background:#11111f;border-bottom:1px solid rgba(255,255,255,.07);}
.mid-tl{width:11px;height:11px;border-radius:50%;}
.mid-tl-r{background:#ff5f57;}.mid-tl-y{background:#febc2e;}.mid-tl-g{background:#28c840;}
.mid-console-title{margin-left:10px;font-family:var(--font-geist-mono),monospace;font-size:12.5px;color:#9b9bc4;}
.mid-console-live{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-family:var(--font-geist-mono),monospace;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#34d399;}
.mid-live-dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399;animation:midPulse 1.6s ease-in-out infinite;}
.mid-console-body{padding:14px 8px;font-family:var(--font-geist-mono),monospace;}
.mid-log{display:flex;align-items:flex-start;gap:14px;padding:13px 16px;border-radius:10px;line-height:1.5;}
.mid-log:hover{background:rgba(255,255,255,.025);}
.mid-ts{flex-shrink:0;font-size:12px;color:#5a5a7e;padding-top:1px;min-width:62px;}
.mid-log-ico{flex-shrink:0;font-size:16px;line-height:1.2;}
.mid-log-text{flex:1;font-size:13.5px;color:#d4d4ee;}
.mid-log-done{flex-shrink:0;font-size:11px;font-weight:700;letter-spacing:.04em;color:#34d399;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.22);padding:4px 9px;border-radius:7px;white-space:nowrap;align-self:center;}
.mid-log-sys .mid-log-text{color:#9b9bc4;}
.mid-prompt{color:#22d3ee;margin-right:8px;}
.mid-cursor{display:inline-block;width:8px;height:15px;margin-left:4px;vertical-align:text-bottom;background:#22d3ee;box-shadow:0 0 8px #22d3ee;animation:midBlink 1.05s step-end infinite;}
@keyframes midBlink{0%,49%{opacity:1;}50%,100%{opacity:.25;}}
@keyframes midPulse{0%,100%{opacity:1;}50%{opacity:.4;}}

/* pricing */
.mid-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;align-items:start;}
.mid-plan{padding:28px 22px;position:relative;display:flex;flex-direction:column;gap:13px;transition:border-color .2s,transform .2s;}
.mid-plan:hover{border-color:rgba(255,255,255,.18);transform:translateY(-3px);}
.mid-plan-pop{border:1px solid transparent;background:linear-gradient(180deg,rgba(99,102,241,.12),rgba(255,255,255,.02)) padding-box,linear-gradient(135deg,#6366f1,#22d3ee) border-box;box-shadow:0 0 0 1px rgba(99,102,241,.3),0 18px 56px rgba(79,70,229,.3),0 0 70px rgba(99,102,241,.22);}
.mid-plan-pop:hover{transform:translateY(-3px);}
.mid-plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,#6366f1,#22d3ee);color:#06060f;font-size:10.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:5px 13px;border-radius:999px;white-space:nowrap;box-shadow:0 0 20px rgba(99,102,241,.5);}
.mid-plan-name{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#a5b4fc;}
.mid-plan-price{font-size:33px;font-weight:800;letter-spacing:-.03em;color:#f3f3fb;}
.mid-plan-cad{font-size:12.5px;font-weight:500;color:#7a7a99;margin-left:5px;}
.mid-plan-tag{font-size:13.5px;color:#9a9abd;}
.mid-plan-feats{list-style:none;display:flex;flex-direction:column;gap:10px;flex:1;margin:4px 0;}
.mid-plan-feats li{display:flex;gap:9px;font-size:13px;line-height:1.45;color:#b3b3d4;}
.mid-check{color:#22d3ee;font-weight:800;flex-shrink:0;}
.mid-plan-cta{justify-content:center;margin-top:4px;}

/* about */
.mid-about{display:grid;grid-template-columns:200px 1fr;gap:42px;padding:46px;align-items:center;}
.mid-about-photo{position:relative;width:200px;height:200px;border-radius:20px;overflow:hidden;flex-shrink:0;box-shadow:0 14px 44px rgba(0,0,0,.5);}
.mid-about-img{object-fit:cover;object-position:center 28%;}
.mid-about-ring{position:absolute;inset:0;border-radius:20px;border:1px solid rgba(99,102,241,.4);box-shadow:inset 0 0 30px rgba(99,102,241,.25);pointer-events:none;}
.mid-about-kicker{font-size:18px;font-weight:700;color:#f1f1fb;margin-top:22px;line-height:1.45;}
.mid-hand{font-family:var(--font-caveat),cursive;font-size:30px;margin-top:12px;background:linear-gradient(90deg,#818cf8,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* final */
.mid-final{text-align:center;max-width:700px;margin:0 auto;}
.mid-final-title{font-size:clamp(34px,5.2vw,56px);font-weight:800;letter-spacing:-.035em;line-height:1.08;color:#f4f4fc;}
.mid-final-sub{font-size:18px;color:#9a9abd;margin:18px auto 30px;max-width:540px;line-height:1.6;}

/* footer */
.mid-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;padding:36px 0 56px;margin-top:30px;border-top:1px solid rgba(255,255,255,.08);}
.mid-logo-foot{font-size:17px;}
.mid-foot-meta{font-family:var(--font-geist-mono),monospace;font-size:12px;color:#6f6f93;}

@media(max-width:880px){
  .mid-nav-links{display:none;}
  .mid-grid-2{grid-template-columns:1fr;}
  .mid-grid-4{grid-template-columns:1fr 1fr;}
  .mid-about{grid-template-columns:1fr;text-align:center;justify-items:center;}
  .mid-problem{padding:34px 24px;}
}
@media(max-width:560px){
  .mid-grid-4{grid-template-columns:1fr;}
  .mid-cta-row{flex-direction:column;}
  .mid-btn-lg{width:100%;justify-content:center;}
  .mid-hero{padding:64px 0 36px;}
  .mid-ts{display:none;}
  .mid-log{gap:10px;padding:12px 12px;}
  .mid-about{padding:30px 22px;}
}
`;
