"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

/* Only the first answer is defined in the design; the rest are on-brand
   placeholders until real copy arrives (will come from Decap CMS). */
const faqs = [
  {
    question: "What makes Funnel North different from other marketing agencies?",
    answer:
      "We combine sharp strategy, bold creative, performance marketing, and smart automation to build growth systems that turn attention into measurable business results.",
  },
  {
    question: "What services does Funnel North provide?",
    answer:
      "Performance marketing, SEO and AI search optimization, AI marketing automation, website design and development, branding, and analytics — everything your brand needs to grow, end to end.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work across healthcare, education, law, construction, SaaS, and ecommerce, adapting proven growth playbooks to each industry's buying journey.",
  },
  {
    question: "How soon can we expect to see results?",
    answer:
      "Paid campaigns typically show traction within the first 30–60 days, while SEO and brand initiatives compound over 3–6 months. We report progress transparently from week one.",
  },
  {
    question: "Do you work with startups and established brands?",
    answer:
      "Yes — from ambitious startups finding their first repeatable channel to established brands scaling what works, we meet you where you are.",
  },
  {
    question: "How do we get started with Funnel North?",
    answer:
      "Book a free strategy call. We'll audit your current funnel, identify the biggest growth levers, and map out a plan before you commit to anything.",
  },
];

export function Faq() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-display text-[44px] leading-[1.05] text-ink lg:text-[64px] lg:leading-[69px]">
              Frequently Asked Questions
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 lg:mt-16">
          {faqs.map((faq, i) => {
            const isOpen = i === expanded;
            return (
              <Reveal key={faq.question} delay={Math.min(i * 0.05, 0.25)}>
                <div
                  className={`border-b transition-colors duration-500 motion-reduce:transition-none ${
                    i === 0 ? "border-t" : ""
                  } ${
                    isOpen
                      ? "rounded-md border-transparent bg-surface-tint"
                      : `border-line bg-transparent hover:bg-surface-tint/40 ${
                          i === expanded - 1 ? "border-b-transparent" : ""
                        }`
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? -1 : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-7 text-left lg:px-8 lg:py-10"
                  >
                    <span className="text-lg font-semibold tracking-[-0.4px] text-ink lg:text-2xl lg:leading-8">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full text-2xl font-medium transition-colors duration-300 lg:size-10 ${
                        isOpen ? "bg-brand text-white" : "bg-surface-tint text-brand-deep"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p
                        className={`max-w-[1120px] px-5 pb-7 text-base leading-7 text-[#5f5b70] transition-[opacity,transform] duration-500 motion-reduce:transition-none lg:px-8 lg:pb-11 lg:text-lg ${
                          isOpen ? "opacity-100" : "translate-y-2 opacity-0"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
