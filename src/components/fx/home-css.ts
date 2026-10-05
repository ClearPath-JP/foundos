/**
 * The homepage front door (2026-10-04): the promise, four big doors, the 2026 standard list, and the price
 * strip. Phone first: every door is a full-width tap target on a phone and a 2×2 / 4-across grid on wider screens.
 */
export const FX_HOME_CSS = `
.hm-hero{position:relative;padding:28px 0 32px;overflow:hidden;isolation:isolate;}
@media (min-width:960px){.hm-hero{padding:64px 0 72px;}}
.hm-hero-grid{position:relative;z-index:1;display:grid;gap:40px;align-items:center;}
@media (min-width:960px){.hm-hero-grid{grid-template-columns:1.25fr .75fr;gap:56px;}}
.hm-h1{max-width:16ch;font-size:clamp(34px,6.6vw,64px);}
.hm-lede{margin-top:16px;color:#3F3A4B;max-width:32em;}
.hm-lede strong{color:var(--text);}
.hm-price{margin-top:14px;max-width:34em;font-size:17px;color:#3F3A4B;}
.hm-price strong{color:var(--text);}
.hm-ctas{margin-top:22px;}

/* The liquid gradient: a still wash paints first, the WebGL canvas fades in over it. On a phone it stays a band
   behind the headline, never behind the form or body text. */
.fx-liquid{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(60% 55% at 85% 10%,rgba(109,40,217,.16),transparent 70%),
    radial-gradient(50% 45% at 95% 70%,rgba(197,46,152,.10),transparent 72%),#fff;}
@media (max-width:959px){.fx-liquid{bottom:auto;height:360px;}}
.fx-liquid::after{content:'';position:absolute;inset:auto 0 0 0;height:45%;background:linear-gradient(rgba(255,255,255,0),#fff);}
.fx-liquid-c{position:absolute;inset:0;width:100%;height:100%;display:block;transition:opacity 1.2s ease-out;}
/* Pages whose first section holds a form (audit, contact): the liquid is a band across the top at every width,
   so it sits behind the headline and fades out before the inputs. */
.fx-lhead{position:relative;overflow:hidden;isolation:isolate;}
.fx-lhead>.fx-wrap{position:relative;z-index:1;}
.fx-lhead .fx-liquid{bottom:auto;height:360px;}
@media (min-width:960px){.fx-lhead .fx-liquid{height:440px;}}
/* Inner-page headers are only a headline and a lede, so the liquid fills the whole header and fades out at its
   bottom edge instead of being cut off there. */
.fx-phead .fx-liquid{bottom:0;height:auto;}
/* Liquid inside a body section (2026-10-04, JP: "more of it wherever it's too white"). A soft band at the top
   (behind a section heading) or the bottom (filling the empty run-out), always fading to white so long text and
   cards still sit on white. The section drops its tint: the shader's base is white. */
.fx-lsec{position:relative;overflow:hidden;isolation:isolate;}
.fx-lsec>.fx-wrap{position:relative;z-index:1;}
.fx-lsec .fx-liquid--top{top:0;bottom:auto;height:380px;}
.fx-lsec .fx-liquid--bottom{top:auto;bottom:0;height:420px;}
.fx-lsec .fx-liquid--bottom::after{inset:0 0 auto 0;background:linear-gradient(#fff,rgba(255,255,255,0));}
@media (min-width:960px){.fx-lsec .fx-liquid--top{height:440px;}.fx-lsec .fx-liquid--bottom{height:480px;}}

/* The audit box in the hero. */
.hm-audit{margin-top:24px;max-width:560px;}
.hm-audit-l{display:block;font-weight:700;font-size:16px;margin-bottom:8px;}
.hm-audit-row{display:flex;flex-direction:column;gap:10px;}
@media (min-width:640px){.hm-audit-row{flex-direction:row;}.hm-audit-in{flex:1;}}
.hm-audit-in{min-height:56px;font-size:17px;background:#fff;}
.hm-audit-b{flex:none;}
.hm-audit-hint{margin-top:8px!important;font-size:15px;color:var(--muted);}
.hm-josh{display:flex;align-items:center;gap:12px;margin-top:22px!important;font-size:16px;color:var(--muted);}
.hm-josh-img{width:52px;height:52px;border-radius:50%;object-fit:cover;flex:none;box-shadow:0 0 0 2px #fff,0 0 0 3px var(--line);}
.hm-josh a{display:inline-flex;align-items:center;min-height:44px;font-weight:700;}

/* Desktop: a real screen of the work fills the right of the hero. */
.hm-hero-art{display:none;}
@media (min-width:960px){
  .hm-hero-art{display:grid;justify-items:center;gap:12px;}
  .hm-phone{width:270px;border-radius:38px;border:10px solid #171421;overflow:hidden;background:#171421;
    box-shadow:0 30px 60px -24px rgba(23,20,33,.45);transform:rotate(2deg);}
  .hm-phone img{display:block;width:100%;height:auto;}
  .hm-hero-cap{font-size:14px;color:var(--muted);}
}

/* Where to go next: a ruled index, three across on wide screens. */
.hm-doors{list-style:none;margin:36px 0 0;padding:0;border-top:2px solid var(--text);position:relative;z-index:1;}
@media (min-width:860px){.hm-doors{display:grid;grid-template-columns:repeat(3,1fr);column-gap:40px;}}
.hm-doors li{border-bottom:1px solid rgba(23,20,33,.16);}
.hm-door{display:grid;grid-template-columns:1fr auto;grid-template-areas:"t go" "d go";row-gap:2px;column-gap:12px;
  align-items:center;padding:16px 0 18px;min-height:64px;text-decoration:none;color:var(--text)!important;}
.hm-door-t{grid-area:t;font-weight:800;font-size:20px;line-height:1.2;letter-spacing:-.015em;}
.hm-door-d{grid-area:d;font-size:15px;line-height:1.45;color:var(--muted);}
.hm-door-go{grid-area:go;font-size:22px;font-weight:700;color:var(--p);transition:transform .2s ease;}
.hm-door:hover .hm-door-t{color:var(--p);}
.hm-door:hover .hm-door-go{transform:translateX(4px);}
@media (prefers-reduced-motion:reduce){.hm-door-go{transition:none;}.hm-door:hover .hm-door-go{transform:none;}}

/* The 2026 standard: short numbered paragraphs under a hairline, three across on wide screens. */
.hm-std{list-style:none;margin:36px 0 40px;padding:0;display:grid;row-gap:24px;column-gap:48px;}
@media (min-width:760px){.hm-std{grid-template-columns:1fr 1fr;row-gap:36px;}}
@media (min-width:1040px){.hm-std{grid-template-columns:repeat(3,1fr);}}
.hm-std li{padding-top:16px;border-top:1px solid rgba(23,20,33,.2);}
.hm-std-n{color:var(--p);}
.hm-std-t{font-weight:800;font-size:19px;line-height:1.3;letter-spacing:-.01em;}
.hm-std-d{margin-top:6px!important;font-size:16px;line-height:1.55;color:var(--muted);}

.hm-work{margin-top:32px;column-gap:40px;row-gap:40px;}
@media (min-width:1100px){.hm-work{grid-template-columns:1fr 1fr;}}

/* Prices as a menu: name, dotted leader, price. */
.hm-menu{list-style:none;margin:36px 0 0;padding:0;max-width:760px;}
.hm-menu li{padding:18px 0 20px;border-top:1px solid rgba(23,20,33,.2);}
.hm-menu li:first-child{border-top:2px solid var(--text);}
.hm-menu-row{display:flex;align-items:baseline;gap:10px;text-decoration:none;color:var(--text)!important;}
.hm-menu-t{font-weight:800;font-size:clamp(19px,2.2vw,24px);letter-spacing:-.02em;}
.hm-menu-dots{flex:1;min-width:16px;border-bottom:2px dotted rgba(23,20,33,.35);transform:translateY(-5px);}
.hm-menu-n{font-weight:800;font-size:clamp(26px,3vw,34px);letter-spacing:-.03em;color:var(--p);white-space:nowrap;}
.hm-menu-n small{font-size:15px;font-weight:700;color:var(--muted);letter-spacing:0;}
.hm-menu-row:hover .hm-menu-t{color:var(--p);}
.hm-menu-d{margin-top:6px!important;font-size:16px;line-height:1.5;color:var(--muted);max-width:52ch;}

/* Work pages: six process steps read better three across than four. */
@media (min-width:860px){.wk-process{grid-template-columns:repeat(3,1fr)!important;row-gap:36px;}}

/* Work pages: the "Concept build" pill under the back link. */
.fx-badge{display:table;margin:4px 0 0;padding:4px 12px;border-radius:999px;background:var(--lav);color:var(--p);
  font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;}

/* Systems pages: "what I set up for you" box. */
.sy-setup{margin-top:32px;padding:22px;border-radius:var(--r);background:#fff;border:1.5px solid var(--p);}
@media (min-width:640px){.sy-setup{padding:28px;}}
.sy-setup-h{font-weight:800;font-size:20px;line-height:1.25;}
.sy-setup-list{margin:14px 0 0;padding-left:22px;display:grid;gap:10px;}
.sy-setup-list li{line-height:1.5;}
.sy-setup-list strong{font-weight:800;}
`;
