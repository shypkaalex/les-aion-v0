import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const cid = searchParams.get("cid") || "unknown";

  const affiliateUrl = new URL("http://brain.fm/lesaion");
  affiliateUrl.searchParams.set("fpr", "lesaion");
  affiliateUrl.searchParams.set("fp_sid", "devai001");
  console.log("Brain.fm click:", {
    cid,
    time: new Date().toISOString(),
  });

  return NextResponse.redirect(affiliateUrl.toString(), 302);
}