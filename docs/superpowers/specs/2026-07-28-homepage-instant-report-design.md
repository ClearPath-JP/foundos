# foundos.ai homepage — instant business report (card-scan landing)

**Date:** 2026-07-28
**Branch:** `feat/homepage-ember`
**Status:** approved design, ready to plan

---

## 1. Why

JP's v2 business cards are printed and in hand. The back of the card reads:

> **Your business should work for you — not the other way around.**
> Scan to see exactly what I'd build for your business →

The QR encodes `https://foundos.ai` exactly — the bare root. There is no way to route
card traffic to a dedicated landing page without reprinting, so **the homepage itself must
serve the after-handshake moment.**

Today the homepage renders the Aurora design: eight sections written for a cold stranger,
including a numbered "Audit → Integrate → Deploy the agent → Optimize" process section.
Two problems:

1. **The card promises something personal; the site delivers a generic brochure.** The
   card's own words are "see exactly what I'd build for *your* business." The page shows
   the same text to everyone.
2. **The process section is the "written by AI" tell.** Those four words describe JP's
   workflow, not the reader's business. Every AI-automation agency on the internet has
   one. Owner.com — the closest funded analog to foundos — has no process section anywhere
   on its homepage. Owners buy outcomes and proof, not methodology.

### Research that drove this design

- **Owner.com's primary CTA is not "book a call" — it's "Get my AI report."** You enter
  your restaurant and it shows you *your* problems before asking for anything. Value
  first, meeting second.
- Owner.com page order: outcome headline → proof → four benefits in owner language →
  product shots → owner testimonials → founder beliefs. No process section.
- Agency pages that convert non-technical owners avoid "integrate / optimize / deploy the
  agent" and say "answers every call 24/7, books the appointment, texts you the lead."
- Business-card QR codes are scanned ~34% of the time — roughly 3× any other QR type. It
  is the highest-intent scan there is, it is always mobile, and it is always someone who
  just met you.
- Local-business sites live or die on mobile: ~80% of traffic, and sub-2s load is the
  difference between converting and not.

---

## 2. Goal

**One job: turn a card scan into a booked 20-minute call.**

The page earns that booking by first giving away something true and specific about the
scanner's own business, generated live, for free, with no email required.

Secondary (acceptable) outcomes, in order: a text message to JP, a tapped call to the AI
demo line, a remembered name.

---

## 3. Positioning

**Broad page, industry-specific report.**

The headline stays broad — "local business" — matching the printed card, because JP hands
cards to restaurants, studios, salons and shops alike. Specificity is delivered by the
*report*, which detects the business category and runs the matching check set.

Proof examples lead with restaurants, because that is JP's live pipeline and where every
deployed asset is.

The positioning sentence, in plain language, is the bridge JP asked for:

> **I build it, I run it, and I keep it growing — you don't have to learn any of it.**

---

## 4. Page structure

Mobile-first. Six sections; three of them are small. Roughly four phone-screens of scroll,
down from eight sections today.

### 4.1 Hero (above the fold on a phone)

```
See exactly what I'd build for your business.

Type your business name. I'll show you what's costing you
customers right now — and what I'd do about it.

[ your business name              ]  [ Show me → ]
Free · 10 seconds · no email

(photo)  I'm Josh. I build and run the online side of local
         businesses here in Atlanta.
```

The H1 is verbatim the instruction on the card back. They read it in their hand, scan, and
the page says it back — continuity is the trust device. JP's photo appears in the hero at
small size so the scanner confirms it is the person they just met.

### 4.2 Report (replaces the viewport when generated)

See §5. For anyone who uses the input, this *is* the page.

### 4.3 What I build

The six items from the card back, written as outcomes rather than features. Reuses
`services` in `src/app/explore/content.ts`, re-copied into owner language.

### 4.4 Proof

Substitutes for the testimonials JP does not yet have. Demonstration over claims:

- **"Call the AI receptionist right now — (276) 295-1209"**, as a `tel:` link. They are
  holding a phone; hearing it beats reading about it.
- Live builds, tappable: [Williamson Bros BBQ](https://williamson-bros-bbq.vercel.app),
  [Caribbean Spice](https://caribbean-spice.vercel.app), and the in-repo demos at
  `/studios` and `/clahvay`.

### 4.5 Who I am

Three sentences plus photo. Local, real, reachable. Keeps the KSU AI Automation
Certificate line from the card.

### 4.6 Book

Primary: Calendly (`https://calendly.com/josh-potesta`).
Secondary: `sms:` link to (404) 436-3393.

Adjacent to the button, replacing the deleted process section — framed as the reader's
timeline, not JP's workflow:

> **We talk for 20 minutes.** I tell you what I'd build and what it costs. No pitch.
> **I build it.** You keep running your business.
> **You're live in about two weeks.** Then I run it and it keeps growing.

### 4.7 Deleted

The numbered four-step system section is **removed**, not rewritten. The `steps` export in
`content.ts` becomes unused by the homepage; leave the export in place for the `/explore/*`
directions that still reference it.

---

## 5. The report

### 5.1 Flow

1. Visitor types a business name (optionally with city).
2. Google Places Text Search resolves it. If Text Search returns exactly one result, it
   auto-proceeds. If it returns more than one, show up to three candidates with their
   addresses and let the visitor pick — never guess between them.
3. Place Details fetches the listing facts.
4. If the listing has a website, fetch it server-side and run deterministic checks on the
   HTML.
5. Assemble a **facts object**. Every value in it is measured or returned by an API —
   nothing inferred.
6. One model call turns facts into ranked, owner-language findings. Findings stream in as
   they are produced so the wait feels alive.
7. Render report → CTA.

### 5.2 Output shape

- **Header** — business name, address, category, ★ rating and review count. Proves the
  right business was found.
- **What's costing you right now** — three to five findings, most expensive first. Each is
  one fact, one plain-English consequence, and a rough dollar or volume impact where it is
  honestly derivable.
- **What I'd build for you** — three items mapped from the findings onto JP's actual
  service menu.
- **Proof** — the AI demo line plus one relevant live build.
- **CTA** — Book 20 min / Text me.

### 5.3 Checks

**Universal**

| Check | Source | Why it matters to an owner |
|---|---|---|
| No website on the Google listing | Places | Biggest single finding; also JP's best-fit lead |
| Site unreachable or not HTTPS | fetch | Browsers warn visitors away |
| No mobile viewport meta | fetch | Site is unusable on the device most customers use |
| Slow load (TTFB + total bytes) | fetch | Every second of delay costs conversions |
| No `tel:` click-to-call | fetch | Mobile visitor can't call in one tap |
| Hours not set on the listing | Places | Google deprioritises incomplete profiles |
| Rating < 4.3 or low review count for category | Places | Directly suppresses walk-ins |
| No `LocalBusiness` schema markup | fetch | Google can't read the business properly |
| Stale site (copyright year, last-modified) | fetch | Signals abandonment to customers |

**Restaurants** — menu is a PDF or an image (Google cannot read it); outbound links to
DoorDash / UberEats / Grubhub (fee leak); no direct online ordering; takeout / delivery /
reservable flags missing on the listing.

**Studios, salons, services** — no online booking, or booking is "call us"; no schedule or
class list on the site; no intro offer or lead capture.

**Shops** — no online store; no product pages.

Category comes from the Places `primaryType` / `types` fields, mapped to one of
`restaurant | studio | shop | service | other`. `other` runs universal checks only.

### 5.4 Truthfulness rule

**The model never produces a number.** All figures are passed in as structured input and
the model is instructed to use only what it is given. Its job is ranking, phrasing, and
mapping findings to services. Low temperature, structured output.

This is not a stylistic preference. The person reading the report is the one human alive
who knows their own review count. A single invented fact makes JP "the guy whose AI makes
things up" — the exact objection his positioning exists to defeat.

Corollary already applied to this design: owner replies to reviews are **not** exposed by
the Places API, so "N reviews unanswered" cannot appear as a finding.

---

## 6. Architecture

`POST /api/report`, Node runtime (default Fluid Compute), `maxDuration = 60`.

- **Places API (New)** — `POST /v1/places:searchText`, then `GET /v1/places/{id}`.
  Auth via `X-Goog-Api-Key`; fields requested via `X-Goog-FieldMask`. Cost is driven by
  which fields the mask requests, so the mask stays minimal and fixed.
  New env var: `GOOGLE_PLACES_API_KEY` (server-only, never `NEXT_PUBLIC_`).
- **Website fetch** — plain `fetch` with an 8s timeout and a size cap. HTML parsing only;
  no headless browser.
- **Model** — AI SDK v6 structured output through the existing Vercel AI Gateway
  (`AI_GATEWAY_API_KEY` is already configured and `/api/chat` already uses plain
  `"provider/model"` strings). No new provider package. Default model
  `anthropic/claude-sonnet-5` at temperature 0 — the task is ranking and phrasing, not
  reasoning, and determinism matters more than flair here.
- **Cache** — keyed by Places `id`, 30 days. Repeat scans are instant and free.
- **Rate limit** — per IP, 5 reports/hour.

**Cost** ≈ 3¢ per report, inside Google's $200/month Maps Platform credit — effectively
free at JP's volume.

### 6.1 Failure modes — the page never shows an error

| Failure | Behaviour |
|---|---|
| Business not found in Places | Fall back to the 3-tap version: business type, website status, who answers the phone → still renders a real report |
| Ambiguous match | Show up to 3 candidates and let them pick |
| Website fetch fails or times out | That *is* a finding ("your site didn't load for me in 8 seconds") |
| Model call fails | Render the deterministic findings without generated prose |
| Places API down or over quota | Fall back to the 3-tap version |

There is always a report.

---

## 7. Scope

**v1 — ships now**

- Homepage rewritten to the six sections in §4
- Report engine per §5 and §6, including the 3-tap fallback
- Process section deleted
- One browser task for JP: create a Google Cloud project, enable Places API (New), create
  a key, restrict it, add `GOOGLE_PLACES_API_KEY` to Vercel and `.env.local` (~10 min)

**v2 — deliberately excluded**

- "Email me this report" capture. Requires an email provider that is not wired on this
  project, and JP met these people in person. Book and Text need zero infrastructure.
- PDF version of the report
- Wiring to the existing `competitor-recon` skill for a deep, hand-run 24-hour audit

---

## 8. Success criteria

1. Scanning the QR on a real phone shows the hero above the fold, no horizontal scroll.
2. Typing a real Atlanta business name returns a report in under 15 seconds.
3. Every fact in a generated report is verifiable against Google or the business's own
   site — spot-checked against Williamson Bros, Caribbean Spice, and one business with no
   website at all.
4. Killing the Places key still produces a usable report via the 3-tap fallback.
5. The homepage contains no numbered process section.
