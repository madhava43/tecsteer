// Text animation variants for Framer Motion
// Use with motion.div or the SplitText component

const ease = [0.16, 1, 0.3, 1] as const;

// ── Word split ────────────────────────────────────────────────────────────
export const wordFadeUp = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};
export const wordChild = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease },
  },
};

// ── Character split ───────────────────────────────────────────────────────
export const charFadeUp = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.02, delayChildren: 0.05 },
  },
};
export const charChild = {
  hidden: { opacity: 0, y: 30, rotateX: 90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.4, ease },
  },
};

// ── Line reveal — clip up from bottom ────────────────────────────────────
export const lineReveal = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease },
  },
};

// ── Blur fade in — subtle, premium ───────────────────────────────────────
export const blurFadeIn = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease },
  },
};
