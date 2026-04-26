"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedStat({ value, suffix = "", prefix = "", label }: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <span
        className="text-3xl sm:text-4xl font-bold block tabular-nums"
        style={{ color: "var(--color-foreground)" }}
      >
        {prefix}{count}{suffix}
      </span>
      <span
        className="text-xs mt-2 block tracking-[0.1em] uppercase"
        style={{ color: "var(--color-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ProofBar() {
  return (
    <section
      className="px-6 py-16"
      style={{
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <motion.div
        className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedStat value={2} label="Products shipped" />
        <AnimatedStat value={150} suffix="+" label="Endpoints built" />
        <AnimatedStat value={3} prefix="<" suffix=" wks" label="Avg delivery" />
        <AnimatedStat value={100} suffix="%" label="Completion rate" />
      </motion.div>
    </section>
  );
}
