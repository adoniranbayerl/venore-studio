import { requirePermission, PERMISSIONS } from "@/core/permissions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePermission(PERMISSIONS.ADMIN_ACCESS);

  return <>{children}</>;
}
