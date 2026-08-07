import type { Metadata } from "next";
import { CaseStudyHero } from "@/components/sections/case-study/case-study-hero";
import { CaseStudyOverview } from "@/components/sections/case-study/case-study-overview";
import { CaseStudyChallenge } from "@/components/sections/case-study/case-study-challenge";
import { CaseStudyStrategy } from "@/components/sections/case-study/case-study-strategy";
import { CaseStudyPerformance } from "@/components/sections/case-study/case-study-performance";
import { CaseStudyResults } from "@/components/sections/case-study/case-study-results";
import { Contact } from "@/components/sections/contact";

const title = "USA Home Remodeling Brand";
const description =
  "How Funnel North built a scalable Meta advertising lead engine for a USA home remodeling brand — 505 leads, 230K+ impressions and $0.46 per landing-page visit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-studies/kn-remodeling" },
  openGraph: { title, description, url: "/case-studies/kn-remodeling" },
  twitter: { title, description },
};

export default function KnRemodelingCaseStudyPage() {
  return (
    <>
      {/* The detail hero uses the clean photograph, not the tinted, branded
          crop the listing card carries (Figma 710:6811). */}
      <CaseStudyHero
        title={title}
        image="/images/case-study-3-hero.jpg"
        imageAlt="A renovated open-plan kitchen with a large island, pendant lights and bar stools"
      />
      <CaseStudyOverview />
      <CaseStudyChallenge />
      <CaseStudyStrategy />
      <CaseStudyPerformance />
      <CaseStudyResults />
      <Contact />
    </>
  );
}
