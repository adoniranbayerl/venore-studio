import { and, count, eq } from "drizzle-orm";

import { db } from "@/db";
import { userRoles } from "@/db/schema";
import { ROLES } from "./roles";

export async function countSuperAdmins() {
  const result = await db
    .select({
      total: count(),
    })
    .from(userRoles)
    .where(eq(userRoles.roleId, ROLES.SUPER_ADMIN));

  return Number(result[0]?.total ?? 0);
}

export async function isUserSuperAdmin(userId: string) {
  const result = await db
    .select({
      userId: userRoles.userId,
    })
    .from(userRoles)
    .where(
      and(
        eq(userRoles.userId, userId),
        eq(userRoles.roleId, ROLES.SUPER_ADMIN),
      ),
    )
    .limit(1);

  return result.length > 0;
}

export async function assertCannotRemoveLastSuperAdmin(
  userId: string,
  roleId: string,
) {
  if (roleId !== ROLES.SUPER_ADMIN) {
    return;
  }

  const userIsSuperAdmin = await isUserSuperAdmin(userId);

  if (!userIsSuperAdmin) {
    return;
  }

  const totalSuperAdmins = await countSuperAdmins();

  if (totalSuperAdmins <= 1) {
    throw new Error("Cannot remove the last super-admin from the system.");
  }
}
