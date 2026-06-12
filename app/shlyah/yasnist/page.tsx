import Link from "next/link";

export default function ReturnToYourselfPage() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="max-w-5xl mx-auto px-8 py-24">

        <Link
          href="/"
          className="inline-block mb-12"
          style={{ color: "#c9a84c" }}
        >
          ← Назад до Методу
        </Link>

        <p
          className="text-sm uppercase tracking-[0.3em] mb-4"
          style={{ color: "rgba(201,168,76,0.7)" }}
        >
          Фаза 2
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold mb-10"
          style={{ color: "#c9a84c" }}
        >
          Ясність
        </h1>

        <p
          className="text-2xl leading-relaxed mb-12"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Наведення фокусу.
        </p>

        <div className="space-y-8">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            "Куди увага веде - туди енергія тече" - головне правило реальності.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Фокус уваги на ясності та чіткості своїх цілей та мотивів - необхідна умова бажаного результату.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Переважно люди працюють в уже сформованій реальності не розуміючи її механіки та як нею керувати. 

          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Друга фаза Методу присвячена навику керування своєю енергією та формування власної бажаної реальності.
            
          </p>
        </div>

        <div
          className="rounded-3xl p-10 border my-16"
          style={{
            borderColor: "rgba(201,168,76,0.15)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <h2
            className="text-3xl font-semibold mb-8"
            style={{ color: "#c9a84c" }}
          >
            Над чим ми працюємо у цій фазі:
          </h2>

          <ul
            className="space-y-4 text-lg"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <li>✓ Базове розуміння механіки реальності</li>
            <li>✓ Формування ясності щодо себе, цілей та мотивів</li>
            
          </ul>
        </div>

        <div
          className="rounded-3xl p-10 border"
          style={{
            borderColor: "rgba(201,168,76,0.15)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <h2
            className="text-3xl font-semibold mb-6"
            style={{ color: "#c9a84c" }}
          >
            Результат фази
          </h2>

          <p
            className="text-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Чіткий, зрозумілий, досяжний результат Методу
          </p>
        </div>

        <div className="mt-20 flex justify-end">
          <Link
            href="/shlyah/interes"
            className="text-lg"
            style={{ color: "#c9a84c" }}
          >
            Наступна фаза → Інтерес
          </Link>
        </div> 

      </section>
    </main>
  );
}