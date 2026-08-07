"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from 0 to `end` once the number scrolls into view. The final value is
 * server-rendered, so SEO/no-JS/reduced-motion all see the finished figure;
 * the animation rewrites textContent directly to avoid re-renders.
 */
export function CountUp({
  end,
  suffix = "",
  duration = 1500,
  grouped = false,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  /** Render thousands separators (230,000) — used by the case-study stats. */
  grouped?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => (grouped ? n.toLocaleString("en-US") : `${n}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let start = 0;
        const tick = (now: number) => {
          start ||= now;
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${format(Math.round(eased * end))}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = `${format(0)}${suffix}`;
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, suffix, duration, grouped]);

  return (
    <span ref={ref}>
      {format(end)}
      {suffix}
    </span>
  );
}
