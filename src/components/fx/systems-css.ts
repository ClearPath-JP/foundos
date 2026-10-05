/** /restaurant-systems: the three-sided feature grid, price line, demo box and the "when things go wrong" table. */
export const FX_SYSTEMS_CSS = `
.fx-sys-price{margin-top:16px;font-weight:800;color:var(--p);font-size:clamp(20px,2.4vw,24px);}
/* The no-commission promise: the one line owners should remember from this page. */
.sy-nocut{margin-top:18px;max-width:34em;padding-left:14px;border-left:3px solid var(--p);font-weight:700;font-size:18px;color:var(--text);}
.sy-nocut-s{margin-top:4px;font-weight:600;color:var(--text);}
/* What a system doesn't do yet, beside its price. Muted but full contrast (passes AA on white). */
.sy-limits{margin-top:10px;max-width:46em;font-size:15px;line-height:1.5;color:#4A4458;}
.fx-sys-sides{display:grid;gap:32px;margin-top:40px;}
@media (min-width:860px){.fx-sys-sides{grid-template-columns:repeat(3,1fr);gap:28px;}}
.fx-sys-side{padding-top:22px;border-top:2px solid var(--text);}
.fx-sys-side:first-child{border-top-color:var(--p);}
.fx-sys-who{font-size:14px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin:0;}
.fx-sys-side .fx-checks{margin-top:14px;}
.fx-sys-try{margin-top:40px;padding:28px;border:1px solid var(--line);border-radius:16px;background:#fff;}
.fx-sys-try-t{margin:0;font-size:18px;}
.fx-sys-try-btns{display:flex;flex-direction:column;gap:12px;margin-top:20px;}
@media (min-width:640px){.fx-sys-try-btns{flex-direction:row;flex-wrap:wrap;}}
.fx-sys-table tbody th{width:40%;}
.fx-sys-table td{color:var(--text);}
.fx-sys-tag{display:block;margin-top:6px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--p);}
.fx-sys-links{display:flex;flex-wrap:wrap;gap:4px 28px;margin:4px 0 0;}
.fx-sys-answers{display:grid;gap:40px;margin-top:40px;}
@media (min-width:860px){.fx-sys-answers{grid-template-columns:1fr 1fr;gap:56px;}}
.fx-sys-answer .fx-p{margin-top:12px;}
.fx-shot .fx-sys-narrow{display:none;}
@media (max-width:639px){.fx-shot .fx-sys-wide{display:none;}.fx-shot .fx-sys-narrow{display:block;width:100%;max-width:446px;height:auto;}}
.fx-sys-short{margin-top:20px;font-size:22px;font-weight:800;color:var(--p);}
.fx-sys-not{margin:16px 0 0;padding-left:0;list-style:none;color:var(--muted);display:grid;gap:10px;}
@media (max-width:759px){
  .fx-sys-table thead{display:none;}
  .fx-sys-table tr{display:block;padding:18px 0;border-bottom:1px solid var(--line);}
  .fx-sys-table th,.fx-sys-table td{display:block;width:auto!important;padding:0;border:0;}
  .fx-sys-table td{margin-top:8px;}
  .fx-sys-table td::before{content:none;}
}
`;
