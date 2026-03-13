import {
  Bell,
  Blocks,
  FileText,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  MenuSquare,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";

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
          icon: LayoutDashboard,
          exact: true,
        },
        {
          key: "portal-profile",
          label: "Perfil",
          href: "/portal/profile",
          icon: User,
        },
        {
          key: "portal-account",
          label: "Conta",
          href: "/portal/account",
          icon: Settings,
        },
        {
          key: "portal-notifications",
          label: "Notificações",
          href: "/portal/notifications",
          icon: Bell,
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
          icon: Home,
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
          icon: Users,
          permission: "users.manage",
        },
        {
          key: "admin-roles",
          label: "Papéis e permissões",
          href: "/admin/roles",
          icon: Shield,
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
          icon: FileText,
          permission: "pages.manage",
        },
        {
          key: "admin-menus",
          label: "Menus",
          href: "/admin/menus",
          icon: MenuSquare,
          permission: "menus.manage",
        },
        {
          key: "admin-media",
          label: "Mídia",
          href: "/admin/media",
          icon: ImageIcon,
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
          icon: Blocks,
          permission: "modules.manage",
        },
        {
          key: "admin-settings",
          label: "Configurações",
          href: "/admin/settings",
          icon: Settings,
          permission: "settings.manage",
        },
      ],
    },
  ];
}
