import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

/* TODO: implement the lead form from Figma (node 346:4470) — name, email,
   phone, service dropdown, message, submit. Needs a form action (API route or
   external service) before wiring up. */
export function Contact() {
  return (
    <section id="contact" className="bg-surface-tint py-(--spacing-section-lg)">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Let's Go North" title="Ready to take your growth north?" />
          <ul className="mt-10 space-y-4 text-lg font-medium text-ink">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-deep">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="hover:text-brand-deep"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-md border border-line bg-surface p-8 text-muted">
          Lead form coming soon.
        </div>
      </Container>
    </section>
  );
}
