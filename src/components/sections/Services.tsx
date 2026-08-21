import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import kneeImage from "@/assets/services/service-knee.jpg";
import sportsImage from "@/assets/services/service-sports.jpg";
import spineImage from "@/assets/services/service-spine.jpg";
import postSurgeryImage from "@/assets/services/service-postsurgery.jpg";

const SERVICES = [
  {
    title: "Knee & Joint Pain",
    description:
      "Diagnosis and treatment for chronic and acute joint pain, including arthritis and mobility loss.",
    image: kneeImage,
  },
  {
    title: "Sports Injuries",
    description:
      "Fast, precise care for ligament, tendon, and muscle injuries to get athletes back in action.",
    image: sportsImage,
  },
  {
    title: "Back & Spine Care",
    description:
      "Non-surgical and surgical treatment options for chronic back pain and spinal conditions.",
    image: spineImage,
  },
  {
    title: "Post-Surgery Rehabilitation",
    description:
      "Structured recovery programs designed to restore strength and function after surgery.",
    image: postSurgeryImage,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 overflow-x-hidden bg-gradient-to-b from-black/80 via-black/68 to-black/80 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Focused treatment for every stage of recovery"
            description="From first diagnosis to full recovery, our care is tailored to your condition and your goals."
          />
        </Reveal>

        <div className="scrollbar-hide mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 80}
              className="w-[78%] shrink-0 snap-start sm:w-auto"
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="min-h-[3.5rem] text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
