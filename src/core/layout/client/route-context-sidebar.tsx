"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { LayoutContext } from "@/core/layout/types";
import type { NavSection, NavigationUserLike } from "@/core/navigation";
import { filterNavSections, getContextNavigation } from "@/core/navigation";
import { SidebarContext } from "@/core/ui/layout";

type RouteContextSidebarProps = {
  context: LayoutContext;
  user: NavigationUserLike;
};

export function RouteContextSidebar({
  context,
  user,
}: RouteContextSidebarProps) {
  const pathname = usePathname();
  const [sections, setSections] = useState<NavSection[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const result = await getContextNavigation(context, pathname);

      if (mounted) {
        setSections(filterNavSections(result, user));
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [context, pathname, user]);

  if (!sections.length) {
    return null;
  }

  return <SidebarContext sections={sections} />;
}
