"use client";

import NoImageCard from "@/components/cards/NoImageCard";
import StepIndicator from "@/components/miscellaneous/StepIndicator";
import { CameraIcon, CircleNotchIcon, MagicWandIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";

const TOTAL_STEPS = 3;

export default function Start() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const stepConfig = useMemo(() => {
    if (currentStep === 1) {
      return {
        icon: <CameraIcon size={22} weight="fill" />,
        title: "Seleção de imagens",
      };
    }

    return {
      icon: <MagicWandIcon size={22} weight="fill" />,
      title: "Geração de produto",
    };
  }, [currentStep]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];

    if (!nextFile) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrl = URL.createObjectURL(nextFile);

    setUploadedFile(nextFile);
    setPreviewUrl(nextPreviewUrl);
    setCurrentStep(1);
    setIsGenerating(false);
    event.currentTarget.value = "";
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadedFile(null);
    setPreviewUrl(null);
    setCurrentStep(1);
    setIsGenerating(false);
  };

  const handleGenerateProduct = () => {
    if (!uploadedFile) return;

    setCurrentStep(2);
    setIsGenerating(true);
  };

  return (
    <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
        <StepIndicator
          currentStep={currentStep}
          stepIcon={stepConfig.icon}
          stepTitle={stepConfig.title}
          totalSteps={TOTAL_STEPS}
        />

        {currentStep === 1 ? (
          <NoImageCard
            fileInputButtonTitle="Selecionar imagem"
            noImageLabel="Nenhuma imagem selecionada"
            onUpload={handleUpload}
            uploadedImage={
              uploadedFile && previewUrl
                ? {
                    fileName: uploadedFile.name,
                    imageAlt: uploadedFile.name,
                    imageSrc: previewUrl,
                    onRemove: handleRemoveImage,
                    selectedText: "1 imagem selecionada",
                    title: "Imagem selecionada:",
                    actionSlot: (
                      <button
                        className={clsx(
                          "inline-flex items-center gap-2 rounded-md px-4 py-2",
                          "bg-primary-500 text-sm font-semibold text-foreground",
                          "transition-colors hover:bg-primary-400"
                        )}
                        onClick={handleGenerateProduct}
                        type="button"
                      >
                        Gerar produto
                        <MagicWandIcon size={16} weight="fill" />
                      </button>
                    ),
                  }
                : null
            }
          />
        ) : (
          <section className="w-full rounded-xl border border-foreground/10 bg-bg-card p-5 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-foreground sm:text-xl">
              Geração do produto
            </h3>

            <div className="flex min-h-[230px] w-full flex-col items-center justify-center gap-3 text-center">
              <CircleNotchIcon
                className={clsx(
                  "text-primary-500",
                  isGenerating ? "animate-spin" : undefined
                )}
                size={46}
                weight="bold"
              />
              <p className="text-xl font-semibold text-foreground sm:text-3xl">
                Estamos gerando seu produto
              </p>
              <p className="text-base text-foreground/75 sm:text-2xl">
                gerando 1 de 1 produto(s)
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
