import { Hero } from "@/components/sections/hero";
import { CaseStudies } from "@/components/sections/case-studies";
import { Impact } from "@/components/sections/impact";
import { Services } from "@/components/sections/services";
import { Insights } from "@/components/sections/insights";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CaseStudies />
      <Impact />
      <Services />
      <Insights />
      <Faq />
      <Contact />
    </>
  );
}
