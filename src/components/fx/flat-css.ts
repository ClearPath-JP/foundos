/**
 * The no-boxes pass (2026-10-04). JP: the cards "look very AI". Every card on the site becomes the editorial
 * pattern the systems page already used for its three sides: no box, no shadow, no rounded corners, just a rule
 * on top and the type doing the work. Loaded last in Shell so it overrides the card rules in the other sheets
 * without rewriting each page's markup.
 */
export const FX_FLAT_CSS = `
.fx-plan,.fx-project,.fx-rung,.fx-cm-card,.fx-sys-try,.fx-buy,.fx-wcard{
  background:transparent!important;border:0!important;border-top:2px solid var(--text)!important;border-radius:0!important;
  box-shadow:none!important;padding:24px 0 0!important;overflow:visible;color:var(--text);}
.fx-plan::before{content:none;}
.fx-plan--growth,.fx-rung--ordering,.fx-cm-card--you,.fx-project--lead{border-top-color:var(--p)!important;}
.fx-plan-term{border-top:0;padding-top:12px;}

/* The dark "lead" project goes back to ink on white. */
.fx-project--lead .fx-plan-name,.fx-project--lead .fx-more{color:var(--p)!important;}
.fx-project--lead .fx-price-n{color:var(--text);}
.fx-project--lead .fx-plan-for,.fx-project--lead .fx-plan-term,.fx-project--lead .fx-price-u,.fx-project--lead .fx-price-from{color:var(--muted);}
.fx-project--lead .fx-checks li::before{border-color:var(--p);}
.fx-project--lead .fx-btn--p{background:linear-gradient(180deg,#7A34E6,var(--p));color:#fff!important;}

/* Buttons inside a column sit left and size to their words, instead of full-width bars. */
@media (min-width:640px){
  .fx-plan-cta,.fx-rung-cta{align-items:flex-start;}
  .fx-plan-cta .fx-btn,.fx-rung-cta .fx-btn{width:auto;}
}
.fx-plans,.fx-ladder,.fx-projects{column-gap:48px;row-gap:48px;}
.fx-cm-card--app{background:transparent!important;}
.fx-cm-honest{background:transparent;border-radius:0;padding:4px 0 4px 20px;}

/* Work: the screenshot is the object. Text sits under it with no frame. */
.fx-wcard:hover{transform:none!important;}
.fx-wcard{border-top:0!important;padding:0!important;}
.fx-wcard-img{border:0;border-radius:6px;box-shadow:0 1px 0 var(--line);}
.fx-wcard-body{padding:16px 0 0;}
.fx-wcard:hover .fx-wcard-name{color:var(--p);}
.fx-wcard-tag{padding:0;background:none!important;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)!important;}

/* Systems: the setup explainer is a ruled section, not a box. */
.sy-setup{background:transparent;border:0;border-top:2px solid var(--p);border-radius:0;padding:24px 0 0;}
.fx-wcard-tag{font-size:13px!important;letter-spacing:.06em;}
/* ---- 2026-10-04 design review fixes ---- */

/* #2 Header: one solid row. Full nav from 900px; below that, logo + Free audit + Menu. */
.fx-head{background:#fff;}
.fx-subnav{display:none!important;}
.fx-nav-a{font-size:16px;}
.fx-nav{display:none;}
.fx-mnav{display:flex;align-items:center;gap:8px;}
@media (min-width:900px){.fx-nav{display:flex;}.fx-nav-a{display:inline-flex;}.fx-mnav{display:none;}}
.fx-head-row{min-height:60px;}
.fx-menu > summary{list-style:none;display:inline-flex;align-items:center;gap:8px;min-height:44px;min-width:44px;padding:0 6px;
  font-weight:700;font-size:16px;cursor:pointer;color:var(--text);}
.fx-menu > summary::-webkit-details-marker{display:none;}
.fx-menu-bars{position:relative;width:18px;height:2px;background:currentColor;}
.fx-menu-bars::before,.fx-menu-bars::after{content:'';position:absolute;left:0;width:18px;height:2px;background:currentColor;}
.fx-menu-bars::before{top:-6px;}
.fx-menu-bars::after{top:6px;}
.fx-menu[open] .fx-menu-bars{background:transparent;}
.fx-menu[open] .fx-menu-bars::before{top:0;transform:rotate(45deg);}
.fx-menu[open] .fx-menu-bars::after{top:0;transform:rotate(-45deg);}
.fx-menu-panel{position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:2px solid var(--text);
  padding:4px 20px 16px;display:grid;}
.fx-menu-panel a{display:flex;align-items:center;min-height:52px;font-size:20px;font-weight:800;letter-spacing:-.015em;
  color:var(--text)!important;text-decoration:none;border-bottom:1px solid var(--line);}
.fx-menu-panel a[aria-current="page"]{color:var(--p)!important;}
.fx-menu-panel .fx-menu-text{color:var(--p)!important;border-bottom:0;font-size:18px;}

/* Type: a warm serif for headlines and prices; labels in sentence case instead of shouty uppercase. */
.fx-h1,.fx-h2,.hm-menu-n,.fx-price-n,.fx-matrix-price,.fx-cm-big,.fx-rung-t{font-family:var(--font-display),Georgia,serif;
  font-weight:600;letter-spacing:-.02em;font-variation-settings:'SOFT' 50;}
.fx-h1{line-height:1.04;}
.fx-h2{line-height:1.1;}
.fx-eyebrow,.fx-kicker{text-transform:none;letter-spacing:0;font-size:16px;font-weight:700;}
.fx-plan-name,.fx-matrix-name,.fx-sys-who,.fx-rung-step,.fx-cm-label{text-transform:none;letter-spacing:0;font-size:16px;}

/* #6 Work: a phone screenshot on a phone, a desktop one on a desktop. Two across on wide screens. */
.fx-wcard-img .wc-phone{display:none;}
@media (max-width:759px){
  .fx-wcard-img{aspect-ratio:4/5;}
  .fx-wcard-img .wc-desk{display:none;}
  .fx-wcard-img .wc-phone{display:block;}
}
@media (min-width:1100px){.fx-work-grid{grid-template-columns:repeat(2,1fr);}}

/* #4 Josh's photo in the closing band. */
.fx-close-img{width:140px;height:auto;aspect-ratio:4/5;object-fit:cover;border-radius:8px;}
@media (min-width:860px){.fx-close{grid-template-columns:200px 1.4fr auto;gap:48px;}.fx-close-img{width:200px;}}

/* #7 /projects: .fx-detail's padding shorthand wiped .fx-wrap's side gutters. */
.fx-wrap.fx-detail{padding-left:20px;padding-right:20px;}
@media (min-width:640px){.fx-wrap.fx-detail{padding-left:40px;padding-right:40px;}}

/* #8 /plans: the plans come first on a phone; the jump links are for wide screens. */
@media (max-width:639px){.fx-jump{display:none;}}

/* #10 Contrast and tap targets. */
.fx-no{color:#6E6880;}
.fx-crumb a,.fx-note a,.sy-setup a,.fx-hint a{display:inline-flex;align-items:center;min-height:44px;}
.fx-matrix-group th{font-size:15px;letter-spacing:0;text-transform:none;}
`;
