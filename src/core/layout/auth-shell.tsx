import type { ShellProps } from "./types";

export function AuthShell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10 text-foreground">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
