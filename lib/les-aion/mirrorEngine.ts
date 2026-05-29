import type { VectorScore } from "./factoryEngine";

export type MirrorResult = {
  title: string;
  summary: string;
  strengths: string[];
  nourishes: string[];
  drains: string[];
  tension: string;
  evidence: string[];
  sources: string[];
};

export function buildMirror(factoryVectors: VectorScore[]): MirrorResult {
  const topVectors = factoryVectors.slice(0, 5);
  const topKeys = topVectors.map((v) => v.key);

  return {
    title: "Дзеркало",
    summary: buildMirrorSummary(topKeys),
    strengths: buildStrengths(topKeys),
    nourishes: buildNourishes(topKeys),
    drains: buildDrains(topKeys),
    tension: buildTension(topKeys),
    evidence: topVectors.map((v) => `${v.level} ${v.label}`),
    sources: buildSources(topKeys),
  };
}
function buildSources(keys: string[]): string[] {
  const items: string[] = [];

  if (keys.includes("peopleSensitivity")) {
    items.push("Підсилює чутливість до людей.");
  }

  if (keys.includes("meaning")) {
    items.push("Підсилює потребу у сенсі.");
  }

  if (keys.includes("belonging")) {
    items.push("Підсилює потребу у значущих зв’язках та своєму колі.");
  }

  if (keys.includes("bridging")) {
    items.push("Підсилює схильність поєднувати людей та ідеї.");
  }

  if (keys.includes("patterns")) {
    items.push("Підсилює пошук закономірностей.");
  }

  return items;
}
function buildMirrorSummary(keys: string[]): string {
  if (
    keys.includes("peopleSensitivity") &&
    keys.includes("meaning") &&
    keys.includes("belonging")
  ) {
    return "Вроджена увага цієї конфігурації природно спрямована на людей, значущі зв’язки та пошук сенсу. Така людина тонко відчуває атмосферу, потребує належності до важливого кола і краще розкривається там, де є емоційна глибина.";
  }

  if (
    keys.includes("freedom") &&
    keys.includes("exploration") &&
    keys.includes("changeComfort")
  ) {
    return "Вроджена увага цієї конфігурації природно спрямована на свободу, новий досвід і рух уперед. Така людина краще розкривається там, де є простір для самостійного вибору та змін.";
  }

  if (
    keys.includes("stability") &&
    keys.includes("details") &&
    keys.includes("patterns")
  ) {
    return "Вроджена увага цієї конфігурації природно спрямована на порядок, точність і надійну опору. Така людина краще розкривається там, де є зрозумілі правила, послідовність і можливість бачити структуру.";
  }

  const labels = keys.slice(0, 3).map(humanizeKey).join(", ");

  return `Вроджена конфігурація цієї людини найсильніше проявляється через такі вектори: ${labels}. Це не опис особистості, а базове дзеркало природних схильностей.`;
}

function buildStrengths(keys: string[]): string[] {
  const items: string[] = [];

  if (keys.includes("peopleSensitivity")) {
    items.push("Тонко відчувати людей, настрій і атмосферу.");
  }

  if (keys.includes("meaning")) {
    items.push("Шукати глибший сенс у подіях, стосунках і власних діях.");
  }

  if (keys.includes("belonging")) {
    items.push("Створювати або шукати значуще коло людей.");
  }

  if (keys.includes("bridging")) {
    items.push("Поєднувати людей, ідеї та середовища.");
  }

  if (keys.includes("patterns")) {
    items.push("Бачити закономірності там, де інші бачать окремі факти.");
  }

  if (keys.includes("freedom")) {
    items.push("Самостійно визначати напрямок руху.");
  }

  if (keys.includes("exploration")) {
    items.push("Природно тягнутися до нового досвіду та знань.");
  }

  if (keys.includes("stability")) {
    items.push("Створювати відчуття опори, порядку і передбачуваності.");
  }

  if (keys.includes("details")) {
    items.push("Помічати нюанси, які інші можуть пропустити.");
  }

  if (keys.includes("recognition")) {
    items.push("Відчувати цінність власного внеску і прагнути, щоб він був помічений.");
  }

  if (keys.includes("changeComfort")) {
    items.push("Легше входити в нові умови та не губитися при змінах.");
  }

  return items.slice(0, 5);
}

function buildNourishes(keys: string[]): string[] {
  const items: string[] = [];

  if (keys.includes("peopleSensitivity")) {
    items.push("Живий людський контакт і щира емоційна присутність.");
  }

  if (keys.includes("meaning")) {
    items.push("Справи, у яких зрозуміло навіщо це робиться.");
  }

  if (keys.includes("belonging")) {
    items.push("Відчуття свого кола, дому, команди або спільноти.");
  }

  if (keys.includes("bridging")) {
    items.push("Можливість з’єднувати людей, ідеї та можливості.");
  }

  if (keys.includes("freedom")) {
    items.push("Простір для самостійного вибору.");
  }

  if (keys.includes("exploration")) {
    items.push("Нові теми, нові люди, нові горизонти.");
  }

  if (keys.includes("stability")) {
    items.push("Передбачуване середовище і надійна опора.");
  }

  if (keys.includes("details")) {
    items.push("Задачі, де важлива точність і уважність.");
  }

  if (keys.includes("changeComfort")) {
    items.push("Динамічні середовища, де щось рухається і змінюється.");
  }

  return items.slice(0, 4);
}

function buildDrains(keys: string[]): string[] {
  const items: string[] = [];

  if (keys.includes("peopleSensitivity")) {
    items.push("Груба атмосфера, емоційний шум або постійна напруга між людьми.");
  }

  if (keys.includes("meaning")) {
    items.push("Дії без зрозумілого сенсу або відчуття внутрішньої порожнечі.");
  }

  if (keys.includes("belonging")) {
    items.push("Ізоляція або відчуття, що людина ніде не є своєю.");
  }

  if (keys.includes("bridging")) {
    items.push("Середовище, де люди не хочуть чути одне одного.");
  }

  if (keys.includes("freedom")) {
    items.push("Надмірний контроль і відсутність простору для власного рішення.");
  }

  if (keys.includes("exploration")) {
    items.push("Монотонність без нового досвіду або розвитку.");
  }

  if (keys.includes("stability")) {
    items.push("Хаос, непередбачуваність і постійна зміна правил.");
  }

  if (keys.includes("details")) {
    items.push("Недбалість, поспіх і байдужість до якості.");
  }

  if (keys.includes("changeComfort")) {
    items.push("Застій і відчуття, що нічого не рухається.");
  }

  return items.slice(0, 4);
}

function buildTension(keys: string[]): string {
  if (keys.includes("peopleSensitivity") && keys.includes("freedom")) {
    return "Між потребою відчувати людей і потребою залишатися вільним може виникати внутрішня напруга.";
  }

  if (keys.includes("belonging") && keys.includes("freedom")) {
    return "Між потребою належати до свого кола і потребою самостійно обирати шлях може виникати природна напруга.";
  }

  if (keys.includes("stability") && keys.includes("changeComfort")) {
    return "Між потребою в опорі та комфортністю щодо змін може виникати подвійний рух: хочеться і стабільності, і оновлення.";
  }

  if (keys.includes("meaning") && keys.includes("recognition")) {
    return "Між потребою робити щось значуще і потребою бути поміченим може виникати тонка внутрішня напруга.";
  }

  return "Головна внутрішня напруга цієї конфігурації проявляється між найсильнішими вродженими векторами.";
}

function humanizeKey(key: string): string {
  const map: Record<string, string> = {
    freedom: "потребу у свободі",
    stability: "потребу у стабільності",
    meaning: "потребу у сенсі",
    recognition: "потребу у визнанні",
    belonging: "потребу у приналежності",
    exploration: "схильність досліджувати нове",
    patterns: "схильність шукати закономірності",
    details: "схильність помічати деталі",
    bridging: "схильність поєднувати людей та ідеї",
    peopleSensitivity: "чутливість до людей",
    changeComfort: "комфортність щодо змін",
  };

  return map[key] ?? key;
}