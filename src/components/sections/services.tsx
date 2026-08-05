"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { ArrowDiag } from "@/components/ui/arrow-diag";
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

export function Services() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="flex flex-col gap-5 lg:items-center">
        <Eyebrow className="lg:justify-center">Our Services</Eyebrow>
        <h2 className="heading-display text-[44px] leading-[1.05] text-ink lg:whitespace-nowrap lg:text-center lg:text-[64px] lg:leading-[69px]">
          Everything Your Brand Needs
        </h2>
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
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? -1 : i)}
                className="block w-full cursor-pointer text-left"
              >
                <Container
                  className={`flex flex-col gap-4 py-5 lg:flex-row lg:items-start lg:justify-between lg:py-7 ${
                    isOpen ? "lg:pb-10" : ""
                  }`}
                >
                  <div className="max-w-[620px] flex-1">
                    <h3
                      className={`text-[26px] font-semibold leading-tight tracking-[-0.88px] lg:text-[40px] lg:leading-[64px] ${
                        isOpen ? "text-black" : "text-black group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </h3>
                    {isOpen && (
                      <p className="mt-1 max-w-[514px] text-lg leading-relaxed text-black lg:text-[22px] lg:leading-[31px]">
                        {service.description}
                      </p>
                    )}
                  </div>

                  {isOpen && (
                    <div className="flex max-w-[450px] flex-wrap content-start gap-2 lg:mt-5 lg:justify-start">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-pill bg-[rgba(220,204,255,0.5)] px-[15px] py-[9px] text-sm font-medium text-[#0b0c0f]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <ArrowDiag
                    className={`h-[26px] w-[30px] shrink-0 self-end transition-transform lg:h-[35px] lg:w-[41px] lg:self-start ${
                      isOpen
                        ? "-scale-y-100 text-brand lg:mt-2"
                        : "text-brand group-hover:text-white lg:mt-4"
                    }`}
                  />
                </Container>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-14 flex justify-center px-5 lg:mt-16">
        <PillButton href={siteConfig.cta.href} className="w-full sm:w-auto">
          Book a FREE strategy call
        </PillButton>
      </div>
    </section>
  );
}
