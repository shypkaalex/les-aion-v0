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
  const videoUrl = String(body.videoUrl || "").trim();

  if (!videoId || !/^\d+$/.test(videoId)) {
    return jsonResponse(
      {
        ok: false,
        error: "A valid videoId is required",
      },
      400
    );
  }

  try {
    const parsedVideoUrl = new URL(videoUrl);

    if (parsedVideoUrl.protocol !== "https:") {
      throw new Error();
    }
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "videoUrl must be a valid public HTTPS URL",
      },
      400
    );
  }

  const uploadUrl =
    `https://rupload.facebook.com/video-upload/v25.0/` +
    encodeURIComponent(videoId);

  try {
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `OAuth ${accessToken}`,
        file_url: videoUrl,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || data.success !== true) {
      return jsonResponse(
        {
          ok: false,
          stage: "UPLOAD_VIDEO",
          videoId,
          error: data,
        },
        response.status || 502
      );
    }

    return jsonResponse({
      ok: true,
      stage: "UPLOAD_VIDEO",
      videoId,
      success: true,
      status: "VIDEO_UPLOADED",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "UPLOAD_VIDEO",
        videoId,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Facebook upload error",
      },
      500
    );
  }
}