import type { ReactNode } from "react";

import { AuthShell } from "@/core/layout";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
