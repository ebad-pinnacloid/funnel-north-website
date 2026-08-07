"use client";

import { useEffect, useRef } from "react";

/** Fraction of the band height the footage is over-sized by, split top and
 *  bottom — the drift is clamped to half of it so an edge can never show. */
const OVERSCAN = 0.14;

/**
 * Oversized purple wordmark that the video below deliberately crops.
 *
 * Geometry mirrors the 1440 frame exactly: the text box starts at y=152.6 with
 * a 1.1 line height (311.8px), and the visual starts at y=397 — overlapping the
 * box by 67.6px, which cuts roughly the bottom 36px off the letterforms. The
 * visual is the later, positioned element so it paints over the type, as in the
 * design. Every value scales with the viewport but caps at its 1440 figure so
 * the ultra-wide `zoom` in globals.css scales the composition as a whole rather
 * than compounding with vw.
 *
 * The band plays the same footage as the homepage visual band; about-hero.jpg
 * is a frame from it, so it doubles as the poster and paints instantly while
 * the webm buffers. Motion is kept deliberately quiet: the existing fade-and-
 * rise entrance, plus a slow parallax drift of the footage inside its frame.
 */
export function AboutHero() {
  const bandRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const video = videoRef.current;
    if (!band || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // Divide by the ultra-wide page zoom (globals.css) so the applied
      // transform stays proportional to the measured offset.
      const zoom = Number(getComputedStyle(document.documentElement).zoom) || 1;
      const rect = band.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const limit = (OVERSCAN / 2) * rect.height;
      const drift = Math.min(Math.max((-offset * 0.05) / zoom, -limit), limit);
      video.style.transform = `translateY(${drift.toFixed(1)}px)`;
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
    <section className="bg-white pt-[clamp(96px,10.6vw,152px)]">
      <h1 className="heading-display animate-rise text-center text-[clamp(52px,19.68vw,283px)] leading-[1.1] text-brand">
        Who we are
      </h1>
      <div
        ref={bandRef}
        className="animate-hero-visual relative -mt-[clamp(10px,4.69vw,68px)] aspect-[1440/750] w-full overflow-hidden"
      >
        <video
          ref={videoRef}
          src="/videos/demo-video.webm"
          poster="/images/about-hero.jpg"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover will-change-transform"
        />
      </div>
    </section>
  );
}
