export const Permissions = {
  VOLUNTEERS_VIEW: "volunteers.view",
  VOLUNTEERS_EDIT: "volunteers.edit",
  VOLUNTEERS_APPROVE: "volunteers.approve",

  DONATIONS_VIEW: "donations.view",
  DONATIONS_VERIFY: "donations.verify",

  GALLERY_MANAGE: "gallery.manage",

  CONTACTS_MANAGE: "contacts.manage",

  ADMINS_MANAGE: "admins.manage",

  SECURITY_MANAGE: "security.manage",

  SETTINGS_MANAGE: "settings.manage",
} as const;

export type Permission =
  (typeof Permissions)[keyof typeof Permissions];