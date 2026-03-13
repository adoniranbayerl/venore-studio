import Link from "next/link";

import type { BreadcrumbItem } from "@/core/navigation";
import { cn } from "@/lib/utils";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items.length || items.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center text-sm text-muted-foreground",
        className,
      )}
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.key ?? index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}

              {!isLast ? (
                <span className="text-muted-foreground/60">/</span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
