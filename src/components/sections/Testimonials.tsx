import SectionHeading from "@/components/SectionHeading";

const TESTIMONIALS = [
  {
    name: "Patient Name",
    detail: "Knee Replacement Patient",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
  {
    name: "Patient Name",
    detail: "Sports Injury Patient",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
  {
    name: "Patient Name",
    detail: "Spine Care Patient",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
  {
    name: "Patient Name",
    detail: "Post-Surgery Rehab Patient",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-primary" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Patient Stories"
          title="Trusted by patients across every stage of recovery"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              className="flex flex-col rounded-lg border border-border bg-surface p-6"
            >
              <Stars />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-200" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">{testimonial.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
