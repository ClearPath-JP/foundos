/** Styles for the plan comparison table and the compact Work grid / project pages (added 2026-10-03). */
export const FX_PORTFOLIO_CSS = `
/* plan comparison table */
.fx-matrix-wrap{margin-top:40px;overflow-x:auto;-webkit-overflow-scrolling:touch;}
.fx-matrix{width:100%;min-width:560px;border-collapse:separate;border-spacing:0;font-size:16px;}
.fx-matrix th,.fx-matrix td{padding:16px 14px;border-bottom:1px solid var(--line);text-align:left;vertical-align:middle;line-height:1.45;}
.fx-matrix thead th{vertical-align:bottom;border-bottom:2px solid var(--text);padding-bottom:20px;}
.fx-matrix-corner{width:38%;}
.fx-matrix-note{display:block;font-size:14px;font-weight:600;color:var(--muted);max-width:22ch;}
.fx-matrix-plan{width:31%;}
.fx-matrix-plan--growth{background:var(--tint);border-radius:14px 14px 0 0;}
.fx-matrix tbody td:last-child{background:var(--tint);}
.fx-matrix-name{display:block;font-size:14px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--p);}
.fx-matrix-price{display:block;font-size:40px;font-weight:800;letter-spacing:-.03em;color:var(--text);line-height:1.1;margin-top:6px;}
.fx-matrix-per{font-size:16px;font-weight:600;color:var(--muted);letter-spacing:0;margin-left:2px;}
.fx-matrix-pitch{display:block;font-size:15px;font-weight:600;color:var(--muted);margin:6px 0 14px;}
.fx-matrix-cta{width:100%;justify-content:center;}
.fx-matrix tbody th{font-weight:700;color:var(--text);}
.fx-matrix-hint{display:block;font-size:14px;font-weight:500;color:var(--muted);margin-top:2px;}
.fx-matrix-group th{padding-top:28px;font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--p);border-bottom-color:var(--text);}
.fx-matrix-group td{padding-top:28px;border-bottom-color:var(--text);}
.fx-yes{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--lav);color:var(--p);}
.fx-no{color:#B3ADC0;font-weight:700;font-size:18px;}
.fx-cell-t{font-weight:600;color:var(--text);}
@media (max-width:640px){
  .fx-matrix{min-width:0;font-size:15px;}
  .fx-matrix th,.fx-matrix td{padding:12px 8px;}
  .fx-matrix-corner{width:34%;}
  .fx-matrix-note{display:none;}
  .fx-matrix-price{font-size:28px;}
  .fx-matrix-pitch{font-size:13px;}
  .fx-matrix-cta{padding:8px 10px!important;font-size:14px;white-space:normal;line-height:1.2;min-height:44px;text-align:center;}
  .fx-matrix-corner{width:30%;}
  .fx-matrix-name{font-size:12px;letter-spacing:.06em;}
  .fx-matrix-hint{font-size:13px;}
  .fx-cell-t{font-size:14px;}
}
.fx-details{margin-top:40px;border-top:1px solid var(--line);}
.fx-details>summary{cursor:pointer;list-style:none;padding:20px 0;font-weight:800;font-size:18px;display:flex;justify-content:space-between;align-items:center;min-height:44px;}
.fx-details>summary::-webkit-details-marker{display:none;}
.fx-details>summary::after{content:'+';font-size:24px;color:var(--p);}
.fx-details[open]>summary::after{content:'–';}
.fx-details .fx-table{margin-top:8px;}

/* compact work grid */
.fx-work-grid{display:grid;gap:24px;margin-top:8px;}
@media (min-width:760px){.fx-work-grid{grid-template-columns:repeat(2,1fr);}}
@media (min-width:1100px){.fx-work-grid{grid-template-columns:repeat(3,1fr);}}
.fx-wcard{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .2s,box-shadow .2s,border-color .2s;}
.fx-wcard:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(23,20,33,.10);border-color:#C9BEE0;}
.fx-wcard:focus-visible{outline:3px solid var(--p);outline-offset:3px;}
.fx-wcard-img{aspect-ratio:16/10;overflow:hidden;background:var(--tint);border-bottom:1px solid var(--line);}
.fx-wcard-img img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;}
.fx-wcard-body{padding:20px 20px 22px;display:flex;flex-direction:column;gap:6px;flex:1;}
.fx-wcard-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px;}
.fx-wcard-tag{font-size:13px;font-weight:700;padding:4px 9px;border-radius:999px;background:var(--tint);color:var(--muted);}
.fx-wcard-tag--plan{background:var(--lav);color:var(--p);}
.fx-wcard-name{font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0;color:var(--text);}
.fx-wcard-type{font-size:15px;color:var(--muted);margin:0;}
.fx-wcard-sys{font-size:15px;font-weight:600;color:var(--text);margin:6px 0 0;}
.fx-wcard-more{margin-top:auto;padding-top:14px;font-weight:800;color:var(--p);}
.fx-wcard-more::after{content:' →';}
.fx-back{display:inline-flex;align-items:center;min-height:44px;font-weight:700;color:var(--p);text-decoration:none;margin-bottom:8px;}
.fx-back::before{content:'← ';white-space:pre;}
`;
