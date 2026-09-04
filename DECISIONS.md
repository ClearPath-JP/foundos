# DECISIONS

Required by `CLAUDE-BUILD-ORDER.md`: *"When a spec is ambiguous, pick the simpler option and note the choice in `DECISIONS.md` at the repo root."*

One entry per judgment call. Newest phase at the top. If a decision here turns out wrong, edit the entry and say why — don't delete it.

---

## Phase 1 — Brand and homepage · 2026-09-03

### Josh's calls (asked, answered)

| Question | Answer |
|---|---|
| Install `@supabase/supabase-js`? | **Yes.** Installed at `^2.114.0`. The only new runtime dependency in phase 1. |
| Which ask-first routes can go? | **All of them** — `/explore/*` (aurora, nocturne and ember included), `/studios`, `/truck`, `/clahvay`, `/ai`. |
| Photo for §2.9? | **Gray placeholder**, even though `public/josh.jpg` exists. Swap it when he picks a photo. |

### Structural

**`src/config/brand.ts`, not root `config/brand.ts`.** The spec says `config/brand.ts`. `tsconfig.json` maps `@/*` to `./src/*` and nothing else, so a root-level `config/` would need a second path alias for no gain. Same file, one directory down, zero config change.

**Phone and email are re-exported from `src/lib/contact.ts`, not redefined.** `brand.ts` owns colour, type and price. `contact.ts` keeps owning the ways to reach Josh. Two files defining the same phone number is exactly how a number goes stale in one place and not the other — the repo already did this in `explore/content.ts`, which redefined `CAL` and `EMAIL` independently.

**A new `POST /api/lead`, not a fourth mode on `/api/report`.** `/api/report` streams NDJSON, holds three module-level caches, and is documented "a failed alert must never cost a visitor their report." The capture is a single JSON request and response with different failure rules. Bolting it on as a mode would put a write path inside a stream handler.

**`source: 'audit_box'`.** The rulebook's `leads.source` enum is `scrape` / `audit_box` / `walk_in` / `referral` / `ad`. The brand spec §4 says `source = "audit"`. The enum wins — `audit` is not a legal value and would break the digest's grouping in phase 3.

**The Supabase key is the service role key, server-side only.** `leads` gets no public insert policy and no anon access. Nothing about the lead table is exposed to the browser.

**The client re-POSTs the findings it was shown.** The server could regenerate them from `placeId`, but the row should record *what the visitor actually read* when they decided to hand over a number, not what a later regeneration would produce.

### Bugs found in recon, fixed here

**The phone-capture alert would have been silently swallowed. Fixed by namespacing the dedupe key.** `notify.ts:91` computes `const key = (lead.dedupeKey || name).toLowerCase()` against a 6-hour window, and the report path already passes `dedupeKey: place.id`. A capture two minutes later recomputes the identical key, the window check passes, and the function hits a bare `return` **before the fetch** — no log, no throw, a resolved promise. Worse, `notified` is a per-instance `Map`, so the alert is dropped on a warm instance and sent on a cold one: intermittent, exactly when the visitor is hottest. The capture path therefore passes `dedupeKey: 'phone:' + (placeId ?? name)`. `DEDUPE_WINDOW_MS` is left alone — shortening it would re-enable duplicate report pings on the refine and cache-hit paths.

**`/api/lead` gets its own rate limiter.** Rate limiting lives in `api/report/route.ts` (a `hits` Map, 5 per hour per IP), not in `notify.ts`. A new route inherits none of it, which would leave the Telegram channel spammable with one POST per name.

**`/privacy` is restyled in this pass.** It is linked from the §2.11 footer, it is the only surviving consumer of the hand-written CSS in `globals.css`, and that file is ~86% dead (701 of 815 lines). It already renders `.nav`, `.nav--scrolled` and `.nav__logo`, none of which have ever existed in `globals.css` — the page is half-unstyled today. Purging globals without touching privacy would ship a worse broken page than the one we started with.

### Kept deliberately

**Emoji stay in `src/lib/notify.ts`.** The spec bans emoji *on the site*. The bell, star, phone and globe in `notify.ts` are in the Telegram alert to Josh's phone, where they are scanning aids in a message only he reads.

**The star stays on the rating, the arrow stays on links.** A star is data, not decoration. The arrow is written into the spec itself (`Open →`, `See what I'd build for you ↓`).

**`InstantReport`'s `TAP_CATEGORIES` stay broad** (restaurant / studio / shop / service / other) even though the hero narrows to restaurants and food businesses. The audit box is the tool Josh runs at a walk-in; narrowing it would break it for the non-restaurants currently in the pipeline.

**The JSON-LD block is carried forward.** Spec §2.1–2.11 has no structured-data section, so rebuilding strictly to the list would silently drop all of it. `name` changes from `foundos.ai` to `foundos` and the description stops saying "local businesses"; everything else survives.

**Inter's weight array is not pinned.** Inter is a variable font — passing an explicit `weight` array switches `next/font` to static instances. The spec's "400 and 600 only" is enforced by not writing any other weight, not by restricting the download.

**`framer-motion` stays.** It looks orphaned after the deletions but `demo/babygirl` and `demo/heirloom` still import it. `three`, `@types/three` and `gsap` are genuinely dead and go.

**Three fonts are dropped, one stays.** Inter only. `Caveat` and `Bricolage_Grotesque` die with the CSS that used them. `Geist_Mono` becomes removable only because `/privacy` is restyled in the same pass — it was the font of `.mono`, which privacy still used.

### Deferred, with reasons

**§2.6 ships with the two demos that exist and no screenshots.** `contact.ts` `DEMOS` has the truck and the bakery. The third card, the real screenshots and the fictional rebrands are phase 2 — the spec's own §3. Shipping a third card now would mean either an empty card or a real prospect's name on the homepage, and `contact.ts` carries an explicit warning against the latter.

**The Supabase insert no-ops when unconfigured, and says so.** There is no Supabase project yet, so definition-of-done item 3 ("captures a phone number into Supabase") is **not met in phase 1** and is not claimed to be. The client returns `null` when the env vars are absent; the capture still works and the Telegram alert still fires. When Josh creates the project and sets `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel, the insert starts working with no code change.

**The n8n webhook logs loudly rather than failing silently.** The workflow it points at is phase 4 and does not exist. The build order bans silent failure, so an unconfigured or failing webhook is logged and surfaced in the Telegram alert rather than swallowed.

### Flagged, not decided

**The §2.4 heading contradicts the business cards in circulation.** `src/app/page.tsx` carried a standing warning: the `#report` H2 is printed verbatim on the back of the v2 cards — *"See exactly what I'd build for your business →"*. Spec §2.4 rewords it to *"...for your restaurant."* The spec is newer and Josh wrote it, so the spec is followed. But cards are in hands: a prospect who scans one lands on a page that says something different. Josh's call whether to reprint, or to soften §2.4 back to "business."

**Three contact facts existed only on deleted pages** — `470-489-8838`, `cal.com/foundos.ai/strategy-call` and `josh@foundos.ai`. All three are transcribed in `docs/salvage-2026-09-03.md`. Deleting the pages does not disable them; it stops the site advertising them. Whether any belongs in `contact.ts` is open.

**`/explore/aurora`, `/explore/ember` and `/explore/nocturne` were deliberately live** — `.vercelignore` kept them public "so no existing link breaks." They now 404. Approved, recorded here because it is a real URL loss rather than a cleanup.

**⚠️ THE PRIVACY POLICY NAMED AN ANALYTICS VENDOR THE SITE HAS NEVER USED.** It said data was
collected "through Vercel Analytics." `@vercel/analytics` is not a dependency, nothing mounts
`<Analytics/>`, and the only occurrence of that string anywhere in the repo was the policy claiming it.
Corrected to ordinary host request logging, which is what actually happens. The promises around it —
"No cookies. No personal tracking." — were true and carry over verbatim; only the invented mechanism
went. Worth confirming Josh didn't *intend* to have analytics, since he apparently believed he did.

**⚠️ EVERY REPORT RUN ALERTS JOSH'S PHONE, NOT JUST PHONE CAPTURES.** `api/report/route.ts` calls
`notifyLead` on all three paths — full report (:327), cache hit (:239) and the 3-tap fallback (:159).
So typing a business name into the audit box sends Josh that business's name, address, rating, listed
phone, website and findings, with nobody having handed over anything. This was the largest undisclosed
data flow on the site and is now stated plainly in the policy. Both routes also rate-limit on IP
(5/hour for reports, 3/hour for captures) — an IP is personal data and was likewise undisclosed.

**⚠️ SETTING THE SUPABASE ENV VARS IS A DOCUMENTATION CHANGE.** The policy now states that nothing is
stored in a database, which is true only because `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are
unset. Setting them in Vercel silently makes the policy under-disclose a live table of visitors' phone
numbers — no deploy, no code change, nothing to prompt anyone. A warning to that effect is in the
privacy page's file header. Confirm those vars are genuinely unset in production.

**⚠️ THE INSTANT REPORT IS RUNNING DEGRADED, AND WAS BEFORE THIS REBUILD.** Found while testing the
capture end to end on 2026-09-03. The Vercel AI Gateway rejects `REPORT_MODEL` —
`anthropic/claude-sonnet-5`, `src/lib/report/generate.ts:27` — with:

> Free tier users do not have access to this model. Upgrade to paid credits.
> `"type": "no_providers_available"`, `RestrictedModelsError`, HTTP 403

`generateReport()` catches it and renders the deterministic report with `generated: false`. So every
visitor gets the hand-written fallback prose, and the "sharpen" pass that fires when they tap a pain
chip re-runs the same failing call and changes nothing. The fallback is well built enough that this is
invisible from the outside, which is why it has gone unnoticed.

Nothing in this phase caused it and nothing here fixes it — it is an account decision. The options are
to add credits to the Vercel AI Gateway, point `REPORT_MODEL` at a model the free tier does serve, or
accept the deterministic report as the product and delete the model path. Until one is chosen, the
front door works but is not doing the thing it was built to do.
