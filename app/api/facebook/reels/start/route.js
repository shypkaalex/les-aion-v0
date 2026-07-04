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

  const params = new URLSearchParams({
    upload_phase: "start",
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

    if (!response.ok) {
      return jsonResponse(
        {
          ok: false,
          stage: "START_UPLOAD",
          error: data,
        },
        response.status
      );
    }

    if (!data.video_id || !data.upload_url) {
      return jsonResponse(
        {
          ok: false,
          stage: "START_UPLOAD",
          error: "Facebook did not return video_id or upload_url",
          response: data,
        },
        502
      );
    }

    return jsonResponse({
      ok: true,
      stage: "START_UPLOAD",
      videoId: String(data.video_id),
      uploadUrl: data.upload_url,
      status: "UPLOAD_SESSION_CREATED",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "START_UPLOAD",
        error:
          error instanceof Error
            ? error.message
            : "Unknown Facebook API error",
      },
      500
    );
  }
}