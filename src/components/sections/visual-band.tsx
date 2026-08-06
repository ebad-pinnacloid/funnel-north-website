"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-width video band between Services and Industries (Figma 278:12422).
 * The outer section is three viewports tall while the video pins full-screen,
 * so the band holds for three scrolls before the next section slides in.
 *
 * Entrance is scroll-driven: while the band approaches, the video scales from
 * 90% and fades in against the black backdrop, reaching full screen exactly
 * when the sticky pin engages. Scrubbing back up reverses it. The video
 * element only mounts once the band is within one viewport of scrolling into
 * view, so its ~3 MB never blocks initial page load.
 */
export function VisualBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // 0 when the band's top edge enters at the bottom of the viewport,
      // 1 once it reaches the top and the sticky pin takes over.
      const top = section.getBoundingClientRect().top;
      const progress = Math.min(Math.max(1 - top / window.innerHeight, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      frame.style.transform = `scale(${(0.9 + 0.1 * eased).toFixed(4)})`;
      frame.style.opacity = eased.toFixed(3);
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
  }, []);

  return (
    <section ref={sectionRef} aria-hidden className="relative h-[300svh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-black">
        <div ref={frameRef} className="size-full will-change-[transform,opacity]">
          {shouldLoad && (
            <video
              src="/videos/demo-video.webm"
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
