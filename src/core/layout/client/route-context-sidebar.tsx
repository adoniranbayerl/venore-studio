"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { NavSection } from "@/core/navigation";
import { getContextNavigation } from "@/core/navigation";
import { SidebarContext } from "@/core/ui/layout";

type RouteContextSidebarProps = {
  context: "private" | "admin";
};

export function RouteContextSidebar({ context }: RouteContextSidebarProps) {
  const pathname = usePathname();
  const [sections, setSections] = useState<NavSection[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const result = await getContextNavigation(context, pathname);

      if (mounted) {
        setSections(result);
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [context, pathname]);

  if (!sections.length) {
    return null;
  }

  return <SidebarContext sections={sections} />;
}
