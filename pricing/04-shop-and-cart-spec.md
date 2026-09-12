# 04 — Shop and Cart Spec

## What the cart is (and isn't)

The cart lets owners **pick systems, see the exact price live, and send that build to Josh.** It does **not** take payment yet.

**Why no instant checkout:** these are services, not boxes. Before money changes hands, Josh needs to confirm things only a conversation reveals: their POS, whether they need printers, how many locations, and texting registration timing. The client also has to agree to a 6-month minimum on discounted builds. Taking card payments before that means refunds, chargebacks, and upset first clients. The shopping experience stays exactly the same (browse, add, see the total); only the last button changes from "Pay" to "Send my build."

Stripe deposits come in Phase 5, only for `live` systems, only after a written service agreement exists.

## Ways into the cart

1. **"Add to build"** on any system card or system page.
2. **"Start with this package"** on a package card. This loads that package's systems into the cart.
3. **A shared link:** `/build?systems=truck-tracker,online-ordering`. The cart loads from the URL.

**Why the link matters:** after an in-person visit, Josh can text an owner a link with their exact recommended build and price already loaded. That's a sales tool, not just a feature.

## `/build` page layout

```
Desktop                                   Mobile
┌──────────────────────┬─────────────┐    ┌────────────────────┐
│ I run a:             │ Your build  │    │ I run a: [truck ▾] │
│ (•) Food truck       │             │    │                    │
│ ( ) Restaurant       │ Website $400│    │ ● Truck Tracker [+]│
│ ( ) Both             │ Tracker $400│    │ ○ Ordering      [+]│
│                      │ ----------- │    │ ...                │
│ Recommended for you  │ Setup $800  │    │                    │
│ ● Truck Tracker  [✓] │ Monthly $149│    ├────────────────────┤
│ ○ Ordering       [+] │             │    │ $800 + $149/mo     │
│ ○ Catering Leads [+] │ [Send my    │    │ [ See build ]      │
│                      │   build]    │    └────────────────────┘
│ Other systems        │             │     sticky bottom bar
│ ...                  │ (sticky)    │
└──────────────────────┴─────────────┘
```

- **Business type** reorders the list so `bestFor` matches appear first under "Recommended for you." It never hides anything.
- **Website is always included** and can't be removed. It's shown as the first line of the summary.
- **Desktop:** the summary is sticky on the right. **Mobile:** a sticky bottom bar shows the total; tapping it opens the full summary as a sheet.

**Design reasoning:** the price has to stay visible while people toggle systems. If the total is off-screen, every tap becomes a guess, and guessing about money makes people leave. A sticky total turns it into a live calculator, which is the "shopping" feeling you want.

## Summary panel contents

In this order:

1. Line items: Website, then each system with its full setup and monthly price.
2. **Full price** (only shown when a discount applies, crossed out).
3. **Discount line:** e.g. "3+ systems: 20% off setup, 10% off monthly."
4. **Your price:** setup and monthly, large.
5. **Orders framing:** "About X orders a month at a $15 average order" (monthly ÷ 15, rounded up).
6. **Minimum:** "6-month minimum" when a discount applies.
7. **Notes** from `normalizeCart()` (e.g. Text-Back removed because AI Receptionist was added).
8. **Next-tier nudge**, only when true: "Add 1 more system and save $X on setup." Compute it by calling `quote()` with the cheapest qualifying system added.
9. Coming-soon items get a small "Coming soon" tag and this line under the total: "Coming-soon systems are included in your request. You won't be charged for them until they're ready."
10. Button: **Send my build**.

All numbers come from `quote()` in `pricing.config.ts`. No price math inside components.

## Cart rules (already built into `pricing.config.ts`)

| Rule | Behavior | Message shown |
|---|---|---|
| Website is required | Always in the build | none |
| AI Receptionist replaces Text-Back | Adding AI removes Text-Back | "AI Receptionist already answers every call, so Missed Call Text-Back was removed." |
| Second Location needs Online Ordering | Removing Ordering removes Second Location | "Second Location needs Online Ordering, so it was removed." |
| Ads not sold online | No add button; "Ask about it" link to the request form | none |
| Duplicates | Ignored | none |

**Design reasoning:** when the cart changes something on its own, it must say what changed and why, right where it happened. Silent changes make people distrust the total.

## Cart state

- Saved in `localStorage` so the cart survives a refresh.
- The URL `?systems=` param overrides saved state when present.
- Cart icon in the nav shows the number of systems (not counting Website).

## Send my build (request form)

Opens below the summary (or as a sheet on mobile). Fields:

| Field | Required |
|---|---|
| Your name | yes |
| Business name | yes |
| Business type (truck / restaurant / both) | yes, prefilled |
| Phone | yes |
| Email | yes |
| Best time to reach you | no |
| Anything else we should know? | no |
| ☐ I agree to be contacted about my build | yes |
| ☐ Text me updates about my build | no, separate from above |

**On submit (server side):**
1. Validate fields. Add a honeypot field and basic rate limiting to block spam.
2. **Recalculate the quote on the server** with `quote()`. Never trust a price sent from the browser.
3. Insert a row into `build_requests` (below).
4. Notify Josh by email and/or text (via n8n webhook or email service).
5. Redirect to `/build/sent`.

**`/build/sent` copy:** "Build sent. Josh will reach out within 1 business day (DECIDE) to confirm the details. Nothing is charged until you approve the final plan." Include an optional "Book a call now" button if a calendar link exists.

**Button naming stays consistent:** the button says "Send my build," the confirmation says "Build sent."

**Errors say what happened and how to fix it**, e.g. "Add a phone number so Josh can reach you." Never "Something went wrong."

**Empty cart state:** "Your build is just the website so far. Add a system to see what it costs." Plus links to the three recommended packages.

## Data: `build_requests` (Supabase)

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| created_at | timestamptz | default now() |
| name | text | |
| business_name | text | |
| business_type | text | truck / restaurant / both |
| phone | text | |
| email | text | |
| best_time | text | nullable |
| notes | text | nullable |
| systems | text[] | normalized slugs, including "site" |
| setup_quoted | int | from server-side `quote()` |
| monthly_quoted | int | from server-side `quote()` |
| full_setup | int | |
| full_monthly | int | |
| minimum_months | int | nullable |
| source | text | "cart", "package:truck-pro", or "link" |
| contact_consent | boolean | |
| sms_consent | boolean | |
| status | text | new / contacted / won / lost, default "new" |

Row Level Security on. Public can insert only through the server route; only Josh can read.

**Why store the quoted price:** if prices change later, you still know exactly what each person was shown.

## Phase 5 (later): deposits

Only when all are true: the system is `live`, a service agreement exists, and the client accepts it before paying.
- Charge 50% of setup via Stripe Checkout.
- Monthly billing starts at launch as a Stripe subscription.
- Coming-soon systems are never charged.

## Acceptance tests

Run `npx tsx pricing.test.ts`. Every line must pass.

| Build | Setup | Monthly |
|---|---|---|
| Website only | $400 | $97 |
| Truck Starter | $800 | $149 |
| Truck Pro | $1,250 | $209 |
| Truck Full | $1,500 | $279 |
| Restaurant Starter | $900 | $159 |
| Restaurant Pro | $1,200 | $249 |
| Restaurant Full | $1,550 | $329 |
| Restaurant Full + AI | $1,850 | $449 |
| Restaurant + Truck | $1,750 | $339 |
| Restaurant + Truck + Second Location | $1,950 | $369 |
| Website + Text-Back | $550 | $129 |
| Website + AI Receptionist | $1,000 | $249 |
| Every system (Text-Back auto-removed) | $2,150 | $489 |
| Second Location without Ordering | removed, website only | $97 |

**Manual checks**
- Building Truck Pro one system at a time in the cart lands on the exact same price as the Truck Pro package card.
- Adding AI Receptionist with Text-Back in the cart removes Text-Back and shows the message.
- `/build?systems=truck-tracker,online-ordering,catering-leads` loads Truck Pro pricing.
- Submitting the form with a tampered price in the request still saves the server-calculated price.
