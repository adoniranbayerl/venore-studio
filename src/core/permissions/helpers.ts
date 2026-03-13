import type { PermissionId } from "./permissions";
import type { RoleId } from "./roles";

export type AuthRole = {
  id: string;
  name?: string | null;
};

export type AuthPermission = {
  id: string;
  name?: string | null;
  module?: string | null;
};

export type AuthorizableUser = {
  id?: string;
  roles?: AuthRole[] | string[] | null;
  permissions?: AuthPermission[] | string[] | null;
};

function normalizeRoles(input?: AuthRole[] | string[] | null): string[] {
  if (!input || input.length === 0) return [];

  return input.map((item) => (typeof item === "string" ? item : item.id));
}

function normalizePermissions(
  input?: AuthPermission[] | string[] | null,
): string[] {
  if (!input || input.length === 0) return [];

  return input.map((item) => (typeof item === "string" ? item : item.id));
}

export function getUserRoleIds(user?: AuthorizableUser | null): string[] {
  if (!user) return [];
  return normalizeRoles(user.roles);
}

export function getUserPermissionIds(user?: AuthorizableUser | null): string[] {
  if (!user) return [];
  return normalizePermissions(user.permissions);
}

export function hasRole(
  user: AuthorizableUser | null | undefined,
  role: RoleId | string,
): boolean {
  if (!user) return false;
  return getUserRoleIds(user).includes(role);
}

export function hasAnyRole(
  user: AuthorizableUser | null | undefined,
  roles: readonly (RoleId | string)[],
): boolean {
  if (!user || roles.length === 0) return false;

  const currentRoles = new Set(getUserRoleIds(user));
  return roles.some((role) => currentRoles.has(role));
}

export function hasAllRoles(
  user: AuthorizableUser | null | undefined,
  roles: readonly (RoleId | string)[],
): boolean {
  if (!user || roles.length === 0) return false;

  const currentRoles = new Set(getUserRoleIds(user));
  return roles.every((role) => currentRoles.has(role));
}

export function hasPermission(
  user: AuthorizableUser | null | undefined,
  permission: PermissionId | string,
): boolean {
  if (!user) return false;
  return getUserPermissionIds(user).includes(permission);
}

export function hasAnyPermission(
  user: AuthorizableUser | null | undefined,
  permissions: readonly (PermissionId | string)[],
): boolean {
  if (!user || permissions.length === 0) return false;

  const currentPermissions = new Set(getUserPermissionIds(user));
  return permissions.some((permission) => currentPermissions.has(permission));
}

export function hasAllPermissions(
  user: AuthorizableUser | null | undefined,
  permissions: readonly (PermissionId | string)[],
): boolean {
  if (!user || permissions.length === 0) return false;

  const currentPermissions = new Set(getUserPermissionIds(user));
  return permissions.every((permission) => currentPermissions.has(permission));
}

export function canAccess(
  user: AuthorizableUser | null | undefined,
  options: {
    role?: RoleId | string;
    roles?: readonly (RoleId | string)[];
    permission?: PermissionId | string;
    permissions?: readonly (PermissionId | string)[];
    requireAll?: boolean;
  },
): boolean {
  if (!user) return false;

  const checks: boolean[] = [];

  if (options.role) {
    checks.push(hasRole(user, options.role));
  }

  if (options.roles?.length) {
    checks.push(
      options.requireAll
        ? hasAllRoles(user, options.roles)
        : hasAnyRole(user, options.roles),
    );
  }

  if (options.permission) {
    checks.push(hasPermission(user, options.permission));
  }

  if (options.permissions?.length) {
    checks.push(
      options.requireAll
        ? hasAllPermissions(user, options.permissions)
        : hasAnyPermission(user, options.permissions),
    );
  }

  if (checks.length === 0) return false;
  return options.requireAll ? checks.every(Boolean) : checks.some(Boolean);
}
