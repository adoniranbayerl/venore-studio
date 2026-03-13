import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
};

export function PageContainer({
  children,
  className,
  fluid = false,
}: PageContainerProps) {
  return (
    <main className={cn("flex-1 px-8 py-6", className)}>
      <div
        className={cn(
          "flex w-full flex-col gap-6",
          fluid ? "max-w-none" : "mx-auto max-w-7xl",
        )}
      >
        {children}
      </div>
    </main>
  );
}
