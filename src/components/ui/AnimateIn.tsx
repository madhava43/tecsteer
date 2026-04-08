"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Direction = "up" | "left" | "right" | "scale" | "fade";

function buildVariants(direction: Direction, delayMs: number, reduced: boolean) {
  const ease = [0.22, 1, 0.36, 1] as const;
  const duration = reduced ? 0 : 0.6;
  const transition = { duration, ease, delay: reduced ? 0 : delayMs / 1000 };
  // On mobile, halve translation distances
  const y = 20; // reduced from 40
  const x = 30; // reduced from 50

  switch (direction) {
    case "up":
      return { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0, transition } };
    case "left":
      return { hidden: { opacity: 0, x: -x }, visible: { opacity: 1, x: 0, transition } };
    case "right":
      return { hidden: { opacity: 0, x }, visible: { opacity: 1, x: 0, transition } };
    case "scale":
      return { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition } };
    case "fade":
    default:
      return { hidden: { opacity: 0 }, visible: { opacity: 1, transition } };
  }
}

interface AnimateInProps {
  children: ReactNode;
  delay?: number; // milliseconds
  direction?: Direction;
  className?: string;
}

export default function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: AnimateInProps) {
  const reduced = useReducedMotion();
  const variants = buildVariants(direction, delay, reduced);

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      variants={variants}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </m.div>
  );
}
