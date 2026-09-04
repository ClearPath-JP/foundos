"use client";

import { useEffect, useState } from "react";

/**
 * "OPEN NOW" was hardcoded, which made it a false claim for eleven hours a day
 * on a page whose whole argument is that its numbers can be trusted. This
 * computes it from their real hours (11:00–00:00 daily) in Atlanta time.
 *
 * Renders the closed state until mounted so the server HTML and the first
 * client paint agree — otherwise React hydration mismatches on every load.
 */
export default function OpenNow() {
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    // Intl directly — round-tripping a localized string back through
    // `new Date()` is implementation-defined and can parse differently per
    // engine. hourCycle h23 so midnight is 0, not 24.
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      hourCycle: "h23",
    });
    const read = () => setHour(Number(fmt.format(new Date())));
    read();
    const t = setInterval(read, 60_000);
    return () => clearInterval(t);
  }, []);

  // Open 11:00 through 23:59.
  const open = hour !== null && hour >= 11;

  return (
    <div className="flex items-start gap-2.5">
      {/* items-start, not center. The eyebrow wraps to two lines at 390px, and
          centring left the dot stranded in the gutter between them rather than
          reading as a bullet against the first line. */}
      <span
        className={`mt-[0.32rem] block h-2.5 w-2.5 shrink-0 rounded-full ${open ? "pulse" : "bg-[var(--ink-faint)]"}`}
      />
      <span className="eyebrow">
        {open ? "Open now · till midnight" : "Opens at 11am · open till midnight, every day"}
      </span>
    </div>
  );
}
