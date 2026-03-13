import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeaderProps = {
  title?: string;
  description?: string;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function Header({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn("flex min-h-16 flex-col border-b bg-background", className)}
    >
      {breadcrumbs ? (
        <div className="border-b px-6 py-3">{breadcrumbs}</div>
      ) : null}

      <div className="flex min-h-16 items-center justify-between gap-4 px-6 py-4">
        <div className="min-w-0 space-y-1">
          {title ? (
            <h1 className="truncate text-xl font-semibold tracking-tight">
              {title}
            </h1>
          ) : null}

          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
