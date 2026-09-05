/**
 * The service pages' own stylesheet — the second half of what these four routes
 * ship, after `SITE_CSS` from components/site/css.ts.
 *
 * ── WHAT IS AND IS NOT IN HERE ────────────────────────────────────────────
 *
 * Nothing in this file declares a colour, a face, a type step, a rule, a
 * button, a ground or a section rhythm. All of those come from the design
 * system and are read here through the same custom properties the homepage
 * reads: --fg, --dim, --strong, --rule, --rule-soft, --ink, --ember, --bone,
 * --wood, --f-display, --f-body, --f-mono, --t-label … --t-num. If a value
 * below looks like a new decision, it is not: every number here was copied
 * from the equivalent block on the homepage so the two feel like one site.
 *
 * ⚠️ THESE ARE `sv-` CLASSES AND THEY ARE NOT THE HOMEPAGE'S. The homepage's
 * `.eb-check`, `.eb-build`, `.eb-figs`, `.eb-math` and `.eb-close` live in
 * PAGE_CSS inside src/app/page.tsx, which is that page's private stylesheet and
 * is not loaded here. Copying the values rather than reaching for those class
 * names is deliberate: the homepage is signed off and live, and a shared class
 * is a shared class nobody can safely change. If a device here and its homepage
 * twin ever need to diverge, they can, without anybody touching page.tsx.
 *
 * ⚠️ THE WOOD BAND HAS A HARD ACCESSIBILITY FLOOR. Ink on wood (#1a1a1a on
 * #b76745) measures 4.24:1. That fails the 4.5:1 bar for body text and clears
 * the 3:1 bar for WCAG large-scale text, which starts at 18.66px bold. So every
 * size inside `.sv-math` is --t-lede (19px, 21px from 640) or --t-num at weight
 * 700, and none of it may be reduced. Dropping `.sv-math-p` to --t-body, or to
 * weight 400, is a real accessibility regression and not a style tweak. Same
 * rule, same numbers, as the homepage's arithmetic band.
 *
 * No backticks anywhere below — the whole thing is a template literal.
 */
export const SERVICE_CSS = `
/* ---- the page head ------------------------------------------------------ */
/* Shorter than the homepage hero (32/60) because there is no field behind it
   and no button under it — it is a label, a headline and a standfirst on the
   ink spine, and the rule below it does the closing. */
.sv-hero{padding-top:30px;padding-bottom:36px;}
.sv-hero-h{color:var(--bone);}
.sv-hero-s{margin-top:22px;}
@media (min-width:640px){
  .sv-hero{padding-top:46px;padding-bottom:52px;}
}

/* ---- numbered rows: the same device as the homepage's five checks -------- */
.sv-list{list-style:none;margin:0;padding:0;}
.sv-item{display:flex;gap:18px;padding:24px 0;border-top:1px solid var(--rule-soft);}
.sv-item:first-child{border-top:0;padding-top:0;}
/* The numeral is wood at --t-num (26/32px, 700). Wood on ink is 4.18:1, which
   clears the 3:1 large-scale bar at this size and would fail it at label size —
   the same constraint as .eb-check-n. Do not shrink it without moving the
   colour to --dim. */
.sv-n{flex:0 0 auto;width:2.4ch;font-size:var(--t-num);font-weight:700;line-height:1;
  color:var(--wood);letter-spacing:-.02em;}
.sv-body{min-width:0;}
@media (min-width:640px){
  .sv-item{gap:32px;padding:30px 0;}
}

/* A mono line under a row — the homepage's "Check it:" instruction, reused here
   for the threshold a check is measured against and for the tests a reader can
   run on their own phone. max-width is in rem, not ch: ch resolves against the
   element's own font, and 62ch of 13px mono is 120px narrower than 64ch of 17px
   Chivo directly above it, which shows as two ragged right edges in one block.
   If .eb-p's measure moves, move this with it. */
.sv-do{margin-top:14px;font-size:var(--t-fine);line-height:1.6;color:var(--strong);max-width:44rem;}
.sv-do-k{color:var(--dim);}

/* ---- two-column ledger rows: the homepage's build list ------------------- */
.sv-rows{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);}
.sv-row{display:block;padding:18px 0;border-bottom:1px solid var(--rule-soft);max-width:72ch;}
.sv-row-l{display:block;font-size:var(--t-body);font-weight:700;line-height:1.35;color:var(--strong);}
.sv-row-r{display:block;margin-top:5px;font-size:var(--t-body);line-height:1.55;color:var(--fg);}
@media (min-width:640px){
  .sv-row{display:grid;grid-template-columns:minmax(0,17rem) minmax(0,1fr);gap:28px;
    align-items:baseline;padding:19px 0;max-width:none;}
  .sv-row-r{margin-top:0;max-width:52ch;}
}

/* ---- the arithmetic band ------------------------------------------------ */
.sv-figs{margin:0 0 26px;max-width:32rem;border-top:1px solid var(--rule);}
.sv-fig{display:flex;align-items:baseline;justify-content:space-between;gap:18px;
  padding:11px 0;border-bottom:1px solid var(--rule);}
.sv-fig-k{margin:0;font-size:var(--t-lede);line-height:1.3;font-weight:700;color:var(--ink);}
/* Display face, not mono: in a monospace a bracket or a comma sits centred in a
   full-width advance and "$1,500" renders as "$1 , 500" at 32px. Archivo closes
   it up. tabular-nums keeps the column of amounts on one digit width. */
.sv-fig-v{margin:0;flex:0 0 auto;font-family:var(--f-display);font-stretch:86%;
  font-size:var(--t-num);font-weight:700;line-height:1;letter-spacing:-.02em;
  font-variant-numeric:tabular-nums;color:var(--ink);}
.sv-math{padding-top:52px;padding-bottom:52px;}
.sv-math-p{font-size:var(--t-lede);line-height:1.5;font-weight:700;color:var(--ink);max-width:56ch;}
.sv-math-p+.sv-math-p{margin-top:20px;}
@media (min-width:640px){
  .sv-figs{margin-bottom:34px;}
  .sv-fig{padding:13px 0;}
  .sv-math{padding-top:56px;padding-bottom:56px;}
}

/* ---- blocks, notes, inline links ---------------------------------------- */
.sv-block{padding-top:26px;}
.sv-block:first-child{padding-top:0;}
@media (min-width:640px){.sv-block{padding-top:32px;}}

.sv-note{margin-top:34px;padding:26px 20px;background:var(--rich);border:1px solid var(--rule-soft);}
.sv-note-p{font-size:var(--t-lede);line-height:1.5;font-weight:700;color:var(--strong);max-width:56ch;
  margin-bottom:18px;}
/* On the bone and rich grounds the panel would be a near-invisible box on its
   own colour, so it flips to the ink spine underneath it. */
.eb-g-rich .sv-note,.eb-g-bone .sv-note{background:var(--ink);color:var(--bone);
  --fg:color-mix(in srgb, var(--bone) 88%, var(--ink));
  --dim:color-mix(in srgb, var(--bone) 58%, var(--ink));
  --strong:var(--bone);
  --rule-soft:color-mix(in srgb, var(--bone) 26%, var(--ink));}

/* WCAG 2.5.8 exempts a link inside a block of text from the 44px target floor,
   but the floor is reachable here without touching the layout: on a plain
   inline element vertical padding grows the hit box and does NOT grow the line
   box. 12px either side of a ~20px line is 44px of tappable height while the
   paragraph stays exactly where it was, and the link has no background or
   border so nothing about it looks different. Same trick as /privacy. */
.sv-a{color:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px;
  padding-top:12px;padding-bottom:12px;}
.sv-a:hover{color:var(--strong);}

/* ---- the cross-link block ----------------------------------------------- */
/* Not cards, not a grid of tiles — the same ruled ledger the rest of the site
   uses, so the four pages read as chapters of one argument rather than as a
   services menu. The whole row is the tap target and it clears 44px on its own
   padding at every width. */
.sv-more{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);}
.sv-more-a{display:block;padding:20px 0;border-bottom:1px solid var(--rule-soft);text-decoration:none;color:inherit;}
.sv-more-a:hover .sv-more-t{color:var(--ember);}
.sv-more-t{display:block;font-size:var(--t-body);font-weight:700;line-height:1.35;color:var(--strong);}
.sv-more-n{display:block;margin-top:5px;font-size:var(--t-body);line-height:1.55;color:var(--fg);max-width:62ch;}
@media (prefers-reduced-motion:no-preference){
  .sv-more-t{transition:color .15s linear;}
}

/* ---- the close ---------------------------------------------------------- */
.sv-close{padding-top:48px;padding-bottom:48px;}
.sv-close-h{color:var(--ink);margin-bottom:24px;max-width:20ch;text-wrap:balance;}
@media (min-width:640px){.sv-close{padding-top:66px;padding-bottom:66px;}}
`;
