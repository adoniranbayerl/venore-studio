import type { ReactNode } from "react";

import { PublicShell } from "@/core/layout";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
