import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      address,
      skills,
      experience,
    } = body;

    if (!name || !email || !phone || !address) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("volunteers")
      .insert([
        {
          full_name: name,
          email,
          phone,
          address,
          skills: skills || "",
          experience: experience || "",
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Volunteer Supabase Error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Volunteer API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit volunteer application.",
      },
      { status: 500 }
    );
  }
}