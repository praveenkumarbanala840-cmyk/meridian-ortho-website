"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type Direction = "up" | "left" | "right";

// Classic `transform: translate()` rather than Tailwind's standalone
// `translate` utility (a newer CSS property with much less consistent
// transition support across real mobile browsers) — this animates
// reliably everywhere.
const HIDDEN_TRANSFORM: Record<Direction, string> = {
  up: "translate(0, 24px)",
  left: "translate(-32px, 0)",
  right: "translate(32px, 0)",
};

export default function Reveal({
  children,
  delay = 0,
  duration = 500,
  direction = "up",
  className = "",
}: {
  children?: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] ease-out ${
        inView ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        transform: inView ? "translate(0, 0)" : HIDDEN_TRANSFORM[direction],
        transitionDuration: `${duration}ms`,
        transitionDelay: inView ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
