/**
 * Section eyebrow from the design: 8px brand dot + bold uppercase label
 * (purple on light surfaces, lime on dark).
 */
const tones = {
  brand: { text: "text-brand", dot: "bg-brand" },
  deep: { text: "text-brand-deep", dot: "bg-brand-deep" },
  accent: { text: "text-accent", dot: "bg-accent" },
};

export function Eyebrow({
  children,
  onDark = false,
  tone,
  className = "",
}: {
  children: React.ReactNode;
  onDark?: boolean;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const { text, dot } = tones[tone ?? (onDark ? "accent" : "brand")];
  return (
    <p
      className={`flex items-center gap-2 text-base font-bold uppercase tracking-[-0.5px] ${text} ${className}`}
    >
      <span aria-hidden className={`size-2 rounded-full ${dot}`} />
      {children}
    </p>
  );
}
