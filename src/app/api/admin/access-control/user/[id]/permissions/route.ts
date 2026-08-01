import { NextRequest, NextResponse } from "next/server";
import { getAdminPermissions } from "@/services/access-control/permissions";
import { updatePermissions } from "@/services/access-control/updatePermissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await getAdminPermissions(id);

    return NextResponse.json({
      success: true,
      ...result,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const result = await updatePermissions(
      id,
      body.permissions
    );
    console.log("UPDATE RESULT:", result);

    return NextResponse.json(result);

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}