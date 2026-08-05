/**
 * Shared section header pattern from the design: a small eyebrow with a brand
 * dot ("● OUR SERVICES") followed by an oversized Anton display title.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <header className={`flex flex-col gap-4 ${alignment}`}>
      <p
        className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide ${
          onDark ? "text-overlay-white-60" : "text-muted"
        }`}
      >
        <span aria-hidden className={`size-2 rounded-full ${onDark ? "bg-accent" : "bg-brand"}`} />
        {eyebrow}
      </p>
      <h2
        className={`heading-display text-4xl sm:text-5xl lg:text-6xl ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </header>
  );
}
