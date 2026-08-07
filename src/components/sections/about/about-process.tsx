"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";

/* Titles carry their designed line breaks: each card's heading sits on two
   lines in the 1440 frame, and the cards align on that shared baseline. */
const steps = [
  {
    title: ["Discovery &", "Research"],
    body: "We begin by understanding your business, goals, audience, and competitive landscape. This helps us identify opportunities and set the foundation for strategy.",
    surface: "bg-lime-soft",
  },
  {
    title: ["Strategy", "Development"],
    body: "Based on insights, we craft a tailored marketing strategy that aligns with your objectives and ensures every action supports measurable results.",
    image: "/images/about-process-strategy.jpg",
    imagePosition: "object-bottom",
  },
  {
    title: ["Creative", "Direction"],
    body: "Our creative team translates strategy into compelling visuals, messaging, and campaign concepts that connect with your target audience.",
    surface: "bg-purple-soft",
  },
  {
    title: ["Execution &", "Production"],
    body: "We bring the strategy to life through content creation, ad campaigns, landing pages, social media, and all necessary marketing assets.",
    image: "/images/about-process-execution.jpg",
    imagePosition: "object-cover",
  },
  {
    title: ["Launch &", "Optimization"],
    body: "Campaigns are launched across selected channels and continuously optimized to improve performance, engagement, and conversions.",
    surface: "bg-purple-soft",
  },
  {
    title: ["Reporting &", "Iteration"],
    body: "We track performance using real data and analytics, deliver transparent reports, and refine campaigns for ongoing improvement.",
    surface: "bg-lime-soft",
  },
];

/** Three cards visible at once; card N covers the card N-3 in its slot. */
const SLOTS = 3;
/** Scroll spent before the first card enters and after the last one lands. */
const LEAD = 0.07;
const TAIL = 0.1;
/** How much of a card's own segment it spends rising (the rest is a hold). */
const RISE = 0.82;
/** How far a card scales back for each card stacked on top of it. */
const COVER_SCALE_STEP = 0.04;
/** Viewports of scroll per card — sets the pinned stage's total height. */
const STEP_HEIGHT = 0.8;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * "How we work" — six process cards over a mist-to-white wash.
 *
 * On desktop the section becomes a pinned scroll story: the heading holds at
 * the top while each card rises from below on its own scroll step and lands in
 * slot i % 3, covering the card three steps before it. Below `lg`, and under
 * reduced motion, it stays the static three-column grid — the `.process-*`
 * rules in globals.css are the only thing that turns the pin on.
 */
export function AboutProcess() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hand the CSS its pin; until this lands the section is the plain grid, so
    // a visitor without JS never sees cards parked off-screen.
    stage.classList.add("is-live");

    const desktop = window.matchMedia("(min-width: 1024px)");
    const n = steps.length;
    const segment = (1 - LEAD - TAIL) / n;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!desktop.matches) {
        cardRefs.current.forEach((card) => {
          if (card) card.style.transform = "";
        });
        return;
      }
      const zoom = Number(getComputedStyle(document.documentElement).zoom) || 1;
      const vh = window.innerHeight;
      const rect = stage.getBoundingClientRect();
      // 0 as the pin engages, 1 once the stage has been scrolled through.
      const p = clamp01(-rect.top / (rect.height - vh));

      const tIn = steps.map((_, i) =>
        easeOutCubic(clamp01((p - (LEAD + i * segment)) / (segment * RISE))),
      );
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        // Cards sharing this slot that have already started arriving.
        let covered = 0;
        for (let k = i + SLOTS; k < n; k += SLOTS) covered += tIn[k];
        const y = ((1 - tIn[i]) * vh * 1.1) / zoom;
        const scale = 1 - COVER_SCALE_STEP * covered;
        card.style.transform = `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      });
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
    <section className="bg-gradient-to-b from-mist to-white py-16 lg:py-24">
      <div
        ref={stageRef}
        className="process-stage"
        style={{ "--process-steps": steps.length * STEP_HEIGHT + 1 } as React.CSSProperties}
      >
        <div className="process-pin">
          <Container className="flex flex-col items-center">
            <Reveal>
              <Eyebrow className="lg:justify-center">How we work</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-display mt-5 text-center text-[40px] text-ink lg:text-[70px] lg:leading-[71px]">
                How we build success
              </h2>
            </Reveal>

            <div className="process-deck mt-10 grid w-full gap-[18.75px] lg:mt-14 lg:grid-cols-3">
              {steps.map((step, i) => {
                const onPhoto = Boolean(step.image);
                return (
                  <div
                    key={step.title.join(" ")}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    data-slot={i % SLOTS}
                    className="process-card"
                    style={{ zIndex: i + 1 }}
                  >
                    <div
                      className={`relative isolate flex h-full flex-col overflow-hidden rounded-[18.75px] px-7 pb-7 pt-28 lg:min-h-[447.75px] lg:pb-[28.125px] lg:pl-[28.125px] lg:pr-[35.625px] lg:pt-[200px] ${
                        onPhoto ? "bg-ink" : step.surface
                      }`}
                    >
                      {step.image && (
                        <Image
                          src={step.image}
                          alt=""
                          fill
                          sizes="(max-width: 1023px) 100vw, 413px"
                          className={`-z-10 opacity-20 ${step.imagePosition}`}
                        />
                      )}
                      <h3
                        className={`text-[30px] font-medium leading-[1.1] tracking-[-0.75px] lg:text-[37.5px] lg:leading-[41.25px] ${
                          onPhoto ? "text-white" : "text-[#080d0d]"
                        }`}
                      >
                        {step.title[0]}
                        <br />
                        {step.title[1]}
                      </h3>
                      <p
                        className={`mt-[11.25px] text-base leading-[1.4] lg:text-[16.875px] lg:leading-[23.625px] ${
                          onPhoto ? "text-white" : "text-[#1d1d1d]"
                        }`}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <Reveal delay={0.15} className="mt-10 flex justify-center lg:mt-[60px]">
          <PillButton href="/contact" variant="dark" className="max-sm:w-full">
            Book a FREE strategy call
          </PillButton>
        </Reveal>
      </Container>
    </section>
  );
}
