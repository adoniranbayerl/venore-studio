import { hasPermission } from "@/core/permissions";

import type {
  NavItem,
  NavigationUserLike,
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
