/** Added 2026-10-01 for plans, projects and the detail pages. Layered on FX_CSS. */
export const FX_OFFER_CSS = `
/* nav: links inline from 640px; below that, a second scrolling row */
.fx-nav-a[aria-current="page"]{color:var(--p)!important;}
.fx-subnav{display:flex;gap:4px;overflow-x:auto;border-top:1px solid var(--line);scrollbar-width:none;}
.fx-subnav::-webkit-scrollbar{display:none;}
.fx-subnav a{flex:none;display:inline-flex;align-items:center;min-height:44px;padding:0 12px;font-weight:700;font-size:15px;
  text-decoration:none;color:var(--text)!important;}
.fx-subnav a:first-child{padding-left:0;}
.fx-subnav a[aria-current="page"]{color:var(--p)!important;}
@media (min-width:640px){.fx-subnav{display:none;}}

/* page head for inner pages */
.fx-phead{position:relative;padding:48px 0 8px;overflow:hidden;isolation:isolate;}
@media (min-width:960px){.fx-phead{padding:80px 0 16px;}}
.fx-phead .fx-h1{font-size:clamp(36px,5.2vw,60px);max-width:18ch;}
.fx-phead .fx-wrap{position:relative;z-index:1;}
.fx-crumb{font-size:15px;font-weight:600;color:var(--muted);}
.fx-crumb a{text-decoration:none;font-weight:700;}
.fx-crumb a:hover{text-decoration:underline;}

/* plan cards */
.fx-plans{display:grid;gap:24px;margin-top:48px;}
@media (min-width:860px){.fx-plans{grid-template-columns:1fr 1fr;gap:28px;}}
.fx-plan{position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:16px;
  padding:32px 24px 28px;overflow:hidden;box-shadow:0 1px 2px rgba(23,20,33,.05),0 24px 48px -28px rgba(23,20,33,.2);}
@media (min-width:640px){.fx-plan{padding:40px 36px 36px;}}
.fx-plan::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:#CFC8DC;}
.fx-plan--growth::before{background:linear-gradient(90deg,var(--p),var(--pink));}
.fx-plan-name{font-size:14px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--p);}
.fx-price{margin-top:14px!important;display:flex;align-items:baseline;gap:6px;flex-wrap:wrap;}
.fx-price-from{font-size:18px;font-weight:700;color:var(--muted);}
.fx-price-n{font-size:clamp(48px,6vw,64px);font-weight:800;letter-spacing:-.045em;line-height:1;}
.fx-price-u{font-size:18px;font-weight:700;color:var(--muted);}
.fx-plan-pitch{margin-top:16px!important;font-size:19px;font-weight:700;letter-spacing:-.015em;line-height:1.35;}
.fx-plan-for{margin-top:10px!important;color:var(--muted);font-size:16px;}
.fx-checks{list-style:none;padding:0;margin:24px 0 0;display:grid;gap:12px;}
.fx-checks li{position:relative;padding-left:28px;font-weight:600;font-size:16px;line-height:1.45;}
.fx-checks li::before{content:'';position:absolute;left:2px;top:.45em;width:12px;height:7px;
  border-left:2.5px solid var(--p);border-bottom:2.5px solid var(--p);transform:rotate(-45deg);}
.fx-plan-term{margin-top:auto!important;padding-top:20px;border-top:1px solid var(--line);font-size:15px;color:var(--muted);}
.fx-plan-body{flex:1;padding-bottom:24px;}
.fx-plan-cta{margin-top:20px;display:flex;flex-direction:column;gap:6px;align-items:center;}
.fx-plan-cta .fx-btn{width:100%;}
.fx-more{display:inline-flex;align-items:center;min-height:44px;font-weight:700;text-decoration:none;}
.fx-more:hover{text-decoration:underline;}

/* comparison table: a real table from 760px, stacked rows below */
.fx-table{width:100%;margin-top:40px;border-collapse:collapse;font-size:16px;}
.fx-table th,.fx-table td{text-align:left;vertical-align:top;padding:18px 16px;border-bottom:1px solid var(--line);line-height:1.5;}
.fx-table thead th{font-size:14px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--p);border-bottom:2px solid var(--text);}
.fx-table tbody th{font-weight:800;width:20%;}
.fx-table td{color:var(--muted);}
.fx-table th:first-child,.fx-table td:first-child{padding-left:0;}
@media (max-width:759px){
  .fx-table thead{position:absolute;left:-9999px;}
  .fx-table tr{display:block;padding:18px 0;border-bottom:1px solid var(--line);}
  .fx-table th,.fx-table td{display:block;padding:4px 0;border:0;width:auto!important;}
  .fx-table tbody th{font-size:18px;margin-bottom:6px;}
  .fx-table td::before{content:attr(data-plan) ': ';font-weight:800;color:var(--text);}
}

/* project cards */
.fx-projects{display:grid;gap:24px;margin-top:48px;}
@media (min-width:860px){.fx-projects{grid-template-columns:1.25fr 1fr;}}
.fx-project{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:16px;padding:28px 24px;}
@media (min-width:640px){.fx-project{padding:36px;}}
.fx-project--lead{background:var(--text);color:#fff;border-color:var(--text);}
.fx-project--lead .fx-plan-name{color:#C4B0F5;}
.fx-project--lead .fx-plan-for,.fx-project--lead .fx-plan-term,.fx-project--lead .fx-price-u,.fx-project--lead .fx-price-from{color:#C9C3D6;}
.fx-project--lead .fx-plan-term{border-color:#37304A;}
.fx-project--lead .fx-checks li::before{border-color:#C4B0F5;}
.fx-project--lead .fx-more{color:#C4B0F5!important;}
.fx-project--lead .fx-btn--p{background:#fff;color:var(--p)!important;box-shadow:none;}
.fx-project--lead .fx-btn--p:hover{background:var(--lav);}

/* request-only list */
.fx-req{list-style:none;padding:0;margin:32px 0 0;border-top:2px solid var(--text);}
.fx-req li{display:grid;gap:6px;padding:22px 0;border-bottom:1px solid var(--line);}
@media (min-width:860px){.fx-req li{grid-template-columns:1fr 1.6fr auto;gap:32px;align-items:baseline;}}
.fx-req-n{font-weight:800;font-size:19px;letter-spacing:-.015em;}
.fx-req-s{color:var(--muted);font-size:16px;}
.fx-req a{font-weight:700;text-decoration:none;white-space:nowrap;display:inline-flex;align-items:center;min-height:44px;}
.fx-req a:hover{text-decoration:underline;}

/* what foundos handles: columns under rules (reuses .fx-help-item) */
.fx-handles{list-style:none;padding:0;margin:48px 0 0;display:grid;gap:32px;}
@media (min-width:640px){.fx-handles{grid-template-columns:1fr 1fr;}}
@media (min-width:1000px){.fx-handles{grid-template-columns:repeat(4,1fr);gap:32px;}}

/* steps */
.fx-steps{list-style:none;padding:0;margin:48px 0 0;display:grid;gap:28px;counter-reset:s;}
@media (min-width:860px){.fx-steps{grid-template-columns:repeat(4,1fr);gap:24px;}}
.fx-steps li{counter-increment:s;}
.fx-steps li::before{content:counter(s);display:grid;place-items:center;width:40px;height:40px;border-radius:50%;
  background:var(--p);color:#fff;font-weight:800;font-size:17px;margin-bottom:16px;}
.fx-step-t{font-size:20px;font-weight:800;letter-spacing:-.02em;line-height:1.25;}
.fx-step-d{margin-top:8px!important;color:var(--muted);font-size:16px;}
.fx-steps--list{grid-template-columns:1fr!important;margin-top:24px;gap:16px;}
.fx-steps--list li{display:grid;grid-template-columns:40px 1fr;gap:16px;align-items:center;}
.fx-steps--list li::before{margin-bottom:0;}
.fx-steps--list .fx-step-d{margin-top:0!important;color:var(--text);}

/* FAQ */
.fx-faq{margin-top:40px;border-top:2px solid var(--text);}
.fx-faq details{border-bottom:1px solid var(--line);}
.fx-faq summary{display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:64px;padding:16px 0;
  cursor:pointer;list-style:none;font-weight:800;font-size:clamp(18px,1.8vw,20px);letter-spacing:-.015em;line-height:1.3;}
.fx-faq summary::-webkit-details-marker{display:none;}
.fx-faq summary::after{content:'+';flex:none;width:32px;height:32px;border-radius:50%;background:var(--lav);color:var(--p);
  display:grid;place-items:center;font-size:22px;font-weight:700;line-height:1;}
.fx-faq details[open] summary::after{content:'\\2013';}
.fx-faq summary:focus-visible{outline:3px solid var(--p);outline-offset:3px;}
.fx-faq-a{padding:0 0 22px;color:var(--muted);max-width:44em;}

/* detail pages: content left, buy box right (sticky on desktop) */
.fx-detail{display:grid;gap:48px;align-items:start;padding:40px 0 96px;}
@media (min-width:960px){.fx-detail{grid-template-columns:1fr 360px;gap:72px;padding:56px 0 128px;}}
.fx-buy{position:relative;background:#fff;border:1px solid var(--line);border-radius:16px;padding:28px 24px;overflow:hidden;
  box-shadow:0 1px 2px rgba(23,20,33,.05),0 24px 48px -24px rgba(23,20,33,.2);}
.fx-buy::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--p),var(--pink));}
@media (min-width:960px){.fx-buy{position:sticky;top:96px;grid-column:2;grid-row:1;}}
.fx-buy .fx-btn{width:100%;margin-top:20px;}
.fx-buy-lines{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:10px;font-size:15px;color:var(--muted);}
.fx-buy-lines li{padding-top:10px;border-top:1px solid var(--line);}
.fx-buy-lines strong{color:var(--text);}
@media (min-width:960px){.fx-detail-main{grid-column:1;grid-row:1;}}
.fx-block + .fx-block{margin-top:40px;padding-top:40px;border-top:1px solid var(--line);}
.fx-block .fx-p{margin-top:12px;}
.fx-x{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:10px;}
.fx-x li{position:relative;padding-left:28px;color:var(--muted);font-size:16px;line-height:1.5;}
.fx-x li::before{content:'';position:absolute;left:3px;top:.7em;width:12px;height:2.5px;background:#A79FBA;border-radius:2px;}

/* closing band */
.fx-close{display:grid;gap:28px;align-items:center;}
@media (min-width:860px){.fx-close{grid-template-columns:1.4fr auto;}}
.fx-close .fx-btns{margin-top:0;}
.fx-dark .fx-btn--s{background:#2A2438;color:#fff!important;}
.fx-dark .fx-btn--s:hover{background:#37304A;}
.fx-dark .fx-kicker{color:#C4B0F5;}

/* work: a desktop browser with a phone overlapping its corner */
.fx-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}
.fx-strong{color:var(--text);}
.fx-work-vis{position:relative;padding:0 0 48px;max-width:620px;justify-self:center;width:100%;}
@media (min-width:640px){.fx-work-vis{padding:0 64px 56px 0;}}
.fx-browser{border-radius:12px;overflow:hidden;background:#fff;border:1px solid var(--line);
  box-shadow:0 1px 2px rgba(23,20,33,.06),0 24px 48px -16px rgba(23,20,33,.22);}
.fx-browser-bar{display:flex;gap:6px;padding:10px 12px;background:#F1EEF6;border-bottom:1px solid var(--line);}
.fx-browser-bar span{width:9px;height:9px;border-radius:50%;background:#CFC8DC;}
.fx-browser img,.fx-phone img,.fx-shot img{display:block;width:100%;height:auto;}
.fx-phone{position:absolute;right:0;bottom:0;width:34%;min-width:120px;max-width:200px;border-radius:22px;overflow:hidden;
  border:6px solid var(--text);background:var(--text);
  box-shadow:0 2px 4px rgba(23,20,33,.15),0 30px 60px -20px rgba(23,20,33,.45);}
.fx-shot{margin:56px 0 0;}
.fx-shot img{border-radius:12px;border:1px solid var(--line);box-shadow:0 24px 48px -28px rgba(23,20,33,.25);}
.fx-shot figcaption{margin-top:12px;font-size:15px;color:var(--muted);}
`;
