'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CAL, EMAIL, IG_HANDLE, brand, heroline, problem, steps,
  agentMessages, integrations, plans, about, closing,
} from '../content';

/* Direction — "Warm": founder-led, human, the opposite of corporate SaaS.
   Warm cream paper, terracotta/ember + amber, friendly serif headlines,
   hand-scribbled underline + handwritten signature. Feels like a real
   person who'll just handle it for you — not a tech startup. */

export default function Warm() {
  const words = heroline.rotating;
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((p) => (p + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <div className="wrm-root">
      <style>{CSS}</style>

      {/* warm paper texture / soft sun glow */}
      <div aria-hidden className="wrm-bg">
        <span className="wrm-glow wrm-glow-1" />
        <span className="wrm-glow wrm-glow-2" />
        <div className="wrm-paper" />
      </div>

      {/* nav */}
      <nav className="wrm-nav">
        <div className="wrm-wrap wrm-nav-inner">
          <span className="wrm-logo">
            {brand.name}<span className="wrm-logo-dot">{brand.tld}</span>
          </span>
          <div className="wrm-nav-links">
            <a href="#system">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">Meet Josh</a>
          </div>
          <a href={CAL} className="wrm-btn wrm-btn-sm">Book a call</a>
        </div>
      </nav>

      <main className="wrm-wrap">
        {/* hero */}
        <section className="wrm-hero">
          <div className="wrm-hero-copy">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="wrm-eyebrow"
            >
              <span className="wrm-eyebrow-dot" />{heroline.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }} className="wrm-h1"
            >
              Your business{' '}
              <span className="wrm-underline-wrap">
                <motion.span
                  key={wi}
                  initial={{ opacity: 0.55, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="wrm-rot"
                >
                  {words[wi]}
                </motion.span>
                {/* hand-scribbled underline under the key rotating word */}
                <svg className="wrm-squiggle" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden>
                  <path
                    d="M3 11 C 40 4, 70 16, 105 9 S 175 3, 210 10 S 270 16, 297 7"
                    fill="none" stroke="#c2502f" strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              while you live your life.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }} className="wrm-sub"
            >
              {heroline.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }} className="wrm-cta-row"
            >
              <a href={CAL} className="wrm-btn wrm-btn-lg">{heroline.ctaPrimary} →</a>
              <a href="#system" className="wrm-btn wrm-btn-ghost wrm-btn-lg">{heroline.ctaSecondary}</a>
            </motion.div>

            <p className="wrm-reassure">{heroline.reassure}</p>
          </div>

          {/* founder portrait, warm framed, prominent near the top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -2.5 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="wrm-hero-photo-wrap"
          >
            <div className="wrm-photo-frame">
              <div className="wrm-photo-inner">
                <Image
                  src={about.photo}
                  alt="Josh, founder of foundos.ai"
                  fill
                  sizes="320px"
                  className="wrm-photo-img"
                  priority
                />
              </div>
              <span className="wrm-photo-tape" />
              <p className="wrm-photo-cap">That&apos;s me — I&apos;ll handle it.</p>
            </div>
          </motion.div>
        </section>

        {/* trust strip */}
        <section className="wrm-trust">
          <p className="wrm-trust-label">Works with the tools you already run</p>
          <div className="wrm-pills">
            {integrations.map((t) => (
              <span key={t} className="wrm-pill">{t}</span>
            ))}
          </div>
        </section>

        {/* problem */}
        <section className="wrm-section">
          <div className="wrm-card wrm-problem">
            <p className="wrm-kicker">Let&apos;s be honest</p>
            <h2 className="wrm-h2">{problem.title}</h2>
            <div className="wrm-problem-body">
              {problem.body.map((b, i) => (
                <p key={i} className="wrm-p">{b}</p>
              ))}
            </div>
            <p className="wrm-punch">{problem.punch}</p>
            <p className="wrm-fix">{problem.fix}<span className="wrm-fix-mark"> And I&apos;d love to.</span></p>
          </div>
        </section>

        {/* system — 4 steps */}
        <section id="system" className="wrm-section">
          <div className="wrm-section-head">
            <p className="wrm-kicker">How I&apos;ll help</p>
            <h2 className="wrm-h2">Four steps to a business that runs itself</h2>
            <p className="wrm-section-sub">No jargon, no big rip-and-replace. Just a calm, proven path — and I&apos;m with you the whole way.</p>
          </div>
          <div className="wrm-steps">
            {steps.map((s) => (
              <div key={s.n} className="wrm-card wrm-step">
                <div className="wrm-step-top">
                  <span className="wrm-step-n">{s.n}</span>
                  <h3 className="wrm-step-title">{s.title}</h3>
                </div>
                <p className="wrm-step-short">{s.short}</p>
                <p className="wrm-step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* agent — "here's what I handled for you today" */}
        <section className="wrm-section">
          <div className="wrm-agent">
            <div className="wrm-agent-head">
              <p className="wrm-kicker">Your invisible employee</p>
              <h2 className="wrm-h2">Here&apos;s what I handled for you today</h2>
              <p className="wrm-section-sub">While you were busy living, the agent kept your business moving — every decision made the way you&apos;d want it.</p>
            </div>
            <div className="wrm-agent-list">
              {agentMessages.map((m, i) => (
                <div key={i} className="wrm-note">
                  <span className="wrm-note-ico">{m.icon}</span>
                  <p className="wrm-note-text">{m.text}</p>
                  <span className="wrm-note-done">✓ done</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* pricing */}
        <section id="pricing" className="wrm-section">
          <div className="wrm-section-head">
            <p className="wrm-kicker">Simple, honest pricing</p>
            <h2 className="wrm-h2">Pick a plan. Your website&apos;s included.</h2>
            <p className="wrm-section-sub">No long contracts, no surprises. Start small and grow — or go all-in. Either way, I&apos;m a text away.</p>
          </div>
          <div className="wrm-plans">
            {plans.map((p) => (
              <div key={p.name} className={`wrm-card wrm-plan ${p.popular ? 'wrm-plan-pop' : ''}`}>
                {p.popular && <span className="wrm-plan-badge">Most loved</span>}
                <p className="wrm-plan-name">{p.name}</p>
                <p className="wrm-plan-price">{p.price}<span className="wrm-plan-cad">{p.cadence}</span></p>
                <p className="wrm-plan-tag">{p.tagline}</p>
                <ul className="wrm-plan-feats">
                  {p.features.map((f) => (
                    <li key={f}><span className="wrm-check">✓</span><span>{f}</span></li>
                  ))}
                </ul>
                <p className="wrm-plan-best"><span className="wrm-plan-best-lbl">Best for:</span> {p.best}</p>
                <a href={CAL} className={`wrm-btn ${p.popular ? '' : 'wrm-btn-ghost'} wrm-plan-cta`}>{p.cta} →</a>
              </div>
            ))}
          </div>
        </section>

        {/* about Josh */}
        <section id="about" className="wrm-section">
          <div className="wrm-card wrm-about">
            <div className="wrm-about-photo-col">
              <div className="wrm-about-photo">
                <Image
                  src={about.photo}
                  alt="Josh, founder of foundos.ai"
                  fill
                  sizes="240px"
                  className="wrm-about-img"
                />
              </div>
              <p className="wrm-about-name">{about.name}</p>
              <p className="wrm-about-role">Founder, {brand.full}</p>
            </div>
            <div className="wrm-about-copy">
              <p className="wrm-kicker">Hi, I&apos;m Josh</p>
              <h2 className="wrm-h2">A real person, not a help desk.</h2>
              {about.lines.map((l, i) => (
                <p key={i} className="wrm-p">{l}</p>
              ))}
              <p className="wrm-about-kicker">{about.kicker}</p>
              <p className="wrm-hand">{about.signoff}</p>
            </div>
          </div>
        </section>

        {/* final CTA */}
        <section className="wrm-section wrm-final">
          <span className="wrm-final-mark">☕</span>
          <h2 className="wrm-final-title">{closing.title}</h2>
          <p className="wrm-final-sub">{closing.sub}</p>
          <a href={CAL} className="wrm-btn wrm-btn-lg">{closing.cta} →</a>
          <p className="wrm-reassure">{closing.reassure}</p>
        </section>
      </main>

      {/* footer */}
      <footer className="wrm-footer">
        <div className="wrm-wrap wrm-footer-inner">
          <span className="wrm-logo wrm-logo-sm">
            {brand.name}<span className="wrm-logo-dot">{brand.tld}</span>
          </span>
          <div className="wrm-footer-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span className="wrm-footer-sep">·</span>
            <a href={CAL}>Book a call</a>
            <span className="wrm-footer-sep">·</span>
            <span className="wrm-footer-ig">{IG_HANDLE}</span>
          </div>
          <p className="wrm-footer-note">Built by a human in Atlanta.</p>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.wrm-root{position:relative;min-height:100vh;background:#fbf6ec;color:#2a2018;font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.wrm-wrap{max-width:1140px;margin:0 auto;padding:0 24px;}

/* warm background */
.wrm-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;}
.wrm-glow{position:absolute;border-radius:50%;filter:blur(110px);}
.wrm-glow-1{width:54vw;height:54vw;left:-12vw;top:-16vw;background:radial-gradient(circle at 40% 40%,rgba(224,166,78,.42),rgba(224,166,78,0) 68%);animation:wrmFloat1 26s ease-in-out infinite;}
.wrm-glow-2{width:50vw;height:50vw;right:-12vw;top:30vw;background:radial-gradient(circle at 55% 45%,rgba(194,80,47,.30),rgba(194,80,47,0) 68%);animation:wrmFloat2 30s ease-in-out infinite;}
.wrm-paper{position:absolute;inset:0;background-image:radial-gradient(rgba(122,76,42,.05) 1px,transparent 1.4px);background-size:22px 22px;mask-image:linear-gradient(180deg,rgba(0,0,0,.9),rgba(0,0,0,.25));-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.9),rgba(0,0,0,.25));}
@keyframes wrmFloat1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(5vw,4vw) scale(1.08);}}
@keyframes wrmFloat2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-4vw,-3vw) scale(1.1);}}

/* nav */
.wrm-nav{position:sticky;top:0;z-index:30;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);background:rgba(251,246,236,.78);border-bottom:1px solid rgba(194,80,47,.12);}
.wrm-nav-inner{display:flex;align-items:center;justify-content:space-between;height:68px;}
.wrm-logo{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-weight:700;font-size:23px;letter-spacing:-.02em;color:#2a2018;}
.wrm-logo-dot{color:#c2502f;}
.wrm-logo-sm{font-size:20px;}
.wrm-nav-links{display:flex;gap:30px;}
.wrm-nav-links a{font-size:14.5px;color:#6b5a48;text-decoration:none;font-weight:500;transition:color .15s;}
.wrm-nav-links a:hover{color:#c2502f;}

main.wrm-wrap{position:relative;z-index:1;}

/* buttons */
.wrm-btn{display:inline-flex;align-items:center;gap:7px;background:#c2502f;color:#fff5ec;font-weight:600;font-size:15px;padding:13px 24px;border-radius:14px;text-decoration:none;box-shadow:0 8px 22px rgba(194,80,47,.26);transition:transform .15s,box-shadow .15s,background .15s;}
.wrm-btn:hover{transform:translateY(-2px);background:#a83f23;box-shadow:0 12px 28px rgba(194,80,47,.34);}
.wrm-btn-sm{padding:10px 18px;font-size:14px;border-radius:11px;}
.wrm-btn-lg{padding:16px 30px;font-size:16.5px;border-radius:15px;}
.wrm-btn-ghost{background:rgba(255,255,255,.6);color:#a83f23;border:1.5px solid rgba(194,80,47,.32);box-shadow:none;}
.wrm-btn-ghost:hover{background:#fff;border-color:#c2502f;box-shadow:0 6px 16px rgba(194,80,47,.12);}

/* hero */
.wrm-hero{display:grid;grid-template-columns:1.25fr .85fr;gap:54px;align-items:center;padding:74px 0 30px;}
.wrm-eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a83f23;margin-bottom:22px;background:rgba(194,80,47,.08);padding:7px 14px;border-radius:999px;}
.wrm-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#c2502f;box-shadow:0 0 0 4px rgba(194,80,47,.16);}
.wrm-h1{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:clamp(40px,5.6vw,68px);font-weight:700;line-height:1.06;letter-spacing:-.02em;margin-bottom:24px;color:#2a2018;}
.wrm-underline-wrap{position:relative;display:inline-block;color:#c2502f;white-space:nowrap;}
.wrm-rot{display:inline-block;font-style:italic;}
.wrm-squiggle{position:absolute;left:-2%;bottom:-.22em;width:104%;height:.42em;overflow:visible;}
.wrm-sub{font-size:18.5px;line-height:1.65;color:#5d4d3d;max-width:560px;margin-bottom:30px;}
.wrm-cta-row{display:flex;gap:14px;flex-wrap:wrap;}
.wrm-reassure{font-size:14px;color:#937e69;margin-top:18px;}

/* hero photo */
.wrm-hero-photo-wrap{display:flex;justify-content:center;}
.wrm-photo-frame{position:relative;background:#fffdf8;padding:14px 14px 0;border-radius:16px;box-shadow:0 22px 50px rgba(122,76,42,.22),0 2px 0 rgba(122,76,42,.06);border:1px solid rgba(194,80,47,.14);max-width:320px;}
.wrm-photo-inner{position:relative;width:290px;max-width:78vw;aspect-ratio:1/1.06;border-radius:8px;overflow:hidden;background:#efe2cf;}
.wrm-photo-img{object-fit:cover;object-position:center 25%;}
.wrm-photo-tape{position:absolute;top:-14px;left:50%;transform:translateX(-50%) rotate(-2deg);width:96px;height:26px;background:rgba(224,166,78,.5);border:1px dashed rgba(168,63,35,.35);border-radius:3px;}
.wrm-photo-cap{font-family:var(--font-caveat),cursive;font-size:25px;color:#a83f23;text-align:center;padding:12px 8px 16px;line-height:1.1;transform:rotate(-1deg);}

/* trust */
.wrm-trust{text-align:center;padding:34px 0 18px;}
.wrm-trust-label{font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:#9a836c;margin-bottom:18px;font-weight:600;}
.wrm-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:880px;margin:0 auto;}
.wrm-pill{padding:8px 17px;border-radius:999px;background:#fffdf8;border:1px solid rgba(194,80,47,.16);font-size:13.5px;font-weight:500;color:#6b5a48;box-shadow:0 2px 6px rgba(122,76,42,.05);}

/* sections */
.wrm-section{padding:54px 0;}
.wrm-section-head{text-align:center;max-width:680px;margin:0 auto 42px;}
.wrm-kicker{font-family:var(--font-caveat),cursive;font-size:23px;color:#c2502f;margin-bottom:6px;line-height:1;}
.wrm-h2{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:clamp(28px,3.6vw,42px);font-weight:700;letter-spacing:-.02em;line-height:1.14;color:#2a2018;}
.wrm-section-sub{font-size:16.5px;line-height:1.6;color:#6b5a48;margin-top:16px;}
.wrm-p{font-size:16.5px;line-height:1.72;color:#5d4d3d;}

/* card base */
.wrm-card{background:#fffdf8;border:1px solid rgba(194,80,47,.16);border-radius:22px;box-shadow:0 10px 34px rgba(122,76,42,.09);}

/* problem */
.wrm-problem{padding:46px;max-width:780px;margin:0 auto;text-align:center;}
.wrm-problem .wrm-kicker{margin-bottom:8px;}
.wrm-problem-body{display:flex;flex-direction:column;gap:14px;margin-top:18px;text-align:left;}
.wrm-punch{font-size:18.5px;font-weight:700;color:#a83f23;margin-top:26px;line-height:1.5;}
.wrm-fix{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:26px;font-weight:700;color:#2a2018;margin-top:12px;}
.wrm-fix-mark{color:#c2502f;}

/* steps */
.wrm-steps{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.wrm-step{padding:34px;transition:transform .18s,box-shadow .18s;}
.wrm-step:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(122,76,42,.14);}
.wrm-step-top{display:flex;align-items:center;gap:16px;}
.wrm-step-n{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:rgba(194,80,47,.1);color:#c2502f;font-family:Georgia,'Iowan Old Style',Palatino,serif;font-weight:700;font-size:18px;flex-shrink:0;border:1px solid rgba(194,80,47,.2);}
.wrm-step-title{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:25px;font-weight:700;letter-spacing:-.01em;color:#2a2018;}
.wrm-step-short{font-size:15.5px;font-weight:600;color:#a83f23;margin-top:16px;}
.wrm-step-body{font-size:15.5px;line-height:1.66;color:#5d4d3d;margin-top:10px;}

/* agent */
.wrm-agent{max-width:840px;margin:0 auto;}
.wrm-agent-head{text-align:center;max-width:660px;margin:0 auto 36px;}
.wrm-agent-list{display:flex;flex-direction:column;gap:14px;}
.wrm-note{display:flex;align-items:center;gap:18px;padding:20px 24px;background:#fffdf8;border:1px solid rgba(194,80,47,.16);border-left:4px solid #e0a64e;border-radius:16px;box-shadow:0 8px 24px rgba(122,76,42,.07);transition:transform .16s;}
.wrm-note:hover{transform:translateX(3px);}
.wrm-note-ico{font-size:24px;flex-shrink:0;}
.wrm-note-text{flex:1;font-size:16px;line-height:1.55;color:#3d3024;}
.wrm-note-done{font-size:12.5px;font-weight:700;letter-spacing:.04em;color:#8a5a1e;background:rgba(224,166,78,.2);padding:6px 12px;border-radius:999px;white-space:nowrap;flex-shrink:0;}

/* pricing */
.wrm-plans{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:start;}
.wrm-plan{padding:30px 24px;position:relative;display:flex;flex-direction:column;gap:14px;}
.wrm-plan-pop{border:2px solid #c2502f;box-shadow:0 18px 46px rgba(194,80,47,.2);background:linear-gradient(180deg,#fff7ee,#fffdf8 40%);}
.wrm-plan-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:#c2502f;color:#fff5ec;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:6px 15px;border-radius:999px;white-space:nowrap;box-shadow:0 6px 14px rgba(194,80,47,.3);}
.wrm-plan-name{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:21px;font-weight:700;color:#2a2018;}
.wrm-plan-price{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:34px;font-weight:700;letter-spacing:-.02em;color:#c2502f;}
.wrm-plan-cad{font-family:var(--font-inter),sans-serif;font-size:13px;font-weight:500;color:#9a836c;margin-left:4px;}
.wrm-plan-tag{font-size:14px;color:#6b5a48;line-height:1.4;}
.wrm-plan-feats{list-style:none;display:flex;flex-direction:column;gap:11px;padding:8px 0 4px;margin:0;border-top:1px solid rgba(194,80,47,.12);}
.wrm-plan-feats li{display:flex;gap:9px;font-size:13.5px;line-height:1.45;color:#5d4d3d;align-items:flex-start;}
.wrm-check{color:#c2502f;font-weight:800;flex-shrink:0;}
.wrm-plan-best{font-size:12.5px;line-height:1.5;color:#8a7560;margin-top:auto;padding-top:8px;}
.wrm-plan-best-lbl{font-weight:700;color:#6b5a48;}
.wrm-plan-cta{justify-content:center;margin-top:4px;}

/* about */
.wrm-about{display:grid;grid-template-columns:260px 1fr;gap:46px;padding:46px;align-items:center;}
.wrm-about-photo-col{display:flex;flex-direction:column;align-items:center;text-align:center;}
.wrm-about-photo{position:relative;width:230px;height:248px;border-radius:18px;overflow:hidden;box-shadow:0 16px 40px rgba(122,76,42,.22);border:6px solid #fffdf8;outline:1px solid rgba(194,80,47,.18);background:#efe2cf;}
.wrm-about-img{object-fit:cover;object-position:center 25%;}
.wrm-about-name{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:23px;font-weight:700;color:#2a2018;margin-top:18px;}
.wrm-about-role{font-size:14px;color:#9a836c;margin-top:2px;}
.wrm-about-copy .wrm-p{margin-top:14px;}
.wrm-about-kicker{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:21px;font-weight:700;font-style:italic;color:#a83f23;margin-top:22px;line-height:1.45;}
.wrm-hand{font-family:var(--font-caveat),cursive;font-size:38px;margin-top:14px;color:#c2502f;line-height:1;}

/* final */
.wrm-final{text-align:center;max-width:680px;margin:0 auto;}
.wrm-final-mark{font-size:40px;display:block;margin-bottom:14px;}
.wrm-final-title{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-size:clamp(32px,4.8vw,54px);font-weight:700;letter-spacing:-.02em;line-height:1.08;color:#2a2018;}
.wrm-final-sub{font-size:18px;color:#5d4d3d;margin:18px auto 28px;max-width:520px;line-height:1.6;}

/* footer */
.wrm-footer{position:relative;z-index:1;border-top:1px solid rgba(194,80,47,.14);margin-top:30px;padding:34px 0;}
.wrm-footer-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;}
.wrm-footer-links{display:flex;align-items:center;gap:12px;font-size:14px;}
.wrm-footer-links a{color:#6b5a48;text-decoration:none;}
.wrm-footer-links a:hover{color:#c2502f;}
.wrm-footer-sep{color:#c8b79f;}
.wrm-footer-ig{color:#9a836c;}
.wrm-footer-note{font-family:var(--font-caveat),cursive;font-size:19px;color:#a83f23;}

@media(max-width:980px){
  .wrm-hero{grid-template-columns:1fr;gap:40px;text-align:center;padding:54px 0 20px;}
  .wrm-hero-copy{display:flex;flex-direction:column;align-items:center;}
  .wrm-sub{margin-left:auto;margin-right:auto;}
  .wrm-cta-row{justify-content:center;}
  .wrm-underline-wrap{white-space:normal;}
  .wrm-steps{grid-template-columns:1fr;}
  .wrm-plans{grid-template-columns:1fr 1fr;}
  .wrm-about{grid-template-columns:1fr;text-align:center;justify-items:center;gap:30px;}
  .wrm-about-copy .wrm-p{text-align:left;}
}
@media(max-width:560px){
  .wrm-nav-links{display:none;}
  .wrm-plans{grid-template-columns:1fr;}
  .wrm-cta-row{flex-direction:column;width:100%;}
  .wrm-btn-lg{width:100%;justify-content:center;}
  .wrm-problem,.wrm-about{padding:30px 22px;}
  .wrm-note{flex-wrap:wrap;gap:10px;}
}
`;
