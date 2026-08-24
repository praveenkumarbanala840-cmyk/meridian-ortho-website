"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";

export default function Hero() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Fades the "scroll to explore" indicator out over the first small stretch
  // of scroll, independent of the page-wide body-rotation scroll mapping
  // (which now lives in BodyRotationBackground).
  useEffect(() => {
    let rafId: number | null = null;

    function onScroll() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!indicatorRef.current) return;
        const fade = Math.min(window.scrollY / 120, 1);
        indicatorRef.current.style.opacity = String(1 - fade);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-32">
        <Reveal>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            Now accepting new patients
          </span>
        </Reveal>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          <Typewriter text="Expert orthopedic & neuro care, focused on getting you moving again." />
        </h1>
        <Reveal delay={80}>
          <p className="max-w-xl text-lg leading-relaxed text-white/80">
            Dr. Prasanna Kumar provides precise diagnosis and personalized
            treatment for joint, spine, and sports-related conditions — with
            a calm, patient-first experience.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="rounded-md bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Book an Appointment
            </a>
            <a
              href="#services"
              className="text-base font-semibold text-white transition-colors hover:text-white/70"
            >
              View Services →
            </a>
          </div>
        </Reveal>
      </div>

      <div
        ref={indicatorRef}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/70"
      >
        <p className="text-xs font-medium uppercase tracking-widest">
          Scroll to explore
        </p>
        <div className="h-8 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  );
}
