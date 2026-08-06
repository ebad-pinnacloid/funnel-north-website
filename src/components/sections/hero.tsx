import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/ui/parallax";
import { PillButton } from "@/components/ui/pill-button";
import { siteConfig } from "@/lib/site";

const trustLogos = [
  { src: "/images/client-logo-1.png", tall: false },
  { src: "/images/client-logo-2.png", tall: false },
  { src: "/images/client-logo-3.png", tall: true },
  { src: "/images/client-logo-4.png", tall: false },
  { src: "/images/client-logo-5.png", tall: true },
  { src: "/images/client-logo-6.png", tall: true },
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-black text-white">
      <Container className="relative pt-24 lg:pt-40">
        <Parallax
          speed={0.06}
          className="mx-auto w-[336px] max-w-full lg:absolute lg:right-8 lg:top-44 lg:mx-0 lg:w-[620px] xl:right-0"
        >
          <div className="animate-float">
            <video
              src="/videos/header-3D.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden
              className="animate-hero-visual w-full"
            />
          </div>
        </Parallax>

        <div className="relative mt-8 max-w-[570px] lg:mt-16">
          <h1 className="heading-display animate-rise text-[54px] leading-[1.1] [--rise-delay:0.05s] sm:text-7xl lg:text-[96px] lg:leading-[106px] lg:tracking-[-1.45px]">
            Lead Growth Forward
          </h1>
          <p className="animate-rise mt-4 max-w-[490px] text-base font-medium leading-normal text-overlay-white-60 [--rise-delay:0.2s] lg:text-xl lg:leading-7">
            {siteConfig.description}
          </p>
          <div className="animate-rise mt-8 [--rise-delay:0.35s]">
            <PillButton href={siteConfig.cta.href} className="w-full sm:w-auto">
              Book a FREE strategy call
            </PillButton>
          </div>
        </div>

        {/* Trust bar — client logos hidden for now; re-enable by removing `false &&` */}
        {false && (
          <div className="animate-rise relative mt-16 pb-12 [--rise-delay:0.5s] lg:mt-32 lg:pb-11">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold tracking-[0.1px] text-accent">
                WE&rsquo;VE GOT THE COMPANY
              </p>
              <span aria-hidden className="size-3 rounded-full bg-accent lg:size-3.5" />
            </div>
            <div className="mt-4 border-t border-overlay-white-16 lg:mt-[18px]" />
            <div className="mt-6 flex items-center justify-between gap-8 overflow-hidden">
              {trustLogos.map((logo, i) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt=""
                  width={96}
                  height={logo.tall ? 34 : 22}
                  className={`w-[87px] shrink-0 object-contain lg:w-[96px] ${
                    logo.tall ? "h-[30px] lg:h-[34px]" : "h-[19px] lg:h-[22px]"
                  } ${i > 2 ? "hidden lg:block" : ""}`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="pb-16 lg:pb-28" />
      </Container>
    </section>
  );
}
