/**
 * The shared stylesheet — the design system, minus any one page's own bands.
 *
 * ── WHAT THIS FILE IS ─────────────────────────────────────────────────────
 *
 * Every rule below was lifted verbatim out of src/app/page.tsx, which is the
 * page that earned them. Nothing here is new and nothing here was tuned on the
 * way out: the numbers were measured against two reference sites and against
 * the live page, and the notes explaining each measurement travelled with the
 * rule it explains. Read the header of src/app/page.tsx before changing a
 * value — it is the design brief this sheet implements.
 *
 * What is here: the five palette values and the token set, the four grounds,
 * the two type voices and the six-step scale, the prose styles, the skim-path
 * mark, Rule, LedgerHead, the section rhythm, the sticky header with its nav
 * and its presence dot, the button slabs, the footer, and the phone action bar.
 *
 * What is NOT here: anything only one page draws. The homepage keeps its hero
 * field, its cream order-pad card, its five checks, its wood arithmetic band,
 * its ledger table and its close — see PAGE_CSS at the bottom of page.tsx.
 *
 * ── HOW A PAGE USES IT ────────────────────────────────────────────────────
 *
 *     <div className={`eb ${siteFontClass}`}>
 *       <style>{siteCss(PAGE_CSS)}</style>
 *
 * `siteCss` concatenates this sheet with the page's own and strips the
 * comments on the way out, so a page cannot ship its own styling without the
 * base underneath it and cannot ship either one's prose to a browser.
 *
 * ── THE ONE ORDERING RULE ─────────────────────────────────────────────────
 *
 * ⚠️ THE BASE IS ALWAYS EMITTED FIRST AND A PAGE'S OWN CSS SECOND. That is the
 * layering `siteCss` enforces, and it is what lets a page override a base rule
 * at equal specificity. It also means a base rule may not depend on coming
 * after a page rule — so nothing in here names a class that belongs to one
 * page. Checked: there are no page selectors below. Keep it that way; the
 * moment the base reaches into a page, the page stops being reusable and the
 * base stops being a system.
 *
 * ── AND THE ONE THING THE SHEET CANNOT CARRY ──────────────────────────────
 *
 * The scoping class `.eb` and the three font variables are set on the page's
 * root element, not here. See fonts.ts.
 */
export const SITE_CSS = `
.eb{
  /* the five values, and nothing else is ever written as a hex below */
  --ink:#1a1a1a; --ember:#d94f2b; --bone:#f0e7d4; --wood:#b76745; --rich:#231f20;

  /* NOT a sixth palette value — this is the logo. brand.ts defines the dot as
     a #1D9E75 circle, it is on foundos.ai and on the business cards already in
     circulation, and the mark is not the page's to redraw. It appears exactly
     once per view, on the ink spine, and nothing else on the page is green.
     Radius zero is a rule about the layout; it does not reach the wordmark. */
  --dot:#1D9E75;

  /* The dot's night state, and the ONLY new colour this page has taken on. It
     is not a palette value and nothing but .eb-dot may use it. It is warm on
     purpose — a step yellower than wood, well clear of ember so the two never
     read as the same thing — because a grey dot reads as broken and a red one
     reads as an error, and the honest meaning here is only "it is late in
     Atlanta". 5.9:1 on the ink spine, which is the only ground it appears on. */
  --dot-away:#c98b2b;

  /* ── THE SKIM COLOUR, PER GROUND ──────────────────────────────────────
     One role, re-pointed by every ground class below exactly like --fg and
     --rule, so the eight marked phrases in the copy never have to know which
     field they landed on.

     ⚠️ THIS USED TO BE A TRANSLUCENT WASH AND IT IS NOW AN OPAQUE TEXT
     COLOUR. The variable was renamed --mark → --mark-fg for exactly that
     reason: same name, different KIND of value is how a highlighter ends up
     painted over a sentence. If you see --mark anywhere, it is stale.

     The dark spine gets ember lightened with bone. Plain ember is not an
     option and this is the measurement that decided it: #d94f2b on #1a1a1a is
     4.23:1, which is legal for the 40px demo number in §10 and NOT legal for a
     17px paragraph. Mixing 30% bone into it gives #e07d5e at 6.00:1 — the same
     hue, no sixth value, and 1.5x the headroom the floor asks for. The default
     body colour it replaces is 11.17:1, so the marked phrase is still the
     lower-contrast text on the line; 6.00 is where that stops mattering.

     It also has to survive the rich field under §12 (#231f20), which the ABOUT
     mark sits on: 5.62:1 there. Both clear 4.5. */
  --mark-fg:color-mix(in srgb, var(--ember) 70%, var(--bone));

  --f-display:var(--font-eb-display),var(--font-inter),ui-sans-serif,system-ui,sans-serif;
  --f-body:var(--font-eb-body),var(--font-inter),ui-sans-serif,system-ui,sans-serif;
  --f-mono:var(--font-eb-mono),ui-monospace,SFMono-Regular,Menlo,monospace;

  /* ── THE TYPE SCALE: SIX STEPS, DECLARED ONCE ─────────────────────────
     Every font-size below is one of these tokens or one of the three display
     clamps. Nothing sets a raw px size, which is the only way a scale claim
     stays true — an earlier version of this file claimed four sizes while
     shipping seventeen, because each component stepped itself at its own
     breakpoint. If you need a size that isn't here, change a token; do not
     add a seventh. The step is at 640px for all six at once. */
  --t-label:11px;  /* mono, uppercase, tracked: the ledger heads and Open →   */
  --t-fine:13px;   /* mono asides: Check it, buttons, the fine print          */
  --t-body:17px;   /* everything that is a sentence, h3s included             */
  --t-lede:19px;   /* standfirsts, the arithmetic, the ads note               */
  --t-lead:21px;   /* the hero subhead and the two section ledes              */
  --t-num:26px;    /* the 01-05 numerals, the ledger amounts, the app figures */

  /* per-ground roles. Every ground class below re-points these. */
  --fg:color-mix(in srgb, var(--bone) 88%, var(--ink));
  --dim:color-mix(in srgb, var(--bone) 58%, var(--ink));
  /* emphasis text: bold leads, amounts, h3s. It is a ROLE, not a colour —
     hard-coding var(--bone) here is what made a light ground impossible. */
  --strong:var(--bone);
  --rule:var(--bone);
  --rule-soft:color-mix(in srgb, var(--bone) 26%, var(--ink));
  --btn-a-bg:var(--bone); --btn-a-fg:var(--ink);
  --btn-b-bg:transparent; --btn-b-fg:var(--bone); --btn-b-bd:var(--bone);

  /* the six globals.css @theme tokens, re-pointed for the dark spine. This is
     what makes the unlayered :focus-visible ring in globals.css come out bone
     instead of an invisible black. Do not replace it with a hand-written ring. */
  --color-paper:var(--ink);
  --color-ink:var(--bone);
  --color-muted:color-mix(in srgb, var(--bone) 58%, var(--ink));
  --color-hairline:color-mix(in srgb, var(--bone) 26%, var(--ink));
  --color-surface:var(--rich);
  --color-dot:var(--dot);

  background:var(--ink);
  color:var(--bone);
  font-family:var(--f-body);
  -webkit-font-smoothing:antialiased;
}
/* The one breakpoint the scale steps at. Six values move together, so the
   page cannot drift into having a tablet size that exists nowhere else. */
@media (min-width:640px){
  .eb{--t-fine:14px; --t-body:18px; --t-lede:21px; --t-lead:26px; --t-num:32px;}
}
/* Clip on main, not on the root: overflow on an ancestor of the sticky header
   would give it a scroll container and it would stop sticking. */
.eb main{overflow-x:clip;}

/* ---- grounds ------------------------------------------------------------ */
.eb-g-rich{background:var(--rich);}
/* The one light FIELD (as opposed to the cream card in 04, which is a bordered
   panel inside the shell). It carries §08, where two dark screenshots need a
   ground to sit against, and it is the break in the second half's rhythm: the
   run of unbroken ink from the wood band to the close is otherwise about
   6,000px, half the page on one colour. Roles are the cream card's, because
   the constraint is the same one — ink prose on bone, never the reverse.
   Re-measured at 1440 on 2026-09-04: it cuts the longest single-ground run to
   4,673px of a 13,702px page. */
.eb-g-bone{
  background:var(--bone);
  color:var(--rich);
  --fg:color-mix(in srgb, var(--rich) 92%, var(--bone));
  --dim:color-mix(in srgb, var(--rich) 66%, var(--bone));
  --strong:var(--rich);
  --rule:var(--rich);
  --rule-soft:color-mix(in srgb, var(--rich) 24%, var(--bone));
  --btn-a-bg:var(--rich); --btn-a-fg:var(--bone);
  --btn-b-bg:transparent; --btn-b-fg:var(--rich); --btn-b-bd:var(--rich);
  --color-ink:var(--rich);
  --color-paper:var(--bone);
  /* Ember DARKENED with rich, the mirror of the spine's ember lightened with
     bone. Plain ember on cream is 3.35:1 and would be a contrast regression on
     the marked sentence; 60/40 gives #903c27 at 5.97:1. No mark lives on this
     field today (§08 is two screenshots) — the value is here so that one
     landing here later cannot inherit the spine's light ember onto cream. */
  --mark-fg:color-mix(in srgb, var(--ember) 60%, var(--rich));
}
.eb-g-ember{
  background:var(--ember);
  color:var(--ink);
  --fg:var(--ink);
  --dim:var(--ink);
  --strong:var(--ink);
  --rule:var(--ink);
  --rule-soft:color-mix(in srgb, var(--ink) 40%, var(--ember));
  /* ember is 4.24:1 against ink and 3.35:1 against bone, so both buttons are
     solid slabs — a 13px outlined label here would not clear 4.5:1. */
  --btn-a-bg:var(--ink); --btn-a-fg:var(--bone);
  --btn-b-bg:var(--bone); --btn-b-fg:var(--ink); --btn-b-bd:var(--bone);
  /* the ring: bone clears 3:1 against both the ember field and the ink slab */
  --color-ink:var(--bone);
  --color-paper:var(--ember);
  /* ⚠️ NO MARKED PHRASE MAY LIVE ON EMBER, and now there is no colour that
     could rescue one. Ink — the colour the copy here is already set in — is
     4.23:1 on this field, and bone is 3.35:1; there is nothing above the
     first and the second is worse. So the reveal is pinned to the text colour
     the ground already uses, which makes it a no-op: a phrase landing here
     keeps its 700 weight and changes colour by nothing, which is the only
     honest failure mode. It is not an invitation to put one here. */
  --mark-fg:var(--ink);
}
.eb-g-wood{
  background:var(--wood);
  color:var(--ink);
  --fg:var(--ink);
  --dim:var(--ink);
  --strong:var(--ink);
  --rule:var(--ink);
  --color-ink:var(--ink);
  /* ⚠️ SAME NO-OP AS EMBER, AND THIS BAND IS THE HARDER CASE OF THE TWO.
     A wash could raise the marked line's contrast here and one used to. A
     colour change can only lower it: measured against wood #b76745, the ink
     these lines are set in is 4.18:1, rich is 3.91:1, bone is 3.39:1, and pure
     white — the arithmetic ceiling for anything lighter than the field — is
     4.17:1. Nothing reaches 4.5:1 on wood, in the palette or out of it. So the
     reveal is pinned to ink and does nothing, and the band carries no marked
     phrase. See the fifth rule on MARKS before you try to put one back. */
  --mark-fg:var(--ink);
}

/* ---- the two voices ----------------------------------------------------- */
.eb-d{
  font-family:var(--f-display);
  font-weight:700;
  font-stretch:86%;
  line-height:.85;
  letter-spacing:-.035em;
}
/* ── THE HERO IS REBALANCED, AND THE RATIO IS THE WHOLE FIX ────────────────
   This was clamp(2.75rem,10.6vw,8rem): 128px at 1440, 44px at 390. Three
   things were wrong with that and they were all the same thing.
   (1) The 128px line is the generic one. "I build and run the online side of
   restaurants and food businesses in Atlanta" is a job description. The line
   that actually sells — "You're good at what you do. The internet doesn't show
   it." — sat 24px underneath it, so the page shouted the boring half and
   whispered the half that lands. (2) Under a 128px headline, an 11-13px mono
   button reads as a footnote, not as the thing to do next. (3) At 390 the 44px
   floor forced the h1 to five lines in a 350px column, which pushed the subhead
   to 365px and the first button to 456px — most of an iPhone SE screen spent
   before anything sellable appears.
   The words did not change. The weight they are given did: the h1 comes down
   to 96px / 36px, the subhead goes up to 38px / 22px, and the buttons go up a
   step to body size. 96:38 is a real hierarchy; 128:24 was a shout followed by
   a mumble. text-wrap:balance stops the h1 leaving a two-word last line.
   ⚠️ The subhead is ink on ember at 4.24:1, which is legal ONLY above the WCAG
   large-scale floor (18.66px bold). Its clamp floor is 22px and its weight is
   700. Do not lower either. */
.eb-h1{font-size:clamp(2.25rem,9.2vw,6rem);text-wrap:balance;}
.eb-h2{font-size:clamp(1.625rem,5.4vw,2.75rem);line-height:.88;letter-spacing:-.03em;}
.eb-lab{
  font-family:var(--f-mono);
  font-size:var(--t-label);
  font-weight:500;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:var(--dim);
}
.eb-mono{font-family:var(--f-mono);}

/* ── THE SKIM PATH ────────────────────────────────────────────────────────
   Eight phrases, one span each, and they are NOT decoration. Josh's reason is
   quoted in full on MARKS in the copy block: a reader going fast should be
   able to read only the coloured phrases and come away with the argument. The
   rules for choosing one live there too. This block is only how it paints.

   ⚠️ THE WEIGHT IS PERMANENT AND THE COLOUR IS THE REVEAL, AND THAT SPLIT IS
   DELIBERATE. Two reasons, and neither is taste.
   (1) A colour change alone is invisible to a reader with a red-green colour
   vision deficiency, and this device is a comprehension aid — the one thing on
   the page that must not depend on hue. 400 → 700 carries the whole skim path
   with the colour switched off.
   (2) font-weight is animatable on a variable face and Chivo is one, so it
   COULD have been part of the reveal. It must not be: interpolating weight
   re-measures the text every frame, which reflows the paragraph around it, and
   eight paragraphs twitching as you scroll is a worse bug than no animation.
   Setting it once, up front, also means the skim path is fully readable before
   IntersectionObserver has fired and on any browser where it never does.
   So: color is the only animated property, and it does not affect layout.

   The old build was a translucent wash swept in behind the words with a
   background gradient. Do not reach for background-size here again — it is not
   what --mark-fg holds any more, and MarkReveal's stagger is timed to a colour
   transition.

   --mark-fg is re-pointed by every ground exactly like --fg. Measured, on the
   grounds these eight phrases actually sit on:
     ink spine  #e07d5e on #1a1a1a  6.00:1   (five of the eight)
     rich §12   #e07d5e on #231f20  5.62:1   (tellYou)
     cream card #903c27 on #f0e7d4  5.97:1   (costingNow; 4.56:1 where the
                                              card's 1px ruled line crosses)
   Ember and wood pin --mark-fg to the text colour they already use, so a mark
   landing on either changes nothing but its weight. See the notes there: on
   those two fields no colour on earth reaches 4.5:1, which is why neither
   carries a phrase.

   Under reduced motion the mark is simply painted in its final colour with no
   transition. Which sentence matters is information, and information is not
   what a reduced-motion request is asking to have removed. MarkReveal still
   adds .is-in and it is a no-op here. */
.eb-mark{
  font-weight:700;
  color:inherit;
}
.eb-mark.is-in{color:var(--mark-fg);}
@media (prefers-reduced-motion:no-preference){
  .eb-mark{transition:color .5s cubic-bezier(.22,.61,.36,1);}
}
@media (prefers-reduced-motion:reduce){
  .eb-mark,.eb-mark.is-in{color:var(--mark-fg);}
}

/* Body copy and the only sub-heading style. There is no mid-size heading on
   this page and adding one undoes device 5 — see the file header. */
.eb-p{font-size:var(--t-body);line-height:1.62;color:var(--fg);max-width:64ch;}
/* The adjacency has to name the lede as well. In the build tail a paragraph
   follows .eb-lede--strong, so .eb-p + .eb-p never matched and the two sat at
   a measured 0px apart, reading as one wrapped block. */
:is(.eb-p,.eb-lede)+.eb-p{margin-top:14px;}
.eb-lede+.eb-p{margin-top:18px;}
.eb-p--wide{max-width:70ch;}
.eb-h3{font-size:var(--t-body);line-height:1.5;font-weight:700;color:var(--strong);margin-bottom:10px;max-width:62ch;}
.eb-lede{font-size:var(--t-lead);line-height:1.45;color:var(--fg);max-width:52ch;}
.eb-lede--strong{margin-top:22px;font-weight:700;color:var(--strong);}
.eb-stand{font-size:var(--t-lede);line-height:1.5;color:var(--dim);max-width:60ch;margin-bottom:30px;}
/* The flush variant is the one used where no full-bleed rule separates the h2
   from its standfirst (08 and 10). Without a top margin the two sat 0px apart
   — .eb-h2 has no margin-bottom, by design, because everywhere else a rule and
   64px of section padding do the separating. */
.eb-stand--flush{margin-top:22px;margin-bottom:24px;}
.eb-fine{margin-top:18px;font-size:var(--t-fine);line-height:1.6;color:var(--dim);}
.eb-mt{margin-top:30px;}
@media (min-width:640px){
  .eb-stand--flush{margin-top:26px;}
}

/* ---- rules -------------------------------------------------------------- */
.eb-rule{height:1px;width:100%;background:var(--rule);}
.eb-rule--soft{background:var(--rule-soft);}
/* the inset variant is for rules inside a padded box; it stops at the box */
.eb-rule--inset{margin:22px 0;}
/* For a rule that has to sit inside the 1200px shell — under the hero
   headline, above the closing buttons. calc(50% - 50vw) is measured off the
   shell's own content box, so the line lands exactly on the viewport edge at
   every width instead of stopping at the column like the text does. On a
   desktop with a visible scrollbar 100vw overshoots the layout viewport by the
   scrollbar's width, which is the literal over-bleed the reference measured
   (1585px of rule inside a 1502px viewport) — and the overflow-x:clip on main
   means it costs no horizontal scroll. Verified at 390 and 1440.
   (Backticks would end this whole stylesheet. There are none in here.) */
.eb-rule--bleed{width:auto;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);}

/* The default is the SHELL case, and it has to be the default: this device is
   described three inches above as a hairline that "runs from the end of the
   label out to the screen edge", and it did not. -40px assumes the shell
   gutter IS the screen edge, which is only true below about 1280px. Measured
   at 1440 the line stopped at 1312 while every section rule ran the full
   width, and the shortfall grows with the window — 360px short at 1920.
   calc(50% - 50vw) is measured off the column's own content box, the same
   arithmetic as .eb-rule--bleed, with the same over-bleed by the scrollbar
   width that main's overflow-x:clip absorbs. */
.eb-lh{display:flex;align-items:center;gap:14px;margin-bottom:18px;
  margin-right:calc(50% - 50vw);}
.eb-lh-line{flex:1 1 auto;height:1px;background:var(--rule);}
/* ── WHERE THE EYEBROW RULE STOPS, ONCE THE COLUMN STOPS MOVING ───────────
   Below 1024px the shell gutter IS the screen edge, so running to the viewport
   is the same thing as running to the column and the device reads as intended.
   Above it the two come apart, and running to the edge means the hairline
   travels 300px past the last word of a 64ch measure with nothing on the other
   side of it. That is the "rule pointing at nothing" an audit found in every
   band. So at 1024 and up the eyebrow stops where the prose stops. The
   full-bleed section dividers are untouched: they separate bands, they are not
   pointing at a column, and a divider that stopped mid-page would read as a
   rule that failed rather than one that was placed. */
@media (min-width:1024px){
  /* 44rem is the same 704px the prose measure resolves to, so the hairline and
     the right edge of the paragraphs below it land on one line. Not a ch value,
     for the reason spelled out at .eb-do: this element's own font is 16px Chivo
     and a ch here means something different from a ch three rules down. */
  .eb-lh{margin-right:0;max-width:44rem;}
}

/* ---- shell rhythm ------------------------------------------------------- */
/* ⚠️ CUT ~35% FROM EVERY BAND, AND THE PAGE IS BETTER FOR IT, NOT WORSE.
   At 1440 the document was 15,705px and a scroll-through found the same shape
   over and over: a heading, a rule, six lines of type, then 200-270px of empty
   ink before the next rule. That is not restraint, it is a page with nothing in
   the lower two thirds of most viewports — and it is paid for by the reader,
   who scrolls a third further to read the same words. The band separations here
   are doing a job the 1px rules already do on their own.
   Every number below is the old one times roughly 0.65. If a future edit wants
   air back, take it in one place that earns it rather than everywhere. */
.eb-sec{padding-top:44px;padding-bottom:44px;}
.eb-sec--tight{padding-top:38px;padding-bottom:38px;}
.eb-sec--after-rule{padding-top:30px;padding-bottom:48px;}
@media (min-width:640px){
  .eb-sec{padding-top:62px;padding-bottom:62px;}
  .eb-sec--tight{padding-top:52px;padding-bottom:52px;}
  .eb-sec--after-rule{padding-top:42px;padding-bottom:72px;}
}

/* ---- header ------------------------------------------------------------- */
.eb-head{position:sticky;top:0;z-index:50;background:var(--ink);}
.eb-head-row{display:flex;align-items:center;justify-content:space-between;height:64px;}
.eb-head-mark{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;}
/* ⚠️ RENAMED FROM .eb-mark. That name now belongs to the skim path, the eight
   phrases that change colour (see .eb-mark, up in "the two voices"), and the
   wordmark cannot share it: display:inline-flex plus the display face on a
   phrase mid-paragraph turns that phrase into an unwrappable bone-coloured
   box. Two things called "mark" in one file is the bug waiting to happen. */
.eb-wm{display:inline-flex;align-items:baseline;font-family:var(--f-display);font-weight:700;
  font-stretch:86%;letter-spacing:-.03em;color:var(--bone);}

/* ── THE PRESENCE DOT ──────────────────────────────────────────────────────
   The one radius and the one green on the page, and both are correct. This is
   the mark from brand.ts — a circle, #1D9E75 — the same one on foundos.ai and
   on the cards already handed out. A square ember dot is a different logo. It
   sits on the ink spine in the header and the footer, never on ember, so the
   green has room and clashes with nothing.

   It now breathes, and it now MEANS something: components/Presence.tsx flips
   data-state to "away" outside 9am-9pm Atlanta time, and PRESENCE puts the
   words beside it. What the dot must never become is an alarm — 2.4s is slow
   enough to read as breathing, and anything under about 1.5s reads as an
   error state on a device somebody is holding.

   THE AMBER IS THE ONE NEW COLOUR ON THE PAGE and it is deliberately inside
   the warm family, a step yellower than wood, so that a night visitor sees a
   different state rather than a different brand. It is not a palette value and
   nothing else may use it. Both states are decorative: the sentence a screen
   reader hears is in .eb-sr, not in the colour. */
.eb-dot{
  --now:var(--dot);
  display:inline-block;flex:0 0 auto;position:relative;
  border-radius:50%;background:var(--now);
}
.eb-dot[data-state="away"]{--now:var(--dot-away);}
/* transform and opacity only, and the ring does not exist at all when reduced
   motion is asked for — no content, no pseudo-element, nothing to stop. */
@media (prefers-reduced-motion:no-preference){
  .eb-dot{animation:eb-breathe 2.4s ease-in-out infinite;}
  .eb-dot::after{
    content:"";position:absolute;inset:0;border-radius:50%;
    background:var(--now);opacity:.45;
    animation:eb-ring 2.4s ease-out infinite;
  }
}
@keyframes eb-breathe{0%,100%{opacity:1} 50%{opacity:.62}}
@keyframes eb-ring{0%{transform:scale(1);opacity:.45} 70%,100%{transform:scale(2.8);opacity:0}}

/* The line that makes the dot a conversion element instead of a decoration.
   Label voice, because the page has no third small-type style, and nowrap
   because a two-line fragment in a 64px header row is worse than a tight one.
   The 44px min-height matches the nav links either side of it so the row does
   not shift when the state changes. */
.eb-presence{display:inline-flex;align-items:center;min-height:44px;}
.eb-presence-t{white-space:nowrap;}
/* The screen-reader sentence. Not Tailwind's .sr-only: this page's stylesheet
   is self-contained inside .eb and does not otherwise depend on a utility
   surviving a content scan. */
.eb-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip-path:inset(50%);white-space:nowrap;border:0;}

.eb-nav{display:flex;align-items:center;gap:22px;}
.eb-nav-a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;color:var(--dim);}
.eb-nav-a:hover{color:var(--bone);}
.eb-nav-a--wide{display:none;}

/* The service nav — a fixed 44px row that scrolls sideways instead of wrapping.
   The five labels measure about 342px at 11px mono with 20px gaps, against a
   350px visible track at 390px, so they sit on one line unscrolled on the
   narrowest phone worth supporting; below that the row slides and the header's
   height does not move. ⚠️ THAT MARGIN IS EIGHT PIXELS. A sixth item, or a
   longer label on any of the five, puts the last one off the screen — which is
   how a visitor stops being able to see the page he is on. The lengths are
   held, and reasoned about, in components/site/copy.ts. The scrollbar is
   hidden in all three engines because a visible bar under a 44px row reads as
   a broken border. */
.eb-subnav{display:flex;align-items:center;gap:20px;height:44px;
  overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none;-ms-overflow-style:none;}
.eb-subnav::-webkit-scrollbar{display:none;}
/* min-width:44px, added 2026-09-11 for "Why" — three mono characters plus the
   16px of padding below came to 38px, the first label on the row short enough
   to fail the floor on its own. The padding/margin pair keeps the space it
   OCCUPIES at 28px, so the row's measured width barely moves. */
.eb-subnav-a{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;height:44px;min-width:44px;
  white-space:nowrap;text-decoration:none;color:var(--dim);
  /* Padding out, margin back in by the same amount. The hit box grows to 60px
     wide; the space the link OCCUPIES does not move, so the row still measures
     342px and the gaps still read as 20px. This exists because "Google" and
     "Trucks" are short enough that their boxes were exactly 44 wide — legal to
     the pixel, and a thumb does not aim to the pixel. The outer edges give
     back their outside half so the row still lines up with the wordmark. */
  padding-inline:8px;margin-inline:-8px;}
.eb-subnav-a:first-child{padding-left:0;margin-left:0;}
.eb-subnav-a:last-child{padding-right:0;margin-right:0;}
.eb-subnav-a:hover{color:var(--bone);}
@media (min-width:640px){.eb-nav-a--wide{display:inline-flex;}}
/* ---- buttons ------------------------------------------------------------ */
.eb-btns{display:flex;flex-direction:column;gap:12px;margin-top:30px;align-items:stretch;}
@media (min-width:560px){.eb-btns{flex-direction:row;align-items:flex-start;}}
/* Body size, not --t-fine. .eb-btn is used in exactly two places — the hero and
   the close — and at 13px under a display headline both of them read as small
   print rather than as the next thing to do. This is the other half of the hero
   rebalance described at .eb-h1. */
.eb-btn{
  display:inline-flex;align-items:center;justify-content:center;
  min-height:58px;padding:0 24px;border-radius:0;border:1px solid transparent;
  font-family:var(--f-mono);font-size:var(--t-body);font-weight:600;letter-spacing:.06em;
  text-transform:uppercase;text-decoration:none;text-align:center;cursor:pointer;
}
/* ── NUMERALS OPT OUT OF TRACKING ─────────────────────────────────────────
   +.06em is right for a tracked uppercase label and wrong for every character
   that is not a letter. Applied to "(404) 436-3393" it puts the added space
   INSIDE the brackets, so the button reads "( 404 ) 436-3393", and the same
   tracking on a mono ledger amount opens "$1,500" into "$1 , 500" because a
   monospaced comma already sits in a full-width advance with the ink in the
   middle of it. tabular-nums keeps the digits on a common width so a column of
   amounts still lines up. */
.eb-num{letter-spacing:normal;font-variant-numeric:tabular-nums;}
.eb-btn--a{background:var(--btn-a-bg);color:var(--btn-a-fg);border-color:var(--btn-a-bg);}
.eb-btn--b{background:var(--btn-b-bg);color:var(--btn-b-fg);border-color:var(--btn-b-bd);}
/* Hover swaps the two treatments. A flat swap keeps every state above 4.5:1,
   which an opacity or tint hover would not. */
.eb-btn--a:hover{background:var(--btn-b-bg);color:var(--btn-b-fg);border-color:var(--btn-b-bd);}
.eb-btn--b:hover{background:var(--btn-a-bg);color:var(--btn-a-fg);border-color:var(--btn-a-bg);}
/* One exception to "the ground decides the ring". On ember the ring is bone,
   which is right for the ink-filled button but puts a bone ring around a
   bone-filled one — readable only through the 2px offset gap. Ink clears 3:1
   against both the bone slab (13.9) and the ember field (4.24), so this one
   button gets it. Verified by tabbing the page, not by eye. */
.eb-g-ember .eb-btn--b:focus-visible{outline-color:var(--ink);}
/* ⚠️ THIS RULE WAS ONE SELECTOR LIST AND IT IS NOW TWO, IN TWO FILES. It read
   .eb-btn,.eb-nav-a,.eb-work-a,.eb-tel — and the last two are homepage classes
   (the concept-work cards and the demo-line panel), which cannot be named from
   the base. The declaration is identical in both halves; the other half is in
   page.tsx beside the two elements it is for. If a third page wants the same
   hover, it opts in the same way rather than being added to a list here. */
@media (prefers-reduced-motion:no-preference){
  .eb-btn,.eb-nav-a{transition:background-color .15s linear,color .15s linear,border-color .15s linear;}
}

/* ---- footer ------------------------------------------------------------- */
/* No separator glyphs — see the note on the markup. The row gap is what
   separates the items, so nothing can be orphaned onto a wrapped line. */
.eb-foot{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1.25rem;padding-top:22px;
  padding-bottom:22px;font-size:var(--t-fine);line-height:1.6;color:var(--dim);}
.eb-foot-a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;color:inherit;}
.eb-foot-a:hover{color:var(--bone);}
.eb-foot-s{display:inline-flex;align-items:center;min-height:44px;}
/* ---- the phone action bar ----------------------------------------------- */
/* Hidden by default so no desktop rule has to undo it. Below 640px the header
   already drops "Book 20 minutes", which is the same breakpoint at which a
   visitor stops having a persistent way to act at all. */
.eb-bar{display:none;}
@media (max-width:639px){
  .eb-bar{position:fixed;left:0;right:0;bottom:0;z-index:60;
    display:grid;grid-template-columns:1fr 1fr;gap:1px;
    background:var(--bone);border-top:1px solid var(--bone);
    padding-bottom:env(safe-area-inset-bottom);}
  .eb-bar-a{display:flex;align-items:center;justify-content:center;min-height:56px;padding:0 12px;
    font-family:var(--f-mono);font-size:var(--t-fine);font-weight:600;letter-spacing:.06em;
    text-transform:uppercase;text-decoration:none;text-align:center;
    background:var(--ink);color:var(--bone);}
  .eb-bar-a--p{background:var(--bone);color:var(--ink);}
  /* The bar must never sit on top of the last line of the footer. This is the
     bar's own height plus whatever the device reserves for the home indicator,
     and it has to move if .eb-bar-a's min-height ever does. */
  .eb{padding-bottom:calc(57px + env(safe-area-inset-bottom));}
}
/* Progressive enhancement, and the base state above is the fallback: a browser
   without scroll-driven animations, and anybody who asked for reduced motion,
   gets the bar the whole way down. Where it is supported the bar stays off
   screen over the hero — where two full-size buttons are already on screen —
   and again over the closing CTA, for the same reason. Percentages rather than
   pixels because the document is 15,000px on one phone and 20,000px on
   another; 4% and 94% of the scroll range land on the two CTA blocks at both.
   transform and opacity only, which is the whole of what is animated here. */
@supports (animation-timeline:scroll()){
  @media (max-width:639px) and (prefers-reduced-motion:no-preference){
    .eb-bar{animation:eb-bar-peek linear both;animation-timeline:scroll(root block);}
    @keyframes eb-bar-peek{
      0%,4%{opacity:0;transform:translateY(100%);}
      7%,94%{opacity:1;transform:translateY(0);}
      97%,100%{opacity:0;transform:translateY(100%);}
    }
  }
}
`;

/**
 * Strips comments and collapses whitespace on the way to the browser.
 *
 * Moved here from page.tsx because it belongs with the stylesheet it is for,
 * and because every page that ships CSS this way needs it — leaving it in one
 * page meant the second page either re-declared it or shipped the prose.
 *
 * The stylesheet above and every page stylesheet are heavily commented on
 * purpose — they are the only record of why the tracking is directional, why
 * the ledger numerals are not mono, why the mobile bar uses a scroll-driven
 * animation instead of JS. Those notes are for whoever edits this next and
 * they should stay.
 *
 * They just should not be DOWNLOADED. Measured on the live page: the inline
 * stylesheet was 53.7KB, of which 27.8KB — 99 comments, 52% of the CSS and 15%
 * of the whole HTML document — was prose explaining the CSS to a person who
 * will never read it in a browser. Check 05 on the homepage tells an owner to
 * turn wifi off and count while their own site loads. Shipping 27KB of my own
 * commentary to a restaurant owner on two bars in a parking lot is exactly the
 * thing being complained about, on the page doing the complaining.
 *
 * Deliberately conservative: block comments, then runs of whitespace, then the
 * space around the punctuation that cannot be ambiguous. It does NOT touch
 * quoted strings or url() values, and there are no data: URIs in these sheets
 * (checked — a base64 payload containing the comment terminator is the usual
 * way a naive stripper corrupts a stylesheet). If a data URI is ever added,
 * this needs to become a real minifier rather than four regexes.
 */
export function shipCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/**
 * The one call a page makes: base first, the page's own second, comments off.
 *
 * Pass nothing and you get the design system on its own, which is a complete
 * and usable page style — grounds, type, rules, header, buttons, footer.
 */
export function siteCss(pageCss = ''): string {
  return shipCss(`${SITE_CSS}${pageCss}`);
}
