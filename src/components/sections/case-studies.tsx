"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
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
];

const marqueeTexts = ["Real Strategies", "Real Growth", "Real Results"];

/* Scroll choreography (fractions of pinned progress):
   1st scroll — the ticker glides from under the eyebrow to the vertical
   center of the card area; 2nd scroll — the next card rises and stacks on
   the previous one, whose top edge stays visible behind the new card. */
const TICKER_END = 0.3;
const STACK_START = 0.38;
const STACK_END = 0.82;
const STACK_PEEK_PX = 36;
const STACK_SCALE_STEP = 0.045;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

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

/**
 * Hover state from Figma (194:3445): dark veil over the card with tag pills
 * top-right, a lime VIEW pill center, and title + summary bottom-left.
 * Elements rise in slightly, staggered, on hover.
 */
function CardHoverOverlay({ study }: { study: (typeof caseStudies)[number] }) {
  return (
    <div className="absolute inset-0 rounded-xl bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:rounded-3xl">
      <div className="absolute right-5 top-5 flex max-w-[60%] translate-y-2 flex-wrap justify-end gap-1.5 opacity-0 transition-[opacity,transform] duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100 lg:right-9 lg:top-9">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill bg-white/20 px-4 py-2.5 text-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex scale-90 items-center gap-1 rounded-pill bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.2px] text-black opacity-0 transition-[opacity,transform] duration-500 delay-100 group-hover:scale-100 group-hover:opacity-100">
          View
          <span aria-hidden className="text-base font-semibold normal-case">↗</span>
        </span>
      </div>

      <div className="absolute bottom-5 left-5 max-w-[85%] translate-y-2 text-white opacity-0 transition-[opacity,transform] duration-500 delay-150 group-hover:translate-y-0 group-hover:opacity-100 lg:bottom-10 lg:left-10 lg:max-w-[46%]">
        <p className="text-xl font-bold leading-tight lg:text-[32px] lg:leading-[41px]">
          {study.title}
        </p>
        <p className="mt-2 text-sm leading-5">{study.description}</p>
      </div>
    </div>
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
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
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
  const tickerOuterRef = useRef<HTMLDivElement>(null);
  const tickerInnerRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = pinRef.current;
    if (!container) return;

    const n = caseStudies.length;
    const segmentWidth = (STACK_END - STACK_START) / Math.max(1, n - 1);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const p = clamp01(-rect.top / (rect.height - vh));

      // 1st scroll: ticker to the center of the card area (overlaying it)
      const tickerOuter = tickerOuterRef.current;
      const tickerInner = tickerInnerRef.current;
      const area = areaRef.current;
      if (tickerOuter && tickerInner && area) {
        const areaRect = area.getBoundingClientRect();
        const outerRect = tickerOuter.getBoundingClientRect();
        const dy =
          areaRect.top + areaRect.height / 2 - (outerRect.top + outerRect.height / 2);
        const t = easeInOutCubic(clamp01(p / TICKER_END));
        tickerInner.style.transform = `translateY(${(t * dy).toFixed(1)}px)`;
      }

      // 2nd scroll onward: each next card rises and stacks on the previous;
      // the previous card scales back and peeks out above the new one.
      const tIn = caseStudies.map((_, j) =>
        j === 0
          ? 1
          : easeOutCubic(clamp01((p - (STACK_START + (j - 1) * segmentWidth)) / segmentWidth)),
      );
      cardRefs.current.forEach((card, j) => {
        if (!card) return;
        let stackedBehind = 0;
        for (let k = j + 1; k < n; k++) stackedBehind += tIn[k];
        const y = (1 - tIn[j]) * vh * 0.9 - STACK_PEEK_PX * stackedBehind;
        const scale = 1 - STACK_SCALE_STEP * stackedBehind;
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
  }, [reducedMotion]);

  return (
    <section className="bg-white">
      {/* Pinned scroll story — desktop only, and only when motion is allowed */}
      {!reducedMotion && (
        <div
          ref={pinRef}
          className="hidden lg:block"
          style={{ height: `${(caseStudies.length + 1.2) * 100}vh` }}
        >
          <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-16">
            <Eyebrow className="justify-center">Case Studies</Eyebrow>
            {/* Outer wrapper keeps layout; inner element is translated so the
                ticker can glide down behind the cards without reflow */}
            <div ref={tickerOuterRef} className="mt-3">
              <div ref={tickerInnerRef} className="relative z-0">
                <HeadingTicker />
              </div>
            </div>
            <div ref={areaRef} className="relative mx-auto mb-8 mt-6 w-full max-w-[1062px] flex-1">
              {caseStudies.map((study, i) => (
                <div
                  key={study.image}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{
                    zIndex: 10 + i,
                    transform: i === 0 ? undefined : "translateY(120vh)",
                  }}
                >
                  <Link href={study.href} className="group flex max-h-full justify-center">
                    <span className="relative flex max-h-full">
                      <Image
                        src={study.image}
                        alt={`Case study: ${study.title}`}
                        width={1062}
                        height={597}
                        sizes="(max-width: 1200px) 90vw, 1062px"
                        className="max-h-full w-auto max-w-full rounded-3xl shadow-[0_-12px_40px_rgba(15,9,43,0.18)]"
                      />
                      <CardHoverOverlay study={study} />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Static stacked layout — mobile/tablet, and the reduced-motion fallback */}
      <div className={`pt-16 lg:pt-24 ${reducedMotion ? "" : "lg:hidden"}`}>
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
                  <CardHoverOverlay study={study} />
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
