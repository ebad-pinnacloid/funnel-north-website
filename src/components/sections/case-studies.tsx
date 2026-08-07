"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyOverlay } from "@/components/ui/case-study-overlay";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";

const caseStudies = [
  {
    image: "/images/case-study-1.jpg",
    title: "Skincare Expertise Patients Can Reach From Anywhere",
    description:
      "Funnel North helped PelleDoré launch a trusted online dermatology experience with a conversion-focused website and a patient-first brand identity.",
    tags: ["Healthcare", "Web Design", "Brand Identity"],
    href: "/case-studies",
  },
  {
    image: "/images/case-study-2.jpg",
    title: "Digital Identity for the Next Generation of AI Education",
    description:
      "Funnel North helped Pinnacloid Institute build a strong digital presence with a professional website and cohesive social media identity for its AI training programs.",
    tags: ["Education", "AI Training", "Branding & Digital Presence"],
    href: "/case-studies",
  },
  {
    image: "/images/case-study-3.jpg",
    title: "Scaling Lead Generation with Meta Advertising",
    description:
      "KN Remodeling partnered with Funnel North to scale high-quality lead generation for kitchen and bathroom renovation services using Meta advertising.",
    tags: ["Home Remodeling", "Lead Generation", "META Advertising"],
    href: "/case-studies",
  },
];

const marqueeTexts = ["Real Strategies", "Real Growth", "Real Results"];

/* Scroll choreography (fractions of pinned progress): the eyebrow + ticker
   sit vertically centered and stay put; each card (first included) rises
   from the bottom over them and stacks on the previous one, whose top edge
   stays visible behind the new card. */
const STACK_START = 0.06;
const STACK_END = 0.85;
const STACK_PEEK_PX = 36;
const STACK_SCALE_STEP = 0.045;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* The ultra-wide zoom (globals.css) scales rendered transforms; measured
   rects are in zoomed pixels, so transform values must be divided back. */
const getPageZoom = () =>
  Number(getComputedStyle(document.documentElement).zoom) || 1;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-3 px-1.5 lg:gap-5 lg:px-2.5">
      <span className="heading-display whitespace-nowrap text-[46px] leading-[71px] text-ink lg:text-[80px] lg:leading-[124px] lg:tracking-[-1.69px]">
        {text}
      </span>
      <Image
        src="/images/badge-funnel.png"
        alt=""
        width={52}
        height={52}
        className="size-[30px] shrink-0 lg:size-[52px]"
      />
    </span>
  );
}

function HeadingTicker() {
  return (
    <div className="overflow-hidden" aria-hidden>
      {/* Four copies with a -50% slide: the loop point lands on an identical
          frame, and two copies (~4000px) stay wider than any supported
          viewport so the track never runs out mid-cycle. */}
      <div className="animate-marquee flex w-max">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex">
            {marqueeTexts.map((text) => (
              <MarqueeItem key={text} text={text} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudies() {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = pinRef.current;
    if (!container) return;

    const n = caseStudies.length;
    const segmentWidth = (STACK_END - STACK_START) / n;
    let raf = 0;
    const update = () => {
      raf = 0;
      const zoom = getPageZoom();
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const p = clamp01(-rect.top / (rect.height - vh));

      // Every card rises from below the viewport in its own scroll segment
      // and stacks over the centered ticker; previously landed cards scale
      // back and peek out above the newest one.
      const tIn = caseStudies.map((_, j) =>
        easeOutCubic(clamp01((p - (STACK_START + j * segmentWidth)) / (segmentWidth * 0.85))),
      );
      cardRefs.current.forEach((card, j) => {
        if (!card) return;
        let stackedBehind = 0;
        for (let k = j + 1; k < n; k++) stackedBehind += tIn[k];
        const y = ((1 - tIn[j]) * vh * 1.1) / zoom - STACK_PEEK_PX * stackedBehind;
        const scale = 1 - STACK_SCALE_STEP * stackedBehind;
        card.style.transform = `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        // The mobile title row under a card fades out as the next card stacks
        // over it, so covered cards never bleed their label into the new one.
        const title = card.querySelector<HTMLElement>("[data-card-title]");
        if (title) title.style.opacity = (1 - Math.min(1, stackedBehind * 1.5)).toFixed(3);
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
  }, [reducedMotion]);

  return (
    <section className="bg-white">
      {/* Pinned scroll story — all viewports; motion-reduce gets the static list */}
      {!reducedMotion && (
        <div
          ref={pinRef}
          style={{
            height: `calc(${(caseStudies.length + 1.2) * 100}svh / var(--page-zoom))`,
          }}
        >
          <div className="sticky top-0 h-screen-z overflow-hidden">
            {/* Eyebrow + ticker: vertically centered, static backdrop the
                cards stack over (ticker keeps scrolling horizontally) */}
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center gap-5">
              <Eyebrow className="justify-center">Case Studies</Eyebrow>
              <HeadingTicker />
            </div>
            {/* Stage is 74% of the viewport — the 1062px card's exact ratio in
                the 1440 design. Percentages (not vw) because the ultra-wide
                `zoom` in globals.css compounds with viewport units. */}
            <div className="absolute inset-0 mx-auto w-full max-w-[90%] py-12 lg:max-w-[74%]">
              {caseStudies.map((study, i) => (
                <div
                  key={study.image}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 inset-y-12 flex items-center justify-center will-change-transform"
                  style={{
                    zIndex: 10 + i,
                    transform: "translateY(120vh)",
                  }}
                >
                  <Link href={study.href} className="group block max-h-full w-full">
                    {/* Aspect-locked box + fill image: the visible card and
                        the hover overlay always share the exact same box. */}
                    <span className="@container relative mx-auto block aspect-[1062/597] max-h-full w-full overflow-hidden rounded-xl shadow-[0_-12px_40px_rgba(15,9,43,0.18)] lg:rounded-3xl">
                      <Image
                        src={study.image}
                        alt={`Case study: ${study.title}`}
                        fill
                        sizes="(max-width: 1023px) 90vw, 74vw"
                        className="object-cover"
                      />
                      <CaseStudyOverlay study={study} />
                    </span>
                    {/* No hover on touch: title + arrow ride below the card,
                        stacking with it; the scroll handler fades this row out
                        once the next card covers it. */}
                    <span
                      data-card-title
                      className="mt-3 flex items-start justify-between gap-3 text-[13px] font-bold uppercase leading-snug tracking-wide text-ink lg:hidden"
                    >
                      <span className="min-w-0 flex-1">{study.title}</span>
                      <span aria-hidden className="shrink-0 text-brand">↗</span>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Static stacked layout — reduced-motion fallback on every viewport */}
      {reducedMotion && (
      <div className="pt-16 lg:pt-24">
        <Eyebrow className="justify-center">Case Studies</Eyebrow>
        <div className="mt-4">
          <HeadingTicker />
        </div>
        <Container className="mt-10">
          <div className="mx-auto flex max-w-[1062px] flex-col gap-8">
            {caseStudies.map((study) => (
              <Link key={study.image} href={study.href} className="group block">
                <span className="relative block">
                  <Image
                    src={study.image}
                    alt={`Case study: ${study.title}`}
                    width={1062}
                    height={597}
                    sizes="(max-width: 1200px) 100vw, 1062px"
                    className="w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.01] lg:rounded-3xl"
                  />
                  <CaseStudyOverlay study={study} />
                </span>
                <span className="mt-3 flex items-center justify-between text-sm font-bold uppercase tracking-wide text-ink lg:hidden">
                  {study.title}
                  <span aria-hidden className="text-brand">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </div>
      )}

      <Container className="pb-24">
        <div className="mt-14 flex justify-center lg:mt-4">
          <PillButton href="/case-studies" variant="dark" className="w-full sm:w-auto">
            See more case studies
          </PillButton>
        </div>
      </Container>
    </section>
  );
}
