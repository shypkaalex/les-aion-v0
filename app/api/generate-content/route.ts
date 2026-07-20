import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
      const expectedSecret = process.env.CONTENT_API_SECRET;
  const providedSecret = request.headers.get("x-api-secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "OPENAI_API_KEY is missing" },
        { status: 500 }
      );
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const body = await request.json();

    const prompt =
      typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json(
        { ok: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.4-mini",
      instructions:
        "You are the content generation engine of the AI-API-Content Machine. Create practical, accurate content. Do not invent facts, statistics, testimonials, personal experiences, medical claims, or guaranteed results. Return only the requested content.",
      input: prompt,
    });

    return NextResponse.json({
      ok: true,
      content: response.output_text,
    });
  } catch (error) {
    console.error("Content generation error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Content generation failed",
      },
      { status: 500 }
    );
  }
}
