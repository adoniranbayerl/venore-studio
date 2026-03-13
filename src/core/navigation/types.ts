import type { IconReference } from "@/core/ui/icon";

export type NavigationContext = "public" | "auth" | "private" | "admin";

export type NavigationSlot = "main" | "context" | "user" | "sitemap";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  icon?: IconReference;
  permission?: string;
  exact?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  badge?: string | number;
  children?: NavItem[];
};

export type NavSection = {
  key: string;
  label?: string;
  items: NavItem[];
};

export type UserNavItem = {
  key: string;
  label: string;
  href?: string;
  icon?: IconReference;
  permission?: string;
  danger?: boolean;
};

export type BreadcrumbItem = {
  key?: string;
  label: string;
  href?: string;
};

export type NavigationUserLike = {
  roles?: string[];
  permissions?: string[];
} | null;

export type NavigationEntry = {
  key: string;
  label: string;
  href: string;
  context: NavigationContext;
  slot: NavigationSlot;
  section?: string;
  icon?: IconReference;
  permission?: string;
  exact?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  danger?: boolean;
  badge?: string | number;
  order?: number;
  match?: string;
  sitemap?: boolean;
};

export type NavigationSource = {
  getEntries(): Promise<NavigationEntry[]> | NavigationEntry[];
  getBreadcrumbs?(
    pathname: string,
  ): Promise<BreadcrumbItem[]> | BreadcrumbItem[];
};
