export type AdminContextNavItem = {
  title: string;
  href: string;
};

export function getAdminContextNav(pathname: string): AdminContextNavItem[] {
  if (pathname.startsWith("/admin/users")) {
    return [{ title: "Todos os usuários", href: "/admin/users" }];
  }

  if (pathname.startsWith("/admin/roles")) {
    return [{ title: "Todas as roles", href: "/admin/roles" }];
  }

  if (pathname.startsWith("/admin/settings")) {
    return [{ title: "Configurações gerais", href: "/admin/settings" }];
  }

  if (pathname.startsWith("/admin/media")) {
    return [{ title: "Biblioteca de mídia", href: "/admin/media" }];
  }

  if (pathname.startsWith("/admin/modules")) {
    return [{ title: "Módulos instalados", href: "/admin/modules" }];
  }

  return [{ title: "Visão geral", href: "/admin" }];
}
