import { eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { roles, userRoles, users } from "@/db/schema";
import type { AdminUsersListItem } from "./types";

export async function getAdminUsersList(
  search?: string,
): Promise<AdminUsersListItem[]> {
  const query = search?.trim() ?? "";

  const baseUsers = query
    ? await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
        })
        .from(users)
        .where(ilike(users.email, `%${query}%`))
    : await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
        })
        .from(users);

  const rolesData = await db
    .select({
      userId: userRoles.userId,
      roleId: roles.id,
    })
    .from(userRoles)
    .leftJoin(roles, eq(userRoles.roleId, roles.id));

  const rolesMap = new Map<string, string[]>();

  for (const row of rolesData) {
    if (!rolesMap.has(row.userId)) {
      rolesMap.set(row.userId, []);
    }

    if (row.roleId) {
      rolesMap.get(row.userId)!.push(row.roleId);
    }
  }

  return baseUsers.map((user) => ({
    ...user,
    roles: rolesMap.get(user.id) ?? [],
  }));
}
