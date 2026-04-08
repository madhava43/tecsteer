"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Cycles through an array of words with a typing + deleting effect.
 * @returns displayText — current visible string (without cursor)
 */
export function useTypewriter(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseMs = 2500
): { displayText: string; isDeleting: boolean } {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex % words.length] ?? "";

    const tick = () => {
      if (isPaused) {
        frameRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseMs);
        return;
      }

      if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
        if (displayText.length <= 1) {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      } else {
        const next = currentWord.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next === currentWord) {
          setIsPaused(true);
        }
      }
    };

    const delay = isDeleting ? deletingSpeed : isPaused ? pauseMs : typingSpeed;
    frameRef.current = setTimeout(tick, delay);

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [displayText, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return { displayText, isDeleting };
}
