"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const industries = [
  {
    title: "Healthcare Marketing",
    description:
      "Patient-first campaigns that build trust and keep your practice's schedule full.",
    image: "/images/industries-healthcare.jpg",
  },
  {
    title: "Education Marketing",
    description:
      "Enrollment-driving strategies for schools, ed-tech, and training providers.",
    image: "/images/industries-education.jpg",
  },
  {
    title: "Law Firm Marketing",
    description:
      "High-intent lead generation that turns searches into signed clients.",
    image: "/images/industries-law.jpg",
  },
  {
    title: "Construction Marketing",
    description:
      "Pipeline-building campaigns that win bigger commercial and residential projects.",
    image: "/images/industries-construction.jpg",
  },
  {
    title: "SaaS Marketing",
    description:
      "Full-funnel growth loops that turn trials into retained, expanding accounts.",
    image: "/images/industries-saas.jpg",
  },
  {
    title: "Ecommerce Marketing",
    description:
      "Profit-focused acquisition and retention for stores ready to scale.",
    image: "/images/industries-ecommerce.jpg",
  },
];

export function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gradient-to-b from-[#f3eeff] to-white py-16 lg:py-24">
      <Container className="flex flex-col gap-10 lg:gap-[60px]">
        <div className="flex flex-col gap-5 lg:items-center">
          <Reveal>
            <Eyebrow className="lg:justify-center">Industries</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-display text-[44px] leading-[1.05] text-ink lg:text-center lg:text-[70px] lg:leading-[71px]">
              Expertise Across Industries
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 lg:h-[710px] lg:flex-row lg:gap-12">
          {/* Preview images — stacked for crossfade; above the list on mobile, right column on desktop */}
          <Reveal
            delay={0.15}
            className="reveal-scale relative order-first aspect-square w-full overflow-hidden rounded-3xl lg:order-last lg:aspect-auto lg:h-full lg:w-[592px] lg:shrink-0"
          >
            {industries.map((industry, i) => (
              <Image
                key={industry.title}
                src={industry.image}
                alt={industry.title}
                fill
                sizes="(max-width: 1024px) 100vw, 592px"
                className={`object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
          </Reveal>

          <div className="flex flex-1 flex-col">
            {industries.map((industry, i) => {
              const isActive = i === active;
              const number = String(i + 1).padStart(2, "0");
              return (
                <Reveal key={industry.title} delay={Math.min(i * 0.06, 0.3)}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    className={`flex w-full cursor-pointer gap-4 text-left transition-all duration-500 motion-reduce:transition-none ${
                      isActive
                        ? "min-h-[96px] rounded-3xl border-b border-transparent bg-brand p-5 max-lg:flex-col max-lg:gap-2 lg:min-h-[130px] lg:items-center"
                        : `min-h-[76px] items-center rounded-none border-b bg-transparent px-5 hover:bg-black/5 lg:min-h-[116px] ${
                            i === active - 1 ? "border-transparent" : "border-black/20"
                          }`
                    }`}
                  >
                    <span
                      className={`text-sm font-medium leading-5 transition-colors duration-500 ${
                        isActive
                          ? "self-start pt-1 text-accent lg:self-center lg:pt-0"
                          : "text-muted"
                      }`}
                    >
                      {number}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span
                        className={`font-semibold transition-all duration-500 ${
                          isActive
                            ? "text-[22px] tracking-[-0.3px] text-white lg:text-[28px] lg:leading-9"
                            : "text-xl tracking-[-0.2px] text-ink lg:text-2xl lg:leading-8"
                        }`}
                      >
                        {industry.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <span className="min-h-0 overflow-hidden">
                          <span
                            className={`mt-1 block text-sm leading-[18px] text-white transition-opacity duration-500 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {industry.description}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
