/**
 * The foundos page system — white, purple, near-black, from the business card.
 * Lifted out of the 2026-09-30 homepage so every page of the restaurant offer
 * (2026-10-01) shares one stylesheet. Tokens and contrast notes are unchanged:
 * text 17.4:1, secondary 7.5:1, purple 7.1:1 on white; lavender is never text.
 */
export const FX_CSS = `
.fx{
  --bg:#FFFFFF; --tint:#F7F5FC; --text:#171421; --muted:#595365;
  --p:#6D28D9; --p-hover:#5B21B6; --lav:#EDE5FA; --line:#DED8E8; --pink:#C52E98;
  --r:12px;
  --stripe:linear-gradient(180deg,#6D28D9 0%,#8B3FD9 45%,#C52E98 100%);
  background:var(--bg); color:var(--text);
  font-family:var(--font-manrope),ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
  font-size:18px; line-height:1.6; -webkit-font-smoothing:antialiased;
  min-height:100vh; overflow-x:clip;
}
.fx *{box-sizing:border-box;}
/* :where() keeps this reset at zero specificity, so .fx-lede, .fx-p etc. keep
   their margin-top. Written as ".fx p" it silently beat every one of them. */
.fx :where(p){margin:0;}
.fx a{color:var(--p);}
.fx a:focus-visible,.fx button:focus-visible,.fx input:focus-visible,.fx textarea:focus-visible{
  outline:3px solid var(--p); outline-offset:3px;
}
.fx-wrap{max-width:1120px;margin:0 auto;padding:0 20px;}
@media (min-width:640px){.fx-wrap{padding:0 40px;}}

/* ---- header ---- */
.fx-head{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.94);border-bottom:1px solid var(--line);}
.fx-head-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:68px;}
.fx-logo{display:inline-flex;align-items:center;min-height:44px;font-weight:800;font-size:22px;
  letter-spacing:-.035em;color:var(--text)!important;text-decoration:none;}
.fx-logo-ai{background:linear-gradient(90deg,var(--p),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent;}
.fx-nav{display:flex;align-items:center;gap:24px;}
.fx-nav-a{display:none;align-items:center;min-height:44px;font-weight:600;font-size:16px;text-decoration:none;color:var(--text)!important;}
.fx-nav-a:hover{color:var(--p)!important;}
@media (min-width:640px){.fx-nav-a{display:inline-flex;}}

/* ---- buttons ---- */
.fx-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 24px;
  border-radius:999px;border:0;font-family:inherit;font-weight:700;font-size:16px;letter-spacing:-.01em;
  text-decoration:none;cursor:pointer;white-space:nowrap;
  transition:transform .15s ease,box-shadow .15s ease,background-color .15s ease;}
.fx-btn--p{background:linear-gradient(180deg,#7A34E6,var(--p));color:#fff!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 1px 2px rgba(23,20,33,.12),0 8px 20px -8px rgba(109,40,217,.45);}
.fx-btn--p:hover{background:linear-gradient(180deg,var(--p),var(--p-hover));transform:translateY(-1px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 2px 4px rgba(23,20,33,.12),0 14px 28px -10px rgba(109,40,217,.55);}
.fx-btn--s{background:var(--lav);color:var(--p)!important;}
.fx-btn--s:hover{background:#E2D6F7;transform:translateY(-1px);}
.fx-btn:active{transform:translateY(0);}
.fx-btn--lg{min-height:56px;padding:0 28px;font-size:17px;}
.fx-btn--sm{min-height:44px;padding:0 18px;font-size:15px;}
.fx-ihb{min-height:56px;padding:0 28px;border:0;background:linear-gradient(180deg,#7A34E6,var(--p));color:#fff!important;
  text-decoration:none;font-weight:700;font-size:17px;letter-spacing:-.01em;display:inline-flex;align-items:center;justify-content:center;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 1px 2px rgba(23,20,33,.12),0 8px 20px -8px rgba(109,40,217,.45);}
.fx-ihb .ihb-dot{background:#fff;}
.fx-ihb .ihb-over{color:var(--p);font-weight:800;}
.fx-ihb--sm{min-height:48px;padding:0 22px;font-size:16px;}
.fx-btn:disabled{opacity:.6;cursor:wait;transform:none;}
@media (prefers-reduced-motion:reduce){.fx-btn,.fx-btn:hover{transition:none;transform:none;}}

/* ---- type ---- */
.fx-eyebrow,.fx-kicker{font-size:14px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--p);}
.fx-h1{font-size:clamp(38px,6.4vw,72px);line-height:1.02;letter-spacing:-.04em;font-weight:800;margin:18px 0 0;max-width:13ch;text-wrap:balance;}
.fx-accent{color:var(--p);}
.fx-h2{font-size:clamp(30px,4.2vw,48px);line-height:1.08;letter-spacing:-.03em;font-weight:800;margin:14px 0 0;max-width:18ch;text-wrap:balance;}
.fx-h2--first{margin-top:0;}
.fx-h3{font-size:24px;line-height:1.2;letter-spacing:-.02em;font-weight:800;margin:0;}
.fx-lede{margin-top:28px;font-size:clamp(18px,1.6vw,20px);color:var(--muted);max-width:34em;}
.fx-p{margin-top:24px;color:var(--muted);max-width:36em;}

/* ---- hero ---- */
.fx-hero{position:relative;padding:48px 0 40px;overflow:hidden;isolation:isolate;}
.fx-hero-grid{position:relative;z-index:1;display:grid;gap:56px;align-items:center;}
@media (min-width:960px){.fx-hero{padding:88px 0 56px;}.fx-hero-grid{grid-template-columns:1.05fr .95fr;gap:56px;}}
/* The card's soft corner wash: lavender top right, a breath of pink low right.
   Static on purpose — it is a paper texture, not an effect. */
.fx-wash{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(60% 70% at 100% 0%,rgba(237,229,250,.95) 0%,rgba(237,229,250,0) 70%),
    radial-gradient(40% 50% at 95% 100%,rgba(197,46,152,.10) 0%,rgba(197,46,152,0) 70%);
  -webkit-mask-image:linear-gradient(180deg,#000 60%,transparent);mask-image:linear-gradient(180deg,#000 60%,transparent);}
.fx-btns{margin-top:36px;display:flex;flex-direction:column;gap:12px;}
.fx-btns .fx-btn,.fx-btns .fx-ihb{width:100%;}
@media (max-width:639px){.fx-btns .fx-btn--s{width:auto;align-self:flex-start;min-height:48px;padding:0 20px;font-size:16px;}}
@media (min-width:640px){.fx-btns{flex-direction:row;flex-wrap:wrap;}.fx-btns .fx-btn,.fx-btns .fx-ihb{width:auto;}}
/* Paper grain, barely there. Masked like the wash so it fades out before the next section. */
.fx-noise{opacity:.035!important;-webkit-mask-image:linear-gradient(180deg,#000 50%,transparent);mask-image:linear-gradient(180deg,#000 50%,transparent);}
.fx-note{margin-top:14px;font-size:15px;color:var(--muted);}

/* the card */
.fx-card-stage{display:flex;justify-content:center;}
.fx-card{position:relative;width:100%;max-width:560px;aspect-ratio:1.75/1;background:#fff;border-radius:16px;overflow:hidden;
  border:1px solid var(--line);
  box-shadow:0 1px 2px rgba(23,20,33,.06),0 24px 48px -16px rgba(23,20,33,.22),0 40px 80px -40px rgba(109,40,217,.35);
  transform:rotate(-3deg);transition:transform .4s ease;}
.fx-card:hover{transform:rotate(-1deg) translateY(-4px);}
.fx-card::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(70% 90% at 100% 0%,rgba(237,229,250,.9),rgba(237,229,250,0) 60%),
             radial-gradient(50% 60% at 100% 100%,rgba(197,46,152,.08),rgba(197,46,152,0) 70%);}
.fx-card-stripe{position:absolute;top:-10%;bottom:-10%;left:5%;width:11%;background:var(--stripe);transform:skewX(-14deg);}
.fx-card-stripe::after{content:'';position:absolute;top:0;bottom:0;left:112%;width:22%;background:var(--lav);}
.fx-card-body{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 7% 0 29%;}
.fx-card-logo{font-weight:800;font-size:clamp(14px,1.6vw,18px);letter-spacing:-.03em;}
.fx-card-name{margin-top:10%;font-weight:800;font-size:clamp(22px,2.6vw,32px);letter-spacing:-.04em;line-height:1;}
.fx-card-role{margin-top:6px;font-size:11px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:var(--p);}
.fx-card-line{margin-top:6%;font-size:clamp(12px,1.2vw,14px);color:var(--muted);}
.fx-card-contact{margin-top:auto;margin-bottom:9%;display:flex;flex-wrap:wrap;gap:4px 14px;font-size:clamp(11px,1.1vw,13px);font-weight:700;}
@media (prefers-reduced-motion:reduce){.fx-card,.fx-card:hover{transition:none;transform:rotate(-3deg);}}

/* ---- sections ---- */
.fx-sec{padding:80px 0;}
@media (min-width:960px){.fx-sec{padding:128px 0;}}
.fx-sec--tint{background:var(--tint);}
.fx-sec--join{padding-top:48px;}
@media (min-width:960px){.fx-sec--join{padding-top:72px;}}

/* help: three columns under a heavy top rule */
.fx-help{list-style:none;padding:0;margin:48px 0 0;display:grid;gap:32px;}
@media (min-width:860px){.fx-help{grid-template-columns:repeat(3,1fr);gap:40px;}}
.fx-help-item{padding-top:22px;border-top:2px solid var(--text);}
.fx-help-item:first-child{border-top-color:var(--p);}
.fx-help-t{font-size:clamp(22px,2.2vw,26px);font-weight:800;letter-spacing:-.025em;line-height:1.2;}
.fx-help-d{margin-top:10px;color:var(--muted);}
.fx-help-e{margin-top:18px;padding:14px 16px;border-radius:var(--r);background:var(--tint);font-size:16px;font-weight:600;color:var(--text);line-height:1.45;}
.fx-band{margin-top:56px;padding:28px;border-radius:var(--r);background:var(--lav);
  display:flex;flex-direction:column;gap:18px;align-items:flex-start;}
.fx-band-t{font-size:clamp(20px,2vw,24px);font-weight:800;letter-spacing:-.02em;line-height:1.25;color:var(--text);}
@media (min-width:760px){.fx-band{flex-direction:row;align-items:center;justify-content:space-between;padding:32px 40px;}}

/* two-column split */
.fx-split{display:grid;gap:48px;align-items:center;}
.fx-split--top{align-items:start;}
@media (min-width:960px){.fx-split{grid-template-columns:1fr 1fr;gap:80px;}}

/* the checkup sheet */
.fx-sheet{position:relative;background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;padding:32px 24px 28px;
  box-shadow:0 1px 2px rgba(23,20,33,.06),0 24px 48px -16px rgba(23,20,33,.18),0 40px 80px -40px rgba(109,40,217,.3);transform:rotate(1.5deg);}
.fx-sheet::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--p),var(--pink));}
@media (min-width:640px){.fx-sheet{padding:40px 36px 36px;}}
.fx-sheet-k{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--p);}
.fx-sheet-h{margin-top:8px!important;font-size:clamp(20px,2vw,24px);font-weight:800;letter-spacing:-.025em;line-height:1.2;}
.fx-sheet-list{list-style:none;padding:0;margin:24px 0 0;display:grid;gap:20px;}
.fx-sheet-list li{display:grid;grid-template-columns:32px 1fr;gap:14px;padding-top:20px;border-top:1px solid var(--line);}
.fx-sheet-n{width:32px;height:32px;border-radius:50%;background:var(--lav);color:var(--p);display:grid;place-items:center;font-weight:800;font-size:15px;}
.fx-sheet-t{font-weight:700;font-size:17px;line-height:1.3;}
.fx-bar{display:block;height:8px;border-radius:4px;background:#ECE8F3;margin-top:10px;}
.fx-bar--short{width:58%;margin-top:7px;}
.fx-tag{display:inline-block;margin-top:12px;padding:4px 10px;border-radius:999px;background:var(--lav);color:var(--p);font-size:13px;font-weight:800;}
@media (prefers-reduced-motion:no-preference){.fx-sheet{transition:transform .4s ease;}.fx-sheet:hover{transform:rotate(0) translateY(-4px);}}
.fx-flow{list-style:none;padding:0;margin:32px 0 0;display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;}
.fx-flow li{font-weight:700;font-size:16px;color:var(--text);padding:8px 14px;border-radius:999px;background:#fff;border:1px solid var(--line);}

/* founder band */
.fx-dark{background:var(--text);color:#fff;padding:88px 0;}
@media (min-width:960px){.fx-dark{padding:120px 0;}}
.fx-dark .fx-p{color:#C9C3D6;}
.fx-rule{display:block;width:48px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--p),var(--pink));margin-bottom:20px;}
.fx-sign{margin-top:28px;font-weight:700;color:#fff;letter-spacing:-.01em;}
.fx-quote{margin:0;font-size:clamp(30px,4.4vw,52px);font-weight:800;letter-spacing:-.035em;line-height:1.1;max-width:20ch;text-wrap:balance;}
.fx-dark-grid{margin-top:64px;padding-top:40px;border-top:1px solid #37304A;}
.fx-dark .fx-h3{color:#fff;}
.fx-dark-link{display:inline-flex;align-items:center;min-height:44px;margin-top:16px;font-weight:700;color:#C4B0F5!important;text-decoration:none;}
.fx-dark-link:hover{text-decoration:underline;}

/* form */
.fx-form-grid{display:grid;gap:40px;align-items:start;}
@media (min-width:960px){.fx-form-grid{grid-template-columns:.9fr 1.1fr;gap:72px;}}
.fx-next{list-style:none;padding:0;margin:28px 0 0;display:grid;gap:12px;}
.fx-next li{position:relative;padding-left:28px;font-weight:600;}
.fx-next li::before{content:'';position:absolute;left:2px;top:.5em;width:12px;height:7px;
  border-left:2.5px solid var(--p);border-bottom:2.5px solid var(--p);transform:rotate(-45deg);}
.fx-panel{position:relative;background:#fff;border-radius:var(--r);border:1px solid var(--line);overflow:hidden;
  padding:28px 20px;box-shadow:0 1px 2px rgba(23,20,33,.05),0 24px 48px -24px rgba(23,20,33,.18);}
.fx-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--p),var(--pink));}
@media (min-width:640px){.fx-panel{padding:36px;}}

.fx-form{display:grid;gap:20px;}
.fx-field{display:grid;gap:8px;}
.fx-label{font-weight:700;font-size:16px;}
.fx-hint{font-size:15px;color:var(--muted);}
.fx-in{width:100%;font:inherit;font-size:17px;color:var(--text);background:#fff;border:1.5px solid #CFC8DC;border-radius:var(--r);
  padding:12px 14px;min-height:52px;transition:border-color .15s,box-shadow .15s;}
.fx-in:hover{border-color:#A79FBA;}
.fx-in:focus{border-color:var(--p);box-shadow:0 0 0 4px rgba(109,40,217,.14);outline:none;}
.fx-in::placeholder{color:#8A8398;}
.fx-in[aria-invalid="true"]{border-color:#B42318;}
textarea.fx-in{min-height:128px;resize:vertical;}
.fx-err{font-size:15px;font-weight:600;color:#B42318;}
.fx-radios{display:grid;grid-template-columns:1fr 1fr;gap:12px;border:0;padding:0;margin:0;}
.fx-radios legend{font-weight:700;font-size:16px;margin-bottom:8px;padding:0;}
.fx-radio{display:flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:8px 16px;border:1.5px solid #CFC8DC;
  border-radius:var(--r);background:#fff;cursor:pointer;font-weight:700;transition:border-color .15s,background-color .15s;}
.fx-radio:has(input:checked){border-color:var(--p);background:var(--lav);color:var(--p);}
.fx-radio input{width:20px;height:20px;accent-color:var(--p);margin:0;}
.fx-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;}
.fx-consent{font-size:14px;line-height:1.5;color:var(--muted);}
.fx-alert{padding:14px 16px;border-radius:var(--r);background:#FEF3F2;color:#7A271A;font-size:16px;}
.fx-form .fx-btn--p{width:100%;min-height:56px;font-size:17px;}
.fx-done{padding:8px 0;}

/* footer */
.fx-foot{border-top:1px solid var(--line);padding:32px 0 40px;font-size:16px;color:var(--muted);}
.fx-foot-row{display:flex;flex-direction:column;gap:6px;}
.fx-foot-links{display:flex;flex-wrap:wrap;gap:0 24px;}
.fx-foot-links a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;font-weight:600;}
.fx-foot-links a:hover{text-decoration:underline;}
@media (min-width:860px){.fx-foot-row{flex-direction:row;align-items:center;justify-content:space-between;}}
`;
