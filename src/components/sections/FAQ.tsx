import SectionHeading from "@/components/SectionHeading";

const FAQS = [
  {
    question: "Do I need a referral to book a consultation?",
    answer:
      "No referral is required. You can book a consultation directly online or by phone.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Bring any prior imaging or reports, a list of current medications, and your insurance details.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We work with most major insurance providers. Contact us to confirm coverage before your visit.",
  },
  {
    question: "How long is recovery after surgery?",
    answer:
      "Recovery time varies by procedure and patient. Your doctor will outline an expected timeline as part of your treatment plan.",
  },
  {
    question: "Can I get a same-week appointment?",
    answer:
      "We reserve same-week slots for urgent cases. Contact us directly to check current availability.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Common questions, answered" />

        <div className="mt-12 divide-y divide-border border-t border-border">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-foreground">
                {faq.question}
                <span className="ml-4 shrink-0 text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
