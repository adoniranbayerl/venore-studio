export const ROLES = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  EDITOR: "editor",
  USER: "user",
} as const;

export type RoleId = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<RoleId, string> = {
  "super-admin": "Super Admin",
  admin: "Admin",
  editor: "Editor",
  user: "User",
};

export const DEFAULT_ROLE: RoleId = ROLES.USER;

export function isRole(value: string): value is RoleId {
  return Object.values(ROLES).includes(value as RoleId);
}
