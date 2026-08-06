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

/* The hero always fills exactly the first screen (100svh, with a floor for
   very short viewports); type and media use fluid viewport-based sizes so
   the composition scales to any display. */
export function Hero() {
  return (
    <section className="flex h-svh min-h-[600px] flex-col overflow-hidden bg-black text-white">
      <Container className="flex w-full flex-1 flex-col justify-center gap-7 pt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pt-24">
        <Parallax
          speed={0.06}
          className="order-first w-full max-w-full lg:order-last lg:w-[43vw] lg:max-w-[820px] lg:shrink-0"
        >
          <div className="animate-float h-[clamp(200px,30svh,330px)] overflow-hidden rounded-3xl lg:aspect-video lg:h-auto lg:max-h-[70svh] lg:rounded-none">
            <video
              src="/videos/header-3D.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden
              className="animate-hero-visual size-full object-cover"
            />
          </div>
        </Parallax>

        <div className="max-w-[570px] lg:w-[44vw] lg:max-w-none">
          <h1 className="heading-display animate-rise text-[clamp(40px,13.5vw,54px)] leading-[1.08] [--rise-delay:0.05s] sm:text-7xl lg:text-[clamp(64px,6.7vw,150px)] lg:leading-[1.1]">
            Lead Growth Forward
          </h1>
          <p className="animate-rise mt-4 max-w-[490px] text-base font-medium leading-normal text-overlay-white-60 [--rise-delay:0.2s] lg:max-w-[34vw] lg:text-[clamp(16px,1.4vw,26px)] lg:leading-normal">
            {siteConfig.description}
          </p>
          <div className="animate-rise mt-7 lg:mt-9 [--rise-delay:0.35s]">
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
      </Container>
    </section>
  );
}
