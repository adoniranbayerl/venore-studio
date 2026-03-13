import type { ReactNode } from "react";

import { AdminShell } from "@/core/layout";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
