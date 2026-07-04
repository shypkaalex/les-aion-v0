export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

export async function POST(request) {
  const expectedSecret =
    process.env.SOCIAL_PUBLISH_SECRET?.trim();

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

  const pageId = process.env.FACEBOOK_PAGE_ID?.trim();
  const accessToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();

  if (!pageId || !accessToken) {
    return jsonResponse(
      {
        ok: false,
        error: "Facebook environment variables are missing",
        hasPageId: Boolean(pageId),
        hasAccessToken: Boolean(accessToken),
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

  const videoId = String(body.videoId || "").trim();
  const description = String(body.description || "")
    .trim()
    .slice(0, 2200);

  if (!videoId || !/^\d+$/.test(videoId)) {
    return jsonResponse(
      {
        ok: false,
        error: "A valid videoId is required",
      },
      400
    );
  }

  const params = new URLSearchParams({
    upload_phase: "finish",
    video_id: videoId,
    video_state: "PUBLISHED",
    description,
    access_token: accessToken,
  });

  try {
    const response = await fetch(
      `https://graph.facebook.com/v25.0/${encodeURIComponent(
        pageId
      )}/video_reels`,
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

    if (!response.ok || data.success !== true) {
      return jsonResponse(
        {
          ok: false,
          stage: "PUBLISH_REEL",
          videoId,
          error: data,
        },
        response.status || 502
      );
    }

    return jsonResponse({
      ok: true,
      stage: "PUBLISH_REEL",
      videoId,
      success: true,
      status: "PUBLISHED",
      facebookResponse: data,
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "PUBLISH_REEL",
        videoId,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Facebook publish error",
      },
      500
    );
  }
}