"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed copy: every word starts muted and turns white as the block
 * travels up the viewport, with a soft leading edge so the change reads as a
 * wipe rather than a step. Progress is tied to scroll position (not a timed
 * animation), so scrolling back up dims the words again.
 *
 * The words are server-rendered at full contrast and the scrub only ever
 * writes inline colours, so no-JS and reduced-motion readers get the finished,
 * fully white paragraph.
 */
export function ScrollRevealText({
  text,
  className = "",
  /** Alpha of an unrevealed word — white at this opacity reads as grey. */
  dim = 0.3,
  /** Width of the fading edge, in words. */
  feather = 8,
}: {
  text: string;
  className?: string;
  dim?: number;
  feather?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));
    const n = spans.length;
    if (!n) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top edge sits 80% down the viewport, 1 once its
      // bottom edge has climbed to 45% — i.e. it finishes while the section is
      // still comfortably on screen.
      const travel = 0.35 * vh + rect.height;
      const progress = Math.min(Math.max((0.8 * vh - rect.top) / travel, 0), 1);
      // Leading edge measured in words; the +feather overshoot guarantees the
      // last word is fully lit exactly at progress 1.
      const cursor = progress * (n + feather);
      for (let i = 0; i < n; i++) {
        const t = Math.min(Math.max((cursor - i) / feather, 0), 1);
        spans[i].style.color = `rgb(255 255 255 / ${(dim + (1 - dim) * t).toFixed(3)})`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dim, feather]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        // The trailing space lives inside the span so lines still break
        // normally; keying by index is safe because the list never reorders.
        <span key={i} data-word className="transition-colors duration-150 ease-linear">
          {i < words.length - 1 ? `${word} ` : word}
        </span>
      ))}
    </p>
  );
}
