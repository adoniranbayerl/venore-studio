import type { LucideIcon } from "lucide-react";

export type NavigationContext = "public" | "auth" | "private" | "admin";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  icon?: LucideIcon;
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
  icon?: LucideIcon;
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
