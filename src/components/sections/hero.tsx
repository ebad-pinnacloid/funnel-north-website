import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="bg-brand pb-16 pt-40 text-white lg:pb-24 lg:pt-56">
      <Container>
        {/* TODO: add the hero visual (right-side image) exported from Figma */}
        <div className="max-w-2xl">
          <h1 className="heading-display text-6xl sm:text-7xl lg:text-8xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-lg text-xl font-medium text-overlay-white-60">
            {siteConfig.description}
          </p>
          <div className="mt-8">
            <PillButton href={siteConfig.cta.href}>Book a FREE strategy call</PillButton>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-24 border-t border-overlay-white-16 pt-6">
          <p className="text-sm uppercase tracking-wide text-overlay-white-60">
            Trusted by growth-minded brands
          </p>
          {/* TODO: client logo row exported from Figma */}
        </div>
      </Container>
    </section>
  );
}
