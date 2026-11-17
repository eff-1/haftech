"use client";

import React, { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
  className?: string;
}

export function TiltCard({
  children,
  maxTilt = 7,
  perspective = 1000,
  glareOpacity = 0.12,
  className = "",
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [transform, setTransform] = useState<string>("");
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
      );
      setGlarePosition({ x: glareX, y: glareY, opacity: glareOpacity });
    },
    [maxTilt, perspective, glareOpacity, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion) return;
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, [perspective, reducedMotion]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: reducedMotion ? "none" : transform,
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      {/* Glare spotlight layer */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.4), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

