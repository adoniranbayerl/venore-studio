import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AppShellProps = {
  header?: ReactNode;
  sidebar?: ReactNode;
  sidebarContext?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function AppShell({
  header,
  sidebar,
  sidebarContext,
  footer,
  children,
  className,
  contentClassName,
}: AppShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen bg-background text-foreground",
        className,
      )}
    >
      {sidebar ? (
        <div className="hidden shrink-0 lg:flex">{sidebar}</div>
      ) : null}

      {sidebarContext ? (
        <div className="hidden shrink-0 xl:flex">{sidebarContext}</div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {header}

        <div className={cn("flex min-h-0 flex-1 flex-col", contentClassName)}>
          {children}
        </div>

        {footer}
      </div>
    </div>
  );
}
