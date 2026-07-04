export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const accessToken =
    process.env.TIKTOK_ACCESS_TOKEN?.trim();

  const expectedOpenId =
    process.env.TIKTOK_OPEN_ID?.trim();

  if (!accessToken || !expectedOpenId) {
    return Response.json(
      {
        ok: false,
        error: "Missing TikTok environment variables",
        hasAccessToken: Boolean(accessToken),
        hasOpenId: Boolean(expectedOpenId),
      },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://open.tiktokapis.com/v2/user/info/"
  );

  url.searchParams.set(
    "fields",
    "open_id,union_id,display_name,avatar_url"
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || result.error?.code !== "ok") {
      return Response.json(
        {
          ok: false,
          stage: "TIKTOK_USER_INFO",
          error: result.error || result,
        },
        { status: response.status || 400 }
      );
    }

    const user = result.data?.user || {};

    return Response.json({
      ok: true,
      stage: "TIKTOK_USER_INFO",
      displayName: user.display_name || null,
      openId: user.open_id || null,
      expectedOpenId,
      openIdMatch:
        String(user.open_id) === expectedOpenId,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        stage: "TIKTOK_USER_INFO",
        error:
          error instanceof Error
            ? error.message
            : "Unknown TikTok API error",
      },
      { status: 500 }
    );
  }
}