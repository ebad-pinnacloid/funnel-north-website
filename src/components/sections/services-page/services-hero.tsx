import Image from "next/image";

/**
 * "Our services" wordmark with the meeting scene rising into it.
 *
 * The photo is an RGBA cutout whose top fifth is transparent, so only the
 * figures overlap the type — the black band behind them starts lower down
 * (y=377 in the frame) and the gradient fades the scene out to black at the
 * bottom. Everything is positioned as a percentage of the image box so the
 * whole composition scales together.
 */
export function ServicesHero() {
  return (
    <section className="bg-white pt-[clamp(96px,10.6vw,152px)]">
      <h1 className="heading-display animate-rise text-center text-[clamp(52px,19.68vw,283px)] leading-[1.1] text-brand">
        Our services
      </h1>

      <div className="animate-hero-visual relative -mt-[clamp(52px,19.88vw,286px)] aspect-[1440/810] w-full">
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
