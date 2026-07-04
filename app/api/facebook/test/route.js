export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID?.trim();
  const accessToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();

  if (!pageId || !accessToken) {
    return Response.json(
      {
        ok: false,
        error: "Missing Facebook environment variables",
        hasPageId: Boolean(pageId),
        hasAccessToken: Boolean(accessToken),
      },
      { status: 500 }
    );
  }

  const url = new URL(
    `https://graph.facebook.com/v25.0/${encodeURIComponent(pageId)}`
  );

  url.searchParams.set("fields", "id,name");
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          error: data,
        },
        { status: response.status }
      );
    }

    return Response.json({
      ok: true,
      pageId: String(data.id),
      expectedPageId: pageId,
      pageIdMatch: String(data.id) === pageId,
      pageName: data.name,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Facebook API error",
      },
      { status: 500 }
    );
  }
}