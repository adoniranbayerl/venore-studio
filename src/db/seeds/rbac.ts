import { db } from "@/db";
import {
  permissions,
  rolePermissions,
  roles,
  type NewPermission,
  type NewRole,
  type NewRolePermission,
} from "@/db/schema";
import { PERMISSIONS, ROLES } from "@/core/permissions";
import { inArray } from "drizzle-orm";

const rolesSeed: NewRole[] = [
  {
    id: ROLES.SUPER_ADMIN,
    name: "Super Admin",
    description: "Full access to the entire system.",
  },
  {
    id: ROLES.ADMIN,
    name: "Admin",
    description: "Administrative access to the platform.",
  },
  {
    id: ROLES.EDITOR,
    name: "Editor",
    description: "Content and CMS management access.",
  },
  {
    id: ROLES.USER,
    name: "User",
    description: "Default authenticated user role.",
  },
];

const permissionsSeed: NewPermission[] = [
  {
    id: PERMISSIONS.ADMIN_ACCESS,
    name: "Access Admin Panel",
    description: "Allows access to the admin panel.",
    module: "core",
  },
  {
    id: PERMISSIONS.USERS_READ,
    name: "Read Users",
    description: "Allows viewing users.",
    module: "core",
  },
  {
    id: PERMISSIONS.USERS_MANAGE,
    name: "Manage Users",
    description: "Allows creating, editing and deleting users.",
    module: "core",
  },
  {
    id: PERMISSIONS.ROLES_READ,
    name: "Read Roles",
    description: "Allows viewing roles.",
    module: "core",
  },
  {
    id: PERMISSIONS.ROLES_MANAGE,
    name: "Manage Roles",
    description: "Allows creating and editing roles.",
    module: "core",
  },
  {
    id: PERMISSIONS.PERMISSIONS_READ,
    name: "Read Permissions",
    description: "Allows viewing permissions.",
    module: "core",
  },
  {
    id: PERMISSIONS.PERMISSIONS_MANAGE,
    name: "Manage Permissions",
    description: "Allows creating and editing permissions.",
    module: "core",
  },
];

const rolePermissionsSeed: Record<string, string[]> = {
  [ROLES.SUPER_ADMIN]: [
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_MANAGE,
    PERMISSIONS.ROLES_READ,
    PERMISSIONS.ROLES_MANAGE,
    PERMISSIONS.PERMISSIONS_READ,
    PERMISSIONS.PERMISSIONS_MANAGE,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_MANAGE,
    PERMISSIONS.ROLES_READ,
    PERMISSIONS.PERMISSIONS_READ,
  ],
  [ROLES.EDITOR]: [],
  [ROLES.USER]: [],
};

export async function seedRbac() {
  await db.insert(roles).values(rolesSeed).onConflictDoNothing();
  await db.insert(permissions).values(permissionsSeed).onConflictDoNothing();

  const allRoles = await db
    .select({
      id: roles.id,
    })
    .from(roles)
    .where(inArray(roles.id, Object.keys(rolePermissionsSeed)));

  const allPermissions = await db
    .select({
      id: permissions.id,
    })
    .from(permissions)
    .where(inArray(permissions.id, Object.values(PERMISSIONS)));

  const existingRoleIds = new Set(allRoles.map((role) => role.id));
  const existingPermissionIds = new Set(
    allPermissions.map((permission) => permission.id),
  );

  const pivotRows: NewRolePermission[] = Object.entries(
    rolePermissionsSeed,
  ).flatMap(([roleId, permissionIds]) => {
    if (!existingRoleIds.has(roleId)) return [];

    return permissionIds
      .filter((permissionId) => existingPermissionIds.has(permissionId))
      .map((permissionId) => ({
        roleId,
        permissionId,
      }));
  });

  if (pivotRows.length > 0) {
    await db.insert(rolePermissions).values(pivotRows).onConflictDoNothing();
  }
}
