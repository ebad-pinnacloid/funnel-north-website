import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";

/* Titles carry their designed line breaks: each card's heading sits on two
   lines in the 1440 frame, and the cards align on that shared baseline. */
const steps = [
  {
    title: ["Discovery &", "Research"],
    body: "We begin by understanding your business, goals, audience, and competitive landscape. This helps us identify opportunities and set the foundation for strategy.",
    surface: "bg-lime-soft",
  },
  {
    title: ["Strategy", "Development"],
    body: "Based on insights, we craft a tailored marketing strategy that aligns with your objectives and ensures every action supports measurable results.",
    image: "/images/about-process-strategy.jpg",
    imagePosition: "object-bottom",
  },
  {
    title: ["Creative", "Direction"],
    body: "Our creative team translates strategy into compelling visuals, messaging, and campaign concepts that connect with your target audience.",
    surface: "bg-purple-soft",
  },
  {
    title: ["Execution &", "Production"],
    body: "We bring the strategy to life through content creation, ad campaigns, landing pages, social media, and all necessary marketing assets.",
    image: "/images/about-process-execution.jpg",
    imagePosition: "object-cover",
  },
  {
    title: ["Launch &", "Optimization"],
    body: "Campaigns are launched across selected channels and continuously optimized to improve performance, engagement, and conversions.",
    surface: "bg-purple-soft",
  },
  {
    title: ["Reporting &", "Iteration"],
    body: "We track performance using real data and analytics, deliver transparent reports, and refine campaigns for ongoing improvement.",
    surface: "bg-lime-soft",
  },
];

/** "How we work" — six process cards over a mist-to-white wash. */
export function AboutProcess() {
  return (
    <section className="bg-gradient-to-b from-mist to-white py-16 lg:py-24">
      <Container className="flex flex-col items-center">
        <Reveal>
          <Eyebrow className="lg:justify-center">How we work</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-display mt-5 text-center text-[40px] text-ink lg:text-[70px] lg:leading-[71px]!">
            How we build success
          </h2>
        </Reveal>

        <div className="mt-10 grid w-full gap-[18.75px] lg:mt-14 lg:grid-cols-3">
          {steps.map((step, i) => {
            const onPhoto = Boolean(step.image);
            return (
              <Reveal
                key={step.title.join(" ")}
                delay={Math.min((i % 3) * 0.1, 0.2)}
                className={`relative isolate flex flex-col overflow-hidden rounded-[18.75px] px-7 pb-7 pt-28 lg:min-h-[447.75px] lg:pb-[28.125px] lg:pl-[28.125px] lg:pr-[35.625px] lg:pt-[200px] ${
                  onPhoto ? "bg-ink" : step.surface
                }`}
              >
                {step.image && (
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 100vw, 413px"
                    className={`-z-10 opacity-20 ${step.imagePosition}`}
                  />
                )}
                <h3
                  className={`text-[30px] font-medium leading-[1.1] tracking-[-0.75px] lg:text-[37.5px] lg:leading-[41.25px] ${
                    onPhoto ? "text-white" : "text-[#080d0d]"
                  }`}
                >
                  {step.title[0]}
                  <br />
                  {step.title[1]}
                </h3>
                <p
                  className={`mt-[11.25px] text-base leading-[1.4] lg:text-[16.875px] lg:leading-[23.625px] ${
                    onPhoto ? "text-white" : "text-[#1d1d1d]"
                  }`}
                >
                  {step.body}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10 flex justify-center lg:mt-[60px]">
          <PillButton href="/contact" variant="dark" className="max-sm:w-full">
            Book a FREE strategy call
          </PillButton>
        </Reveal>
      </Container>
    </section>
  );
}
