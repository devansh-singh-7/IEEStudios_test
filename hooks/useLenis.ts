"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis RAF with GSAP ticker so GSAP animations
    // and scroll-driven effects stay in perfect sync.
    const onTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds; Lenis expects ms
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from skipping frames on tab re-focus

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
