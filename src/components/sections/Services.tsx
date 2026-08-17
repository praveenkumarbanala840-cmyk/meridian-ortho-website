import SectionHeading from "@/components/SectionHeading";

const SERVICES = [
  {
    title: "Knee & Joint Pain",
    description:
      "Diagnosis and treatment for chronic and acute joint pain, including arthritis and mobility loss.",
  },
  {
    title: "Sports Injuries",
    description:
      "Fast, precise care for ligament, tendon, and muscle injuries to get athletes back in action.",
  },
  {
    title: "Back & Spine Care",
    description:
      "Non-surgical and surgical treatment options for chronic back pain and spinal conditions.",
  },
  {
    title: "Post-Surgery Rehabilitation",
    description:
      "Structured recovery programs designed to restore strength and function after surgery.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our Services"
          title="Focused treatment for every stage of recovery"
          description="From first diagnosis to full recovery, our care is tailored to your condition and your goals."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="h-10 w-10 rounded-md bg-primary-light" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
