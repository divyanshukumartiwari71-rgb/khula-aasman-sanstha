import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: admin, error } = await supabaseAdmin
      .from("admins")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      admin,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Admin not found",
      },
      {
        status:404,
      }
    );

  }
}