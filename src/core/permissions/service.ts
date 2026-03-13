import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { permissions, rolePermissions, roles, userRoles } from "@/db/schema";
import { assertCannotRemoveLastSuperAdmin } from "./invariants";

export async function getUserRoles(userId: string) {
  const rows = await db
    .select({
      id: roles.id,
      name: roles.name,
      description: roles.description,
    })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(userRoles.userId, userId));

  return rows;
}

export async function getUserPermissions(userId: string) {
  const rows = await db
    .select({
      id: permissions.id,
      name: permissions.name,
      description: permissions.description,
      module: permissions.module,
    })
    .from(userRoles)
    .innerJoin(rolePermissions, eq(userRoles.roleId, rolePermissions.roleId))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(eq(userRoles.userId, userId));

  const uniqueMap = new Map<string, (typeof rows)[number]>();

  for (const row of rows) {
    uniqueMap.set(row.id, row);
  }

  return Array.from(uniqueMap.values());
}

export async function getUserAuthorizationData(userId: string) {
  const [userRolesList, userPermissions] = await Promise.all([
    getUserRoles(userId),
    getUserPermissions(userId),
  ]);

  return {
    roles: userRolesList,
    permissions: userPermissions,
  };
}

export async function assignRoleToUser(userId: string, roleId: string) {
  await db
    .insert(userRoles)
    .values({
      userId,
      roleId,
    })
    .onConflictDoNothing();
}

export async function removeRoleFromUser(userId: string, roleId: string) {
  await assertCannotRemoveLastSuperAdmin(userId, roleId);

  await db
    .delete(userRoles)
    .where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)));
}

export async function addPermissionToRole(
  roleId: string,
  permissionId: string,
) {
  await db
    .insert(rolePermissions)
    .values({
      roleId,
      permissionId,
    })
    .onConflictDoNothing();
}

export async function removePermissionFromRole(
  roleId: string,
  permissionId: string,
) {
  await db
    .delete(rolePermissions)
    .where(
      and(
        eq(rolePermissions.roleId, roleId),
        eq(rolePermissions.permissionId, permissionId),
      ),
    );
}
