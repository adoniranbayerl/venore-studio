import type { BreadcrumbItem } from "./types";

type BreadcrumbResolver = {
  pattern: RegExp;
  items: BreadcrumbItem[];
};

const breadcrumbResolvers: BreadcrumbResolver[] = [
  {
    pattern: /^\/admin$/,
    items: [{ key: "admin", label: "Admin", href: "/admin" }],
  },
  {
    pattern: /^\/admin\/users$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      { key: "admin-users", label: "Usuários", href: "/admin/users" },
    ],
  },
  {
    pattern: /^\/admin\/users\/create$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      { key: "admin-users", label: "Usuários", href: "/admin/users" },
      { key: "admin-users-create", label: "Criar usuário" },
    ],
  },
  {
    pattern: /^\/admin\/roles$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      {
        key: "admin-roles",
        label: "Papéis e permissões",
        href: "/admin/roles",
      },
    ],
  },
  {
    pattern: /^\/admin\/pages$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      { key: "admin-pages", label: "Páginas", href: "/admin/pages" },
    ],
  },
  {
    pattern: /^\/admin\/pages\/create$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      { key: "admin-pages", label: "Páginas", href: "/admin/pages" },
      { key: "admin-pages-create", label: "Nova página" },
    ],
  },
  {
    pattern: /^\/admin\/menus$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      { key: "admin-menus", label: "Menus", href: "/admin/menus" },
    ],
  },
  {
    pattern: /^\/admin\/media$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      { key: "admin-media", label: "Mídia", href: "/admin/media" },
    ],
  },
  {
    pattern: /^\/admin\/modules$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      { key: "admin-modules", label: "Módulos", href: "/admin/modules" },
    ],
  },
  {
    pattern: /^\/admin\/settings$/,
    items: [
      { key: "admin", label: "Admin", href: "/admin" },
      {
        key: "admin-settings",
        label: "Configurações",
        href: "/admin/settings",
      },
    ],
  },
  {
    pattern: /^\/portal\/dashboard$/,
    items: [
      {
        key: "portal-dashboard",
        label: "Dashboard",
        href: "/portal/dashboard",
      },
    ],
  },
  {
    pattern: /^\/portal\/profile$/,
    items: [
      { key: "portal-profile", label: "Perfil", href: "/portal/profile" },
    ],
  },
  {
    pattern: /^\/portal\/account$/,
    items: [{ key: "portal-account", label: "Conta", href: "/portal/account" }],
  },
  {
    pattern: /^\/portal\/notifications$/,
    items: [
      {
        key: "portal-notifications",
        label: "Notificações",
        href: "/portal/notifications",
      },
    ],
  },
];

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const match = breadcrumbResolvers.find((resolver) =>
    resolver.pattern.test(pathname),
  );

  if (match) {
    return match.items;
  }

  return [];
}
