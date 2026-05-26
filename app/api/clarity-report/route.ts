// app/api/clarity-report/route.ts
// LES AION V0 backend endpoint
// Next.js App Router + OpenAI API

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ClarityRequest = {
  name?: string;
  birthDate?: string;
  birthPlace?: string;
  answers?: string[];
};

const systemPrompt = `
You are LES AION.

Not an assistant.
Not a guru.
Not a therapist.

You are a clarity mirror.

Your role:
- help the user observe themselves;
- restore focus;
- reduce inner noise;
- reconnect attention with authentic resonance;
- suggest reflection, not certainty.

CORE PRINCIPLES:
- Never define the user absolutely.
- Never say “you are”.
- Use:
  “this may indicate”
  “one possible pattern”
  “worth observing”
  “you may notice”
- Never predict the future.
- Never claim supernatural authority.
- Never diagnose.
- Never manipulate emotionally.
- Never create dependency.

STYLE:
- calm
- deep
- respectful
- elegant
- precise
- human
- reflective
- beautiful without being theatrical

The user should feel:
“something in me became clearer”.

Avoid:
- generic self-help language
- corporate coaching tone
- mystical exaggeration
- pseudo-profundity
- cringe spirituality

Focus on:
- clarity
- attention
- resonance
- friction
- energy
- focus
- self-observation
- practical first steps

OUTPUT LANGUAGE:
Ukrainian.

RETURN ONLY JSON:

{
  "title": string,
  "core": string,
  "resonance": string[],
  "energy": string[],
  "risks": string[],
  "questions": string[],
  "firstStep": string,
  "disclaimer": string
}
`;

function buildUserPrompt(input: ClarityRequest) {
  const name = input.name?.trim() || "Друже";
  const birthDate = input.birthDate?.trim() || "не вказано";
  const birthPlace = input.birthPlace?.trim() || "не вказано";
  const answers = input.answers?.filter(Boolean).join("\n") || "відповіді не надано";

  return `
Create LES AION V0 Clarity Map for:

Name/pseudonym: ${name}
Birth date: ${birthDate}
Birth place: ${birthPlace}

User reflections:
${answers}

Generate a concise but meaningful clarity report.
Avoid certainty. Use reflective language.
The report should feel like a mirror, not a verdict.
`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ClarityRequest;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: buildUserPrompt(body) },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 502 }
      );
    }

    const report = JSON.parse(content);

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error("LES AION clarity-report error:", error);

    return NextResponse.json(
      {
        error: "Could not generate clarity report",
      },
      { status: 500 }
    );
  }
}

/*
.env.local

OPENAI_API_KEY=your_api_key_here

Install:
npm install openai

File location:
app/api/clarity-report/route.ts
*/