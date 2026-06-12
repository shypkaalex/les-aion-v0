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
          Фаза 4
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold mb-10"
          style={{ color: "#c9a84c" }}
        >
          Оркестрування ШІ
        </h1>

        <p
          className="text-2xl leading-relaxed mb-12"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Будь-яка справжня зміна починається не зі світу.
          Вона починається з людини.
        </p>

        <div className="space-y-8">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Більшість людей живуть за сценаріями, які колись прийняли за свої.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Освіта.
            Кар'єра.
            Соціальні ролі.
            Очікування інших людей.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            З часом стає дедалі складніше зрозуміти,
            де власні бажання, а де нав'язані.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Саме тому перша фаза Методу присвячена
            поверненню контакту із собою.
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
            Що відбувається на цій фазі
          </h2>

          <ul
            className="space-y-4 text-lg"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <li>✓ Аналіз особистої історії</li>
            <li>✓ Виявлення сильних сторін</li>
            <li>✓ Дослідження життєвих сценаріїв</li>
            <li>✓ LES AION Dossier</li>
            <li>✓ Формування глибшого розуміння себе</li>
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
            Повернення контакту зі своїми справжніми цінностями,
            бажаннями та природою.
          </p>
        </div>

        <div className="mt-20 flex justify-end">
          <Link
            href="/shlyah/rezultat"
            className="text-lg"
            style={{ color: "#c9a84c" }}
          >
            Наступна фаза → Результат
          </Link>
        </div>

      </section>
    </main>
  );
}