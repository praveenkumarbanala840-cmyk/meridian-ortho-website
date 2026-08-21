"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Video } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import consultationImage from "@/assets/steps/step-consultation.jpg";
import diagnosisImage from "@/assets/steps/step-diagnosis.jpg";
import treatmentImage from "@/assets/steps/step-treatment.jpg";
import recoveryImage from "@/assets/steps/step-recovery.jpg";

const VIDEO_CONSULT_MESSAGE =
  "Hi, I'd like to book a video consultation at Meridian Ortho.";
const VIDEO_CONSULT_URL = `https://wa.me/918179944626?text=${encodeURIComponent(VIDEO_CONSULT_MESSAGE)}`;

const STEPS = [
  {
    number: "01",
    title: "Book a Consultation",
    description:
      "Schedule an appointment online or by phone at a time that works for you.",
    image: consultationImage,
  },
  {
    number: "02",
    title: "Diagnosis & Imaging",
    description:
      "We assess your condition using a thorough exam and any necessary imaging.",
    image: diagnosisImage,
  },
  {
    number: "03",
    title: "Personalized Treatment Plan",
    description:
      "Your doctor builds a plan tailored to your diagnosis, lifestyle, and goals.",
    image: treatmentImage,
  },
  {
    number: "04",
    title: "Recovery & Follow-up",
    description:
      "We track your progress with follow-up visits until you're fully recovered.",
    image: recoveryImage,
  },
];

const COUNT = STEPS.length;

// Tracks which card is currently scrolled into view in a horizontal
// scroll-snap container, so dot indicators can stay in sync with native
// touch scrolling (no JS drag handling needed, unlike the coverflow).
function useScrollSnapIndex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frame: number;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!el) return;
        const children = Array.from(el.children) as HTMLElement[];
        let closest = 0;
        let closestDist = Infinity;
        children.forEach((child, i) => {
          const dist = Math.abs(child.offsetLeft - el.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function goTo(i: number) {
    const el = containerRef.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (el && child) {
      el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
  }

  return { containerRef, activeIndex, goTo };
}

export default function HowItWorks() {
  const { containerRef, activeIndex, goTo } = useScrollSnapIndex();

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-gradient-to-b from-black/80 via-black/68 to-black/80 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="A clear path from first visit to full recovery"
          />
        </Reveal>

        <div
          ref={containerRef}
          className="scrollbar-hide mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <Reveal
              key={step.number}
              delay={i * 80}
              className="w-[57%] shrink-0 snap-start sm:w-auto"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-md transition-all duration-[250ms] ease-out hover:scale-[1.03] hover:shadow-lg">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-sm font-semibold text-primary">
                    {step.number}
                  </span>
                  <h3 className="mt-2 min-h-[3.5rem] text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
          {STEPS.map((step, i) => (
            <button
              key={step.number}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to step ${i + 1} of ${COUNT}`}
              aria-current={i === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary-light"
              }`}
            />
          ))}
        </div>

        <Reveal delay={STEPS.length * 80} className="mt-12">
          <div className="flex flex-col items-start gap-4 rounded-lg border border-border bg-primary-light p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-light">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Video Consultations Available
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Prefer not to travel? Initial and follow-up consultations
                  can be done over video call.
                </p>
              </div>
            </div>
            <a
              href={VIDEO_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Book via WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
