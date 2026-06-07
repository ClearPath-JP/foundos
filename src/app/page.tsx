'use client';

import React, { useState } from 'react';

export default function FoundosLanding() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold">foundos.ai</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-12 space-y-12">

        {/* Hero */}
        <section className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            🎯 What is foundos.ai?
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            I help service business owners automate their operations so their business runs on its own and they get their time back.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            You own a gym, studio, coaching practice, or salon. You're working 60-hour weeks because your business needs you every day. Emails. Bookings. Follow-ups. Upsells. Member retention. It never stops.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 font-semibold">
            foundos.ai fixes this.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            We audit your current software. We lower your costs. We connect your tools. We deploy an AI agent that runs your business 24/7. Your revenue grows. Your hours shrink.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Philosophy */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">🧠 My Philosophy</h2>
          <p className="text-lg font-semibold text-gray-800">
            Systems run businesses. AI runs systems. Automation is freedom.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            I believe the best business is one that doesn't need you every day. Not because you built something and walked away—but because you built <em>systems</em> that make good decisions without you.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            I'm obsessed with clarity. With leverage. With doing less but getting more.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Most business owners are trapped in urgency. Responding to emails. Putting out fires. Never building. I think that's broken.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 font-semibold">
            Your business should serve you. Not the other way around.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            I built foundos.ai to change that.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* The Problem */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">😫 The Problem (You Probably Know It)</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            You're paying for 5 different software subscriptions that don't talk to each other.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Your booking system doesn't trigger your payment system. Your payment system doesn't trigger your email system. Nothing is orchestrated. So you're manually doing what should be automated.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            You're also leaving money on the table. Member books a class but forgets to show up? No proactive reminder. Member has 10 sessions left? No upsell. New member signs up? No personalized welcome.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 font-semibold text-red-600">
            Result: You work 60 hours. Make less than you should. Spend more on software than you need to.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            It's fixable.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* How It Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">✅ Here's How foundos.ai Works</h2>

          <div className="space-y-3">
            <h3 className="text-xl font-bold">Step 1: Audit (We Show You What You're Missing)</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              We look at your current software stack. We map your manual workflows. We calculate:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>✓ How much you're overpaying</li>
              <li>✓ How much revenue you're leaving on the table</li>
              <li>✓ How many hours you're wasting</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-700">
              You get a report. Numbers. Real savings. Real opportunities.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold">Step 2: Integration (We Connect Your Tools)</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              We don't replace your booking system or payment processor. We integrate them.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Your Mindbody + Square + email all talk to each other now. Data flows. Automations trigger.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold">Step 3: Agent Deployment (We Automate Your Growth)</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              An AI agent learns your business. It makes smart decisions 24/7:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>💬 "This member hasn't shown up in 2 weeks. Send them a personalized re-engagement message."</li>
              <li>💰 "This person is ready for a PT upsell. Pitch them the 3-session package."</li>
              <li>📈 "Your Wednesday class is at 60% capacity. Recommend a friend gets free week."</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-700">
              The agent is your invisible employee. Running your business while you sleep.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold">Step 4: Optimization (We Track What Works)</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              You get a dashboard. Real data. What automations made you the most money? What upsells converted? What retention tactics worked?
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              We optimize based on results. Not guesses.
            </p>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Pricing */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">💰 Pricing</h2>
          <p className="text-lg text-gray-700">Choose what fits your business.</p>

          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-bold">Starter: $99/month</h3>
            <p className="text-gray-700">For the owner testing it out.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Integration of your existing tools</li>
              <li>✓ Basic automations (reminders, follow-ups)</li>
              <li>✓ Unified dashboard</li>
              <li>✓ Email support</li>
            </ul>
            <p className="text-sm text-gray-600"><strong>Best for:</strong> Solo operators, simple workflows, tight budget.</p>
          </div>

          <div className="border-2 border-gray-900 rounded-lg p-6 space-y-4 bg-gray-50">
            <h3 className="text-2xl font-bold">Professional: $249/month</h3>
            <p className="text-gray-700">For the owner ready to scale.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Everything in Starter +</li>
              <li>✓ Smart Agent (personalization, recommendations)</li>
              <li>✓ Revenue tracking (see what's making money)</li>
              <li>✓ Lead capture + nurture automation</li>
              <li>✓ Priority support</li>
            </ul>
            <p className="text-sm text-gray-600"><strong>Best for:</strong> Growing business, want automation to drive revenue.</p>
            <p className="text-base font-semibold text-gray-900">This is where most owners land. This is where the magic happens.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-bold">Founder: $499/month</h3>
            <p className="text-gray-700">For the owner ready to go all-in.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Everything in Professional +</li>
              <li>✓ Personal Agent (trained on your business)</li>
              <li>✓ Custom workflows (built specifically for you)</li>
              <li>✓ Quarterly strategy calls with me</li>
              <li>✓ Direct access (text/Slack when you need me)</li>
            </ul>
            <p className="text-sm text-gray-600"><strong>Best for:</strong> Serious operator, complex business, ready to scale hard.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-bold">Custom Agent: $1,400 setup + $499/month</h3>
            <p className="text-gray-700">For the owner who wants a true operating system.</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Everything above +</li>
              <li>✓ Deep business analysis (40+ hours understanding your model)</li>
              <li>✓ Agent trained on your specific data + strategy</li>
              <li>✓ Custom decision logic tailored to your business</li>
              <li>✓ Monthly optimization + strategy</li>
              <li>✓ Ongoing evolution as your business grows</li>
            </ul>
            <p className="text-sm text-gray-600"><strong>Best for:</strong> High-revenue business, want me involved in your growth.</p>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* About */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">👋 About Me</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            I'm Josh. 19-year-old founder building operating systems for service businesses.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            I believe most business owners are working too hard for what they're making. I think that's fixable with the right systems + the right AI.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            I've been building for service businesses (gyms, studios, salons, coaches) for the past few years. Every business has the same problem: they're too dependent on their owner. I solve that.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 font-semibold">
            My philosophy: Clarity is power. Systems are leverage. Automation is freedom.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            I'm also a martial artist, salsa dancer, and obsessed with Stoic philosophy. I think like a systems builder. I operate like an entrepreneur. I coach like a martial artist—focus on the fundamentals, iterate relentlessly, never stop improving.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Testimonials */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">💬 Testimonials</h2>
          <p className="text-lg text-gray-700">
            Real results from real owners. Clahvay coming first.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* How to Start */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">🚀 How to Start</h2>
          <p className="text-lg text-gray-700">Super simple.</p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Option 1: Book a Meeting</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Let's talk about your business for 20 minutes. No sales pitch. Just clarity on what foundos.ai could do for you.
            </p>
            <a
              href="https://calendly.com/josh-potesta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition"
            >
              Book a 20-min call
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Option 2: Send Me a Message</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Text me what you do + what takes the most time. I'll respond with next steps.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
                <textarea
                  placeholder="What you do + what takes the most time..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="p-4 bg-green-50 border border-green-200 rounded text-green-900 font-semibold">
                ✓ Got it! I'll respond soon.
              </div>
            )}
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Contact */}
        <section className="space-y-6 pb-16">
          <h2 className="text-3xl font-bold">How to Reach Me</h2>
          <div className="space-y-3 text-lg">
            <p>
              <strong>Instagram:</strong>{' '}
              <a
                href="https://instagram.com/josh.potesta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline hover:text-gray-700"
              >
                @josh.potesta
              </a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:hello@foundos.ai"
                className="text-gray-900 underline hover:text-gray-700"
              >
                hello@foundos.ai
              </a>
              {' '}or{' '}
              <a
                href="mailto:jpotesta15@outlook.com"
                className="text-gray-900 underline hover:text-gray-700"
              >
                jpotesta15@outlook.com
              </a>
            </p>
          </div>
          <p className="text-lg text-gray-700">
            Pick whichever you prefer. I read everything and respond fast.
          </p>
        </section>

        {/* Final Thought */}
        <section className="space-y-6 border-t border-gray-200 pt-12 pb-16">
          <p className="text-2xl font-bold leading-relaxed">
            Your business should work for you.
          </p>
          <p className="text-2xl font-bold leading-relaxed">
            Not the other way around.
          </p>
          <p className="text-xl font-semibold text-gray-700">
            Let's build that together.
          </p>
          <p className="text-xl text-gray-700">— Josh</p>
        </section>
      </main>
    </div>
  );
}
