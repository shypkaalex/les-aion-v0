import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVyFfHAfuoBsozvIeI8_v-4UfAFbJS-qBpp7g7ICgQfsF6Mwv-czvt5bxZhwmjcMtPTQ/exec";

export async function GET() {
  const scriptUrl = DEFAULT_SCRIPT_URL;
  const secret = process.env.LES_AION_BOOKING_SECRET;
  const fallbackUrl = process.env.LES_AION_BOOKING_URL || "https://forms.gle/CtPXnQefCSi7RWHX6";

  try {
    const url = new URL(scriptUrl);
    url.searchParams.set("action", "slots");
    if (secret) url.searchParams.set("secret", secret);
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Google booking service returned ${response.status}`);
    const data = await response.json();
    return NextResponse.json({ slots: data.slots || [], fallbackUrl, configured: true });
  } catch (error) {
    console.error("LES AION slots error", error);
    return NextResponse.json({ slots: [], fallbackUrl, configured: false });
  }
}
