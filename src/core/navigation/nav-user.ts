import type { UserNavItem } from "./types";

export function getPrivateUserNav(): UserNavItem[] {
  return [
    {
      key: "user-profile",
      label: "Meu perfil",
      href: "/portal/profile",
      icon: { name: "user" },
    },
    {
      key: "user-account",
      label: "Minha conta",
      href: "/portal/account",
      icon: { name: "settings" },
    },
    {
      key: "user-logout",
      label: "Sair",
      href: "/auth/signout",
      icon: { name: "log-out" },
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
      icon: { name: "user" },
    },
    {
      key: "admin-account",
      label: "Minha conta",
      href: "/portal/account",
      icon: { name: "settings" },
    },
    {
      key: "admin-security",
      label: "Segurança",
      href: "/admin/settings",
      icon: { name: "shield" },
      permission: "settings.manage",
    },
    {
      key: "admin-logout",
      label: "Sair",
      href: "/auth/signout",
      icon: { name: "log-out" },
      danger: true,
    },
  ];
}
