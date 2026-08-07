"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const stages = [
  {
    title: "Discover / Plan",
    bullets: [
      "Understand the business",
      "Define the project scope",
      "Set measurable goals",
      "Establish priorities and timeline",
    ],
    // Percentages of the 1000px design canvas
    position: { left: "38.8%", top: "19%" },
  },
  {
    title: "Build",
    bullets: [
      "Develop the initial solution",
      "Connect creative and technical",
      "Configure the growth system",
      "Prepare the functional version",
    ],
    position: { left: "65%", top: "42%" },
  },
  {
    title: "Launch",
    bullets: [
      "Deliver and activate",
      "Monitor early performance",
      "Validate tracking and function",
      "Gather initial learnings",
    ],
    position: { left: "38.8%", top: "65%" },
  },
  {
    title: "Optimise / Review",
    bullets: [
      "Analyse performance",
      "Gather customer feedback",
      "Fix friction and weak points",
      "Improve the greatest impact",
    ],
    position: { left: "12.6%", top: "42%" },
  },
];

/* The four compass nodes sit exactly on the ring (radius 450 of the 1000
   canvas), each lighting up as the ring sweeps past it. */
const nodes = [
  { glyph: "→", style: { left: "47.6%", top: "2.6%" } },
  { glyph: "↓", style: { left: "92.6%", top: "47.6%" } },
  { glyph: "←", style: { left: "47.6%", top: "92.6%" } },
  { glyph: "↑", style: { left: "2.6%", top: "47.6%" } },
];

const RING_RADIUS = 445.05;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * "How we process our work" — the radial process diagram.
 *
 * Figma ships this as five variants (0/25/50/75/100) and notes they map to
 * scroll progress, with reduced motion resting on 100. So the ring is drawn
 * with a dash offset that scrubs as the section crosses the viewport, each
 * stage card fades in as the sweep reaches it, and the compass nodes light in
 * turn. The whole field is one inline SVG — every layer in the design is a
 * plain circle or dashed diagonal, so assets would only add weight.
 *
 * Below `lg` the radial layout would shrink the 16px card titles into
 * illegibility, so small screens get the same four stages as a plain list.
 */
export function ServicesProcess() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const settle = (p: number) => {
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - p));
      }
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const t = clamp01((p - i * 0.22) / 0.18);
        card.style.opacity = t.toFixed(3);
        card.style.transform = `translateY(${((1 - t) * 14).toFixed(1)}px)`;
      });
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        node.dataset.lit = p >= i * 0.25 ? "true" : "false";
      });
    };

    // Reduced motion rests on the design's Progress=100 state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = field.getBoundingClientRect();
      settle(clamp01((window.innerHeight * 0.8 - rect.top) / (rect.height * 0.85)));
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
    <section className="bg-black py-16 lg:py-24">
      <Container className="flex flex-col items-center">
        <Reveal>
          <Eyebrow onDark className="lg:justify-center">
            Our process
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-display mt-5 max-w-[600px] text-center text-[44px] leading-[1.05] text-white lg:text-[74px] lg:leading-[78px]">
            <span className="lg:block">How we process</span>{" "}
            <span className="lg:block">our work</span>
          </h2>
        </Reveal>

        {/* Radial diagram — desktop */}
        <div
          ref={fieldRef}
          className="@container relative mx-auto mt-10 hidden aspect-square w-full max-w-[1000px] lg:block"
        >
          {/* Olive glow behind the field */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[35px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(231,254,37,0.23), rgba(231,254,37,0))",
              opacity: 0.67,
            }}
          />

          <svg viewBox="0 0 1000 1000" className="absolute inset-0 size-full" aria-hidden>
            <defs>
              <filter id="ring-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.906 0 0 0 0 0.996 0 0 0 0 0.145 0 0 0 0.34 0"
                  result="glow"
                />
                <feBlend in="SourceGraphic" in2="glow" mode="screen" />
              </filter>
            </defs>
            {/* Dashed diagonal guides */}
            <path
              d="M213 213L787 787M787 213L213 787"
              stroke="white"
              strokeOpacity="0.115"
              strokeWidth="1.5"
              strokeDasharray="8 14"
            />
            {/* Concentric field rings */}
            <circle cx="500" cy="500" r="324.5" stroke="white" strokeOpacity="0.08" fill="none" />
            <circle cx="500" cy="500" r="249.5" stroke="white" strokeOpacity="0.08" fill="none" />
            <circle cx="500" cy="500" r="164.5" stroke="white" strokeOpacity="0.08" fill="none" />
            {/* Centre pulse + core */}
            <circle
              cx="500"
              cy="500"
              r="74.5"
              stroke="white"
              strokeOpacity="0.16"
              opacity="0.42"
              fill="none"
            />
            <circle cx="500" cy="500" r="45" fill="white" fillOpacity="0.08" />
            <circle cx="500" cy="500" r="44.5" stroke="white" strokeOpacity="0.16" fill="none" />
            {/* Progress ring — scrubbed by scroll, drawn from the north node */}
            <circle
              ref={ringRef}
              cx="500"
              cy="500"
              r={RING_RADIUS}
              stroke="#E7FE25"
              strokeWidth="9.9"
              fill="none"
              filter="url(#ring-glow)"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE}
              transform="rotate(-90 500 500)"
            />
          </svg>

          {/* Centre wordmark */}
          <Image
            src="/images/logo.png"
            alt=""
            width={217}
            height={91}
            className="absolute left-1/2 top-1/2 w-[6.5%] -translate-x-1/2 -translate-y-1/2"
          />

          {/* Compass nodes */}
          {nodes.map((node, i) => (
            <span
              key={node.glyph}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              aria-hidden
              data-lit="false"
              className="absolute flex size-[4.8%] items-center justify-center rounded-full border border-white/16 text-[2.1cqw] font-medium transition-colors duration-500 data-[lit=false]:bg-ink data-[lit=false]:text-white data-[lit=false]:opacity-25 data-[lit=true]:bg-accent data-[lit=true]:text-black data-[lit=true]:opacity-100 data-[lit=true]:shadow-[0_6px_14px_rgba(201,255,20,0.32)] motion-reduce:transition-none"
              style={node.style}
            >
              {node.glyph}
            </span>
          ))}

          {/* Stage cards */}
          {stages.map((stage, i) => (
            <div
              key={stage.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ ...stage.position, opacity: 0 }}
              className="absolute flex w-[22.4%] flex-col gap-[1.28cqw] rounded-[1.28cqw] border-[0.8px] border-white/16 bg-white/8 p-[1.28cqw] drop-shadow-[0_0.96cqw_1.28cqw_rgba(231,254,37,0.23)] transition-[opacity,transform] duration-500 motion-reduce:transition-none"
            >
              <span className="flex items-center gap-[0.64cqw]">
                <span aria-hidden className="size-[0.64cqw] rounded-full bg-accent" />
                <span className="text-[0.96cqw] font-semibold leading-none tracking-[0.12cqw] text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <p className="text-[1.6cqw] font-semibold uppercase leading-[1.25] text-white">
                {stage.title}
              </p>
              <ul className="text-[1.12cqw] leading-[1.68cqw] text-white">
                {stage.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stacked stages — small screens, where the radial type would be unreadable */}
        <ul className="mt-10 flex w-full flex-col gap-4 lg:hidden">
          {stages.map((stage, i) => (
            <li key={stage.title}>
              <Reveal delay={Math.min(i * 0.06, 0.24)}>
                <div className="flex flex-col gap-3 rounded-md border border-white/16 bg-white/8 p-5">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[1.2px] text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <p className="text-lg font-semibold uppercase text-white">{stage.title}</p>
                  <ul className="text-sm leading-6 text-white/80">
                    {stage.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
