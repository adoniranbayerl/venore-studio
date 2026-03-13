import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title?: string;
  breadcrumbs?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  breadcrumbs,
  metadata,
  actions,
  className,
}: PageHeaderProps) {
  const hasHeaderContent = breadcrumbs || title || metadata || actions;

  if (!hasHeaderContent) {
    return null;
  }

  return (
    <div className={cn("border-b bg-background", className)}>
      <div className="px-8 py-6">
        {breadcrumbs ? <div className="mb-3">{breadcrumbs}</div> : null}

        {title || metadata || actions ? (
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 space-y-2">
              {title ? (
                <h1 className="truncate text-xl font-semibold tracking-tight">
                  {title}
                </h1>
              ) : null}

              {metadata ? (
                <div className="text-sm text-muted-foreground">{metadata}</div>
              ) : null}
            </div>

            {actions ? (
              <div className="flex shrink-0 items-center gap-2">{actions}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
