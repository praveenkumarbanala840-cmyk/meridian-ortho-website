"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

export const COVERFLOW_TRANSITION_MS = 500;
const DRAG_THRESHOLD = 60;
const CLICK_DRAG_TOLERANCE = 6;
const VISIBLE_OFFSET = 2;

// Shortest signed distance from `index` to `active` around the wrap-around
// track (e.g. with 5 items, index 4 is offset -1 from active index 0).
export function wrappedOffset(index: number, active: number, count: number) {
  let offset = index - active;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

export function coverflowCardStyle(
  offset: number,
  cardWidth: number,
  dragX: number,
  dragging: boolean
): CSSProperties {
  const abs = Math.abs(offset);
  const scale = offset === 0 ? 1 : abs === 1 ? 0.78 : 0.62;
  const opacity = abs > VISIBLE_OFFSET ? 0 : offset === 0 ? 1 : abs === 1 ? 0.55 : 0.25;
  const blurPx = offset === 0 ? 0 : abs === 1 ? 2 : 5;
  const translateX = offset * cardWidth * 0.82 + (dragging ? dragX : 0);

  return {
    transform: `translateX(${translateX}px) scale(${scale})`,
    filter: blurPx ? `blur(${blurPx}px)` : "none",
    opacity,
    zIndex: 100 - abs,
    transition: dragging
      ? "none"
      : `transform ${COVERFLOW_TRANSITION_MS}ms ease, opacity ${COVERFLOW_TRANSITION_MS}ms ease, filter ${COVERFLOW_TRANSITION_MS}ms ease`,
    pointerEvents: abs > VISIBLE_OFFSET ? "none" : "auto",
  };
}

export function useCoverflow({
  count,
  cardWidthMin = 240,
  cardWidthMax = 380,
  cardWidthRatio = 0.68,
}: {
  count: number;
  cardWidthMin?: number;
  cardWidthMax?: number;
  cardWidthRatio?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [cardWidth, setCardWidth] = useState(cardWidthMin);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const totalDrag = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.getBoundingClientRect().width;
      if (width === 0) return;
      setCardWidth(Math.max(cardWidthMin, Math.min(cardWidthMax, width * cardWidthRatio)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cardWidthMin, cardWidthMax, cardWidthRatio]);

  const goTo = useCallback(
    (i: number) => setActiveIndex(((i % count) + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX;
    totalDrag.current = 0;
    setDragging(true);
    setDragX(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const delta = e.clientX - dragStartX.current;
    totalDrag.current = Math.abs(delta);
    setDragX(delta);
  }

  function endDrag() {
    if (!dragging) return;
    if (dragX < -DRAG_THRESHOLD) next();
    else if (dragX > DRAG_THRESHOLD) prev();
    setDragging(false);
    setDragX(0);
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  // Only treat it as a tap-to-select if the pointer barely moved — otherwise
  // it was a swipe/drag and the click shouldn't also trigger navigation.
  function trySelect(i: number) {
    if (totalDrag.current < CLICK_DRAG_TOLERANCE) goTo(i);
  }

  return {
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
  };
}
