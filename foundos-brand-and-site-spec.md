# foundos — brand and site spec

Hand this whole file to Claude Code in the foundos repo. Section 1 is the design system. Section 2 is the homepage, top to bottom. Section 3 is the three concept sites. Section 4 is build notes. Nothing here is optional unless marked "later."

---

## 1. Brand spec

### What foundos is
One person in Atlanta who builds and runs the online side of restaurants and food businesses. Not an agency. Not an AI startup. The site should feel like a competent person's shop, not a product landing page.

### Name and wordmark
- The mark is the lowercase word `foundos` followed by a small green dot. Nothing else. No icon, no ".ai" in the mark (the domain keeps it).
- Pronounced "found-oss."
- The dot means "running" — it's the visual version of "I run it every week." It is the only decorative element on the entire site.
- Dot: 9px circle at desktop wordmark size, sits on the baseline, 6px right of the last letter. Scales proportionally.
- Favicon: the dot alone on white, or a black `f` with the green dot.

### Palette (the whole thing)
| Role | Hex |
|---|---|
| Background | `#FFFFFF` |
| Text, buttons, rules | `#000000` |
| Secondary text | `#5F5E5A` |
| Hairlines / borders | `#D3D1C7` |
| Light surface (concept site cards, code-ish blocks) | `#F1EFE8` |
| Accent (the dot, and nothing else) | `#1D9E75` |

Rules:
- The green appears in exactly one place per view: the dot in the wordmark. No green links, no green buttons, no green icons.
- No purple anywhere. Remove all existing purple, including the bar graphic under the logo.
- No gradients, no shadows, no glassmorphism, no glow.
- Buttons are solid black with white text, 8px radius. Secondary buttons are white with a 1px black border.
- Black is pure `#000000`. Do not tint it.

### Type
- One family: Inter (already in use). Keep it.
- Weights: 400 for body, 600 for headings and button text. No 700+, no 300.
- Headline (hero): 56px desktop / 36px mobile, line-height 1.1, letter-spacing -0.02em, plain black, no highlighted phrase, no colored words.
- Section heading: 32px / 26px, weight 600.
- Body: 18px / 17px, line-height 1.6, `#000000` for primary lines, `#5F5E5A` for supporting lines.
- Small / meta: 14px, `#5F5E5A`.
- Max line length 65 characters. Left-aligned everything. Never centered blocks of text.
- No all-caps labels. No eyebrow labels above headings. Sentence case everywhere.

### Icons and imagery
- No emoji anywhere on the site.
- Feature bullets get no icon at all — the bolded lead-in word does the job.
- The only imagery on foundos.ai is: (a) real screenshots of the concept sites, (b) one photo of Josh. That's it. No stock photos on the foundos site itself.

### Motion
- One motion moment on the whole site: after the audit box returns a result, the result panel slides in. Nothing else animates. No fade-ups on scroll, no hover lifts on cards.

### Voice
- First person, plain, direct. Short lines. Sounds like a text message from someone who knows what they're doing.
- Never: "leverage," "seamless," "solutions," "AI-powered," "unlock," "elevate."
- Contractions always. No exclamation points.

---

## 2. Homepage spec

Single page, scrolling. Sections in this exact order. Copy below is final unless marked (draft).

### 2.1 Header
Sticky, white, 1px `#D3D1C7` bottom hairline.
Left: wordmark with dot.
Right: `Text me` link (sms: link) and `Book 20 minutes` (Calendly). On mobile, only `Text me`.

### 2.2 Hero
Two lines, nothing else above the fold except the subhead and one button.

> **I build and run the online side of restaurants and food businesses in Atlanta.**
>
> You're good at what you do.
> The internet doesn't show it.
>
> [Text me — (404) 436-3393]   [See what I'd build for you ↓]

The second button scrolls to the audit box.

### 2.3 The problem (keep, tighten)
Left-aligned, three lines in `#5F5E5A`, then one bold line in black:

> Your hours are wrong on Google.
> Your menu is a photo from three years ago.
> The phone rings while your hands are full.
>
> **So I build the part you don't have time for.**

### 2.4 The audit box
This is the front door of the whole business. It gets the most vertical space of any section.

> ## See exactly what I'd build for your restaurant.
> Type the name. I'll pull your Google listing and your site and show you what's costing you customers right now — and what I'd do about it.
>
> [ Your restaurant's name ] [Show me]
> Free. About 10 seconds. No email.

Behavior:
- Result renders inline below the input (the one motion moment).
- Result shows 3–5 findings, each one line, plain language ("Your hours on Google say closed Sunday. Your Instagram says open.").
- Under the findings: **"Want me to fix these? Drop your number and I'll text you a sample site of your restaurant this week."** with a phone input and a `Text me the sample` button. This is the capture point. It is asked *after* value is shown, never before.
- On submit: stores name + phone + audit findings (Supabase), triggers the outreach sequence (see rulebook), and shows: "Got it. You'll hear from me by text, not a robot."

### 2.5 What I build
Heading: **What I build.**
Six items, no icons, bold lead-in then plain sentence. Keep existing copy, minus emoji:

- **A website that actually sells** — ordering and payments built in, so you stop handing a cut of every ticket to the apps.
- **Bookings customers make themselves** — at midnight, straight into your calendar.
- **An AI that answers every call** — takes the order, books the table. A ringing phone stops being a lost customer.
- **Reviews asked for automatically** — and the regulars who drifted away quietly brought back.
- **Your Google listing fixed** — so you're the obvious choice the moment someone searches nearby.
- **Every order, call, and dollar on one screen** — so you finally see what's working.

Then:

> **Then I run it. Every week. So you never think about it again.**
> You own all of it — your domain, your site, your data. If you ever leave, you take it with you.

### 2.6 Open something I've built (concept sites)
Heading: **Open something I've built.**
Subhead: These are concepts — the businesses aren't real, everything on the sites works. Click around, place a fake order, try the booking.

Three cards on `#F1EFE8`, each with a real screenshot, name, one-line description, and `Open →` linking to the live concept site. (Spec in section 3.)

Under the cards, one line in `#5F5E5A`:
> Concept businesses. Built to show you the real thing, not a template.

When the first real paying client goes live, add their card with a 1px black border and the line "Built for a real client." Until then, concepts only.

### 2.7 Don't take my word for it (AI receptionist)
Keep as is, minus emoji:

> ## Don't take my word for it.
> Call the AI receptionist and order a slab of ribs out loud. It'll take the order — and tell you it's AI.
> [Call (276) 295-1209]

### 2.8 What it costs
This section is new and it's required. Owners bounce when they assume "agency = $5,000."

> ## What it costs.
>
> **The site — $500, one time.** Built from your real menu, photos, and hours. You own it outright.
>
> **Running it — from $150 a month.** Hosting, Google listing kept correct, review requests, menu changes, a monthly one-page report. Cancel any time; you keep the site.
>
> **Online ordering, bookings, the AI receptionist** — added when you want them, priced when we talk. Most pay for themselves in saved delivery-app fees the first month.
>
> Free to start: type your name above and I'll build a sample first. If you don't like it, you owe nothing and you never hear from me again.

(Prices are placeholders Josh can change in one place — put them in a config file.)

### 2.9 Who's building it
Heading: **One person. Not an agency.**
Left: a real photo of Josh, square, no filter, no ring, 240px. Right, three short paragraphs (draft, Josh rewrites in his voice):

> I'm Josh. I'm in Atlanta, I work in a gym, and I've been building sites for restaurants and food businesses because most of them are getting robbed by delivery apps and a Wix template from 2019.
>
> You text me, I answer. No account manager, no ticket system.
>
> If I can't help you, I'll tell you that too.

### 2.10 Final call
> **Tell me what you run and I'll tell you straight whether I can help.**
> [Text me — (404) 436-3393]   [Book 20 minutes]

### 2.11 Footer
Wordmark with dot · hello@foundos.ai · Atlanta, GA · Privacy. One line. Hairline above.

---

## 3. Concept sites spec

Three fictional food businesses. Each is a full working site on a foundos subdomain or `/demo/` route. Each exists to show one feature set off hard. Every concept site carries a small fixed footer line: "Concept site by foundos — not a real business."

Rules for all three:
- Real photography from Unsplash/Pexels (free license), never photos from real local businesses.
- Fake but believable menus, prices, hours, addresses (use a real Atlanta street with a nonexistent number).
- Everything clickable works: cart, checkout in Stripe test mode, booking to a demo calendar.
- Each one has its own color and type — these are the loud, colorful things on foundos.ai. This is where the personality goes.

The concept sites come from existing builds already deployed on Vercel. They currently carry real business names and photos and must be fully rebranded before they're linked from foundos.ai. Claude Code picks the fictional names — suggestions are given, none are required. Names must not resemble the original business or any real Atlanta-area business (check Google Maps before committing).

### 3.1 Sit-down restaurant — from the Taste of Istanbul build
Suggested name: "Marta's" or "Ember & Vine."
Shows: full menu, online ordering with pickup times, table booking, reviews block, hours managed in one place, multi-location / catering inquiry, open/closed status. Warm palette, big food photography.

### 3.2 Cafe — from the Station 11 build
Suggested name: "Corner Kettle" or "Lowry Coffee."
Shows: menu, mobile ordering, hours, a reviews block. Later: loyalty / win-back texts, once that feature exists.

### 3.3 Food truck — from the Fish Fillet Delight build (`truckos?biz=truck`)
Suggested name: "Siniard Street Fish" or "Hotline Fry."
Shows: live location, order-ahead, one-tap sold out, catering inquiry form.

### 3.4 Bakery — from `truckos?biz=bakery`
Suggested name: "Loaf & Ember."
Shows: pre-orders with deposit, weekly rotating items, sold-out board, holiday order cutoffs.

Show 3 cards on the homepage (restaurant, truck, bakery). The cafe becomes the fourth card once it's rebranded.

Not used: the Ally Hair & Beauty and Clahvay builds. Off-niche. Leave them deployed but unlinked.

### 3.5 Rebrand procedure (run identically on every concept site)
1. Choose the new name. Grep the whole repo for the old name (and short forms, e.g. "Fish Fillet", "Istanbul", "Station 11") — title tags, meta, OG image, footer, alt text, email templates, JSON data files, env vars. Replace all.
2. Rename the Vercel project and domain. Old URLs should 404, not redirect.
3. New text wordmark in the site's own font. Delete the old logo asset.
4. Replace every photo with Unsplash/Pexels images (free license). Include favicon, OG image, hero, menu items, interior shots.
5. New fake address (real Atlanta-area street, nonexistent number), fake phone, fake hours, fake email on the concept's domain.
6. Rewrite menu items and prices so they don't match the real business's menu.
7. Remove any "Site by ClearPath Solutions" or similar credit. Add the fixed footer line: "Concept site by foundos — not a real business."
8. Final grep for the old name, then check the git history; if the repo is public, squash or make it private.
9. Screenshot at 1200×800 for the foundos.ai card.

---

## 4. Build notes for Claude Code

- Stack stays: Next.js, TypeScript, Tailwind, Supabase, Vercel.
- Put palette, type scale, prices, and phone numbers in one `config/brand.ts`. Nothing hardcoded in components.
- Tailwind: extend with the six colors above as `bg-ink`, `text-ink`, `text-muted`, `border-hairline`, `bg-surface`, `bg-dot`. Purge any purple tokens.
- Audit box: keep the existing pipeline, add the phone capture step and the Supabase insert (`leads` table: name, phone, findings JSON, source = "audit", created_at, status = "new"). Fire a webhook to n8n on insert.
- Mobile first. Test the hero at 375px — the headline must fit in three lines max.
- Lighthouse 95+ on every page. Fonts self-hosted.
- Accessibility floor: visible focus rings (black, 2px), alt text on every screenshot, reduced-motion respected for the one animation.
- Remove: purple bars, emoji, `.ai` from the header mark, the word "local businesses" everywhere it appears (replace with "restaurants and food businesses").
- Screenshots of concept sites are generated at build time with Playwright, 1200×800, so they never go stale.

### Definition of done
1. Zero purple in the CSS bundle.
2. Every section in 2.1–2.11 present in order, on desktop and mobile.
3. Audit box returns findings and captures a phone number into Supabase.
4. Three concept cards link to live, clickable concept sites with the "not a real business" line.
5. Prices editable in `config/brand.ts` without touching components.
