import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";

const caseStudies = [
  { image: "/images/case-study-1.jpg", title: "Title goes here", href: "/case-studies" },
  { image: "/images/case-study-2.jpg", title: "Title goes here", href: "/case-studies" },
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-5 px-2.5">
      <span className="heading-display whitespace-nowrap text-5xl text-ink lg:text-[80px] lg:leading-[124px] lg:tracking-[-1.69px]">
        {text}
      </span>
      <Image
        src="/images/badge-funnel.png"
        alt=""
        width={52}
        height={52}
        className="size-10 shrink-0 lg:size-[52px]"
      />
    </span>
  );
}

export function CaseStudies() {
  const marqueeTexts = ["Real Strategies", "Real Growth", "Real Results"];

  return (
    <section className="bg-white py-24">
      <Eyebrow className="justify-center">Case Studies</Eyebrow>

      {/* Heading ticker — mobile shows it stacked and static */}
      <h2 className="heading-display mt-3 px-5 text-center text-[44px] leading-[1.1] text-ink sm:hidden">
        Real Strategies Real Growth Real Results
      </h2>
      <div className="mt-3 hidden overflow-hidden sm:block" aria-hidden>
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex">
              {marqueeTexts.map((text) => (
                <MarqueeItem key={text} text={text} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Container className="mt-10 lg:mt-16">
        <div className="mx-auto flex max-w-[1062px] flex-col gap-8">
          {caseStudies.map((study, i) => (
            <Link key={study.image} href={study.href} className="group block">
              <Image
                src={study.image}
                alt={`Case study ${i + 1}`}
                width={1062}
                height={597}
                sizes="(max-width: 1200px) 100vw, 1062px"
                className="w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.01] lg:rounded-3xl"
              />
              <span className="mt-3 flex items-center justify-between text-sm font-bold uppercase tracking-wide text-ink lg:hidden">
                {study.title}
                <span aria-hidden className="text-brand">↗</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-14 flex justify-center lg:mt-20">
          <PillButton href="/case-studies" variant="dark" className="w-full sm:w-auto">
            See more case studies
          </PillButton>
        </div>
      </Container>
    </section>
  );
}
