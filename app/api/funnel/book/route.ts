import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVyFfHAfuoBsozvIeI8_v-4UfAFbJS-qBpp7g7ICgQfsF6Mwv-czvt5bxZhwmjcMtPTQ/exec";

export async function POST(request: Request) {
  const scriptUrl = process.env.LES_AION_GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;
  const secret = process.env.LES_AION_BOOKING_SECRET;
  try {
    const body = await request.json();
    if (!body?.lead?.name?.trim() || !emailPattern.test(body?.lead?.email || "") || !body?.slot?.start || !body?.slot?.end) {
      return NextResponse.json({ error: "Некоректні дані бронювання." }, { status: 400 });
    }
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "book", ...(secret ? { secret } : {}), ...body }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) return NextResponse.json({ error: data.error || "Цей час уже зайнятий. Оберіть інший." }, { status: 409 });
    return NextResponse.json({ eventUrl: data.eventUrl, meetingUrl: data.meetingUrl });
  } catch (error) {
    console.error("LES AION booking error", error);
    return NextResponse.json({ error: "Не вдалося завершити бронювання. Спробуйте ще раз." }, { status: 500 });
  }
}
