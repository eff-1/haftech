"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function AmbientCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 800);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 220,
    };

    // Technical grid dots / particle nodes
    const spacing = 48;
    const cols = Math.floor(width / spacing) + 1;
    const rows = Math.floor(height / spacing) + 1;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Radial spotlight gradient following cursor
      const spotlight = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.radius * 1.5
      );
      spotlight.addColorStop(0, "rgba(52, 76, 104, 0.08)"); // Brand accent soft glow
      spotlight.addColorStop(0.5, "rgba(52, 76, 104, 0.02)");
      spotlight.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

      // Subtle architectural crosshairs and dot matrix
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Proximity light-up
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.45;
            ctx.fillStyle = `rgba(52, 76, 104, ${alpha})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);

            // Subtle crosshair tick on nearby nodes
            if (dist < mouse.radius * 0.45) {
              ctx.strokeStyle = `rgba(52, 76, 104, ${alpha * 0.5})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(x - 4, y);
              ctx.lineTo(x + 4, y);
              ctx.moveTo(x, y - 4);
              ctx.lineTo(x, y + 4);
              ctx.stroke();
            }
          } else {
            // Ambient faint dot
            ctx.fillStyle = "rgba(104, 105, 99, 0.12)";
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}

