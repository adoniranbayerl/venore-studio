import type { ShellProps } from "./types";

import { AppShell, Footer, PageContainer, SidebarMain } from "@/core/ui/layout";

import { RouteContextSidebar } from "./client/route-context-sidebar";
import { RouteHeader } from "./client/route-header";
import { resolveShellBase } from "./service";

export async function PrivateShell({ children }: ShellProps) {
  const data = await resolveShellBase("private");

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
          <RouteContextSidebar context="private" user={data.user} />
        ) : null
      }
      footer={data.definition.showFooter ? <Footer>© Venore</Footer> : null}
    >
      <PageContainer>{children}</PageContainer>
    </AppShell>
  );
}
