import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#08111f] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)'}} />
      </div>
      <section id="method" className="relative max-w-6xl mx-auto px-8 py-32">
  <Image
    src="/les-aion-logo.svg"
    alt="LES AION Logo"
    width={90}
    height={90}
    className="mb-6"
  />

  <p
    className="text-xs tracking-[0.35em] uppercase mb-4"
    style={{ color: "rgba(201,168,76,0.75)" }}
  >
    Метод LES AION
  </p>

  <h1
    className="text-5xl md:text-7xl font-bold tracking-[0.08em] mb-6"
    style={{ color: "#c9a84c" }}
  >
    Повернення до Себе
  </h1>

  <p
    className="text-xl md:text-2xl leading-relaxed mb-5 max-w-3xl"
    style={{ color: "rgba(255,255,255,0.78)" }}
  >
    Головний навик людини в епоху штучного інтелекту
  </p>

  <div
    className="w-24 h-px mb-6"
    style={{
      background:
        "linear-gradient(to right, transparent, rgba(201,168,76,0.7), transparent)",
    }}
  />

  <p
    className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
    style={{ color: "rgba(255,255,255,0.58)" }}
  >
    П’ятифазний шлях, який допомагає знайти ясність, перетворити
    інтерес на паливо, навчитися працювати з ШІ та створити реальний
    результат у житті.
  </p>

  <a
  href="https://forms.gle/CtPXnQefCSi7RWHX6"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-full px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber-400/10 hover:text-white"
  style={{
    border: "1px solid rgba(201,168,76,0.6)",
    color: "#c9a84c",
  }}
>
  Розпочати шлях →
</a>
</section>n

<section
  id="method"
  className="max-w-6xl mx-auto px-8 py-32"
>
  <div className="text-center mb-20">
    <p
      className="text-sm uppercase tracking-[0.3em] mb-4"
      style={{ color: "rgba(201,168,76,0.7)" }}
    >
      Метод LES AION
    </p>

    <h2
      className="text-4xl md:text-6xl font-bold mb-6"
      style={{ color: "#c9a84c" }}
    >
      П'ять фаз трансформації
    </h2>

    <p
      className="max-w-3xl mx-auto text-lg leading-relaxed"
      style={{ color: "rgba(255,255,255,0.65)" }}
    >
      Від втрати себе до реального результату через
      партнерство людини та штучного інтелекту.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        number: "01",
        title: "Повернення до Себе",
        text: "Відновлення контакту зі своїми справжніми бажаннями, цінностями та сильними сторонами.",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "02",
        title: "Ясність",
        text: "Формування чіткого бачення свого напрямку та майбутнього.",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "03",
        title: "Інтерес",
        text: "Пошук внутрішнього джерела енергії та мотивації.",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "04",
        title: "Оркестрування ШІ",
        text: "Навчання співпраці зі штучним інтелектом як єдиною системою.",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "05",
        title: "Результат",
        text: "Перетворення внутрішніх змін на реальні результати у житті.",
        link: "/shlyah/povernennya-do-sebe",
      },
    ].map((phase) => (
  <Link
    key={phase.number}
    href={phase.link}
  >
    <div
      className="rounded-3xl p-6 border h-full transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "rgba(201,168,76,0.15)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
        <div
          className="text-sm mb-4"
          style={{ color: "#c9a84c" }}
        >
          {phase.number}
        </div>

        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "#c9a84c" }}
        >
          {phase.title}
        </h3>

        <p
  className="text-sm leading-relaxed"
  style={{ color: "rgba(255,255,255,0.65)" }}
>
  {phase.text}
</p>

<p
  className="mt-6 text-sm"
  style={{ color: "#c9a84c" }}
>
  Детальніше →
</p>

</div>
</Link>
))
}
  </div>
</section>

<section className="max-w-6xl mx-auto px-8 py-32">
  <div className="max-w-4xl">
    <p
      className="text-sm uppercase tracking-[0.3em] mb-4"
      style={{ color: "rgba(201,168,76,0.7)" }}
    >
      Чому це важливо
    </p>

    <h2
      className="text-4xl md:text-6xl font-bold mb-10"
      style={{ color: "#c9a84c" }}
    >
      Багато людей сьогодні почуваються загубленими
    </h2>

    <p
      className="text-xl leading-relaxed mb-10"
      style={{ color: "rgba(255,255,255,0.78)" }}
    >
      Світ змінився швидше, ніж ми встигли до нього підготуватися.
      Старі карти більше не працюють, а нові ще не сформовані.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-6 mt-16">
    {[
      "Ви відчуваєте, що живете не зовсім своїм життям.",
      "У вас багато думок та ідей, але мало ясного руху.",
      "Ви не можете чітко відповісти, чого хочете насправді.",
      "Вас одночасно захоплює і лякає розвиток ШІ.",
      "Ви відчуваєте, що здатні на більше, але не знаєте, з чого почати.",
      "Ви стоїте на порозі змін і потребуєте нового внутрішнього компаса.",
    ].map((item) => (
      <div
        key={item}
        className="rounded-3xl p-6 border"
        style={{
          borderColor: "rgba(201,168,76,0.15)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <p
          className="text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {item}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-16 max-w-3xl">
    <p
      className="text-2xl leading-relaxed"
      style={{ color: "#c9a84c" }}
    >
      Якщо ви впізнали себе хоча б в одному з цих пунктів,
      можливо, настав час повернутися до себе.
    </p>
  </div>
</section>

<section className="max-w-6xl mx-auto px-8 py-32">
  <div className="max-w-4xl">
    <p
      className="text-sm uppercase tracking-[0.3em] mb-4"
      style={{ color: "rgba(201,168,76,0.7)" }}
    >
      Інший погляд
    </p>

    <h2
      className="text-4xl md:text-6xl font-bold mb-10"
      style={{ color: "#c9a84c" }}
    >
      А якщо проблема не у вас?
    </h2>

    <p
      className="text-xl leading-relaxed mb-8"
      style={{ color: "rgba(255,255,255,0.78)" }}
    >
      Багато людей роками звинувачують себе.
    </p>

    <p
      className="text-lg leading-relaxed mb-8"
      style={{ color: "rgba(255,255,255,0.65)" }}
    >
      Недостатньо дисципліни.
      Недостатньо знань.
      Недостатньо мотивації.
      Недостатньо сили волі.
    </p>

    <p
      className="text-lg leading-relaxed mb-8"
      style={{ color: "rgba(255,255,255,0.65)" }}
    >
      Але що, якщо проблема не в людині?
    </p>

    <p
      className="text-lg leading-relaxed mb-12"
      style={{ color: "rgba(255,255,255,0.65)" }}
    >
      Що, якщо більшість із нас просто ніхто не вчив жити у світі,
      який існує сьогодні?
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-8 mb-16">
    <div
      className="rounded-3xl p-8 border"
      style={{
        borderColor: "rgba(201,168,76,0.15)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <h3
        className="text-2xl font-semibold mb-6"
        style={{ color: "#c9a84c" }}
      >
        Нас вчили
      </h3>

      <ul
        className="space-y-4 text-lg"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        <li>✓ Отримати освіту</li>
        <li>✓ Знайти стабільну роботу</li>
        <li>✓ Бути зручними для системи</li>
        <li>✓ Не помилятися</li>
        <li>✓ Пристосовуватися</li>
      </ul>
    </div>

    <div
      className="rounded-3xl p-8 border"
      style={{
        borderColor: "rgba(201,168,76,0.15)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <h3
        className="text-2xl font-semibold mb-6"
        style={{ color: "#c9a84c" }}
      >
        Але нас не вчили
      </h3>

      <ul
        className="space-y-4 text-lg"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        <li>✓ Повертатися до себе</li>
        <li>✓ Формувати ясність</li>
        <li>✓ Використовувати інтерес як паливо</li>
        <li>✓ Співпрацювати з ШІ</li>
        <li>✓ Будувати власний шлях</li>
      </ul>
    </div>
  </div>

  <div className="max-w-4xl">
    <p
      className="text-2xl md:text-3xl leading-relaxed"
      style={{ color: "#c9a84c" }}
    >
      Саме тому був створений Метод LES AION —
      щоб допомогти людині повернутися до себе та навчитися жити й творити в новій реальності.
    </p>
  </div>
</section>

<section className="max-w-6xl mx-auto px-8 py-32">
  <div className="max-w-4xl">
    <p
      className="text-sm uppercase tracking-[0.3em] mb-4"
      style={{ color: "rgba(201,168,76,0.7)" }}
    >
      Історія автора
    </p>

    <h2
      className="text-4xl md:text-6xl font-bold mb-10"
      style={{ color: "#c9a84c" }}
    >
      Історія Леса
    </h2>

    <p
      className="text-xl leading-relaxed mb-8"
      style={{ color: "rgba(255,255,255,0.78)" }}
    >
      Метод LES AION народився не в університеті.
      Не в корпорації.
      Не в теоретичних дослідженнях.
    </p>

    <p
      className="text-xl leading-relaxed mb-12"
      style={{ color: "rgba(255,255,255,0.78)" }}
    >
      Він народився в реальному житті.
    </p>
  </div>

  <div
    className="rounded-3xl p-10 border mb-16"
    style={{
      borderColor: "rgba(201,168,76,0.15)",
      background: "rgba(255,255,255,0.02)",
    }}
  >
    <p
      className="text-lg leading-relaxed mb-8"
      style={{ color: "rgba(255,255,255,0.7)" }}
    >
      У 2023 році життя Леса опинилося в точці глибокої кризи.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Втрата бізнесу",
        "Розлучення",
        "Повернення до батьківського дому",
        "Лікарня",
      ].map((item) => (
        <div
          key={item}
          className="rounded-2xl p-6 border"
          style={{
            borderColor: "rgba(201,168,76,0.12)",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          <p
            className="text-lg"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  </div>

  <div className="space-y-8 max-w-4xl">
    <p
      className="text-lg leading-relaxed"
      style={{ color: "rgba(255,255,255,0.7)" }}
    >
      Саме тоді почався шлях пошуку відповідей.
    </p>

    <p
      className="text-lg leading-relaxed"
      style={{ color: "rgba(255,255,255,0.7)" }}
    >
      Не успіху.
      Не грошей.
      Не статусу.
    </p>

    <p
      className="text-lg leading-relaxed"
      style={{ color: "rgba(255,255,255,0.7)" }}
    >
      А відповіді на просте питання:
    </p>

    <p
      className="text-3xl md:text-4xl font-semibold"
      style={{ color: "#c9a84c" }}
    >
      Хто я насправді?
    </p>

    <p
      className="text-lg leading-relaxed"
      style={{ color: "rgba(255,255,255,0.7)" }}
    >
      Крок за кроком він повертався до себе.
      Формував ясність.
      Вчився співпрацювати зі штучним інтелектом.
      Будував нову систему життя та роботи.
    </p>
  </div>

  <div
    className="mt-16 rounded-3xl p-10 border"
    style={{
      borderColor: "rgba(201,168,76,0.15)",
      background: "rgba(255,255,255,0.02)",
    }}
  >
    <h3
      className="text-2xl font-semibold mb-8"
      style={{ color: "#c9a84c" }}
    >
      Результатом стали
    </h3>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "LES AION",
        "Книга «Повернення до Себе»",
        "Рада ШІ",
        "Alex Logos Consulting",
        "Міжнародні проєкти",
      ].map((item) => (
        <div
          key={item}
          className="rounded-2xl p-6 border"
          style={{
            borderColor: "rgba(201,168,76,0.12)",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          <p
            className="text-lg"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            ✓ {item}
          </p>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-16 max-w-4xl">
    <p
      className="text-2xl md:text-3xl leading-relaxed"
      style={{ color: "#c9a84c" }}
    >
      Метод LES AION народився не як теорія.
      Він народився як шлях людини, яка сама пройшла через кризу, пошук і трансформацію.
    </p>
  </div>
</section>

<section className="max-w-6xl mx-auto px-8 py-32">
  <div className="text-center mb-16">
    <p
      className="text-sm uppercase tracking-[0.3em] mb-4"
      style={{ color: "rgba(201,168,76,0.7)" }}
    >
      Для кого це
    </p>

    <h2
      className="text-4xl md:text-6xl font-bold mb-8"
      style={{ color: "#c9a84c" }}
    >
      Метод LES AION не для всіх
    </h2>

    <p
      className="text-xl max-w-3xl mx-auto leading-relaxed"
      style={{ color: "rgba(255,255,255,0.75)" }}
    >
      Але якщо ви впізнаєте себе в одному з цих описів,
      можливо, це саме той шлях, який ви шукали.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-8">
    {[
      {
        title: "Людина в точці змін",
        text: "Ви відчуваєте, що поточний етап життя завершився і настав час рухатися далі."
      },
      {
        title: "Той, хто шукає себе",
        text: "Ви хочете зрозуміти свої сильні сторони, цінності та справжній напрямок."
      },
      {
        title: "Людина після кризи",
        text: "Ви пережили втрату, розлучення, вигорання або іншу життєву трансформацію."
      },
      {
        title: "Підприємець",
        text: "У вас є ідеї та амбіції, але бракує ясності щодо наступних кроків."
      },
      {
        title: "Той, кого цікавить ШІ",
        text: "Ви хочете навчитися використовувати штучний інтелект для життя, роботи або власних проєктів."
      },
      {
        title: "Людина, яка відчуває, що здатна на більше",
        text: "Ви знаєте, що ваш потенціал значно більший за поточні результати."
      }
    ].map((item) => (
      <div
        key={item.title}
        className="rounded-3xl p-8 border"
        style={{
          borderColor: "rgba(201,168,76,0.15)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: "#c9a84c" }}
        >
          {item.title}
        </h3>

        <p
          className="text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {item.text}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-20 text-center">
    <p
      className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed"
      style={{ color: "#c9a84c" }}
    >
      Метод створений для людей, які готові взяти відповідальність за своє майбутнє та зробити перший крок.
    </p>
  </div>
</section>

<section className="max-w-6xl mx-auto px-8 py-32">
  <div className="text-center mb-16">
    <p
      className="text-sm uppercase tracking-[0.3em] mb-4"
      style={{ color: "rgba(201,168,76,0.7)" }}
    >
      Що ви отримаєте
    </p>

    <h2
      className="text-4xl md:text-6xl font-bold mb-8"
      style={{ color: "#c9a84c" }}
    >
      Не черговий курс. А шлях.
    </h2>

    <p
      className="text-xl max-w-3xl mx-auto leading-relaxed"
      style={{ color: "rgba(255,255,255,0.75)" }}
    >
      Ви пройдете п’ять фаз Методу LES AION разом з автором і навчитеся
      перетворювати внутрішню ясність на реальні дії.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      "LES AION Dossier",
      "Карта Ясності",
      "Особистий супровід",
      "Практика роботи з ШІ",
      "План наступних кроків",
      "Перший реальний результат",
    ].map((item) => (
      <div
        key={item}
        className="rounded-3xl p-8 border"
        style={{
          borderColor: "rgba(201,168,76,0.15)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <p
          className="text-xl"
          style={{ color: "rgba(255,255,255,0.78)" }}
        >
          ✓ {item}
        </p>
      </div>
    ))}
  </div>
</section>

<section className="max-w-5xl mx-auto px-8 py-32 text-center">
  <p
    className="text-sm uppercase tracking-[0.3em] mb-4"
    style={{ color: "rgba(201,168,76,0.7)" }}
  >
    Перший набір
  </p>

  <h2
    className="text-4xl md:text-6xl font-bold mb-8"
    style={{ color: "#c9a84c" }}
  >
    Ми шукаємо перших учасників
  </h2>

  <p
    className="text-xl leading-relaxed mb-8"
    style={{ color: "rgba(255,255,255,0.75)" }}
  >
    Це не масовий запуск і не автоматизований курс.
  </p>

  <p
    className="text-xl leading-relaxed mb-8"
    style={{ color: "rgba(255,255,255,0.75)" }}
  >
    Це перший практичний набір людей, які пройдуть Метод LES AION разом із Лесом.
  </p>

  <p
    className="text-xl leading-relaxed mb-12"
    style={{ color: "rgba(255,255,255,0.75)" }}
  >
    Мета — не просто навчання. Мета — реальна трансформація, яку можна буде
    побачити, описати й задокументувати.
  </p>

  <div
    className="rounded-3xl p-10 border mb-12"
    style={{
      borderColor: "rgba(201,168,76,0.18)",
      background: "rgba(255,255,255,0.025)",
    }}
  >
    <p
      className="text-2xl md:text-3xl leading-relaxed mb-6"
      style={{ color: "#c9a84c" }}
    >
      Якщо ви відчуваєте, що настав час повернутися до себе,
      можливо, це ваш момент.
    </p>

    <p
      className="text-lg leading-relaxed"
      style={{ color: "rgba(255,255,255,0.68)" }}
    >
      Кількість місць у першому наборі обмежена.
    </p>
  </div>

  <a
  href="https://forms.gle/CtPXnQefCSi7RWHX6"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex rounded-full px-10 py-5 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber-400/10 hover:text-white"
  style={{
    border: "1px solid rgba(201,168,76,0.6)",
    color: "#c9a84c",
  }}
>
  Подати заявку →
</a>
</section>

<footer className="border-t px-8 py-12 text-center"
  style={{ borderColor: "rgba(201,168,76,0.12)" }}
>
  <p
    className="text-sm tracking-[0.3em] uppercase mb-4"
    style={{ color: "#c9a84c" }}
  >
    LES AION
  </p>

  <p
    className="text-sm"
    style={{ color: "rgba(255,255,255,0.45)" }}
  >
    Повернення до Себе · Ясність · Інтерес · ШІ · Результат
  </p>
</footer>

    </main>
  );
}