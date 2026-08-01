import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getAdminPermissions(adminId: string) {
  // 1. Get admin
  const { data: admin, error: adminError } = await supabaseAdmin
    .from("admins")
    .select("id, full_name, email, role")
    .eq("id", adminId)
    .single();

  if (adminError || !admin) {
    throw new Error("Admin not found");
  }

  // 2. Get role
  const { data: role, error: roleError } = await supabaseAdmin
    .from("roles")
    .select("id, name")
    .eq("name", admin.role)
    .single();

  if (roleError || !role) {
    throw new Error(`Role '${admin.role}' not found`);
  }

  // 3. Get all permissions
  const { data: permissions, error: permissionsError } =
    await supabaseAdmin
      .from("permissions")
      .select("*")
      .order("permission_key");

  if (permissionsError) {
    throw permissionsError;
  }

  // 4. Get role permissions
  const { data: rolePermissions, error: rolePermissionsError } =
    await supabaseAdmin
      .from("role_permissions")
      .select("permission_id")
      .eq("role_id", role.id);

  if (rolePermissionsError) {
    throw rolePermissionsError;
  }

  // 5. Get custom overrides
  const { data: customPermissions, error: customPermissionsError } =
    await supabaseAdmin
      .from("admin_permissions")
      .select("permission_id, access_type")
      .eq("admin_id", adminId);

  if (customPermissionsError) {
    throw customPermissionsError;
  }

  return {
    admin,
    role,
    permissions,
    rolePermissions,
    customPermissions,
  };
}