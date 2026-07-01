import { NextRequest, NextResponse } from "next/server";

const CLICK_LOGGER_URL =
  "https://script.google.com/macros/s/AKfycbzWlG8ehgamXbvUOjSOaVWR9xHHZI_4Y5i1_GkZMwjWD8V8EYoDEB6heTNiN1IO_5gLHA/exec";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const cid = searchParams.get("cid") || "unknown";
  const source = searchParams.get("source") || "";

  const affiliateUrl = new URL("http://brain.fm/lesaion");
  affiliateUrl.searchParams.set("fpr", "lesaion");
  affiliateUrl.searchParams.set("fp_sid", "devai001");

  try {
    await fetch(CLICK_LOGGER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid,
        project_id: "brainfm_001",
        audience_id: "aud_dev_001",
        content_id: cid,
        source,
        referrer: request.headers.get("referer") || "",
        user_agent: request.headers.get("user-agent") || "",
        destination_url: affiliateUrl.toString(),
      }),
    });
  } catch (error) {
    console.error("Click logger error:", error);
  }

  console.log("Brain.fm click:", {
    cid,
    time: new Date().toISOString(),
  });

  return NextResponse.redirect(affiliateUrl.toString(), 302);
}