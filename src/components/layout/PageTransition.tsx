"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, filter: reduced ? "none" : "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
