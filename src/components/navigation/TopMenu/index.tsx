'use client';

import clsx from "clsx";
import React from "react";

interface SubItem {
  label: string;
  href: string;
}
interface MenuItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: SubItem[];
}

export interface TopMenuProps extends React.HTMLAttributes<HTMLElement> {
  /** Array de elementos do menu */
  menuItems: MenuItem[];
  /** Classes para o <nav> */
  className?: string;
  /** Classes para cada item de primeiro nível */
  itemClassName?: string;
  /** Classes para cada subitem do submenu */
  subItemClassName?: string;
}

interface SubMenuProps {
  subItems: SubItem[];
  subItemClassName?: string;
}

/* ---------- submenu (abre apenas no item hovered/focado) ---------- */
const SubMenu = ({ subItems, subItemClassName }: SubMenuProps) => {
  if (!subItems?.length) return null;

  return (
    <ul
      role="menu"
      className={clsx(
        // Posicionamento: colado no item pai (sem gap que causava “buraco”)
        "absolute left-0 top-full min-w-[220px] z-50",
        // Visual padrão (dark-mode via tokens)
        "rounded-md border border-border-card bg-bg-card text-foreground shadow-lg p-2",
        // Oculto por padrão
        "opacity-0 translate-y-1 pointer-events-none",
        "transition duration-150 ease-out",
        // Abre somente quando o *mesmo* <li> (.group) está hover/focus
        "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
        "group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
        // Ponte de hover: área invisível que cobre o “gap” entre o item e o submenu
        "before:content-[''] before:absolute before:left-0 before:right-0 before:-top-2 before:h-2"
      )}
    >
      {subItems.map((item) => (
        <li key={item.label} role="none">
          <a
            role="menuitem"
            href={item.href}
            className={clsx(
              "block rounded-md px-3 py-2 text-sm",
              "hover:bg-foreground/5 focus:bg-foreground/5 focus:outline-none",
              subItemClassName
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

/* ---------- component ---------- */
export const TopMenu: React.FC<TopMenuProps> = ({
  menuItems,
  className,
  itemClassName,
  subItemClassName,
}) => {
  return (
    <div className="hidden md:flex w-full justify-center">
      <nav
        aria-label="Menu principal"
        className={clsx(
          "w-full max-w-7xl bg-background text-foreground px-3 py-2 cursor-pointer",
          className
        )}
      >
        <ul
          className={clsx(
            "relative flex w-full flex-row list-none gap-6",
          )}
        >
          {menuItems.map((item) => {
            const hasSubmenu = !!item.subItems?.length;
            return (
              <li
                key={item.label}
                className={clsx(
                  "relative group",
                  "text-sm sm:text-base",
                  itemClassName
                )}
              >
                <a
                  href={item.href}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-md px-2 py-1",
                    "hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/40"
                  )}
                  aria-haspopup={hasSubmenu ? "true" : undefined}
                  aria-expanded={hasSubmenu ? "false" : undefined}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </a>

                {hasSubmenu && (
                  <SubMenu
                    subItems={item.subItems!}
                    subItemClassName={subItemClassName}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
