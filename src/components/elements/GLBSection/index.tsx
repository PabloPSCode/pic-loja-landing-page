"use client";

import {
  GLBViewer,
  GLBViewerProps,
} from "@/components/animations-and-loading/GLBViewer";
import useResponsiveGLBScale from "@/hooks/useResponsiveGLBScale";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface GLBSectionProps extends Partial<GLBViewerProps> {
  title?: string;
  titleClassName?: string;
  modelProps?: GLBViewerProps;
  className?: string;
}

export default function GLBSection({
  title = "Qualidade nos mínimos detalhes",
  titleClassName,
  className,
  modelProps,
  ...directModelProps
}: GLBSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { minScale: responsiveMinScale, maxScale: responsiveMaxScale } =
    useResponsiveGLBScale();

  const mergedModelProps: Partial<GLBViewerProps> = {
    ...directModelProps,
    ...(modelProps ?? {}),
  };

  if (!mergedModelProps.glbModelPath) {
    return null;
  }

  const resolvedMinScale = mergedModelProps.minScale ?? responsiveMinScale;
  const resolvedMaxScale = mergedModelProps.maxScale ?? responsiveMaxScale;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  useEffect(() => {
    const updateProgressBySectionScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const maxScrollableDistance = Math.max(
        1,
        section.offsetHeight - window.innerHeight,
      );
      const traversed = clamp(-rect.top, 0, maxScrollableDistance);
      const progress = traversed / maxScrollableDistance;

      setScrollProgress(progress);
    };

    updateProgressBySectionScroll();
    window.addEventListener("scroll", updateProgressBySectionScroll, {
      passive: true,
    });
    window.addEventListener("resize", updateProgressBySectionScroll);

    return () => {
      window.removeEventListener("scroll", updateProgressBySectionScroll);
      window.removeEventListener("resize", updateProgressBySectionScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={clsx("relative h-[200vh] w-full bg-background", className)}
    >
      <div
        className="sticky top-0 flex h-screen w-full items-center justify-center"
      >
        <div className="relative aspect-video w-full h-full overflow-hidden bg-secondary-900 touch-none flex flex-col items-center justify-center">
          <h1
            className={clsx(
              "text-2xl sm:text-3xl lg:text-4xl text-white font-bold absolute top-24 text-center py-12 p-4",
              titleClassName,
            )}
          >
            {title}
          </h1>
          <GLBViewer
            {...(mergedModelProps as GLBViewerProps)}
            glbModelPath={mergedModelProps.glbModelPath}
            height={mergedModelProps.height ?? "100%"}
            scrollProgress={scrollProgress}
            minScale={resolvedMinScale}
            maxScale={resolvedMaxScale}
          />
        </div>
      </div>
    </section>
  );
}