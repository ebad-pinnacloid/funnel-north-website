import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
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

const fieldClasses =
  "h-14 w-full rounded-md border border-white/16 bg-white/8 px-[18px] text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-accent";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-white">{label}</span>
      {children}
    </label>
  );
}

export function Contact() {
  return (
    <section id="contact" className="rounded-t-[32px] bg-gradient-to-b from-brand to-black pb-16 pt-14 text-white lg:rounded-t-[48px] lg:pb-[86px] lg:pt-[76px]">
      <Container className="flex flex-col gap-12 lg:flex-row lg:gap-[133px]">
        <div className="flex flex-col gap-10 lg:w-[628px]">
          <div className="flex flex-col items-start gap-[18px]">
            <Reveal>
              <p className="rounded-pill bg-accent px-3.5 py-[7px] text-[11px] font-semibold uppercase tracking-[1.06px] text-black">
                Let&rsquo;s Go North
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-display text-[52px] leading-[1.05] sm:text-6xl lg:text-[83px] lg:leading-[88px]">
                Ready to take your growth north?
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ul className="flex flex-col gap-5">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-xl font-medium tracking-[-0.2px] transition-colors hover:text-accent"
              >
                <Image src="/icons/mail.svg" alt="" width={20} height={20} />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-xl font-medium tracking-[-0.2px] transition-colors hover:text-accent"
              >
                <Image src="/icons/phone.svg" alt="" width={20} height={20} />
                {siteConfig.contact.phone}
              </a>
            </li>
            </ul>
          </Reveal>
        </div>

        {/* TODO: wire the submission to an API route / form service before launch */}
        <form className="flex flex-1 flex-col gap-5 lg:max-w-[519px]">
          <Reveal delay={0.05}>
            <Field label="Full Name">
              <input type="text" name="name" required placeholder="Enter your full name" className={fieldClasses} />
            </Field>
          </Reveal>
          <Reveal delay={0.1}>
            <Field label="Email">
              <input type="email" name="email" required placeholder="you@company.com" className={fieldClasses} />
            </Field>
          </Reveal>
          <Reveal delay={0.15}>
            <Field label="Phone Number">
              <input type="tel" name="phone" placeholder="Enter your phone number" className={fieldClasses} />
            </Field>
          </Reveal>
          <Reveal delay={0.2}>
          <Field label="Services">
            <span className="relative">
              <select
                name="service"
                required
                defaultValue=""
                className={`${fieldClasses} cursor-pointer appearance-none pr-10 [&:invalid]:text-white/40`}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service} className="text-black">
                    {service}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 16 16"
                aria-hidden
                className="pointer-events-none absolute right-[18px] top-1/2 size-4 -translate-y-1/2"
              >
                <path d="M3 6L8 11L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </span>
          </Field>
          </Reveal>
          <Reveal delay={0.25}>
            <Field label="Tell us why you want to go NORTH?">
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your goals, challenges or upcoming project…"
                className={`${fieldClasses} h-[152px] resize-none py-4`}
              />
            </Field>
          </Reveal>
          <Reveal delay={0.3}>
          <button
            type="submit"
            className="group mt-4 flex h-14 w-full cursor-pointer items-center justify-between rounded-pill bg-accent py-1 pl-6 pr-1 font-semibold text-black transition-transform hover:scale-[1.01]"
          >
            <span className="flex-1 text-center uppercase">Let&rsquo;s Go North</span>
            <span
              aria-hidden
              className="flex size-[46px] items-center justify-center rounded-full bg-black text-accent transition-transform group-hover:rotate-45"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          </Reveal>
        </form>
      </Container>
    </section>
  );
}
