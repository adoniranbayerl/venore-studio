import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("flex-1 px-6 py-6", className)}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {children}
      </div>
    </main>
  );
}
