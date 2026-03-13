"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import type { NavSection } from "@/core/navigation";
import { isNavItemActive } from "@/core/navigation";
import { Icon } from "@/core/ui/icon";
import { cn } from "@/lib/utils";

type SidebarMainProps = {
  sections: NavSection[];
  className?: string;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
};

export function SidebarMain({
  sections,
  className,
  collapsed = false,
  onToggleCollapsed,
}: SidebarMainProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-x-hidden bg-background",
        className,
      )}
    >
      <nav className="flex-1 space-y-5 overflow-y-auto overflow-x-hidden px-3 py-5">
        {sections.map((section) => (
          <div key={section.key} className="space-y-2">
            {section.label ? (
              <div className="h-4 px-2">
                <p
                  className={cn(
                    "text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-opacity duration-300",
                    collapsed ? "opacity-0" : "opacity-100",
                  )}
                >
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
                    aria-disabled={item.disabled}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group flex items-center rounded-md text-sm transition-all duration-300 ease-in-out",
                      collapsed ? "px-2 py-2" : "px-3 py-2",
                      "hover:bg-muted hover:text-foreground",
                      active && "bg-muted font-medium text-foreground",
                      !active && "text-muted-foreground",
                      item.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                      {item.icon ? (
                        <Icon
                          name={item.icon.name}
                          className={cn(
                            "shrink-0 transition-transform duration-200 ease-in-out",
                            collapsed
                              ? "h-4.5 w-4.5 scale-110 group-hover:scale-125"
                              : "h-4 w-4 scale-100 group-hover:scale-110",
                          )}
                        />
                      ) : null}
                    </span>

                    <span
                      className={cn(
                        "overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
                        collapsed
                          ? "ml-0 max-w-0 opacity-0"
                          : "ml-2 max-w-35 opacity-100",
                      )}
                    >
                      {item.label}
                    </span>

                    {!collapsed && item.badge ? (
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

      <div className="border-t p-3">
        <button
          type="button"
          onClick={onToggleCollapsed}
          className={cn(
            "group flex w-full items-center rounded-md border bg-background text-sm text-muted-foreground transition-all duration-300 ease-in-out hover:bg-muted hover:text-foreground",
            collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
          )}
          aria-label={
            collapsed ? "Expandir menu lateral" : "Recolher menu lateral"
          }
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center">
            {collapsed ? (
              <PanelLeftOpen
                className={cn(
                  "transition-transform duration-200 ease-in-out",
                  collapsed
                    ? "h-4.5 w-4.5 scale-110 group-hover:scale-125"
                    : "h-4 w-4 scale-100 group-hover:scale-110",
                )}
              />
            ) : (
              <PanelLeftClose
                className={cn(
                  "transition-transform duration-200 ease-in-out",
                  collapsed
                    ? "h-4.5 w-4.5 scale-110 group-hover:scale-125"
                    : "h-4 w-4 scale-100 group-hover:scale-110",
                )}
              />
            )}
          </span>

          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
              collapsed
                ? "ml-0 max-w-0 opacity-0"
                : "ml-2 max-w-35 opacity-100",
            )}
          >
            {collapsed ? "Expandir menu" : "Recolher menu"}
          </span>
        </button>
      </div>
    </div>
  );
}
