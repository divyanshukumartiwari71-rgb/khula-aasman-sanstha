import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updatePermissions(
  adminId: string,
  permissions: Record<string, boolean>
) {
  // Get admin role name
  const { data: admin, error: adminError } = await supabaseAdmin
    .from("admins")
    .select("role")
    .eq("id", adminId)
    .single();

  if (adminError) throw adminError;

  // Get role UUID from role name
  const { data: role, error: roleError } = await supabaseAdmin
    .from("roles")
    .select("id")
    .eq("name", admin.role)
    .single();

  if (roleError) throw roleError;

  // Get default permissions for that role
  const { data: rolePermissions, error: permissionError } =
    await supabaseAdmin
      .from("role_permissions")
      .select("permission_id")
      .eq("role_id", role.id);

  if (permissionError) throw permissionError;

  const defaultPermissions = new Set(
    rolePermissions.map((p) => p.permission_id)
  );

  // Remove previous overrides
  const { error: deleteError } = await supabaseAdmin
    .from("admin_permissions")
    .delete()
    .eq("admin_id", adminId);

  if (deleteError) throw deleteError;

  // Create new overrides
  const overrides = [];

  for (const permissionId in permissions) {
    const enabled = permissions[permissionId];
    const defaultEnabled = defaultPermissions.has(permissionId);

    if (enabled !== defaultEnabled) {
      overrides.push({
        admin_id: adminId,
        permission_id: permissionId,
        access_type: enabled ? "ALLOW" : "DENY",
      });
    }
  }

  if (overrides.length > 0) {
    const { error } = await supabaseAdmin
      .from("admin_permissions")
      .insert(overrides);

    if (error) throw error;
  }

  return {
    success: true,
  };
}