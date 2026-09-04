# foundos — build order

Drop this file and the two specs into the root of the foundos repo. Then run Claude Code and say: "Read CLAUDE-BUILD-ORDER.md and start at phase 1."

Files:
- `foundos-brand-and-site-spec.md` — design system, homepage, concept sites
- `foundos-system-rulebook.md` — the agent-run sales and fulfillment system

Do the phases in order. Do not start a phase until the previous one's definition of done is met. Ask Josh only for the items listed under "needs Josh."

## Phase 1 — Brand and homepage
Source: brand-and-site-spec, sections 1, 2, 4.
1. Create `config/brand.ts` with palette, type scale, prices ($500 site, $150/month), phone numbers, email.
2. Strip all purple, emoji, the bar graphic, `.ai` from the header mark, and "local businesses" copy.
3. Rebuild the homepage sections 2.1–2.11 in order.
4. Audit box: add phone capture after results, Supabase `leads` insert with source `audit_box`, webhook to n8n.
Needs Josh: a photo for 2.9, and his rewrite of the bio paragraph. Use a gray placeholder square and the draft copy until then; do not block on it.
Done: spec section 4 "definition of done," items 1–3 and 5.

## Phase 2 — Concept sites
Source: brand-and-site-spec, section 3.
1. Run the rebrand procedure (3.5) on each existing build: Istanbul → restaurant, Fish Fillet → truck, bakery → bakery. Cafe (Station 11) last.
2. Pick names from the suggestions or invent better ones. Verify none match a real Atlanta-area business on Google Maps.
3. Deploy each, generate 1200×800 screenshots at build time, link the cards on the homepage.
Done: spec section 4 item 4, plus a final grep on each repo returning zero hits for the old names.

## Phase 3 — Database and digest
Source: rulebook, sections 1, 8, 11.
1. Create `leads`, `touches`, `clients`, `runs` tables with the exact columns and status values.
2. Build the daily digest workflow first — it's how Josh knows the rest is working.
Done: a digest arrives at 8am with real counts, even if they're zero.

## Phase 4 — Prospect and sample agents
Source: rulebook, sections 2, 3.
1. Prospect workflow, Monday cron, scoring exactly as written.
2. Sample-site agent using the concept templates from phase 2. Deploy under `samples.foundos.ai/<slug>`.
3. Run one full Monday cycle manually and have Josh look at the 5 samples before enabling the cron.
Done: 5 sample sites built unattended in under 20 minutes each, Lighthouse mobile ≥ 90.

## Phase 5 — Outreach and gates
Source: rulebook, sections 4, 5.
1. Outreach sequence with the exact copy and timing rules. SMS first, email, then DM.
2. Inbound webhook → status `replied` → notify Josh within 60 seconds, re-ping at 2h and 4h.
3. Josh runs Gate 1 by hand for the first 30 replies. Log every outcome.
Done: a full sequence has run on 20 leads with every touch logged.

## Phase 6 — Fulfillment and running
Source: rulebook, sections 6, 7.
Build only after the first `closed_won`. Stripe first (customer, $500 charge, $150 subscription), then the weekly and monthly workflows.
Done: one real client live within 7 days of payment, first monthly report sent.

## Rules for Claude Code throughout
- Never invent a price, phone number, or business name outside what's in the specs or `config/brand.ts`.
- Never message a real business during development. Use a test lead table until phase 5 is explicitly turned on by Josh.
- Every workflow logs to `runs`. A workflow that can fail silently is not done.
- When a spec is ambiguous, pick the simpler option and note the choice in `DECISIONS.md` at the repo root.
