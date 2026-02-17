export const Roles = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
