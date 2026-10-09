/**
 * The audit landing page (2026-10-09). Sits on top of FX_CSS (tokens, buttons) and FX_HOME_CSS (the liquid).
 * Type: Bricolage Grotesque headlines (--font-display), Inter Tight body (--font-manrope slot).
 * Phone first: one column, 17–18px body, 44px+ targets, no sticky controls over the form.
 */
export const LANDING_CSS = `
.fx{font-size:17px;}
.fx-eyebrow{font-family:var(--font-manrope),system-ui,sans-serif;}
.lp-head .fx-head-row{min-height:60px;}
.lp-head .fx-logo{font-family:var(--font-display),system-ui,sans-serif;letter-spacing:-.04em;}
.lp-by{font-size:15px;font-weight:600;color:var(--muted);}
.fx-logo-os{background:linear-gradient(90deg,var(--p),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent;}
.lp-grad{background:linear-gradient(95deg,var(--p) 10%,#9B3FD8 55%,var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent;}

/* ---- hero: copy + live form ---- */
.lp-hero{position:relative;overflow:clip;isolation:isolate;padding:36px 0 64px;scroll-margin-top:60px;}
.lp-hero .fx-liquid{bottom:auto;height:520px;}
@media (min-width:960px){.lp-hero{padding:72px 0 96px;}.lp-hero .fx-liquid{height:100%;}}
.lp-hero-grid{position:relative;z-index:1;display:grid;gap:32px;align-items:start;}
@media (min-width:960px){.lp-hero-grid{grid-template-columns:minmax(0,1fr) minmax(0,460px);gap:64px;}
  .lp-hero-copy{position:sticky;top:120px;padding-top:24px;}}
.lp-h1{font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:clamp(40px,6.4vw,74px);line-height:1;
  letter-spacing:-.05em;margin:16px 0 0;max-width:14ch;text-wrap:balance;}
.lp-lede{margin-top:20px;font-size:clamp(18px,1.6vw,20px);line-height:1.55;color:#3F3A4B;max-width:32em;}
.lp-ticks{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:8px;font-size:16px;font-weight:600;color:var(--text);}
.lp-ticks li{display:flex;gap:10px;align-items:center;}
.lp-ticks li::before{content:'';flex:none;width:18px;height:18px;border-radius:50%;
  background:var(--p) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.5 2.5L12 5.5' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/14px no-repeat;}

.lp-form-card{background:rgba(255,255,255,.92);border:1px solid var(--line);border-radius:20px;padding:24px 18px 16px;
  box-shadow:0 1px 2px rgba(23,20,33,.06),0 24px 60px -24px rgba(109,40,217,.35);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);}
@media (min-width:640px){.lp-form-card{padding:32px 30px 20px;}}
.lp-form-h{font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:26px;letter-spacing:-.035em;line-height:1.15;margin:0;}
.lp-form-intro{margin-top:8px;font-size:15px;line-height:1.55;color:var(--muted);}
.lp-form-intro a{font-weight:700;}
.lp-form-frame{margin-top:16px;}
.lp-iframe{display:block;width:100%;min-height:560px;border:0;}
.lp-form-frame--done .lp-iframe{height:230px!important;min-height:0;}
.lp-iframe--wait{background:linear-gradient(90deg,var(--tint),#fff,var(--tint));border-radius:12px;}
.lp-form-alt{margin-top:8px;font-size:15px;color:var(--muted);}
.lp-form-alt a,.lp-form-missing a{display:inline-flex;align-items:center;min-height:44px;font-weight:700;}
.lp-form-missing{margin-top:16px;padding:16px;background:var(--tint);border-radius:12px;}

/* ---- section basics ---- */
.lp-sec{padding:72px 0;}
@media (min-width:960px){.lp-sec{padding:112px 0;}}
.lp-h2{font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:clamp(32px,4.6vw,54px);line-height:1.04;
  letter-spacing:-.045em;margin:0;max-width:18ch;text-wrap:balance;}

/* ---- the three checks: dark band, numbered columns on a rail ---- */
.lp-checks{position:relative;overflow:hidden;background:#171421;color:#fff;padding:72px 0 80px;}
.lp-checks::before{content:'';position:absolute;inset:-20% -10% auto auto;width:70%;height:90%;pointer-events:none;
  background:radial-gradient(closest-side,rgba(109,40,217,.55),transparent),radial-gradient(closest-side at 70% 70%,rgba(197,46,152,.35),transparent);filter:blur(30px);}
.lp-checks>.fx-wrap{position:relative;}
@media (min-width:960px){.lp-checks{padding:120px 0 128px;}}
.lp-checks-kicker{font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#C9B5F5;}
.lp-h2--light{color:#fff;margin-top:12px;}
.lp-steps{list-style:none;margin:48px 0 0;padding:0;display:grid;gap:40px;counter-reset:s;}
@media (min-width:860px){.lp-steps{grid-template-columns:repeat(3,minmax(0,1fr));gap:40px;margin-top:72px;}}
.lp-step{position:relative;padding-top:28px;border-top:2px solid rgba(255,255,255,.16);}
.lp-step::before{content:'';position:absolute;top:-2px;left:0;width:72px;height:2px;background:linear-gradient(90deg,var(--p),var(--pink));}
.lp-step-n{display:block;font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:clamp(64px,8vw,104px);
  line-height:.9;letter-spacing:-.06em;background:linear-gradient(160deg,#B48CFF 0%,#E05BB5 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}
.lp-step-t{font-family:var(--font-display),system-ui,sans-serif;font-size:26px;font-weight:700;letter-spacing:-.035em;line-height:1.15;margin:18px 0 0;}
.lp-step-d{margin-top:12px;color:#CFC8DD;font-size:17px;line-height:1.6;}
.lp-step-looks{list-style:none;margin:18px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px;}
.lp-step-looks li{font-size:13px;font-weight:600;color:#EDE5FA;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.08);}

/* ---- founder ---- */
.lp-founder{display:grid;gap:32px;align-items:center;}
@media (min-width:860px){.lp-founder{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:72px;}}
.lp-portrait{margin:0;border-radius:20px;overflow:hidden;max-width:420px;aspect-ratio:4/5;background:var(--tint);}
.lp-portrait img{width:100%;height:100%;object-fit:cover;display:block;}
.lp-founder .fx-p{color:#3F3A4B;font-size:18px;}
.lp-sign{margin-top:16px;font-weight:700;}
.lp-again{margin-top:24px;}

/* ---- FAQ ---- */
.lp-faq-sec{border-top:1px solid var(--line);}
.lp-faq{margin-top:32px;max-width:760px;border-top:1px solid var(--line);}
.lp-faq details{border-bottom:1px solid var(--line);}
.lp-faq summary{display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:64px;padding:12px 0;
  cursor:pointer;font-weight:700;font-size:19px;list-style:none;}
.lp-faq summary::-webkit-details-marker{display:none;}
.lp-faq summary::after{content:'+';font-size:26px;font-weight:400;color:var(--p);flex:none;}
.lp-faq details[open] summary::after{content:'−';}
.lp-faq summary:focus-visible{outline:3px solid var(--p);outline-offset:3px;}
.lp-faq details p{padding:0 0 20px;color:var(--muted);max-width:40em;}

/* ---- footer ---- */
.lp-foot{padding:40px 0 48px;border-top:1px solid var(--line);}
.lp-foot-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 24px;font-size:16px;color:var(--muted);}
.lp-foot-row a{display:inline-flex;align-items:center;min-height:44px;}

/* ---- privacy page ---- */
.lp-form-wrap{max-width:720px;}
.lp-row-t{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;font-weight:700;letter-spacing:-.03em;line-height:1.3;margin:0;}

@media (prefers-reduced-motion:reduce){.lp-hero-copy{position:static;}}
`;
