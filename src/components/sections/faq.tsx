"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

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
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="heading-display text-[44px] leading-[1.05] text-ink lg:text-[64px] lg:leading-[69px]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 lg:mt-16">
          {faqs.map((faq, i) => {
            const isOpen = i === expanded;
            return isOpen ? (
              <div key={faq.question} className="rounded-md bg-surface-tint px-5 py-6 lg:px-8 lg:py-11">
                <button
                  type="button"
                  aria-expanded
                  onClick={() => setExpanded(-1)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <span className="text-lg font-semibold tracking-[-0.4px] text-ink lg:text-2xl lg:leading-8">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-2xl font-medium text-white"
                  >
                    −
                  </span>
                </button>
                <p className="mt-4 max-w-[1120px] text-base leading-7 text-[#5f5b70] lg:text-lg">
                  {faq.answer}
                </p>
              </div>
            ) : (
              <button
                key={faq.question}
                type="button"
                aria-expanded={false}
                onClick={() => setExpanded(i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-b border-line px-5 py-7 text-left first:border-t last:border-b lg:px-8 lg:py-14"
              >
                <span className="text-lg font-semibold tracking-[-0.4px] text-ink lg:text-2xl lg:leading-8">
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-tint text-2xl font-medium text-brand-deep"
                >
                  +
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
