export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIKTOK_REDIRECT_URI =
  "https://lesaion.world/api/tiktok/callback";

function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request) {
  const requestUrl = new URL(request.url);

  const oauthError = requestUrl.searchParams.get("error");
  const oauthErrorDescription =
    requestUrl.searchParams.get("error_description");
  const code = requestUrl.searchParams.get("code")?.trim();
  const state = requestUrl.searchParams.get("state")?.trim();

  if (oauthError) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_AUTHORIZATION",
        error: oauthError,
        errorDescription: oauthErrorDescription || null,
      },
      400
    );
  }

  if (!code) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_CALLBACK",
        error: "Authorization code is missing",
      },
      400
    );
  }

  if (!state) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_CALLBACK",
        error: "OAuth state is missing",
      },
      400
    );
  }

  const clientKey =
    process.env.TIKTOK_CLIENT_KEY?.trim();
  const clientSecret =
    process.env.TIKTOK_CLIENT_SECRET?.trim();

  if (!clientKey || !clientSecret) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_TOKEN_EXCHANGE",
        error: "TikTok environment variables are missing",
        hasClientKey: Boolean(clientKey),
        hasClientSecret: Boolean(clientSecret),
      },
      500
    );
  }

  const params = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: TIKTOK_REDIRECT_URI,
  });

  try {
    const response = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        body: params,
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      return jsonResponse(
        {
          ok: false,
          stage: "TIKTOK_TOKEN_EXCHANGE",
          error: data,
        },
        response.status || 400
      );
    }

    return jsonResponse({
      ok: true,
      stage: "TIKTOK_TOKEN_EXCHANGE",
      message:
        "Tokens received. Copy them securely and do not share them.",
      openId: data.open_id,
      scope: data.scope,
      tokenType: data.token_type,
      accessToken: data.access_token,
      accessTokenExpiresIn: data.expires_in,
      refreshToken: data.refresh_token,
      refreshTokenExpiresIn: data.refresh_expires_in,
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        stage: "TIKTOK_TOKEN_EXCHANGE",
        error:
          error instanceof Error
            ? error.message
            : "Unknown TikTok token exchange error",
      },
      500
    );
  }
}