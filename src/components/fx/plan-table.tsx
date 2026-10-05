import Link from "next/link";

import { contactFor } from "@/components/fx/cards";
import {
  PLAN_MATRIX,
  PLANS,
  TERM_MONTHS,
  usd,
  type MatrixCell,
} from "@/config/offer";

const [care, growth] = PLANS;

function Cell({ v }: { v: MatrixCell }) {
  if (v === true) {
    return (
      <span className="fx-yes">
        <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
          <path
            d="M3 8.5l3.2 3L13 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="fx-sr">Included</span>
      </span>
    );
  }
  if (v === false) {
    return (
      <span className="fx-no">
        <span aria-hidden="true">—</span>
        <span className="fx-sr">Not included</span>
      </span>
    );
  }
  return <span className="fx-cell-t">{v}</span>;
}

/** Side-by-side plan comparison: prices and buttons in the header, short answers in the rows. */
export function PlanTable() {
  return (
    <div className="fx-matrix-wrap">
      <table className="fx-matrix">
        <caption className="fx-sr">Digital Care compared with Growth</caption>
        <thead>
          <tr>
            <th scope="col" className="fx-matrix-corner">
              <span className="fx-matrix-note">
                No website setup fee · {TERM_MONTHS}-month first term · one
                location
              </span>
            </th>
            {[care, growth].map((p) => (
              <th
                scope="col"
                key={p.slug}
                className={`fx-matrix-plan fx-matrix-plan--${p.slug}`}
              >
                <span className="fx-matrix-name">{p.name}</span>
                <span className="fx-matrix-price">
                  {usd(p.monthly)}
                  <span className="fx-matrix-per">/mo</span>
                </span>
                <span className="fx-matrix-pitch">
                  {p.slug === "growth"
                    ? "Website + a working system"
                    : "Website, managed"}
                </span>
                <Link
                  href={contactFor(p.slug)}
                  className={`fx-btn ${p.slug === "growth" ? "fx-btn--p" : "fx-btn--s"} fx-matrix-cta`}
                >
                  {p.cta}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLAN_MATRIX.map((r) =>
            r.group ? (
              // Group labels span the table, so they don't wrap into a narrow first column on a phone.
              <tr key={r.row} className="fx-matrix-group">
                <th scope="colgroup" colSpan={3}>
                  {r.row}
                </th>
              </tr>
            ) : (
              <tr key={r.row}>
                <th scope="row">
                  {r.row}
                  {r.hint && <span className="fx-matrix-hint">{r.hint}</span>}
                </th>
                <td>
                  <Cell v={r.care} />
                </td>
                <td>
                  <Cell v={r.growth} />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
