import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/sections/case-studies-page/case-studies-hero";
import { CaseStudiesGrid } from "@/components/sections/case-studies-page/case-studies-grid";

const title = "Case Studies";
const description =
  "Selected work from Funnel North — dermatology, AI education and home remodeling brands we've grown through strategy, creative and performance marketing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: { title, description, url: "/case-studies" },
  twitter: { title, description },
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesGrid />
    </>
  );
}
