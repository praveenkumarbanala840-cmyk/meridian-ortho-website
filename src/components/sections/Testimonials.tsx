"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const TESTIMONIALS = [
  {
    video: "/testimonials/testimonial-1-spine.mp4",
    label: "Spine & Back Surgery Recovery",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
  {
    video: "/testimonials/testimonial-2-knee.mp4",
    label: "Total Knee Replacement",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
  {
    video: "/testimonials/testimonial-4-kneereplacement.mp4",
    label: "Bilateral Knee Replacement",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
  {
    video: "/testimonials/testimonial-3-fracture.mp4",
    label: "Fracture & Trauma Recovery",
    quote:
      "Placeholder testimonial copy describing a positive experience and outcome with the clinic.",
  },
  {
    video: "/testimonials/testimonial-5-shoulder.mp4",
    label: "Shoulder Surgery Recovery",
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

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

const VISIBILITY_THRESHOLD = 0.6;

export default function Testimonials() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const visibleSet = useRef<Set<number>>(new Set());
  const hoverIndex = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  function recomputeActiveFromVisibility() {
    if (hoverIndex.current !== null) return;
    const lowest = Math.min(...visibleSet.current, Infinity);
    setActiveIndex(Number.isFinite(lowest) ? lowest : null);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            visibleSet.current.add(idx);
          } else {
            visibleSet.current.delete(idx);
          }
        });
        recomputeActiveFromVisibility();
      },
      { threshold: VISIBILITY_THRESHOLD },
    );

    videoRefs.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex && expanded === null) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, expanded]);

  useEffect(() => {
    if (expanded === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  function handleMouseEnter(i: number) {
    hoverIndex.current = i;
    setActiveIndex(i);
  }

  function handleMouseLeave(i: number) {
    if (hoverIndex.current === i) {
      hoverIndex.current = null;
      recomputeActiveFromVisibility();
    }
  }

  return (
    <section id="testimonials" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Patient Stories"
          title="Trusted by patients across every stage of recovery"
        />

        <div className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 xl:grid-cols-5">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={testimonial.video}
              className="flex w-[80%] shrink-0 snap-center flex-col overflow-hidden rounded-lg border border-border bg-surface sm:w-auto"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className="relative aspect-[9/16] w-full bg-black">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="h-full w-full object-contain"
                  src={testimonial.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <button
                  type="button"
                  onClick={() => setExpanded(i)}
                  aria-label={`Expand video: ${testimonial.label}`}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                >
                  <ExpandIcon />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <Stars />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm font-semibold text-foreground">
                  {testimonial.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expanded !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setExpanded(null)}
        >
          <div
            className="relative aspect-[9/16] max-h-[85vh] w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="h-full w-full rounded-lg bg-black object-contain"
              src={TESTIMONIALS[expanded].video}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <button
              type="button"
              onClick={() => setExpanded(null)}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-white transition-colors hover:text-white/70"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
