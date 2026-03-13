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
      className={cn(
        "flex h-full min-h-0 flex-col overflow-x-hidden bg-background",
        className,
      )}
    >
      <div className="px-4 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {title ?? "Contexto"}
        </p>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-3 pb-5">
        {sections.map((section) => (
          <div key={section.key} className="space-y-2">
            {section.label ? (
              <div className="px-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/80">
                  {section.label}
                </p>
              </div>
            ) : null}

            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isNavItemActive(item, pathname);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 ease-in-out",
                      active
                        ? "bg-muted/80 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                      {item.icon ? (
                        <Icon
                          name={item.icon.name}
                          className="h-4 w-4 shrink-0 transition-transform duration-200 ease-in-out group-hover:scale-105"
                        />
                      ) : null}
                    </span>

                    <span className="ml-2 truncate">{item.label}</span>
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
