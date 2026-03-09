"use client";

import { useAuthStore } from "@/stores/auth-store";
import { MagicWandIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  /** Callback da ação exibida no card */
  onAction?: () => void;
  /** Callback executado após sair */
  onLogout?: () => void;
  /** Desabilita a ação exibida no card */
  actionDisabled?: boolean;
  /** Texto do botão de logout */
  logoutLabel?: string;
  activePathName?: "products" | "start";
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
  onAction,
  onLogout,
  actionDisabled = false,
  logoutLabel = "Sair",
}: UserCardProps) {
  const pathName = usePathname();
  const router = useRouter();
  const normalizedPathName = pathName.split("/")[1] || "start";
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const actionClassName = clsx(
    "inline-flex items-center justify-center rounded-md px-4 py-3",
    "bg-primary-500 text-sm font-semibold text-foreground transition-colors hover:bg-primary-400",
    "disabled:cursor-not-allowed disabled:opacity-60",
  );
  const logoutButtonClassName = clsx(
    "inline-flex items-center justify-center gap-2 rounded-md border border-foreground/10 px-4 py-3",
    "bg-background text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5",
  );

  const activePathNameLabel =
    normalizedPathName === "start" ? "Meus produtos" : "Gerar produto";
  const buttonLink = normalizedPathName === "start" ? "/my-products" : "/start";

  const handleLogout = () => {
    logout();
    onLogout?.();
    router.push("/start");
  };

  return (
    <section
      aria-label={`Resumo de ${userName}`}
      className={clsx(
        "w-full rounded-xl border border-border-card bg-bg-card p-4 shadow-sm sm:p-6",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className={clsx(
              "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              "bg-background text-foreground",
            )}
            aria-hidden
          >
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={userName}
                width={32}
                height={32}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              userIcon ?? <UserIcon size={28} weight="fill" />
            )}
          </span>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <p
              className={clsx(
                "text-lg text-foreground sm:text-xl",
                userTextClassName,
              )}
            >
              <span className="font-medium">{greeting}, </span>
              <strong className="font-semibold">{userName}</strong>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {buttonLink && !actionDisabled ? (
                <Link className={actionClassName} href={buttonLink}>
                  {activePathNameLabel}
                </Link>
              ) : (
                <button
                  className={actionClassName}
                  disabled={actionDisabled}
                  onClick={onAction}
                  type="button"
                >
                  {activePathNameLabel}
                </button>
              )}
              <button
                className={logoutButtonClassName}
                onClick={handleLogout}
                type="button"
              >
                <SignOutIcon size={16} weight="bold" />
                {logoutLabel}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className={clsx(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              "bg-background text-foreground",
            )}
            aria-hidden
          >
            {creditsIcon ?? <MagicWandIcon size={24} weight="fill" />}
          </span>

          <p
            className={clsx(
              "text-sm font-medium text-foreground sm:text-base lg:text-lg",
              creditsTextClassName,
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
