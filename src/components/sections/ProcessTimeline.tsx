"use client";

import { motion } from "framer-motion";

const steps = [
  {
    week: "Before you pay anything",
    title: "Free strategy call",
    body: "We hop on a call. You tell me about your business. I\u2019ll tell you honestly what I think you need. No pressure, no sales pitch.",
  },
  {
    week: "Week 1",
    title: "Strategy + design",
    body: "I map out the structure, create mockups, and get your feedback. Nothing gets built until you\u2019re happy with the direction.",
  },
  {
    week: "Week 2",
    title: "Build",
    body: "I build everything out. You get progress updates along the way. This is collaborative, not a black box.",
  },
  {
    week: "Week 3",
    title: "Review + launch",
    body: "Final review together. We make sure everything works, looks great on every device. Then we go live.",
  },
  {
    week: "After launch",
    title: "Ongoing support",
    body: "I don\u2019t disappear. Every package includes free maintenance. If something breaks, you text me directly.",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="section-spacing px-6">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Process</p>
          <h2 className="section-headline">
            How it <span className="accent">actually works</span>.
          </h2>
          <p className="mt-4 max-w-2xl story-body">
            From first call to launch day &mdash; here&apos;s what the process looks like.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-14 sm:space-y-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.week}
              className="flex gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <div className="flex flex-col items-center">
                <div className="glow-dot h-3 w-3 flex-shrink-0 rounded-full" style={{ background: "var(--color-foreground)" }} />
                {idx < steps.length - 1 && <div className="mt-1 w-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />}
              </div>
              <div className="pb-2">
                <p className="text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "var(--color-dim)" }}>{step.week}</p>
                <p className="mt-1 text-base font-semibold" style={{ color: "var(--color-foreground)" }}>{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed max-w-lg" style={{ color: "var(--color-muted)" }}>{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-sm text-center"
          style={{ color: "var(--color-dim)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Every project starts with a free call. <span className="accent">You don&apos;t pay until we both agree on the plan.</span>
        </motion.p>
      </div>
    </section>
  );
}
