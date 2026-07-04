export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
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
    process.env.TIKTOK_ACCESS_TOKEN?.trim();

  if (!accessToken) {
    return jsonResponse(
      {
        ok: false,
        error: "TIKTOK_ACCESS_TOKEN is missing",
      },
      500
    );
  }

  try {
    const response = await fetch(
      "https://open.tiktokapis.com/v2/post/publish/creator_info/query/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (
      !response.ok ||
      (result.error?.code && result.error.code !== "ok")
    ) {
      return jsonResponse(
        {
          ok: false,
          stage: "TIKTOK_CREATOR_INFO",
          error: result.error || result,
        },
        response.status || 400
      );
    }

    const creator = result.data || {};

    return jsonResponse({
      ok: true,
      stage: "TIKTOK_CREATOR_INFO",
      username: creator.creator_username || null,
      nickname: creator.creator_nickname || null,
      privacyLevelOptions:
        creator.privacy_level_options || [],
      commentDisabled:
        Boolean(creator.comment_disabled),
      duetDisabled:
        Boolean(creator.duet_disabled),
      stitchDisabled:
        Boolean(creator.stitch_disabled),
      maxVideoDurationSeconds:
        creator.max_video_post_duration_sec || null,
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_CREATOR_INFO",
        error:
          error instanceof Error
            ? error.message
            : "Unknown TikTok API error",
      },
      500
    );
  }
}