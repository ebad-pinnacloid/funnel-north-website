import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

const cards = [
  {
    icon: "/icons/contact-phone.svg",
    iconSize: 20,
    eyebrow: "Call us",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    detail: "Mon – Fri, 9:00 AM – 6:00 PM. We're happy to talk it through.",
    surface: "bg-lime-soft",
  },
  {
    icon: "/icons/contact-email.svg",
    iconSize: 26,
    eyebrow: "Email us",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    detail: "Send us a brief and we'll reply within one business day.",
    surface: "bg-purple-soft",
  },
];

/** The two tinted contact cards below the form. */
export function ContactDetails() {
  return (
    <section className="bg-white pt-16 lg:pt-24">
      <Container className="grid gap-8 lg:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal
            key={card.eyebrow}
            delay={i * 0.1}
            className={`flex flex-col gap-6 rounded-3xl p-8 lg:p-10 ${card.surface}`}
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-black">
              <Image
                src={card.icon}
                alt=""
                width={card.iconSize}
                height={card.iconSize}
                style={{ width: card.iconSize, height: card.iconSize }}
              />
            </span>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[1.5px] text-black">
                {card.eyebrow}
              </p>
              <a
                href={card.href}
                className="w-fit text-xl font-semibold text-ink transition-opacity hover:opacity-70 lg:text-2xl"
              >
                {card.value}
              </a>
              <p className="text-sm leading-[22px] text-[#6b667e]">{card.detail}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
