import Image from "next/image";
import type { Glyph } from "./data";

/**
 * Designed stand-in for real food photography.
 *
 * Everything here is deterministic (hashed from `seed`) so server and client
 * render byte-identical markup — no hydration mismatch, no randomness.
 * On a real build these get replaced by the client's own photos.
 */

type Palette = { a: string; b: string; c: string };

// Fire and wood tones only — no greens. Anything cool-toned reads as spoiled
// food at thumbnail size.
const PALETTES = {
  ember: { a: "#2b1108", b: "#8f2f14", c: "#e0762a" },
  chile: { a: "#3d0a0d", b: "#a8262b", c: "#e2603f" },
  masa: { a: "#4a2a08", b: "#b8791d", c: "#f0c664" },
  crust: { a: "#33200c", b: "#8a5a22", c: "#d9a556" },
  cocoa: { a: "#241410", b: "#6b3a26", c: "#b8794f" },
  rosa: { a: "#4a1424", b: "#b8455e", c: "#f0a5a8" },
} satisfies Record<string, Palette>;

/** Each glyph draws from tones that look like the food it stands in for. */
const BY_GLYPH: Record<Glyph, (keyof typeof PALETTES)[]> = {
  burger: ["ember", "chile", "cocoa"],
  taco: ["ember", "masa", "chile"],
  fries: ["masa", "crust", "ember"],
  bread: ["crust", "masa", "cocoa"],
  pastry: ["masa", "rosa", "crust"],
  cake: ["rosa", "masa", "cocoa"],
  cup: ["cocoa", "crust", "ember"],
};

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function glyphPath(glyph: Glyph) {
  switch (glyph) {
    case "burger":
      return (
        <g>
          <path d="M22 42c0-11 8-19 28-19s28 8 28 19z" />
          <rect x="20" y="47" width="60" height="7" rx="3.5" opacity="0.75" />
          <rect x="19" y="58" width="62" height="9" rx="4.5" />
          <path d="M22 71h56c0 6-5 10-12 10H34c-7 0-12-4-12-10z" opacity="0.85" />
        </g>
      );
    case "taco":
      return (
        <g>
          <path d="M18 68a32 32 0 0 1 64 0z" />
          <path d="M28 62h44" strokeWidth="4" stroke="currentColor" fill="none" opacity="0.5" />
          <circle cx="38" cy="52" r="4" opacity="0.6" />
          <circle cx="50" cy="47" r="4" opacity="0.6" />
          <circle cx="62" cy="52" r="4" opacity="0.6" />
        </g>
      );
    case "bread":
      return (
        <g>
          <ellipse cx="50" cy="52" rx="34" ry="21" />
          <g stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.45" strokeLinecap="round">
            <path d="M36 45l7 12" />
            <path d="M48 42l7 12" />
            <path d="M60 45l7 12" />
          </g>
        </g>
      );
    case "cake":
      return (
        <g>
          <path d="M24 46h52v8H24z" opacity="0.8" />
          <path d="M22 56h56v22a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z" />
          <path d="M24 46c4-5 8-5 13 0s9 5 13 0 9-5 13 0 9 5 13 0v4H24z" opacity="0.55" />
          <circle cx="50" cy="36" r="4" opacity="0.7" />
        </g>
      );
    case "cup":
      return (
        <g>
          <path d="M32 38h36l-5 42a5 5 0 0 1-5 4H42a5 5 0 0 1-5-4z" />
          <rect x="28" y="30" width="44" height="8" rx="4" opacity="0.8" />
          <path d="M40 52h20" stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.45" strokeLinecap="round" />
        </g>
      );
    case "fries":
      return (
        <g>
          <g opacity="0.8">
            <rect x="34" y="26" width="7" height="26" rx="3" />
            <rect x="46" y="20" width="7" height="32" rx="3" />
            <rect x="58" y="28" width="7" height="24" rx="3" />
          </g>
          <path d="M30 50h40l-5 30a5 5 0 0 1-5 4H40a5 5 0 0 1-5-4z" />
        </g>
      );
    case "pastry":
    default:
      return (
        <g>
          <circle cx="50" cy="53" r="30" />
          <g stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.45" strokeLinecap="round">
            <path d="M50 25v56" />
            <path d="M27 40l46 26" />
            <path d="M27 66l46-26" />
          </g>
        </g>
      );
  }
}

export function Photo({
  src,
  seed,
  glyph,
  label,
  className = "",
  rounded = "rounded-xl",
  sizes = "(max-width: 640px) 40vw, 220px",
  priority = false,
  scrim = true,
}: {
  src?: string;
  seed: string;
  glyph: Glyph;
  label?: string;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
  scrim?: boolean;
}) {
  const h = hash(seed);
  const set = BY_GLYPH[glyph];
  const p = PALETTES[set[h % set.length]];
  const angle = 115 + (h % 5) * 12;
  const gid = `pg-${seed}`;

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        // Also acts as the loading colour behind a real photo — warm, never grey.
        background: `linear-gradient(${angle}deg, ${p.a} 0%, ${p.b} 58%, ${p.c} 100%)`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          {/* soft light source */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at ${25 + (h % 40)}% 18%, rgba(255,255,255,0.34), rgba(255,255,255,0) 62%)`,
            }}
          />
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            fill="rgba(255,255,255,0.28)"
            color="rgba(255,255,255,0.9)"
            aria-hidden="true"
          >
            <g transform="translate(50 50) scale(0.62) translate(-50 -50)">
              {glyphPath(glyph)}
            </g>
          </svg>
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-overlay"
            aria-hidden="true"
          >
            <filter id={gid}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="3"
              />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${gid})`} />
          </svg>
        </>
      )}

      {scrim ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      ) : null}
      {label ? (
        <span className="absolute bottom-2 left-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
          {label}
        </span>
      ) : null}
    </div>
  );
}
