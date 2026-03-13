import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {children}
    </div>
  );
}
