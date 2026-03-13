"use server";

import { revalidatePath } from "next/cache";

import {
  PERMISSIONS,
  ROLES,
  assignRoleToUser,
  removeRoleFromUser,
  requirePermission,
} from "@/core/permissions";

export async function promoteToAdmin(userId: string) {
  await requirePermission(PERMISSIONS.ROLES_MANAGE);
  await assignRoleToUser(userId, ROLES.ADMIN);
  revalidatePath("/admin/users");
}

export async function promoteToSuperAdmin(userId: string) {
  await requirePermission(PERMISSIONS.ROLES_MANAGE);
  await assignRoleToUser(userId, ROLES.SUPER_ADMIN);
  revalidatePath("/admin/users");
}

export async function removeRole(userId: string, roleId: string) {
  await requirePermission(PERMISSIONS.ROLES_MANAGE);
  await removeRoleFromUser(userId, roleId);
  revalidatePath("/admin/users");
}
