import Image from "next/image";
import Link from "next/link";
import TransitionMirror from "@/components/funnel/transition-mirror";

const phases = [
  {
    number: "01",
    title: "Побачити свою основу",
    text: "Відокремити власні сильні сторони, досвід і внутрішні опори від ролей, які вже перестали працювати.",
    result: "Персональне досьє",
    href: "/shlyah/povernennya-do-sebe",
  },
  {
    number: "02",
    title: "Обрати напрям",
    text: "Зібрати розрізнені бажання й можливості в одну зрозумілу ціль наступного етапу.",
    result: "Ясна ціль",
    href: "/shlyah/yasnist",
  },
  {
    number: "03",
    title: "Знайти живий інтерес",
    text: "Визначити, що дає енергію рухатися без постійного примусу й боротьби із собою.",
    result: "Внутрішнє паливо",
    href: "/shlyah/interes",
  },
  {
    number: "04",
    title: "Створити ШІ-команду",
    text: "Підібрати цифрових помічників під вашу ціль, досвід і звичний спосіб мислення.",
    result: "Персональний ШІ-оркестр",
    href: "/shlyah/orkestruvannya-shi",
  },
  {
    number: "05",
    title: "Довести до результату",
    text: "Перетворити задум на конкретний продукт, практику, книгу, систему або інший вимірюваний результат.",
    result: "Реалізований задум",
    href: "/shlyah/rezultat",
  },
];

const situations = [
  "Старий професійний шлях більше не відчувається моїм",
  "Після переїзду я не хочу починати життя з нуля",
  "У мене багато досвіду, але я не бачу його нової форми",
  "Є кілька сильних ідей, але немає одного фокусу",
  "Я хочу використати ШІ для власного задуму, а не заради ШІ",
  "Я відчуваю готовність до нового етапу, але не знаю першого кроку",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link href="#top" className="brand" aria-label="LES AION — на початок">
          LES AION
        </Link>
        <nav aria-label="Головна навігація">
          <Link href="#for-whom">Для кого</Link>
          <Link href="#method">Метод</Link>
          <Link href="#author">Автор</Link>
          <Link href="#mirror" className="nav-cta">Почати</Link>
        </nav>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Метод LES AION · Повернення до Себе</p>
          <h1>Не починайте наступний етап <em>із нуля.</em></h1>
          <p className="hero-lead">
            Зберіть свій досвід, здібності та ідеї в один власний напрям.
            Створіть персональну команду ШІ й доведіть задум до реального результату.
          </p>
          <div className="hero-actions">
            <Link href="#mirror" className="button button-primary">Побачити мою точку переходу</Link>
            <Link href="#method" className="text-link">Як працює Метод <span>↓</span></Link>
          </div>
          <p className="microcopy">Без діагнозів і готових ярликів · 7–10 хвилин · українською</p>
        </div>
        <aside className="hero-aside">
          <p>LES AION працює з моментом, коли</p>
          <blockquote>«Я знаю, що здатен на більше, але не бачу, куди спрямувати свій досвід».</blockquote>
          <div className="route-line" aria-hidden="true" />
          <ul>
            <li>внутрішня опора</li>
            <li>ясний напрям</li>
            <li>ШІ-команда</li>
            <li>реальний результат</li>
          </ul>
        </aside>
      </section>

      <section id="for-whom" className="section-shell section-block">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Можливо, ви зараз тут</p>
            <h2>Старий шлях уже змінився.<br />Новий ще не став ясним.</h2>
          </div>
          <p>
            LES AION створений для досвідчених людей у професійному або життєвому переході —
            в Україні й за кордоном.
          </p>
        </div>
        <div className="situation-grid">
          {situations.map((situation, index) => (
            <article key={situation}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{situation}</p>
            </article>
          ))}
        </div>
        <div className="recognition-strip">
          <strong>Вам не бракує досвіду.</strong>
          <p>Можливо, йому потрібні новий фокус, нова форма і правильні інструменти.</p>
          <Link href="#mirror" className="text-link">Перевірити мою ситуацію →</Link>
        </div>
      </section>

      <section id="method" className="method-section section-block">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Від невизначеності до дії</p>
            <h2>П’ять фаз одного особистого маршруту</h2>
            <p>Самопізнання тут не є кінцевою точкою. Воно стає основою для рішення, системи й результату.</p>
          </div>
          <div className="phase-list">
            {phases.map((phase) => (
              <Link href={phase.href} key={phase.number} className="phase-card">
                <span className="phase-number">{phase.number}</span>
                <div>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </div>
                <strong>{phase.result}</strong>
                <span className="phase-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-statement section-shell section-block">
        <p className="eyebrow">Людина + ШІ</p>
        <div>
          <h2>ШІ не вирішує, ким вам бути.</h2>
          <p>Спочатку ви визначаєте власний напрям. Потім технологія допомагає пройти шлях, для якого раніше могли знадобитися ціла команда, технічні навички й значний бюджет.</p>
        </div>
        <div className="ai-principles">
          <span>Ви — автор</span>
          <span>ШІ — команда</span>
          <span>Результат — у реальному житті</span>
        </div>
      </section>

      <section id="mirror" className="mirror-section section-block">
        <div className="section-shell mirror-intro">
          <div>
            <p className="eyebrow">Перший крок</p>
            <h2>Дзеркало переходу LES AION</h2>
          </div>
          <p>
            Дайте відповіді на кілька запитань. Ви отримаєте коротке відображення своєї точки переходу,
            головної опори, ризику розфокусу та наступного кроку. Це не тест і не діагноз.
          </p>
        </div>
        <TransitionMirror />
      </section>

      <section id="author" className="section-shell author-section section-block">
        <div className="author-image-wrap">
          <Image src="/les-alc.png" alt="Лес Шипка — автор Методу LES AION" width={900} height={600} className="author-image" />
          <a href="https://alexlogos.consulting" target="_blank" rel="noreferrer" className="image-link">Alex Logos Consulting ↗</a>
        </div>
        <div className="author-copy">
          <p className="eyebrow">Автор Методу · Лес Шипка</p>
          <h2>Цей шлях народився не з теорії.</h2>
          <p className="author-lead">Він почався з особистої кризи й простого запитання: «хто я насправді?»</p>
          <p>Крок за кроком Лес збирав себе, формував ясність, знаходив живий інтерес і вчився співпрацювати зі штучним інтелектом. Результатом стали Метод LES AION, книга «Повернення до Себе» та Alex Logos Consulting.</p>
          <blockquote>«Я не скажу вам, ким бути. Я допоможу побачити, що у вас уже є, обрати власний напрям і зібрати інструменти для його реалізації».</blockquote>
          <Link href="#mirror" className="button button-secondary">Почати з Дзеркала переходу</Link>
        </div>
      </section>

      <section className="final-cta section-shell">
        <p className="eyebrow">Ваш наступний етап</p>
        <h2>Не шукати ще одну чужу відповідь.<br /><em>Побачити власний напрям.</em></h2>
        <Link href="#mirror" className="button button-primary">Розпочати з першого кроку</Link>
      </section>

      <footer className="site-footer">
        <div>
          <strong>LES AION</strong>
          <p>Повернення до Себе · Ясність · Інтерес · ШІ · Результат</p>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Конфіденційність</Link>
          <Link href="/terms">Умови</Link>
          <a href="https://alexlogos.consulting" target="_blank" rel="noreferrer">Alex Logos Consulting</a>
        </div>
      </footer>
    </main>
  );
}
