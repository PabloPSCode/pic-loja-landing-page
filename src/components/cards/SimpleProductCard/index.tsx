"use client";

import { formatBRL } from "@/utils/format";
import clsx from "clsx";
import Image from "next/image";

export interface SimpleProductCardProps {
  /** Título do produto */
  title: string;
  /** URL da imagem do produto */
  imgUrl: string;
  /** Preço do produto */
  price: string | number;
  /** Descrição do produto */
  description: string;
  /** Cor de fundo do preview da imagem */
  bgColor?: string;
  /** Classes adicionais do contêiner */
  className?: string;
  /** Classes adicionais do título */
  titleClassName?: string;
  /** Classes adicionais do preço */
  priceClassName?: string;
}

const DEFAULT_BACKGROUND_COLOR = "#c2c2c2";

function formatProductPrice(price: string | number) {
  if (typeof price === "number") {
    return formatBRL(price);
  }

  const normalizedPrice = price.trim();

  if (!normalizedPrice) {
    return "Sob consulta";
  }

  if (normalizedPrice.includes("R$")) {
    return normalizedPrice;
  }

  const numericValue = Number(normalizedPrice.replace(/\./g, "").replace(",", "."));

  if (!Number.isNaN(numericValue)) {
    return formatBRL(numericValue);
  }

  return price;
}

/**
 * Versão simplificada de um card de produto para exibir resultado gerado.
 * Mantém apenas imagem, título e preço com suporte a dark mode e responsividade.
 */
export default function SimpleProductCard({
  title,
  description,
  imgUrl,
  price,
  bgColor = DEFAULT_BACKGROUND_COLOR,
  className,
  titleClassName,
  priceClassName,
}: SimpleProductCardProps) {
  const formattedPrice = formatProductPrice(price);

  return (
    <section
      aria-label={`Pré-visualização do produto ${title}`}
      className={clsx(
        "w-full rounded-xl border border-border-card bg-bg-card p-4 shadow-sm sm:p-6",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <div
          className="flex h-[140px] w-full sm:max-w-[160px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-card p-4"
          style={{ backgroundColor: bgColor }}
        >
          <div className="relative h-full w-full">
            <Image
              alt={title}
              className="object-contain"
              fill
              sizes="(max-width: 640px) 160px, 160px"
              src={imgUrl}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2
            className={clsx(
              "text-lg font-semibold text-foreground sm:text-xl",
              titleClassName,
            )}
          >
            {title}
          </h2>
          <p
            className={clsx(
              "text-lg font-bold text-foreground sm:text-xl",
              priceClassName,
            )}
          >
            {formattedPrice}
          </p>
        </div>
        <p className="text-xs text-foreground/75 sm:text-base">{description}</p>
      </div>
    </section>
  );
}

export type { SimpleProductCardProps as ISimpleProductCardProps };
