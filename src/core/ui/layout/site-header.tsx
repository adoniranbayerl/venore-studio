"use client";

import type { ReactNode } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  brand?: ReactNode;
  userNav?: ReactNode;
  actions?: ReactNode;
  className?: string;
  isScrolled?: boolean;
  onOpenMobileSidebar?: () => void;
};

export function SiteHeader({
  brand,
  userNav,
  actions,
  className,
  isScrolled = false,
  onOpenMobileSidebar,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300 ease-in-out",
        isScrolled
          ? "h-14 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80"
          : "h-20 bg-background",
        className,
      )}
    >
      <div className="relative flex h-full items-center px-4 sm:px-6 lg:px-8">
        <div className="z-10 flex items-center gap-2">
          {onOpenMobileSidebar ? (
            <button
              type="button"
              onClick={onOpenMobileSidebar}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted lg:hidden"
              aria-label="Abrir navegação"
            >
              <Menu className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-x-0 flex justify-center">
          <div
            className={cn(
              "pointer-events-auto transition-all duration-300 ease-in-out",
              isScrolled ? "scale-90" : "scale-100",
            )}
          >
            {brand}
          </div>
        </div>

        <div className="z-10 ml-auto flex shrink-0 items-center gap-2">
          {actions}
          {userNav}
        </div>
      </div>
    </header>
  );
}
