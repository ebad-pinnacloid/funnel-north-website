import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    question: "What makes Funnel North different from other marketing agencies?",
    answer:
      "We pair sharp strategy with bold creative and hold ourselves to measurable revenue outcomes, not vanity metrics.",
  },
  { question: "What services does Funnel North provide?", answer: "" },
  { question: "Which industries do you work with?", answer: "" },
  { question: "How soon can we expect to see results?", answer: "" },
  { question: "Do you work with startups and established brands?", answer: "" },
  { question: "How do we get started with Funnel North?", answer: "" },
];

/* Native <details> keeps the accordion dependency-free and server-rendered.
   TODO: fill in remaining answers (content will come from Decap CMS). */
export function Faq() {
  return (
    <section className="py-(--spacing-section-lg)">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-16 border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line py-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-ink sm:text-xl">
                {faq.question}
                <span aria-hidden className="text-2xl text-brand group-open:hidden">
                  +
                </span>
                <span aria-hidden className="hidden text-2xl text-brand group-open:inline">
                  −
                </span>
              </summary>
              {faq.answer && <p className="mt-4 max-w-4xl text-muted">{faq.answer}</p>}
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
