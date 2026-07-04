export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

export async function POST(request) {
  const expectedSecret = process.env.SOCIAL_PUBLISH_SECRET?.trim();
  const providedSecret = request.headers
    .get("x-social-publish-secret")
    ?.trim();

  if (!expectedSecret) {
    return jsonResponse(
      {
        ok: false,
        error: "SOCIAL_PUBLISH_SECRET is not configured",
      },
      500
    );
  }

  if (!providedSecret || providedSecret !== expectedSecret) {
    return jsonResponse(
      {
        ok: false,
        error: "Unauthorized",
      },
      401
    );
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const instagramUserId = process.env.INSTAGRAM_USER_ID?.trim();

  if (!accessToken || !instagramUserId) {
    return jsonResponse(
      {
        ok: false,
        error: "Instagram environment variables are missing",
        hasAccessToken: Boolean(accessToken),
        hasInstagramUserId: Boolean(instagramUserId),
      },
      500
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "Request body must be valid JSON",
      },
      400
    );
  }

  const creationId = String(body.creationId || "").trim();

  if (!creationId || !/^\d+$/.test(creationId)) {
    return jsonResponse(
      {
        ok: false,
        error: "A valid creationId is required",
      },
      400
    );
  }

  const params = new URLSearchParams({
    creation_id: creationId,
    access_token: accessToken,
  });

  try {
    const response = await fetch(
      `https://graph.instagram.com/v25.0/${encodeURIComponent(
        instagramUserId
      )}/media_publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return jsonResponse(
        {
          ok: false,
          stage: "PUBLISH_REEL",
          creationId,
          error: data,
        },
        response.status
      );
    }

    return jsonResponse({
      ok: true,
      stage: "PUBLISH_REEL",
      creationId,
      mediaId: data.id,
      status: "PUBLISHED",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "PUBLISH_REEL",
        creationId,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Instagram API error",
      },
      500
    );
  }
}