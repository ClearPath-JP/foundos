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

/* ---- the story (2026-10-11 scroll journey): four chapter sections, copy + a 16:9 slot, one visual each ---- */
.lp-hero-cta{margin-top:28px;}
@media (min-width:960px){.lp-hero{padding:88px 0 112px;}.lp-hero-grid{grid-template-columns:minmax(0,820px);}
  .lp-hero-copy{position:static;padding-top:0;}.lp-hero .fx-liquid{height:100%;}}

.lp-ch{border-top:1px solid var(--line);}
.lp-ch-grid{display:grid;gap:28px;}
@media (min-width:960px){.lp-ch-grid{grid-template-columns:minmax(0,.85fr) minmax(0,1.25fr);gap:64px;align-items:center;}
  .lp-ch-grid--solo{grid-template-columns:minmax(0,760px);}}
.lp-ch-kicker{display:flex;align-items:baseline;gap:12px;font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--p);}
.lp-ch-n{font-family:var(--font-display),system-ui,sans-serif;font-size:40px;font-weight:800;letter-spacing:-.06em;line-height:1;
  background:linear-gradient(160deg,var(--p),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent;}
.lp-ch-h{margin-top:14px;font-size:clamp(30px,4.2vw,48px);}
.lp-ch-p{margin-top:16px;max-width:34em;color:#3F3A4B;font-size:18px;line-height:1.6;}
.lp-ch-visual{margin-top:40px;}
@media (min-width:960px){.lp-ch-visual{margin-top:64px;}}
.lp-vis-cap{font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 16px;}
.lp-journey,.lp-fixes{margin:0;}

/* 16:9 slot. Pending = a static panel with the checks band's glow; nothing in it is clickable. */
.vsl-frame{position:relative;aspect-ratio:16/9;border-radius:20px;overflow:hidden;background:#171421;
  box-shadow:0 1px 2px rgba(23,20,33,.08),0 24px 60px -28px rgba(109,40,217,.45);}
.vsl-frame--pending::before{content:'';position:absolute;inset:-30% -20% auto auto;width:80%;height:120%;pointer-events:none;
  background:radial-gradient(closest-side,rgba(109,40,217,.5),transparent),radial-gradient(closest-side at 70% 70%,rgba(197,46,152,.32),transparent);filter:blur(30px);}
.vsl-video{display:block;width:100%;height:100%;object-fit:contain;background:#000;}
.vsl-status{position:relative;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:18px 20px;color:#fff;}
@media (min-width:640px){.vsl-status{padding:32px 36px;}}
.vsl-status-h{font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:clamp(19px,2.4vw,28px);letter-spacing:-.04em;line-height:1.1;}
.vsl-status-d{color:#CFC8DD;font-size:15px;line-height:1.45;max-width:30em;}
.vsl-retry{align-self:flex-start;margin-top:10px;}
.vsl-loading{position:absolute;left:16px;top:16px;margin:0;padding:6px 12px;border-radius:999px;pointer-events:none;
  background:rgba(23,20,33,.8);color:#fff;font-size:14px;font-weight:600;}
.vsl-transcript{margin-top:16px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.vsl-transcript summary{display:flex;align-items:center;min-height:52px;cursor:pointer;font-weight:700;color:var(--p);}
.fx .vsl-transcript summary:focus-visible{outline:3px solid var(--p);outline-offset:3px;}
.vsl-transcript p{padding:0 0 14px;color:#3F3A4B;max-width:40em;}

/* Ch 2: seven stops. Phone = a vertical rail; wide = one row joined by a line. */
.lp-journey-list{list-style:none;margin:0;padding:0;display:grid;gap:0;position:relative;}
.lp-journey-stop{position:relative;display:grid;grid-template-columns:36px 1fr;column-gap:16px;align-content:start;padding:0 0 22px;}
.lp-journey-stop::before{content:'';position:absolute;left:17px;top:36px;bottom:0;width:2px;background:var(--line);}
.lp-journey-stop:last-child{padding-bottom:0;}
.lp-journey-stop:last-child::before{display:none;}
.lp-journey-dot{grid-row:span 2;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;
  background:var(--lav);color:var(--p);font-weight:800;font-size:15px;}
.lp-journey-t{font-family:var(--font-display),system-ui,sans-serif;font-weight:700;font-size:20px;letter-spacing:-.03em;line-height:1.2;padding-top:6px;}
.lp-journey-q{color:var(--muted);font-size:16px;line-height:1.45;margin-top:2px;}
@media (min-width:960px){
  .lp-journey-list{grid-template-columns:repeat(7,minmax(0,1fr));gap:16px;}
  .lp-journey-stop{grid-template-columns:1fr;row-gap:12px;padding:0;}
  .lp-journey-stop::before{left:44px;right:-16px;top:17px;bottom:auto;width:auto;height:2px;}
  .lp-journey-stop:last-child::before{display:none;}
  .lp-journey-dot{grid-row:auto;}
  .lp-journey-t{padding-top:0;font-size:18px;}
  .lp-journey-q{font-size:15px;}
}

/* Ch 3: friction → simpler pairs. */
.lp-fixes-list{list-style:none;margin:0;padding:0;display:grid;gap:12px;}
@media (min-width:860px){.lp-fixes-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}}
.lp-fix{border:1px solid var(--line);border-radius:16px;padding:18px 18px 20px;background:#fff;}
.lp-fix-before,.lp-fix-after{display:grid;gap:4px;font-size:16px;line-height:1.5;}
.lp-fix-before{color:var(--muted);}
.lp-fix-after{margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);color:var(--text);font-weight:600;}
.lp-fix-tag{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);}
.lp-fix-tag--after{color:var(--p);}
.lp-fixes-note{margin-top:20px;font-weight:700;font-size:18px;max-width:34em;}

/* Ch 4: the method, four numbered steps. */
.lp-method{list-style:none;margin:0;padding:0;display:grid;gap:12px;counter-reset:m;}
@media (min-width:640px){.lp-method{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}}
@media (min-width:960px){.lp-method{grid-template-columns:repeat(4,minmax(0,1fr));}}
.lp-method-step{position:relative;overflow:hidden;padding:22px 18px 22px;border-radius:16px;background:var(--tint);}
.lp-method-step::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--p),var(--pink));}
.lp-method-n{display:block;font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:15px;color:var(--p);}
.lp-method-t{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;font-weight:700;letter-spacing:-.03em;margin:6px 0 0;}
.lp-method-d{margin-top:8px;color:#3F3A4B;font-size:16px;line-height:1.5;}

/* The form, moved to the end of the story. Same card; the liquid comes back behind it. */
.lp-request{position:relative;overflow:clip;isolation:isolate;scroll-margin-top:60px;}
.lp-request .fx-liquid{bottom:auto;height:100%;}
.lp-request-wrap{position:relative;z-index:1;max-width:620px;}

/* Subtle fade-up as each block enters, CSS only. Without support, or with reduced motion, it's simply visible. */
@supports (animation-timeline: view()){
  @media (prefers-reduced-motion:no-preference){
    .lp-reveal{animation:lp-rise linear both;animation-timeline:view();animation-range:entry 0% entry 40%;}
    @keyframes lp-rise{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:none;}}
  }
}

/* ---- services page (2026-10-11): hero buttons, cards, details, Complete band, cost-saving, terms, work, contact ---- */
.lp-hero-btns{margin-top:28px;display:flex;flex-wrap:wrap;gap:12px;}
.lp-hero-price{margin-top:18px;font-size:18px;line-height:1.5;color:#3F3A4B;}
.lp-hero-price strong{color:var(--text);font-weight:800;}
.lp-hero-audit{margin-top:16px;font-size:16px;color:var(--muted);}
.lp-hero-audit a{font-weight:700;display:inline-flex;align-items:center;min-height:44px;}
.lp-audit-intro{border-top:1px solid var(--line);padding-bottom:56px;}
.lp-audit-intro .lp-h2{margin-top:14px;max-width:16ch;}

.svc-sec,.svc-cost,.svc-work,.svc-contact,.svc-terms{border-top:1px solid var(--line);}
.svc-h2{margin-top:14px;font-size:clamp(30px,4.2vw,48px);}
.svc-cards{list-style:none;margin:32px 0 0;padding:0;display:grid;gap:14px;}
@media (min-width:640px){.svc-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}}
@media (min-width:1080px){.svc-cards{grid-template-columns:repeat(3,minmax(0,1fr));}}
.svc-card{position:relative;overflow:hidden;display:flex;flex-direction:column;padding:22px 20px 18px;border:1px solid var(--line);border-radius:18px;background:#fff;}
.svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--p),var(--pink));}
.svc-card--featured{border-color:var(--p);box-shadow:0 10px 30px -14px rgba(108,43,217,.45);}
.svc-card--featured::before{height:5px;}
/* 2026-10-12: cards hold everything (price, short list, full list behind a tap, button). */
.svc-card-badge{align-self:flex-start;margin-bottom:10px;padding:4px 10px;border-radius:999px;background:var(--lav);color:var(--p);font-size:13px;font-weight:700;}
.svc-card .svc-card-t{margin-top:0;}
.svc-card-list{margin-top:22px;flex:1;align-content:start;}
.svc-card .svc-excl{margin-top:18px;}
.svc-card .svc-excl summary{font-size:15px;}
.svc-card-cap{margin-top:16px;}
.svc-card-btn{margin-top:18px;justify-content:center;}
.svc-cards-alt{margin-top:22px;font-size:16px;color:var(--muted);}
.svc-cards-alt a{font-weight:700;display:inline-flex;align-items:center;min-height:44px;}
.svc-card-n{font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:15px;color:var(--p);}
.svc-card-t{font-family:var(--font-display),system-ui,sans-serif;font-size:23px;font-weight:700;letter-spacing:-.03em;line-height:1.15;margin:6px 0 0;}
.svc-card-o{margin-top:4px;font-size:15px;font-weight:600;color:var(--muted);}
.svc-card-d{margin-top:10px;font-size:16px;line-height:1.5;color:#3F3A4B;flex:1;}
.svc-card-link{margin-top:12px;display:inline-flex;align-items:center;gap:6px;min-height:44px;font-weight:700;font-size:15px;}
.svc-price-from{margin-left:0;margin-right:2px;}
.svc-list li.svc-list-sub{margin-left:18px;}
.svc-list li.svc-list-sub::before{width:6px;height:6px;top:.65em;}

/* ---- why monthly (2026-10-12): a dark band, four short reasons ---- */
.svc-why-list{list-style:none;margin:32px 0 0;padding:0;display:grid;gap:22px;}
@media (min-width:760px){.svc-why-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 40px;}}
@media (min-width:1080px){.svc-why-list{grid-template-columns:repeat(4,minmax(0,1fr));}}
.svc-why-list li{padding-top:16px;border-top:2px solid rgba(255,255,255,.16);}
.svc-why-t{font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:700;letter-spacing:-.02em;color:#fff;margin:0;}
.svc-why-d{margin-top:8px;font-size:16px;line-height:1.55;color:#CFC8DD;}

/* ---- what happens next (2026-10-12) ---- */
.svc-steps{list-style:none;margin:28px 0 0;padding:0;display:grid;gap:18px;max-width:44em;}
.svc-steps li{display:grid;grid-template-columns:32px minmax(0,1fr);column-gap:14px;align-items:start;}
.svc-step-t{font-size:18px;font-weight:700;margin:4px 0 0;}
.svc-step-d{margin-top:4px;font-size:16px;line-height:1.55;color:#3F3A4B;}
.svc-terms-cap{margin-top:36px;}

.svc-price{margin-top:14px;display:flex;flex-direction:column;gap:2px;}
.svc-price-big{font-family:var(--font-display),system-ui,sans-serif;font-weight:800;font-size:30px;letter-spacing:-.04em;line-height:1.05;color:var(--text);}
.svc-price-per{font-size:16px;font-weight:700;letter-spacing:0;color:var(--muted);margin-left:2px;}
.svc-price-sub{font-size:15px;font-weight:600;color:var(--muted);}
.svc-price--light .svc-price-big{color:#fff;}
.svc-price--light .svc-price-per,.svc-price--light .svc-price-sub{color:#CFC8DD;}

.svc-detail-sec{padding-top:0;}
.svc-details{display:grid;gap:56px;}
.svc-detail{display:grid;gap:20px;padding-top:40px;border-top:1px solid var(--line);scroll-margin-top:72px;}
@media (min-width:960px){.svc-detail{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px;}}
.svc-detail-h{font-family:var(--font-display),system-ui,sans-serif;font-size:clamp(24px,3vw,34px);font-weight:800;letter-spacing:-.04em;line-height:1.1;margin:10px 0 0;}
.svc-list-cap{margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);}
.svc-list-cap--light{color:#C9B5F5;}
.svc-list{list-style:none;margin:0;padding:0;display:grid;gap:8px;}
.svc-list li{position:relative;padding-left:24px;font-size:16px;line-height:1.5;color:#3F3A4B;}
.svc-list li::before{content:'';position:absolute;left:2px;top:.55em;width:10px;height:10px;border-radius:50%;background:var(--lav);box-shadow:inset 0 0 0 3px var(--p);}
.svc-list--x li::before{background:none;box-shadow:none;width:10px;height:2px;top:.75em;background:var(--muted);}
.svc-list--note li::before{background:var(--line);box-shadow:none;}
.svc-list--light li{color:#E9E3F5;}
.svc-list--light a{color:#fff;font-weight:700;display:inline-flex;align-items:center;min-height:44px;}
.svc-list--light li:has(a)::before{top:1.15em;}
.svc-note{margin-top:14px;font-size:15px;line-height:1.55;color:var(--muted);max-width:40em;}
.svc-excl{margin-top:16px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.svc-excl summary{display:flex;align-items:center;justify-content:space-between;min-height:48px;cursor:pointer;font-weight:700;font-size:16px;list-style:none;}
.svc-excl summary::-webkit-details-marker{display:none;}
.svc-excl summary::after{content:'+';font-size:22px;font-weight:400;color:var(--p);}
.svc-excl[open] summary::after{content:'−';}
.svc-excl .svc-list{padding-bottom:14px;}
.fx .svc-excl summary:focus-visible{outline:3px solid var(--p);outline-offset:3px;}
.svc-excl--light{border-color:rgba(255,255,255,.16);}
.svc-excl--light summary{color:#fff;}
.svc-excl--light summary::after{color:#C9B5F5;}
.svc-btns{margin-top:20px;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;}
.svc-btns-alt{font-size:15px;color:var(--muted);}
.svc-btns-alt a{font-weight:700;display:inline-flex;align-items:center;min-height:44px;}

.svc-complete{scroll-margin-top:60px;}
.svc-complete-d{margin-top:16px;max-width:36em;color:#CFC8DD;font-size:18px;line-height:1.6;}
.svc-complete-grid{margin-top:32px;display:grid;gap:40px;}
@media (min-width:960px){.svc-complete-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:64px;}}
.svc-complete .svc-list-cap{margin-top:24px;}
.svc-flow{margin:0;}
.svc-flow .svc-list-cap{margin-top:0;}
.svc-flow-list{list-style:none;margin:0;padding:0;display:grid;}
.svc-flow-list li{position:relative;display:grid;grid-template-columns:32px 1fr;column-gap:14px;align-items:center;padding-bottom:18px;color:#fff;font-weight:600;font-size:16px;}
.svc-flow-list li::before{content:'';position:absolute;left:15px;top:32px;bottom:0;width:2px;background:rgba(255,255,255,.16);}
.svc-flow-list li:last-child{padding-bottom:0;}
.svc-flow-list li:last-child::before{display:none;}
.svc-flow-dot{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:14px;font-weight:800;
  background:linear-gradient(160deg,var(--p),var(--pink));color:#fff;}

.svc-cost{scroll-margin-top:60px;}
.svc-cases{margin-top:28px;display:grid;gap:14px;}
@media (min-width:860px){.svc-cases{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}}
.svc-case{padding:22px 20px;border:1px solid var(--line);border-radius:18px;background:#fff;}
.svc-case-h{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;font-weight:700;letter-spacing:-.03em;margin:0;}
.svc-case-d{margin:8px 0 18px;font-size:16px;line-height:1.55;color:#3F3A4B;}
.svc-case .svc-list + .svc-list-cap{margin-top:18px;}

.svc-terms .svc-list{margin-top:16px;max-width:44em;}

.svc-work-list{list-style:none;margin:28px 0 0;padding:0;display:grid;gap:16px;}
@media (min-width:860px){.svc-work-list{grid-template-columns:repeat(2,minmax(0,1fr));}}
.svc-work-card{display:flex;flex-direction:column;gap:6px;text-decoration:none;color:var(--text)!important;}
.svc-work-card img{width:100%;height:auto;border-radius:16px;border:1px solid var(--line);}
.svc-work-tag{align-self:flex-start;margin-top:8px;padding:4px 10px;border-radius:999px;background:var(--lav);color:var(--p);font-size:13px;font-weight:700;}
.svc-work-t{font-family:var(--font-display),system-ui,sans-serif;font-size:22px;font-weight:700;letter-spacing:-.03em;}
.svc-work-d{font-size:16px;color:var(--muted);}
.fx .svc-work-card:focus-visible{outline:3px solid var(--p);outline-offset:4px;border-radius:16px;}

.svc-contact{scroll-margin-top:60px;}
#services,#work{scroll-margin-top:60px;}

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
