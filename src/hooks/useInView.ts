"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Consumers like AnimatedCounter key their own effects off `inView` and must
// see the geometry-checked value on their very first run, not a stale
// "visible by default" value from the initial render. A layout effect
// settles `inView` synchronously before any passive `useEffect` in the tree
// runs, avoiding that race. It's skipped on the server (no layout there).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function isNearViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

export function useInView<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -80px 0px",
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T>(null);
  // Content renders visible by default — on the server, and before any
  // client JS has run. We only ever hide an element after confirming,
  // client-side, that it genuinely starts off-screen; a slow or failed
  // hydration then degrades to "no fade-in animation" rather than "stuck
  // invisible". Elements that ARE hidden this way reveal only when actually
  // scrolled into view — no timer forces them visible early, or the
  // animation would already be over before the user ever sees it.
  const [inView, setInView] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || isNearViewport(el)) return;

    setInView(false);

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
