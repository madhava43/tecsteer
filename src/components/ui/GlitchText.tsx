"use client";

import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  /** Play glitch once on mount after delayMs, then again on hover */
  autoPlay?: boolean;
  delayMs?: number;
}

/**
 * CSS glitch effect on hover (and optionally on mount).
 * Uses data-text attribute + ::before/::after pseudo-elements via inline class.
 */
export default function GlitchText({
  text,
  className = "",
  autoPlay = false,
  delayMs = 500,
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 500);
    }, delayMs);
    return () => clearTimeout(t);
  }, [autoPlay, delayMs]);

  const handleMouseEnter = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 400);
  };

  return (
    <span
      className={`glitch-text ${glitching ? "is-glitching" : ""} ${className}`}
      data-text={text}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </span>
  );
}
