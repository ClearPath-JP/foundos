/**
 * Taste of Istanbul — verified business data.
 *
 * ── TRUTHFULNESS RULE ──────────────────────────────────────────────────────
 * Every field carries a `src` citation. Nothing renders a price, rating or
 * claim unless it came from a real source. If you can't cite it, don't ship it.
 *
 * SOURCES
 *   [menu2026]  THEIR OWN PRINTED MENU — handed to JP, photographed 2026-08-18,
 *               but JP believes the menu itself dates to 2024. ⚠️ The tag name
 *               is a lie of convenience; it is NOT a 2026 source. Trusted for
 *               dish NAMES, DESCRIPTIONS, phone and email (their wording).
 *               NOT trusted for prices — see PRICES_VERIFIED below.
 *   [doordash]  doordash.com/store/taste-of-istanbul-marietta-31716117
 *               Menu re-read 2026-08-18. Regular (pre-promo) prices used.
 *   [photo]     JP's photographs of the truck and the food, 2026-08-18
 *   [observed]  JP saw it in person — Windy Hill Rd at the Chevron
 *   [google]    Google Business Profile, checked by JP 2026-08-05
 *   [atly]      atly.com/location/TasteOfIstanbul (review text + a stale address)
 *   [yelp]      yelp.com/biz/taste-of-istanbul-marietta (a stale address)
 *   [ig]        instagram.com/tasteofistanbul034
 *
 * ⚠️⚠️ PRICES ARE RENDERING BUT ARE NOT CONFIRMED. `PRICES_VERIFIED` was turned
 *    ON 2026-08-18 at JP's direction; the numbers shown are the printed-menu set.
 *    A photograph of the board at the window either ratifies or replaces them.
 *
 *    Three price lists exist and none can be dated to today:
 *      • Instagram story menu — stamped "35w" when captured 2026-08-04, so
 *        posted ~2 Dec 2025. Its own logo reads "1230 Powers Ferry Road", the
 *        OLD address, so it predates the move to the Chevron. Stock food photos.
 *        wrap $12 · pita $14 · rice bowl $15 · shawarma burger $10 · beef burger
 *        $12 · Istanbul burger $14 · chicken tacos $11 · steak tacos $12 ·
 *        empanadas $5/$5/$7 · tequeños $9 · pastelitos $10 · malta/frescolita/
 *        ayran $4 · can soda $2 · water $2
 *      • Printed menu (f13) — JP believes 2024. Higher than the "newer" story
 *        menu, which is backwards, so at least one date is wrong. Prices kept
 *        in the MENU array below but NOT rendered.
 *      • DoorDash, read 2026-08-18 — app prices only, reduced menu, and it
 *        carries a "Grill Kofte" that appears on neither paper menu.
 *
 *    Item names and descriptions below come from the printed menu, in their own
 *    words. Names and descriptions are far more stable than prices, so they
 *    stay — but they are also unconfirmed. Ask at the window.
 *
 * ⚠️ They DO come up on Google for "taste of istanbul food truck" — 4.9 stars,
 * 170 reviews. What they don't have is a website. Do not claim they're hard to
 * find by name; the real gap is that there's nowhere for a searcher to land.
 *
 * ⚠️ The Uber Eats store URL returned 404 on 2026-08-18. Only DoorDash is
 * confirmed live. Ask her which apps she's actually still on before claiming
 * any of them on her behalf.
 */

export type Verified<T> = { value: T; src: string };
const v = <T,>(value: T, src: string): Verified<T> => ({ value, src });

/* ── identity ─────────────────────────────────────────────────────────────── */

export const BIZ = {
  name: "Taste of Istanbul",
  cuisine: v("Turkish shawarma & Venezuelan", "[menu2026][doordash]"),
  /** One complete sentence under the wordmark. Never concatenate with `cuisine`.
   *  ⚠️ Do NOT describe the vehicle by colour: JP's photos show a RED truck at
   *  the Chevron AND a separate dark-blue truck with the crew in front of it.
   *  Claiming one contradicts the other photo on this same page. */
  tagline: "Shawarma carved off the spit and Venezuelan tequeños, out of one window on Windy Hill.",
  phone: v("(954) 203-0133", "[menu2026][photo]"),
  phoneHref: "tel:+19542030133",
  email: v("tasteofistanbul034@gmail.com", "[menu2026]"),
  instagram: v("@tasteofistanbul034", "[menu2026][ig]"),
  instagramUrl: "https://instagram.com/tasteofistanbul034",
  hours: v({ open: "11:00", close: "00:00", label: "11am – midnight, every day" }, "[google][atly]"),
  // Google Business Profile, read by JP 2026-08-05. The earlier 8.8/10 from 51
  // was Atly's — a far smaller directory that understated them. Always quote
  // the Google rating: it's the one customers actually see.
  rating: v({ score: 4.9, outOf: 5, count: 170, source: "Google" }, "[google]"),
} as const;

/* ── where they actually are ──────────────────────────────────────────────── */

/** Three sources, three different addresses. Every directory sends a customer
 *  to a different parking lot. This is the owner-side pitch, not customer copy.
 *  ⚠️ JP confirmed 2026-08-18 that the truck is at the Chevron EVERY day — she
 *  does not move. So these aren't stale-because-mobile, they're just wrong. */
export const ADDRESS_CONFLICT = [
  { source: "Yelp", address: "1230 Powers Ferry Rd, Marietta, GA 30067", src: "[yelp]" },
  { source: "Atly", address: "2041 Cobb Pkwy SE, Marietta, GA 30060", src: "[atly]" },
  { source: "Actually parked at", address: "Windy Hill Rd at the Chevron, Marietta", src: "[observed][photo]" },
] as const;

export const LIVE_SPOT = {
  name: "The Chevron on Windy Hill",
  street: "Windy Hill Rd SE, Marietta",
  note: "Picnic tables out front, next to the pumps.",
  src: "[observed][photo]",
} as const;

/* ── catering — their own line, off their own menu ────────────────────────── */

/** Top-left of their printed menu, in their words: "WE SERVE COMPANIES AND
 *  FACTORIES", and at the bottom: "CALL FOR EVENT & PARTIES". This is a real
 *  revenue line they advertise and have nowhere online to explain. */
export const CATERING = {
  headline: v("We serve companies and factories", "[menu2026]"),
  sub: v("Call for events & parties", "[menu2026]"),
  src: "[menu2026]",
} as const;

/* ── menu — from their own printed menu, 18 Aug 2026 ──────────────────────── */

export type MenuItem = {
  id: string;
  name: string;
  /** Cents. Walk-up price from their printed menu. `null` = never verified. */
  price: Verified<number> | null;
  /** Their wording, off their own menu. Not ours. */
  blurb: string;
  photo: string | null;
  /** CSS object-position, so each photo crops to its own subject rather than
   *  the geometric middle. */
  focal?: string;
  section: SectionId;
  hero?: boolean;
  /** Render full-width at feature scale even without a photograph. Driven by
   *  what the truck is known for — reviews name the shawarma wraps. */
  feature?: boolean;
};

export type SectionId = "spit" | "grill" | "caracas" | "cold";

/** `band` is the class that paints the section header. Every section gets one,
 *  from the truck's own four colours — see `.sec-*` in istanbul.css. */
export const SECTIONS: {
  id: SectionId; label: string; kicker: string;
  side: "istanbul" | "caracas" | "neutral";
  band: "sec-spit" | "sec-grill" | "sec-caracas" | "sec-cold";
}[] = [
  { id: "spit", label: "Off the Spit", kicker: "Carved to order", side: "istanbul", band: "sec-spit" },
  { id: "grill", label: "Burgers & Tacos", kicker: "Turkish spice, Latin format", side: "istanbul", band: "sec-grill" },
  { id: "caracas", label: "The Caracas Side", kicker: "Fried and filled", side: "caracas", band: "sec-caracas" },
  { id: "cold", label: "Cold", kicker: "Istanbul and Caracas, side by side", side: "neutral", band: "sec-cold" },
];

export const MENU: MenuItem[] = [
  // ── Turkish: off the spit ──
  {
    // Reviews name the wraps specifically, the truck's own bodywork leads with
    // one, and it's the dish with the strongest photograph. One dish leads.
    id: "lavash-wrap", name: "Chicken Shawarma Lavash Wrap", price: v(1399, "[menu2026]"),
    blurb: "Chicken shawarma, onion, tomato, lettuce, fries inside and house special sauce. Steak available.",
    photo: "lavash-wrap", focal: "50% 46%", section: "spit", hero: true, feature: true,
  },
  {
    id: "shawarma-plate", name: "Chicken Shawarma Plate", price: v(1599, "[menu2026]"),
    blurb: "Chicken, house salad, french fries, house special sauce and lavash. Steak available.",
    photo: "shawarma-plate", focal: "50% 52%", section: "spit",
  },
  {
    id: "shawarma-pita", name: "Chicken Shawarma Pita", price: v(1399, "[menu2026]"),
    blurb: "Chicken shawarma, onion, tomato, lettuce, fries inside and house special sauce. Steak available.",
    photo: "pita-hand", focal: "50% 45%", section: "spit",
  },
  {
    id: "istanbul-special-wrap", name: "Istanbul Special Wrap", price: v(1499, "[menu2026]"),
    blurb: "Chicken shawarma, onion, tomato, lettuce, fries inside, mozzarella cheese and house special sauce. Steak available.",
    photo: "pita-plate", focal: "50% 50%", section: "spit",
  },
  {
    id: "shawarma-caesar", name: "Shawarma Caesar Salad", price: v(1299, "[menu2026]"),
    blurb: "Chicken shawarma, romaine lettuce, crouton and caesar dressing. Steak available.",
    photo: "caesar-salad", focal: "50% 50%", section: "spit",
  },

  // ── the crossover ──
  {
    id: "beef-burger", name: "Classic Beef Burger", price: v(1299, "[menu2026]"),
    blurb: "Tasty beef patty, American white cheese, lettuce, tomato, onion, house special sauce and side fries.",
    photo: "beef-burger", focal: "50% 50%", section: "grill",
  },
  {
    id: "shawarma-burger", name: "Chicken Shawarma Burger", price: v(1299, "[menu2026]"),
    blurb: "Tasty chicken shawarma, American white cheese, lettuce, tomato, onion, house spicy garlic sauce and side fries.",
    photo: "shawarma-burger", focal: "50% 50%", section: "grill",
  },
  {
    id: "tacos", name: "Tacos", price: v(1099, "[menu2026]"),
    blurb: "Three to an order. Chicken, shrimp or steak.",
    photo: "tacos", focal: "50% 50%", section: "grill",
  },
  {
    id: "side-fries", name: "Side Fries", price: v(500, "[menu2026]"),
    blurb: "", photo: null, section: "grill",
  },

  // ── Venezuelan ──
  {
    id: "chicken-empanada", name: "Chicken Empanada", price: v(899, "[menu2026]"),
    blurb: "Two to an order.", photo: "empanadas-plated", focal: "50% 50%", section: "caracas",
  },
  {
    id: "beef-empanada", name: "Shredded Beef Empanada", price: v(899, "[menu2026]"),
    blurb: "Two to an order.", photo: null, section: "caracas",
  },
  {
    id: "cheese-empanada", name: "Cheese Empanada", price: v(899, "[menu2026]"),
    blurb: "Two to an order.", photo: null, section: "caracas",
  },
  {
    id: "tequenos", name: "Tequeños", price: v(899, "[menu2026]"),
    blurb: "Venezuelan fried cheese sticks, five inches, three to an order.",
    photo: "tequenos", focal: "50% 50%", section: "caracas",
  },

  // ── drinks: the fusion is in the fridge too ──
  {
    id: "can-drink", name: "Can Drink", price: v(299, "[menu2026]"),
    blurb: "Coke, Diet Coke, Sprite, Fanta, Pepsi — or Ayran, the salted Turkish yogurt drink.",
    photo: null, section: "cold",
  },
  { id: "water", name: "Water", price: v(199, "[menu2026]"), blurb: "", photo: null, section: "cold" },
];

/* ── ⭐ THE PITCH — what the apps add on top ──────────────────────────────────
   Their printed-menu price vs the DoorDash price for the same item. Only
   unambiguous name-to-name matches are listed.

   ⚠️ REMOVED 2026-08-18: the old "Shawarma Wrap $12 vs $17.99" line. DoorDash
   lists a generic "Shawarma" at $17.99 and a "Grill Kofte" at $17.99, and
   neither can be matched to a specific board item with confidence. Do not
   resurrect that comparison without a screenshot of both sides.

   ⚠️ "Grill Kofte" is on DoorDash and NOT on their printed menu. Menu drift
   between channels — worth asking her about, not worth claiming on the page.

   ⚠️ DoorDash was running a promotion at time of check, showing prices BELOW
   the figures used here. These are the regular (strikethrough) prices.        */

/**
 * THE ONE SWITCH.
 *
 * false → every price renders "Ask at the window", and the whole markup section
 *         is removed from the page. Nothing numeric about her pricing ships.
 * true  → prices render, markup table returns.
 *
 * Flip this ONLY with a dated photograph of the board at the window. Not from a
 * flyer, not from an Instagram story, not from a delivery app. Her prices exist
 * in exactly one authoritative place and it is bolted to the truck.
 */
/**
 * Ordering is a TIER 2 feature. Off here on purpose.
 *
 * The page used to carry an "Add to order" button on every dish, a cart, and a
 * sticky bar whose button opened the phone's SMS app with the order written out.
 * It demoed well and it was the wrong thing to ship:
 *   • It gave away the $2,500 tier inside the $1,500 one — an owner looking at
 *     it can only conclude the site already takes orders.
 *   • A pre-filled text is not ordering. It doesn't confirm, doesn't queue and
 *     doesn't tell the customer when the food is ready, so it sets an
 *     expectation the truck can't meet — and a missed text becomes our problem.
 *   • Fifteen buttons and a cart bar are a lot of furniture on a page whose job
 *     is where-it-is, what's-on-it, what-it-costs.
 *
 * Tier 1's order path is the phone, and it's honest: "call ahead, we'll have it
 * ready." Flip this to true when someone has actually paid for Tier 2 — the
 * components are all still here.
 */
export const ORDERING_ENABLED = false;

export const PRICES_VERIFIED = true;
/* Turned ON 2026-08-18 at JP's direction — he wants the window prices showing.
   ⚠️ The numbers now rendering are the PRINTED-MENU set (f13): wrap/pita $13.99,
   plate $15.99, special wrap $14.99, caesar $12.99, both burgers $12.99, tacos
   $10.99, empanadas $8.99 for two, tequeños $8.99, side fries $5, cans $2.99,
   water $1.99. They are internally consistent with the DoorDash comparison in
   DELIVERY_MARKUP (also printed-menu vs DoorDash), so the page does not
   contradict itself. They are still NOT confirmed against the board at the
   window — one photograph either ratifies them or replaces them. */

/** Date the app prices were checked. This has to be on screen — it's the number
 *  the owner will challenge first, and an undated claim can't be defended. */
export const APP_PRICES_CHECKED = "18 August 2026";

export const DELIVERY_MARKUP = [
  { item: "Classic Beef Burger", window: 1299, app: 1599, src: "[menu2026] vs [doordash]" },
  { item: "Tequeños (3)",        window: 899,  app: 1099, src: "[menu2026] vs [doordash]" },
  { item: "Side Fries",          window: 500,  app: 600,  src: "[menu2026] vs [doordash]" },
  { item: "Ayran",               window: 299,  app: 399,  src: "[menu2026] vs [doordash]" },
  { item: "Tacos (3)",           window: 1099, app: 1199, src: "[menu2026] vs [doordash]" },
] as const;

export const markupPct = (window: number, app: number) =>
  Math.round(((app - window) / window) * 100);

export const markupDelta = (window: number, app: number) => app - window;

/** Only DoorDash was confirmed live on 2026-08-18 — the Uber Eats store URL
 *  404'd. Never list a platform on her behalf that we couldn't load. */
export const DELIVERY_PLATFORMS = v(["DoorDash"], "[doordash]");

/* ── real words from real customers ───────────────────────────────────────── */

export const REVIEWS = [
  { text: "The Mediterranean food here, especially the shawarma wraps, is so flavorful and homemade.", src: "[atly]" },
  { text: "I thought the empanadas were a great 10 out of 10.", src: "[atly]" },
  { text: "The shawarma takeout is moist, flavorful chicken with fantastic garlic sauce.", src: "[atly]" },
] as const;

/* ── photography ──────────────────────────────────────────────────────────── */

/** Real files in /public/demo/istanbul/optimized/. Slug → filename, so the two
 *  generations of photography (JP's Aug-18 shoot as .jpg, the earlier Instagram
 *  pulls as .png) can coexist without renaming anything.
 *  Add a slug ONLY when the file exists — anything else falls back to a board
 *  line, never to a hole in the layout. */
export const PHOTO_FILES: Record<string, string> = {
  // JP's shoot, 2026-08-18
  "lavash-wrap": "lavash-wrap.jpg",
  "shawarma-plate": "shawarma-plate.jpg",
  "pita-hand": "pita-hand.jpg",
  "pita-plate": "pita-plate.jpg",
  "caesar-salad": "caesar-salad.jpg",
  "beef-burger": "beef-burger.jpg",
  "shawarma-burger": "shawarma-burger.jpg",
  "tacos": "tacos.jpg",
  "empanadas-plated": "empanadas-plated.jpg",
  "tequenos": "tequenos.jpg",
  "truck-chevron-day": "truck-chevron-day.jpg",
  "truck-team": "truck-team.jpg",
  // earlier Instagram pulls
  "truck-night": "truck-night.jpg",
  "truck-chevron": "truck-chevron.png",
  "spits": "spits.png",
};

export const hasPhoto = (slug: string | null): slug is string =>
  !!slug && slug in PHOTO_FILES;

export const photoSrc = (slug: string) =>
  `/demo/istanbul/optimized/${PHOTO_FILES[slug] ?? `${slug}.png`}`;

/* ── helpers ──────────────────────────────────────────────────────────────── */

export const money = (cents: number) =>
  cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;

/** The only way to read a price. Unverified items can't render a fake one — and
 *  while PRICES_VERIFIED is false, NO item is considered verified. */
export const priceLabel = (item: MenuItem) =>
  PRICES_VERIFIED && item.price ? money(item.price.value) : "Ask at the window";

/** Whether a price should count toward a running total. Same gate. */
export const isPriced = (item: MenuItem) => PRICES_VERIFIED && !!item.price;

export const itemsIn = (section: SectionId) => MENU.filter((m) => m.section === section);
