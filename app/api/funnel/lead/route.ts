import { NextResponse } from "next/server";
import { assessSubmission, goalLabels, obstacleLabels, situationLabels, type FunnelSubmission } from "@/lib/funnel";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVyFfHAfuoBsozvIeI8_v-4UfAFbJS-qBpp7g7ICgQfsF6Mwv-czvt5bxZhwmjcMtPTQ/exec";

function isValidSubmission(value: unknown): value is FunnelSubmission {
  if (!value || typeof value !== "object") return false;
  const body = value as Partial<FunnelSubmission>;
  return Boolean(
    body.name?.trim() &&
    body.email && emailPattern.test(body.email) &&
    body.country?.trim() &&
    body.experience?.trim() &&
    body.situation && body.situation in situationLabels &&
    body.goal && body.goal in goalLabels &&
    body.obstacle && body.obstacle in obstacleLabels &&
    Number.isInteger(body.aiReadiness) && Number(body.aiReadiness) >= 1 && Number(body.aiReadiness) <= 5 &&
    Number.isInteger(body.urgency) && Number(body.urgency) >= 1 && Number(body.urgency) <= 5 &&
    body.consent === true
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isValidSubmission(body)) {
      return NextResponse.json({ error: "Перевірте, будь ласка, обов’язкові поля." }, { status: 400 });
    }

    const result = assessSubmission(body);
    const submittedAt = new Date().toISOString();
    const lead = {
      ...body,
      situationLabel: situationLabels[body.situation],
      goalLabel: goalLabels[body.goal],
      obstacleLabel: obstacleLabels[body.obstacle],
      result,
      submittedAt,
    };

    const webhookUrl = process.env.LES_AION_LEAD_WEBHOOK_URL || DEFAULT_SCRIPT_URL;
    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "lead", lead }),
        signal: AbortSignal.timeout(8000),
      });

      if (!webhookResponse.ok) {
        console.error("LES AION lead webhook failed", webhookResponse.status);
      }
    } else {
      console.info("LES AION lead captured without webhook", {
        email: body.email,
        segment: result.segment,
        readiness: result.readiness,
        submittedAt,
      });
    }

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error("LES AION funnel error", error);
    return NextResponse.json({ error: "Не вдалося зберегти відповіді. Спробуйте ще раз." }, { status: 500 });
  }
}
