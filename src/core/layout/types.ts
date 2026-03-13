import type { ReactNode } from "react";

import type {
  BreadcrumbItem,
  NavigationContext,
  NavigationUserLike,
  NavSection,
} from "@/core/navigation";

export type LayoutContext = NavigationContext;

export type LayoutDefinition = {
  title: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  showContextSidebar?: boolean;
};

export type ResolvedShellBase = {
  definition: LayoutDefinition;
  mainNavigation: NavSection[];
  user: NavigationUserLike;
};

export type ResolvedRouteState = {
  breadcrumbs: BreadcrumbItem[];
  contextNavigation: NavSection[];
};

export type ShellProps = {
  children: ReactNode;
};
