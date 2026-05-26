"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  Compass,
  ShieldCheck,
  ArrowRight,
  Download,
  RefreshCcw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  "Що зараз найбільше забирає вашу увагу?",
  "Що вас справді живить, навіть якщо ви давно це відклали?",
  "Яку одну зміну ви хочете відчути протягом найближчих 30 днів?",
];

const defaultForm = {
  name: "",
  birthDate: "",
  birthPlace: "",
  answers: ["", "", ""],
};

type ClarityReport = {
  title: string;
  core: string;
  resonance: string[];
  energy: string[];
  risks: string[];
  questions: string[];
  firstStep: string;
  disclaimer: string;
};

function generateDemoReport(form: typeof defaultForm): ClarityReport {
  const name = form.name || "Друже";

  return {
    title: `Карта Ясності для ${name}`,
    core:
      "Ваш поточний вектор виглядає як перехід від розсіювання уваги до збирання внутрішнього ядра. Це не діагноз і не вирок — це дзеркало для самоспостереження.",
    resonance: [
      "Схильність шукати сенс, а не просто функцію.",
      "Потреба у власному ритмі перед зовнішньою продуктивністю.",
      "Сильний відгук на образи, символи, історії та живу присутність.",
    ],
    energy: [
      "глибока розмова",
      "простір без шуму",
      "творчий порядок",
      "відчуття місії",
    ],
    risks: [
      "перевантаження ідеями без першого кроку",
      "чужі очікування замість власного фокусу",
      "пошук ідеальної системи перед дією",
    ],
    questions: [
      "Що я вже знаю, але відкладаю через страх зробити просто?",
      "Де я плутаю натхнення з втечею від конкретної дії?",
      "Який один крок поверне мені відчуття керма сьогодні?",
    ],
    firstStep:
      "Протягом 24 годин запишіть 3 речі, які вас реально живлять, і виберіть одну дію на 20 хвилин без телефону, щоб торкнутися однієї з них.",
    disclaimer:
      "LES AION не ставить медичних, психологічних чи езотеричних діагнозів. Це інструмент рефлексії, ясності та самоспостереження.",
  };
}

async function requestClarityReport(form: typeof defaultForm): Promise<ClarityReport> {
  const fallback = generateDemoReport(form);

  try {
    const response = await fetch("/api/clarity-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        birthDate: form.birthDate,
        birthPlace: form.birthPlace,
        age: form.birthDate,
        focus: form.answers[0],
        drain: form.answers[1],
        answers: form.answers,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        ...fallback,
        core:
          data.error ||
          "AI-звіт зараз не згенерувався. Найімовірніше, API потребує кредитів або налаштування. Нижче показано demo-режим LES AION.",
      };
    }

    if (data.result) {
      return {
        ...fallback,
        core: data.result,
      };
    }

    return {
      ...fallback,
      ...data,
    };
  } catch {
    return {
      ...fallback,
      core:
        "AI-звіт зараз не згенерувався через технічну помилку. Нижче показано demo-режим LES AION.",
    };
  }
}

export default function Home() {
  const [step, setStep] = useState<"landing" | "intake" | "processing" | "report">(
    "landing"
  );
  const [form, setForm] = useState(defaultForm);
  const [report, setReport] = useState<ClarityReport | null>(null);

  const updateAnswer = (index: number, value: string) => {
    const answers = [...form.answers];
    answers[index] = value;
    setForm({ ...form, answers });
  };

  const startProcessing = async () => {
    setStep("processing");

    const generatedReport = await requestClarityReport(form);

    setReport(generatedReport);
    setStep("report");
  };

  const reset = () => {
    setForm(defaultForm);
    setReport(null);
    setStep("landing");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_35%)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-8">
        <header className="no-print flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-300/15 ring-1 ring-amber-200/30">
              <Sparkles className="h-5 w-5 text-amber-200" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-100/70">
                LES AION
              </p>
              <p className="text-xs text-slate-400">
                V0 · Operating System of Clarity
              </p>
            </div>
          </div>

          <Button variant="secondary" onClick={reset} className="rounded-2xl">
            <RefreshCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </header>

        {step === "landing" && (
          <main className="grid min-h-[78vh] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-white/5 px-4 py-2 text-sm text-amber-100/80">
                <Compass className="h-4 w-4" /> Не “ось хто ти”, а “ось дзеркало”
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
                Карта Ясності для повернення до себе.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                LES AION V0 збирає базові дані та відповіді в один мʼякий
                AI-звіт: діапазон можливих патернів, джерела енергії, ризики
                розфокусу і перший крок на 24 години.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => setStep("intake")}
                  className="rounded-2xl px-6 py-6 text-base"
                >
                  Створити Карту Ясності <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Card className="rounded-[2rem] border-white/10 bg-white/8 shadow-2xl backdrop-blur">
                <CardContent className="p-7">
                  <div className="rounded-[1.5rem] border border-amber-200/15 bg-slate-900/70 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-100/60">
                      Preview
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-50">
                      Карта Ясності
                    </h2>
                    <div className="mt-6 space-y-4 text-sm text-slate-300">
                      <div className="rounded-2xl bg-white/5 p-4">
                        Ядро резонансу
                      </div>
                      <div className="rounded-2xl bg-white/5 p-4">Що живить</div>
                      <div className="rounded-2xl bg-white/5 p-4">
                        Ризики розфокусу
                      </div>
                      <div className="rounded-2xl bg-amber-200/10 p-4 text-amber-100">
                        Перший крок на 24 години
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </main>
        )}

        {step === "intake" && (
          <main className="mx-auto max-w-3xl py-12">
            <Card className="rounded-[2rem] border-white/10 bg-white/8 backdrop-blur">
              <CardContent className="p-7 md:p-10">
                <h1 className="text-3xl font-semibold">Вхід у LES AION V0</h1>
                <p className="mt-3 text-slate-300">
                  Заповніть мінімум даних. У цьому V0 фото ще не аналізуються
                  реально — блок залишено як місце для наступного AI Vision-модуля.
                </p>

                <div className="mt-8 grid gap-5">
                  <input
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 outline-none"
                    placeholder="Імʼя або псевдонім"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />

                  <input
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 outline-none"
                    type="date"
                    value={form.birthDate}
                    onChange={(e) =>
                      setForm({ ...form, birthDate: e.target.value })
                    }
                  />

                  <input
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 outline-none"
                    placeholder="Місце народження"
                    value={form.birthPlace}
                    onChange={(e) =>
                      setForm({ ...form, birthPlace: e.target.value })
                    }
                  />

                  <div className="grid gap-3 md:grid-cols-3">
                    {["Обличчя", "Долоні", "Тіло"].map((label) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-dashed border-white/15 bg-slate-900/60 p-5 text-center"
                      >
                        <Upload className="mx-auto mb-3 h-5 w-5 text-amber-100/80" />
                        <p className="text-sm text-slate-300">Фото: {label}</p>
                        <p className="mt-1 text-xs text-slate-500">у V1</p>
                      </div>
                    ))}
                  </div>

                  {questions.map((q, i) => (
                    <label key={q} className="grid gap-2">
                      <span className="text-sm text-slate-300">{q}</span>
                      <textarea
                        className="min-h-24 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 outline-none"
                        value={form.answers[i]}
                        onChange={(e) => updateAnswer(i, e.target.value)}
                      />
                    </label>
                  ))}
                </div>

                <Button
                  onClick={startProcessing}
                  className="mt-8 w-full rounded-2xl py-6 text-base"
                >
                  Згенерувати Карту Ясності <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </main>
        )}

        {step === "processing" && (
          <main className="flex min-h-[78vh] items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/10"
              >
                <Sparkles className="h-9 w-9 text-amber-100" />
              </motion.div>
              <h1 className="text-3xl font-semibold">Наводимо фокус...</h1>
              <p className="mt-3 text-slate-300">
                Система збирає дзеркало ясності.
              </p>
            </motion.div>
          </main>
        )}

        {step === "report" && report && (
          <main className="mx-auto max-w-5xl py-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-amber-100/70">
                  LES AION · Report
                </p>
                <h1 className="mt-3 text-4xl font-semibold">{report.title}</h1>
              </div>

              <Button
                className="no-print rounded-2xl"
                onClick={() => window.print()}
              >
                <Download className="mr-2 h-4 w-4" /> Зберегти як PDF
              </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Card className="print-card rounded-[2rem] border-white/10 bg-white/8 backdrop-blur md:col-span-2">
                <CardContent className="p-7">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="mt-1 h-6 w-6 text-amber-100" />
                    <div>
                      <h2 className="text-2xl font-semibold">Ядро резонансу</h2>
                      <p className="mt-3 whitespace-pre-line leading-7 text-slate-300">
                        {report.core}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ReportBlock title="Можливі патерни" items={report.resonance} />
              <ReportBlock title="Що живить" items={report.energy} />
              <ReportBlock title="Ризики розфокусу" items={report.risks} />
              <ReportBlock title="Питання ясності" items={report.questions} />

              <Card className="print-card rounded-[2rem] border-amber-200/20 bg-amber-200/10 backdrop-blur md:col-span-2">
                <CardContent className="p-7">
                  <h2 className="text-2xl font-semibold text-amber-50">
                    Перший крок на 24 години
                  </h2>
                  <p className="mt-3 leading-7 text-amber-50/85">
                    {report.firstStep}
                  </p>
                </CardContent>
              </Card>

              <p className="text-sm leading-6 text-slate-500 md:col-span-2">
                {report.disclaimer}
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

function ReportBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="print-card rounded-[2rem] border-white/10 bg-white/8 backdrop-blur">
      <CardContent className="p-7">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-slate-900/60 px-4 py-3 text-slate-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}