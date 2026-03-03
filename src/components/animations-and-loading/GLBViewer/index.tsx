"use client";

import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { forwardRef } from "react";

import {
  Center,
  Environment,
  OrbitControls,
  OrbitControlsProps,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";

type ModelProps = ThreeElements["group"] & {
  glbModelPath: string;
};

const GLBModel = forwardRef<Group, ModelProps>(function GLBModel(
  { glbModelPath, ...props },
  ref,
) {
  const { scene } = useGLTF(glbModelPath);
  return (
    <group ref={ref} {...props}>
      <primitive object={scene} />
    </group>
  );
});

GLBModel.displayName = "GLBModel";

export interface GLBViewerProps extends Omit<OrbitControlsProps, "enablePan"> {
  glbModelPath: string;
  height?: number | string;
  modelScale?: number;
  minYRotatePosition?: number;
  maxYRotatePosition?: number;
  minXRotatePosition?: number;
  maxXRotatePosition?: number;
  minZRotatePosition?: number;
  maxZRotationPostion?: number;
  maxZRotatePosition?: number;
  rotateX?: number;
  rotateY?: number;
  rotateYLimit?: number;
  rotateZ?: number;
  scrollProgress?: number;
  horizontalTravel?: number;
  progressRotationY?: number;
  stopAtFront?: boolean;
  frontRotationY?: number;
  lockAtScrollVH?: number;
  minScale?: number;
  maxScale?: number;
  animateOnScroll?: boolean;
  enablePan?: boolean;
  marginTop?: number | string;
}

export function GLBViewer({
  glbModelPath,
  height,
  modelScale = 1,
  minYRotatePosition,
  maxYRotatePosition,
  minXRotatePosition,
  maxXRotatePosition,
  minZRotatePosition,
  maxZRotationPostion,
  maxZRotatePosition,
  rotateX = 0,
  rotateY = 0,
  rotateYLimit = 0,
  rotateZ = 0,
  scrollProgress,
  horizontalTravel = 0,
  progressRotationY = 0,
  stopAtFront = false,
  frontRotationY = 0,
  lockAtScrollVH = 0.6,
  minScale = 0.8,
  maxScale = 1.5,
  animateOnScroll = true,
  enablePan = true,
  marginTop = 0,
  ...orbitProps
}: GLBViewerProps) {
  const modelRef = useRef<Group>(null);
  const initialRotationRef = useRef<{
    x: number;
    y: number;
    z: number;
  } | null>(null);

  const resolvedMaxZRotatePosition = maxZRotatePosition ?? maxZRotationPostion;

  const hasRange = (min?: number, max?: number) =>
    min !== undefined || max !== undefined;

  const resolveRange = (
    min: number | undefined,
    max: number | undefined,
    fallback: number,
  ) => {
    let start = min ?? fallback;
    let end = max ?? start;

    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }

    return { start, end };
  };

  const ensureInitialRotation = () => {
    if (!modelRef.current || initialRotationRef.current) return;

    initialRotationRef.current = {
      x: modelRef.current.rotation.x,
      y: modelRef.current.rotation.y,
      z: modelRef.current.rotation.z,
    };
  };

  useEffect(() => {
    if (scrollProgress === undefined || !modelRef.current) return;

    ensureInitialRotation();
    const initialRotation = initialRotationRef.current ?? { x: 0, y: 0, z: 0 };

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const progress = clamp(scrollProgress, 0, 1);
    const nextScale = minScale + (maxScale - minScale) * progress;
    const startX = -horizontalTravel / 2;
    const yUsesRange = hasRange(minYRotatePosition, maxYRotatePosition);
    const xUsesRange = hasRange(minXRotatePosition, maxXRotatePosition);
    const zUsesRange = hasRange(minZRotatePosition, resolvedMaxZRotatePosition);

    let nextRotationY: number;
    if (yUsesRange) {
      const { start, end } = resolveRange(
        minYRotatePosition,
        maxYRotatePosition,
        initialRotation.y,
      );
      nextRotationY = start + (end - start) * progress;
    } else {
      const desiredRotationY = progressRotationY + (rotateY > 0 ? rotateY : 0);
      let targetRotationY = desiredRotationY;

      if (rotateYLimit > 0) {
        const direction =
          desiredRotationY === 0 ? 1 : Math.sign(desiredRotationY);
        targetRotationY =
          direction * Math.min(Math.abs(desiredRotationY), rotateYLimit);
      }

      nextRotationY = targetRotationY * progress;
    }

    let nextRotationX = modelRef.current.rotation.x;
    if (xUsesRange) {
      const { start, end } = resolveRange(
        minXRotatePosition,
        maxXRotatePosition,
        initialRotation.x,
      );
      nextRotationX = start + (end - start) * progress;
    } else if (rotateX > 0) {
      nextRotationX = rotateX * progress;
    }

    let nextRotationZ = modelRef.current.rotation.z;
    if (zUsesRange) {
      const { start, end } = resolveRange(
        minZRotatePosition,
        resolvedMaxZRotatePosition,
        initialRotation.z,
      );
      nextRotationZ = start + (end - start) * progress;
    } else if (rotateZ > 0) {
      nextRotationZ = rotateZ * progress;
    }

    modelRef.current.scale.setScalar(nextScale);
    modelRef.current.position.x = startX + horizontalTravel * progress;
    modelRef.current.rotation.x = nextRotationX;
    modelRef.current.rotation.y = nextRotationY;
    modelRef.current.rotation.z = nextRotationZ;
  }, [
    scrollProgress,
    minYRotatePosition,
    maxYRotatePosition,
    minXRotatePosition,
    maxXRotatePosition,
    minZRotatePosition,
    maxZRotationPostion,
    maxZRotatePosition,
    rotateX,
    rotateY,
    rotateYLimit,
    rotateZ,
    horizontalTravel,
    progressRotationY,
    minScale,
    maxScale,
    marginTop,
  ]);

  useEffect(() => {
    if (!animateOnScroll || scrollProgress !== undefined) return;
    const rotationFactor = 0.005;
    const scaleFactor = 0.0012;

    let lastScrollY = window.scrollY;
    let currentScale = 1;
    let hasInitializedScale = false;
    let hasInitializedRotationRanges = false;
    let initialRotationY: number | null = null;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (!modelRef.current) {
        return;
      }

      ensureInitialRotation();
      const initialRotation = initialRotationRef.current ?? {
        x: 0,
        y: 0,
        z: 0,
      };
      const yUsesRange = hasRange(minYRotatePosition, maxYRotatePosition);
      const xUsesRange = hasRange(minXRotatePosition, maxXRotatePosition);
      const zUsesRange = hasRange(
        minZRotatePosition,
        resolvedMaxZRotatePosition,
      );

      if (!hasInitializedRotationRanges) {
        if (xUsesRange) {
          const { start } = resolveRange(
            minXRotatePosition,
            maxXRotatePosition,
            initialRotation.x,
          );
          modelRef.current.rotation.x = start;
        }

        if (yUsesRange) {
          const { start } = resolveRange(
            minYRotatePosition,
            maxYRotatePosition,
            initialRotation.y,
          );
          modelRef.current.rotation.y = start;
        }

        if (zUsesRange) {
          const { start } = resolveRange(
            minZRotatePosition,
            resolvedMaxZRotatePosition,
            initialRotation.z,
          );
          modelRef.current.rotation.z = start;
        }

        hasInitializedRotationRanges = true;
      }

      if (initialRotationY === null) {
        initialRotationY = modelRef.current.rotation.y;
      }

      if (!hasInitializedScale) {
        currentScale = clamp(modelRef.current.scale.x, minScale, maxScale);
        hasInitializedScale = true;
      }

      if (delta !== 0) {
        if (yUsesRange) {
          const { start, end } = resolveRange(
            minYRotatePosition,
            maxYRotatePosition,
            initialRotation.y,
          );
          const speed = rotateY > 0 ? rotateY : rotationFactor;
          modelRef.current.rotation.y = clamp(
            modelRef.current.rotation.y + delta * speed,
            start,
            end,
          );
        } else {
          if (stopAtFront) {
            const lockScrollY = Math.max(
              1,
              lockAtScrollVH * window.innerHeight,
            );
            const progress = clamp(currentScrollY / lockScrollY, 0, 1);
            const startRotation = initialRotationY ?? 0;
            modelRef.current.rotation.y =
              startRotation + (frontRotationY - startRotation) * progress;
          } else {
            modelRef.current.rotation.y += delta * rotationFactor;
          }

          if (rotateY > 0) {
            modelRef.current.rotation.y += delta * rotateY;
          }

          if (rotateYLimit > 0) {
            modelRef.current.rotation.y = clamp(
              modelRef.current.rotation.y,
              -rotateYLimit,
              rotateYLimit,
            );
          }
        }

        if (xUsesRange) {
          const { start, end } = resolveRange(
            minXRotatePosition,
            maxXRotatePosition,
            initialRotation.x,
          );
          const speed = rotateX > 0 ? rotateX : rotationFactor;
          modelRef.current.rotation.x = clamp(
            modelRef.current.rotation.x + delta * speed,
            start,
            end,
          );
        } else if (rotateX > 0) {
          modelRef.current.rotation.x += delta * rotateX;
        }

        if (zUsesRange) {
          const { start, end } = resolveRange(
            minZRotatePosition,
            resolvedMaxZRotatePosition,
            initialRotation.z,
          );
          const speed = rotateZ > 0 ? rotateZ : rotationFactor;
          modelRef.current.rotation.z = clamp(
            modelRef.current.rotation.z + delta * speed,
            start,
            end,
          );
        } else if (rotateZ > 0) {
          modelRef.current.rotation.z += delta * rotateZ;
        }
      }

      if (delta !== 0) {
        currentScale = clamp(
          currentScale + delta * scaleFactor,
          minScale,
          maxScale,
        );
        modelRef.current.scale.setScalar(currentScale);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    minYRotatePosition,
    maxYRotatePosition,
    minXRotatePosition,
    maxXRotatePosition,
    minZRotatePosition,
    maxZRotationPostion,
    maxZRotatePosition,
    stopAtFront,
    frontRotationY,
    lockAtScrollVH,
    animateOnScroll,
    scrollProgress,
    rotateX,
    rotateY,
    rotateYLimit,
    rotateZ,
    minScale,
    maxScale,
    marginTop,
  ]);

  const containerHeight = height ?? "100vh";

  return (
    <div
      style={{
        width: "100%",
        height: containerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop,
      }}
    >
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-10, -10, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="park" />
          <Center>
            <GLBModel
              ref={modelRef}
              glbModelPath={glbModelPath}
              scale={modelScale}
            />
          </Center>
        </Suspense>
        <OrbitControls
          enableDamping={false}
          enableZoom={false}
          {...orbitProps}
          enablePan={enablePan}
        />
      </Canvas>
    </div>
  );
}