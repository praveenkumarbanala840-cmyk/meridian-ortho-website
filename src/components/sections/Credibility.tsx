import SectionHeading from "@/components/SectionHeading";

const STATS = [
  { label: "Years of Experience", value: "15+" },
  { label: "Patients Treated", value: "10,000+" },
  { label: "Patient Rating", value: "4.9 / 5" },
  { label: "Board Certified", value: "Yes" },
];

export default function Credibility() {
  return (
    <section id="about" className="scroll-mt-20 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Meridian Ortho"
          title="Care led by board-certified orthopedic specialists"
          description="Our team combines clinical precision with a calm, patient-first approach — so every treatment plan is as much about comfort as it is about recovery."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="aspect-[4/3] w-full rounded-lg bg-zinc-200" />

          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Dr. Placeholder Name
            </h3>
            <p className="mt-1 text-sm font-medium text-primary">
              MBBS, MS (Orthopedics), Fellowship in Joint Replacement
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Placeholder bio copy describing the doctor&apos;s background,
              specialties, and approach to patient care. Replace with real
              credentials and clinic history.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-primary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
