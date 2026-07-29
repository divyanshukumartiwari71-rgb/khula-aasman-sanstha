import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      full_name,
      email,
      phone,
      role,
      password,
    } = body;

    if (!full_name || !email || !role || !password ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const { data: existing } = await supabaseAdmin
      .from("admins")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "An administrator with this email already exists.",
        },
        { status: 409 }
      );
    }

    const { data: authData, error: authError } =
  await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

if (authError) {
  return NextResponse.json(
    {
      success: false,
      message: authError.message,
    },
    { status: 400 }
  );
}
const { error: adminError } = await supabaseAdmin
  .from("admins")
  .insert({
    auth_user_id: authData.user.id,
    full_name,
    email,
    phone,
    role,
    status: "active",
  });

if (adminError) {
  await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

  return NextResponse.json(
    {
      success: false,
      message: adminError.message,
    },
    { status: 400 }
  );
}

    return NextResponse.json({
      success: true,
      message: "Administrator created successfully.",
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}