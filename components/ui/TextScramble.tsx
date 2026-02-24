"use client";

import { useEffect, useRef, useState } from "react";

interface TextScrambleProps {
  text: string;
  delay?: number;
  className?: string;
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

export default function TextScramble({
  text,
  delay = 0,
  className = "",
}: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDisplay(text);
      return;
    }

    const timeout = setTimeout(() => {
      if (startedRef.current) return;
      startedRef.current = true;

      let resolvedCount = 0;
      const chars = text.split("");
      const output = new Array(chars.length).fill("");

      // Initialize with random glyphs
      for (let i = 0; i < chars.length; i++) {
        output[i] = chars[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(output.join(""));

      const interval = setInterval(() => {
        if (resolvedCount >= chars.length) {
          clearInterval(interval);
          setDisplay(text);
          return;
        }

        // Resolve next character
        output[resolvedCount] = chars[resolvedCount];
        resolvedCount++;

        // Scramble remaining unresolved characters
        for (let i = resolvedCount; i < chars.length; i++) {
          if (chars[i] === " ") {
            output[i] = " ";
          } else {
            output[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplay(output.join(""));
        frameRef.current++;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={className}>{display || "\u00A0"}</span>;
}
