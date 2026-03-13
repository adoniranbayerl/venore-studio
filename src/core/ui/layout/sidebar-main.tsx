"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavSection } from "@/core/navigation";
import { isNavItemActive } from "@/core/navigation";
import { Icon } from "@/core/ui/icon";
import { cn } from "@/lib/utils";

type SidebarMainProps = {
  sections: NavSection[];
  className?: string;
};

export function SidebarMain({ sections, className }: SidebarMainProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r bg-background",
        className,
      )}
    >
      <div className="border-b px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Venore
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.key} className="space-y-2">
            {section.label ? (
              <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {section.label}
              </p>
            ) : null}

            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isNavItemActive(item, pathname);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-disabled={item.disabled}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active && "bg-muted font-medium text-foreground",
                      !active && "text-muted-foreground",
                      item.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    {item.icon ? (
                      <Icon
                        name={item.icon.name}
                        className="h-4 w-4 shrink-0"
                      />
                    ) : null}

                    <span className="truncate">{item.label}</span>

                    {item.badge ? (
                      <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
