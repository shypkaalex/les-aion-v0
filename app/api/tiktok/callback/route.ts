import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const error = searchParams.get("error");
  const errorDescription =
    searchParams.get("error_description");

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error,
        error_description: errorDescription || "",
      },
      { status: 400 }
    );
  }

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  return NextResponse.json({
    ok: true,
    message: "TikTok callback endpoint is active",
    code_received: Boolean(code),
    state_received: Boolean(state),
  });
}