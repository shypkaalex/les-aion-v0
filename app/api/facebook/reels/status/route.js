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

  if (!providedSecret || providedSecret !== expectedSecret) {
    return jsonResponse(
      {
        ok: false,
        error: "Unauthorized",
      },
      401
    );
  }

  const accessToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();

  if (!accessToken) {
    return jsonResponse(
      {
        ok: false,
        error: "FACEBOOK_PAGE_ACCESS_TOKEN is missing",
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

  if (!videoId || !/^\d+$/.test(videoId)) {
    return jsonResponse(
      {
        ok: false,
        error: "A valid videoId is required",
      },
      400
    );
  }

  const url = new URL(
    `https://graph.facebook.com/v25.0/${encodeURIComponent(videoId)}`
  );

  url.searchParams.set("fields", "status");
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return jsonResponse(
        {
          ok: false,
          stage: "CHECK_REEL_STATUS",
          videoId,
          error: data,
        },
        response.status
      );
    }

    const videoStatus =
      data.status?.video_status || null;

    return jsonResponse({
      ok: true,
      stage: "CHECK_REEL_STATUS",
      videoId,
      videoStatus,
      ready: videoStatus === "ready",
      status: data.status || null,
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "CHECK_REEL_STATUS",
        videoId,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Facebook status error",
      },
      500
    );
  }
}