"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { ArrowDiag } from "@/components/ui/arrow-diag";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

const services = [
  {
    title: "Performance Marketing",
    description:
      "We unearth the truths that make your brand tick, transforming insights into action that challenges conventions and turns heads.",
    tags: [
      "Google Ads Management",
      "Meta Ads Management",
      "LinkedIn Ads Management",
      "TikTok Ads",
      "YouTube Ads",
      "Performance Max Campaigns",
      "Remarketing Campaigns",
    ],
  },
  {
    title: "Search Engine Optimization",
    description:
      "Rank where it matters. We build organic visibility that compounds — technical foundations, content, and authority.",
    tags: ["Technical SEO", "On-page SEO", "Content Strategy", "Link Building", "Local SEO"],
  },
  {
    title: "AI Search Optimization",
    description:
      "Get found in the answers, not just the results. We optimize your brand for AI assistants and answer engines.",
    tags: ["Answer Engine Optimization", "AI Visibility Audits", "Brand Mentions", "Structured Data"],
  },
  {
    title: "AI Marketing & Automation",
    description:
      "Put growth on autopilot with AI-driven workflows that nurture, score, and convert leads while you sleep.",
    tags: ["Marketing Automation", "Chatbots", "Lead Scoring", "CRM Workflows", "Email Journeys"],
  },
  {
    title: "Website Design & Development",
    description:
      "High-performance websites engineered to convert — fast, accessible, and built around your funnel.",
    tags: ["Next.js", "Landing Pages", "E-commerce", "CRO-driven Design"],
  },
  {
    title: "Branding & Designing",
    description:
      "Sharp identities that make your brand impossible to ignore, from logo systems to full guidelines.",
    tags: ["Brand Identity", "Logo Design", "Brand Guidelines", "Creative Direction"],
  },
  {
    title: "Analytics & Tracking",
    description:
      "Decisions need data you can trust. We wire up measurement that shows exactly what drives revenue.",
    tags: ["GA4", "Server-side Tracking", "Attribution", "Reporting Dashboards"],
  },
];

/** `eyebrow` differs by page: "Our Services" on the homepage, "Services we
 *  offer" on /services — the section is otherwise identical in both frames. */
export function Services({ eyebrow = "Our Services" }: { eyebrow?: string }) {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="flex flex-col gap-5 lg:items-center">
        <Reveal>
          <Eyebrow className="lg:justify-center">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-display text-[44px] leading-[1.05] text-ink lg:whitespace-nowrap lg:text-center lg:text-[64px] lg:leading-[69px]">
            Everything Your Brand Needs
          </h2>
        </Reveal>
      </Container>

      <div className="mt-10 lg:mt-16">
        {services.map((service, i) => {
          const isOpen = i === expanded;
          return (
            <div
              key={service.title}
              className={`group border-t border-black/20 transition-colors last:border-b ${
                isOpen ? "bg-white" : "bg-white hover:bg-brand"
              }`}
            >
              <Reveal delay={Math.min(i * 0.06, 0.3)}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? -1 : i)}
                className="block w-full cursor-pointer text-left"
              >
                <Container
                  className={`flex flex-col py-5 transition-[padding] duration-500 motion-reduce:transition-none lg:flex-row lg:items-start lg:justify-between lg:py-7 ${
                    isOpen ? "lg:pb-10" : ""
                  }`}
                >
                  <div className="max-w-[620px] flex-1">
                    <h3
                      className={`text-[26px] font-semibold leading-tight tracking-[-0.88px] transition-colors duration-300 lg:text-[40px] lg:leading-[64px] ${
                        isOpen ? "text-black" : "text-black group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p
                          className={`mt-1 max-w-[514px] text-lg leading-relaxed text-black transition-[opacity,transform] duration-500 motion-reduce:transition-none lg:text-[22px] lg:leading-[31px] ${
                            isOpen ? "opacity-100" : "translate-y-2 opacity-0"
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none lg:mt-5 lg:transition-[grid-template-rows,width] ${
                      isOpen
                        ? "grid-rows-[1fr] lg:w-[450px]"
                        : "grid-rows-[0fr] lg:w-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className={`flex flex-wrap content-start gap-2 pt-4 transition-[opacity,transform] duration-500 motion-reduce:transition-none lg:w-[450px] lg:justify-start lg:pt-0 ${
                          isOpen ? "opacity-100" : "translate-y-2 opacity-0"
                        }`}
                      >
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-pill bg-[rgba(220,204,255,0.5)] px-[15px] py-[9px] text-sm font-medium text-[#0b0c0f]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ArrowDiag
                    className={`mt-4 h-[26px] w-[30px] shrink-0 self-end transition-[transform,color] duration-300 lg:h-[35px] lg:w-[41px] lg:self-start ${
                      isOpen
                        ? "-scale-y-100 text-brand lg:mt-2"
                        : "text-brand group-hover:text-white lg:mt-4"
                    }`}
                  />
                </Container>
              </button>
              </Reveal>
            </div>
          );
        })}
      </div>

      <div className="mt-14 flex justify-center px-5 lg:mt-16">
        <Reveal className="w-full sm:w-auto">
          <PillButton href={siteConfig.cta.href} className="w-full sm:w-auto">
            Book a FREE strategy call
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}
