// Seed data for the Truck OS / Counter OS sales demo.
// Two businesses, one engine — that's the whole pitch. Names are generic on
// purpose so the same demo can be shown to any truck or panadería.

export type BusinessKey = "truck" | "bakery";

export type Glyph = "burger" | "taco" | "fries" | "cup" | "bread" | "cake" | "pastry";

export type Item = {
  id: string;
  name: string;
  desc: string;
  price: number;
  section: string;
  glyph: Glyph;
  /** Real photo. Falls back to the generated art when absent. */
  src?: string;
  /** Drives the fallback art when there's no photo yet. */
  seed: string;
  soldOut: boolean;
  /** Bakery: flagged in the "fresh this week" rail. */
  fresh?: boolean;
  /** Null = not counted. A number = today's tray count. */
  countLeft: number | null;
  /** Cakes etc. — ordered ahead, not grabbed off the shelf. */
  preOrder?: boolean;
};

export type Business = {
  key: BusinessKey;
  name: string;
  tagline: string;
  kind: string;
  /** Staff screen title — what the owner sees after they log in. */
  staffTitle: string;
  sections: string[];
  accent: string;
  accentSoft: string;
  ink: string;
  /** Hero photo. Falls back to generated art when absent. */
  heroSrc?: string;
  /** Truck moves, bakery doesn't. Drives the location block. */
  mobile: boolean;
  pickupLabel: string;
  subscribers: number;
  listKeyword: string;
};

export const BUSINESSES: Record<BusinessKey, Business> = {
  truck: {
    key: "truck",
    name: "El Fuego Smash",
    tagline: "Mexican smash burgers · Metro Atlanta",
    kind: "Food truck",
    staffTitle: "Truck OS",
    sections: ["Smash Burgers", "Sides", "Drinks"],
    accent: "#d9412a",
    accentSoft: "rgba(217, 65, 42, 0.12)",
    ink: "#1a1210",
    heroSrc: "/demo/truckos/hero.jpg",
    mobile: true,
    pickupLabel: "Order ahead — skip the line",
    subscribers: 412,
    listKeyword: "FUEGO",
  },
  bakery: {
    key: "bakery",
    name: "Panadería La Rosa",
    tagline: "Pan dulce hecho fresco · Marietta, GA",
    kind: "Bakery",
    staffTitle: "Counter OS",
    sections: ["Fresh This Week", "Pan Dulce", "Pan Salado", "Pasteles", "Cafetería"],
    accent: "#b8323f",
    accentSoft: "rgba(184, 50, 63, 0.1)",
    ink: "#1c1315",
    mobile: false,
    pickupLabel: "Order ahead — we'll box it up",
    subscribers: 968,
    listKeyword: "ROSA",
  },
};

const P = "/demo/truckos";

export const TRUCK_ITEMS: Item[] = [
  {
    id: "t-birria",
    name: "Smash Birria Burger",
    desc: "Double patty, birria consomé dip, oaxaca cheese, onion, cilantro.",
    price: 13,
    section: "Smash Burgers",
    glyph: "burger",
    src: `${P}/birria.jpg`,
    seed: "birria",
    soldOut: false,
    countLeft: 18,
  },
  {
    id: "t-chorizo",
    name: "Chorizo Smash",
    desc: "Beef + chorizo blend, chipotle crema, pickled red onion.",
    price: 12,
    section: "Smash Burgers",
    glyph: "burger",
    src: `${P}/chorizo.jpg`,
    seed: "chorizo",
    soldOut: false,
    countLeft: 24,
  },
  {
    id: "t-doble",
    name: "Clásica Doble",
    desc: "Two smashed patties, american, lettuce, tomato, fuego sauce.",
    price: 11,
    section: "Smash Burgers",
    glyph: "burger",
    src: `${P}/doble.jpg`,
    seed: "doble",
    soldOut: false,
    countLeft: null,
  },
  {
    id: "t-taco",
    name: "Quesabirria Tacos",
    desc: "Three, griddled crispy, with consomé for dipping.",
    price: 12,
    section: "Smash Burgers",
    glyph: "taco",
    src: `${P}/smashtaco.jpg`,
    seed: "smashtaco",
    soldOut: false,
    countLeft: 12,
  },
  {
    id: "t-papas",
    name: "Papas Locas",
    desc: "Fries, queso, chorizo, crema, jalapeño.",
    price: 8,
    section: "Sides",
    glyph: "fries",
    src: `${P}/papas.jpg`,
    seed: "papas",
    soldOut: false,
    countLeft: null,
  },
  {
    id: "t-elote",
    name: "Elote en Vaso",
    desc: "Street corn in a cup. Cotija, chile, lime.",
    price: 6,
    section: "Sides",
    glyph: "cup",
    src: `${P}/elote.jpg`,
    seed: "elote",
    soldOut: true,
    countLeft: 0,
  },
  {
    id: "t-horchata",
    name: "Horchata",
    desc: "House-made, cinnamon-heavy, served over ice.",
    price: 4,
    section: "Drinks",
    glyph: "cup",
    src: `${P}/horchata.jpg`,
    seed: "horchata",
    soldOut: false,
    countLeft: null,
  },
  {
    id: "t-jarritos",
    name: "Jarritos",
    desc: "Mandarin, tamarind, or lime.",
    price: 3,
    section: "Drinks",
    glyph: "cup",
    src: `${P}/jarritos.jpg`,
    seed: "jarritos",
    soldOut: false,
    countLeft: null,
  },
];

export const BAKERY_ITEMS: Item[] = [
  {
    id: "b-elote-bread",
    name: "Pan de Elote",
    desc: "This week only. Sweet corn bread, still warm at 7am.",
    price: 3.5,
    section: "Fresh This Week",
    glyph: "bread",
    seed: "pandeelote",
    soldOut: false,
    fresh: true,
    countLeft: 22,
  },
  {
    id: "b-concha",
    name: "Concha (Vainilla)",
    desc: "The classic. Sugar shell, soft crumb.",
    price: 1.75,
    section: "Pan Dulce",
    glyph: "pastry",
    seed: "concha",
    soldOut: false,
    countLeft: 40,
  },
  {
    id: "b-concha-fresa",
    name: "Concha de Fresa",
    desc: "Strawberry shell, same soft crumb.",
    price: 1.75,
    section: "Pan Dulce",
    glyph: "pastry",
    seed: "conchafresa",
    soldOut: false,
    countLeft: 16,
  },
  {
    id: "b-oreja",
    name: "Oreja",
    desc: "Palmier. Flaky, caramelized, gone by 10am.",
    price: 2.25,
    section: "Pan Dulce",
    glyph: "pastry",
    seed: "oreja",
    soldOut: false,
    countLeft: 9,
  },
  {
    id: "b-cuernito",
    name: "Cuernito",
    desc: "Mexican croissant, lightly sweet.",
    price: 2.5,
    section: "Pan Dulce",
    glyph: "pastry",
    seed: "cuernito",
    soldOut: true,
    countLeft: 0,
  },
  {
    id: "b-bolillo",
    name: "Bolillo",
    desc: "Crusty roll. Baked three times a day.",
    price: 1.0,
    section: "Pan Salado",
    glyph: "bread",
    seed: "bolillo",
    soldOut: false,
    countLeft: 55,
  },
  {
    id: "b-telera",
    name: "Telera",
    desc: "For tortas. Soft, wide, three grooves.",
    price: 1.25,
    section: "Pan Salado",
    glyph: "bread",
    seed: "telera",
    soldOut: false,
    countLeft: 31,
  },
  {
    id: "b-tresleches-slice",
    name: "Tres Leches (slice)",
    desc: "Soaked overnight. Cut fresh each morning.",
    price: 5.5,
    section: "Pasteles",
    glyph: "cake",
    seed: "tresleches",
    soldOut: false,
    countLeft: 14,
  },
  {
    id: "b-tresleches-whole",
    name: 'Tres Leches — whole 8"',
    desc: "48 hours notice. Message on the box included.",
    price: 38,
    section: "Pasteles",
    glyph: "cake",
    seed: "tresleeswhole",
    soldOut: false,
    countLeft: null,
    preOrder: true,
  },
  {
    id: "b-mango",
    name: "Mango Mousse Cake",
    desc: "48 hours notice. Fresh mango, light mousse.",
    price: 42,
    section: "Pasteles",
    glyph: "cake",
    seed: "mango",
    soldOut: false,
    countLeft: null,
    preOrder: true,
  },
  {
    id: "b-cafe",
    name: "Café de Olla",
    desc: "Piloncillo and canela, brewed in the pot.",
    price: 3.5,
    section: "Cafetería",
    glyph: "cup",
    seed: "cafeolla",
    soldOut: false,
    countLeft: null,
  },
  {
    id: "b-champurrado",
    name: "Champurrado",
    desc: "Thick, chocolate, masa-based. Weekends only.",
    price: 4.0,
    section: "Cafetería",
    glyph: "cup",
    seed: "champurrado",
    soldOut: false,
    countLeft: null,
  },
];

/** Bread the owner can add from the staff screen to prove "one entry, three places". */
export const WEEKLY_CANDIDATES: Omit<Item, "soldOut" | "countLeft">[] = [
  {
    id: "b-conchanutella",
    name: "Concha Rellena de Nutella",
    desc: "Filled to order. Limited trays.",
    price: 3.25,
    section: "Fresh This Week",
    glyph: "pastry",
    seed: "conchanutella",
    fresh: true,
  },
  {
    id: "b-rosca",
    name: "Rosca de Canela",
    desc: "Cinnamon ring, glazed while warm.",
    price: 4.0,
    section: "Fresh This Week",
    glyph: "bread",
    seed: "rosca",
    fresh: true,
  },
  {
    id: "b-empanada",
    name: "Empanada de Calabaza",
    desc: "Pumpkin, seasonal. Back for one week.",
    price: 2.75,
    section: "Fresh This Week",
    glyph: "pastry",
    seed: "empanada",
    fresh: true,
  },
];

export type Spot = {
  id: string;
  name: string;
  address: string;
  window: string;
};

/** The owner taps one of these instead of typing. Two seconds, done. */
export const SPOTS: Spot[] = [
  {
    id: "s-x3",
    name: "X3 Sports — Windy Hill",
    address: "1775 Windy Hill Rd SE, Smyrna",
    window: "11:00am – 2:30pm",
  },
  {
    id: "s-brewery",
    name: "Glover Park Brewery",
    address: "65 Powder Springs St, Marietta",
    window: "5:00pm – 9:00pm",
  },
  {
    id: "s-office",
    name: "Cumberland Office Park",
    address: "2500 Cumberland Pkwy SE, Atlanta",
    window: "11:30am – 2:00pm",
  },
  {
    id: "s-market",
    name: "Marietta Square Market",
    address: "68 Powder Springs St, Marietta",
    window: "12:00pm – 8:00pm",
  },
];

/* ── Hours & weekly schedule ───────────────────────── */

export type DayHours = {
  day: string;
  short: string;
  open: string;
  close: string;
  closed?: boolean;
};

/** Storefront hours. Modelled on a real panadería: open every day, 8–9. */
export const BAKERY_HOURS: DayHours[] = [
  { day: "Monday", short: "Mon", open: "8:00am", close: "9:00pm" },
  { day: "Tuesday", short: "Tue", open: "8:00am", close: "9:00pm" },
  { day: "Wednesday", short: "Wed", open: "8:00am", close: "9:00pm" },
  { day: "Thursday", short: "Thu", open: "8:00am", close: "9:00pm" },
  { day: "Friday", short: "Fri", open: "8:00am", close: "9:00pm" },
  { day: "Saturday", short: "Sat", open: "8:00am", close: "9:00pm" },
  { day: "Sunday", short: "Sun", open: "8:00am", close: "9:00pm" },
];

export type WeekStop = { day: string; short: string; spotId: string | null };

/**
 * A truck's week. `null` = not out that day.
 * Index 0 is Monday — convert from Date.getDay() with `(d + 6) % 7`.
 */
export const TRUCK_WEEK: WeekStop[] = [
  { day: "Monday", short: "Mon", spotId: null },
  { day: "Tuesday", short: "Tue", spotId: "s-office" },
  { day: "Wednesday", short: "Wed", spotId: "s-x3" },
  { day: "Thursday", short: "Thu", spotId: "s-office" },
  { day: "Friday", short: "Fri", spotId: "s-brewery" },
  { day: "Saturday", short: "Sat", spotId: "s-market" },
  { day: "Sunday", short: "Sun", spotId: null },
];

export type OrderStatus = "new" | "making" | "ready" | "picked-up";

export type OrderLine = { id: string; name: string; qty: number; price: number };

export type Order = {
  id: string;
  ref: string;
  name: string;
  phone: string;
  lines: OrderLine[];
  total: number;
  status: OrderStatus;
  /** Minutes since placed — ticked client-side so there's no hydration mismatch. */
  age: number;
  /** True for the order the prospect places during the demo. */
  isDemo?: boolean;
};

export const SEED_ORDERS: Record<BusinessKey, Order[]> = {
  truck: [
    {
      id: "o-t1",
      ref: "A-104",
      name: "Marcus D.",
      phone: "(770) 555-0148",
      lines: [
        { id: "t-birria", name: "Smash Birria Burger", qty: 2, price: 13 },
        { id: "t-papas", name: "Papas Locas", qty: 1, price: 8 },
      ],
      total: 34,
      status: "making",
      age: 4,
    },
    {
      id: "o-t2",
      ref: "A-105",
      name: "Yesenia R.",
      phone: "(678) 555-0192",
      lines: [{ id: "t-taco", name: "Quesabirria Tacos", qty: 1, price: 12 }],
      total: 12,
      status: "new",
      age: 1,
    },
  ],
  bakery: [
    {
      id: "o-b1",
      ref: "R-232",
      name: "Doña Carmen",
      phone: "(770) 555-0117",
      lines: [
        { id: "b-concha", name: "Concha (Vainilla)", qty: 6, price: 1.75 },
        { id: "b-bolillo", name: "Bolillo", qty: 10, price: 1.0 },
      ],
      total: 20.5,
      status: "making",
      age: 6,
    },
    {
      id: "o-b2",
      ref: "R-233",
      name: "Luis M.",
      phone: "(404) 555-0163",
      lines: [{ id: "b-tresleches-whole", name: 'Tres Leches — whole 8"', qty: 1, price: 38 }],
      total: 38,
      status: "new",
      age: 2,
    },
  ],
};

/** "8:00am" / "12:30pm" → minutes since midnight. */
export function toMinutes(t: string): number {
  const m = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(t.trim());
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (m[3].toLowerCase() === "pm") h += 12;
  return h * 60 + Number(m[2]);
}

/** Handles windows that run past midnight (a truck open till 12am). */
export function isOpenAt(open: string, close: string, nowMin: number): boolean {
  const o = toMinutes(open);
  const c = toMinutes(close);
  return c <= o ? nowMin >= o || nowMin < c : nowMin >= o && nowMin < c;
}

export const money = (n: number) =>
  n % 1 === 0 ? `$${n.toFixed(0)}` : `$${n.toFixed(2)}`;
