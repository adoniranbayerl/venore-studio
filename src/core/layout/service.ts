import { auth } from "@/core/auth";
import {
  filterNavSections,
  getBreadcrumbs,
  getContextNavigation,
  getMainNavigation,
} from "@/core/navigation";

import { getStaticLayoutDefinition } from "./sources/static";
import type {
  LayoutContext,
  ResolvedRouteState,
  ResolvedShellBase,
} from "./types";

export async function resolveShellBase(
  context: LayoutContext,
): Promise<ResolvedShellBase> {
  const session = await auth();
  const user = session?.user ?? null;

  const definition = getStaticLayoutDefinition(context);
  const mainNavigation = filterNavSections(
    await getMainNavigation(context),
    user,
  );

  return {
    definition,
    mainNavigation,
    user,
  };
}

export async function resolveRouteState(
  context: LayoutContext,
  pathname: string,
): Promise<ResolvedRouteState> {
  const session = await auth();
  const user = session?.user ?? null;

  const [breadcrumbs, contextNavigation] = await Promise.all([
    getBreadcrumbs(pathname),
    getContextNavigation(context, pathname),
  ]);

  return {
    breadcrumbs,
    contextNavigation: filterNavSections(contextNavigation, user),
  };
}
