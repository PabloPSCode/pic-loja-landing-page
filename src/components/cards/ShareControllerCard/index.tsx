'use client';

import clsx from "clsx";
import { DownloadSimpleIcon, ShareNetworkIcon } from "@phosphor-icons/react";

export interface ShareControllerCardProps {
  /** Título exibido no topo do card */
  title: string;
  /** Callback da ação de salvar */
  onSave: () => void;
  /** Callback da ação de compartilhar */
  onShare: () => void;
  /** Texto do botão de salvar */
  saveLabel?: string;
  /** Texto do botão de compartilhar */
  shareLabel?: string;
  /** Desabilita o botão de salvar */
  saveDisabled?: boolean;
  /** Desabilita o botão de compartilhar */
  shareDisabled?: boolean;
  /** Classes adicionais do contêiner */
  className?: string;
}

/**
 * Card de controle para salvar ou compartilhar o resultado do produto.
 * Responsivo e com suporte a dark mode usando os tokens do tema.
 */
export default function ShareControllerCard({
  title,
  onSave,
  onShare,
  saveLabel = "Salvar imagem",
  shareLabel = "Compartilhar imagem",
  saveDisabled = false,
  shareDisabled = false,
  className,
}: ShareControllerCardProps) {
  return (
    <section
      aria-label={title}
      className={clsx(
        "w-full rounded-xl border border-border-card bg-bg-card p-4 shadow-sm sm:p-6",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-5">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          {title}
        </h2>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            className={clsx(
              "inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3",
              "bg-primary-500 text-sm font-semibold text-foreground transition-colors hover:bg-primary-400",
              "disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[176px]",
            )}
            disabled={saveDisabled}
            onClick={onSave}
            type="button"
          >
            <DownloadSimpleIcon size={18} weight="bold" />
            {saveLabel}
          </button>

          <button
            className={clsx(
              "inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3",
              "bg-primary-500 text-sm font-semibold text-foreground transition-colors hover:bg-primary-400",
              "disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[176px]",
            )}
            disabled={shareDisabled}
            onClick={onShare}
            type="button"
          >
            <ShareNetworkIcon size={18} weight="bold" />
            {shareLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

export type { ShareControllerCardProps as IShareControllerCardProps };
