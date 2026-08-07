/**
 * "Say hello!" wordmark. Same treatment as the About and Case Studies heroes —
 * 283px Anton capped at the 1440 design value with a 1.1 line height. The form
 * card below is pulled up over it, cropping the bottom of the letterforms.
 */
export function ContactHero() {
  return (
    <section className="bg-white pt-[clamp(96px,10.6vw,152px)]">
      <h1 className="heading-display animate-rise text-center text-[clamp(52px,19.68vw,283px)] leading-[1.1] text-brand">
        Say hello!
      </h1>
    </section>
  );
}
