"use client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

export interface CategoryCardProps {
  /** Nome da categoria exibida no card. */
  name: string;
  /** Link para a listagem da categoria. */
  href: string;
  /** URL da imagem apresentada no card. */
  imgUrl?: string;
  /** Ícone exibido apenas quando nenhuma imagem é enviada. */
  icon?: React.ReactNode;
  /** Classes extras aplicadas ao contêiner externo. */
  className?: string;
  /** Abre o link em uma nova aba (opcional). */
  newTab?: boolean;
}

/**
 * Card clicável para destacar categorias em vitrines ou seções de navegação.
 * Prioriza a imagem fornecida via `imgUrl` e, na ausência dela, aceita qualquer
 * ReactNode como ícone (componente SVG etc.) mantendo uma área padronizada e
 * responsiva.
 */
export default function CategoryCard({
  name,
  href,
  imgUrl,
  icon,
  className,
  newTab,
}: CategoryCardProps) {
  const media = imgUrl ? (
    <Image
      src={imgUrl}
      alt={name}
      className="h-full w-full rounded-full object-cover"
      loading="lazy"
      width={240}
      height={240}
    />
  ) : (
    icon
  );

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={clsx(
        "group flex flex-col items-center transition-all duration-200 p-4 ",
        className
      )}
      aria-label={`Ver categoria ${name}`}
    >
      <div className="flex h-16 w-16 sm:w-24 sm:h-24 items-center justify-center overflow-hidden rounded-full text-primary-600 text-3xl group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 bg-foreground/5">
        {media}
      </div>
      <span className="mt-4 text-sm font-semibold text-primary-500 sm:text-base">
        {name}
      </span>
    </a>
  );
}
