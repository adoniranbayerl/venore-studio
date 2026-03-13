"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { BreadcrumbItem } from "@/core/navigation";
import { getBreadcrumbs } from "@/core/navigation";
import { Breadcrumbs, Header } from "@/core/ui/layout";

type RouteHeaderProps = {
  title: string;
  description?: string;
};

export function RouteHeader({ title, description }: RouteHeaderProps) {
  const pathname = usePathname();
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const result = await getBreadcrumbs(pathname);

      if (mounted) {
        setItems(result);
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  return (
    <Header
      title={title}
      description={description}
      breadcrumbs={<Breadcrumbs items={items} />}
    />
  );
}
