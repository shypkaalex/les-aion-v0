export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIKTOK_STATUS_URL =
  "https://open.tiktokapis.com/v2/post/publish/status/fetch/";

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
  request.headers
    .get("x-tiktok-access-token")
    ?.trim() ||
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

  const publishId = String(body.publishId || "").trim();

  if (!publishId) {
    return jsonResponse(
      {
        ok: false,
        error: "publishId is required",
      },
      400
    );
  }

  try {
    const response = await fetch(TIKTOK_STATUS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type":
          "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        publish_id: publishId,
      }),
      cache: "no-store",
    });

    const result = await response.json();

    if (
      !response.ok ||
      (result.error?.code &&
        result.error.code !== "ok")
    ) {
      return jsonResponse(
        {
          ok: false,
          stage: "TIKTOK_CHECK_PUBLISH_STATUS",
          publishId,
          error: result.error || result,
        },
        response.status || 400
      );
    }

    const data = result.data || {};
    const publishStatus = data.status || null;

    return jsonResponse({
      ok: true,
      stage: "TIKTOK_CHECK_PUBLISH_STATUS",
      publishId,
      publishStatus,
      uploadedBytes: data.uploaded_bytes ?? null,
      failReason: data.fail_reason || null,
      publiclyAvailablePostIds:
        data.publicaly_available_post_id || [],
      ready: publishStatus === "PUBLISH_COMPLETE",
      failed: publishStatus === "FAILED",
      status:
        publishStatus === "PUBLISH_COMPLETE"
          ? "PUBLISHED"
          : publishStatus === "FAILED"
            ? "FAILED"
            : "PROCESSING",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_CHECK_PUBLISH_STATUS",
        publishId,
        error:
          error instanceof Error
            ? error.message
            : "Unknown TikTok status error",
      },
      500
    );
  }
}