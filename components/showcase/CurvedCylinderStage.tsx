"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ShowcaseProject } from "./showcaseData";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface CurvedCylinderStageProps {
  projects: ShowcaseProject[];
  angleRef: React.MutableRefObject<number>;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onDragDelta: (deltaRad: number) => void;
  onDragEnd: () => void;
}

export function CurvedCylinderStage({
  projects,
  angleRef,
  activeIndex,
  onSelectIndex,
  onDragDelta,
  onDragEnd,
}: CurvedCylinderStageProps) {
  const prefersReducedMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const onSelectRef = useRef(onSelectIndex);
  const onDragDeltaRef = useRef(onDragDelta);
  const onDragEndRef = useRef(onDragEnd);

  useEffect(() => {
    onSelectRef.current = onSelectIndex;
    onDragDeltaRef.current = onDragDelta;
    onDragEndRef.current = onDragEnd;
  }, [onSelectIndex, onDragDelta, onDragEnd]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let rafId = 0;
    let isVisible = true;
    let initialized = false;
    let cleanupThree: (() => void) | null = null;

    const init = async () => {
      if (initialized || disposed) return;
      initialized = true;

      try {
        const THREE = await import("three");
        if (disposed || !host) return;

        const width = host.clientWidth || window.innerWidth;
        const height = host.clientHeight || 480;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        host.innerHTML = "";
        renderer.domElement.style.display = "block";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.touchAction = "pan-y";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const getCameraParams = (w: number, h: number) => {
          const aspect = w / Math.max(h, 1);
          const isPortrait = w < 768 || aspect < 1.05;
          return {
            aspect,
            fov: isPortrait ? 40 : 32,
            camY: isPortrait ? 0.34 : 0.42,
            camZ: isPortrait ? 11.4 : 10.2,
            lookY: -0.04,
            radius: isPortrait ? 4.35 : 5.3,
            panelHeight: isPortrait ? 2.15 : 2.55,
          };
        };

        let params = getCameraParams(width, height);
        const camera = new THREE.PerspectiveCamera(params.fov, params.aspect, 0.1, 100);
        camera.position.set(0, params.camY, params.camZ);
        camera.lookAt(0, params.lookY, 0);

        const ringGroup = new THREE.Group();
        scene.add(ringGroup);

        const total = projects.length;
        const angleStep = (Math.PI * 2) / total;
        const panelArc = angleStep * 0.78; // 22% open gap between curved panels

        const textureLoader = new THREE.TextureLoader();
        const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

        const meshes: InstanceType<typeof THREE.Mesh>[] = [];
        const materials: InstanceType<typeof THREE.MeshBasicMaterial>[] = [];
        let sharedGeo = new THREE.CylinderGeometry(
          params.radius,
          params.radius,
          params.panelHeight,
          44,
          1,
          true,
          -panelArc / 2,
          panelArc
        );

        projects.forEach((project, idx) => {
          const tex = textureLoader.load(project.image);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = maxAniso;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;

          const mat = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            color: new THREE.Color(0xffffff),
          });
          materials.push(mat);

          const mesh = new THREE.Mesh(sharedGeo, mat);
          mesh.rotation.y = idx * angleStep;
          mesh.userData = { projectIndex: idx };
          ringGroup.add(mesh);
          meshes.push(mesh);
        });

        // Pointer drag + raycast click on side curved panels
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        let isDragging = false;
        let dragMoved = false;
        let startX = 0;
        let lastX = 0;

        const domEl = renderer.domElement;

        const onPointerDown = (e: PointerEvent) => {
          if (e.button !== 0 && e.pointerType === "mouse") return;
          isDragging = true;
          dragMoved = false;
          startX = e.clientX;
          lastX = e.clientX;
        };

        const onPointerMove = (e: PointerEvent) => {
          if (!isDragging) return;
          const dx = e.clientX - lastX;
          lastX = e.clientX;
          if (Math.abs(e.clientX - startX) > 6) {
            dragMoved = true;
          }
          if (dragMoved) {
            const sensitivity = window.innerWidth < 768 ? 0.0068 : 0.0042;
            onDragDeltaRef.current(-dx * sensitivity);
          }
        };

        const onPointerUp = (e: PointerEvent) => {
          if (!isDragging) return;
          isDragging = false;
          if (dragMoved) {
            onDragEndRef.current();
            return;
          }

          // Click-to-focus a visible curved panel via raycasting
          const rect = domEl.getBoundingClientRect();
          pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);
          const hits = raycaster.intersectObjects(meshes, false);
          if (hits.length > 0) {
            const idx = hits[0].object.userData?.projectIndex;
            if (typeof idx === "number") {
              onSelectRef.current(idx);
            }
          }
        };

        domEl.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerup", onPointerUp);

        const onResize = () => {
          if (disposed || !host) return;
          const w = host.clientWidth || window.innerWidth;
          const h = host.clientHeight || 480;
          const next = getCameraParams(w, h);
          const needsGeoRebuild =
            Math.abs(next.radius - params.radius) > 0.05 ||
            Math.abs(next.panelHeight - params.panelHeight) > 0.05;
          params = next;

          camera.fov = params.fov;
          camera.aspect = params.aspect;
          camera.position.set(0, params.camY, params.camZ);
          camera.lookAt(0, params.lookY, 0);
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);

          if (needsGeoRebuild) {
            const newGeo = new THREE.CylinderGeometry(
              params.radius,
              params.radius,
              params.panelHeight,
              44,
              1,
              true,
              -panelArc / 2,
              panelArc
            );
            meshes.forEach((m) => {
              m.geometry = newGeo;
            });
            sharedGeo.dispose();
            sharedGeo = newGeo;
          }
        };
        window.addEventListener("resize", onResize, { passive: true });

        let displayedAngle = angleRef.current;
        const brightColor = new THREE.Color(0xffffff);
        const dimColor = new THREE.Color(0x888b92);
        const tempColor = new THREE.Color();

        const renderFrame = () => {
          if (disposed) return;
          if (!isVisible) {
            rafId = 0;
            return;
          }

          const target = angleRef.current;
          if (prefersReducedMotion) {
            displayedAngle = target;
          } else {
            // Smooth spring-like damping
            displayedAngle += (target - displayedAngle) * 0.12;
          }

          const velocity = target - displayedAngle;
          ringGroup.rotation.y = -displayedAngle;
          // Subtle cinematic roll when spinning fast
          ringGroup.rotation.z = prefersReducedMotion
            ? 0
            : Math.max(-0.025, Math.min(0.025, -velocity * 0.04));

          // Subtle depth shading so front curved panel shines while back panels recede softly
          for (let i = 0; i < total; i++) {
            const relAngle = i * angleStep - displayedAngle;
            const facing = (Math.cos(relAngle) + 1) * 0.5; // 1 = front, 0 = back
            const shade = 0.25 + 0.75 * Math.pow(facing, 0.9);
            tempColor.copy(dimColor).lerp(brightColor, shade);
            materials[i].color.copy(tempColor);
            materials[i].opacity = 0.58 + 0.42 * facing;
          }

          renderer.render(scene, camera);
          rafId = window.requestAnimationFrame(renderFrame);
        };

        const startLoop = () => {
          if (!rafId && !disposed && isVisible) {
            rafId = window.requestAnimationFrame(renderFrame);
          }
        };
        startLoop();

        (host as unknown as { __startLoop?: () => void }).__startLoop = startLoop;

        cleanupThree = () => {
          window.removeEventListener("resize", onResize);
          domEl.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          if (rafId) window.cancelAnimationFrame(rafId);
          sharedGeo.dispose();
          materials.forEach((m) => {
            m.map?.dispose();
            m.dispose();
          });
          renderer.dispose();
          if (domEl.parentNode === host) {
            host.removeChild(domEl);
          }
        };
      } catch {
        if (!disposed) setWebglFailed(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          if (!initialized) {
            init();
          } else {
            const start = (host as unknown as { __startLoop?: () => void }).__startLoop;
            if (start) start();
          }
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(host);

    return () => {
      disposed = true;
      observer.disconnect();
      if (cleanupThree) cleanupThree();
    };
  }, [projects, angleRef, prefersReducedMotion]);

  const activeProject = projects[activeIndex] || projects[0];

  if (webglFailed) {
    // Graceful static fallback only if WebGL context cannot be created
    return (
      <div className="relative w-full h-[clamp(260px,46vh,460px)] flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl aspect-[16/10] overflow-hidden border border-white/15 bg-[#1a1b1a]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeProject.image}
            alt={activeProject.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className="relative w-full max-w-full overflow-hidden h-[clamp(290px,48vh,490px)] sm:h-[clamp(360px,54vh,540px)] cursor-grab active:cursor-grabbing select-none"
      role="img"
      aria-label={`3D curved cylindrical showcase displaying ${activeProject.name}: ${activeProject.headline}`}
    />
  );
}

