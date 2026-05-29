import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { buildNatalCore } from "@/app/lib/natal";
import {
  calculateFactoryVectors,
  explainTopVectorSources,
} from "@/lib/les-aion/factoryEngine";
import { buildMirror } from "@/lib/les-aion/mirrorEngine";

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

function getDruidTreeSign(date: string) {
    const d = new Date(date);
    const day = d.getUTCDate();
    const month = d.getUTCMonth() + 1;

    const signs = [
      { name: "Береза", from: [12, 24], to: [1, 20] },
      { name: "Горобина", from: [1, 21], to: [2, 17] },
      { name: "Ясен", from: [2, 18], to: [3, 17] },
      { name: "Вільха", from: [3, 18], to: [4, 14] },
      { name: "Верба", from: [4, 15], to: [5, 12] },
      { name: "Глід", from: [5, 13], to: [6, 9] },
      { name: "Дуб", from: [6, 10], to: [7, 7] },
      { name: "Падуб", from: [7, 8], to: [8, 4] },
      { name: "Ліщина", from: [8, 5], to: [9, 1] },
      { name: "Виноград", from: [9, 2], to: [9, 29] },
      { name: "Плющ", from: [9, 30], to: [10, 27] },
      { name: "Очерет", from: [10, 28], to: [11, 24] },
      { name: "Бузина", from: [11, 25], to: [12, 23] },
    ];

    for (const sign of signs) {
      const [fromMonth, fromDay] = sign.from;
      const [toMonth, toDay] = sign.to;

      if (
        (month === fromMonth && day >= fromDay) ||
        (month === toMonth && day <= toDay)
      ) {
        return sign.name;
      }
    }

    return "Невідомо";
  }

  function getMayanSign(date: string) {
    const signs = [
      "Іміш",
      "Ікʼ",
      "Акʼбаль",
      "Кан",
      "Чікчан",
      "Кімі",
      "Манікʼ",
      "Ламат",
      "Мулук",
      "Ок",
      "Чуен",
      "Ебʼ",
      "Бен",
      "Іш",
      "Мен",
      "Кібʼ",
      "Кабан",
      "Ецнаб",
      "Кавак",
      "Ахау",
    ];

    const base = new Date("2000-01-01").getTime();
    const current = new Date(date).getTime();

    const diff = Math.floor((current - base) / (1000 * 60 * 60 * 24));

    return signs[Math.abs(diff % 20)];
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

function getSlavicSign(dateString: string) {
  const date = new Date(dateString);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const signs = [
    { name: "Вепр", from: [12, 23], to: [1, 20] },
    { name: "Щука", from: [1, 21], to: [2, 20] },
    { name: "Жаба", from: [2, 21], to: [3, 20] },
    { name: "Лис", from: [3, 21], to: [4, 20] },
    { name: "Тур", from: [4, 21], to: [5, 20] },
    { name: "Лось", from: [5, 21], to: [6, 20] },
    { name: "Фініст", from: [6, 21], to: [7, 20] },
    { name: "Кінь", from: [7, 21], to: [8, 20] },
    { name: "Орел", from: [8, 21], to: [9, 20] },
    { name: "Рись", from: [9, 21], to: [10, 20] },
    { name: "Півень", from: [10, 21], to: [11, 20] },
    { name: "Ведмідь", from: [11, 21], to: [12, 22] },
  ];

  return (
    signs.find((sign) => {
      const [fm, fd] = sign.from;
      const [tm, td] = sign.to;

      if (fm > tm) {
        return (
          (month === fm && day >= fd) ||
          (month === tm && day <= td)
        );
      }

      return (
        (month === fm && day >= fd) ||
        (month === tm && day <= td) ||
        (month > fm && month < tm)
      );
    })?.name || "Невідомо"
  );
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
      slavicSign: getSlavicSign(birthDate),

      druidTree: getDruidTreeSign(birthDate),
      mayanSign: getMayanSign(birthDate),

      celticTree: getCelticTreeSign(birthDate),

      numerology: {
        lifePath: getLifePathNumber(birthDate),
        pythagoreanMatrix: buildPythagoreanMatrix(birthDate),

        natal: buildNatalCore({
  birthDate,
  birthTime: body.birthTime,
  latitude: body.latitude,
  longitude: body.longitude,
}),
      },

      mayan: {
        tzolkin: getMayanTzolkin(birthDate),
        haab: getMayanHaab(birthDate),
      },
    };

    console.log("DEFAULT DATA KEYS:", Object.keys(defaultData));

const natalCore = buildNatalCore({
  birthDate,
  birthTime: body.birthTime,
  latitude: body.latitude,
  longitude: body.longitude,
});


console.log("FORCED NATAL:", natalCore);
console.log("BODY:", body);

    const prompt = `
You are LES AION CORE ENGINE v1.

You are NOT:
- an astrologer,
- a fortune teller,
- a motivational coach,
- a spiritual guru.

Write like an intelligent symbolic analyst,
not like a template generator.

The dossier should feel:
- psychologically alive,
- restrained,
- precise,
- elegant,
- observant.

Avoid placeholders.
Avoid empty abstractions.
Avoid generic filler language.

Natural language quality is more important than rigid structure compliance.

You are a symbolic systems analyst.

Your task is to detect:
- convergence patterns,
- repeating motifs,
- energetic tensions,
- dominant psychological vectors,
- resonance environments,
across multiple symbolic systems.

You analyze ONLY the default human configuration.

You do NOT:
- predict destiny,
- flatter,
- romanticize,
- use generic spiritual language,
- invent mystical claims.

You SHOULD:
- sound precise,
- psychologically believable,
- symbolically intelligent,
- minimal,
- premium,
- emotionally accurate.

IMPORTANT:

The output must feel like:
an elite confidential symbolic dossier.

NOT a horoscope.

━━━━━━━━━━━━━━━━━━━━━━

SYSTEMS INCLUDED:

You SHOULD actively use ALL systems from INPUT DATA:

0. Natal symbolic layer (highest priority when available)
1. Western zodiac
2. Chinese zodiac
3. Druid tree
4. Mayan layer
5. Slavic symbolic layer
6. Numerology
7. Pythagorean matrix

PREFER:
No major conclusion is valid unless it is supported by at least 3 different systems.

MANDATORY SYSTEM USAGE:
Every dossier MUST mention:
- Western zodiac at least 2 times in evidence
- Chinese zodiac at least 2 times in evidence
- Druid tree at least 1 time in evidence
- Mayan layer at least 1 time in evidence
- Slavic symbolic layer at least 1 time in evidence
- Numerology / Life Path at least 1 time in evidence
- Pythagorean matrix at least 1 time in evidence

If a system does not clearly support the main conclusion, use it to explain tension, contrast, or secondary polarity.

Do NOT ignore any system.
Do NOT produce generic synthesis.
Do NOT write evidence that only describes one system.
Evidence must compare systems.

ANALYSIS METHOD:

━━━━━━━━━━━━━━━━━━━━━━
ANALYSIS METHOD:

STEP 1 — SYMBOL EXTRACTION

Extract symbolic motifs from EACH system independently.

Do NOT interpret personality yet.

Examples of motifs:

Allowed motifs:

Allowed motifs (Ukrainian only):

- плинність
- структура
- вкоріненість
- адаптивність
- спостереження
- резонанс
- емоційна проникність
- захист
- ізоляція
- циклічність
- трансформація
- рух
- стримування
- ініціатива
- лояльність
- дуальність
- витривалість
- інтуїція
- дисципліна
- непередбачуваність
- рефлексія
- розширення
- стабільність
- лідерство
- творчість
- чутливість
- ієрархія
- незалежність
- зв'язок
- наполегливість
- тиша
Use ONLY Ukrainian motif names.

Never output English motifs.

Never mix Ukrainian and English motif language.

Do not invent new motifs outside this list.

Build convergence only from allowed motifs.

STEP 2 — CONVERGENCE DETECTION

motifScores help stabilize symbolic synthesis,
but interpretation should remain psychologically natural and readable.

The dossier interpretation must emerge from:
- highest motifs,
- motif conflicts,
- motif absence,
- motif asymmetry.

Do not generate synthesis independently from motifScores.

Detect:
- repeating motifs,
- conflicting motifs,
- dominant motifs,
- weak motifs.

A motif becomes significant ONLY if repeated across multiple systems.

STEP 3 — SYSTEM WEIGHTING

STEP 3.5 — MOTIF CLUSTERS

Group motifs into symbolic clusters.

Possible clusters:
- social
- structure
- movement
- perception
- shadow

Clusters represent symbolic geometry,
not personality categories.

The strongest clusters influence:
- Resonant Role
- Primary Polarity
- Shadow Configuration

The dossier should feel like:
a symbolic systems map,
not a personality profile.

After motif scoring:

Identify:
- dominantMotifs should include the strongest 3 to 5 motifs, even if some scores are 3.
- conflictingMotifs (opposed high motifs)
- weakMotifs (score 0-1)

These layers are mandatory.

The entire dossier must emerge from:
- dominant motifs,
- motif conflicts,
- motif asymmetry,
- motif absence.

Weight systems by convergence strength.

Strong convergence:
same motif repeated in 3+ systems.

Weak convergence:
motif appears only once.

STEP 4 — POLARITY DETECTION

Detect tensions:
- emotional vs rational
- movement vs stability
- independence vs connection
- structure vs fluidity
etc.

STEP 5 — SYNTHESIS

ONLY AFTER motif extraction and convergence analysis:
generate psychological interpretation.

Interpretation must emerge from:
- motifs,
- convergence,
- polarity,
- symbolic repetition.

NOT from generic astrology language.

STEP 6 — REALISM FILTER

Avoid:
- mystical clichés,
- inspirational language,
- fake depth,
- generic personality statements.

The dossier must feel:
- analytical,
- precise,
- psychologically believable,
- symbolically coherent,
- intellectually restrained.
━━━━━━━━━━━━━━━━━━━━━━

VERY IMPORTANT RULES:

Do NOT use zodiac signs as direct explanations.

Zodiac signs are evidence sources only.

The real analytical layer is:
- motifs,
- motif convergence,
- motif conflicts,
- motif topology.

motifScores are the core analytical layer of LES AION.

All conclusions must emerge from motifScores.

Never begin analysis from zodiac stereotypes.

Always begin from motif extraction.

DO NOT say:
- "you are special"
- "you are gifted"
- "you have strong intuition"

UNLESS this conclusion is independently repeated across multiple systems.

Every major conclusion must emerge from convergence.

Use language like:
- "repeating motif"
- "convergence pattern"
- "symbolic repetition"
- "dominant vector"
- "internal polarity"
- "resonance tendency"

Avoid:
- mystical clichés,
- vague spirituality,
- emotional manipulation.

━━━━━━━━━━━━━━━━━━━━━━

INPUT DATA:
${JSON.stringify(defaultData, null, 2)}

━━━━━━━━━━━━━━━━━━━━━━
LANGUAGE RULE:

All output text MUST be written in Ukrainian.

Do NOT use English inside descriptions.
English is allowed ONLY for JSON keys.

━━━━━━━━━━━━━━━━━━━━━━
EVIDENCE RULE:

Do not append Druid, Mayan or Slavic systems artificially.

They must influence:
- convergence,
- polarity,
- resonance role,
or shadow configuration.

Every evidence item must have this structure:

"Мотив [патерн] повторюється / контрастує у [System 1] ([value]), [System 2] ([value]) та [System 3] ([value]); це створює [convergence / polarity] навколо теми [theme]."

Evidence must be comparative.
Evidence blocks should sound like symbolic analysis,
not astrology explanation.
Avoid evidence written as isolated system statements.

BAD:
"Western zodiac indicates sensitivity."

GOOD:
"Мотив чутливості повторюється між Рибами, водним елементом Chinese zodiac та topology motifs емоційної проникності й зв’язку."

Evidence should describe symbolic interaction.

Evidence must explain:
- how systems reinforce each other,
- where motifs repeat,
- where tensions emerge,
- how topology influences interpretation.

Avoid:
- isolated system descriptions,
- horoscope explanations,
- direct zodiac interpretations.

Evidence should sound like:
symbolic systems analysis.

GOOD:
"Мотив емоційної проникності посилюється між Рибами, водним елементом Chinese zodiac та topology-зв’язкою чутливість ↔ зв’язок."

BAD:
"Риби означають чутливість."

MANDATORY:
- Core Frequency evidence: at least 4 systems.
- Primary Polarity evidence: at least 3 systems.
- Resonant Role evidence: at least 3 systems, including Slavic symbolic layer OR Druid tree.
- Shadow Configuration evidence: at least 3 systems.
- First Alignment Vector evidence: at least 2 systems.

ALL visible output must be fully Ukrainian.

This includes:
- motifs
- topology
- evidence
- labels
- roles
- polarity
- synthesis
- convergence language

English is allowed ONLY for JSON keys.

JSON keys remain English.

━━━━━━━━━━━━━━━━━━━━━━
Before generating interpretation, calculate motif intensity.

Each motif in motifScores MUST contain an integer from 0 to 5.

Example:

"motifScores": {
  "чутливість": 4,
  "емоційна проникність": 5,
  "зв'язок": 3
}

Do not leave motifScores empty.
Do not use strings instead of numbers.
Do not omit scores for dominant motifs.

Every dominant motif must also exist inside motifScores.

0 = absent
1 = weak
2 = present
3 = repeated
4 = dominant
5 = core convergence

Use ONLY allowed motifs.

Generate motif scores BEFORE synthesis.

motifScores are required computational data,
not optional narrative metadata.

Natal layer interpretation priority:

If natal.available = true:
- use Sun sign as conscious identity layer,
- Moon sign as emotional operating layer,
- Ascendant as external interface layer.

Natal convergence has higher symbolic weight
than simplified zodiac systems.

If natal.available = true:

You MUST explicitly reference:
- Sun sign,
- Moon sign,
- Ascendant

inside:
- Core Frequency,
- Primary Polarity,
- or Resonant Role.

Natal layer cannot be ignored when available.

At least one evidence block MUST explain:
- how natal layer reinforces,
- modifies,
- or contradicts
the symbolic topology.

Do not explain natal astrology traditionally.

Use natal data as symbolic topology signals.

When natal data is available,
evidence should include convergence or tension
between:
- natal layer,
- symbolic motifs,
- polarity axes,
- resonance role.

OUTPUT JSON ONLY.

Do not use placeholder phrases.

Forbidden output phrases:
- справжній сигнал
- шум
- конкретний збіг
- головна внутрішня напруга
- роль, що виникає з повторів між системами
- як система поводиться під перевантаженням
- мінімальний реалістичний вектор вирівнювання

Every field must contain concrete content derived from INPUT DATA.

If a field cannot be supported, write a restrained concrete synthesis, not a placeholder.
{
  "title": "LES AION v1 DOSSIER",
"motifScores": {
  "fluidity": 0,
  "structure": 0,
  "rootedness": 0,
  "adaptability": 0,
  "observation": 0,
  "resonance": 0,
  "emotional permeability": 0,
  "protection": 0,
  "isolation": 0,
  "cyclicality": 0,
  "transformation": 0,
  "movement": 0,
  "containment": 0,
  "initiative": 0,
  "loyalty": 0,
  "duality": 0,
  "endurance": 0,
  "intuition": 0,
  "discipline": 0,
  "unpredictability": 0,
  "reflection": 0,
  "expansion": 0,
  "stability": 0,
  "leadership": 0,
  "creativity": 0,
  "sensitivity": 0,
  "hierarchy": 0,
  "independence": 0,
  "connection": 0,
  "persistence": 0,
  "silence": 0
  "dominantMotifs": [],
"conflictingMotifs": [],
"weakMotifs": [],
"motifClusters": {
  "social": [],
  "structure": [],
  "movement": [],
  "perception": [],
  "shadow": []
},

Avoid single-motif domination.

A valid dossier should normally contain:
- 3 to 5 dominant motifs,
- 1 to 2 polarity axes,
- at least one stabilizing motif,
- at least one destabilizing motif.

Do not reduce the whole configuration to one motif.
If one motif is strongest, explain what supports it, what balances it, and what distorts it.

  "coreFrequency": {
    "summary": "щільний синтез українською",
    "evidence": [
      "Western zodiac: конкретний збіг",
      "Chinese zodiac: конкретний збіг",
      "Numerology / Pythagorean matrix: конкретний збіг"
    ],
    "signals": [
      "повторюваний сигнал",
      "повторюваний сигнал",
      "повторюваний сигнал"
    ]
  },

  "defaultOperatingSystem": {
    "description": "як ця конфігурація природно працює",
    "evidence": [
      "система 1: що саме вказує",
      "система 2: що саме вказує",
      "система 3: що саме вказує"
    ],
    "strEVIDEengths": [
      "природна сила",
      "природна сила",
      "природна сила"
    ]
  },

  "primaryPolarity": {
    "description": "головна внутрішня напруга",
    "evidence": [
      "звідки береться полюс 1",
      "звідки береться полюс 2"
    ],
    "poles": [
      "полюс",
      "полюс"
    ]
  },

  "energyDynamics": {
    "charges": [
      "що заряджає",
      "що заряджає",
      "що заряджає"
    ],
    "leaks": [
      "що виснажує",
      "що виснажує",
      "що виснажує"
    ],
    "evidence": [
      "які системи показують джерела енергії",
      "які системи показують витоки енергії"
    ]
  },

  "naturalResonanceField": {
    "description": "де ця конфігурація розкривається",
    "evidence": [
      "система 1: середовище",
      "система 2: середовище"
    ],
    "environments": [
      "середовище",
      "середовище",
      "середовище"
    ]
  },

  "resonantRole": {
    "name": "2-4 слова",
    "symbol": "один символ",
    "description": "роль, що виникає з повторів між системами",
    "evidence": [
      "Western zodiac: внесок у роль",
      "Chinese zodiac: внесок у роль",
      "Numerology / matrix: внесок у роль"
    ]
  },

  "shadowConfiguration": {
    "description": "як система поводиться під перевантаженням",
    "evidence": [
      "яка система вказує на цей shadow-pattern",
      "яка система підсилює цей shadow-pattern"
    ],
    "patterns": [
      "тіньовий патерн",
      "тіньовий патерн",
      "тіньовий патерн"
    ]
  },

  "signalVsNoise": {
    "signal": [
      "справжній сигнал",
      "справжній сигнал",
      "справжній сигнал"
    ],
    "noise": [
      "шум",
      "шум",
      "шум"
    ]
  },

  "firstAlignmentVector": {
    "description": "мінімальний реалістичний вектор вирівнювання",
    "evidence": [
      "чому саме цей крок випливає з карти"
    ]
  },
}
`;
console.log("DEFAULT DATA:", defaultData);
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

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedReport = JSON.parse(cleaned);

const factoryVectors = calculateFactoryVectors({
  sun: natalCore.sun,
  moon: natalCore.moon,
  ascendant: natalCore.ascendant,
});

const vectorSources = explainTopVectorSources(
  {
    sun: natalCore.sun,
    moon: natalCore.moon,
    ascendant: natalCore.ascendant,
  },
  factoryVectors,
);

const mirror = buildMirror(factoryVectors);
const finalReport = {
  ...parsedReport,
  DEBUG_API_VERSION: "MIRROR_ENGINE_V1",
  natal: natalCore,
  factoryVectors,
  mirror,
  vectorSources,
  rawDefaultData: defaultData,
};

    console.log("FINAL REPORT NATAL:", finalReport.natal);
    console.log("FACTORY VECTORS:", finalReport.factoryVectors);
    console.log("FINAL REPORT KEYS:", Object.keys(finalReport));

    return NextResponse.json(finalReport);
  } catch (error) {
    console.error("DOSSIER ERROR:", error);

    return NextResponse.json(
      {
        error: "Не вдалося створити LES AION DOSSIER",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}