export type Sign =
  | "Aries" | "Taurus" | "Gemini" | "Cancer"
  | "Leo" | "Virgo" | "Libra" | "Scorpio"
  | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export type VectorKey =
  | "freedom"
  | "stability"
  | "meaning"
  | "recognition"
  | "belonging"
  | "exploration"
  | "patterns"
  | "details"
  | "bridging"
  | "peopleSensitivity"
  | "changeComfort";

export const VECTOR_LABELS: Record<VectorKey, string> = {
  freedom: "Потреба у свободі",
  stability: "Потреба у стабільності",
  meaning: "Потреба у сенсі",
  recognition: "Потреба у визнанні",
  belonging: "Потреба у приналежності",
  exploration: "Схильність досліджувати нове",
  patterns: "Схильність шукати закономірності",
  details: "Схильність помічати деталі",
  bridging: "Схильність поєднувати людей та ідеї",
  peopleSensitivity: "Чутливість до людей",
  changeComfort: "Комфортність щодо змін",
};

export const SIGN_VECTOR_MATRIX: Record<Sign, Partial<Record<VectorKey, number>>> = {
  Aries: {
    freedom: 3,
    changeComfort: 3,
    exploration: 2,
    recognition: 1,
  },
  Taurus: {
    stability: 3,
    belonging: 2,
    details: 2,
    meaning: 1,
    changeComfort: -2,
  },
  Gemini: {
    exploration: 3,
    patterns: 2,
    bridging: 2,
    changeComfort: 2,
    freedom: 1,
  },
  Cancer: {
    belonging: 3,
    peopleSensitivity: 3,
    stability: 2,
    meaning: 1,
    changeComfort: -1,
  },
  Leo: {
    recognition: 3,
    freedom: 2,
    bridging: 1,
    changeComfort: 1,
    meaning: 1,
  },
  Virgo: {
    details: 3,
    patterns: 2,
    stability: 2,
    meaning: 1,
    peopleSensitivity: 1,
  },
  Libra: {
    bridging: 3,
    peopleSensitivity: 2,
    belonging: 2,
    recognition: 1,
    stability: 1,
  },
  Scorpio: {
    meaning: 3,
    patterns: 3,
    peopleSensitivity: 2,
    exploration: 1,
    freedom: 1,
  },
  Sagittarius: {
    exploration: 3,
    freedom: 3,
    meaning: 2,
    changeComfort: 2,
    patterns: 1,
  },
  Capricorn: {
    stability: 3,
    recognition: 2,
    patterns: 2,
    details: 1,
    meaning: 1,
  },
  Aquarius: {
    exploration: 3,
    freedom: 3,
    bridging: 2,
    changeComfort: 2,
    patterns: 2,
  },
  Pisces: {
    peopleSensitivity: 3,
    meaning: 3,
    belonging: 2,
    bridging: 2,
    patterns: 1,
  },
};

export const PLANET_WEIGHTS = {
  sun: 1.0,
  moon: 1.0,
  ascendant: 0.8,
  mercury: 0.7,
  venus: 0.7,
  mars: 0.7,
} as const;

export type NatalCore = {
  sun?: Sign;
  moon?: Sign;
  ascendant?: Sign;
  mercury?: Sign;
  venus?: Sign;
  mars?: Sign;
};

export type VectorScore = {
  key: VectorKey;
  label: string;
  score: number;
  level: "🌕" | "🌗" | "🌓" | "🌘" | "🌑";
};

const VECTOR_KEYS: VectorKey[] = Object.keys(VECTOR_LABELS) as VectorKey[];

export function calculateFactoryVectors(natal: NatalCore): VectorScore[] {
  const scores: Record<VectorKey, number> = VECTOR_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<VectorKey, number>);

  for (const [planet, sign] of Object.entries(natal) as [keyof typeof PLANET_WEIGHTS, Sign | undefined][]) {
    if (!sign) continue;

    const weight = PLANET_WEIGHTS[planet] ?? 0;
    const signVector = SIGN_VECTOR_MATRIX[sign];

    for (const [key, value] of Object.entries(signVector) as [VectorKey, number][]) {
      scores[key] += value * weight;
    }
  }

  return VECTOR_KEYS
    .map((key) => ({
      key,
      label: VECTOR_LABELS[key],
      score: Number(scores[key].toFixed(2)),
      level: normalizeVectorScore(scores[key]),
    }))
    .sort((a, b) => b.score - a.score);
}

export function normalizeVectorScore(score: number): VectorScore["level"] {
  if (score >= 6) return "🌕";
  if (score >= 4) return "🌗";
  if (score >= 2) return "🌓";
  if (score > 0) return "🌘";
  return "🌑";
}
export type VectorSourceExplanation = {
  vectorKey: VectorKey;
  vectorLabel: string;
  total: number;
  sources: {
    source: string;
    sign: Sign;
    score: number;
  }[];
};

export function explainTopVectorSources(
  natal: NatalCore,
  topVectors: VectorScore[],
): VectorSourceExplanation[] {
  return topVectors.slice(0, 3).map((vector) => {
    const sources: VectorSourceExplanation["sources"] = [];

    const items: { source: string; sign?: Sign; weight: number }[] = [
      { source: "Сонце", sign: natal.sun, weight: PLANET_WEIGHTS.sun },
      { source: "Місяць", sign: natal.moon, weight: PLANET_WEIGHTS.moon },
      { source: "Асцендент", sign: natal.ascendant, weight: PLANET_WEIGHTS.ascendant },
      { source: "Меркурій", sign: natal.mercury, weight: PLANET_WEIGHTS.mercury },
      { source: "Венера", sign: natal.venus, weight: PLANET_WEIGHTS.venus },
      { source: "Марс", sign: natal.mars, weight: PLANET_WEIGHTS.mars },
    ];

    for (const item of items) {
      if (!item.sign) continue;

      const rawScore = SIGN_VECTOR_MATRIX[item.sign]?.[vector.key] ?? 0;
      const score = Number((rawScore * item.weight).toFixed(2));

      if (score !== 0) {
        sources.push({
          source: item.source,
          sign: item.sign,
          score,
        });
      }
    }

    return {
      vectorKey: vector.key,
      vectorLabel: vector.label,
      total: Number(
        sources.reduce((sum, item) => sum + item.score, 0).toFixed(2),
      ),
      sources,
    };
  });
}