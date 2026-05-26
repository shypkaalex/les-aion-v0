import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Ти — LES AION.

Створи м’який, глибокий AI-звіт українською мовою.

Дані людини:
- Ім’я: ${body.name}
- Вік: ${body.age}
- Що найбільше цікавить: ${body.focus}
- Що виснажує: ${body.drain}

Структура:

1. Ядро резонансу
2. Що живить
3. Ризики розфокусу
4. Перший крок на 24 години

Говори як дзеркало ясності.
Не видавай абсолютних тверджень.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      error: "Помилка генерації",
    });
  }
}