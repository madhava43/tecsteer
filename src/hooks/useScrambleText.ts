"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

/**
 * Scrambles text with random characters before resolving left-to-right.
 * @param text    — final resolved string
 * @param trigger — set true to start the scramble
 * @param speed   — ms between each character reveal (default 30ms)
 */
export function useScrambleText(
  text: string,
  trigger: boolean,
  speed = 30
): string {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resolvedRef = useRef(0);

  const scramble = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current);
    resolvedRef.current = 0;

    const step = () => {
      const resolved = resolvedRef.current;
      if (resolved >= text.length) {
        setDisplayText(text);
        return;
      }

      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolved) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      resolvedRef.current += 1;
      frameRef.current = setTimeout(step, speed);
    };

    step();
  }, [text, speed]);

  useEffect(() => {
    if (!trigger) return;
    scramble();
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [trigger, scramble]);

  return displayText;
}
