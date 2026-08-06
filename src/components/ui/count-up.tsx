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
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

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
          el.textContent = `${Math.round(eased * end)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = `0${suffix}`;
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, suffix, duration]);

  return (
    <span ref={ref}>
      {end}
      {suffix}
    </span>
  );
}
