import type { ShellProps } from "./types";

import { AppShell, Footer, PageContainer, SidebarMain } from "@/core/ui/layout";

import { RouteContextSidebar } from "./client/route-context-sidebar";
import { RouteHeader } from "./client/route-header";
import { resolveShellBase } from "./service";

export async function AdminShell({ children }: ShellProps) {
  const data = await resolveShellBase("admin");

  return (
    <AppShell
      header={
        data.definition.showHeader ? (
          <RouteHeader
            title={data.definition.title}
            description={data.definition.description}
          />
        ) : null
      }
      sidebar={
        data.definition.showSidebar ? (
          <SidebarMain sections={data.mainNavigation} />
        ) : null
      }
      sidebarContext={
        data.definition.showContextSidebar ? (
          <RouteContextSidebar context="admin" user={data.user} />
        ) : null
      }
      footer={
        data.definition.showFooter ? <Footer>© Venore Admin</Footer> : null
      }
    >
      <PageContainer>{children}</PageContainer>
    </AppShell>
  );
}
