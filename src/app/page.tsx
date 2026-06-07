'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CAL = 'https://calendly.com/josh-potesta';
const EMAIL = 'hello@foundos.ai';

const btnPrimary =
  'inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors';
const btnGhost =
  'inline-block border border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-900 transition-colors';

/* Feature row with an indigo check (left-aligned, used inside cards) */
function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="text-indigo-600 font-bold mt-0.5 shrink-0">✓</span>
      <span>{children}</span>
    </li>
  );
}

/* Numbered step badge */
function StepNum({ n }: { n: string }) {
  return (
    <span className="shrink-0 w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
      {n}
    </span>
  );
}

export default function FoundosLanding() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const reduce = useReducedMotion();

  // No backend yet: open the visitor's email client pre-filled instead of
  // faking a "sent" confirmation that goes nowhere.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('foundos.ai inquiry');
    const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const heroAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  const cardHover = reduce ? undefined : { y: -4 };
  const cardBase =
    'border border-gray-200 rounded-2xl p-7 space-y-3 bg-white text-left transition-shadow hover:shadow-md';

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="text-2xl font-bold tracking-tight">
            foundos<span className="text-indigo-600">.ai</span>
          </a>
          <a
            href={CAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Book a call →
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20 sm:py-28 space-y-24 sm:space-y-32">

        {/* Hero (centered, soft indigo glow on desktop) */}
        <motion.section
          {...heroAnim}
          id="top"
          className="relative text-center max-w-3xl mx-auto space-y-6 pt-2 sm:pt-8 scroll-mt-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-140px] -translate-x-1/2 h-[460px] w-[820px] max-w-[130vw] rounded-full bg-indigo-100/40 blur-3xl -z-10"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            AI automation for service businesses
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.08] tracking-tight">
            🎯 What is foundos.ai?
          </h1>
          <p className="text-xl leading-relaxed text-gray-700 max-w-2xl mx-auto">
            I help service business owners automate their operations so their business runs on its own and they get their time back.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            You own a gym, studio, coaching practice, or salon. You're working 60-hour weeks because your business needs you every day. Emails. Bookings. Follow-ups. Upsells. Member retention. It never stops.
          </p>
          <p className="text-2xl sm:text-3xl leading-snug font-bold text-gray-900 pt-1">
            foundos.ai fixes this.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            We audit your current software. We lower your costs. We connect your tools. We deploy an AI agent that runs your business 24/7. Your revenue grows. Your hours shrink.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <a href={CAL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Book a 20-min call
            </a>
            <a href="#how-it-works" className={btnGhost}>
              See how it works
            </a>
          </div>
        </motion.section>

        {/* Philosophy (centered) */}
        <motion.section {...reveal} className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">🧠 My Philosophy</h2>
          <p className="text-xl font-semibold text-gray-900 leading-relaxed">
            Systems run businesses. AI runs systems. Automation is freedom.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            I believe the best business is one that doesn't need you every day. Not because you built something and walked away—but because you built <em>systems</em> that make good decisions without you.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            I'm obsessed with clarity. With leverage. With doing less but getting more.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            Most business owners are trapped in urgency. Responding to emails. Putting out fires. Never building. I think that's broken.
          </p>
          <p className="text-lg leading-relaxed text-gray-900 font-semibold">
            Your business should serve you. Not the other way around.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">I built foundos.ai to change that.</p>
        </motion.section>

        {/* The Problem (centered) */}
        <motion.section {...reveal} id="problem" className="text-center max-w-2xl mx-auto space-y-6 scroll-mt-24">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">😫 The Problem (You Probably Know It)</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            You're paying for 5 different software subscriptions that don't talk to each other.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            Your booking system doesn't trigger your payment system. Your payment system doesn't trigger your email system. Nothing is orchestrated. So you're manually doing what should be automated.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            You're also leaving money on the table. Member books a class but forgets to show up? No proactive reminder. Member has 10 sessions left? No upsell. New member signs up? No personalized welcome.
          </p>
          <p className="text-xl leading-relaxed font-bold text-red-600 pt-2">
            Result: You work 60 hours. Make less than you should. Spend more on software than you need to.
          </p>
          <p className="text-lg leading-relaxed text-gray-900 font-semibold">It's fixable.</p>
        </motion.section>

        {/* How It Works (grid on desktop) */}
        <motion.section {...reveal} id="how-it-works" className="space-y-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">✅ Here's How foundos.ai Works</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div whileHover={cardHover} className={cardBase}>
              <div className="flex items-center gap-3">
                <StepNum n="1" />
                <h3 className="text-lg sm:text-xl font-bold leading-tight">Audit (We Show You What You're Missing)</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We look at your current software stack. We map your manual workflows. We calculate:
              </p>
              <ul className="space-y-2 text-gray-700">
                <Feature>How much you're overpaying</Feature>
                <Feature>How much revenue you're leaving on the table</Feature>
                <Feature>How many hours you're wasting</Feature>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                You get a report. Numbers. Real savings. Real opportunities.
              </p>
            </motion.div>

            <motion.div whileHover={cardHover} className={cardBase}>
              <div className="flex items-center gap-3">
                <StepNum n="2" />
                <h3 className="text-lg sm:text-xl font-bold leading-tight">Integration (We Connect Your Tools)</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We don't replace your booking system or payment processor. We integrate them.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your Mindbody + Square + email all talk to each other now. Data flows. Automations trigger.
              </p>
            </motion.div>

            <motion.div whileHover={cardHover} className={cardBase}>
              <div className="flex items-center gap-3">
                <StepNum n="3" />
                <h3 className="text-lg sm:text-xl font-bold leading-tight">Agent Deployment (We Automate Your Growth)</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">An AI agent learns your business. It makes smart decisions 24/7:</p>
              <ul className="space-y-2 text-gray-700">
                <li>💬 "This member hasn't shown up in 2 weeks. Send them a personalized re-engagement message."</li>
                <li>💰 "This person is ready for a PT upsell. Pitch them the 3-session package."</li>
                <li>📈 "Your Wednesday class is at 60% capacity. Recommend a friend gets free week."</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                The agent is your invisible employee. Running your business while you sleep.
              </p>
            </motion.div>

            <motion.div whileHover={cardHover} className={cardBase}>
              <div className="flex items-center gap-3">
                <StepNum n="4" />
                <h3 className="text-lg sm:text-xl font-bold leading-tight">Optimization (We Track What Works)</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You get a dashboard. Real data. What automations made you the most money? What upsells converted? What retention tactics worked?
              </p>
              <p className="text-gray-600 leading-relaxed">We optimize based on results. Not guesses.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Pricing (grid on desktop) */}
        <motion.section {...reveal} id="pricing" className="space-y-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">💰 Pricing</h2>
            <p className="text-lg text-gray-600">Choose what fits your business.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-start text-left">
            <motion.div whileHover={cardHover} className="border border-gray-200 rounded-2xl p-8 space-y-5 bg-white transition-shadow hover:shadow-md">
              <h3 className="text-2xl font-bold">Starter: $99/month</h3>
              <p className="text-gray-600">For the owner testing it out.</p>
              <ul className="space-y-3 text-gray-700">
                <Feature>Integration of your existing tools</Feature>
                <Feature>Basic automations (reminders, follow-ups)</Feature>
                <Feature>Unified dashboard</Feature>
                <Feature>Email support</Feature>
              </ul>
              <p className="text-sm text-gray-500"><strong>Best for:</strong> Solo operators, simple workflows, tight budget.</p>
            </motion.div>

            <motion.div whileHover={cardHover} className="relative border-2 border-indigo-600 rounded-2xl p-8 space-y-5 bg-indigo-50/40 shadow-sm transition-shadow hover:shadow-lg">
              <span className="absolute -top-3 left-8 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
              <h3 className="text-2xl font-bold">Professional: $249/month</h3>
              <p className="text-gray-600">For the owner ready to scale.</p>
              <ul className="space-y-3 text-gray-700">
                <Feature>Everything in Starter +</Feature>
                <Feature>Smart Agent (personalization, recommendations)</Feature>
                <Feature>Revenue tracking (see what's making money)</Feature>
                <Feature>Lead capture + nurture automation</Feature>
                <Feature>Priority support</Feature>
              </ul>
              <p className="text-sm text-gray-500"><strong>Best for:</strong> Growing business, want automation to drive revenue.</p>
              <p className="text-base font-semibold text-gray-900">This is where most owners land. This is where the magic happens.</p>
            </motion.div>

            <motion.div whileHover={cardHover} className="border border-gray-200 rounded-2xl p-8 space-y-5 bg-white transition-shadow hover:shadow-md">
              <h3 className="text-2xl font-bold">Founder: $499/month</h3>
              <p className="text-gray-600">For the owner ready to go all-in.</p>
              <ul className="space-y-3 text-gray-700">
                <Feature>Everything in Professional +</Feature>
                <Feature>Personal Agent (trained on your business)</Feature>
                <Feature>Custom workflows (built specifically for you)</Feature>
                <Feature>Quarterly strategy calls with me</Feature>
                <Feature>Direct access (text/Slack when you need me)</Feature>
              </ul>
              <p className="text-sm text-gray-500"><strong>Best for:</strong> Serious operator, complex business, ready to scale hard.</p>
            </motion.div>

            <motion.div whileHover={cardHover} className="border border-gray-200 rounded-2xl p-8 space-y-5 bg-white transition-shadow hover:shadow-md">
              <h3 className="text-2xl font-bold">Custom Agent: $1,400 setup + $499/month</h3>
              <p className="text-gray-600">For the owner who wants a true operating system.</p>
              <ul className="space-y-3 text-gray-700">
                <Feature>Everything above +</Feature>
                <Feature>Deep business analysis (40+ hours understanding your model)</Feature>
                <Feature>Agent trained on your specific data + strategy</Feature>
                <Feature>Custom decision logic tailored to your business</Feature>
                <Feature>Monthly optimization + strategy</Feature>
                <Feature>Ongoing evolution as your business grows</Feature>
              </ul>
              <p className="text-sm text-gray-500"><strong>Best for:</strong> High-revenue business, want me involved in your growth.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* About (centered) */}
        <motion.section {...reveal} id="about" className="text-center max-w-2xl mx-auto space-y-6 scroll-mt-24">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">👋 About Me</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            I'm Josh. 19-year-old founder building operating systems for service businesses.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            I believe most business owners are working too hard for what they're making. I think that's fixable with the right systems + the right AI.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            I've been building for service businesses (gyms, studios, salons, coaches) for the past few years. Every business has the same problem: they're too dependent on their owner. I solve that.
          </p>
          <p className="text-lg leading-relaxed text-gray-900 font-semibold">
            My philosophy: Clarity is power. Systems are leverage. Automation is freedom.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            I'm also a martial artist, salsa dancer, and obsessed with Stoic philosophy. I think like a systems builder. I operate like an entrepreneur. I coach like a martial artist—focus on the fundamentals, iterate relentlessly, never stop improving.
          </p>
        </motion.section>

        {/* How to Start (two columns on desktop) */}
        <motion.section {...reveal} id="start" className="space-y-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">🚀 How to Start</h2>
            <p className="text-lg text-gray-600">Super simple.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">Option 1: Book a Meeting</h3>
              <p className="text-lg leading-relaxed text-gray-600">
                Let's talk about your business for 20 minutes. No sales pitch. Just clarity on what foundos.ai could do for you.
              </p>
              <a href={CAL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                Book a 20-min call
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">Option 2: Send Me a Message</h3>
              <p className="text-lg leading-relaxed text-gray-600">
                Tell me what you do + what takes the most time. This opens your email so you can send it straight to me — I'll respond with next steps.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
                <textarea
                  placeholder="What you do + what takes the most time..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* Contact (centered) */}
        <motion.section {...reveal} id="contact" className="text-center max-w-2xl mx-auto space-y-6 scroll-mt-24">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How to Reach Me</h2>
          <div className="space-y-3 text-lg">
            <p>
              <strong>Instagram:</strong>{' '}
              <a
                href="https://instagram.com/josh.potesta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline hover:text-indigo-800"
              >
                @josh.potesta
              </a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@foundos.ai" className="text-indigo-600 underline hover:text-indigo-800">
                hello@foundos.ai
              </a>
            </p>
          </div>
          <p className="text-lg text-gray-600">Pick whichever you prefer. I read everything and respond fast.</p>
        </motion.section>

        {/* Final Thought (centered) */}
        <motion.section {...reveal} className="text-center max-w-3xl mx-auto space-y-5 border-t border-gray-100 pt-16">
          <p className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
            Your business should work for you.
          </p>
          <p className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
            Not the other way around.
          </p>
          <p className="text-xl font-semibold text-gray-600 pt-2">Let's build that together.</p>
          <p className="text-xl text-gray-600">— Josh</p>
        </motion.section>
      </main>
    </div>
  );
}
