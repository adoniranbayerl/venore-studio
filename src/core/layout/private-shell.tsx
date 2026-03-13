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
import { getPrivateMainNavigation } from "./service";

type PrivateShellProps = {
  children: ReactNode;
};

export async function PrivateShell({ children }: PrivateShellProps) {
  const [mainNavigation, session] = await Promise.all([
    getPrivateMainNavigation(),
    auth(),
  ]);

  const user = session?.user;

  return (
    <AppShell
      siteHeader={
        <SiteHeader
          brand={
            <Brand
              href="/dashboard"
              label=""
              logoSrc="/brand/venore.svg"
              logoAlt="Venore"
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
      sidebarContext={<RouteContextSidebar context="private" />}
      footer={<Footer />}
    >
      <PageContainer>{children}</PageContainer>
    </AppShell>
  );
}
