import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  padded?: boolean;
};

export function PageContainer({
  children,
  className,
  fluid = false,
  padded = true,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "flex-1",
        padded ? "px-6 py-6 lg:px-8 lg:py-8" : "",
        className,
      )}
    >
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
