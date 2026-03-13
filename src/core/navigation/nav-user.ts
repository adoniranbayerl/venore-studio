import { LogOut, Settings, Shield, User } from "lucide-react";

import type { UserNavItem } from "./types";

export function getPrivateUserNav(): UserNavItem[] {
  return [
    {
      key: "user-profile",
      label: "Meu perfil",
      href: "/portal/profile",
      icon: User,
    },
    {
      key: "user-account",
      label: "Minha conta",
      href: "/portal/account",
      icon: Settings,
    },
    {
      key: "user-logout",
      label: "Sair",
      href: "/auth/signout",
      icon: LogOut,
      danger: true,
    },
  ];
}

export function getAdminUserNav(): UserNavItem[] {
  return [
    {
      key: "admin-profile",
      label: "Meu perfil",
      href: "/portal/profile",
      icon: User,
    },
    {
      key: "admin-account",
      label: "Minha conta",
      href: "/portal/account",
      icon: Settings,
    },
    {
      key: "admin-security",
      label: "Segurança",
      href: "/admin/settings",
      icon: Shield,
      permission: "settings.manage",
    },
    {
      key: "admin-logout",
      label: "Sair",
      href: "/auth/signout",
      icon: LogOut,
      danger: true,
    },
  ];
}
