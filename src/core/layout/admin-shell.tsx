import type { ReactNode } from "react";

import { auth } from "@/core/auth";
import { Brand } from "@/core/ui/brand";
import {
  AppShell,
  Footer,
  PageContainer,
  SidebarMain,
  SiteHeader,
  UserMenu,
  defaultUserMenuItems,
} from "@/core/ui/layout";

import { RouteContextSidebar } from "./client/route-context-sidebar";
import { RoutePageHeader } from "./client/route-page-header";
import { getAdminMainNavigation } from "./service";

type AdminShellProps = {
  children: ReactNode;
};

export async function AdminShell({ children }: AdminShellProps) {
  const [mainNavigation, session] = await Promise.all([
    getAdminMainNavigation(),
    auth(),
  ]);

  const user = session?.user;

  return (
    <AppShell
      siteHeader={
        <SiteHeader
          brand={
            <Brand
              href="/admin"
              label=""
              logoSrc="/brand/venore.svg"
              logoAlt="Venore Admin"
              logoClassName="h-12 w-auto sm:h-14"
            />
          }
          userNav={
            <UserMenu
              name={user?.name}
              email={user?.email}
              avatarUrl={user?.image}
              items={defaultUserMenuItems}
            />
          }
        />
      }
      pageHeader={<RoutePageHeader />}
      sidebar={<SidebarMain sections={mainNavigation} />}
      sidebarContext={<RouteContextSidebar context="admin" />}
      footer={<Footer />}
    >
      <PageContainer>{children}</PageContainer>
    </AppShell>
  );
}
