import type { ReactNode } from "react";

import { PrivateShell } from "@/core/layout";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <PrivateShell>{children}</PrivateShell>;
}
