"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Touch-primary devices (pointer: coarse) are the main target, but a bare
// pointer check can't be exercised by desktop browser automation (there's
// no real touchscreen to report), and a narrow window is a reasonable
// stand-in for "lower-end/handheld" too — so match either.
const MOBILE_QUERY = "(pointer: coarse), (max-width: 767px)";

function subscribeToPointerCapability(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
function getIsMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}
// matchMedia doesn't exist during SSR — assume desktop there. If a real
// mobile client's snapshot differs, React reconciles with one extra render
// right after hydration (see useSyncExternalStore docs), briefly starting
// the desktop video's fetch before the corrected src takes over. That's a
// negligible partial download, not worth extra machinery to avoid.
function getIsMobileServerSnapshot() {
  return false;
}

// How quickly the video's displayed frame catches up to the raw scroll
// position each animation frame (0-1). Lower = more trailing/cinematic lag.
// The mobile value is higher to compensate for running at half the tick
// rate (see MOBILE_TICK_STRIDE) — otherwise fewer ticks/sec would also mean
// slower convergence and a laggier-feeling scrub on top of being choppier.
const LERP_FACTOR = 0.12;
const LERP_FACTOR_MOBILE = 0.2;
// Minimum currentTime delta (seconds) before we bother re-seeking the
// video — avoids redundant seeks on sub-frame changes. `video.currentTime =`
// forces a decode, which is the single most expensive part of this loop on
// mobile GPUs, so mobile uses a coarser threshold (roughly one 24fps frame
// instead of half a frame) to cut how often it fires.
const SEEK_EPSILON = 1 / 48;
const SEEK_EPSILON_MOBILE = 1 / 24;
// On mobile, cap the scroll-math-and-seek work to roughly a 30fps budget by
// wall-clock time rather than an rAF-tick count — a tick-count stride would
// barely throttle anything on a 90/120Hz phone display, since rAF fires at
// the display's native rate. Opacity keeps updating every real rAF tick
// regardless (cheap, compositor-only; skipping it would look stepped).
const MOBILE_MIN_SEEK_INTERVAL_MS = 1000 / 30;
// Video opacity while the hero section is on screen vs. everywhere else —
// it should read as a hero visual, then recede to a background texture for
// the rest of the page. Against the site's dark backdrop (see the per-
// section gradients) the video's dark anatomical tones stay legible at a
// notably higher opacity than they would over a light background, so this
// can sit well above the old light-theme value without hurting contrast.
const HERO_OPACITY = 0.75;
const REST_OPACITY = 0.5;

export default function BodyRotationBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMobileValue = useSyncExternalStore(
    subscribeToPointerCapability,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot
  );
  const videoSrc = isMobileValue
    ? "/hero/hero-rotation-mobile.mp4"
    : "/hero/hero-rotation.mp4";

  // Mirrors `isMobileValue` for the rAF loop's closure (see the
  // [duration]-only effect below, which shouldn't be recreated on this).
  const isMobile = useRef(false);
  useEffect(() => {
    isMobile.current = isMobileValue;
  }, [isMobileValue]);

  const [videoReady, setVideoReady] = useState(false);
  const [duration, setDuration] = useState(0);

  // Mirrors `videoReady` for the rAF loop's closure, which we don't want
  // to recreate on every state flip (see the [duration]-only effect below).
  const videoReadyRef = useRef(false);
  useEffect(() => {
    videoReadyRef.current = videoReady;
  }, [videoReady]);

  const smoothedProgress = useRef(0);
  const lastSeekTime = useRef(-1);
  const rafId = useRef<number | null>(null);
  // Cached (not recomputed every frame) scroll geometry: how far the user
  // can scroll before reaching the bottom of #contact (the video's 100%
  // mark), and the pixel range over which opacity fades from hero-strength
  // down to background-texture-strength.
  const scrollableDistance = useRef(0);
  const fadeStart = useRef(0);
  const fadeEnd = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onLoadedMetadata() {
      if (video) setDuration(video.duration);
    }
    function onLoadedData() {
      setVideoReady(true);
    }

    if (video.readyState >= 1) {
      setDuration(video.duration);
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata);
    }
    if (video.readyState >= 2) {
      setVideoReady(true);
    } else {
      video.addEventListener("loadeddata", onLoadedData);
    }

    video
      .play()
      .then(() => video.pause())
      .catch(() => {
        /* Autoplay of a muted video is allowed almost everywhere; if it's
           ever blocked, scrubbing still works once data has loaded. */
      });

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
    };
    // Re-runs if `videoSrc` switches (e.g. the mobile/desktop correction
    // right after hydration) so listeners attach to the new video load.
  }, [videoSrc]);

  useEffect(() => {
    function measure() {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");

      const contactBottom = contact
        ? contact.offsetTop + contact.offsetHeight
        : document.documentElement.scrollHeight;
      scrollableDistance.current = Math.max(
        1,
        contactBottom - window.innerHeight
      );

      const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
      fadeStart.current = heroHeight * 0.5;
      fadeEnd.current = heroHeight;
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const lastSeekAttempt = useRef(0);

  useEffect(() => {
    function tick(now: number) {
      const video = videoRef.current;

      // On mobile, cap how often the scroll-math-and-seek work runs to a
      // ~30fps time budget — `video.currentTime =` forces a decode, the
      // most expensive part of this loop.
      const skipSeek =
        isMobile.current &&
        now - lastSeekAttempt.current < MOBILE_MIN_SEEK_INTERVAL_MS;
      if (isMobile.current && !skipSeek) {
        lastSeekAttempt.current = now;
      }

      if (video && duration > 0) {
        const scrollY = window.scrollY;

        if (!skipSeek) {
          const rawProgress = Math.min(
            1,
            Math.max(0, scrollY / scrollableDistance.current)
          );

          const lerpFactor = isMobile.current ? LERP_FACTOR_MOBILE : LERP_FACTOR;
          // Ease in the middle of the sequence, but snap exactly to the
          // boundaries once scroll reaches them, guaranteeing the rotation
          // always completes its full range by the time #contact ends.
          if (rawProgress >= 1) {
            smoothedProgress.current = 1;
          } else if (rawProgress <= 0) {
            smoothedProgress.current = 0;
          } else {
            smoothedProgress.current +=
              (rawProgress - smoothedProgress.current) * lerpFactor;
          }

          const targetTime = smoothedProgress.current * duration;
          const epsilon = isMobile.current ? SEEK_EPSILON_MOBILE : SEEK_EPSILON;
          if (Math.abs(targetTime - lastSeekTime.current) > epsilon) {
            video.currentTime = targetTime;
            lastSeekTime.current = targetTime;
          }
        }

        // Only drive opacity via inline style once the video is actually
        // decoding frames — otherwise this (higher-specificity than the
        // Tailwind class) would override the opacity-0 fade-in and flash
        // an undecoded frame the instant the element mounts.
        if (videoReadyRef.current) {
          const { current: start } = fadeStart;
          const { current: end } = fadeEnd;
          let opacity = HERO_OPACITY;
          if (scrollY >= end) {
            opacity = REST_OPACITY;
          } else if (scrollY > start) {
            const t = (scrollY - start) / (end - start);
            opacity = HERO_OPACITY + (REST_OPACITY - HERO_OPACITY) * t;
          }
          video.style.opacity = String(opacity);
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        rafId.current = null;
      } else if (rafId.current === null) {
        rafId.current = requestAnimationFrame(tick);
      }
    }

    rafId.current = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [duration]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src={videoSrc}
        className={`absolute inset-0 h-full w-full object-cover saturate-[0.8] transition-opacity duration-700 ${
          videoReady ? "" : "opacity-0"
        }`}
      />
    </div>
  );
}
