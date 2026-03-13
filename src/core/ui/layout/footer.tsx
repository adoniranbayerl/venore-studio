import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FooterProps = {
  children?: ReactNode;
  className?: string;
};

export function Footer({ children, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t bg-background px-6 py-4 text-sm text-muted-foreground",
        className,
      )}
    >
      {children ?? <p>© Venore</p>}
    </footer>
  );
}
