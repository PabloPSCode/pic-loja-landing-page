'use client';

import clsx from "clsx";
import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import type { ReactNode } from "react";

export interface UploadedImageProps {
  /** Título exibido acima da área de preview */
  title?: string;
  /** Origem da imagem selecionada */
  imageSrc: string;
  /** Texto alternativo da imagem */
  imageAlt: string;
  /** Nome do arquivo */
  fileName?: string;
  /** Texto de quantidade de imagens */
  selectedText?: string;
  /** Ação opcional (ex.: botão "Gerar produto") */
  actionSlot?: ReactNode;
  /** Callback para remover a imagem selecionada */
  onRemove?: () => void;
  /** Classes adicionais para o contêiner */
  className?: string;
}

export default function UploadedImage({
  title = "Imagem selecionada:",
  imageSrc,
  imageAlt,
  fileName = "arquivo.png",
  selectedText = "1 imagem selecionada",
  actionSlot,
  onRemove,
  className,
}: UploadedImageProps) {
  return (
    <section className={clsx("w-full", className)}>
      {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}

      <div className="mt-4 grid w-full gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="overflow-hidden rounded-lg border border-foreground/10 bg-bg-card">
          <div className="flex items-center justify-between border-b border-foreground/10 px-3 py-2">
            <span
              className="max-w-[85%] truncate text-xs text-foreground/70 sm:text-sm"
              title={fileName}
            >
              {fileName}
            </span>

            {onRemove && (
              <button
                aria-label="Remover imagem selecionada"
                className="inline-flex h-6 w-6 items-center justify-center rounded text-destructive-500 transition-colors hover:text-destructive-600"
                onClick={onRemove}
                type="button"
              >
                <XIcon size={14} weight="bold" />
              </button>
            )}
          </div>

          <div className="relative aspect-[16/10] w-full bg-tertiary-100 dark:bg-tertiary-800/50">
            <Image
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              src={imageSrc}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:pt-4">
          <span className="text-sm font-semibold text-foreground sm:text-base">{selectedText}</span>
          {actionSlot}
        </div>
      </div>
    </section>
  );
}
