# foundos.ai — Systems Shop Spec

This folder describes how foundos.ai sells its systems online. Visitors browse systems like products, see real prices, add them to a cart, and send the build to Josh.

## Files

| File | What it is |
|---|---|
| `01-pricing.md` | Every price, discount, package, and term, in plain language. |
| `02-systems-catalog.md` | The product copy for every system. This is what customers read. |
| `03-site-structure.md` | Pages, sections, navigation, and the design reasoning behind them. |
| `04-shop-and-cart-spec.md` | How the cart works: rules, math, request flow, data, and tests. |
| `pricing.config.ts` | The pricing source of truth in code. All prices on the site come from here. |
| `pricing.test.ts` | Tests proving the cart math matches the package prices. Run with `npx tsx pricing.test.ts`. |

## Rules for whoever builds this (Claude Code included)

1. **Never hardcode a price in a component.** Import from `pricing.config.ts`. When a price changes, it changes in one place.
2. **Only systems with `status: "live"` can be checked out.** `coming_soon` systems show on the site with a badge and can be added to a build request, but never paid for.
3. **Keep the existing brand**: "Mono" direction. Black and white, lowercase `foundos` wordmark, one green dot as the logo. Keep the current site's copy voice.
4. **Food trucks come first** on the site. Restaurants are the second path.

## Build order (stop at each gate for Josh's approval)

**Phase 1 — Pricing data.** Add `pricing.config.ts` and `pricing.test.ts` to the repo. Tests pass.
→ Gate: Josh confirms the numbers.

**Phase 2 — Catalog pages.** `/systems` grid and `/systems/[slug]` pages using copy from `02-systems-catalog.md`.
→ Gate: Josh reviews on desktop and phone.

**Phase 3 — Packages.** `/pricing` page with truck and restaurant packages, plus the side-by-side compare.
→ Gate: Josh reviews.

**Phase 4 — Cart and build request.** `/build` page, cart drawer, request form, Supabase table, notification to Josh.
→ Gate: Josh submits a test request end to end and receives it.

**Phase 5 — Later, not now.** Stripe deposit checkout, only for `live` systems, only after the service agreement exists.

## Open decisions (marked DECIDE in the docs)

- What happens to the site if a client cancels (do they keep it or does it go down)?
- AI Receptionist: how many call minutes per month are included?
- Small edits limit for the monthly plan (recommended default: 2 per month).
- Whether to show the founding client offer publicly (default: in person only).
