import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SelectField } from "@/components/ui/select-field";
import { services } from "@/lib/services";

const fieldClasses =
  "h-14 w-full rounded-md border border-line bg-white px-[18px] text-base text-ink outline-none transition-colors placeholder:text-[#5f5b70] focus:border-brand";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

/**
 * The white form card, pulled up so it overlaps the wordmark above as designed
 * (the card's top sits at y=389 against the text box's 464.6).
 *
 * The section itself stays transparent on purpose: only the 994px card should
 * cover the type, so the ends of "SAY HELLO!" that extend past the card stay
 * fully visible. A background on the section would clip the wordmark across
 * the whole width instead.
 */
export function ContactFormCard() {
  return (
    <section className="relative z-10 -mt-[clamp(24px,5.25vw,76px)]">
      <Container>
        <Reveal className="mx-auto max-w-[994px] rounded-3xl border border-[#e8e4f4] bg-white p-7 shadow-[0_4px_60px_rgba(0,0,0,0.1)] sm:p-10 lg:p-16">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-brand">
              <span aria-hidden className="size-2 rounded-full bg-brand" />
              Contact form
            </p>
            <h2 className="heading-display text-[34px] leading-[1.05] text-ink sm:text-[42px] lg:text-5xl">
              Send us a message
            </h2>
            <p className="text-base leading-[26px] text-[#6b667e]">
              Fill in the details below and our team will get back to you within one business day.
            </p>
          </div>

          {/* TODO: wire the submission to an API route / form service before launch */}
          <form className="mt-10 flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Full Name">
                <input type="text" name="name" required placeholder="Enter your full name" className={fieldClasses} />
              </Field>
              <Field label="Email">
                <input type="email" name="email" required placeholder="Enter your email address" className={fieldClasses} />
              </Field>
              <Field label="Phone Number">
                <input type="tel" name="phone" placeholder="Enter your phone number" className={fieldClasses} />
              </Field>
              <Field label="Services">
                <SelectField
                  name="service"
                  options={services}
                  placeholder="Select a service"
                  required
                  tone="light"
                />
              </Field>
            </div>

            <Field label="Tell us why you want to go NORTH?">
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your goals, challenges or upcoming project…"
                className={`${fieldClasses} h-[152px] resize-none py-4`}
              />
            </Field>

            <button
              type="submit"
              className="mt-4 w-full cursor-pointer rounded-pill bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-[0.5px] text-black transition-transform hover:scale-[1.01]"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
