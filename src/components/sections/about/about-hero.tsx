import Image from "next/image";

/**
 * Oversized purple wordmark sitting directly on a full-bleed team photo.
 *
 * The type scales with the viewport but caps at the 1440 design value (283px)
 * so the ultra-wide `zoom` in globals.css scales it like the rest of the page
 * instead of compounding with vw. Anton's content box is ~1.5em tall, so the
 * line height — not a margin — is what sets the baseline against the photo's
 * top edge; the 0.936 here reproduces the design's 12px gap.
 */
export function AboutHero() {
  return (
    <section className="bg-white pt-[clamp(112px,13.96vw,201px)]">
      <h1 className="heading-display animate-rise text-center text-[clamp(52px,19.68vw,283px)] leading-[0.936] text-brand">
        Who we are
      </h1>
      <div className="animate-hero-visual relative aspect-[1440/750] w-full">
        <Image
          src="/images/about-hero.jpg"
          alt="The Funnel North team reviewing a campaign timeline and performance reports together"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
