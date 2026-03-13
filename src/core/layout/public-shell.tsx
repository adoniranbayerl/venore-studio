import type { ReactNode } from "react";
import Link from "next/link";
import { auth } from "@/core/auth";
import { Brand } from "@/core/ui/brand";
import {
  AppShell,
  Footer,
  PageContainer,
  SiteHeader,
  UserMenu,
  defaultUserMenuItems,
} from "@/core/ui/layout";

type PublicShellProps = {
  children: ReactNode;
};

export async function PublicShell({ children }: PublicShellProps) {
  const session = await auth();
  const user = session?.user;

  return (
    <AppShell
      siteHeader={
        <SiteHeader
          brand={
            <Brand
              href="/"
              label=""
              logoSrc="/brand/venore.svg"
              logoAlt="Venore"
              logoClassName="h-16 w-auto"
            />
          }
          userNav={
            user ? (
              <UserMenu
                name={user.name}
                email={user.email}
                avatarUrl={user.image}
                items={defaultUserMenuItems}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    Entrar
                  </Link>
                </div>
              </div>
            )
          }
        />
      }
      footer={<Footer />}
    >
      <PageContainer>{children}</PageContainer>
    </AppShell>
  );
}
