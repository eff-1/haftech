"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface ScrambleTextProps {
  text: string;
  speed?: number;
  triggerOnHover?: boolean;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
}

const CHARS = "ABCDEF0123456789!<>-_\\/[]{}—=+*^?#________";

export function ScrambleText({
  text,
  speed = 30,
  triggerOnHover = true,
  className = "",
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const reducedMotion = useReducedMotion();
  const iterationRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (reducedMotion || isScrambling) return;
    setIsScrambling(true);
    iterationRef.current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterationRef.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayText(text);
      }

      iterationRef.current += 1 / 2;
    }, speed);
  }, [text, speed, reducedMotion, isScrambling]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (reducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component
      className={className}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
    >
      {displayText}
    </Component>
  );
}

