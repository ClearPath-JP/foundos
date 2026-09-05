/**
 * The ledger head: a tiny mono label, then a hairline that runs from the end
 * of the label out to the edge of the text column. The single most stealable
 * device on either reference site, and it is four lines of CSS.
 *
 * `heading` promotes the label from a decorative <span> to a real <h3>, with
 * no visual change at all — `.eb-lab` sets size, weight and colour outright,
 * and preflight has already zeroed the UA heading margins. It exists for
 * blocks that carry the most valuable copy on a page and would otherwise be
 * missing from the document outline: a screen-reader user navigating by
 * heading skips straight past a decorative label while reaching less
 * important h3s. On the homepage exactly one block uses it — the ads-honesty
 * note in the funnel section. Keep it a heading there.
 *
 * ⚠️ THE HAIRLINE STOPS AT THE TEXT COLUMN ABOVE 1024px, NOT AT THE SCREEN.
 * Below that the shell gutter IS the screen edge so the two are the same
 * thing; above it, running to the edge means the rule travels 300px past the
 * last word of a 64ch measure with nothing on the other side of it — a rule
 * pointing at nothing. See `.eb-lh` in css.ts. A page that puts a ledger head
 * inside a bounded panel has to say so: the negative margin should equal that
 * panel's own padding, which is a page-level override, not a prop.
 */
export function LedgerHead({ label, heading = false }: { label: string; heading?: boolean }) {
  return (
    <div className="eb-lh">
      {heading ? <h3 className="eb-lab">{label}</h3> : <span className="eb-lab">{label}</span>}
      <span aria-hidden="true" className="eb-lh-line" />
    </div>
  );
}

export default LedgerHead;
