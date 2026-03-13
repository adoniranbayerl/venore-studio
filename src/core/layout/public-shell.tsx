import type { ReactNode } from "react";

import { AppShell, SiteHeader, Footer } from "@/core/ui/layout";

type PublicShellProps = {
  children: ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <AppShell siteHeader={<SiteHeader brand="Venore" />} footer={<Footer />}>
      {children}
    </AppShell>
  );
}
