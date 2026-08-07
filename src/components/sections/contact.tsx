"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SelectField } from "@/components/ui/select-field";
import { siteConfig } from "@/lib/site";

const services = [
  "Performance Marketing",
  "Search Engine Optimization",
  "AI Search Optimization",
  "AI Marketing & Automation",
  "Website Design & Development",
  "Branding & Designing",
  "Analytics & Tracking",
  "Not Sure Yet",
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
  const stageRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Desktop fold-out: while the stage is pinned, scale the card from a folded
     55% up to full width and fade the content in, scrubbed by scroll so
     scrolling back up folds it again. The .contact-* CSS (globals.css) only
     pins on lg screens without reduced motion; the same media checks here keep
     the inline transforms in sync. */
  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!stage || !card || !content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!desktop.matches) {
        card.style.transform = "";
        card.style.borderRadius = "";
        content.style.opacity = "";
        content.style.transform = "";
        return;
      }
      // Progress runs from the stage entering the viewport (not from the pin
      // engaging), so the card is already unfolding and the form partially
      // visible while the user is still scrolling towards the section.
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh - rect.top) / rect.height, 0), 1);
      // The card is bottom-anchored in the pin box; capping its scale so the
      // top edge stays below the stage top (+ gap) guarantees it can never
      // overlap the FAQ above, no matter the viewport. The cap loosens as the
      // stage scrolls up, releasing the rest of the growth while pinned.
      const boxBottom = Math.max(rect.top + 0.75 * vh, vh);
      const scaleCap = (boxBottom - rect.top - 32) / card.offsetHeight;
      const scale = Math.min(0.32 + 0.68 * progress, scaleCap);
      const radius = Math.round(48 * (1 - progress));
      card.style.transform = `scale(${scale.toFixed(4)})`;
      card.style.borderRadius = `48px 48px ${radius}px ${radius}px`;
      const text = Math.min(Math.max((progress - 0.1) / 0.5, 0), 1);
      content.style.opacity = text.toFixed(3);
      content.style.transform = `translateY(${(24 * (1 - text)).toFixed(1)}px)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={stageRef} id="contact" className="contact-stage">
      <div className="contact-pin">
        <div
          ref={cardRef}
          className="contact-card rounded-t-[32px] bg-gradient-to-b from-brand to-black pb-16 pt-14 text-white lg:rounded-t-[48px] lg:pb-[86px] lg:pt-[76px]"
        >
          <div ref={contentRef}>
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
            <SelectField
              name="service"
              options={services}
              placeholder="Select a service"
              required
            />
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
          </div>
        </div>
      </div>
    </section>
  );
}
