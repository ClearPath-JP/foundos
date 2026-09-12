# 03 — Site Structure

## Who the site is for

Food truck and restaurant owners in metro Atlanta, mostly looking on their phones, often between shifts. They aren't tech people. They want to know three things fast: **what does it do for me, what does it cost, and can I trust this guy.**

Every page decision below comes back to those three questions.

## Sitemap

```
/                     Home (food trucks first)
/food-trucks          Truck landing page → truck packages
/restaurants          Restaurant landing page → restaurant packages
/systems              The shop: every system as a product card
/systems/[slug]       One page per system
/pricing              Packages + side-by-side compare
/build                Build your own: cart + request form
/build/sent           Confirmation after a request
/demo                 Text the demo number, watch the site update (only once Truck Tracker is live)
/about                Josh, KSU student, local, why foundos
/faq                  Contracts, payments, cancellations, texting rules
```

**Main nav (5 items max):** Food Trucks, Restaurants, Systems, Pricing, Build, plus a cart icon with an item count.

**Why five:** every extra nav item makes each one easier to miss. Owners should land, pick "am I a truck or a restaurant," and go.

## Brand (keep existing "Mono" direction)

- **Colors:** pure black `#000000`, pure white `#FFFFFF`, one gray for secondary text and borders, and the green from the logo dot.
- **The green dot means "live."** It's the logo, and it's also the status light on every system card: green dot = live and ready, hollow gray dot = coming soon. On the Truck Tracker demo, green = truck open now.
- **Type:** keep the site's current fonts. Prices use tabular numbers so digits line up in the cart.

**Design reasoning:** the brand already has one color that means something. Using it only as a status light turns the logo into a system instead of decoration. It tells customers what's ready, and the whole site stays consistent without adding more colors. The rule: if the green isn't telling someone something is live or open, don't use it.

## Home page

```
┌────────────────────────────────────────────┐
│ ● foundos        Trucks  Restaurants  ... 🛒│
├────────────────────────────────────────────┤
│  Headline: where's your truck today?        │
│  Your customers know before they ask.       │
│                                             │
│  [ Live tracker preview: ● Open now ]       │
│  [ See truck packages ] [ I run a restaurant]│
├────────────────────────────────────────────┤
│  The problem, in their words                │
│  ("food was great, couldn't find him again")│
├────────────────────────────────────────────┤
│  3 most popular systems (cards)             │
├────────────────────────────────────────────┤
│  Truck Pro package card + "compare all"     │
├────────────────────────────────────────────┤
│  How working with me goes (4 steps)         │
├────────────────────────────────────────────┤
│  About Josh (short) + [ Build your package ]│
└────────────────────────────────────────────┘
```

**Design reasoning**
- **The hero shows the product, not a slogan.** A live-looking tracker card ("● Open now at Marietta Square, 11–3") shows a truck owner in one glance what they'd get. That beats any headline.
- **Two doors right away.** Trucks and restaurants need different pitches. Splitting early means nobody reads a pitch that isn't for them.
- **Customer words beat your words.** A real complaint pattern ("couldn't find the truck") makes an owner nod. Paraphrase real review patterns; don't quote a specific business without permission.
- **"How it goes" is numbered** because it's an actual sequence: audit → sample → build → launch.

## `/systems` — the shop

```
┌──────────────────────────────┐
│ ● Truck Tracker              │  ← status dot
│ Customers always know where  │  ← outcome, one line
│ your truck is.               │
│                              │
│ $400 setup, then $50/mo      │
│ [ Add to build ]  Details    │
└──────────────────────────────┘
```

- **Filter tabs:** All, Food trucks, Restaurants (uses `bestFor` from the config).
- **Card order:** live systems first, then coming soon.
- Coming-soon cards: hollow dot, "Coming soon" text, button reads **"Add to request"** instead of "Add to build."

**Design reasoning**
- **One outcome line per card.** People scan a grid; they don't read it. The card's only job is to earn a tap.
- **Price on the card.** Hiding prices behind "contact us" makes owners assume it's expensive and leave. Showing the price upfront also filters out people who were never going to buy, which saves your time.
- **Don't make every card identical.** Group by type (Trucks / Restaurants) with section breaks. A long wall of same-looking boxes is hard to scan and looks templated.

## `/systems/[slug]`

Order: headline → how it works (3 steps) → good fit if → what we need from you → FAQ → price box with **Add to build**.

On mobile, a sticky bottom bar shows the price and the Add button so it's always one tap away.

## `/pricing` — packages

- Tabs: **Food trucks** (default), **Restaurants**, **Restaurant + truck**.
- Three package cards per tab. The middle one (Pro) has a "Most popular" label.
- Each card shows: package price big, full price crossed out small, "You save $X on setup," and the 6-month minimum in plain text under the button.
- Below the cards: a compare table (systems as rows, packages as columns, checkmarks).
- Below that: "Want something different? **Build your own**" linking to `/build`.

**Design reasoning**
- **Three options, middle recommended.** Too many choices makes people choose nothing. With three, most pick the middle, which is priced as your best-value option.
- **Show the crossed-out full price.** It makes the discount real and visible, and it's honest because the full price is exactly what the cart would charge system by system.
- **The 6-month minimum is visible before they click.** Surprising someone with a commitment later kills trust. Stating it upfront makes you look confident, not sneaky.
- **Frame monthly in orders.** Under each monthly price: "About X orders a month at a $15 average." Owners think in orders, not software fees.

## `/build` — see `04-shop-and-cart-spec.md`

## `/about`

Short and real: Josh, Kennesaw State student, builds these systems for local food businesses around Marietta and Atlanta, works in person. Include a real photo of Josh. Owners buy from people, especially when the business is new.

## `/faq`

Cover: contract length, 50/50 setup payment, what happens if you cancel (DECIDE), card processing fees, texting registration timeline, why reviews can't be filtered, how fast Google Boost works, who owns the site.

## Quality floor

- Mobile first: design every page at phone width before desktop.
- Tap targets at least 44px tall.
- Text contrast passes WCAG AA (easy with black and white; watch the gray).
- Visible keyboard focus, and reduced motion respected.
- Only one motion moment on the site: the tracker preview's dot turning green on the home page.
