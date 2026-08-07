import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact-page/contact-hero";
import { ContactFormCard } from "@/components/sections/contact-page/contact-form-card";
import { ContactDetails } from "@/components/sections/contact-page/contact-details";
import { ContactLocations } from "@/components/sections/contact-page/contact-locations";
import { Contact } from "@/components/sections/contact";

const title = "Contact Us";
const description =
  "Tell Funnel North about your goals and our team will get back to you within one business day. Call, email, or send a brief from any of our four hubs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
  twitter: { title, description },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormCard />
      <ContactDetails />
      <ContactLocations />
      <Contact />
    </>
  );
}
