'use client';

import clsx from "clsx";
import { MagicWandIcon, UserIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

export interface UserCardProps {
  /** Nome do usuário */
  userName: string;
  /** Quantidade de créditos utilizados */
  usedCredits: number | string;
  /** Quantidade total de créditos */
  totalCredits: number | string;
  /** Saudação exibida antes do nome */
  greeting?: string;
  /** Ícone do bloco do usuário */
  userIcon?: ReactNode;
  /** Ícone do bloco de créditos */
  creditsIcon?: ReactNode;
  /** Texto exibido após os créditos */
  creditsSuffix?: string;
  /** Classes adicionais para o contêiner */
  className?: string;
  /** Classes adicionais para o texto principal */
  userTextClassName?: string;
  /** Classes adicionais para o texto de créditos */
  creditsTextClassName?: string;
}

/**
 * Cartão de resumo do usuário com saudação e consumo de créditos.
 * Responsivo e com suporte a dark mode usando os tokens do tema.
 */
export default function UserCard({
  userName,
  usedCredits,
  totalCredits,
  greeting = "Olá",
  userIcon,
  creditsIcon,
  creditsSuffix = "créditos utilizados.",
  className,
  userTextClassName,
  creditsTextClassName,
}: UserCardProps) {
  return (
    <section
      aria-label={`Resumo de ${userName}`}
      className={clsx(
        "w-full rounded-xl border border-border-card bg-bg-card p-4 shadow-sm sm:p-6",
        className
      )}
    >
      <div className="flex w-full flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className={clsx(
              "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              "bg-background text-foreground"
            )}
            aria-hidden
          >
            {userIcon ?? <UserIcon size={28} weight="fill" />}
          </span>

          <p
            className={clsx(
              "text-lg text-foreground sm:text-xl",
              userTextClassName
            )}
          >
            <span className="font-medium">{greeting}, </span>
            <strong className="font-semibold">{userName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className={clsx(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              "bg-background text-foreground"
            )}
            aria-hidden
          >
            {creditsIcon ?? <MagicWandIcon size={24} weight="fill" />}
          </span>

          <p
            className={clsx(
              "text-sm font-medium text-foreground sm:text-base lg:text-lg",
              creditsTextClassName
            )}
          >
            {usedCredits}/{totalCredits} {creditsSuffix}
          </p>
        </div>
      </div>
    </section>
  );
}

export type { UserCardProps as IUserCardProps };
