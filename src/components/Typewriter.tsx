"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 22,
  startDelay = 250,
  className = "",
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const delay = count === 0 ? startDelay : speed;
    const id = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(id);
  }, [count, text, speed, startDelay]);

  return (
    <span className={className}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
