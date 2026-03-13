import { getMainNavigation } from "@/core/navigation";
import type { NavSection } from "@/core/navigation";

import { staticPageMetaResolvers } from "./sources/static";
import type { LayoutPageMeta } from "./types";

export async function getPrivateMainNavigation(): Promise<NavSection[]> {
  return getMainNavigation("private");
}

export async function getAdminMainNavigation(): Promise<NavSection[]> {
  return getMainNavigation("admin");
}

export async function getPageMeta(pathname: string): Promise<LayoutPageMeta> {
  const match = staticPageMetaResolvers.find((resolver) =>
    resolver.pattern.test(pathname),
  );

  return match?.meta ?? {};
}
