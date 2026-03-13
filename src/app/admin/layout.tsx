import type { ReactNode } from "react";

import { AdminShell } from "@/core/layout/admin-shell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
