'use client';

import Image from "next/image";
import useTheme from "@/hooks/useTheme";
import {
    BellIcon,
    HeadphonesIcon,
    MoonIcon,
    SignOutIcon,
    SunIcon,
    UserIcon
} from "@phosphor-icons/react";
import clsx from "clsx";
import React from "react";
import SearchInput, { type SearchInputProps } from "./components/SearchInput";

type Size = "sm" | "md" | "lg";

export interface HeaderRootProps extends React.HTMLAttributes<HTMLElement> {
    size?: Size;
    bordered?: boolean;
    sticky?: boolean;
}
const Root: React.FC<HeaderRootProps> = ({
    size = "md",
    bordered = true,
    sticky = true,
    className,
    children,
    ...rest
}) => {

    return (
        <header
            {...rest}
            className={clsx(
                "w-full bg-background text-card-foreground",
                bordered && "border-b border-foreground/20",
                sticky && "sticky top-0 z-40",
                className
            )}
        >
            <div
                className={clsx(
                    "mx-auto flex w-full items-center justify-between gap-4 px-3",
                    size === "sm" && "h-16",
                    size === "md" && "h-18",
                    size === "lg" && "h-20"
                )}
            >
                {children}
            </div>
        </header>
    );
};

/** Left/Center/Right layout rails keep composition flexible */
export interface LeftContainerProps {
    className?: string;
    children?: React.ReactNode;
}

const LeftContainer: React.FC<LeftContainerProps> = ({
    className,
    children,
    ...rest
}) => (
    <div
        {...rest}
        className={clsx("flex w-[45vw] sm:w-1/3 max-w-lg items-center gap-3", className)}
    >
        {children}
    </div>
);

export interface CenterContainerProps {
    className?: string;
    children?: React.ReactNode;
}

export interface RightContainerProps {
    className?: string;
    children?: React.ReactNode;
}

const RightContainer: React.FC<RightContainerProps> = ({
    className,
    children,
    ...rest
}) => (
    <div
        {...rest}
        className={clsx(
            "flex w-fit justify-end items-center gap-1",
            className
        )}
    >
        {children}
    </div>
);

export interface LogoProps {
    src: string;
    alt: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, className }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={120}
            height={36}
            className={clsx("block", "h-9 w-auto", className)}
        />
    );
};

export interface SearchProps extends SearchInputProps {
    className?: string;
}

const Search: React.FC<SearchProps> = ({ className, ...rest }) => {
    return <SearchInput className={className} {...rest} />;
};

/** Generic icon button used by action items */
const IconButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        badge?: number;
        "aria-label": string;
    }
> = ({ badge, className, children, ...rest }) => {
    return (
        <button
            {...rest}
            className={clsx(
                "relative inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent",
                "hover:text-foreground/50 text-foreground/80 ",
                "h-9 w-9",
                className
            )}
        >
            {children}
            {typeof badge === "number" && badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 rounded-full bg-info-500 px-1.5 text-[10px] font-semibold text-white">
                    {badge > 99 ? "99+" : badge}
                </span>
            )}
        </button>
    );
};


export interface NotificationsProps {
    count?: number;
    onSeeNotifications?: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({
    count = 0,
    onSeeNotifications,
}) => {
    return (
        <IconButton
            aria-label="Notificações"
            badge={count}
            onClick={onSeeNotifications}
        >
            <BellIcon className="h-5 w-5" />
        </IconButton>
    );
};

/** Help / Support */

export interface HelpButtonProps {
    onHelp?: () => void;
}

const Help: React.FC<HelpButtonProps> = ({ onHelp }) => (
    <IconButton aria-label="Ajuda e suporte" onClick={onHelp}>
        <HeadphonesIcon className="h-5 w-5" />
    </IconButton>
);

/** Theme Switcher*/

export interface ThemeSwitcherProps {
    onToggleTheme?: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onToggleTheme }) => {
    const { theme, setTheme } = useTheme();
    return (
        <IconButton
            aria-label="Alterar tema"
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
                onToggleTheme?.();
            }}
        >
            {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
            ) : (
                <SunIcon className="h-5 w-5" />
            )}
        </IconButton>
    );
};

/** UserIcon menu (compound) */
const UserMenu: React.FC<{
    name?: string;
    email?: string;
    avatarUrl?: string;
    onSignOut?: () => void;
}> = ({ name, email, avatarUrl, onSignOut }) => {

    return (
        <div
            aria-label="Menu do usuário"
            className="w-fit flex items-center gap-2 rounded-full bg-foreground/5 px-2.5 py-1.5 focus:outline-none ml-2 border border-foreground/10"
        >
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full"
                />
            ) : (
                <UserIcon className="h-7 w-7 text-muted-foreground" />
            )}
            <span className="w-full hidden sm:flex flex-col leading-tight text-left ">
                <b className="text-xs">{name}</b>
                {email && (
                    <span className="text-[11px] text-muted-foreground text-foreground/70">
                        {email}
                    </span>
                )}
            </span>
            <button
                className="flex items-center justify-end gap-1 text-xs text-foreground/80 ml-1"
                onClick={onSignOut}
            >
                <SignOutIcon className="h-4 w-4" /> Sair
            </button>
        </div>
    );
};

const SystemHeader = {
    Root,
    LeftContainer,
    RightContainer,
    Logo,
    Search,
    Notifications,
    Help,
    UserMenu,
    ThemeSwitcher,
};

export default SystemHeader;
