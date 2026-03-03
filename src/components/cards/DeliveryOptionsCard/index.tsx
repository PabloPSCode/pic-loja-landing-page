"use client";
import { formatBRL } from "@/utils/format";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

export interface Address {
  id: string;
  label: string;
  address: string;
  residenceNumber: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface Option {
  id: string;
  label: string;
  deliveryEstimate: string;
  price: number;
}

interface DeliveryOptionsCardProps {
  options: Option[];
  address: Address;
  selectedOption?: Option | null;
  onSelectOption?: (optionId: string) => void;
  onlyView?: boolean;
  onBack?: () => void;
  className?: string;
}

export default function DeliveryOptionsCard({
  options,
  address,
  className,
  selectedOption,
  onlyView = false,
  onSelectOption,
  onBack,
}: DeliveryOptionsCardProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<
    string | undefined
  >(selectedOption?.id ?? options[0]?.id);
  const isControlled = Boolean(selectedOption && onSelectOption);
  const activeSelectedId = isControlled
    ? selectedOption?.id
    : internalSelectedId;

  useEffect(() => {
    if (selectedOption) {
      setInternalSelectedId(selectedOption.id);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (!options.length) return;
    if (!activeSelectedId) {
      setInternalSelectedId(options[0].id);
    }
  }, [options, activeSelectedId]);
  const selectedOptionLabel = useMemo(() => {
    if (!activeSelectedId) return undefined;
    return options.find((opt) => opt.id === activeSelectedId)?.label;
  }, [activeSelectedId, options]);
  const handleSelectOption = (optionId: string) => {
    if (!isControlled) {
      setInternalSelectedId(optionId);
    }
    onSelectOption?.(optionId);
  };

  return (
    <div
      className={clsx(
        "w-full rounded-md border border-border-card bg-bg-card p-5 sm:p-6 shadow-sm text-foreground",
        "flex flex-col gap-5",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-base sm:text-lg font-semibold">
            {onlyView ? "Dados da entrega" : "Selecione o tipo de entrega"}
          </span>
          {selectedOptionLabel && (
            <p className="text-xs sm:text-sm text-foreground/70 mt-4">
              Tipo de entrega selecionado:{" "}
              <span className="font-semibold text-foreground">
                {selectedOptionLabel}
              </span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs sm:text-sm text-foreground/70">
            Entregar no endereço:{" "}
            <span className="font-semibold text-foreground">
              {`${address.address}, ${address.residenceNumber}${
                address.complement ? `, ${address.complement}` : ""
              }, ${address.neighborhood}, ${address.city} - ${address.state}, ${
                address.zipCode
              }`}
              {!onlyView && onBack && (
                <button
                  onClick={onBack}
                  className="text-xs sm:text-sm text-info-500 underline"
                >
                  Alterar
                </button>
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {onlyView && selectedOption ? (
          <div
            className={clsx(
              "rounded-lg border p-4 cursor-pointer",
              "bg-background",
              "border-foreground/50"
            )}
          >
            <label className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-full flex gap-2 items-center text-sm sm:text-base">
                  <span className="font-semibold text-foreground">
                    {selectedOption.label}
                  </span>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-foreground">
                      {selectedOption.deliveryEstimate}
                    </span>
                    <span className="text-xs sm:text-sm text-foreground">
                      {formatBRL(selectedOption.price)}{" "}
                      {selectedOption.price === 0 ? "(Grátis)" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        ) : (
          options.map((option) => {
            const isSelected = activeSelectedId === option.id;
            return (
              <div
                key={option.id}
                className={clsx(
                  "rounded-lg border p-4 cursor-pointer",
                  "bg-background",
                  isSelected ? "border-primary-500 " : "border-border-card "
                )}
              >
                <label className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="flex items-start gap-3 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="selected-delivery-option"
                      className="mt-1 size-4 accent-primary-500 cursor-pointer"
                      checked={isSelected}
                      onChange={() => handleSelectOption(option.id)}
                      aria-label={`Selecionar ${option.label}`}
                    />
                    <div className="w-full flex flex-col gap-1 text-sm sm:text-base">
                      <span className="font-semibold text-foreground">
                        {option.label}
                      </span>
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-foreground">
                          {option.deliveryEstimate}
                        </span>
                        <span className="text-xs sm:text-sm text-foreground">
                          {formatBRL(option.price)}{" "}
                          {option.price === 0 ? "(Grátis)" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
