import Image from "next/image";

/* The wordmark caps at the frame's 283px, so past 1440 it stops growing while
   the full-bleed photo keeps scaling with the viewport. */
const WORDMARK_SIZE = "clamp(52px,19.68vw,283px)";

/* What has to line up is the black band's top edge against the letters — in
   the frame it crops their bottom 55.6px (0.1965 of the type size). The band
   sits 24.58% down the photo, and the photo's height is 0.5625 of the page
   width, so that offset is 13.826% of the width. A margin-top percentage also
   resolves against the containing block's width, which lets both terms be
   expressed in one calc: pull the photo up by the band's own offset plus the
   distance from the wordmark's box bottom back to the crop line.
   (0.3069 = 0.1104 box-bottom-to-baseline + 0.1965 crop, in ems.) */
const VISUAL_PULL = `calc(-13.826% - 0.3069 * ${WORDMARK_SIZE})`;

/**
 * "Our services" wordmark with the meeting scene rising into it.
 *
 * The photo is an RGBA cutout whose top fifth is transparent, so only the
 * figures overlap the type while the black band behind them crops the
 * letterforms — the same treatment as the About hero, where the video edge
 * does the cropping directly.
 */
export function ServicesHero() {
  return (
    <section className="bg-white pt-[clamp(96px,10.6vw,152px)]">
      <h1
        className="heading-display animate-rise text-center leading-[1.1] text-brand"
        style={{ fontSize: WORDMARK_SIZE }}
      >
        Our services
      </h1>

      <div
        className="animate-hero-visual relative aspect-[1440/810] w-full"
        style={{ marginTop: VISUAL_PULL }}
      >
        {/* Black band — sits behind the cutout, starting a quarter down */}
        <div className="absolute inset-x-0 bottom-0 top-[24.58%] bg-black" />
        <Image
          src="/images/services-hero.png"
          alt="The Funnel North team around a table in a strategy session"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Fades the scene into the black band's foot */}
        <div className="absolute inset-x-0 bottom-0 top-[8.95%] bg-gradient-to-b from-transparent from-[63%] to-black opacity-[0.79]" />
      </div>
    </section>
  );
}
