# foundos.ai homepage redesign — "Ember" — design spec

**Date:** 2026-07-09
**Status:** Approved in brainstorm, building at `/explore/ember` (non-destructive). Live homepage swap gated on JP's review.

## What this is
A dark, warm-toned redesign of the foundos.ai homepage. The site's single job is to **book a call** for a done-for-you build. Adapts the existing "Midnight" command-center structure, recolored to a warm ember/sunset palette and re-written in JP's voice.

## Locked decisions
1. **Offer shape:** Done-for-you service (not productized SaaS). Site pre-sells, then books a call.
2. **Audience:** Homepage is **broad** (any local business owner). Outbound focus = studios + restaurants. Ad traffic → dedicated niche landing pages later (not this page).
3. **Pricing:** Good-better-best, shown on the page as a comparison chart. Build fee + monthly.
   - **Launch** — $2,000 build + $200/mo — "Solo & getting started"
   - **Complete ★** (most popular) — $3,500 build + $350/mo — "Most businesses"
   - **Growth** — $5,000+ build + $500+/mo — "Ready to scale hard"
   - Secondary line under pricing: brand-from-scratch for new founders (name, logo, colors + systems).
4. **Voice:** Outcome-forward, de-AI'd. "AI is the engine under the hood; outcomes on the billboard." Keep "AI receptionist" + the live console (demoable). Kill vague "AI" everywhere else.
5. **Headline:** money-forward — "More bookings. Fewer missed calls. Less busywork."
6. **Frame:** the noun is **brand** — strengthen & systematize your brand so it's always on and can scale. Era narrative: businesses that systematize scale; the owner is freed to think bigger.
7. **Colors:** near-black warm base → electric **coral/amber** (sunset/ember). Warm grays for text (not cool). Ties to JP's own sunset/fire aesthetic.
8. **Video:** founder-intro slot near About — **placeholder for now**.
9. **4 steps:** kept at four, de-AI'd labels: **Audit → Connect → Automate → Optimize**.

## Page structure (top → bottom)
1. Nav — logo, Why / System / Live agent / Pricing, Book-a-call button, mobile menu.
2. Hero — eyebrow, money-forward H1, brand-framed sub, CTAs, "works with your tools" strip.
3. The trap (pain) — "You didn't start your business to become its employee."
4. How it works — Audit → Connect → Automate → Optimize.
5. Live agent console ⭐ — warm terminal streaming the brand's 24/7 decisions.
6. Video slot — founder intro placeholder.
7. Pricing — good-better-best comparison chart (desktop table / mobile cards) + startup line.
8. About Josh — photo, who/what/how, the builder + the vision.
9. Why now — honest founding-client trust band (no fabricated testimonials).
10. Vision beat + final CTA.
11. Footer.

## Palette
- Base `#0e0a08` (warm near-black); deeper glows in coral `rgba(255,106,61,.38)` + amber `rgba(255,160,60,.22)`.
- Accent gradient: coral `#ff6a3d` → amber `#ffb24d`.
- Text: hi `#fbf2ea`, body warm gray `#c9bcb2`, dim `#94867c`.

## Tech
- `src/app/explore/ember/page.tsx`, `'use client'`, framer-motion + next/image, inline `<style>` (mirrors Midnight/Aurora). Self-contained copy (does not touch shared `content.ts`, so other variants are unaffected). Class prefix `emb-`.
- Next 16.2.4 / React 19 / webpack dev on :3002.

## Deploy boundary
Build + preview only. Do **not** swap `src/app/page.tsx` (live homepage, currently Aurora) until JP reviews the finished page. Swap = one-line change.

## Open items
- Video content (founder intro vs AI-receptionist demo) — placeholder until recorded.
- Real founding-client numbers (currently "5 this quarter") — confirm before live.
- Wire the CTA (Calendly) + confirm inbox before live.
