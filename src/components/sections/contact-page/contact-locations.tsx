"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const locations = [
  {
    city: "Austin, TX, USA",
    detail: "78731",
    pin: { left: "32%", top: "46%" },
  },
  {
    city: "Lahore, Pakistan",
    detail: "Pinnacloid — near Ramada, Block N Gulberg III, 54660",
    pin: { left: "64%", top: "34%" },
  },
];

/** The 20px map pin, drawn once and tinted by the row it sits in. */
function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="size-5 shrink-0" fill="none">
      <path
        d="M16.6673 8.33329C16.6673 13.3333 10.0007 18.3333 10.0007 18.3333C10.0007 18.3333 3.33398 13.3333 3.33398 8.33329C3.33398 6.56518 4.03636 4.86949 5.28661 3.61925C6.53685 2.36901 8.23254 1.66663 10.0007 1.66663C11.7688 1.66663 13.4645 2.36901 14.7147 3.61925C15.9649 4.86949 16.6673 6.56518 16.6673 8.33329Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z"
        stroke="currentColor"
        strokeWidth="1.66667"
      />
    </svg>
  );
}

/** "Where we operate": selectable office list beside the stylised map. */
export function ContactLocations() {
  const [selected, setSelected] = useState(0);
  const active = locations[selected];

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <Reveal className="flex flex-col gap-10 rounded-3xl border border-[#e8e4f4] bg-white p-7 sm:p-10 lg:flex-row lg:items-center lg:gap-12 lg:p-16">
          <div className="flex flex-1 flex-col gap-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-brand">
              <span aria-hidden className="size-2 rounded-full bg-brand" />
              Locations
            </p>
            <h2 className="heading-display text-[30px] leading-[1.05] text-ink lg:text-[40px]">
              Where we operate
            </h2>
            <p className="text-[15px] leading-6 text-[#6b667e]">
              We partner with brands from two hubs. Select a location to explore where our teams
              work from.
            </p>

            <ul className="flex flex-col gap-3">
              {locations.map((location, i) => {
                const isActive = i === selected;
                return (
                  <li key={location.city}>
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-pressed={isActive}
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-md border px-5 py-[18px] text-left transition-colors ${
                        isActive
                          ? "border-brand bg-brand text-white"
                          : "border-[#e8e4f4] bg-white text-brand hover:border-brand/40"
                      }`}
                    >
                      <PinIcon />
                      <span className="flex flex-col gap-0.5">
                        <span
                          className={`text-base font-semibold ${isActive ? "text-white" : "text-ink"}`}
                        >
                          {location.city}
                        </span>
                        <span
                          className={`text-[13px] ${isActive ? "text-white/75" : "text-[#6b667e]"}`}
                        >
                          {location.detail}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Stylised map: the selected office's pin and label move across it */}
          <div
            aria-hidden
            className="relative aspect-[576/520] w-full overflow-hidden rounded-md bg-[#f4f1fc] lg:w-[576px] lg:shrink-0"
          >
            <Image
              src="/images/contact-map-roads.svg"
              alt=""
              fill
              className="scale-[1.56] object-cover"
            />
            <div
              className="absolute flex items-center gap-2 transition-[left,top] duration-500 ease-out motion-reduce:transition-none"
              style={{ left: active.pin.left, top: active.pin.top }}
            >
              <Image
                src="/images/contact-map-pin.svg"
                alt=""
                width={44}
                height={54}
                className="h-[54px] w-11 -translate-x-1/2 -translate-y-full drop-shadow"
              />
              <span className="whitespace-nowrap rounded-pill bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-[0_4px_12px_rgba(15,8,43,0.15)]">
                {active.city}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
