export const PERMISSIONS = {
  ADMIN_ACCESS: "admin.access",

  USERS_READ: "users.read",
  USERS_MANAGE: "users.manage",

  ROLES_READ: "roles.read",
  ROLES_MANAGE: "roles.manage",

  PERMISSIONS_READ: "permissions.read",
  PERMISSIONS_MANAGE: "permissions.manage",
} as const;

export type PermissionId = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const PERMISSION_LABELS: Record<PermissionId, string> = {
  "admin.access": "Access Admin Panel",

  "users.read": "Read Users",
  "users.manage": "Manage Users",

  "roles.read": "Read Roles",
  "roles.manage": "Manage Roles",

  "permissions.read": "Read Permissions",
  "permissions.manage": "Manage Permissions",
};

export function isPermission(value: string): value is PermissionId {
  return Object.values(PERMISSIONS).includes(value as PermissionId);
}
