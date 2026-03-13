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
  title?: string;
};

export function SidebarContext({
  sections,
  className,
  title,
}: SidebarContextProps) {
  const pathname = usePathname();

  if (!sections.length) {
    return null;
  }

  return (
    <div
      className={cn("flex h-full min-h-0 flex-col bg-background", className)}
    >
      <div className="border-b px-4 py-5">
        <p className="text-sm font-semibold tracking-tight">
          {title ?? "Contexto"}
        </p>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        {sections.map((section) => (
          <div key={section.key} className="space-y-3">
            {section.label ? (
              <p className="px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {section.label}
              </p>
            ) : null}

            <div className="space-y-1.5">
              {section.items.map((item) => {
                const active = isNavItemActive(item, pathname);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
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
    </div>
  );
}
