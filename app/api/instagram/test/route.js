export const dynamic = "force-dynamic";

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const expectedUserId = process.env.INSTAGRAM_USER_ID?.trim();

  if (!accessToken || !expectedUserId) {
    return Response.json(
      {
        ok: false,
        error: "Missing Instagram environment variables",
        hasAccessToken: Boolean(accessToken),
        hasUserId: Boolean(expectedUserId),
      },
      { status: 500 }
    );
  }

  const url = new URL("https://graph.instagram.com/v25.0/me");
  url.searchParams.set("fields", "user_id,username");
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          error: data,
        },
        { status: response.status }
      );
    }

    return Response.json({
      ok: true,
      username: data.username,
      apiUserId: String(data.user_id),
      expectedUserId,
      userIdMatch: String(data.user_id) === expectedUserId,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}