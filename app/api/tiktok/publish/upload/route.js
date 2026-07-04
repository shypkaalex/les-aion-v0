export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function validateHttpsUrl(value, label) {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      throw new Error();
    }

    return url;
  } catch {
    throw new Error(`${label} must be a valid HTTPS URL`);
  }
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

  const uploadUrl = String(body.uploadUrl || "").trim();
  const videoUrl = String(body.videoUrl || "").trim();

  const videoSize = Number(body.videoSize);
  const chunkSize = Number(body.chunkSize);
  const totalChunkCount = Number(body.totalChunkCount);

  const contentType = String(
    body.contentType || "video/mp4"
  )
    .split(";")[0]
    .trim()
    .toLowerCase();

  try {
    const parsedUploadUrl = validateHttpsUrl(
      uploadUrl,
      "uploadUrl"
    );

    validateHttpsUrl(videoUrl, "videoUrl");

    if (
      parsedUploadUrl.hostname !== "tiktokapis.com" &&
      !parsedUploadUrl.hostname.endsWith(".tiktokapis.com")
    ) {
      throw new Error(
        "uploadUrl must belong to tiktokapis.com"
      );
    }
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Invalid URL",
      },
      400
    );
  }

  if (
    !Number.isSafeInteger(videoSize) ||
    videoSize <= 0 ||
    !Number.isSafeInteger(chunkSize) ||
    chunkSize <= 0 ||
    !Number.isSafeInteger(totalChunkCount) ||
    totalChunkCount <= 0
  ) {
    return jsonResponse(
      {
        ok: false,
        error:
          "videoSize, chunkSize and totalChunkCount must be positive integers",
      },
      400
    );
  }

  if (!ALLOWED_VIDEO_TYPES.has(contentType)) {
    return jsonResponse(
      {
        ok: false,
        error: `Unsupported video Content-Type: ${contentType}`,
      },
      400
    );
  }

  const uploadedChunks = [];

  try {
    for (
      let chunkIndex = 0;
      chunkIndex < totalChunkCount;
      chunkIndex++
    ) {
      const firstByte = chunkIndex * chunkSize;

      const lastByte =
        chunkIndex === totalChunkCount - 1
          ? videoSize - 1
          : Math.min(
              firstByte + chunkSize - 1,
              videoSize - 1
            );

      const expectedChunkLength =
        lastByte - firstByte + 1;

      const videoResponse = await fetch(videoUrl, {
        method: "GET",
        headers: {
          Range: `bytes=${firstByte}-${lastByte}`,
        },
        redirect: "follow",
        cache: "no-store",
      });

      if (!videoResponse.ok) {
        throw new Error(
          `Video download failed: HTTP ${videoResponse.status}`
        );
      }

      if (
        totalChunkCount > 1 &&
        videoResponse.status !== 206
      ) {
        throw new Error(
          "Video host does not support Range requests required for chunk upload"
        );
      }

      const videoBuffer = Buffer.from(
        await videoResponse.arrayBuffer()
      );

      if (videoBuffer.length !== expectedChunkLength) {
        throw new Error(
          `Incorrect chunk size: expected ${expectedChunkLength}, received ${videoBuffer.length}`
        );
      }

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(videoBuffer.length),
          "Content-Range":
            `bytes ${firstByte}-${lastByte}/${videoSize}`,
        },
        body: videoBuffer,
        cache: "no-store",
      });

      const responseText =
        await uploadResponse.text();

      const isFinalChunk =
        chunkIndex === totalChunkCount - 1;

      const expectedStatus =
        isFinalChunk ? 201 : 206;

      if (uploadResponse.status !== expectedStatus) {
        throw new Error(
          `TikTok upload failed for chunk ${
            chunkIndex + 1
          }: HTTP ${uploadResponse.status} ${
            responseText || ""
          }`.trim()
        );
      }

      uploadedChunks.push({
        chunk: chunkIndex + 1,
        firstByte,
        lastByte,
        bytes: videoBuffer.length,
        httpStatus: uploadResponse.status,
      });
    }

    return jsonResponse({
      ok: true,
      stage: "TIKTOK_UPLOAD_VIDEO",
      videoSize,
      uploadedChunkCount: uploadedChunks.length,
      uploadedChunks,
      status: "VIDEO_UPLOADED",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_UPLOAD_VIDEO",
        error:
          error instanceof Error
            ? error.message
            : "Unknown TikTok upload error",
        uploadedChunks,
      },
      500
    );
  }
}