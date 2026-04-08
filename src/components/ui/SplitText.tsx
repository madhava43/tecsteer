"use client";

import { m } from "framer-motion";
import { wordFadeUp, wordChild, charFadeUp, charChild } from "@/lib/textAnimations";

interface SplitTextProps {
  text: string;
  type?: "words" | "chars";
  className?: string;
  delay?: number; // ms
}

export default function SplitText({
  text,
  type = "words",
  className,
  delay = 0,
}: SplitTextProps) {
  const containerVariant = type === "chars" ? charFadeUp : wordFadeUp;
  const childVariant = type === "chars" ? charChild : wordChild;

  const containerWithDelay = {
    ...containerVariant,
    visible: {
      ...containerVariant.visible,
      transition: {
        ...(containerVariant.visible as { transition?: object }).transition,
        delayChildren: delay / 1000,
      },
    },
  };

  if (type === "chars") {
    const chars = text.split("");
    return (
      <m.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px", amount: 0.1 }}
        variants={containerWithDelay}
        style={{ display: "inline-block", perspective: 800 }}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <m.span
            key={i}
            variants={childVariant}
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
            }}
            aria-hidden
          >
            {char === " " ? "\u00A0" : char}
          </m.span>
        ))}
      </m.span>
    );
  }

  const words = text.split(" ");
  return (
    <m.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      variants={containerWithDelay}
      style={{ display: "inline" }}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          aria-hidden
        >
          <m.span
            variants={childVariant}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
