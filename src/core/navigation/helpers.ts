import { hasPermission } from "@/core/permissions";

import type {
  NavigationEntry,
  NavigationUserLike,
  NavItem,
  NavSection,
  UserNavItem,
} from "./types";

export function isNavItemActive(item: NavItem, pathname: string) {
  if (item.exact) {
    return pathname === item.href;
  }

  if (pathname === item.href) {
    return true;
  }

  return pathname.startsWith(`${item.href}/`);
}

export function filterNavItem(
  item: NavItem,
  user: NavigationUserLike,
): NavItem | null {
  if (item.hidden) {
    return null;
  }

  if (item.permission && !hasPermission(user, item.permission)) {
    return null;
  }

  const children = item.children
    ?.map((child) => filterNavItem(child, user))
    .filter((child): child is NavItem => child !== null);

  return {
    ...item,
    children,
  };
}

export function filterNavSections(
  sections: NavSection[],
  user: NavigationUserLike,
): NavSection[] {
  return sections
    .map((section) => ({
      ...section,
      items: section.items
        .map((item) => filterNavItem(item, user))
        .filter((item): item is NavItem => item !== null),
    }))
    .filter((section) => section.items.length > 0);
}

export function filterUserNav(
  items: UserNavItem[],
  user: NavigationUserLike,
): UserNavItem[] {
  return items.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return hasPermission(user, item.permission);
  });
}

export function flattenNavItems(sections: NavSection[]): NavItem[] {
  return sections.flatMap((section) => section.items);
}

export function sortNavigationEntries(entries: NavigationEntry[]) {
  return [...entries].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function groupEntriesAsSections(
  entries: NavigationEntry[],
): NavSection[] {
  const sectionMap = new Map<string, NavSection>();

  for (const entry of sortNavigationEntries(entries)) {
    const sectionKey = entry.section ?? "default";

    if (!sectionMap.has(sectionKey)) {
      sectionMap.set(sectionKey, {
        key: sectionKey.toLowerCase().replace(/\s+/g, "-"),
        label: entry.section,
        items: [],
      });
    }

    const section = sectionMap.get(sectionKey);

    if (!section) {
      continue;
    }

    section.items.push({
      key: entry.key,
      label: entry.label,
      href: entry.href,
      icon: entry.icon,
      permission: entry.permission,
      exact: entry.exact,
      disabled: entry.disabled,
      hidden: entry.hidden,
      badge: entry.badge,
      children: [],
    });
  }

  return Array.from(sectionMap.values());
}

export function mapEntriesToUserNav(entries: NavigationEntry[]): UserNavItem[] {
  return sortNavigationEntries(entries).map((entry) => ({
    key: entry.key,
    label: entry.label,
    href: entry.href,
    icon: entry.icon,
    permission: entry.permission,
    danger: entry.danger,
  }));
}
