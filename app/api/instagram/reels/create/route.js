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

  const videoUrl = String(body.videoUrl || "").trim();
  const caption = String(body.caption || "").trim().slice(0, 2200);
  const shareToFeed = body.shareToFeed !== false;

  if (!videoUrl) {
    return jsonResponse(
      {
        ok: false,
        error: "videoUrl is required",
      },
      400
    );
  }

  try {
    const parsedUrl = new URL(videoUrl);

    if (parsedUrl.protocol !== "https:") {
      throw new Error("Only HTTPS video URLs are allowed");
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

  const params = new URLSearchParams({
    media_type: "REELS",
    video_url: videoUrl,
    caption,
    share_to_feed: String(shareToFeed),
    access_token: accessToken,
  });

  try {
    const response = await fetch(
      `https://graph.instagram.com/v25.0/${encodeURIComponent(
        instagramUserId
      )}/media`,
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
          stage: "CREATE_CONTAINER",
          error: data,
        },
        response.status
      );
    }

    return jsonResponse({
      ok: true,
      stage: "CREATE_CONTAINER",
      creationId: data.id,
      status: "CONTAINER_CREATED",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "CREATE_CONTAINER",
        error:
          error instanceof Error
            ? error.message
            : "Unknown Instagram API error",
      },
      500
    );
  }
}