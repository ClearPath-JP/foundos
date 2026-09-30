# foundos — website rebuild brief and implementation prompt

Prepared for Josh Potesta. Direction for review; this document does not change the live site.

## 1. Purpose and positioning

Rebuild foundos.ai as a minimal, approachable site for local business owners who need practical help with technology. The audience includes people Josh meets in person and people arriving from his digital consultation notes or business card. Serve local businesses broadly: shops, salons, service businesses, cafes, restaurants, and other independent operators. Do not imply every possible technical specialty is supported.

Positioning: Local technology help, starting with a conversation and useful advice.

Primary conversion: request a free, personally reviewed tech checkup. Josh receives a private Telegram notification, reviews the request, and follows up personally with a short digital recommendation sheet. This is not an instant AI report, a comprehensive security audit, or a promise of increased revenue.

Secondary conversion: text Josh. Use the supplied business-card details: Josh Potesta, josh@foundos.ai, (404) 436-3393. Location wording: Based in Marietta, helping local businesses. Do not publish a residential address.

## 2. Brand direction

Retain the lowercase foundos identity and the business card's white/purple/near-black family. These hex values are proposed web tokens inspired by the supplied card, not a claim of exact extraction from its source artwork.

- Main background: #FFFFFF
- Light section background: #F7F5FC
- Main text: #171421
- Secondary text: #595365
- Primary purple: #6D28D9
- Purple hover: #5B21B6
- Decorative lavender: #EDE5FA
- Borders: #DED8E8
- Small decorative pink accent: #C52E98

Use white and near-black for most of the page. Purple is for primary buttons, links, and a few key accents. Lavender separates one or two areas. Pink belongs only in the logo or a very small decorative detail. Use the card's diagonal stripe as a subtle identity cue, not a large repeated motif. No large gradient backgrounds, glass cards, neon glows, or dark software-dashboard aesthetic. Do not add the previously used terracotta palette.

Typography: Manrope, with a system sans-serif fallback. Use a clear, friendly weight hierarchy: 700 headings, 400/500 body. Body text at least 16px, preferably 18px. Avoid uppercase paragraphs, overly tight text, and low-contrast lavender text. Verify WCAG AA contrast for actual combinations.

## 3. Homepage structure and ready-to-use copy

Keep main marketing copy around 350 words or less, excluding form labels and privacy text. One page, one primary action. No long pricing grids or feature catalog.

### Header
foundos logo. One text link: How I help. Primary button: Get a free tech checkup.

### Hero
Eyebrow: LOCAL TECHNOLOGY HELP · MARIETTA, GA

H1: Less tech frustration. More time for your business.

Body: I'm Josh. I help local businesses with websites, customer inquiries, and everyday tasks that take too much time. Tell me what's getting in your way, and I'll suggest a practical next step.

Primary CTA: Get a free tech checkup
Secondary CTA: Text Josh
Reassurance: Personal advice. No obligation to hire me.

### How I can help
Heading: What's getting in your way?

Use three short rows, not a wall of six or nine service cards:

Your online presence — Websites, business listings, and local marketing.
Your customer experience — Inquiries, booking, ordering, and follow-ups.
Your everyday workload — Repetitive admin and tools that don't work well together.

Closing line: Not sure what you need? Start with the problem.

### Free takeaway
Heading: Useful advice, whether we work together or not.

Body: I'll review what you share and send a short digital page with what I'd address first, steps you can take yourself or pass to your current provider, and where I could help.

Optional line: Depending on the problem, that might include website fixes, a sample promotional post, or a simpler way to handle a task.

Three steps: Tell me what's frustrating → I review it personally → You receive practical next steps.

### Website option
Heading: Need a better website?

Body: If a new site makes sense, we can start with one free sample homepage. If you like the direction, we'll agree on the scope and price before the full build.

Do not turn this into a second competing funnel. It is an optional outcome of the conversation, not an automatic promise to every submission.

### About/contact
Heading: You'll work directly with Josh.

Body: I'm Josh Potesta, the founder of foundos. I'm based in Marietta and like helping local owners solve practical problems. If I'm not the right person for the job, I'll tell you.

Use a real supplied portrait only if available. No stock founder photo. Credentials may be added only after Josh confirms their exact names and current accuracy; they are not necessary to launch this direction.

### Form
Heading: What could work better in your business?

Intro: Tell me a little about your business and what's getting in your way. I'll review it personally and follow up with useful next steps.

Fields:
- Your name — required.
- Business name — required.
- Website or business profile — optional, with 'No website yet? Leave this blank.'
- What would you like help with? — required multiline field; allow 'I'm not sure—I'd like a fresh look.'
- How should I reach you? — Text or Email; reveal only the corresponding required contact field.

Avoid collecting both phone and email by default. No file upload or forced calendar booking. No long checklist of products to buy. A location field can be added later if genuinely needed; do not collect unnecessary data initially.

Consent text: By submitting, you agree that Josh may contact you about this request. This does not sign you up for marketing messages.

Button: Request my free tech checkup
Success: Thanks—your request is in. I'll review it personally and follow up using the contact details you shared.

Do not display an unapproved turnaround guarantee. Preserve form contents on errors. Offer the verified email and text links as a fallback.

### Footer
foundos · Josh Potesta · Marietta, GA
josh@foundos.ai · (404) 436-3393
Privacy link. Keep it short.

## 4. Digital takeaway format

Use the same brand for future personalized advice sheets. These are a later deliverable, not a requirement to build a full portal now.

Title: A few practical next steps for [Business]
Prepared by Josh at foundos · date
1. What you told me.
2. What I observed, distinguishing verified facts from things to confirm.
3. What I'd do first and why.
4. How you can do it yourself or pass it to your provider.
5. Where I can help, if you want support.
Footer: name, contact information, and link to foundos.ai.

Keep each sheet focused on one problem and up to three actions. Only include ads or mockups when useful. Do not promise a free website or a complete business audit. Avoid exposing customer details or internal business issues in public pages. Use private delivery or unguessable, noindex links with access controls appropriate to sensitivity; noindex alone is not privacy protection.

## 5. Telegram request workflow

Visitor submits → server validates → request is durably saved → notification is queued to Josh's private Telegram destination → Josh reviews → Josh sends the advice personally by the requested channel.

Notification: new checkup request, submission ID/date, person's name, business, website/profile if supplied, problem description, preferred contact method, contact detail. Do not include unnecessary technical visitor metadata.

Implementation requirements:
- Inspect the existing project and reuse its suitable stack, backend, and integrations. Do not switch frameworks or add a CRM just for this form.
- Store the Telegram bot token and chat ID in server-side environment configuration only. Never expose them in client code, logs, commits, or screenshots. Use the existing secure configuration if available; otherwise list the missing setup clearly and ask Josh to configure secrets securely.
- Validate lengths, contact formats, and URL schemes server-side. Escape submitted text before sending Telegram markup, or send plain text. Never fetch arbitrary submitted URLs in the request handler.
- Add a honeypot and rate limiting. Avoid requiring CAPTCHA unless spam warrants it.
- Use submission IDs and duplicate protection. Telegram retries must not generate duplicate records or endless notifications.
- Save before showing success. If persistence fails, return an honest error with fallback contact methods. If Telegram delivery fails after saving, retain and retry the notification; never lose a request silently.
- No automatic AI audit or automatic prospect outreach in the first version.
- Privacy notice must accurately explain collection, purpose, storage/providers including Telegram, and a contact for deletion requests. Define a retention approach with Josh; do not invent one as an existing policy.
- Testing must use synthetic details and an authorized test destination. A live Telegram test requires authorization for that destination; local mocked testing can cover initial development.

## 6. What to remove or revise

The reviewed site is food-business-specific, has a large service/pricing catalog, an instant-report promise, concept demos, and delivery guarantees. Replace the homepage emphasis with the conversation and personally reviewed checkup.

Remove from the new homepage: restaurant/food-truck-only positioning, instant ten-second report language, mandatory website-first purchasing, coming-soon product lists, automatic availability claims, blanket ranking/revenue claims, and unapproved build-time guarantees.

Do not silently change existing customer agreements or invent new prices. Existing prices on secondary pages must be confirmed with Josh before changing or promoting them. Review legacy routes and internal links; preserve useful pages or propose redirects before deleting anything. Existing demos can remain clearly labeled concepts on an optional work page, without crowding the homepage.

## 7. Implementation handoff prompt

Rebuild foundos.ai using this brief as the proposed product direction. First inspect the existing project, routes, styling, form handling, and integrations. Present a concise implementation plan and identify missing configuration. Preserve unrelated work. Build in a preview environment; do not deploy publicly until Josh approves the preview.

Deliver a minimal mobile-first homepage using the supplied copy and card-inspired tokens. Keep the business broad but concrete. Make the free personally reviewed tech checkup the main action. Build the durable form-to-Telegram notification flow described above. Do not replace functioning ordering, scheduling, or other integrations unnecessarily. Do not use fake testimonials, inflated metrics, invented client logos, or generated photos presented as real businesses.

Validate at 390px and desktop widths: no horizontal overflow, readable typography, keyboard navigation, visible focus, explicit field labels, accessible errors, and at least 44px tap targets. Verify email/text links and all form states. Test validation, duplicate submissions, persistence failure, and Telegram retry behavior. Do not claim notification delivery works until it has been verified with the configured authorized destination.

Use an accurate page title such as 'foundos | Local Technology Help in Marietta' and an honest description. Use only verified public business information in structured data; do not fabricate ratings, reviews, an office address, or hours.

Before presenting a rendered preview, run the applicable local taste-gate checks and visual review. Report what works, what configuration remains, and any unverified integration. The handoff brief itself is not a rendered site and has not been graded as one.

## 8. Acceptance criteria

A local owner can identify within a few seconds: who Josh is, examples of problems he helps with, what the free checkup includes, and how to request it. They understand that advice is useful even if they do the work themselves, and paid implementation starts only after scope and price are agreed. Every successful submission is saved and traceable. Josh receives or can recover the request even if Telegram is temporarily unavailable. The site stays concise and visually consistent with the business card.
