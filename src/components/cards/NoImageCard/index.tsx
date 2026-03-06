'use client';

import FileInput from "@/components/inputs/FileInput";
import UploadedImage, { type UploadedImageProps } from "@/components/media/UploadedImage";
import { WarningCircleIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import type { ChangeEvent, ReactNode } from "react";

export interface NoImageCardProps {
  /** Título principal da área */
  title?: string;
  /** Texto de alerta para orientar o usuário */
  warningText?: string;
  /** Ícone de alerta customizável */
  warningIcon?: ReactNode;
  /** Label do input quando não há imagem */
  noImageLabel?: string;
  /** Título do botão de seleção de imagem */
  fileInputButtonTitle?: string;
  /** Tipos de arquivo aceitos */
  accept?: string;
  /** Callback para upload */
  onUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Dados da imagem enviada; quando definido, renderiza `UploadedImage` */
  uploadedImage?: UploadedImageProps | null;
  /** Classes adicionais para o container */
  className?: string;
}

export default function NoImageCard({
  title = "Selecione uma imagem para transformar em produto",
  warningText =
    "Certifique-se da imagem se referir realmente a um objeto que represente o produto que deseja vender, caso contrário seu processamento poderá falhar.",
  warningIcon,
  noImageLabel = "Nenhuma imagem selecionada",
  fileInputButtonTitle = "Selecionar imagem",
  accept = "image/*",
  onUpload,
  uploadedImage,
  className,
}: NoImageCardProps) {
  return (
    <section
      className={clsx(
        "w-full rounded-xl border border-foreground/10 bg-bg-card p-4 shadow-sm sm:p-6",
        className
      )}
    >
      {uploadedImage ? (
        <UploadedImage {...uploadedImage} />
      ) : (
        <>
          <h3 className="text-base font-semibold text-foreground sm:text-xl">{title}</h3>

          <div className="mt-4 grid w-full gap-4 lg:grid-cols-[1.45fr_0.85fr]">
            <div
              className={clsx(
                "flex items-start gap-3 rounded-lg border p-4",
                "border-alert-300/80 bg-alert-50 text-alert-900",
                "dark:border-alert-400/40 dark:bg-alert-950/20 dark:text-alert-100"
              )}
            >
              <span className="mt-0.5 shrink-0" aria-hidden>
                {warningIcon || <WarningCircleIcon size={22} weight="fill" />}
              </span>

              <p className="text-sm leading-6 sm:text-base">{warningText}</p>
            </div>

            <div className="w-full">
              <FileInput
                accept={accept}
                buttonClassName={clsx(
                  "border-primary-600 bg-primary-500 text-foreground font-semibold",
                  "hover:bg-primary-400 dark:border-primary-500 dark:bg-primary-500 dark:text-foreground"
                )}
                buttonTitle={fileInputButtonTitle}
                label={noImageLabel}
                labelClassName="mb-2 text-sm font-medium sm:text-base"
                onUpload={onUpload}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
