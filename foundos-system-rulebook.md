# foundos — system rulebook

This is how the business runs. Every step is written so that an AI agent, a new hire, or Josh on a bad day can execute it and get the same result. If a step can't be followed by someone who's never seen it before, the step is wrong — fix the step, not the person.

Each runbook has the same shape: trigger, owner, inputs, steps, done-when, if-it-fails. Agents run everything except the two gates. Gates are Josh until a human is hired to run them off this same document.

---

## 0. Principles

1. **Agents do repeatable steps. Humans do judgment.** If a step has a checklist, an agent runs it. If a step needs to read a person, it's a gate.
2. **Give before asking.** Every touch to an owner delivers something (an audit, a sample site) before it asks for anything.
3. **Nothing waits on memory.** Every lead, every touch, every dollar is written to the database the moment it happens. If it's not in Supabase it didn't happen.
4. **Follow-up is automatic.** Josh never decides whether to follow up. The sequence decides.
5. **One number matters:** sample sites sent → paid clients. Everything else is noise until that's known.
6. **The subscription is the business.** The $500 site is the door. $150/month forever is the point.

---

## 1. Data model (Supabase)

Table `leads`:

| column | type | notes |
|---|---|---|
| id | uuid | |
| name | text | business name |
| category | text | restaurant / cafe / bakery / truck / vendor / other |
| address, city | text | |
| phone, email, instagram | text | whichever exist |
| google_place_id | text | |
| owner_name | text | if found |
| source | text | `scrape` / `audit_box` / `walk_in` / `referral` / `ad` |
| score | int | 0–100, from runbook 2 |
| findings | jsonb | audit findings |
| sample_url | text | deployed sample site |
| status | text | see below |
| next_action_at | timestamptz | when the sequence fires next |
| notes | text | human notes only |
| created_at, updated_at | timestamptz | |

Status flow (only these values, only in this order unless noted):
`new` → `scored` → `sample_built` → `contacted` → `replied` → `call_booked` → `closed_won` / `closed_lost` / `cold`

- `cold` = full sequence ran, no reply. Re-enters at `contacted` after 90 days with a new angle.
- `closed_lost` = talked, said no. Note the reason. Re-contact in 6 months only if reason was timing.

Table `touches`: lead_id, channel (`sms` / `email` / `dm` / `call` / `walk_in`), direction (`out` / `in`), body, sent_at. Every message in or out gets a row.

Table `clients`: lead_id, stripe_customer_id, plan (`site_only` / `running`), mrr, started_at, site_url, next_report_at.

---

## 2. Runbook — Prospect

**Trigger:** every Monday 6am (n8n cron).
**Owner:** agent.
**Inputs:** target radius (default 15 mi from Marietta), categories (restaurant, cafe, bakery, food truck, caterer, food vendor), exclusion list (chains, existing leads).

Steps:
1. Query Google Places for each category in the radius. Pull name, address, phone, website, rating, review count, place_id, photos count.
2. Skip any place already in `leads` (match on place_id), any chain (more than 3 locations nationally), any place closed permanently.
3. For each remaining place, fetch the website if one exists. Record: has_site (bool), has_online_ordering (bool), has_booking (bool), mobile_ok (Lighthouse mobile score), last_updated (best guess from copyright year / menu date), hours_match_google (bool).
4. Pull the Google listing: hours set, photos count, reply-to-reviews rate, last owner post date.
5. Score 0–100. Points for: no site (+40), site but no ordering (+25), Lighthouse mobile < 60 (+15), hours mismatch (+10), fewer than 10 photos (+5), review count 20–300 (+5, this is the sweet spot — real business, not huge), owner never replies to reviews (+5). Subtract: review count > 800 (−20, probably has an agency), opened in last 60 days (−10, too busy).
6. Insert every place as a `leads` row with status `scored`. Max 50 new per week.
7. Write findings into `findings` in plain English, one line each, in the same format the audit box uses.

Done when: ≥ 20 new leads with score ≥ 50 are in the table, or the radius has been exhausted (then widen radius by 5 mi and note it).

If it fails: Places API error → retry once in 1 hour, then post to Josh's digest. Zero results → widen radius, log it.

---

## 3. Runbook — Sample site

**Trigger:** Monday 8am, after Prospect. Also fires immediately when an `audit_box` lead drops a phone number.
**Owner:** agent (Claude Code).
**Inputs:** top 5 leads by score with status `scored` (audit_box leads jump the queue), the concept-site templates (restaurant / cafe / truck / bakery).

Steps:
1. Pick the template by `category`.
2. Pull from the Google listing: name, address, hours, phone, up to 12 photos, menu items if visible in photos or on their existing site. If fewer than 4 usable photos, use category-appropriate stock and flag `stock_photos: true` in notes.
3. Build the site from the template with their real name, real hours, real menu where possible. Include the ordering page even if it's a mock — it's the thing that sells.
4. Deploy to Vercel at `samples.foundos.ai/<slug>`. Password-free. Add the small footer line: "Sample built by foundos for [name]. Not live. Want it? Text (404) 436-3393."
5. Run Lighthouse. If mobile < 90, fix before continuing.
6. Write `sample_url`, set status `sample_built`.

Done when: 5 sample sites are deployed, linked, and pass Lighthouse mobile ≥ 90.

If it fails: build error → skip that lead, mark `notes: build_failed`, take the next lead. Never let one broken build stop the batch.

Time budget: under 20 minutes per site, unattended. If it's taking longer, the template is too complex — simplify the template, not the batch.

---

## 4. Runbook — Outreach

**Trigger:** any lead reaching `sample_built`.
**Owner:** agent.
**Inputs:** lead row, sample_url, findings, best channel (SMS if phone is a mobile, else email, else Instagram DM — in that order).

Sequence (every message is logged to `touches`; a reply at any point stops the sequence and moves the lead to `replied`):

**Touch 1 — day 0, morning (Tue–Thu only, 9–11am):**
> Hi, this is Josh in Marietta. I build sites for restaurants around here. I put one together for [name] this week so you could see what I mean — it's at [sample_url]. Ordering's built in. Just take a look, no pitch. — Josh

**Touch 2 — day 3:**
> Not sure if you got to see it — [sample_url]. One thing I noticed: [top finding, one line]. Happy to fix that whether you use me or not.

**Touch 3 — day 7:**
> Last one from me. If the site's useful it's $500 and you own it; I can also just run the online side for $150 a month so you never think about it. If not, no worries at all — I'll leave you alone. — Josh

**Touch 4 — day 21 (email only, if email exists):**
Subject: the site for [name]
> Still here if you want it. [sample_url]. If timing's bad, reply "later" and I'll check back in a few months.

After touch 4 with no reply → status `cold`, `next_action_at` = +90 days.

Rules:
- Never more than one message per channel per day.
- Never message before 9am or after 7pm local.
- If a message bounces or a number is a landline, switch to the next channel and log it.
- A reply of "stop," "no," "not interested," or anything hostile → status `closed_lost`, reason `declined`, never contact again.
- A reply of "later" → `next_action_at` = +120 days, status `cold`.
- Any other reply → status `replied`, notify Josh immediately (Gate 1).

Done when: every `sample_built` lead has either replied or completed the 4-touch sequence.

If it fails: SMS provider down → queue and retry in 2 hours; never skip a touch, only delay it.

---

## 5. Gate 1 — The reply (Josh)

**Trigger:** any inbound reply that isn't a clear no.
**Owner:** Josh. Later: a hired closer on commission.
**Response time:** under 2 hours during 9am–7pm. The agent re-pings at 2 hours and 4 hours if the lead is still `replied`.

Script (adapt the words, not the order):
1. Thank them, one line. Ask one question: "What do you do for orders right now — apps, phone, walk-in?"
2. Listen. Find the one thing costing them the most (usually app fees or missed calls).
3. Offer the 20-minute call or, if they're chatty by text, close by text. Do not send a proposal document. Ever.
4. Price is fixed: $500 site, $150/month running. Do not discount the site. If money is tight, drop the monthly to $100 for the first 3 months, never lower.
5. Ask for the yes: "Want me to make it live? I'll send a link to pay and it's up within a week."
6. Log the outcome: `call_booked`, `closed_won`, or `closed_lost` with a one-line reason.

Done when: the lead has a status other than `replied`.

If Josh doesn't respond within 4 hours: the agent sends a holding message — "Josh will text you back today" — and escalates by phone call.

---

## 6. Runbook — Fulfillment

**Trigger:** status `closed_won`.
**Owner:** agent builds, Josh reviews (Gate 2 is the review, 30 minutes max).

Steps:
1. Stripe: create customer, charge $500, create the $150/month subscription starting on go-live date. Insert `clients` row.
2. Send the intake by text: "Three things I need: your real menu with prices, 10+ photos of the food and the room, and your logo if you have one. Send whatever you've got, I'll fill gaps."
3. Convert the sample into the real build: swap stock photos for theirs, real menu, real ordering (Stripe Connect or Square, whichever they use), real hours synced to Google.
4. Connect their domain (or buy one on their card — they own it).
5. Fix the Google listing: hours, photos, categories, website link.
6. Set up review requests (post-order SMS asking for a Google review, 1 per customer, never repeat).
7. **Gate 2:** Josh clicks through the site on his phone for 30 minutes. Places a test order. Checks every phone number and hour. Approves or sends back one list of fixes.
8. Go live. Text the owner the link and a 60-second video of how to change a menu item.

Done when: site is live on their domain, one real order has gone through, Google listing shows the new site, `clients.site_url` is set.

If it fails: owner doesn't send materials within 7 days → go live with the sample content and tell them "it's up, send me the real menu when you can." Never let missing materials delay revenue.

Deadline: 7 days from payment to live. Miss it and the first month is free — say so in the intake message, it closes deals.

---

## 7. Runbook — Running it (the subscription)

**Trigger:** weekly per client (Sunday 8pm) and monthly (1st of month).
**Owner:** agent. Josh only sees exceptions.

Weekly:
1. Uptime check, Lighthouse check. Anything below 85 → fix.
2. Google listing hours vs. site hours. Mismatch → fix, note which side changed.
3. New reviews since last week → draft a reply in the owner's voice, send to owner by text for one-tap approve, post on approval.
4. Any menu-change texts from the owner in the last week → apply within 24 hours, confirm by text.

Monthly:
1. One-page report by text and email: orders through the site, calls answered (if receptionist), reviews gained, hours/menu changes made. Four numbers, four lines. No charts.
2. If orders through the site < 5 in a month, flag to Josh. That client will churn — schedule a check-in.
3. Every 3rd month: one upsell line at the bottom of the report, based on what they don't have yet (ordering → receptionist → booking → loyalty). One line, never more.

Done when: report sent, all checks green or fixed.

If it fails: site down → fix first, tell the owner second, and only if it was down more than 15 minutes.

Churn rule: subscription cancels → keep the site live 30 days, then hand over the repo and DNS with a text. No guilt, no retention offer. They may come back.

---

## 8. The daily digest to Josh

One message, 8am, every day. Nothing else unless it's a Gate 1 reply.

> foundos — [date]
> Replies waiting: [n] (oldest: [hours]h)
> Samples sent this week: [n] / 5
> Leads scored: [n]
> Clients: [n] · MRR: $[n]
> Needs you: [list of exceptions, or "nothing"]

If "Replies waiting" is above 0, the digest is red. Everything else is information.

---

## 9. Numbers to watch

Track weekly in a single Supabase view. Look at nothing else for 90 days.

| metric | how | target after 90 days |
|---|---|---|
| samples sent | count status ≥ sample_built | 5/week, every week |
| reply rate | replied ÷ contacted | ≥ 15% |
| close rate | closed_won ÷ replied | ≥ 25% |
| samples → client | closed_won ÷ sample_built | this is the number. Unknown until 60+ samples. |
| MRR | sum clients.mrr | $1,500 (10 clients) |
| time to live | closed_won → site live | ≤ 7 days |
| Josh hours/week | honest estimate | ≤ 8 |

If reply rate < 8% after 60 samples: the message is wrong or the leads are wrong. Change one variable (the first line of touch 1, or the score threshold), run 30 more, compare.
If reply rate is fine but close rate < 15%: the gate is the problem — Josh's script, response time, or price. Fix the human step before touching the system.

---

## 10. Capital phase (do not start before 10 paying clients)

1. Meta ads: one campaign, one creative — a 30-second screen recording of a sample site being built for a real-looking restaurant, ending on "type your name at foundos.ai." Target: Atlanta metro, interests restaurant ownership / food truck / bakery, age 25–55. Budget $10/day. It points at the audit box; the system does everything after that. Track cost per phone number captured. Kill it if > $40 per number after $300 spent.
2. Hire a closer on commission ($100 per closed site + 20% of first-year MRR). They run Gate 1 off section 5 of this document. Josh moves to Gate 2 only.
3. Buy better data (Apify actors for Instagram/Yelp) to raise lead quality, not volume.
4. Add the AI receptionist and online ordering as productized add-ons with fixed prices, sold in the monthly report.

Nothing in this phase changes the runbooks. It puts more leads in the top and more hands at the gates.

---

## 11. n8n schedule (summary)

| workflow | trigger | runbook |
|---|---|---|
| prospect | cron Mon 6:00 | 2 |
| build_samples | cron Mon 8:00 + webhook on audit_box phone capture | 3 |
| outreach_tick | cron every hour 9–19, checks `next_action_at` | 4 |
| inbound | webhook from SMS/email provider | 4 → 5 |
| fulfill | trigger on status = closed_won | 6 |
| run_weekly | cron Sun 20:00 | 7 |
| run_monthly | cron 1st 8:00 | 7 |
| digest | cron daily 8:00 | 8 |

Every workflow writes a row to `runs` (workflow, started_at, ended_at, ok, error). The digest reads `runs` and reports any workflow that didn't run or errored. A silent failure is the only unacceptable failure.
