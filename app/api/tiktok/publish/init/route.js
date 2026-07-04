export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIKTOK_INIT_URL =
  "https://open.tiktokapis.com/v2/post/publish/video/init/";

const FIVE_MB = 5 * 1024 * 1024;
const SIXTY_FOUR_MB = 64 * 1024 * 1024;
const TEN_MB = 10_000_000;
const FOUR_GB = 4 * 1024 * 1024 * 1024;

function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function getRemoteVideoInfo(videoUrl) {
  let contentLength = 0;
  let contentType = "video/mp4";

  try {
    const headResponse = await fetch(videoUrl, {
      method: "HEAD",
      cache: "no-store",
      redirect: "follow",
    });

    if (headResponse.ok) {
      contentLength = Number(
        headResponse.headers.get("content-length") || 0
      );

      contentType =
        headResponse.headers.get("content-type") ||
        contentType;
    }
  } catch {
    // Нижче спрацює резервна Range-перевірка.
  }

  if (!Number.isFinite(contentLength) || contentLength <= 0) {
    const rangeResponse = await fetch(videoUrl, {
      method: "GET",
      headers: {
        Range: "bytes=0-0",
      },
      cache: "no-store",
      redirect: "follow",
    });

    if (!rangeResponse.ok && rangeResponse.status !== 206) {
      throw new Error(
        `Не вдалося визначити розмір відео: HTTP ${rangeResponse.status}`
      );
    }

    const contentRange =
      rangeResponse.headers.get("content-range");

    const match = contentRange?.match(/\/(\d+)$/);

    if (!match) {
      throw new Error(
        "Відеосервер не повернув Content-Length або Content-Range."
      );
    }

    contentLength = Number(match[1]);

    contentType =
      rangeResponse.headers.get("content-type") ||
      contentType;
  }

  if (!Number.isSafeInteger(contentLength) || contentLength <= 0) {
    throw new Error("Некоректний розмір відеофайлу.");
  }

  return {
    videoSize: contentLength,
    contentType,
  };
}

function calculateChunks(videoSize) {
  if (videoSize <= SIXTY_FOUR_MB) {
    return {
      chunkSize: videoSize,
      totalChunkCount: 1,
    };
  }

  const chunkSize = TEN_MB;
  const totalChunkCount = Math.floor(
    videoSize / chunkSize
  );

  if (
    chunkSize < FIVE_MB ||
    totalChunkCount < 1 ||
    totalChunkCount > 1000
  ) {
    throw new Error(
      "Відео не відповідає вимогам TikTok до chunk upload."
    );
  }

  return {
    chunkSize,
    totalChunkCount,
  };
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

  const videoUrl = String(body.videoUrl || "").trim();
  const title = String(body.title || "")
    .trim()
    .slice(0, 2200);

  try {
    const parsedUrl = new URL(videoUrl);

    if (parsedUrl.protocol !== "https:") {
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

  try {
    const { videoSize, contentType } =
      await getRemoteVideoInfo(videoUrl);

    if (videoSize > FOUR_GB) {
      return jsonResponse(
        {
          ok: false,
          error: "Video exceeds TikTok's 4 GB limit",
          videoSize,
        },
        400
      );
    }

    const {
      chunkSize,
      totalChunkCount,
    } = calculateChunks(videoSize);

    const payload = {
      post_info: {
        title,
        privacy_level: "SELF_ONLY",
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,

        // Brain.fm є стороннім партнерським продуктом.
        brand_content_toggle: true,
        brand_organic_toggle: false,

        // Наш відеоконтент створений за допомогою ШІ.
        is_aigc: true,
      },

      source_info: {
        source: "FILE_UPLOAD",
        video_size: videoSize,
        chunk_size: chunkSize,
        total_chunk_count: totalChunkCount,
      },
    };

    const response = await fetch(TIKTOK_INIT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type":
          "application/json; charset=UTF-8",
      },
      body: JSON.stringify(payload),
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
          stage: "TIKTOK_INIT_PUBLISH",
          error: result.error || result,
        },
        response.status || 400
      );
    }

    const publishId = result.data?.publish_id;
    const uploadUrl = result.data?.upload_url;

    if (!publishId || !uploadUrl) {
      return jsonResponse(
        {
          ok: false,
          stage: "TIKTOK_INIT_PUBLISH",
          error:
            "TikTok did not return publish_id or upload_url",
          response: result,
        },
        502
      );
    }

    return jsonResponse({
      ok: true,
      stage: "TIKTOK_INIT_PUBLISH",
      publishId,
      uploadUrl,
      videoUrl,
      videoSize,
      contentType,
      chunkSize,
      totalChunkCount,
      privacyLevel: "SELF_ONLY",
      status: "UPLOAD_SESSION_CREATED",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_INIT_PUBLISH",
        error:
          error instanceof Error
            ? error.message
            : "Unknown TikTok initialization error",
      },
      500
    );
  }
}