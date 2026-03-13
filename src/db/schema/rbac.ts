import {
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const roles = pgTable(
  "roles",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    rolesNameUniqueIdx: uniqueIndex("roles_name_unique_idx").on(table.name),
  }),
);

export const permissions = pgTable(
  "permissions",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    module: text("module"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    permissionsNameUniqueIdx: uniqueIndex("permissions_name_unique_idx").on(
      table.name,
    ),
    permissionsModuleIdx: index("permissions_module_idx").on(table.module),
  }),
);

export const userRoles = pgTable(
  "user_roles",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    assignedAt: timestamp("assigned_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userRolesPk: primaryKey({
      columns: [table.userId, table.roleId],
    }),
    userRolesUserIdIdx: index("user_roles_user_id_idx").on(table.userId),
    userRolesRoleIdIdx: index("user_roles_role_id_idx").on(table.roleId),
  }),
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    permissionId: text("permission_id")
      .notNull()
      .references(() => permissions.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    assignedAt: timestamp("assigned_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    rolePermissionsPk: primaryKey({
      columns: [table.roleId, table.permissionId],
    }),
    rolePermissionsRoleIdIdx: index("role_permissions_role_id_idx").on(
      table.roleId,
    ),
    rolePermissionsPermissionIdIdx: index(
      "role_permissions_permission_id_idx",
    ).on(table.permissionId),
  }),
);

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;

export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;

export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;

export type RolePermission = typeof rolePermissions.$inferSelect;
export type NewRolePermission = typeof rolePermissions.$inferInsert;
