import {
  FilePlus2,
  List,
  Settings,
  Shield,
  UserPlus,
  Users,
} from "lucide-react";

import type { NavSection } from "./types";

export function getContextNav(pathname: string): NavSection[] {
  if (pathname.startsWith("/admin/users")) {
    return [
      {
        key: "admin-users-context",
        label: "Usuários",
        items: [
          {
            key: "admin-users-list",
            label: "Todos os usuários",
            href: "/admin/users",
            icon: Users,
            permission: "users.manage",
          },
          {
            key: "admin-users-create",
            label: "Novo usuário",
            href: "/admin/users/create",
            icon: UserPlus,
            permission: "users.manage",
          },
        ],
      },
    ];
  }

  if (pathname.startsWith("/admin/roles")) {
    return [
      {
        key: "admin-roles-context",
        label: "Permissões",
        items: [
          {
            key: "admin-roles-list",
            label: "Papéis",
            href: "/admin/roles",
            icon: Shield,
            permission: "roles.manage",
          },
        ],
      },
    ];
  }

  if (pathname.startsWith("/admin/pages")) {
    return [
      {
        key: "admin-pages-context",
        label: "Páginas",
        items: [
          {
            key: "admin-pages-list",
            label: "Todas as páginas",
            href: "/admin/pages",
            icon: List,
            permission: "pages.manage",
          },
          {
            key: "admin-pages-create",
            label: "Nova página",
            href: "/admin/pages/create",
            icon: FilePlus2,
            permission: "pages.manage",
          },
        ],
      },
    ];
  }

  if (pathname.startsWith("/portal/account")) {
    return [
      {
        key: "portal-account-context",
        label: "Conta",
        items: [
          {
            key: "portal-account-overview",
            label: "Visão geral",
            href: "/portal/account",
            icon: Settings,
          },
        ],
      },
    ];
  }

  return [];
}
