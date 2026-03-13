"use client";

import type { ReactNode } from "react";
import { Menu, PanelRightOpen } from "lucide-react";

import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  brand?: ReactNode;
  userNav?: ReactNode;
  actions?: ReactNode;
  className?: string;
  isScrolled?: boolean;
  onOpenMobileSidebar?: () => void;
  onOpenMobileContext?: () => void;
  hasContextSidebar?: boolean;
};

export function SiteHeader({
  brand,
  userNav,
  actions,
  className,
  isScrolled = false,
  onOpenMobileSidebar,
  onOpenMobileContext,
  hasContextSidebar = false,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300 ease-in-out",
        isScrolled
          ? "h-14 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80"
          : "h-32 bg-background",
        className,
      )}
    >
      <div className="flex h-full items-center justify-between gap-4 px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenMobileSidebar ? (
              <button
                type="button"
                onClick={onOpenMobileSidebar}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted"
                aria-label="Abrir navegação"
              >
                <Menu className="h-4 w-4" />
              </button>
            ) : null}

            {hasContextSidebar && onOpenMobileContext ? (
              <button
                type="button"
                onClick={onOpenMobileContext}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted"
                aria-label="Abrir contexto"
              >
                <PanelRightOpen className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div
            className={cn(
              "min-w-0 transition-all duration-300 ease-in-out",
              isScrolled ? "scale-60" : "scale-100",
            )}
          >
            {brand}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {actions}
          {userNav}
        </div>
      </div>
    </header>
  );
}
