import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import doctorPhoto from "@/assets/doctor-photo-v2.jpg";

const STATS = [
  { label: "Years of Experience", value: 5, suffix: "+" },
  { label: "Patients Treated", value: 4500, suffix: "+" },
  { label: "Patient Rating", value: 4.9, suffix: " / 5", decimals: 1 },
];

const SPECIALIZATIONS = [
  "Orthopedic Rehabilitation",
  "Pre & Post-Operative Care",
  "Neurological Rehabilitation",
  "Cardiac Rehabilitation",
  "Pediatric Physiotherapy",
];

export default function Credibility() {
  return (
    <section id="about" className="scroll-mt-20 bg-gradient-to-b from-black/80 via-black/68 to-black/80 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="About Meridian Ortho"
            title="Care led by board-certified orthopedic specialists"
            description="Our team combines clinical precision with a calm, patient-first approach — so every treatment plan is as much about comfort as it is about recovery."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal
            direction="right"
            className="relative aspect-[3/4] w-full overflow-hidden rounded-lg"
          >
            <Image
              src={doctorPhoto}
              alt="Dr. Prasanna Kumar Banala, orthopedic specialist at Meridian Ortho"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Reveal>

          <Reveal direction="left">
            <h3 className="text-xl font-semibold text-white">
              Dr. Prasanna Kumar Banala
            </h3>
            <p className="mt-1 text-sm font-medium text-accent">
              MPT (Neuro) — Master of Physiotherapy, Neurology Specialization
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Dr. Prasanna Kumar Banala is a physiotherapist specializing in
              neurological and orthopedic rehabilitation, with hands-on
              experience across pre &amp; post-operative care, cardiac, and
              pediatric physiotherapy. His approach combines clinical
              precision with genuine patient care, helping patients recover
              safely and confidently at every stage.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SPECIALIZATIONS.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary"
                >
                  {item}
                </span>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-6">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <dt className="text-sm text-white/70">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-accent">
                    <AnimatedCounter
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix}
                    />
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
