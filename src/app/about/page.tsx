import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutIntro } from "@/components/sections/about/about-intro";
import { AboutMission } from "@/components/sections/about/about-mission";
import { AboutProcess } from "@/components/sections/about/about-process";
import { AboutWhy } from "@/components/sections/about/about-why";
import { AboutPrinciples } from "@/components/sections/about/about-principles";
import { AboutTeam } from "@/components/sections/about/about-team";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

const title = "About Us";
const description =
  "Funnel North combines strategic thinking, purposeful creativity and data-driven execution to build campaigns that convert and brands that grow. Meet the team and the principles behind the work.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
  twitter: { title, description },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutMission />
      <AboutProcess />
      <AboutWhy />
      <AboutPrinciples />
      <AboutTeam />
      <Faq />
      <Contact />
    </>
  );
}
