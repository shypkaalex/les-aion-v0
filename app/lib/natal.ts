import { Origin, Horoscope } from "circular-natal-horoscope-js";

export type NatalInput = {
  birthDate: string;
  birthTime?: string | null;
  latitude?: string | null;
  longitude?: string | null;
};

const SIGN_UA: Record<string, string> = {
  Aries: "Овен",
  Taurus: "Телець",
  Gemini: "Близнюки",
  Cancer: "Рак",
  Leo: "Лев",
  Virgo: "Діва",
  Libra: "Терези",
  Scorpio: "Скорпіон",
  Sagittarius: "Стрілець",
  Capricorn: "Козоріг",
  Aquarius: "Водолій",
  Pisces: "Риби",
};

export function buildNatalCore(input: NatalInput) {
  const hasFullNatalData =
    input.birthDate &&
  input.birthTime &&
  input.latitude !== undefined &&
  input.latitude !== "" &&
  input.longitude !== undefined &&
  input.longitude !== "";

  console.log("NATAL INPUT:", input);
  if (!hasFullNatalData) {
    return {
      available: false,
      note: "Натальний шар неповний.",
    };
  }

  const [year, month, day] = input.birthDate.split("-").map(Number);
  const [hour, minute] = (input.birthTime || "12:00").split(":").map(Number);

  const origin = new Origin({
    year,
    month: month - 1,
    date: day,
    hour,
    minute,
    latitude: Number(input.latitude),
    longitude: Number(input.longitude),
  });

  const horoscope = new Horoscope({ origin });

  return {
  available: true,
  sun: horoscope.CelestialBodies?.sun?.Sign?.label || null,
  moon: horoscope.CelestialBodies?.moon?.Sign?.label || null,
  ascendant: horoscope.Ascendant?.Sign?.label || null,
  summary: `${horoscope.CelestialBodies?.sun?.Sign?.label || "?"} / ${
    horoscope.CelestialBodies?.moon?.Sign?.label || "?"
  } / ASC ${horoscope.Ascendant?.Sign?.label || "?"}`,
};
}
