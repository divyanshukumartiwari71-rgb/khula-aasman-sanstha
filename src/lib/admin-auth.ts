import { supabaseAdmin } from "./supabase-admin";

export async function getAdminByAuthId(authUserId: string) {
  const { data, error } = await supabaseAdmin
    .from("admins")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();

  if (error) throw error;

  return data;
}