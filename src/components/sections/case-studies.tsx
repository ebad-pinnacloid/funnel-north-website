"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";

const caseStudies = [
  { image: "/images/case-study-1.jpg", title: "Title goes here", href: "/case-studies" },
  { image: "/images/case-study-2.jpg", title: "Title goes here", href: "/case-studies" },
];

const marqueeTexts = ["Real Strategies", "Real Growth", "Real Results"];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

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
    <span className="flex items-center gap-5 px-2.5">
      <span className="heading-display whitespace-nowrap text-5xl text-ink lg:text-[80px] lg:leading-[124px] lg:tracking-[-1.69px]">
        {text}
      </span>
      <Image
        src="/images/badge-funnel.png"
        alt=""
        width={52}
        height={52}
        className="size-10 shrink-0 lg:size-[52px]"
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  /* Scroll-scrub: the container is (N+1)*100vh tall with a sticky full-screen
     child. Progress through the container drives each card's entrance
     (rise + fade + settle) and the previous card's exit (drift up + scale
     down + dim), all written imperatively to avoid per-frame re-renders. */
  useEffect(() => {
    if (reducedMotion) return;
    const container = pinRef.current;
    if (!container) return;

    const n = caseStudies.length;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const p = clamp01(-rect.top / (rect.height - vh));
      const seg = 1 / n;
      const entrance = seg * 0.45;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const tIn = i === 0 ? 1 : clamp01((p - i * seg) / entrance);
        const tOut = i === n - 1 ? 0 : clamp01((p - (i + 1) * seg) / entrance);
        const y = (1 - tIn) * vh * 0.55 - tOut * vh * 0.12;
        const scale = 1 - 0.15 * (1 - tIn) - 0.06 * tOut;
        card.style.transform = `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        card.style.opacity = String(tIn * (1 - tOut));
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
          style={{ height: `${(caseStudies.length + 1) * 100}vh` }}
        >
          <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-16">
            <Eyebrow className="justify-center">Case Studies</Eyebrow>
            <div className="mt-3">
              <HeadingTicker />
            </div>
            <div className="relative mx-auto mb-8 mt-6 w-full max-w-[1062px] flex-1">
              {caseStudies.map((study, i) => (
                <div
                  key={study.image}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex items-start justify-center will-change-[transform,opacity]"
                  style={{ zIndex: i + 1, opacity: i === 0 ? 1 : 0 }}
                >
                  <Link href={study.href} className="block h-full max-h-full">
                    <Image
                      src={study.image}
                      alt={`Case study ${i + 1}`}
                      width={1062}
                      height={597}
                      sizes="(max-width: 1200px) 90vw, 1062px"
                      className="h-full w-auto max-w-full rounded-3xl object-contain"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Static stacked layout — mobile/tablet, and the reduced-motion fallback */}
      <div className={`pt-24 ${reducedMotion ? "" : "lg:hidden"}`}>
        <Eyebrow className="justify-center">Case Studies</Eyebrow>
        <h2 className="heading-display mt-3 px-5 text-center text-[44px] leading-[1.1] text-ink sm:hidden">
          Real Strategies Real Growth Real Results
        </h2>
        <div className="mt-3 hidden sm:block">
          <HeadingTicker />
        </div>
        <Container className="mt-10">
          <div className="mx-auto flex max-w-[1062px] flex-col gap-8">
            {caseStudies.map((study, i) => (
              <Link key={study.image} href={study.href} className="group block">
                <Image
                  src={study.image}
                  alt={`Case study ${i + 1}`}
                  width={1062}
                  height={597}
                  sizes="(max-width: 1200px) 100vw, 1062px"
                  className="w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.01] lg:rounded-3xl"
                />
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
