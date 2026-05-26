import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Ти — LES AION.

Створи українською мовою персональну Карту Ясності.

Не діагностуй. Не пророкуй. Не кажи "ти є".
Пиши як дзеркало ясності: м’яко, глибоко, точно.

Дані:
Ім’я: ${body.name}
Дата народження: ${body.birthDate}
Місце народження: ${body.birthPlace}
Відповідь 1: ${body.answers?.[0]}
Відповідь 2: ${body.answers?.[1]}
Відповідь 3: ${body.answers?.[2]}

Поверни ТІЛЬКИ JSON:

{
  "title": "Карта Ясності для ...",
  "archetype": "коротка англомовна назва архетипу, 2 слова",
  "archetypeSymbol": "один символ або емоджі",
  "archetypeMeaning": "1-2 речення українською про цей архетип",
  "core": "глибокий текст Ядра резонансу українською",
  "resonance": ["3 можливі патерни"],
  "energy": ["4 джерела енергії"],
  "risks": ["3 ризики розфокусу"],
  "questions": ["3 питання ясності"],
  "firstStep": "один конкретний перший крок на 24 години",
  "disclaimer": "LES AION не ставить медичних, психологічних чи езотеричних діагнозів. Це інструмент рефлексії, ясності та самоспостереження."
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.8,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      return Response.json({ error: "Порожня відповідь AI" }, { status: 500 });
    }

    return Response.json(JSON.parse(content));
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Помилка генерації" }, { status: 500 });
  }
}