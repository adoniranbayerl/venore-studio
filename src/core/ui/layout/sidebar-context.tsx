"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavSection } from "@/core/navigation";
import { isNavItemActive } from "@/core/navigation";
import { Icon } from "@/core/ui/icon";
import { cn } from "@/lib/utils";

type SidebarContextProps = {
  sections: NavSection[];
  className?: string;
};

export function SidebarContext({ sections, className }: SidebarContextProps) {
  const pathname = usePathname();

  if (!sections.length) {
    return null;
  }

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r bg-muted/30",
        className,
      )}
    >
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
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      active && "bg-muted font-medium text-foreground",
                      !active && "text-muted-foreground",
                    )}
                  >
                    {item.icon ? (
                      <Icon
                        name={item.icon.name}
                        className="h-4 w-4 shrink-0"
                      />
                    ) : null}

                    <span className="truncate">{item.label}</span>
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
