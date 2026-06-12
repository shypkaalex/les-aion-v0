import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#08111f] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)'}} />
      </div>
      <section id="hero" className="relative max-w-4xl mx-auto px-8 py-24">


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
    П’ятифазний Шлях, який допомагає зрозуміти вроджені та набуті таланти, сформувати ясність щодо власних цілей, трансформувати хаотичні бажання в інтерес, навчитись деригувати власною командою ШІ та отримати бажаний реальний
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
</section>

<section
  id="method"
  className="max-w-6xl mx-auto px-8 py-24"
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
      П'ять фаз Методу
    </h2>

    <p
      className="max-w-3xl mx-auto text-lg leading-relaxed"
      style={{ color: "rgba(255,255,255,0.65)" }}
    >
      Від хаосу до результату.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        number: "01",
        title: "Знайомство з Собою",
        text: "Індивідуальність + Особистість",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "02",
        title: "Ясність",
        text: "Наведення фокусу.",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "03",
        title: "Інтерес",
        text: "Генерація внутрішнього палива-мотивації.",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "04",
        title: "Оркестрування ШІ",
        text: "Створення власної ШІ-команди",
        link: "/shlyah/povernennya-do-sebe",
      },
      {
        number: "05",
        title: "Результат",
        text: "Отримання реальних результів у житті.",
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



<section className="max-w-6xl mx-auto px-8 py-24">
  <p
    className="text-sm uppercase tracking-[0.3em] mb-4"
    style={{ color: "rgba(201,168,76,0.7)" }}
  >
    Автор Методу
  </p>

  <h2
    className="text-4xl md:text-6xl font-bold mb-12"
    style={{ color: "#c9a84c" }}
  >
    Лес Шипка
  </h2>

  <div className="grid lg:grid-cols-2 gap-12 items-center">
    <div>
      <Image
        src="/les-alc.png"
        alt="Лес Шипка"
        width={900}
        height={500}
        className="rounded-3xl border w-full max-h-[520px] object-cover object-center"
        style={{ borderColor: "rgba(201,168,76,0.15)" }}
      />

      <a
        href="https://alexlogos.consulting"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6"
        style={{ color: "#c9a84c" }}
      >
        Alex Logos Consulting →
      </a>
    </div>

    <div className="space-y-8">
      <p className="text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
        Метод LES AION народився у реальному житті у пошуках відповіді на просте питання:
      </p>

      <p className="text-3xl md:text-4xl font-semibold" style={{ color: "#c9a84c" }}>
        хто я насправді?
      </p>

      <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
        Крок за кроком Лес знайомився з собою. Формував ясність. Генерував інтерес.
        Вчився співпрацювати зі штучним інтелектом. Будував нову систему життя та роботи.
      </p>
    </div>
  </div>

  <div
    className="mt-16 rounded-3xl p-10 border"
    style={{
      borderColor: "rgba(201,168,76,0.15)",
      background: "rgba(255,255,255,0.02)",
    }}
  >
    <h3 className="text-2xl font-semibold mb-8" style={{ color: "#c9a84c" }}>
      Результатом стали
    </h3>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Метод LES AION",
        "Книга «Повернення до Себе»",
        "Alex Logos Consulting",
      ].map((item) => (
        <div
          key={item}
          className="rounded-2xl p-6 border"
          style={{
            borderColor: "rgba(201,168,76,0.12)",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          {item === "Alex Logos Consulting" ? (
            <a
              href="https://alexlogos.consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              ✓ Alex Logos Consulting →
            </a>
          ) : (
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
              ✓ {item}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>

  <div className="mt-16 max-w-4xl">
    <p className="text-2xl md:text-3xl leading-relaxed" style={{ color: "#c9a84c" }}>
      Метод LES AION — це шлях людини, яка сама пройшла через кризу, пошук і
      трансформацію та вирішила поділитись досвідом з іншими.
    </p>
  </div>
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