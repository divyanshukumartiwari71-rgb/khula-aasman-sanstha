export const Roles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  TREASURER: "TREASURER",
} as const;

export type Role =
  (typeof Roles)[keyof typeof Roles];