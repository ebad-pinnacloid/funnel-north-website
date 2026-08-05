/**
 * Section eyebrow from the design: 8px brand dot + bold uppercase label
 * (purple on light surfaces, lime on dark).
 */
export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2 text-base font-bold uppercase tracking-[-0.5px] ${
        onDark ? "text-accent" : "text-brand"
      } ${className}`}
    >
      <span aria-hidden className={`size-2 rounded-full ${onDark ? "bg-accent" : "bg-brand"}`} />
      {children}
    </p>
  );
}
