# 01 — Pricing

Numbers here must match `pricing.config.ts`. If they ever disagree, the config file wins and this doc gets updated.

## Base

**Website — $400 setup + $97/month**
Hosting, security, keeping it running, and small edits (hours, prices, menu changes). Limit: 2 small edits per month (DECIDE).

## Systems (added on top of the website)

| System | Setup | Monthly | Notes |
|---|---|---|---|
| Truck Tracker | +$400 | +$50 | |
| Online Ordering | +$500 | +$60 | Card fees (Stripe) paid by the client. Order printers billed at cost. |
| Catering Leads | +$300 | +$30 | |
| Missed Call Text-Back | +$150 | +$30 | Removed automatically if AI Receptionist is added. |
| Review Booster | +$300 | +$40 | |
| Google Boost | +$300 | +$75 | Results take a few months. Never promise #1. |
| Text Club | +$300 | +$50 | Customers must opt in. |
| AI Receptionist | +$600 | +$150 | Monthly is never discounted (per-minute costs). **300 call minutes included, 30¢/min over** (decided 2026-09-11 — Vapi costs ~7–25¢/min all-in; built as overflow + after-hours, not every call). |
| Second Location | +$200 | +$30 | Add-on. Requires Online Ordering. Not counted toward discounts, never discounted. |
| Ads | Ask | Ask | Not sold online. Management fee plus the client's ad spend. |

Printing is billed separately, per job, at cost with the invoice.

**Menu or flyer design — $400 one time**, print-ready. Not a system: no monthly, not counted toward discounts. (Added 2026-09-11.)

## Discounts

| Systems in the build | Setup | Monthly |
|---|---|---|
| 1 | full price | full price |
| 2 | 10% off | full price |
| 3–4 | 20% off | 10% off |
| 5+ | 30% off | 15% off |

- The discount applies to the website plus the systems.
- AI Receptionist's monthly and the Second Location add-on are never discounted.
- **Any discounted build requires a 6-month minimum.** Cancel early and the setup discount is owed.

**Why:** building several systems at once shares one site, one database, one texting number, and one Stripe account, so it genuinely saves build time. That justifies a big setup discount. Monthly costs grow with every system, and monthly revenue is the business, so that discount stays small.

## Rounding

Rounding keeps prices clean and makes the cart always match the package prices.

- Setup rounds **down** to the nearest $50.
- Monthly rounds to the nearest price ending in 9 ($213 → $209, $278 → $279).
- A plain website with no systems is exactly $400 + $97.

## Packages

### Food trucks

| Package | Includes | Full price | Package price |
|---|---|---|---|
| Truck Starter | Website + Truck Tracker | $800 + $147/mo | **$800 + $149/mo** |
| Truck Pro ★ | + Online Ordering + Catering Leads | $1,600 + $237/mo | **$1,250 + $209/mo** |
| Truck Full | + Review Booster + Text Club | $2,200 + $327/mo | **$1,500 + $279/mo** |

### Restaurants

| Package | Includes | Full price | Package price |
|---|---|---|---|
| Restaurant Starter | Website + Online Ordering | $900 + $157/mo | **$900 + $159/mo** |
| Restaurant Pro ★ | + Review Booster + Google Boost | $1,500 + $272/mo | **$1,200 + $249/mo** |
| Restaurant Full | + Catering Leads + Missed Call Text-Back + Text Club | $2,250 + $382/mo | **$1,550 + $329/mo** |
| Restaurant Full + AI | AI Receptionist instead of Text-Back | $2,700 + $502/mo | **$1,850 + $449/mo** |

### Restaurant + truck

| Package | Includes | Full price | Package price |
|---|---|---|---|
| Restaurant + Truck | Website + Tracker + Ordering + Catering + Reviews + Google Boost + Text Club | $2,500 + $402/mo | **$1,750 + $339/mo** |
| ...with ordering at both locations | + Second Location | $2,700 + $432/mo | **$1,950 + $369/mo** |

★ = recommended badge on the site.

**Largest possible build** (every system; Text-Back is replaced by AI Receptionist): **$2,150 + $489/mo**.

## Terms

- **Setup payment:** 50% to start, 50% at launch.
- **Minimum:** 3 months on every build (website alone included); 6 months on any discounted build. (3-month base added 2026-09-11.)
- **Rollout:** multi-system builds launch one system at a time, one every 2–4 weeks.
- **Texting systems** (Truck Tracker, Review Booster, Text Club, Text-Back) need carrier registration (A2P 10DLC), which can take days to weeks. Tell clients upfront.
- **Review Booster** asks every customer for a review. It cannot filter out unhappy customers (Google's rules).
- **Cancellation:** after the minimum, cancel any month and you keep the site.

## ~~Founding client offer~~ — RETIRED 2026-09-11

~~For the first 3 clients: half off setup.~~ Retired: the price list is already founding-level pricing (roughly half of market monthly), and half off on top of it put Restaurant Starter's setup at $450. Ask first clients for a testimonial and photos anyway — just not in exchange for a discount.
