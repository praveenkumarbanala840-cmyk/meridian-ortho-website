import SectionHeading from "@/components/SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Book a Consultation",
    description:
      "Schedule an appointment online or by phone at a time that works for you.",
  },
  {
    number: "02",
    title: "Diagnosis & Imaging",
    description:
      "We assess your condition using a thorough exam and any necessary imaging.",
  },
  {
    number: "03",
    title: "Personalized Treatment Plan",
    description:
      "Your doctor builds a plan tailored to your diagnosis, lifestyle, and goals.",
  },
  {
    number: "04",
    title: "Recovery & Follow-up",
    description:
      "We track your progress with follow-up visits until you're fully recovered.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How It Works"
          title="A clear path from first visit to full recovery"
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number}>
              <span className="text-sm font-semibold text-primary">
                {step.number}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
