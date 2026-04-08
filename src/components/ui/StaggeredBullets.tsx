"use client";

import { m } from "framer-motion";

interface StaggeredBulletsProps {
  bullets: string[];
  className?: string;
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function StaggeredBullets({ bullets, className }: StaggeredBulletsProps) {
  return (
    <m.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      variants={container}
      className={className}
    >
      {bullets.map((bullet) => (
        <m.li
          key={bullet}
          variants={item}
          className="flex items-start gap-3 text-sm text-text-secondary"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="w-1 h-1 rounded-full bg-accent-primary flex-shrink-0 mt-2" />
          {bullet}
        </m.li>
      ))}
    </m.ul>
  );
}
