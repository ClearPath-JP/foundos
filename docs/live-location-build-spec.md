# Live truck location — build spec

Filed 2026-09-08. **Nothing here is built.** This is the implementation plan for
the thing `/food-truck-location` sells, kept so it does not have to be
re-derived the day somebody pays for it.

**Do not build this on spec.** At a $1,500 setup, spec work destroys the
economics — the same lesson Goodfellas taught. The sales page exists; the
demo at `/demo/truckos` exists; there is nothing left to make before it can be
sold.

## Read alongside

- `docs/food-truck-bakery-vertical.md` — the vertical playbook: pricing rungs,
  the SMS COGS trap, the walk-up scripts, the Istanbul and La Suprema audits.
- `src/app/food-truck-location/page.tsx` — the public page. **Its promises are
  the spec's acceptance criteria.** If a claim on that page is not true of the
  build, one of the two is wrong.

## Corrections against the source note

The spec below was drafted before the current pricing and stack. Three things
in it are stale or would mislead:

1. **Pricing.** The note positions this as an add-on above "$500 / $150-mo".
   Current is **$1,500 setup + $149/mo**, staged $750 / $750 (re-priced
   2026-08-18, and again for the two-truck finding on 8/21). Rung 1 in the
   playbook is the source of truth, not the note.
2. **The staleness rule is TWO rules, and the second one is the one that
   matters.** This was found by grading the page against its own copy, and it
   is the most important correction on this list.

   The note only has `updated_at` age. Run it that way and the page breaks its
   own promise every single night: an update posted at 10:41am saying "until
   8pm" is only ~9 hours old at 8:01pm, so an 18-hour rule keeps showing
   **TODAY — Cobb Pkwy lot — until 8pm** to everybody who opens it between 8pm
   and roughly 4:41am. The truck has gone home. The page is doing the exact
   thing the pitch condemns: confidently sending somebody to an empty lot.

   So:
   - If `until_time` was given and that hour has passed → **"last seen"**.
   - If it was not given → hold about 18 hours on `updated_at`, then
     **"last seen"**.

   `until_time` stays free text at MVP, but the parser has to resolve it well
   enough to compare against a clock. "8", "8pm", "til 8" all mean today at
   20:00 in `America/New_York`. If it cannot be resolved, fall back to the
   18-hour rule rather than guessing — and never fall back to "today".
3. **Vercel/Next.** This repo is Next 16 on the App Router with Fluid Compute.
   The webhook route is a normal Node route handler; there is no reason to
   reach for `runtime = 'edge'`, and Twilio signature validation needs the raw
   body, which is easier on Node.

## The promises the page makes, as acceptance criteria

Straight from `/food-truck-location`. Each one has to be demonstrably true:

| Page says | Means |
|---|---|
| "You text it like a person" | A real number in his contacts. No app, no login. |
| "The page changes in seconds" | Public read path, no auth, no stale CDN copy. |
| "It texts you back" | TwiML confirmation echoing the parsed spot + time. Non-negotiable — it is how he trusts it without checking the site. |
| "It stops claiming you are there" | The hour in `until_time` has passed, OR `updated_at` is older than ~18h when no hour was given. See correction 2 — getting this wrong breaks the page nightly. |
| "Somebody else can send it" | Any allowlisted number can update, not just the owner. |
| "Your regular spots have names" | Preset spot list per client; keyword match hits it. |
| "STOP works, at the carrier end" | Twilio Advanced Opt-Out. Do not hand-roll opt-out. |
| "$32/mo at eight sends to 500" | The capped allowance goes in the agreement in writing. |
| "One to three weeks to register" | 10DLC starts the day the deposit clears. |

## 1. Database (Supabase)

### `truck_location`

| column | type | notes |
|---|---|---|
| id | uuid pk, default `gen_random_uuid()` | |
| location_name | text | "Cobb Pkwy lot" |
| address | text, null | full address if given |
| lat / lng | numeric, null | map pin, phase 2 |
| until_time | text, null | free text ("8pm"). Not a timestamp at MVP. |
| updated_at | timestamptz default now() | the fallback half of the staleness rule — see correction 2 |
| updated_by | text | 'sms' or 'dashboard' — debugging |

**Insert a new row every time, never upsert.** History is free and it answers
"which spots do the most business" later, which is a renewal conversation.
Read is always `order by updated_at desc limit 1`.

**RLS:** public `SELECT`. All writes blocked from the anon key — only the API
route, server-side, with the service role key.

### `location_subscribers` (phase 2)

`id` · `phone_number` (E.164) · `opted_in_at` · `opted_out` bool default false.

## 2. Routes

**`GET /api/location`** — public, returns the latest row. The banner reads it.
The client decides "today" vs "last seen"; do not bake the wording into the
API. ⚠️ It needs BOTH `updated_at` and a resolved end time to make that call —
see correction 2. Returning only `updated_at` is what causes the nightly bug.

**`POST /api/webhooks/sms`** — the Twilio inbound webhook.
1. **Verify `X-Twilio-Signature` first.** It is a public URL. Needs the raw
   body — do not let a body parser eat it.
2. Parse the message (§3).
3. Insert into `truck_location` with the service role key.
4. Reply TwiML: `✅ Updated: Cobb Pkwy lot, till 8pm`.
5. Phase 2: notify subscribers.

**`POST /api/admin/location`** — manual fallback, shared secret in an env var.
Exists so the owner has a path when SMS breaks, and so this can be tested
end-to-end before a Twilio number is bought.

## 3. Parsing

**MVP — keyword match.** A per-client config list of his regular spots
(`["cobb pkwy", "marietta square", "smyrna"]`), plus a regex for trailing
"till X" / "until X". **Always store the raw text as a fallback**, so a
non-match degrades to something readable rather than failing silently.

**Later — Claude.** Send the raw text, ask for `{location, until_time}` as
JSON. Handles "pulling up to the usual spot by kroger till whenever". Worth
doing once the keyword version has proved the concept, not before.

## 4. Admin fallback

`/admin/location` — password gate (hashed, in an env var), two text inputs and
a Save. Single owner, no auth system needed.

## 5. Frontend

```
📍 Today: Cobb Pkwy lot — until 8pm
Updated 2 hours ago
```

Fetch on load. No websockets at this scale. Once the hour he gave has passed —
or past ~18h if he gave none — the copy changes to "Last seen: Cobb Pkwy lot
(yesterday)". Phase 2 swaps the line for a map pin once lat/lng is stored.

## 6. Twilio

- A number (~$1.15/mo) he saves as a contact and texts like a person.
- Point "A message comes in" at `/api/webhooks/sms`.
- ~$0.0079 per segment out. **Over 160 chars bills as two.**
- **Advanced Opt-Out for STOP.** Legally required, and lean on theirs.
- **10DLC registration is 1–3 weeks.** Start it the day the deposit clears.

## 7. Build order

1. Table + RLS
2. `GET /api/location` + the banner — something visible fast
3. `/admin/location` + its POST — end-to-end testable with no Twilio yet
4. Twilio number + webhook, keyword parsing
5. The confirmation text back
6. Phase 2: Claude parsing
7. Phase 2: subscriber opt-in + notify blast
