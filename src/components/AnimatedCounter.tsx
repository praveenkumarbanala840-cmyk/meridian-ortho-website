"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

export default function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1800,
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.9 });
  const [display, setDisplay] = useState(0);
  // Tracks the last *rendered* (rounded) text so simultaneous counters
  // (three of these can be running at once, right as scroll-reveal and the
  // body-video-scrub are also active) don't force a React re-render on
  // every single rAF tick — only when the visible digits actually change.
  const lastRendered = useRef(display.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;

    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const next = value * easeOutQuint(progress);
      const formatted = next.toFixed(decimals);
      if (formatted !== lastRendered.current) {
        lastRendered.current = formatted;
        setDisplay(next);
      }
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
