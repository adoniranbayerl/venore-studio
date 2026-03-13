import type { ShellProps } from "./types";

export function PublicShell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">{children}</main>
    </div>
  );
}
