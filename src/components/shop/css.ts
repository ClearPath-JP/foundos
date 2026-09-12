/**
 * The shop's own stylesheet — /systems and /pricing — loaded after SITE_CSS and
 * SERVICE_CSS through ServicePage's `css` prop.
 *
 * Nothing here declares a colour, a face or a type step. Every value is read
 * through the design system's custom properties (--fg, --dim, --strong, --rule,
 * --rule-soft, --rich, the --t-* scale), so a card on the ink spine and a table
 * on the bone field both come out right without knowing which one they are on.
 *
 * ⚠️ THE STATUS MARK IS A SQUARE AND IT IS NOT GREEN. The pricing spec asked
 * for the green dot as a "live" light on every card, and the site's own rule
 * says the green appears exactly once per view — the wordmark. Filled square =
 * ready, hollow square = coming soon, and the words beside it carry the meaning.
 *
 * ⚠️ THE "WHERE I WOULD START" BADGE IS INK ON BONE, NOT INK ON EMBER. Ember is
 * 4.24:1 against ink, which fails 4.5:1 at the 11px label size. Bone is ~13.9:1.
 *
 * ⚠️ NOTHING THE OWNER HAS TO READ IS BELOW --t-fine, AND MOST OF IT IS BODY.
 * The 11px mono label is the site's eyebrow voice and stays on eyebrows and
 * tags only. Drawer triggers, footnotes and struck-through prices are sentences
 * somebody reads to decide, so they sit at body size.
 *
 * No backticks anywhere below — the whole thing is a template literal.
 */
export const SHOP_CSS = `
/* ---- the jump row under the page head ---------------------------------- */
.sh-jump{display:flex;flex-wrap:wrap;gap:0 22px;padding-top:14px;padding-bottom:14px;}
/* Padding out, margin back in: the hit box clears 44px on the shortest label
   ("Both") while the space each link occupies — and so every gap — stays even.
   Same trick as the header's service nav. */
.sh-jump-a{display:inline-flex;align-items:center;min-height:44px;padding-inline:8px;margin-inline:-8px;
  text-decoration:none;color:var(--dim);}
.sh-jump-a:hover{color:var(--strong);}

/* ---- tags that carry information: never below 14px ---------------------- */
/* The status words, the who-it-is-for line and the badge are read to decide,
   so they take the larger of 14px and --t-fine instead of the 11px eyebrow. */
.sh-st,.sh-tag,.sh-pick{font-size:max(.875rem,var(--t-fine));}

/* Orphans: one word alone on the last line reads as a mistake. */
.sh-out,.sh-what,.sh-dl-v,.sh-pk-blurb,.sh-steps li,.sh-cap,.sh-fine{text-wrap:pretty;}

/* ---- the grid ----------------------------------------------------------- */
/* align-items:start — a card is as tall as what is in it. Stretching the row
   and pushing the button to the bottom left 100-150px of empty box above the
   button on every short card. */
.sh-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;align-items:start;}
.sh-grid+.sh-grid{margin-top:14px;}
.sh-sub{margin-top:34px;margin-bottom:14px;}
@media (min-width:720px){.sh-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (min-width:1000px){.sh-grid--3{grid-template-columns:repeat(3,minmax(0,1fr));}}
.sh-wide{grid-column:1/-1;}

/* ---- a card: a system that can be built now ------------------------------ */
.sh-card{display:flex;flex-direction:column;padding:24px 20px;background:var(--rich);
  border:1px solid var(--rule-soft);scroll-margin-top:124px;}
@media (min-width:640px){.sh-card{padding:28px 26px;}}
.sh-card-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;
  gap:6px 14px;min-height:22px;margin-bottom:16px;}
.sh-pick{padding:4px 8px;background:var(--bone);color:var(--ink);}
.sh-name{margin:0;font-family:var(--f-display);font-weight:700;font-stretch:86%;
  font-size:var(--t-num);line-height:1;letter-spacing:-.02em;color:var(--strong);}
.sh-out{margin-top:12px;font-size:var(--t-body);line-height:1.55;color:var(--fg);max-width:52ch;}
.sh-mt{margin-top:14px;}
.sh-mt-s{margin-top:-4px;margin-bottom:16px;max-width:60ch;}

/* The website card: two halves above 760px so the right one is not empty. */
.sh-split{display:grid;grid-template-columns:minmax(0,1fr);row-gap:22px;}
.sh-split-l{display:flex;flex-direction:column;}
@media (min-width:760px){.sh-split{grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:48px;}}

/* ---- the price: two bold figures ---------------------------------------- */
.sh-price{margin-top:20px;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 22px;}
.sh-fig{display:inline-flex;align-items:baseline;gap:7px;white-space:nowrap;}
.sh-amt{font-family:var(--f-display);font-weight:700;font-stretch:86%;font-size:var(--t-num);
  line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--strong);}
.sh-unit{font-size:var(--t-body);color:var(--fg);}
.sh-fine{margin-top:12px;font-size:var(--t-body);line-height:1.55;color:var(--dim);max-width:52ch;}

/* ---- the status mark ---------------------------------------------------- */
.sh-st{display:inline-flex;align-items:center;gap:8px;}
.sh-st-i{flex:0 0 auto;display:inline-block;width:8px;height:8px;background:var(--strong);}
.sh-st--soon .sh-st-i,.sh-st-i--soon{background:transparent;box-shadow:inset 0 0 0 1px var(--fg);}
.sh-inl{margin-right:7px;vertical-align:.05em;}

/* ---- how it works: native details, no script ---------------------------- */
.sh-more{margin-top:20px;border-top:1px solid var(--rule-soft);}
.sh-sum{display:flex;align-items:center;justify-content:space-between;min-height:48px;cursor:pointer;list-style:none;
  font-family:var(--f-mono);font-size:var(--t-fine);font-weight:600;letter-spacing:.04em;text-transform:uppercase;
  color:var(--fg);}
.sh-sum::-webkit-details-marker{display:none;}
.sh-sum::after{content:"+";font-size:var(--t-body);line-height:1;color:var(--fg);}
.sh-more[open] .sh-sum::after{content:"\\2212";}
.sh-sum:hover{color:var(--strong);}
.sh-more--row{margin-top:6px;border-top:0;}
.sh-more--row .sh-sum{justify-content:flex-start;gap:12px;}
.sh-steps{list-style:none;margin:2px 0 0;padding:0;counter-reset:sh;}
.sh-steps li{counter-increment:sh;display:grid;grid-template-columns:2ch minmax(0,1fr);gap:10px;padding:5px 0;
  font-size:var(--t-body);line-height:1.55;color:var(--fg);max-width:64ch;}
.sh-steps li::before{content:counter(sh);font-family:var(--f-mono);font-weight:600;color:var(--strong);}
.sh-what{font-size:var(--t-body);line-height:1.55;color:var(--fg);max-width:60ch;}
.sh-dl{margin:4px 0 0;}
.sh-dl-k{margin-top:16px;font-size:var(--t-body);font-weight:700;color:var(--strong);}
.sh-dl-v{margin:4px 0 0;font-size:var(--t-body);line-height:1.55;color:var(--fg);max-width:60ch;}
.sh-q{margin-top:16px;font-weight:700;color:var(--strong);}
.sh-more-body{padding-bottom:10px;}

/* ---- actions ------------------------------------------------------------ */
.sh-act{padding-top:22px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px;}
.sh-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;
  border:1px solid var(--btn-b-bd);background:var(--btn-b-bg);color:var(--btn-b-fg);
  font-family:var(--f-mono);font-size:var(--t-fine);font-weight:600;letter-spacing:.06em;
  text-transform:uppercase;text-decoration:none;text-align:center;}
.sh-btn:hover{background:var(--btn-a-bg);color:var(--btn-a-fg);border-color:var(--btn-a-bg);}
.sh-link{display:inline-flex;align-items:center;min-height:44px;font-size:var(--t-body);line-height:1.4;color:var(--fg);
  text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px;}
.sh-link:hover{color:var(--strong);}
@media (prefers-reduced-motion:no-preference){
  .sh-btn{transition:background-color .15s linear,color .15s linear,border-color .15s linear;}
}

/* ---- coming soon: a ruled list, not cards -------------------------------- */
.sh-soon{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);}
.sh-srow{padding:22px 0 8px;border-bottom:1px solid var(--rule-soft);scroll-margin-top:124px;}
/* Stacked on a phone for every row — a flex-wrap here put the price beside
   one short name and under the four longer ones. Side by side from 640px. */
.sh-srow-h{display:grid;gap:4px;}
@media (min-width:640px){.sh-srow-h{display:flex;align-items:baseline;justify-content:space-between;gap:24px;}}
.sh-srow-name{margin:0;font-size:var(--t-lede);line-height:1.3;font-weight:700;color:var(--strong);}
.sh-srow-price{font-size:var(--t-body);color:var(--fg);font-variant-numeric:tabular-nums;}
.sh-srow-price strong{color:var(--strong);}
.sh-srow .sh-out{margin-top:6px;}

/* ---- packages: ledger rows ---------------------------------------------- */
.sh-group{margin:0;padding-top:38px;scroll-margin-top:124px;}
.sh-group:first-of-type{padding-top:6px;}
.sh-pks{list-style:none;margin:14px 0 0;padding:0;border-top:1px solid var(--rule);}
.sh-pk{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;padding:24px 0;
  border-bottom:1px solid var(--rule-soft);scroll-margin-top:124px;}
@media (min-width:800px){.sh-pk{grid-template-columns:minmax(0,1fr) 19rem;gap:48px;align-items:start;}}
.sh-pk-top{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;}
.sh-pk-name{margin:0;font-family:var(--f-display);font-weight:700;font-stretch:86%;font-size:var(--t-num);
  line-height:1;letter-spacing:-.02em;color:var(--strong);}
.sh-pk-blurb{margin-top:10px;font-size:var(--t-body);line-height:1.55;color:var(--fg);max-width:56ch;}
.sh-pk-inc{margin-top:8px;font-size:var(--t-body);line-height:1.6;color:var(--dim);max-width:62ch;}
.sh-nw{white-space:nowrap;}
/* Always stacked in a package row, so a short and a long package do not set
   their two prices differently. */
.sh-pk .sh-price{margin-top:0;flex-direction:column;align-items:flex-start;gap:8px;}
.sh-pk-was{margin-top:8px;font-size:var(--t-body);line-height:1.5;color:var(--dim);font-variant-numeric:tabular-nums;}
.sh-pk-was s{text-decoration-thickness:1px;}
.sh-pk .sh-link{margin-top:6px;}

/* ---- the charts --------------------------------------------------------- */
/* Both charts are three columns and fit a 390px phone as they are. The
   scroll box is a backstop for a longer name later, not the layout. */
.sh-tw{overflow-x:auto;overscroll-behavior-x:contain;}
.sh-t{width:100%;border-collapse:collapse;border-top:1px solid var(--rule);
  font-variant-numeric:tabular-nums;}
.sh-t th,.sh-t td{padding:12px 14px 12px 0;text-align:left;vertical-align:top;
  border-bottom:1px solid var(--rule-soft);font-size:var(--t-body);line-height:1.45;color:var(--fg);}
.sh-t th:last-child,.sh-t td:last-child{padding-right:0;}
.sh-t thead th{font-family:var(--f-mono);font-size:var(--t-fine);font-weight:600;letter-spacing:.04em;
  text-transform:uppercase;color:var(--dim);}
.sh-t tbody th{font-weight:700;color:var(--strong);}
.sh-t .sh-t-strong{font-weight:700;color:var(--strong);}
.sh-t .sh-link{font-size:var(--t-body);font-weight:700;color:var(--strong);}
.sh-t-st{display:block;}
.sh-t-note{margin-top:2px;font-weight:400;color:var(--dim);max-width:34ch;}
/* The tier chart: one short number in column one, so it takes less of the row
   and "Full price" / "20% off" never break. */
.sh-t--tiers th:first-child,.sh-t--tiers td:first-child{width:28%;}
.sh-t--tiers td,.sh-t--tiers thead th{white-space:nowrap;}
@media (min-width:640px){.sh-t th,.sh-t td{padding:14px 24px 14px 0;}}
.sh-cap{margin-top:18px;font-size:var(--t-body);line-height:1.55;color:var(--dim);max-width:60ch;}
.sh-cap--lead{margin-top:8px;margin-bottom:16px;}
`;
