import type { NavSection } from "./types";

export function getPrivateNav(): NavSection[] {
  return [
    {
      key: "portal-main",
      label: "Portal",
      items: [
        {
          key: "portal-dashboard",
          label: "Dashboard",
          href: "/portal/dashboard",
          icon: { name: "dashboard" },
          exact: true,
        },
        {
          key: "portal-profile",
          label: "Perfil",
          href: "/portal/profile",
          icon: { name: "user" },
        },
        {
          key: "portal-account",
          label: "Conta",
          href: "/portal/account",
          icon: { name: "settings" },
        },
        {
          key: "portal-notifications",
          label: "Notificações",
          href: "/portal/notifications",
          icon: { name: "bell" },
        },
      ],
    },
  ];
}

export function getAdminNav(): NavSection[] {
  return [
    {
      key: "admin-main",
      label: "Administração",
      items: [
        {
          key: "admin-dashboard",
          label: "Dashboard",
          href: "/admin",
          icon: { name: "home" },
          exact: true,
        },
      ],
    },
    {
      key: "admin-access",
      label: "Acesso",
      items: [
        {
          key: "admin-users",
          label: "Usuários",
          href: "/admin/users",
          icon: { name: "users" },
          permission: "users.manage",
        },
        {
          key: "admin-roles",
          label: "Papéis e permissões",
          href: "/admin/roles",
          icon: { name: "shield" },
          permission: "roles.manage",
        },
      ],
    },
    {
      key: "admin-cms",
      label: "CMS",
      items: [
        {
          key: "admin-pages",
          label: "Páginas",
          href: "/admin/pages",
          icon: { name: "file-text" },
          permission: "pages.manage",
        },
        {
          key: "admin-menus",
          label: "Menus",
          href: "/admin/menus",
          icon: { name: "menu-square" },
          permission: "menus.manage",
        },
        {
          key: "admin-media",
          label: "Mídia",
          href: "/admin/media",
          icon: { name: "image" },
          permission: "media.manage",
        },
      ],
    },
    {
      key: "admin-system",
      label: "Sistema",
      items: [
        {
          key: "admin-modules",
          label: "Módulos",
          href: "/admin/modules",
          icon: { name: "blocks" },
          permission: "modules.manage",
        },
        {
          key: "admin-settings",
          label: "Configurações",
          href: "/admin/settings",
          icon: { name: "settings" },
          permission: "settings.manage",
        },
      ],
    },
  ];
}
