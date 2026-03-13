import { staticNavigationSource } from "./sources/static";
import { groupEntriesAsSections, mapEntriesToUserNav } from "./helpers";
import type {
  BreadcrumbItem,
  NavigationContext,
  NavigationEntry,
  NavigationSlot,
  NavSection,
  UserNavItem,
} from "./types";

const navigationSource = staticNavigationSource;

async function getAllEntries(): Promise<NavigationEntry[]> {
  return await navigationSource.getEntries();
}

async function getEntriesByContextAndSlot(
  context: NavigationContext,
  slot: NavigationSlot,
) {
  const entries = await getAllEntries();

  return entries.filter(
    (entry) => entry.context === context && entry.slot === slot,
  );
}

export async function getMainNavigation(
  context: NavigationContext,
): Promise<NavSection[]> {
  const entries = await getEntriesByContextAndSlot(context, "main");
  return groupEntriesAsSections(entries);
}

export async function getContextNavigation(
  context: NavigationContext,
  pathname: string,
): Promise<NavSection[]> {
  const entries = await getEntriesByContextAndSlot(context, "context");

  const matched = entries.filter((entry) => {
    if (!entry.match) {
      return false;
    }

    return pathname.startsWith(entry.match);
  });

  return groupEntriesAsSections(matched);
}

export async function getUserNavigation(
  context: NavigationContext,
): Promise<UserNavItem[]> {
  const entries = await getEntriesByContextAndSlot(context, "user");
  return mapEntriesToUserNav(entries);
}

export async function getSitemapEntries(
  context?: NavigationContext,
): Promise<NavigationEntry[]> {
  const entries = await getAllEntries();

  return entries.filter((entry) => {
    if (!entry.sitemap) {
      return false;
    }

    if (!context) {
      return true;
    }

    return entry.context === context;
  });
}

export async function getBreadcrumbs(
  pathname: string,
): Promise<BreadcrumbItem[]> {
  if (navigationSource.getBreadcrumbs) {
    return await navigationSource.getBreadcrumbs(pathname);
  }

  return [];
}
