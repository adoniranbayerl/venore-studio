import type { ReactNode } from "react";
import type { PermissionId } from "./permissions";
import type { RoleId } from "./roles";
import { canAccess, type AuthorizableUser } from "./helpers";

type PermissionGateProps = {
  user?: AuthorizableUser | null;
  children: ReactNode;
  fallback?: ReactNode;
  role?: RoleId | string;
  roles?: readonly (RoleId | string)[];
  permission?: PermissionId | string;
  permissions?: readonly (PermissionId | string)[];
  requireAll?: boolean;
};

export function PermissionGate({
  user,
  children,
  fallback = null,
  role,
  roles,
  permission,
  permissions,
  requireAll = false,
}: PermissionGateProps) {
  const allowed = canAccess(user, {
    role,
    roles,
    permission,
    permissions,
    requireAll,
  });

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
