import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TIKTOK_AUTHORIZE_URL =
  "https://www.tiktok.com/v2/auth/authorize/";

const REDIRECT_URI =
  "https://lesaion.world/api/tiktok/callback";

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;

  if (!clientKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "TIKTOK_CLIENT_KEY is missing",
      },
      { status: 500 }
    );
  }

  const state = randomBytes(24).toString("hex");

  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: "code",
    scope: "user.info.basic,video.publish",
    redirect_uri: REDIRECT_URI,
    state,
    disable_auto_auth: "1",
  });

  const response = NextResponse.redirect(
    `${TIKTOK_AUTHORIZE_URL}?${params.toString()}`
  );

  response.cookies.set("tiktok_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  return response;
}