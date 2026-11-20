"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface ShowcaseAtmosphereProps {
  scrollProgressRef: React.MutableRefObject<number>;
  activeAccent: string;
}

export function ShowcaseAtmosphere({
  scrollProgressRef,
  activeAccent,
}: ShowcaseAtmosphereProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    // Graceful degradation: run WebGL only on desktop viewports with fine pointer
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const host = canvasHostRef.current;
    const container = containerRef.current;
    if (!host || !container) return;

    let disposed = false;
    let rafId = 0;
    let isVisible = false;
    let cleanupThree: (() => void) | null = null;
    let initialized = false;

    const initThree = async () => {
      if (initialized || disposed) return;
      initialized = true;

      try {
        const THREE = await import("three");
        if (disposed || !host) return;

        const width = host.clientWidth || window.innerWidth;
        const height = host.clientHeight || window.innerHeight;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);

        host.innerHTML = "";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
        camera.position.set(0, 0.35, 9.2);

        // Restrained primary orbital torus (wireframe architectural halo)
        const torusGeo = new THREE.TorusGeometry(4.2, 0.012, 8, 96);
        const torusMat = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.18,
        });
        const torusMesh = new THREE.Mesh(torusGeo, torusMat);
        torusMesh.rotation.x = Math.PI * 0.43;
        scene.add(torusMesh);

        // Secondary tilted fine ring
        const outerGeo = new THREE.TorusGeometry(5.4, 0.008, 6, 96);
        const outerMat = new THREE.MeshBasicMaterial({
          color: 0xf1efe8,
          transparent: true,
          opacity: 0.08,
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        outerMesh.rotation.x = Math.PI * 0.46;
        outerMesh.rotation.y = 0.25;
        scene.add(outerMesh);

        // Restrained floating spatial dust (72 particles)
        const particleCount = 72;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + (i % 7) * 0.3;
          const radius = 2.6 + (i % 9) * 0.42;
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = ((i % 11) - 5) * 0.42;
          positions[i * 3 + 2] = Math.sin(angle) * radius - 1.5;
        }
        const pointsGeo = new THREE.BufferGeometry();
        pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const pointsMat = new THREE.PointsMaterial({
          color: 0x93c5fd,
          size: 0.045,
          transparent: true,
          opacity: 0.35,
          sizeAttenuation: true,
        });
        const points = new THREE.Points(pointsGeo, pointsMat);
        scene.add(points);

        const onResize = () => {
          if (disposed || !host) return;
          const w = host.clientWidth || window.innerWidth;
          const h = host.clientHeight || window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize, { passive: true });

        const clock = new THREE.Clock();
        const renderLoop = () => {
          if (disposed) return;
          if (!isVisible) {
            rafId = 0;
            return;
          }

          const elapsed = clock.getElapsedTime();
          const scrollP = scrollProgressRef.current;

          torusMesh.rotation.z = elapsed * 0.04 + scrollP * Math.PI * 0.85;
          outerMesh.rotation.z = -elapsed * 0.025 - scrollP * Math.PI * 0.5;
          points.rotation.y = elapsed * 0.02 + scrollP * Math.PI * 0.65;
          camera.position.z = 9.2 - Math.sin(scrollP * Math.PI) * 0.45;

          renderer.render(scene, camera);
          rafId = window.requestAnimationFrame(renderLoop);
        };

        const startLoop = () => {
          if (!rafId && !disposed && isVisible) {
            rafId = window.requestAnimationFrame(renderLoop);
          }
        };

        startLoop();

        cleanupThree = () => {
          window.removeEventListener("resize", onResize);
          if (rafId) window.cancelAnimationFrame(rafId);
          torusGeo.dispose();
          torusMat.dispose();
          outerGeo.dispose();
          outerMat.dispose();
          pointsGeo.dispose();
          pointsMat.dispose();
          renderer.dispose();
          if (renderer.domElement.parentNode === host) {
            host.removeChild(renderer.domElement);
          }
        };

        // Store starter on host element for IntersectionObserver resume
        (host as unknown as { __startLoop?: () => void }).__startLoop = startLoop;
      } catch {
        // WebGL unavailable — CSS fallback remains visible cleanly
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          if (!initialized) {
            initThree();
          } else {
            const start = (host as unknown as { __startLoop?: () => void }).__startLoop;
            if (start) start();
          }
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(container);

    return () => {
      disposed = true;
      observer.disconnect();
      if (cleanupThree) cleanupThree();
    };
  }, [prefersReducedMotion, scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle radial ambient lighting tied to active project accent */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 68% 52% at 50% 42%, ${activeAccent}1c 0%, rgba(18,18,20,0.4) 55%, #0f0f12 100%)`,
        }}
      />

      {/* Restrained architectural hairline grid */}
      <div
        className="absolute inset-0 opacity-12"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "clamp(36px, 5vw, 68px) clamp(36px, 5vw, 68px)",
        }}
      />

      {/* Faint SVG orbital guide ring (visible on all viewports & fallback) */}
      <svg
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[1180px] h-auto opacity-20"
        viewBox="0 0 1000 320"
        fill="none"
      >
        <ellipse
          cx="500"
          cy="160"
          rx="470"
          ry="120"
          stroke="rgba(241, 239, 232, 0.22)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <ellipse
          cx="500"
          cy="160"
          rx="360"
          ry="82"
          stroke={activeAccent}
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      </svg>

      {/* Three.js WebGL host (desktop only, auto-pauses when offscreen) */}
      <div ref={canvasHostRef} className="absolute inset-0 opacity-90" />
    </div>
  );
}
