"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";

export type UserMenuItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
  danger?: boolean;
  onClick?: () => void;
};

type UserMenuProps = {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  items?: UserMenuItem[];
  className?: string;
};

export function UserMenu({
  name,
  email,
  avatarUrl,
  items = [],
  className,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const fallbackInitial = name?.trim()?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-border/60 px-2 py-2 transition-all duration-200",
          "hover:bg-muted/60 hover:border-border/80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "bg-muted/60 border-border/80",
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted text-sm font-semibold shadow-sm">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={name ?? "Usuário"}
              className="h-full w-full object-cover"
            />
          ) : (
            fallbackInitial
          )}
        </span>

        <span className="hidden min-w-0 text-left lg:block">
          <span className="block truncate text-sm font-semibold leading-none text-foreground">
            {name ?? "Usuário"}
          </span>

          {email ? (
            <span className="mt-1 block truncate text-xs text-muted-foreground">
              {email}
            </span>
          ) : null}
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.625rem)] z-50 w-72 max-w-[calc(100vw-1rem)] rounded-xl border border-border/70 bg-popover p-2 shadow-lg">
          <div className="flex items-center gap-3 rounded-lg px-3 py-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted text-sm font-semibold">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={name ?? "Usuário"}
                  className="h-full w-full object-cover"
                />
              ) : (
                fallbackInitial
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {name ?? "Usuário"}
              </p>
              {email ? (
                <p className="truncate text-xs text-muted-foreground">
                  {email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="my-2 h-px bg-border/70" />

          <div className="space-y-1">
            {items.map((item) => {
              const content = (
                <>
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </>
              );

              const itemClassName = cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item.danger
                  ? "text-destructive hover:bg-destructive/10"
                  : "text-foreground hover:bg-muted",
              );

              if (item.href) {
                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={itemClassName}
                    onClick={() => setOpen(false)}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={itemClassName}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export const defaultUserMenuItems: UserMenuItem[] = [
  {
    label: "Perfil",
    href: "/profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    label: "Configurações",
    href: "/account",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    label: "Sair",
    href: "/logout",
    icon: <LogOut className="h-4 w-4" />,
    danger: true,
  },
];
