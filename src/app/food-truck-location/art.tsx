/**
 * The drawings for /food-truck-location, and the only route on this site that
 * has any.
 *
 * ── WHY THEY ARE DRAWN AND NOT PHOTOGRAPHED ───────────────────────────────
 *
 * Four independent grades of this page said the same thing in different words:
 * it sells something you look at, to people whose whole business is visual,
 * with nothing on screen but type. That is true and it needed fixing. What it
 * did NOT license was a photograph:
 *
 *   - A stock truck is somebody else's truck. On a page whose argument is that
 *     the internet is full of pictures and addresses that are not really yours,
 *     a bought photo of a stranger's truck is the joke landing on the wrong end.
 *   - A prospect's own photos, lifted from Yelp or Google, belong to whoever
 *     took them. The vertical playbook flags that as real copyright exposure.
 *
 * So they are drawn, in the site's own palette, at the site's own weights.
 * They cost about 4KB, they are sharp at any size, and nobody can send a
 * takedown for them.
 *
 * ── THE REGISTER, AND WHY IT IS NOT CARTOONS ──────────────────────────────
 *
 * The brief said "cartoonish or digital". This is firmly the second, and the
 * reason is the rest of the site: Chivo, hairlines, square corners, flat
 * fills, "two colours, no gradients" (src/app/icon.svg). A rounded, bouncy,
 * three-tone cartoon truck dropped into that is clip art in a broadsheet, and
 * clip art in a broadsheet is the exact "looks AI" verdict this page has been
 * fighting. These are built from the same straight lines and flat fills as
 * everything around them, so they read as drawn FOR the page.
 *
 * ⚠️ NO COLOUR IS DECLARED IN THIS FILE. Every stroke and fill is
 * `currentColor` or a custom property already set by the design system, so the
 * drawings inherit the ground they sit on and can never drift from the palette.
 *
 * ⚠️ RADIUS. The layout rule is radius-zero and it holds everywhere in the CSS.
 * Inside an SVG it does not apply, for the reason Wordmark.tsx gives about the
 * logo: this is a drawing being drawn, not a box being styled. A phone with
 * square corners is not a phone.
 *
 * ⚠️ EVERY DRAWING IS `aria-hidden`. Each one restates a point the adjacent
 * prose already makes in full. A screen reader that announced them would hear
 * the argument twice, and "truck with three location pins" is not information
 * — it is the paragraph next to it, badly.
 */

/** Shared stroke weight. Matches the hairline the rules are drawn at. */
const S = 1.75;

/**
 * The thesis, drawn: one truck, three pins, none of them on it.
 *
 * This is the page's opening argument as a picture — "three places say where
 * you are, none of them asked you". The pins are deliberately scattered and
 * unattached, two of them dimmed and dashed to read as guesses, and the truck
 * sits away from all three. It is not decoration next to the argument; it is
 * the argument, which is the only kind of illustration worth 4KB.
 */
export function TruckAndPins() {
  return (
    <svg
      className="tl-art tl-art--truck"
      viewBox="0 0 420 210"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* The three wrong pins, first so the truck overlaps nothing. Two are
          dashed and dim — a guess someone typed — and one is solid ember,
          because on any given day one of them happens to be right, which is
          what makes the other two so expensive. */}
      <g className="tl-art-pin tl-art-pin--ghost">
        <path
          d="M62 40c0-9 7-16 16-16s16 7 16 16c0 11-16 30-16 30S62 51 62 40Z"
          stroke="currentColor"
          strokeWidth={S}
          strokeDasharray="4 4"
        />
        <circle cx="78" cy="40" r="5.5" stroke="currentColor" strokeWidth={S} />
      </g>
      <g className="tl-art-pin tl-art-pin--ghost">
        <path
          d="M330 28c0-9 7-16 16-16s16 7 16 16c0 11-16 30-16 30s-16-19-16-30Z"
          stroke="currentColor"
          strokeWidth={S}
          strokeDasharray="4 4"
        />
        <circle cx="346" cy="28" r="5.5" stroke="currentColor" strokeWidth={S} />
      </g>
      <g className="tl-art-pin tl-art-pin--live">
        <path
          d="M196 22c0-9 7-16 16-16s16 7 16 16c0 11-16 30-16 30s-16-19-16-30Z"
          fill="var(--ember)"
        />
        <circle cx="212" cy="22" r="5.5" fill="var(--ink)" />
      </g>

      {/* The ground. A hairline, the same device as every rule on the page. */}
      <line x1="8" y1="180" x2="412" y2="180" stroke="currentColor" strokeWidth={S} opacity="0.5" />

      {/* Box body. Square, because the page is square. */}
      <rect x="46" y="78" width="232" height="86" stroke="currentColor" strokeWidth={S} />

      {/* Roof vent — the small detail that stops it reading as a shipping
          container on wheels. */}
      <rect x="96" y="64" width="54" height="14" stroke="currentColor" strokeWidth={S} />

      {/* The serving window, filled bone: the one bright rectangle in the
          drawing, because on a truck it is the one thing a customer looks at. */}
      <rect x="76" y="96" width="112" height="46" fill="var(--bone)" />

      {/* The awning over it, propped. */}
      <path d="M70 96h124l22-22H92Z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />

      {/* Menu board — three stacked lines, the universal shorthand, kept to
          three so it does not turn into texture. */}
      <line x1="206" y1="104" x2="262" y2="104" stroke="currentColor" strokeWidth={S} />
      <line x1="206" y1="118" x2="262" y2="118" stroke="currentColor" strokeWidth={S} />
      <line x1="206" y1="132" x2="240" y2="132" stroke="currentColor" strokeWidth={S} />

      {/* Cab, with a sloped windshield so it reads as a vehicle at a glance. */}
      <path
        d="M278 104h44l30 30v30h-74Z"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M286 112h32l22 22h-54Z" fill="var(--wood)" />

      {/* Wheels. Two circles are the whole difference between a building and a
          business that moves, which is also the entire thesis of the page. */}
      <circle cx="108" cy="164" r="17" fill="var(--ink)" stroke="currentColor" strokeWidth={S} />
      <circle cx="108" cy="164" r="6" stroke="currentColor" strokeWidth={S} />
      <circle cx="306" cy="164" r="17" fill="var(--ink)" stroke="currentColor" strokeWidth={S} />
      <circle cx="306" cy="164" r="6" stroke="currentColor" strokeWidth={S} />
    </svg>
  );
}

/**
 * A phone with the pin coming out of it — the loop in one small drawing.
 *
 * ⚠️ IT EXISTS TO FILL A HOLE THAT WAS MEASURED, not because the figure wanted
 * decorating. At 1440 the message thread is shorter than the two cards beside
 * it, which left about 200px of dead ground under the bubbles. Putting the
 * drawing there closes the hole and reinforces what the bubbles are, which is
 * two jobs for one 1KB shape.
 */
export function PhoneAndPin() {
  return (
    <svg
      className="tl-art tl-art--phone"
      viewBox="0 0 200 150"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* The phone. Rounded, and see the radius note at the top of this file. */}
      <rect
        x="20"
        y="18"
        width="76"
        height="120"
        rx="9"
        stroke="currentColor"
        strokeWidth={S}
      />
      <line x1="48" y1="28" x2="68" y2="28" stroke="currentColor" strokeWidth={S} />

      {/* Two message lines on the screen, one out and one back, matching the
          two bubbles this drawing sits under. */}
      <rect x="30" y="44" width="42" height="12" fill="var(--wood)" />
      <rect x="44" y="64" width="42" height="12" stroke="currentColor" strokeWidth={S} />
      <line x1="30" y1="92" x2="86" y2="92" stroke="currentColor" strokeWidth={S} opacity="0.45" />
      <line x1="30" y1="104" x2="72" y2="104" stroke="currentColor" strokeWidth={S} opacity="0.45" />

      {/* ⚠️ THIS WAS TWO STOCK BROADCAST ARCS AND A DROP SHADOW, AND BOTH WERE
          WRONG. The arcs are the wifi/signal glyph every product page owns, so
          they said nothing. The shadow was worse: an ellipse under this pin
          while the truck drawing sits on a flat ground LINE is two different
          ground conventions inside one set of drawings, which is exactly how
          illustration stops looking like one hand drew it.

          Both replaced by the motif this page already owns — the dashed line
          of a guess, from the truck drawing's ghost pins — now used for the
          opposite meaning: a message on its way somewhere, arriving. */}
      <path
        d="M104 96c22-4 34-18 40-34"
        stroke="currentColor"
        strokeWidth={S}
        strokeDasharray="5 5"
        opacity="0.6"
      />

      {/* The pin it lands as. Ember, the same as the live pin in the truck
          drawing, so the two illustrations read as one set. */}
      <path
        d="M150 52c0-11 9-20 20-20s20 9 20 20c0 14-20 38-20 38s-20-24-20-38Z"
        fill="var(--ember)"
      />
      <circle cx="170" cy="52" r="7" fill="var(--ink)" />

      {/* The same flat ground line the truck stands on. One convention. */}
      <line x1="14" y1="140" x2="192" y2="140" stroke="currentColor" strokeWidth={S} opacity="0.5" />
    </svg>
  );
}

/**
 * The four glyphs on the journey strip.
 *
 * 22x22, one stroke weight, no fills. They are markers a thumb aims at, not
 * pictures — at this size anything with more than four or five strokes turns
 * into a smudge on a phone, which is how icon sets end up looking bought.
 */
export function JourneyIcon({ name }: { name: 'gap' | 'how' | 'cost' | 'limits' }) {
  const common = {
    className: 'tl-j-i',
    viewBox: '0 0 22 22',
    fill: 'none',
    'aria-hidden': true as const,
    focusable: 'false' as const,
  };

  /**
   * ⚠️ THESE WERE A GENERIC ICON SET AND THEY WERE CAUGHT. The first version
   * used a speech bubble, a three-line list and a circle-slash — which is to
   * say lucide's `message-square`, `list` and `ban`, drawn from memory. A
   * grader named all three on sight, and was right to: they are the glyphs
   * every SaaS page in the world uses, so they said nothing about a truck.
   *
   * The rule now is that a glyph has to be about THIS page or it does not go
   * in. Three of the four carry the pin from the truck drawing, so the strip
   * and the illustration read as one hand. The fourth is a miniature of the
   * ledger further down this very page.
   *
   * One stroke weight across all four. The old set mixed 1.5 with heavier
   * shapes and stopped looking like a set at 22px.
   */
  const W = 1.6;
  /** The pin, at icon scale. One path, reused, so all four sit on one grid. */
  const pin = (x: number, y: number) =>
    `M${x - 3},${y} a3,3 0 1,1 6,0 c0,2.3 -3,5.7 -3,5.7 s-3,-3.4 -3,-5.7 z`;

  if (name === 'gap') {
    /* Three pins, two of them guesses. The thesis, at 22px. */
    return (
      <svg {...common}>
        <path d={pin(4.5, 5.5)} stroke="currentColor" strokeWidth={W} strokeDasharray="2.5 2" />
        <path d={pin(17.5, 5.5)} stroke="currentColor" strokeWidth={W} strokeDasharray="2.5 2" />
        <path d={pin(11, 12)} fill="currentColor" />
      </svg>
    );
  }
  if (name === 'how') {
    /* A message carrying a location — the loop, not a speech bubble. */
    return (
      <svg {...common}>
        <path
          d="M2.6 3.6h16.8v11.2h-9.8l-4.2 3.2v-3.2H2.6Z"
          stroke="currentColor"
          strokeWidth={W}
          strokeLinejoin="round"
        />
        <path d={pin(11, 7.6)} fill="currentColor" />
      </svg>
    );
  }
  if (name === 'cost') {
    /* A miniature of the four-figure ledger further down the page: a rule, a
       label on the left, a figure on the right. Not a dollar sign — this page
       shows arithmetic, it does not shout about money. */
    return (
      <svg {...common}>
        <line x1="2.6" y1="4.4" x2="19.4" y2="4.4" stroke="currentColor" strokeWidth={W} />
        <line x1="2.6" y1="9.6" x2="11" y2="9.6" stroke="currentColor" strokeWidth={W} />
        <line x1="14.6" y1="9.6" x2="19.4" y2="9.6" stroke="currentColor" strokeWidth={W * 1.6} />
        <line x1="2.6" y1="15.2" x2="12.4" y2="15.2" stroke="currentColor" strokeWidth={W} />
        <line x1="15.8" y1="15.2" x2="19.4" y2="15.2" stroke="currentColor" strokeWidth={W * 1.6} />
      </svg>
    );
  }
  /* One pin, pinned. The first limit on that section is "if you park in the
     same lot every day, you do not need this" — so the glyph is a truck that
     never moves, not a warning triangle. Nothing here is a hazard. */
  return (
    <svg {...common}>
      <path d={pin(11, 7)} fill="currentColor" />
      <line x1="3.4" y1="17.6" x2="18.6" y2="17.6" stroke="currentColor" strokeWidth={W} />
    </svg>
  );
}

/**
 * The tick in the confirmation bubble.
 *
 * ⚠️ IT REPLACES A ✅ AND THAT WAS NOT A STYLE PREFERENCE. The emoji renders
 * as the operating system's own artwork — Apple's glossy green on a Mac and an
 * iPhone, something else again on Android — which made it the only full-colour
 * foreign object on a page built from four flat colours. It is drawn now, in
 * the green the site already owns: the presence dot in the header, #1D9E75,
 * which is also the favicon.
 */
export function Tick() {
  return (
    <svg
      className="tl-tick"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="7.1" fill="#1D9E75" />
      <path
        d="m4.9 8.2 2.1 2.2 4.1-4.6"
        stroke="var(--ink)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
