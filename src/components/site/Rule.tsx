/**
 * A 1px line, edge to edge. The second of the three devices the whole design
 * rests on, and the one that does the most work per byte.
 *
 * Normally a sibling of the padded shell, so it reaches both screen edges on
 * its own. `bleed` is for the rules that have to live INSIDE the shell — on
 * the homepage, the one under the hero headline and the one above the closing
 * buttons — where it pulls the line back out to the gutter with a negative
 * margin. The margin exactly equals the gutter, so the line stops at the
 * viewport edge and the document never gets wider than the screen.
 *
 * `soft` is the low-contrast variant, for a divider inside a list rather than
 * between two sections.
 *
 * ⚠️ The bleed variant depends on `overflow-x: clip` on `main` — SITE_CSS sets
 * it there rather than on the root, because an overflow value on an ancestor
 * of the sticky header would give it a scroll container and it would stop
 * sticking. A page that puts a bleeding rule outside `<main>` needs to check
 * that for itself.
 */
export function Rule({ soft = false, bleed = false }: { soft?: boolean; bleed?: boolean }) {
  const cls = ['eb-rule', soft && 'eb-rule--soft', bleed && 'eb-rule--bleed']
    .filter(Boolean)
    .join(' ');
  return <div aria-hidden="true" className={cls} />;
}

export default Rule;
