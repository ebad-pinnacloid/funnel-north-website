import { type ReactNode } from "react";

const tones = {
  brand: "text-brand",
  danger: "text-[#ff2828]",
  accent: "text-accent",
};

const rules = {
  brand: "border-brand",
  subtle: "border-black/10",
  dark: "border-white/12",
};

/**
 * The case-study page's repeating section header: a 24px coloured label with a
 * hairline rule beneath it, optionally introduced by a line of body copy.
 */
export function SectionLabel({
  children,
  intro,
  tone = "brand",
  rule = "subtle",
}: {
  children: ReactNode;
  intro?: ReactNode;
  tone?: keyof typeof tones;
  rule?: keyof typeof rules;
}) {
  return (
    <div className={`flex flex-col gap-5 border-b pb-3 ${rules[rule]}`}>
      <h2 className={`text-[22px] font-semibold leading-[1.4] lg:text-2xl ${tones[tone]}`}>
        {children}
      </h2>
      {intro && (
        <p
          className={`text-[17px] leading-7 lg:text-lg ${
            rule === "dark" ? "text-carbon-muted" : "text-[#595959]"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
