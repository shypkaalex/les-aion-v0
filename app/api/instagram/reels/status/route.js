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

  if (!accessToken) {
    return jsonResponse(
      {
        ok: false,
        error: "INSTAGRAM_ACCESS_TOKEN is missing",
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

  const url = new URL(
    `https://graph.instagram.com/v25.0/${encodeURIComponent(creationId)}`
  );

  url.searchParams.set("fields", "status_code,status");
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
          stage: "CHECK_CONTAINER",
          error: data,
        },
        response.status
      );
    }

    return jsonResponse({
      ok: true,
      stage: "CHECK_CONTAINER",
      creationId,
      statusCode: data.status_code || null,
      status: data.status || null,
      ready: data.status_code === "FINISHED",
      failed:
        data.status_code === "ERROR" ||
        data.status_code === "EXPIRED",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "CHECK_CONTAINER",
        error:
          error instanceof Error
            ? error.message
            : "Unknown Instagram API error",
      },
      500
    );
  }
}