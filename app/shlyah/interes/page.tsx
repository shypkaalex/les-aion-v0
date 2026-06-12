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
          Фаза 3
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold mb-10"
          style={{ color: "#c9a84c" }}
        >
          Інтерес
        </h1>

        <p
          className="text-2xl leading-relaxed mb-12"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Генерація внутрішнього палива
        </p>

        <div className="space-y-8">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            "Якщо Ви будете займатись улюбленою справою і Вам за це платитимуть гроші - Ви більше не будете працювати ні дня" - Конфуцій.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Трансформація хаотичних бажань на основі зовнішніх імпульсів у справжній інтерес, як внутрішнє паливо-мотиватор для досягнення всласних цілей - запорука досягнення результатів.
          </p>

        

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Третя фаза Методу присвячена
            контролю емоцій та екологічній роботі з інформацією.
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
            <li>✓ Аналіз рівня зовнішнього "шуму"</li>
            <li>✓ Інформація, як базова складова реальності</li>
            <li>✓ Природа емоцій та як ними керувати</li>
            <li>✓ Генеранія нового типу емоції - справжнього інтересу</li>
            
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
            Свідомо сформоване внутрішнє паливо для досягнення результату - інтерес.
          </p>
        </div>

        <div className="mt-20 flex justify-end">
          <Link
            href="/shlyah/orkestruvannya-shi"
            className="text-lg"
            style={{ color: "#c9a84c" }}
          >
            Наступна фаза → Оркестрування ШІ
          </Link>
        </div>

      </section>
    </main>
  );
}