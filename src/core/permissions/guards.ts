import { redirect } from "next/navigation";
import { getCurrentUser } from "@/core/auth";
import type { PermissionId } from "./permissions";
import type { RoleId } from "./roles";
import {
  canAccess,
  hasAllPermissions,
  hasAllRoles,
  hasAnyPermission,
  hasAnyRole,
  hasPermission,
  hasRole,
  type AuthorizableUser,
} from "./helpers";

export class AuthorizationError extends Error {
  constructor(message = "You do not have permission to perform this action.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export async function getAuthUser() {
  return await getCurrentUser();
}

export async function requireAuth(options?: { redirectTo?: string }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(options?.redirectTo ?? "/login");
  }
  return user;
}

export async function requireRole(
  role: RoleId | string,
  options?: { redirectTo?: string },
) {
  const user = await requireAuth(options);

  if (!hasRole(user as AuthorizableUser, role)) {
    redirect(options?.redirectTo ?? "/403");
  }

  return user;
}

export async function requireAnyRole(
  roles: readonly (RoleId | string)[],
  options?: { redirectTo?: string },
) {
  const user = await requireAuth(options);

  if (!hasAnyRole(user as AuthorizableUser, roles)) {
    redirect(options?.redirectTo ?? "/403");
  }

  return user;
}

export async function requireAllRoles(
  roles: readonly (RoleId | string)[],
  options?: { redirectTo?: string },
) {
  const user = await requireAuth(options);

  if (!hasAllRoles(user as AuthorizableUser, roles)) {
    redirect(options?.redirectTo ?? "/403");
  }

  return user;
}

export async function requirePermission(
  permission: PermissionId | string,
  options?: { redirectTo?: string },
) {
  const user = await requireAuth(options);

  if (!hasPermission(user as AuthorizableUser, permission)) {
    redirect(options?.redirectTo ?? "/403");
  }

  return user;
}

export async function requireAnyPermission(
  permissions: readonly (PermissionId | string)[],
  options?: { redirectTo?: string },
) {
  const user = await requireAuth(options);

  if (!hasAnyPermission(user as AuthorizableUser, permissions)) {
    redirect(options?.redirectTo ?? "/403");
  }

  return user;
}

export async function requireAllPermissions(
  permissions: readonly (PermissionId | string)[],
  options?: { redirectTo?: string },
) {
  const user = await requireAuth(options);

  if (!hasAllPermissions(user as AuthorizableUser, permissions)) {
    redirect(options?.redirectTo ?? "/403");
  }

  return user;
}

export async function requireAccess(options: {
  role?: RoleId | string;
  roles?: readonly (RoleId | string)[];
  permission?: PermissionId | string;
  permissions?: readonly (PermissionId | string)[];
  requireAll?: boolean;
  redirectTo?: string;
}) {
  const user = await requireAuth({ redirectTo: options.redirectTo });

  if (!canAccess(user as AuthorizableUser, options)) {
    redirect(options.redirectTo ?? "/403");
  }

  return user;
}

export async function assertRole(role: RoleId | string) {
  const user = await requireAuth();

  if (!hasRole(user as AuthorizableUser, role)) {
    throw new AuthorizationError(`Missing required role: ${role}`);
  }

  return user;
}

export async function assertPermission(permission: PermissionId | string) {
  const user = await requireAuth();

  if (!hasPermission(user as AuthorizableUser, permission)) {
    throw new AuthorizationError(`Missing required permission: ${permission}`);
  }

  return user;
}
