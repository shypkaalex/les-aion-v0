import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const mod = (n: number, m: number) => ((n % m) + m) % m;

function getWesternSign(dateString: string) {
  const d = new Date(dateString);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();

  const signs = [
    ["Capricorn", 12, 22, 1, 19],
    ["Aquarius", 1, 20, 2, 18],
    ["Pisces", 2, 19, 3, 20],
    ["Aries", 3, 21, 4, 19],
    ["Taurus", 4, 20, 5, 20],
    ["Gemini", 5, 21, 6, 20],
    ["Cancer", 6, 21, 7, 22],
    ["Leo", 7, 23, 8, 22],
    ["Virgo", 8, 23, 9, 22],
    ["Libra", 9, 23, 10, 22],
    ["Scorpio", 10, 23, 11, 21],
    ["Sagittarius", 11, 22, 12, 21],
  ] as const;

  return (
    signs.find(([_, fm, fd, tm, td]) =>
      fm > tm
        ? (m === fm && day >= fd) || (m === tm && day <= td)
        : (m === fm && day >= fd) ||
          (m === tm && day <= td) ||
          (m > fm && m < tm)
    )?.[0] || "Unknown"
  );
}

function getChineseZodiac(year: number) {
  const animals = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ];

  const elements = ["Wood", "Fire", "Earth", "Metal", "Water"];

  const animal = animals[mod(year - 4, 12)];
  const element = elements[Math.floor(mod(year - 4, 10) / 2)];

  return { animal, element, label: `${element} ${animal}` };
}

function getCelticTreeSign(dateString: string) {
  const d = new Date(dateString);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();

  const trees = [
    ["Birch", 12, 24, 1, 20],
    ["Rowan", 1, 21, 2, 17],
    ["Ash", 2, 18, 3, 17],
    ["Alder", 3, 18, 4, 14],
    ["Willow", 4, 15, 5, 12],
    ["Hawthorn", 5, 13, 6, 9],
    ["Oak", 6, 10, 7, 7],
    ["Holly", 7, 8, 8, 4],
    ["Hazel", 8, 5, 9, 1],
    ["Vine", 9, 2, 9, 29],
    ["Ivy", 9, 30, 10, 27],
    ["Reed", 10, 28, 11, 24],
    ["Elder", 11, 25, 12, 23],
  ] as const;

  return (
    trees.find(([_, fm, fd, tm, td]) =>
      fm > tm
        ? (m === fm && day >= fd) || (m === tm && day <= td)
        : (m === fm && day >= fd) ||
          (m === tm && day <= td) ||
          (m > fm && m < tm)
    )?.[0] || "Unknown"
  );
}

function buildPythagoreanMatrix(dateString: string) {
  const digits = dateString.replace(/\D/g, "").split("").map(Number);
  const counts: Record<string, number> = {};

  for (let i = 1; i <= 9; i++) {
    counts[String(i)] = 0;
  }

  digits.forEach((n) => {
    if (n >= 1 && n <= 9) counts[String(n)] += 1;
  });

  return counts;
}

function getLifePathNumber(dateString: string) {
  const digits = dateString.replace(/\D/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    sum = String(sum)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  return sum;
}

function getMayanTzolkin(dateString: string) {
  const d = new Date(dateString + "T00:00:00Z");
  const correlation = 584283;
  const julianDay = Math.floor(d.getTime() / 86400000 + 2440587.5);
  const days = julianDay - correlation;

  const names = [
    "Imix",
    "Ikʼ",
    "Akʼbal",
    "Kʼan",
    "Chikchan",
    "Kimi",
    "Manikʼ",
    "Lamat",
    "Muluk",
    "Ok",
    "Chuwen",
    "Ebʼ",
    "Bʼen",
    "Ix",
    "Men",
    "Kibʼ",
    "Kabʼan",
    "Etzʼnabʼ",
    "Kawak",
    "Ajaw",
  ];

  return {
    number: mod(days + 4, 13) + 1,
    name: names[mod(days + 19, 20)],
  };
}

function getMayanHaab(dateString: string) {
  const d = new Date(dateString + "T00:00:00Z");
  const correlation = 584283;
  const julianDay = Math.floor(d.getTime() / 86400000 + 2440587.5);
  const days = julianDay - correlation;

  const months = [
    "Pop",
    "Woʼ",
    "Sip",
    "Sotzʼ",
    "Sek",
    "Xul",
    "Yaxkʼin",
    "Mol",
    "Chʼen",
    "Yax",
    "Sakʼ",
    "Keh",
    "Mak",
    "Kʼankʼin",
    "Muwan",
    "Pax",
    "Kʼayabʼ",
    "Kumkʼu",
    "Wayebʼ",
  ];

  const haabDay = mod(days + 348, 365);
  const monthIndex = Math.floor(haabDay / 20);

  return {
    day: monthIndex === 18 ? haabDay - 360 : haabDay % 20,
    month: months[monthIndex],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = body.name || "Людина";
    const birthDate = body.birthDate;

    if (!birthDate) {
      return NextResponse.json(
        { error: "birthDate is required" },
        { status: 400 }
      );
    }

    const year = new Date(birthDate).getUTCFullYear();

    const defaultData = {
      name,
      birthDate,
      birthTime: body.birthTime || null,
      birthPlace: body.birthPlace || null,

      westernZodiac: getWesternSign(birthDate),
      chineseZodiac: getChineseZodiac(year),
      celticTree: getCelticTreeSign(birthDate),

      numerology: {
        lifePath: getLifePathNumber(birthDate),
        pythagoreanMatrix: buildPythagoreanMatrix(birthDate),
      },

      mayan: {
        tzolkin: getMayanTzolkin(birthDate),
        haab: getMayanHaab(birthDate),
      },
    };

    const prompt = `
You are LES AION v1.

You do NOT generate horoscope descriptions.
You analyze convergence patterns between symbolic systems.

Your task:
- detect repeating signals
- identify contradictions
- synthesize patterns
- describe default human configuration

SYSTEMS:
- western astrology
- chinese zodiac
- celtic / druidic tree layer
- numerology
- pythagorean matrix
- mayan Tzolkin / Haab
- symbolic archetypes
- resonance dynamics

IMPORTANT:
Do NOT use generic spiritual language.
Do NOT flatter.
Do NOT make mystical claims.
Do NOT predict destiny.
Do NOT describe each system separately unless it serves synthesis.

Focus ONLY on:
- repeated patterns
- symbolic convergence
- default rhythm
- primary tension
- energy tendencies
- resonance environments
- shadow tendencies
- signal vs noise

The result must feel:
precise,
deep,
minimal,
human,
psychologically believable.

Write in Ukrainian.
Write like an elite symbolic analyst.

INPUT DATA:
${JSON.stringify(defaultData, null, 2)}

OUTPUT JSON:
{
  "title": "LES AION v1 DOSSIER",

  "coreFrequency": {
    "summary": "5-8 речень: головний синтез повторюваних сигналів між системами",
    "signals": [
      "повторюваний сигнал 1",
      "повторюваний сигнал 2",
      "повторюваний сигнал 3"
    ]
  },

  "defaultOperatingSystem": {
    "description": "5-8 речень: як ця конфігурація природно функціонує без соціальних масок",
    "strengths": [
      "природна сила 1",
      "природна сила 2",
      "природна сила 3"
    ]
  },

  "primaryPolarity": {
    "description": "5-7 речень: головна внутрішня напруга цієї конфігурації",
    "poles": [
      "полюс 1",
      "полюс 2"
    ]
  },

  "energyDynamics": {
    "charges": [
      "що заряджає",
      "що оживляє",
      "що повертає до себе"
    ],
    "leaks": [
      "де витікає енергія",
      "що виснажує",
      "де виникає шум"
    ]
  },

  "naturalResonanceField": {
    "description": "4-6 речень: середовище, у якому ця конфігурація розкривається",
    "environments": [
      "середовище 1",
      "середовище 2",
      "середовище 3"
    ]
  },

  "resonantRole": {
    "name": "нестандартна роль 2-4 слова",
    "symbol": "один символ",
    "description": "5-7 речень: яка роль природно виникає з цієї конфігурації"
  },

  "shadowConfiguration": {
    "description": "5-7 речень: що може проявлятись у перевантаженні",
    "patterns": [
      "тіньовий патерн 1",
      "тіньовий патерн 2",
      "тіньовий патерн 3"
    ]
  },

  "signalVsNoise": {
    "signal": [
      "справжній сигнал 1",
      "справжній сигнал 2",
      "справжній сигнал 3"
    ],
    "noise": [
      "шум 1",
      "шум 2",
      "шум 3"
    ]
  },

  "firstAlignmentVector": {
    "description": "один конкретний перший малий крок для вирівнювання системи"
  },

  "closingReflection": "коротке сильне завершення без пафосу"
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.55,
      messages: [
        {
          role: "system",
          content:
            "Ти LES AION. Повертаєш тільки валідний JSON без markdown. Без діагнозів, без передбачень, без generic-фраз.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "{}";
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return NextResponse.json({
      ...JSON.parse(cleaned),
      rawDefaultData: defaultData,
    });
  } catch (error) {
    console.error("DOSSIER ERROR:", error);
    return NextResponse.json(
      { error: "Не вдалося створити LES AION DOSSIER" },
      { status: 500 }
    );
  }
}
