'use client';

import Image from "next/image";
import { formatBRL } from "@/utils/format";
import { ShoppingCartIcon, StarIcon, TimerIcon } from "@phosphor-icons/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

interface ProductCardProps {
  /** URL da imagem do produto. */
  imageUrl: string;
  /** Título do produto. */
  title: string;
  /** Preço do produto (valor numérico). */
  price: number;
  /** Avaliação do produto (0 a 5). */
  rating?: Rating;
  /** Quantidade de parcelas (opcional). */
  installments?: number;
  /** Valor de cada parcela (opcional). */
  installmentValue?: number;
  /** Rótulo do botão (ex.: “Adicionar ao carrinho”). */
  ctaLabel?: string;
  /** Callback ao clicar no botão de ação. */
  onAddToCart?: () => void;
  /** Callback ao ver os detalhes do produto. */
  onSeeProductDetails?: (productId?: string) => void;

  /**
   * Se deve mostrar a promoção (deal).
   * Quando `true`, o card exibe preço promocional e um contador regressivo.
   */
  showDeal?: boolean;

  /** Preço da promoção. Quando não informado, usa `price` como fallback. */
  dealPrice?: number;

  /**
   * Horário (ISO string) em que a promoção termina.
   * - **Padrão:** 24 horas a partir do primeiro render.
   * - Ex.: "2025-12-31T23:59:59.000Z"
   */
  dealEndsWithIn?: string;
}

/**
 * Card de produto para listagens em e-commerce.
 * - **Responsivo:** tipografia, imagem e botões adaptam por breakpoint.
 * - **Acessível:** `alt` na imagem, labels ARIA e botão com foco visível.
 * - **Promoção com contador:** se `showDeal` for `true`, exibe preço promocional e um contador que
 *   por padrão encerra em 24 horas (ou no horário definido em `dealEndsWithIn`).
 */
export default function ProductCard({
  imageUrl,
  title,
  price,
  rating,
  installments,
  installmentValue,
  ctaLabel = "Adicionar ao carrinho",
  onAddToCart,
  onSeeProductDetails,
  showDeal,
  dealPrice,
  dealEndsWithIn,
}: ProductCardProps) {
  // === Preços formatados ===
  const formattedBasePrice = formatBRL(price);
  const effectiveDealPrice = dealPrice ?? price;
  const formattedDealPrice = formatBRL(effectiveDealPrice);

  // === Lógica do contador de oferta ===
  // Define o horário final: se não for passado, usa +24h a partir de agora.
  const defaultEnd = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 24);
    return d;
  }, []);

  const dealEndsAt = useMemo<Date>(() => {
    if (!showDeal) return defaultEnd;
    if (!dealEndsWithIn) return defaultEnd;
    const parsed = new Date(dealEndsWithIn);
    return isNaN(parsed.getTime()) ? defaultEnd : parsed;
  }, [dealEndsWithIn, defaultEnd, showDeal]);

  const [remainingMs, setRemainingMs] = useState<number>(
    Math.max(0, dealEndsAt.getTime() - Date.now())
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!showDeal) return;
    // Atualiza imediatamente ao trocar `dealEndsAt`
    setRemainingMs(Math.max(0, dealEndsAt.getTime() - Date.now()));

    intervalRef.current = window.setInterval(() => {
      setRemainingMs(() => {
        const next = Math.max(0, dealEndsAt.getTime() - Date.now());
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dealEndsAt, showDeal]);

  const dealExpired = showDeal ? remainingMs <= 0 : false;

  // Converte ms -> HH:MM:SS
  const fmt = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(total % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // === Estrelas de avaliação ===
  const renderStars = (value: Rating) => {
    const stars = Array.from({ length: 5 }, (_, i) => i < value);
    return (
      <div
        className="flex items-center gap-1 text-base sm:text-lg"
        aria-label={`Avaliação ${value} de 5`}
      >
        {stars.map((filled, i) => (
          <StarIcon
            key={i}
            size="1em"
            weight={filled ? "fill" : "regular"}
            className={filled ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="
        group flex flex-col rounded-xl bg-bg-card border-border-card border bg-card shadow-sm
        p-3 sm:p-4 gap-2 max-w-full w-full
      "
      role="article"
      aria-label={`Produto: ${title}`}
      onClick={() => onSeeProductDetails?.()}
    >
      {/* Imagem */}
      <div className="mb-3 sm:mb-4">
        <div
          className="
            w-full overflow-hidden rounded-lg bg-gray-50
            h-28 sm:h-36 md:h-44
            flex items-center justify-center
          "
        >
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={300}
            className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Título */}
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1 line-clamp-2">
        {title}
      </h3>

      {/* Avaliação */}
      {typeof rating === "number" && (
        <div className="mb-2">{renderStars(rating)}</div>
      )}

      {/* Preços */}
      {showDeal && !dealExpired ? (
        <div className="flex items-end gap-2 mb-1">
          <p className="text-2xl md:text-3xl font-extrabold text-green-600">
            {formattedDealPrice}
          </p>
          {effectiveDealPrice < price && (
            <p className="text-sm sm:text-base text-foreground/70 line-through">
              {formattedBasePrice}
            </p>
          )}
        </div>
      ) : (
        <p className="text-2xl md:text-3xl font-extrabold text-green-600 mb-1">
          {formattedBasePrice}
        </p>
      )}

      {/* Parcelamento */}
      {installments && installmentValue ? (
        <p className="text-xs sm:text-sm text-foreground mb-2 sm:mb-3">
          Em até {installments}x de {formatBRL(installmentValue)} sem juros
        </p>
      ) : (
        <div className="mb-1 sm:mb-2" />
      )}

      {/* Contador de oferta */}
      {showDeal && (
        <div className="mb-3 sm:mb-4">
          {!dealExpired ? (
            <div
              className="
                inline-flex items-center gap-1 rounded-md bg-orange-50 text-orange-700
                px-2 py-1 text-[10px] sm:text-xs font-medium
              "
              aria-live="polite"
              aria-label={`Oferta termina em ${fmt(remainingMs)}`}
            >
              <TimerIcon size="1em" weight="bold" />
              Termina em {fmt(remainingMs)}
            </div>
          ) : (
            <div
              className="
                inline-flex items-center gap-1 rounded-md bg-gray-100 text-gray-600
                px-2 py-1 text-[10px] sm:text-xs font-medium
              "
            >
              Promoção encerrada
            </div>
          )}
        </div>
      )}

      {/* Botão de ação */}
      <button
        type="button"
        onClick={onAddToCart}
        disabled={showDeal ? dealExpired : false}
        className={`
          mt-auto inline-flex items-center justify-center gap-2
          rounded-md px-3 py-2 sm:px-4 sm:py-2.5
          text-white text-sm sm:text-base font-medium transition
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            showDeal && dealExpired
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-400"
          }
        `}
        aria-label={`${ctaLabel} - ${title}`}
      >
        <ShoppingCartIcon
          size="1em"
          weight="fill"
          className="text-current text-base sm:text-lg"
        />
        {showDeal && dealExpired ? "Indisponível" : ctaLabel}
      </button>
    </div>
  );
}


export type { ProductCardProps };
