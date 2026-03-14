"use client";

import Button from "@/components/buttons/Button";
import ColorInput from "@/components/inputs/ColorInput";
import CurrencyInput from "@/components/inputs/CurrencyInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import Switcher from "@/components/miscellaneous/Switcher";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface ProductManageCardProduct {
  /** Título do produto */
  title: string;
  /** URL da imagem do produto */
  imgUrl: string;
  /** Descrição inicial do produto */
  description?: string;
  /** Preço inicial do produto */
  price?: number;
  /** Define se o preço deve aparecer ativo inicialmente */
  showPrice?: boolean;
  /** Define se a logo deve aparecer ativa inicialmente */
  showLogo?: boolean;
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
  price: number;
  /** Define se o preço está ativo */
  showPrice: boolean;
  /** Define se a logo está ativa */
  showLogo: boolean;
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
  /** Informa se há uma logo disponível para exibir */
  logoAvailable?: boolean;
}

const DEFAULT_BACKGROUND_COLOR = "#F7F7F7";
const DEFAULT_TRANSPARENT_BACKGROUND_COLOR = "#FFFFFF";
const MAX_DESCRIPTION_LENGTH = 250;

interface ProductManageCardFormState {
  description: string;
  priceInput: string;
  showPrice: boolean;
  showLogo: boolean;
  bgTransparent: boolean;
  selectedBgColor: string;
}

function hasInitialPrice(price?: number) {
  if (typeof price === "number") {
    return true;
  }

  return false;
}

function resolveInitialShowPrice(product: ProductManageCardProduct) {
  if (typeof product.showPrice === "boolean") {
    return product.showPrice;
  }

  return hasInitialPrice(product.price);
}

function normalizeInitialPrice(price?: number) {
  if (typeof price === "number") {
    return price.toFixed(2).replace(".", ",");
  }

  return "";
}

function resolveInitialShowLogo(product: ProductManageCardProduct) {
  if (typeof product.showLogo === "boolean") {
    return product.showLogo;
  }

  return true;
}

function parsePriceInput(value: string) {
  const normalizedValue = value
    .replace(/[^\d,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  if (!normalizedValue) {
    return 0;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function resolveInitialSolidBgColor(bgColor?: string) {
  if (!bgColor || bgColor === DEFAULT_TRANSPARENT_BACKGROUND_COLOR) {
    return DEFAULT_BACKGROUND_COLOR;
  }

  return bgColor;
}

function resolveFormState(
  product: ProductManageCardProduct,
): ProductManageCardFormState {
  return {
    description: product.description ?? "",
    priceInput: normalizeInitialPrice(product.price),
    showPrice: resolveInitialShowPrice(product),
    showLogo: resolveInitialShowLogo(product),
    bgTransparent: product.bgColor === DEFAULT_TRANSPARENT_BACKGROUND_COLOR,
    selectedBgColor: resolveInitialSolidBgColor(product.bgColor),
  };
}

function buildPayload(
  product: ProductManageCardProduct,
  description: string,
  price: number,
  showPrice: boolean,
  showLogo: boolean,
  bgColor: string,
): ProductManageCardSavePayload {
  return {
    title: product.title,
    imgUrl: product.imgUrl,
    description,
    price,
    showPrice,
    showLogo,
    bgColor,
  };
}

function buildPayloadFromProduct(product: ProductManageCardProduct) {
  const formState = resolveFormState(product);

  return buildPayload(
    product,
    formState.description,
    parsePriceInput(formState.priceInput),
    formState.showPrice,
    formState.showLogo,
    formState.bgTransparent
      ? DEFAULT_TRANSPARENT_BACKGROUND_COLOR
      : formState.selectedBgColor,
  );
}

function isSamePayload(
  left: ProductManageCardSavePayload | null,
  right: ProductManageCardSavePayload,
) {
  if (!left) {
    return false;
  }

  return (
    left.title === right.title &&
    left.imgUrl === right.imgUrl &&
    left.description === right.description &&
    left.price === right.price &&
    left.showPrice === right.showPrice &&
    left.showLogo === right.showLogo &&
    left.bgColor === right.bgColor
  );
}

export default function ProductManageCard({
  product,
  onChange,
  onSave,
  saveButtonLabel = "Salvar produto",
  className,
  disabled = false,
  logoAvailable = true,
}: ProductManageCardProps) {
  const initialFormState = resolveFormState(product);
  const lastEmittedPayloadRef = useRef<ProductManageCardSavePayload | null>(
    null,
  );
  const [description, setDescription] = useState(initialFormState.description);
  const [priceInput, setPriceInput] = useState(initialFormState.priceInput);
  const [showPrice, setShowPrice] = useState(initialFormState.showPrice);
  const [showLogo, setShowLogo] = useState(initialFormState.showLogo);
  const [bgTransparent, setBgTransparent] = useState(
    initialFormState.bgTransparent,
  );
  const [selectedBgColor, setSelectedBgColor] = useState(
    initialFormState.selectedBgColor,
  );

  const previewBgColor = bgTransparent
    ? DEFAULT_TRANSPARENT_BACKGROUND_COLOR
    : selectedBgColor;
  const parsedPrice = parsePriceInput(priceInput);
  const saveDisabled = disabled || (showPrice && parsedPrice <= 0);

  useEffect(() => {
    const nextPayload = buildPayloadFromProduct(product);

    if (isSamePayload(lastEmittedPayloadRef.current, nextPayload)) {
      lastEmittedPayloadRef.current = null;
      return;
    }

    const nextFormState = resolveFormState(product);

    setDescription((current) =>
      current === nextFormState.description
        ? current
        : nextFormState.description,
    );
    setPriceInput((current) =>
      current === nextFormState.priceInput ? current : nextFormState.priceInput,
    );
    setShowPrice((current) =>
      current === nextFormState.showPrice ? current : nextFormState.showPrice,
    );
    setShowLogo((current) =>
      current === nextFormState.showLogo ? current : nextFormState.showLogo,
    );
    setBgTransparent((current) =>
      current === nextFormState.bgTransparent
        ? current
        : nextFormState.bgTransparent,
    );
    setSelectedBgColor((current) =>
      current === nextFormState.selectedBgColor
        ? current
        : nextFormState.selectedBgColor,
    );
  }, [
    product.bgColor,
    product.description,
    product.imgUrl,
    product.price,
    product.showPrice,
    product.showLogo,
    product.title,
  ]);

  const emitChange = ({
    nextDescription = description,
    nextPriceInput = priceInput,
    nextShowPrice = showPrice,
    nextShowLogo = showLogo,
    nextSelectedBgColor = selectedBgColor,
    nextBgTransparent = bgTransparent,
  }: {
    nextDescription?: string;
    nextPriceInput?: string;
    nextShowPrice?: boolean;
    nextShowLogo?: boolean;
    nextSelectedBgColor?: string;
    nextBgTransparent?: boolean;
  }) => {
    const nextBgColor = nextBgTransparent
      ? DEFAULT_TRANSPARENT_BACKGROUND_COLOR
      : nextSelectedBgColor;

    if (!onChange) {
      return;
    }

    const nextPayload = buildPayload(
      product,
      nextDescription,
      parsePriceInput(nextPriceInput),
      nextShowPrice,
      nextShowLogo,
      nextBgColor,
    );

    lastEmittedPayloadRef.current = nextPayload;
    onChange(nextPayload);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const nextDescription = event.target.value;
    setDescription(nextDescription);
    emitChange({ nextDescription });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextPriceInput = event.target.value;
    setPriceInput(nextPriceInput);
    emitChange({ nextPriceInput });
  };

  const handleToggleShowPrice = (checked: boolean) => {
    setShowPrice(checked);
    emitChange({ nextShowPrice: checked });
  };

  const handleToggleShowLogo = (checked: boolean) => {
    setShowLogo(checked);
    emitChange({ nextShowLogo: checked });
  };

  const handleChangeBgColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextSelectedBgColor = event.target.value;
    setSelectedBgColor(nextSelectedBgColor);
    setBgTransparent(false);
    emitChange({
      nextSelectedBgColor,
      nextBgTransparent: false,
    });
  };

  const handleToggleTransparent = (checked: boolean) => {
    setBgTransparent(checked);
    emitChange({ nextBgTransparent: checked });
  };

  const handleSave = () => {
    if (saveDisabled) {
      return;
    }

    onSave(
      buildPayload(
        product,
        description,
        parsedPrice,
        showPrice,
        showLogo,
        previewBgColor,
      ),
    );
  };

  return (
    <section
      aria-label={`Gerenciamento do produto ${product.title}`}
      className={clsx("w-full rounded-xl  bg-bg-card p-4  sm:p-6", className)}
    >
      <div className="grid w-full gap-5 lg:grid-cols-[232px_minmax(0,1fr)_248px] lg:items-start">
        <div
          className="flex min-h-[168px] items-center justify-center overflow-hidden rounded-lg p-4 border border-border-card"
          style={{ backgroundColor: previewBgColor }}
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
              onChange={handleDescriptionChange}
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

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_120px]">
            <div className="w-full">
              <div className="mb-1 flex items-center gap-3">
                <span className="text-xs font-medium text-foreground sm:text-sm">
                  Preço
                </span>
                <Switcher
                  checked={showPrice}
                  containerClassName="flex items-center"
                  disabled={disabled}
                  onChange={handleToggleShowPrice}
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
                errorMessage={
                  showPrice && parsedPrice < 0
                    ? "O preço não pode ser negativo."
                    : undefined
                }
                id="product-manage-price"
                label="Preço"
                onChange={handlePriceChange}
                placeholder="R$ 99,90"
                value={priceInput}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-foreground sm:text-sm">
                    Logo
                  </span>
                  <Switcher
                    checked={showLogo}
                    containerClassName="flex items-center"
                    disabled={disabled || !logoAvailable}
                    onChange={handleToggleShowLogo}
                  />
                </div>
                {!logoAvailable && (
                  <span className="text-xs text-foreground/70">
                    Faça login com uma conta que tenha avatar para usar a logo.
                  </span>
                )}
              </div>

              <div className="mb-1 flex gap-3">
                <div className="flex">
                  <span className="text-xs font-medium text-foreground sm:text-sm">
                    Transparente
                  </span>
                  <Switcher
                    checked={bgTransparent}
                    disabled={disabled}
                    onChange={handleToggleTransparent}
                  />
                </div>
                <ColorInput
                  className="h-10 w-24 border-border-card bg-background"
                  disabled={disabled}
                  id="product-manage-bg-color"
                  label="Cor do fundo"
                  onChange={handleChangeBgColor}
                  value={previewBgColor}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center p-4 mt-2">
          <Button
            className="w-full justify-center rounded-md py-3 text-sm font-semibold sm:text-base"
            disabled={saveDisabled}
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
