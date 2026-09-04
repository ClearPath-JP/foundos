# Site content — drafted 2026-09-03

Educational copy for the foundos homepage. Every number carries its source.
Written to be checkable by a restaurant owner with a phone, which is the point.

---

## Five things I check first.

_Every one of these takes about two minutes to check on your own phone. Do it standing in your dining room before you talk to anybody, me included._

### Your menu is a picture.

A PDF, or a photo of the printed menu taped onto a page. Google can't read the words inside either one, so the dishes in it don't come up when somebody searches for them by name. And a customer holding a phone at a red light has to pinch and drag around a page that was laid out for paper. Most of them give up and order somewhere else. Check it: open your menu on your phone and try to read a price without zooming.

### Google doesn't know when you're open.

Blank hours, or hours that were right two years ago. Someone drives fifteen minutes across town on a Sunday and finds the lights off. You lost that customer and you'll probably read about it in a review. There's a quieter cost too. With no hours on file you fall out of Google's "Open now" filter, so you don't come up at all for the person searching at 9pm for somewhere still serving. Check it: search your own name on your phone. The hours sit right under it. Look at the holidays as well.

### Nobody can tap to call you.

Your number sits on the page as plain text. On a phone that means copying it by hand and pasting it into the dialer. Sounds like nothing. It's the easiest thing a hungry person can do and your site makes them work for it. Check it: pull your site up on your phone and tap the number. If nothing happens, there's your answer.

### Every online order goes through an app.

DoorDash, Uber Eats, Grubhub, Slice. If the only order button on your site sends people to one of those, a cut of every ticket leaves the building before you've paid for the chicken. The bigger loss is quieter. The app knows who ordered and how to reach them. You don't, so you can't text that person about Tuesday. Check it: tap your own order button and see whose logo you land on.

### The site loads fine at your desk and nowhere else.

On your office wifi it opens instantly. On a phone with two bars in a parking lot it's a white screen for six seconds, and people don't wait out white screens. When I check a site I count anything past three seconds as a problem, and if it hasn't loaded in eight I treat it as down. It's almost always one enormous background photo nobody ever resized. Check it: turn wifi off on your phone and count out loud while your own site loads.

**Numbers used**

| Value | Claim | Confidence | Source |
|---|---|---|---|
| `three seconds` | "I count anything past three seconds as a problem" — his own slow-site threshold | verified-in-repo | C:/Dev/ClearPath/foundos/src/lib/report/findings.ts line 18: const SLOW_MS = 3000; |
| `eight seconds` | "if it hasn't loaded in eight I treat it as down" — the point his fetch aborts | verified-in-repo | C:/Dev/ClearPath/foundos/src/lib/report/site-checks.ts: const TIMEOUT_MS = 8000; (failure string: "Your site didn't finish loading within 8 seconds.") |
| `six seconds` | illustrative — what a slow site feels like on a weak signal | uncertain | Josh's own brief to me: "a site that takes six seconds on a phone on a car-park signal." Framed as a scenario, not measured about the reader. |
| `DoorDash, Uber Eats, Grubhub, Slice` | the marketplaces his audit actually looks for in a site's outbound links | verified-in-repo | MARKETPLACE_HOSTS in C:/Dev/ClearPath/foundos/src/lib/report/site-checks.ts |

**Framing risks handled**

- Every lead makes a claim about the reader's own business ("your menu is a picture"), and for some owners it'll be wrong. Handled by the heading: "Five things I check first" frames them as items on a checklist, not accusations, and every block ends with a check the owner can run in two minutes to see for themselves. Nobody has to take his word for any of it.
- The delivery-app block could read as "the apps are stealing from you," which memory flags as a losing line (commission gets passed to the customer). Avoided: no accusation, no percentage, no villain. The sentence stays on "a cut of every ticket leaves the building" (his own copy) and then moves the weight onto the customer list, which is the part that is unambiguously true and that owners rarely think about.
- "Google can't read a PDF" is an overclaim if stated absolutely, since Google does partially index PDF text. Softened to "the dishes in it don't come up when somebody searches for them by name," which is true in practice for menu layouts and is fully true for photos.
- Zero implication of a client base. "When I check a site" is honest — he built and runs the audit tool that does exactly that. No "my clients," no "most owners I work with," no testimonial, no case study, no counts.
- No statistic anywhere, including the ones sitting in his own knowledge library (46% of searches are local, ~30% of business lost, DoorDash orders ~15% higher). All three are second-hand YouTube or vendor-marketing claims. An owner who pushes back on a number he can't source loses him the room, and the recognition does the work without them.
- "Check it:" repeats identically five times. That's deliberate — it's a functional label that gives the section a spine and matches the uniform lead-in pattern already used in the BUILDS list on his homepage. Five different cute variants would read more written, not less.
- Every claim here is one he can defend standing in front of an owner, because every one of them maps to a check his own code performs.

---

## About the delivery apps

_You already know about the commission. So I'll skip that part and go to the ones that cost you more._

### Your app price is the only price a lot of people have ever seen

When the apps take their cut, most owners do the sensible thing and raise the price on the app to cover it. Nothing wrong with that. But think about who is actually reading that number.

Somebody who found you on DoorDash has never stood in your dining room. They have never seen the menu on your wall. They have no second number to compare against. That is just what your food costs, as far as they know.

There is a Jamaican place near me here in Atlanta. Oxtail runs $31.99 on DoorDash. The same plate is around $18 at the counter. I checked both in August. Nobody in that kitchen is overcharging anyone, and the owner is the one printing the cheaper number. But plenty of people scrolling that app have quietly filed him under expensive, and he will never hear about it. That is the loss. It does not show up on any statement.

### Marking it up gets you less back than it looks like

This is the part I would want to know if it were my place. The commission comes off the subtotal on the app, and the subtotal is your marked up price, not your counter price. So the markup raises the fee along with it.

Say a plate is $18 in your restaurant and you list it at $24 on the app to cover the cut. On the 30% plan you keep $16.80 of that $24. The customer paid six dollars more than your regular price, and you finished a dollar twenty under it.

Run the same plate on the 15% plan and you keep $20.40. Now you are $2.40 ahead and the markup did its job.

Same menu, same markup, opposite outcome. The plans run from about 15% up to 30% depending on which one you signed, so that one number decides whether any of this works.

### You never get the phone number

On a delivery order you get a first name and a masked number that stops working once the driver is gone. No email you can write to. No number you can text on a slow Tuesday.

The app has all of it.

So a regular you earned through the app still has to be bought back from the app on the next order, and the one after that, for as long as they keep eating your food. You did the work of turning a stranger into a regular. You are renting them back by the plate.

### Two things worth checking on your own phone tonight

Both are free and neither one involves me.

Pull up your own listing on the app and set it next to your printed menu. Read down the two columns. I would bet you set those app prices once when you signed up and have not looked at them side by side since.

Then open your merchant portal and find your actual commission rate. Not what you think it is. The number on the plan you are on right now. Everything above runs on that one figure, so find it before you believe anybody's math about your restaurant. Mine included.

### I'm not going to tell you to leave the apps

They are the best discovery tool a small restaurant has ever had. Somebody who has never heard of you scrolls past your photo at nine at night and orders. Keep that.

What I build is the other lane. Ordering that lives on your own site, at your counter prices. The kitchen ticket prints the same way it does now. The customer's name and number land somewhere you own.

Then the people who already love you have a door that does not take a cut of every plate. And the app goes back to the job it is genuinely good at, which is introducing you to strangers.

**Numbers used**

| Value | Claim | Confidence | Source |
|---|---|---|---|
| `$31.99` | Oxtail on DoorDash at a real Atlanta-area Jamaican restaurant | verified-in-repo | C:/Dev/ClearPath/client-sites/caribbean-spice/README.md — Josh's own audit, re-verified 2026-08-08. The README itself warns: re-check and screenshot the DoorDash price before using it, because an undated delivery-price claim is the first thing an owner challenges. |
| `about $18` | The same oxtail plate at the counter, in store | verified-in-repo | C:/Dev/ClearPath/client-sites/caribbean-spice/research/NEXT-STEPS.md — their menu recorded as "Oxtail ~$18"; also stated in README.md as the direct price in the price-compare block. |
| `15% to 30%` | The range of delivery-app commission plans a restaurant can be on | widely-published | C:/Users/jpote/.claude/projects/C--Dev-ClearPath-foundos/memory/reference_market_pricing.md (competitor pricing researched 2026-08-02, listed as "DoorDash / Uber Eats: 15–30% commission"). Independently, DoorDash publishes three US marketplace partnership tiers at 15%, 25% and 30%. Also used in Josh's Williamson Bros email and Caribbean Spice pitch, flagged there as "verified competitor pricing, safe to say out loud." |
| `$18 / $24 / $16.80 / $1.20` | Worked example: an $18 plate listed at $24 on the app nets $16.80 on the 30% plan, which is $1.20 under the counter price | widely-published | Arithmetic on a hypothetical plate, labeled as an example in the copy. 24 x 0.70 = 16.80. 18 - 16.80 = 1.20. The only external input is the 30% plan rate above. The mechanism (commission is charged on the order subtotal as listed on the app, i.e. the marked-up price) is published in DoorDash merchant documentation. |
| `$20.40 / $2.40` | Same $24 listing on the 15% plan nets $20.40, which is $2.40 above the counter price | widely-published | Arithmetic. 24 x 0.85 = 20.40. 20.40 - 18 = 2.40. Included deliberately so the section shows the case where the markup does work, rather than only the bad one. |

**Framing risks handled**

- "You're telling me to drop the apps." The last block concedes discovery outright and tells him to keep them, before it says a word about what Josh builds. This is Josh's own written objection handler ("Keep it for discovery") from the Caribbean Spice pitch doc.
- "You think I'm getting robbed / you think I'm a sucker." The copy explicitly calls the markup "the sensible thing" and says nobody in that kitchen is overcharging anyone. The word stealing never appears. This is the trap flagged in SCOREBOARD.md and in Josh's memory notes, and it is the one that loses the room.
- "Those are somebody else's numbers." The oxtail figures are attributed to a specific place at a specific month, and the $18/$24 example is written as a hypothetical plate, never as his books. The last block hands him the check to run himself and says "before you believe anybody's math about your restaurant, mine included" — which converts the credibility risk into the strongest line in the section.
- "What would you know, you've never run a restaurant." Every claim is either something Josh looked up with his own phone, published plan pricing, or arithmetic. No claim requires operating experience, and none requires a client.
- LIVE PRICE STALENESS — the real one. $31.99 was checked in August 2026 and it is a third-party price that can change any day. Caribbean Spice's own README already carries this warning. Before this ships, re-open that DoorDash listing, confirm the number, and screenshot it. If it has moved, swap in the current figure and change the month. If it can't be re-verified, cut the two prices and the block still stands on the perception argument alone.
- NAMING THE RESTAURANT — do not. The copy says "a Jamaican place near me here in Atlanta." Naming them publicly would burn a live prospect (they are #3 on the scoreboard) and put a public price accusation next to a business he has no relationship with. Keep it anonymous.
- "Commission isn't the only fee." True. There are per-order and processing fees on top depending on the setup, so the worked example understates the gap rather than overstating it. Safe direction to be wrong in, and no claim in the copy says the commission is the whole cost.
- "I do get some customer data." Merchant portals do surface aggregate insights, so the copy is careful to claim only what is specifically true: a first name and a masked number that stops working. It never says he gets nothing.
- NO PRICE ANYWHERE. reference_market_pricing.md is explicit that foundos.ai should carry no prices until client #3, and it contradicts the qualify-first sales method. This section names no dollar figure of Josh's.

---

## How a stranger becomes a regular.

_There are four steps, and every one of them is a place you can lose somebody. None of this is complicated. It's just usually nobody's job._

### Somebody two miles from you is hungry right now and has never heard of you.

They're not comparing you to anybody. They don't know you exist. Before you spend a dollar telling them, the free version has to be working: whether your Google listing is right, whether the hours are right, whether the photos are yours and recent, whether you're even filed under the right category. That's what somebody two miles out sees first. It costs nothing but the work, so it's where I start.

### They found you, and now they're picking between you and the place next door.

This happens on a phone and it's over in seconds. They look at your photos. They check how many stars you've got. They tap the menu and find out whether it opens or whether it's a PDF that loads sideways. Nothing about your cooking is involved yet, which is the frustrating part, because the cooking is the thing you're actually good at. So I rebuild the menu as a real page, get current photos on it, and set the review requests to go out on their own so your rating isn't just whoever was annoyed enough to type something.

### They want it. Ordering is the last thing in the way.

Ten seconds or three minutes. That's the whole difference, and it gets decided by things that sound too small to matter. A checkout that demands an account. A phone number that doesn't dial when you tap it. An app taking a cut of a ticket your own site could have taken for free. I put ordering and payment on your site so the order comes to you and the money stays yours. If they'd rather talk to somebody, the AI picks up, takes the order, and nobody sits on hold.

### They came once. Can you reach them again?

You already paid to get them in the door. Getting them back costs almost nothing by comparison, and it's still the step that gets put off, because nothing breaks when you skip it. So here's the plain version of the question. Do you have their number? If somebody ordered from you in March and hasn't been back since, is there anything at all that reminds them you exist? I set up the review ask and the win-back text, and the list that makes either of them possible.

### Those four words an ad guy will say at you.

Awareness, consideration, conversion, retention. That's all they mean. You already run most of it in your head every service. You just don't have anything set up to keep doing it while you're on the line.

### Where I actually am with ads.

I don't run ads. I'm studying for Meta's media buying certification, the 410-101, and I haven't sat the exam yet. I've never managed a dollar of anybody else's ad spend. When that changes I'll put it on this page.

Here's why I'm telling you instead of quietly leaving it off. An ad is a bill you pay to send people somewhere. If the place you're sending them doesn't open the menu or take an order, the ad just buys you a faster way to lose them. Steps two, three and four are the thing an ad lands on, and that's the part I build. Get those right and step one turns into a decision you make later with real numbers, instead of a guess you pay for every month.

The report at the top of this page grades you on the first two steps. Takes about ten seconds.

**Numbers used**

| Value | Claim | Confidence | Source |
|---|---|---|---|
| `410-101` | The exam he's studying for is Meta's Blueprint Media Buying Professional certification | widely-published | JP's cert plan note (Meta Blueprint Media Buying Professional 410-101, decided 2026-08-18); the code is published in Meta's own certification catalog |
| `about ten seconds` | How long the instant report takes | verified-in-repo | C:/Dev/ClearPath/foundos/src/components/report/InstantReport.tsx:292 — "Free · about 10 seconds · no email" |
| `first two steps` | The report covers awareness and consideration | verified-in-repo | C:/Dev/ClearPath/foundos/src/app/page.tsx §2.4 — "I'll pull your Google listing and your site"; listing = step one, site = step two |
| `two miles` | Distance of a hungry stranger who hasn't heard of you | uncertain | Illustrative. Not a claim, no statistic implied. Mirrors the brief's own framing. |
| `ten seconds or three minutes` | The gap between fast and slow ordering | uncertain | Illustrative contrast, not a benchmark. Deliberately not framed as research. |
| `March` | A customer who ordered once and hasn't returned | uncertain | Illustrative month. Not a data point. |

**Framing risks handled**

- "So he can't actually run ads?" — the obvious pushback. The copy doesn't dodge it, it answers it in the same breath: he says plainly what he hasn't done, then makes the stronger argument (an ad lands on something, and he builds the something). Admitting it first removes the prospect's chance to catch him, which is the whole point of the section.
- Reading as a marketing lecture. Every stage is anchored to a physical thing an owner has actually seen — a menu that loads sideways, a phone number that won't dial, a customer from March. The jargon block deflates the vocabulary rather than performing it, and it lands AFTER the four stages so the owner already knows the idea before he's handed the words.
- Implying a client base. Checked line by line: no "my clients", no "owners I work with", no results, no "most restaurants find". Every capability claim is present-tense about what he builds, not past-tense about what it did for someone. "I've never managed a dollar of anybody else's ad spend" is the only performance claim on the page and it's a negative one.
- Undercutting himself. "I don't run ads" could read as a gap. It's carried by "When that changes I'll put it on this page" — that reads as somebody with a plan and a date, not somebody apologizing.
- PLACEMENT: this belongs directly after §2.5 (What I build), before §2.6 (Open something I've built). It explains why the §2.5 list is the list it is, and it closes by pointing back up to the audit box, which matches the page's own standing rule that everything below §2.4 is a reason to come back up and type. Do NOT put it near §2.8 — sitting next to prices, the ads paragraph starts reading like a service he's quoting for.
- No price strings. §2.8 owns the numbers and page.tsx rule 3 bans dollar signs outside PRICES, so this section deliberately carries none.
- Heading shape: the existing h2s are sentence case ending in a period ("What I build.", "What it costs."). "How a stranger becomes a regular." matches. The six lead-ins should render as the §2.5 pattern (bold lead-in, plain sentence) but as a bold line ABOVE the body, not joined by an em dash — that's what keeps the em-dash count at zero.
