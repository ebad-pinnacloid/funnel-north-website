"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const team = [
  { name: "Ayesha Malik", role: "Strategy Lead", image: "/images/team-1.jpg" },
  { name: "Amanullah", role: "Marketing Director", image: "/images/team-2.jpg" },
  { name: "Ayesha Malik", role: "Marketing Director", image: "/images/team-3.jpg" },
  { name: "Nouman Raza", role: "Marketing Director", image: "/images/team-4.jpg" },
];

/** "The people behind the work" — a scroll-snapped portrait carousel. */
export function AboutTeam() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncBounds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 1);
  }, []);

  useEffect(() => {
    syncBounds();
    window.addEventListener("resize", syncBounds);
    return () => window.removeEventListener("resize", syncBounds);
  }, [syncBounds]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // One card plus its gap, measured from the rendered card so the step stays
    // correct at every breakpoint and under the ultra-wide page zoom.
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-mist to-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>The team</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-display mt-5 max-w-[650px] text-[44px] text-ink lg:text-[72px]">
                <span className="lg:block">The people</span>{" "}
                <span className="lg:block">behind the work.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous team members"
              className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-ink/20 text-white transition-[background-color,opacity] hover:bg-brand disabled:cursor-default disabled:opacity-40 disabled:hover:bg-ink/20"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M16 10H4M9 15L4 10L9 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Next team members"
              className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-[background-color,opacity] hover:bg-brand-deep disabled:cursor-default disabled:opacity-40 disabled:hover:bg-brand"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M4 10H16M11 15L16 10L11 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Reveal>
        </div>
      </Container>

      {/* Full-bleed track: cards run past the container's right gutter as designed */}
      <ul
        ref={trackRef}
        onScroll={syncBounds}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 sm:px-8 lg:mt-11 lg:pl-20 lg:pr-0"
      >
        {team.map((member, i) => (
          <li
            key={`${member.name}-${i}`}
            className="group relative aspect-[330/440] w-[260px] shrink-0 snap-start overflow-hidden rounded-[20px] lg:w-[330px]"
          >
            <Image
              src={member.image}
              alt={`${member.name}, ${member.role} at Funnel North`}
              fill
              sizes="(max-width: 1023px) 260px, 330px"
              className="object-cover"
            />
            {/* Identity panel: always legible on touch, lifts in on hover */}
            <div className="absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-b from-ink/0 to-ink opacity-100 transition-opacity duration-500 motion-reduce:transition-none lg:opacity-0 lg:group-hover:opacity-100" />
            <div className="absolute inset-x-6 bottom-6 text-white opacity-100 transition-opacity duration-500 motion-reduce:transition-none lg:opacity-0 lg:group-hover:opacity-100">
              <p className="heading-display text-[24px] lg:text-[28px] lg:leading-[34px]!">
                {member.name}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase leading-4 tracking-[1px]">
                {member.role}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
