import Link from "next/link";

import { cn } from "@/lib/utils";

import type { BrandProps } from "./types";

export function Brand({
  href = "/",
  label = "Venore",
  logo,
  logoSrc,
  logoAlt,
  collapsed = false,
  className,
  logoClassName,
  labelClassName,
}: BrandProps) {
  const alt = logoAlt ?? label;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-md transition-opacity hover:opacity-90",
        collapsed && "justify-center",
        className,
      )}
      aria-label={label || alt}
    >
      {logo ? (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center",
            logoClassName,
          )}
        >
          {logo}
        </span>
      ) : null}

      {!logo && logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoSrc}
          alt={alt}
          className={cn("block h-12 w-auto shrink-0", logoClassName)}
        />
      ) : null}

      {!collapsed && label ? (
        <span
          className={cn(
            "truncate text-base font-semibold tracking-tight",
            labelClassName,
          )}
        >
          {label}
        </span>
      ) : null}
    </Link>
  );
}
