import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services-page/services-hero";
import { ServicesProcess } from "@/components/sections/services-page/services-process";
import { Services } from "@/components/sections/services";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

const title = "Services";
const description =
  "Performance marketing, SEO and AI search, automation, web design and development, branding and analytics — everything your brand needs to grow, delivered end to end by Funnel North.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
  twitter: { title, description },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Services eyebrow="Services we offer" />
      <ServicesProcess />
      <Faq />
      <Contact />
    </>
  );
}
