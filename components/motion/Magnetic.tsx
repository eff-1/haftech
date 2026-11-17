"use client";

import React, { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface MagneticProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  strength?: number; // Distance multiplier (default 0.25)
  className?: string;
}

export function Magnetic({ children, strength = 0.25, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const middleX = e.clientX - (left + width / 2);
      const middleY = e.clientY - (top + height / 2);

      setPosition({
        x: middleX * strength,
        y: middleY * strength,
      });
    },
    [strength, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  if (reducedMotion) {
    return children;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.1s linear",
      }}
    >
      {children}
    </div>
  );
}

