"use client";

import { useEffect, useRef, useState } from "react";

/** CSS-based scroll animation hook (Framer Motion fallback).
 *  Returns { ref, isVisible } — attach ref to the element you want to observe.
 *  isVisible flips true once the element enters the viewport and stays true.
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
