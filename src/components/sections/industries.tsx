"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

/* Preview images per industry can be added once provided; the design ships
   with the healthcare visual, reused for every row until then. */
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
    image: "/images/industries-healthcare.jpg",
  },
  {
    title: "Law Firm Marketing",
    description:
      "High-intent lead generation that turns searches into signed clients.",
    image: "/images/industries-healthcare.jpg",
  },
  {
    title: "Construction Marketing",
    description:
      "Pipeline-building campaigns that win bigger commercial and residential projects.",
    image: "/images/industries-healthcare.jpg",
  },
  {
    title: "SaaS Marketing",
    description:
      "Full-funnel growth loops that turn trials into retained, expanding accounts.",
    image: "/images/industries-healthcare.jpg",
  },
  {
    title: "Ecommerce Marketing",
    description:
      "Profit-focused acquisition and retention for stores ready to scale.",
    image: "/images/industries-healthcare.jpg",
  },
];

export function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gradient-to-b from-[#f3eeff] to-white py-16 lg:py-24">
      <Container className="flex flex-col gap-10 lg:gap-[60px]">
        <div className="flex flex-col gap-5 lg:items-center">
          <Eyebrow className="lg:justify-center">Industries</Eyebrow>
          <h2 className="heading-display text-[44px] leading-[1.05] text-ink lg:text-center lg:text-[70px] lg:leading-[71px]">
            Expertise Across Industries
          </h2>
        </div>

        <div className="flex flex-col gap-8 lg:h-[710px] lg:flex-row lg:gap-12">
          {/* Preview image — above the list on mobile, right column on desktop */}
          <div className="relative order-first aspect-square w-full overflow-hidden rounded-3xl lg:order-last lg:aspect-auto lg:h-full lg:w-[592px] lg:shrink-0">
            <Image
              key={industries[active]?.image}
              src={industries[active]?.image ?? industries[0].image}
              alt={industries[active]?.title ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 592px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col">
            {industries.map((industry, i) => {
              const isActive = i === active;
              const number = String(i + 1).padStart(2, "0");
              return isActive ? (
                <div
                  key={industry.title}
                  className="flex items-center gap-4 rounded-3xl bg-brand p-5 lg:h-[130px]"
                >
                  <p className="self-start pt-1 text-sm font-medium leading-5 text-accent lg:self-center lg:pt-0">
                    {number}
                  </p>
                  <div className="flex flex-col gap-1 text-white">
                    <h3 className="text-[22px] font-semibold tracking-[-0.3px] lg:text-[28px] lg:leading-9">
                      {industry.title}
                    </h3>
                    <p className="text-sm leading-[18px]">{industry.description}</p>
                  </div>
                </div>
              ) : (
                <button
                  key={industry.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex h-[76px] w-full cursor-pointer items-center gap-4 border-b border-black/20 px-5 text-left transition-colors hover:bg-black/5 lg:h-[116px]"
                >
                  <span className="text-sm font-medium leading-5 text-muted">{number}</span>
                  <span className="text-xl font-semibold tracking-[-0.2px] text-ink lg:text-2xl lg:leading-8">
                    {industry.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
