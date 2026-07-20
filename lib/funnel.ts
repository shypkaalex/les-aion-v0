export const situationLabels = {
  role: "Попередня професійна роль більше не працює",
  abroad: "Після переїзду доводиться починати заново",
  experience: "Досвід є, але його нова форма неясна",
  ideas: "Ідей багато, але немає одного фокусу",
  project: "Є задум, але бракує системи та команди",
} as const;

export const goalLabels = {
  direction: "Обрати новий професійний напрям",
  practice: "Створити консультаційну практику або послугу",
  product: "Реалізувати продукт, книгу або проєкт",
  return: "Підготувати наступний етап в Україні або за кордоном",
  clarity: "Повернути ясність і відчуття власного шляху",
} as const;

export const obstacleLabels = {
  focus: "Не можу обрати головне",
  confidence: "Сумніваюся у цінності свого досвіду",
  skills: "Бракує технічних або допоміжних навичок",
  energy: "Немає стабільної енергії рухатися",
  structure: "Не розумію послідовність кроків",
} as const;

export type SituationKey = keyof typeof situationLabels;
export type GoalKey = keyof typeof goalLabels;
export type ObstacleKey = keyof typeof obstacleLabels;

export type FunnelSubmission = {
  name: string;
  email: string;
  country: string;
  experience: string;
  situation: SituationKey;
  goal: GoalKey;
  obstacle: ObstacleKey;
  aiReadiness: number;
  urgency: number;
  note?: string;
  source?: string;
  consent: boolean;
};

export type FunnelResult = {
  segment: "navigator" | "repositioning" | "creator" | "returner";
  segmentTitle: string;
  summary: string;
  support: string;
  risk: string;
  firstStep: string;
  readiness: "exploring" | "warm" | "ready";
  score: number;
};

export function assessSubmission(input: FunnelSubmission): FunnelResult {
  const score = Math.min(100, 35 + input.urgency * 8 + input.aiReadiness * 5 + (input.note?.trim() ? 10 : 0));
  const readiness = score >= 76 ? "ready" : score >= 58 ? "warm" : "exploring";

  if (input.situation === "abroad" || input.goal === "return") {
    return {
      segment: "returner",
      segmentTitle: "Перехід без обнулення",
      summary: "Ваше завдання — не відмовитися від попереднього життя, а перенести його найціннішу частину в нові обставини.",
      support: "Опорою може стати досвід, який залишається корисним незалежно від країни, посади чи формального статусу.",
      risk: "Головний ризик — погодитися з думкою, що нове середовище автоматично знецінює все, що ви вже вмієте.",
      firstStep: "Запишіть три ситуації, у яких ваш попередній досвід заощадив іншій людині час, гроші або складне рішення.",
      readiness,
      score,
    };
  }

  if (input.goal === "product" || input.situation === "project") {
    return {
      segment: "creator",
      segmentTitle: "Від задуму до системи",
      summary: "У вас уже є матеріал для нового результату. Зараз потрібні не додаткові ідеї, а одна обрана конструкція та послідовність дій.",
      support: "Вашою опорою є здатність бачити можливість і накопичений зміст, який можна перетворити на продукт або проєкт.",
      risk: "Головний ризик — розширювати задум швидше, ніж з’являється перший завершений результат.",
      firstStep: "Опишіть першу версію задуму одним реченням: кому вона допомагає, з якою проблемою і який результат створює.",
      readiness,
      score,
    };
  }

  if (input.situation === "experience" || input.goal === "practice") {
    return {
      segment: "repositioning",
      segmentTitle: "Нова форма вашого досвіду",
      summary: "Ваш наступний етап може будуватися не на новій професії з нуля, а на новому способі передавати те, що ви вже знаєте.",
      support: "Опорою є практичне судження: те, що ви бачите швидше за менш досвідчену людину і можете допомогти їй не пройти зайве коло помилок.",
      risk: "Головний ризик — описувати себе переліком посад замість конкретної користі для іншої людини.",
      firstStep: "Сформулюйте одну дорогу помилку, якої ви можете допомогти іншій людині уникнути завдяки своєму досвіду.",
      readiness,
      score,
    };
  }

  return {
    segment: "navigator",
    segmentTitle: "Навігація наступного етапу",
    summary: "Вам не обов’язково вже знати остаточну відповідь. Спочатку потрібно відділити власний напрям від зовнішнього шуму й надлишку можливостей.",
    support: "Опорою може стати повторювана тема: питання або заняття, до якого ви повертаєтесь навіть без зовнішнього примусу.",
    risk: "Головний ризик — чекати абсолютної впевненості до того, як зроблено першу маленьку перевірку в реальному житті.",
    firstStep: "Виберіть одну ідею, яку можна безпечно перевірити розмовою або маленькою дією протягом найближчих 24 годин.",
    readiness,
    score,
  };
}
