"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import { m, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic cursor pull — desktop only, disabled on touch devices.
 * Only animates transform (GPU composited).
 */
export default function MagneticButton({
  children,
  strength = 0.3,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // default true (SSR safe)

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [x, y, strength, isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setActive(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    if (!isTouch) setActive(true);
  }, [isTouch]);

  if (isTouch) {
    // On touch devices, render children directly — no wrapper overhead
    return <>{children}</>;
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y, display: "inline-flex", willChange: "transform" }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-magnetic={active}
    >
      {children}
    </m.div>
  );
}
