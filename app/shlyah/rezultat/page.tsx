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
          Фаза 5
        </p>

        <h1
          className="text-3xl md:text-7xl font-bold mb-10"
          style={{ color: "#c9a84c" }}
        >
          Результат
        </h1>

        <p
          className="text-2xl leading-relaxed mb-12"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Практичний наслідок розуміння своїх талантів, ясності власних цілей, живого інтересу та працюючої ШІ-команди - вимірюваний реальний результат.
        </p>

        <div className="space-y-8">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Застосування Методу можна масштабувати відповідно до цілей.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            На цьому етапі доступний супровід Alex Logos Consulting для фіналізації задуму клієнта.
          </p>

         
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            П'ята фаза Методу присвячена
            переведенню теорії у практику.
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
            <li>✓ ALC консалтинг для клієнта</li>
            <li>✓ Супровід у реалізації проекту</li>
            
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
           Практичний результат сформованої ясної цілі клієнта.
          </p>
        </div>

        <div className="mt-20 flex justify-end">
          <Link
            href="/shlyah/interes"
            className="text-lg"
            style={{ color: "#c9a84c" }}
          >
            Наступний етап → Життя
          </Link>
        </div>

      </section>
    </main>
  );
}