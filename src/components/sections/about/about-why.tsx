"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const chapters = [
  {
    heading: "Clarity",
    body: "We find the signal inside the noise and identify what will actually move the business forward.",
  },
  {
    heading: "Alignment",
    body: "Strategy, creative, media and technology work toward one shared commercial objective.",
  },
  {
    heading: "Momentum",
    body: "We build systems that keep learning, improving and creating forward movement.",
  },
  {
    heading: "Measurable growth",
    body: "Every idea is connected to a result that can be understood, improved and scaled.",
  },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * "Why Funnel North" — a sticky headline beside four numbered chapters, with a
 * rail whose fill and marker track scroll position and light up the chapter
 * currently in view. The fill is sized in percentages rather than pixels so the
 * ultra-wide `zoom` in globals.css needs no compensation.
 */
export function AboutWhy() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = listRef.current;
    if (!list) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = list.getBoundingClientRect();
      // Progress of the chapter list past the middle of the viewport.
      const p = clamp01((window.innerHeight * 0.55 - rect.top) / rect.height);
      if (fillRef.current) fillRef.current.style.height = `${(p * 100).toFixed(2)}%`;
      if (markerRef.current) markerRef.current.style.top = `${(p * 100).toFixed(2)}%`;
      setActive(Math.min(chapters.length - 1, Math.floor(p * chapters.length)));
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
    <section className="bg-gradient-to-b from-white to-mist py-16 lg:py-24">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-0">
        <div className="lg:w-[520px] lg:shrink-0">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow tone="deep">Why Funnel North</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-display mt-5 text-[48px] text-ink lg:text-[86px] lg:leading-[92px]!">
                <span className="lg:block">Direction</span>{" "}
                <span className="lg:block">changes</span>{" "}
                <span className="lg:block">everything.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-1 gap-0">
          {/* Progress rail — decorative, desktop only */}
          <div aria-hidden className="relative mr-[35px] hidden w-px shrink-0 bg-line-subtle lg:block">
            <div ref={fillRef} className="w-[2px] -translate-x-px bg-brand" style={{ height: "25%" }} />
            <div
              ref={markerRef}
              className="absolute -left-[4.5px] size-[10px] -translate-y-1/2 rounded-full bg-brand"
              style={{ top: "25%" }}
            />
          </div>

          <ol ref={listRef} className="flex-1">
            {chapters.map((chapter, i) => (
              <li key={chapter.heading}>
                <Reveal delay={Math.min(i * 0.05, 0.2)}>
                  <div className="flex gap-6 border-b border-line-subtle py-6 lg:gap-[64px] lg:py-[34px]">
                    <span
                      className={`heading-display shrink-0 text-[40px] leading-none transition-colors duration-500 motion-reduce:transition-none lg:w-[56px] lg:text-[56px] lg:leading-[64px]! ${
                        i === active ? "text-brand" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="lg:max-w-[520px]">
                      <h3 className="text-lg font-semibold uppercase text-ink lg:text-[22px]">
                        {chapter.heading}
                      </h3>
                      <p className="mt-2 max-w-[500px] text-base leading-6 text-[#5f5b70]">
                        {chapter.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
