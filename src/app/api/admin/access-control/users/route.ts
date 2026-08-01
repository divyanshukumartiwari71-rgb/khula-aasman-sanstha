import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("admins")
      .select(`
        id,
        full_name,
        email,
        role,
        status
      `)
      .order("full_name");

    if (error) throw error;

    return NextResponse.json({
      success: true,
      users: data,
    });

  } catch (err) {

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load users",
      },
      {
        status:500
      }
    );

  }
}