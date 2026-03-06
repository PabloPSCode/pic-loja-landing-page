'use client';

import clsx from "clsx";
import type { ReactNode } from "react";

export interface StepIndicatorProps {
  /** Título da etapa (ex.: "Seleção de imagens") */
  stepTitle: string;
  /** Ícone da etapa */
  stepIcon: ReactNode;
  /** Etapa atual (base 1) */
  currentStep: number;
  /** Total de etapas */
  totalSteps: number;
  /** Classes adicionais para o contêiner */
  className?: string;
}

export default function StepIndicator({
  stepTitle,
  stepIcon,
  currentStep,
  totalSteps,
  className,
}: StepIndicatorProps) {
  const safeTotal = Math.max(1, totalSteps);
  const safeCurrent = Math.min(Math.max(1, currentStep), safeTotal);

  return (
    <section
      aria-label={`Etapa ${safeCurrent} de ${safeTotal}`}
      className={clsx(
        "w-full rounded-xl border border-foreground/10 bg-bg-card p-4 sm:p-5",
        "text-foreground shadow-sm",
        className
      )}
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className={clsx(
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              "bg-background text-foreground"
            )}
            aria-hidden
          >
            {stepIcon}
          </span>

          <h2 className="text-base font-semibold sm:text-xl">{stepTitle}</h2>
        </div>

        <p className="text-sm font-semibold sm:text-lg">
          Passo {safeCurrent} de {safeTotal}
        </p>
      </div>
    </section>
  );
}
