"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { BreadcrumbItem } from "@/core/navigation";
import { getBreadcrumbs } from "@/core/navigation";
import { getPageMeta } from "@/core/layout/service";
import { Breadcrumbs, PageHeader } from "@/core/ui/layout";

type RoutePageHeaderState = {
  title?: string;
  metadata?: string;
};

export function RoutePageHeader() {
  const pathname = usePathname();

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [pageMeta, setPageMeta] = useState<RoutePageHeaderState>({});

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [nextBreadcrumbs, nextPageMeta] = await Promise.all([
        getBreadcrumbs(pathname),
        getPageMeta(pathname),
      ]);

      if (!mounted) {
        return;
      }

      setBreadcrumbs(nextBreadcrumbs);
      setPageMeta(nextPageMeta);
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  const hasBreadcrumbs = breadcrumbs.length > 0;
  const hasTitle = Boolean(pageMeta.title);
  const hasMetadata = Boolean(pageMeta.metadata);

  if (!hasBreadcrumbs && !hasTitle && !hasMetadata) {
    return null;
  }

  return (
    <PageHeader
      title={pageMeta.title}
      metadata={pageMeta.metadata}
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
    />
  );
}
