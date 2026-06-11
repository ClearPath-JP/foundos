/**
 * Shared, single-source-of-truth copy for all foundos.ai landing-page
 * design explorations under /explore/*.
 *
 * Every direction imports from here so the *content* (offer, pricing, steps)
 * stays truthful and identical — only the *design* changes between them.
 */

export const CAL = "https://calendly.com/josh-potesta";
export const EMAIL = "hello@foundos.ai";
export const IG = "https://instagram.com/josh.potesta";
export const IG_HANDLE = "@josh.potesta";

export const brand = {
  name: "foundos",
  tld: ".ai",
  full: "foundos.ai",
};

/** A few interchangeable hero headlines (directions pick what fits). */
export const heroline = {
  eyebrow: "AI automation for service businesses",
  // outcome-first
  headline: "Your business runs itself.",
  headlineAccent: "You get your time back.",
  // verbs that the agent does — good for morphing / rotating text
  rotating: ["books clients", "follows up", "upsells", "retains members", "never sleeps"],
  sub: "foundos.ai is the AI operating system for gyms, studios, salons, and coaches. I automate the repetitive work — bookings, follow-ups, upsells, retention — so your business runs 24/7 without you.",
  ctaPrimary: "Book a 20-min call",
  ctaSecondary: "See the 4-step system",
  reassure: "No pitch. No commitment. I'll tell you honestly if it's a fit.",
};

export const problem = {
  title: "You didn't start a business to become its employee.",
  body: [
    "You own a gym, studio, coaching practice, or salon — and you're working 60-hour weeks because the business needs you every day. Emails. Bookings. Follow-ups. Upsells. Retention. It never stops.",
    "You're paying for 5 different tools that don't talk to each other. Your booking system doesn't trigger your payments. Your payments don't trigger your emails. Nothing is orchestrated — so you do by hand what should be automatic.",
    "And you're leaving money on the table. A member no-shows? No reminder. Someone's down to their last sessions? No upsell. New sign-up? No welcome.",
  ],
  punch: "You work 60 hours, make less than you should, and spend more on software than you need to.",
  fix: "All of it is fixable — and it doesn't mean ripping out what you already use.",
};

export type Step = {
  n: string;
  title: string;
  short: string;
  body: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Audit",
    short: "I show you what you're missing.",
    body: "I map your software stack and your manual workflows, then put real numbers on it: how much you're overpaying, how much revenue is slipping, how many hours you're losing. You get a report — not a guess.",
  },
  {
    n: "02",
    title: "Integrate",
    short: "I connect the tools you already use.",
    body: "No rip-and-replace. Your booking, payments, and email finally talk to each other. Data flows. Automations trigger. The stack you already pay for starts working as one system.",
  },
  {
    n: "03",
    title: "Deploy the agent",
    short: "I automate your growth.",
    body: "An AI agent learns your business and makes smart calls 24/7: re-engage the member who's gone quiet, pitch the upsell to the person who's ready, fill the class that's half empty. Your invisible employee, working while you sleep.",
  },
  {
    n: "04",
    title: "Optimize",
    short: "I track what actually makes money.",
    body: "You get a dashboard of real results — which automations earned, which got ignored. Every 30 days I cut the losers and double down on the winners. I optimize on revenue, not vibes.",
  },
];

/** Sample agent "decisions" — great for a console / chat motif. */
export const agentMessages = [
  { icon: "💬", text: "This member hasn't shown up in 2 weeks. Sending a personal re-engagement message." },
  { icon: "💰", text: "This client is ready for a PT upsell — pitching the 3-session package." },
  { icon: "📈", text: "Wednesday's 6pm class is at 60%. Offering a bring-a-friend free week." },
  { icon: "🔁", text: "Membership renews in 3 days. Confirmed payment method on file, reminder sent." },
];

export const integrations = [
  "Pike13", "Mindbody", "Square", "Toast", "Stripe", "Google",
  "Calendly", "Mailchimp", "QuickBooks", "Acuity", "Vagaro", "Twilio",
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  best: string;
  popular?: boolean;
  cta: string;
  /** value anchor — ties the price to a concrete ROI */
  anchor?: string;
  /** true for the bespoke tier shown as a "let's talk" callout, not a card */
  bespoke?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "$99",
    cadence: "/month",
    tagline: "For the owner testing it out.",
    features: [
      "Website setup or migration",
      "Integration of your existing tools",
      "Basic automations (reminders, follow-ups)",
      "Unified dashboard",
      "Email support",
    ],
    best: "Solo operators, simple workflows, tight budget.",
    anchor: "Usually pays for itself by saving one member from quietly canceling.",
    cta: "Book a call",
  },
  {
    name: "Professional",
    price: "$249",
    cadence: "/month",
    tagline: "For the owner ready to scale.",
    features: [
      "Everything in Starter, plus:",
      "Custom website — built or redesigned",
      "Smart Agent (personalization, recommendations)",
      "Revenue tracking — see what's making money",
      "Lead capture + nurture automation",
      "Priority support",
    ],
    best: "Growing business that wants automation driving revenue.",
    anchor: "Most owners recover this in a single saved member or recovered upsell each month.",
    popular: true,
    cta: "Book a call",
  },
  {
    name: "Founder",
    price: "$499",
    cadence: "/month",
    tagline: "For the owner going all-in.",
    features: [
      "Everything in Professional, plus:",
      "Personal Agent trained on your business",
      "Custom workflows built specifically for you",
      "Quarterly strategy calls with me",
      "Direct access (text/Slack when you need me)",
    ],
    best: "Serious operator, complex business, ready to scale hard.",
    anchor: "Built for owners adding $5k+/mo — where one automation pays the whole plan.",
    cta: "Book a call",
  },
  {
    name: "Custom Agent",
    price: "$1,400",
    cadence: "setup + $499/mo",
    tagline: "For the owner who wants a true operating system.",
    features: [
      "Everything above, plus:",
      "Deep business analysis (40+ hrs on your model)",
      "Agent trained on your specific data + strategy",
      "Custom decision logic for your business",
      "Monthly optimization + strategy",
      "Ongoing evolution as you grow",
    ],
    best: "High-revenue business that wants me involved in the growth.",
    cta: "Let's talk",
    bespoke: true,
  },
];

/** Risk-reversal line — repeat near CTAs. */
export const guarantee =
  "If our first call doesn't surface something worth automating, we part as friends — no pitch, no pressure.";

/**
 * Honest trust band for a brand-new founder with no clients yet.
 * Builds belief WITHOUT fabricated testimonials. Swap `slots` for real
 * client results the moment they exist.
 */
export const trust = {
  eyebrow: "Why work with me now",
  title: "That agent? It's what I'm building for my first founding clients.",
  // NOTE for Josh: confirm these two numbers before this goes live.
  scarcity: "Taking 5 founding clients this quarter",
  sub: "foundos.ai is new — and being early is the advantage. Founding clients get more of my time, founding pricing locked in for good, and a partner who treats your results like my reputation is on the line. Because it is.",
  promises: [
    {
      title: "A real guarantee",
      body: "If the first call doesn't surface something worth automating, we're done — no pitch, no pressure, no follow-up spam.",
    },
    {
      title: "Live in about two weeks",
      body: "I handle the setup — the audit, the integrations, the automations. You keep running your business while it gets built.",
    },
    {
      title: "You own everything",
      body: "Your website, your data, your automations are yours. Cancel anytime and you keep what we built.",
    },
    {
      title: "Direct access to me",
      body: "No support tickets, no offshore team. You work directly with Josh, the person who builds and runs it.",
    },
  ],
  // When real results exist, fill these and render them as testimonial cards.
  slots: [] as { quote: string; name: string; business: string; stat: string }[],
};

export const about = {
  name: "Josh",
  photo: "/josh.png",
  lines: [
    "I'm Josh. I build operating systems for service businesses — gyms, studios, salons, coaches.",
    "Most owners are trapped: working 60-hour weeks because the business needs them every day. Nothing is automated, nothing talks to anything else. So they do by hand what should be orchestrated.",
    "I fix that. I audit your stack, consolidate your tools, and deploy an AI agent that makes smart decisions 24/7 — reminders, personalized upsells, retention, revenue. Your business runs while you sleep.",
    "I care about one thing: getting you more revenue and more of your time back. Not features, not buzzwords — results you can see in your dashboard.",
  ],
  kicker: "Your business should work for you. Not the other way around.",
  signoff: "— Josh",
};

export const closing = {
  title: "Ready to get your time back?",
  sub: "A 20-minute call. I'll tell you exactly what I'd automate first — no pitch.",
  cta: "Book your free 20-min call",
  reassure: "No pitch. No obligation. If I can't help you, I'll tell you.",
};
