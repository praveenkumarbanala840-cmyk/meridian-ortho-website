"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useCoverflow, coverflowCardStyle, wrappedOffset } from "@/lib/coverflow";

const TESTIMONIALS = [
  {
    video: "/testimonials/testimonial-1-spine.mp4",
    poster: "/testimonials/testimonial-1-spine-poster.jpg",
    label: "Spine & Back Surgery Recovery",
    quote:
      "The care after my spine surgery was exceptional. The recovery plan was clear, and I felt supported through every step of getting back on my feet.",
  },
  {
    video: "/testimonials/testimonial-2-knee.mp4",
    poster: "/testimonials/testimonial-2-knee-poster.jpg",
    label: "Total Knee Replacement",
    quote:
      "After years of knee pain, the treatment here changed everything. The team's approach made a difficult recovery feel manageable and reassuring.",
  },
  {
    video: "/testimonials/testimonial-4-kneereplacement.mp4",
    poster: "/testimonials/testimonial-4-kneereplacement-poster.jpg",
    label: "Bilateral Knee Replacement",
    quote:
      "Going through knee replacement on both sides felt overwhelming at first, but the structured recovery program helped me regain mobility faster than I expected.",
  },
  {
    video: "/testimonials/testimonial-3-fracture.mp4",
    poster: "/testimonials/testimonial-3-fracture-poster.jpg",
    label: "Fracture & Trauma Recovery",
    quote:
      "The precision and care in treating my fracture gave me confidence throughout recovery. I'm back to my normal activities without any lingering issues.",
  },
  {
    video: "/testimonials/testimonial-5-shoulder.mp4",
    poster: "/testimonials/testimonial-5-shoulder-poster.jpg",
    label: "Shoulder Surgery Recovery",
    quote:
      "My shoulder mobility is fully restored after treatment here. The physiotherapy guidance made all the difference in a smooth recovery.",
  },
];

type Testimonial = (typeof TESTIMONIALS)[number];

const COUNT = TESTIMONIALS.length;

function Stars({ className = "text-primary" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-hidden="true">
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

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function CarouselCard({
  testimonial,
  offset,
  cardWidth,
  dragX,
  dragging,
  onSelect,
  onExpand,
}: {
  testimonial: Testimonial;
  offset: number;
  cardWidth: number;
  dragX: number;
  dragging: boolean;
  onSelect: () => void;
  onExpand: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isActive = offset === 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div
      className="absolute left-1/2 top-0 -translate-x-1/2"
      style={{ width: cardWidth, ...coverflowCardStyle(offset, cardWidth, dragX, dragging) }}
      onClick={() => {
        if (!isActive) onSelect();
      }}
    >
      <div
        className={`relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-xl ${
          isActive ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={testimonial.video}
          poster={testimonial.poster}
          muted
          loop
          playsInline
          preload="none"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-4 pb-4 pt-20">
          <Stars className="text-accent" />
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/90">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {testimonial.label}
          </p>
        </div>

        {isActive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            aria-label={`Expand video: ${testimonial.label}`}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <ExpandIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const {
    activeIndex,
    goTo,
    next,
    prev,
    dragging,
    dragX,
    cardWidth,
    containerRef,
    onPointerDown,
    onPointerMove,
    endDrag,
    onKeyDown,
    trySelect,
  } = useCoverflow({ count: COUNT });

  const cardHeight = Math.round((cardWidth * 16) / 9) + 24;

  return (
    <section id="testimonials" className="scroll-mt-20 overflow-x-hidden bg-gradient-to-b from-black/80 via-black/68 to-black/80 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Patient Stories"
            title="Trusted by patients across every stage of recovery"
          />
        </Reveal>

        <Reveal delay={100} className="relative mt-16 overflow-hidden">
          <div
            ref={containerRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative touch-pan-y select-none outline-none"
            style={{ height: cardHeight }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <CarouselCard
                key={testimonial.video}
                testimonial={testimonial}
                offset={wrappedOffset(i, activeIndex, COUNT)}
                cardWidth={cardWidth}
                dragX={dragX}
                dragging={dragging}
                onSelect={() => trySelect(i)}
                onExpand={() => setExpanded(true)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-colors hover:bg-primary-light sm:left-2"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-colors hover:bg-primary-light sm:right-2"
          >
            <ChevronIcon direction="right" />
          </button>
        </Reveal>

        <div className="mt-6 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((testimonial, i) => (
            <button
              key={testimonial.video}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1} of ${COUNT}`}
              aria-current={i === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary-light"
              }`}
            />
          ))}
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative aspect-[9/16] max-h-[85vh] w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="h-full w-full rounded-lg bg-black object-contain"
              src={TESTIMONIALS[activeIndex].video}
              poster={TESTIMONIALS[activeIndex].poster}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <button
              type="button"
              onClick={() => setExpanded(false)}
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
