"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the domAnimation feature bundle (~60% smaller than full framer-motion).
 * Wrap the entire app in this so all `m.*` components work.
 * Must use `m` (not `motion`) everywhere inside this boundary.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
