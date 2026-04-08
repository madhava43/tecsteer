"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

interface RowProps {
  text: string;
  direction?: 1 | -1;
  offset?: number;
}

function Row({ text, direction = 1, offset = 0 }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${offset}%`, `${offset + direction * -30}%`]
  );

  const repeated = Array(6).fill(text).join("  ·  ");

  return (
    <div ref={ref} className="overflow-hidden whitespace-nowrap">
      <m.div style={{ x, display: "inline-block", willChange: "transform" }}>
        <span
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(5rem, 10vw, 9rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.035)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {repeated}
        </span>
      </m.div>
    </div>
  );
}

interface ParallaxBannerProps {
  topText?: string;
  bottomText?: string;
}

/**
 * Decorative background parallax text — desktop only, pointer-events none.
 * Uses only transform (GPU composited). Hidden on mobile.
 */
export default function ParallaxText({
  topText = "TECHNOLOGY  ·  INNOVATION  ·  SOLUTIONS",
  bottomText = "SALESFORCE  ·  AWS  ·  CLOUD  ·  SECURITY",
}: ParallaxBannerProps) {
  return (
    <div
      className="hidden md:block pointer-events-none overflow-hidden select-none py-4"
      aria-hidden
    >
      <Row text={topText} direction={1} offset={0} />
      <Row text={bottomText} direction={-1} offset={-10} />
    </div>
  );
}
