import type { Metadata, Viewport } from "next";
import { Anton, Public_Sans } from "next/font/google";
import { BIZ, MENU, LIVE_SPOT } from "./data";
import "./istanbul.css";

/**
 * Type is scoped to this route. The root layout loads Inter, and Inter on a
 * client surface is the loudest "this was generated" signal there is.
 *
 * Anton is the Gorilla Cheese face — one blocky display doing all the shouting
 * at enormous scale. Every reference site JP picked pairs exactly one
 * high-character display with one quiet workhorse; this is that pair.
 */
const display = Anton({
  subsets: ["latin", "latin-ext"], // latin-ext covers Turkish ş ğ ı and Spanish ñ
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taste of Istanbul — Turkish & Venezuelan food truck, Marietta GA",
  description:
    "Turkish shawarma and Venezuelan tequeños from one window on Windy Hill Road in Marietta. Open 11am to midnight, every day. Order ahead for pickup.",
  // ⚠️ Never target a keyword the page can't back up. "halal food truck" was in
  // here with the word appearing nowhere on the page and nothing verifying it —
  // an invented claim about someone's real food. If they confirm they're halal,
  // say it prominently in the body first, then add the keyword.
  keywords: [
    "Taste of Istanbul Marietta",
    "Turkish food truck Marietta GA",
    "shawarma near me Marietta",
    "Venezuelan food Marietta",
    "tequeños Marietta",
    "empanadas Marietta GA",
    "food truck Windy Hill Road",
    "late night food Marietta",
  ],
  // Stays closed to search engines until money moves. The SEO underneath is
  // real and correct so it works the day this flag flips.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Taste of Istanbul — Marietta",
    description:
      "Turkish shawarma and Venezuelan tequeños. Windy Hill Road, 11am to midnight, every day.",
    type: "website",
    images: [{ url: "/demo/istanbul/optimized/truck-night.jpg", width: 1280, height: 1628,
               alt: "The Taste of Istanbul food truck at night in Marietta, Georgia" }],
  },
  // MUST be set explicitly. Without it the root foundos.ai layout's twitter
  // tags are inherited, so a client link pasted into WhatsApp previews as
  // "foundos.ai — see exactly what I'd build for your business" plus lead-gen
  // copy. Every client route needs its own twitter block for this reason.
  twitter: {
    card: "summary_large_image",
    title: "Taste of Istanbul — Marietta",
    description:
      "Turkish shawarma and Venezuelan tequeños. Windy Hill Road, 11am to midnight, every day.",
    images: ["/demo/istanbul/optimized/truck-night.jpg"],
  },
};

/**
 * themeColor lives on a `viewport` export, NOT on `metadata` — it was silently
 * ignored there (Next moved it in 13.2). Paints the mobile browser chrome in the
 * truck's red instead of leaving it default white.
 */
export const viewport: Viewport = {
  themeColor: "#c8221c",
};

/** Schema.org FoodEstablishment. Every value traces to data.ts, which traces to a source. */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: BIZ.name,
    servesCuisine: ["Turkish", "Venezuelan", "Mediterranean"],
    telephone: BIZ.phone.value,
    email: BIZ.email.value,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: LIVE_SPOT.street,
      addressLocality: "Marietta",
      addressRegion: "GA",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: BIZ.hours.value.open,
        closes: "23:59",
      },
    ],
    sameAs: [BIZ.instagramUrl],
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Menu",
        hasMenuItem: MENU.map((m) => ({
          "@type": "MenuItem",
          name: m.name,
          ...(m.blurb ? { description: m.blurb } : {}),
          // Only emit an offer when we have a verified price.
          ...(m.price
            ? {
                offers: {
                  "@type": "Offer",
                  price: (m.price.value / 100).toFixed(2),
                  priceCurrency: "USD",
                },
              }
            : {}),
        })),
      },
    },
  };
}

export default function IstanbulLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} istanbul`}>
      <script
        type="application/ld+json"
        // Values come from data.ts; no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      {children}
    </div>
  );
}
