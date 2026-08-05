import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

const services = [
  "Performance Marketing",
  "Search Engine Optimization",
  "AI Search Optimization",
  "AI Marketing & Automation",
  "Website Design & Development",
  "Branding & Designing",
  "Analytics & Tracking",
];

/* TODO: implement the expanding row treatment from Figma (node 278:11524) —
   each row opens to show a description and capability tags. */
export function Services() {
  return (
    <section className="py-(--spacing-section-lg)">
      <Container>
        <SectionHeading eyebrow="Our Services" title="Everything your brand needs" align="center" />
      </Container>
      <ul className="mt-16 border-t border-line">
        {services.map((service) => (
          <li key={service} className="border-b border-line">
            <Container className="flex items-center justify-between py-8">
              <h3 className="heading-display text-2xl text-ink sm:text-4xl">{service}</h3>
              <span aria-hidden className="text-2xl text-brand">
                ↗
              </span>
            </Container>
          </li>
        ))}
      </ul>
      <div className="mt-16 flex justify-center">
        <PillButton href={siteConfig.cta.href}>Book a FREE strategy call</PillButton>
      </div>
    </section>
  );
}
