"use client";

import Button from "@/components/buttons/Button";
import ColorInput from "@/components/inputs/ColorInput";
import CurrencyInput from "@/components/inputs/CurrencyInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import Switcher from "@/components/miscellaneous/Switcher";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface ProductManageCardProduct {
  /** Título do produto */
  title: string;
  /** URL da imagem do produto */
  imgUrl: string;
  /** Descrição inicial do produto */
  description?: string;
  /** Preço inicial do produto */
  price?: string | number;
  /** Define se o preço deve aparecer ativo inicialmente */
  showPrice?: boolean;
  /** Cor de fundo do preview */
  bgColor?: string;
}

export interface ProductManageCardSavePayload {
  /** Título do produto */
  title: string;
  /** URL da imagem do produto */
  imgUrl: string;
  /** Descrição atual do formulário */
  description: string;
  /** Preço atual do formulário */
  price: string;
  /** Define se o preço está ativo */
  showPrice: boolean;
  /** Cor de fundo selecionada */
  bgColor: string;
}

export interface ProductManageCardProps {
  /** Dados iniciais do produto */
  product: ProductManageCardProduct;
  /** Retorna o estado atual do produto sempre que os inputs mudarem */
  onChange?: (payload: ProductManageCardSavePayload) => void;
  /** Ação executada ao salvar o produto */
  onSave: (payload: ProductManageCardSavePayload) => void;
  /** Texto do botão de salvar */
  saveButtonLabel?: string;
  /** Classes adicionais do contêiner */
  className?: string;
  /** Desabilita a ação de salvar */
  disabled?: boolean;
}

const DEFAULT_BACKGROUND_COLOR = "#c2c2c2";
const MAX_DESCRIPTION_LENGTH = 500;

function hasInitialPrice(price?: string | number) {
  if (typeof price === "number") {
    return true;
  }

  return Boolean(price?.trim());
}

function resolveInitialShowPrice(product: ProductManageCardProduct) {
  if (typeof product.showPrice === "boolean") {
    return product.showPrice;
  }

  return hasInitialPrice(product.price);
}

function normalizeInitialPrice(price?: string | number) {
  if (typeof price === "number") {
    return price.toFixed(2).replace(".", ",");
  }

  return price ?? "";
}

function buildPayload(
  product: ProductManageCardProduct,
  description: string,
  price: string,
  showPrice: boolean,
  bgColor: string,
): ProductManageCardSavePayload {
  return {
    title: product.title,
    imgUrl: product.imgUrl,
    description,
    price,
    showPrice,
    bgColor,
  };
}

export default function ProductManageCard({
  product,
  onChange,
  onSave,
  saveButtonLabel = "Salvar produto",
  className,
  disabled = false,
}: ProductManageCardProps) {
  const [description, setDescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(normalizeInitialPrice(product.price));
  const [showPrice, setShowPrice] = useState(resolveInitialShowPrice(product));
  const [bgColor, setBgColor] = useState(
    product.bgColor ?? DEFAULT_BACKGROUND_COLOR,
  );

  useEffect(() => {
    setDescription(product.description ?? "");
    setPrice(normalizeInitialPrice(product.price));
    setShowPrice(resolveInitialShowPrice(product));
    setBgColor(product.bgColor ?? DEFAULT_BACKGROUND_COLOR);
  }, [
    product.bgColor,
    product.description,
    product.imgUrl,
    product.price,
    product.showPrice,
    product.title,
  ]);

  useEffect(() => {
    onChange?.(buildPayload(product, description, price, showPrice, bgColor));
  }, [
    bgColor,
    description,
    onChange,
    price,
    product.imgUrl,
    product.title,
    showPrice,
  ]);

  const handleSave = () => {
    onSave(buildPayload(product, description, price, showPrice, bgColor));
  };

  return (
    <section
      aria-label={`Gerenciamento do produto ${product.title}`}
      className={clsx("w-full rounded-xl  bg-bg-card p-4  sm:p-6", className)}
    >
      <div className="grid w-full gap-5 lg:grid-cols-[232px_minmax(0,1fr)_248px] lg:items-start">
        <div
          className="flex min-h-[168px] items-center justify-center overflow-hidden rounded-lg p-4 border border-border-card"
          style={{ backgroundColor: bgColor }}
        >
          <div className="relative h-full min-h-[136px] w-full">
            <Image
              alt={product.title}
              className="object-contain"
              fill
              sizes="(max-width: 1024px) 100vw, 232px"
              src={product.imgUrl}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="w-full">
            <TextAreaInput
              className="min-h-[108px] resize-none border-border-card bg-background"
              containerClassName="w-full"
              currentTextLength={description.length}
              disabled={disabled}
              id="product-manage-description"
              label="Descrição"
              maxTextLength={MAX_DESCRIPTION_LENGTH}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descrição do produto, máximo de 100 caracteres"
              showTextLength={false}
              value={description}
            />
            <div className="flex justify-end">
              <span className="text-xs font-medium text-info-600 dark:text-info-300">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
            <div className="w-full">
              <div className="mb-1 flex items-center gap-3">
                <span className="text-xs font-medium text-foreground sm:text-sm">
                  Preço
                </span>
                <Switcher
                  checked={showPrice}
                  containerClassName="flex items-center"
                  disabled={disabled}
                  onChange={setShowPrice}
                />
              </div>

              <CurrencyInput
                aria-label="Preço do produto"
                className="border-border-card bg-background"
                containerClassName="[&>label]:sr-only"
                disabled={!showPrice || disabled}
                helperText={
                  !showPrice
                    ? "Ative o preço para editar este campo."
                    : undefined
                }
                id="product-manage-price"
                label="Preço"
                onChange={(event) => setPrice(event.target.value)}
                placeholder="R$ 99,90"
                value={price}
              />
            </div>

            <ColorInput
              className="h-10 w-24 border-border-card bg-background"
              disabled={disabled}
              id="product-manage-bg-color"
              label="Cor do fundo"
              onChange={(event) => setBgColor(event.target.value)}
              value={bgColor}
            />
          </div>
        </div>

        <div className="flex w-full h-full flex-col justify-center p-4">
          <Button
            className="w-full justify-center rounded-md py-3 text-sm font-semibold sm:text-base"
            disabled={disabled}
            label={saveButtonLabel}
            onClick={handleSave}
            type="button"
          />
        </div>
      </div>
    </section>
  );
}

export type {
  ProductManageCardProduct as IProductManageCardProduct,
  ProductManageCardSavePayload as IProductManageCardSavePayload,
};
