"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, ArrowRight, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SIGN_UA: Record<string, string> = {
  Aries: "Овен",
  Taurus: "Телець",
  Gemini: "Близнюки",
  Cancer: "Рак",
  Leo: "Лев",
  Virgo: "Діва",
  Libra: "Терези",
  Scorpio: "Скорпіон",
  Sagittarius: "Стрілець",
  Capricorn: "Козоріг",
  Aquarius: "Водолій",
  Pisces: "Риби",
};

function signUa(sign?: string | null) {
  if (!sign) return "—";
  return SIGN_UA[sign] ?? sign;
}

type Step = "landing" | "intake" | "processing" | "report";

type DossierReport = any;

const defaultForm = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  latitude: "",
  longitude: "",
};

const InfoBlock = ({ title, text }: { title: string; text?: string }) => {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5">
      <h3 className="font-semibold text-amber-100">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        {text || "—"}
      </p>
    </div>
  );
};

const ListBlock = ({ title, items }: { title: string; items?: string[] }) => {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3 text-slate-300">
        {(items || []).map((item, i) => (
          <li key={`${title}-${i}`}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};
const EvidenceBlock = ({ items }: { items?: string[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-5 rounded-2xl border border-amber-200/10 bg-amber-200/[0.04] p-4">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-amber-100/50">
        Evidence
      </p>

      <ul className="space-y-2 text-sm leading-6 text-slate-400">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};
const motifLabels: Record<string, string> = {
  "fluidity": "плинність",
  "structure": "структура",
  "rootedness": "вкоріненість",
  "adaptability": "адаптивність",
  "observation": "спостереження",
  "resonance": "резонанс",
  "emotional permeability": "емоційна проникність",
  "protection": "захист",
  "isolation": "ізоляція",
  "cyclicality": "циклічність",
  "transformation": "трансформація",
  "movement": "рух",
  "containment": "стримування",
  "initiative": "ініціатива",
  "loyalty": "лояльність",
  "duality": "дуальність",
  "endurance": "витривалість",
  "intuition": "інтуїція",
  "discipline": "дисципліна",
  "unpredictability": "непередбачуваність",
  "reflection": "рефлексія",
  "expansion": "розширення",
  "stability": "стабільність",
  "leadership": "лідерство",
  "creativity": "творчість",
  "sensitivity": "чутливість",
  "hierarchy": "ієрархія",
  "independence": "незалежність",
  "connection": "зв’язок",
  "persistence": "наполегливість",
  "silence": "тиша"
};

export default function Home() {
  const [form, setForm] = useState(defaultForm);
  const [step, setStep] = useState<Step>("landing");
  const [report, setReport] = useState<DossierReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const reset = () => {
    setForm(defaultForm);
    setReport(null);
    setStep("landing");
  };

  const startProcessing = async () => {
    if (!form.birthDate) {
      alert("Вкажи дату народження — це базовий ключ для LES AION v1.");
      return;
    }

    setIsGenerating(true);
    setStep("processing");

    try {
      console.log("FORM BEFORE FETCH:", form);
      const response = await fetch("/api/dossier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          birthDate: form.birthDate,
          birthTime: form.birthTime,
          birthPlace: form.birthPlace,
          latitude: form.latitude,
          longitude: form.longitude,
        }),
      });

      const generatedReport = await response.json();
console.log(generatedReport);
      if (!response.ok || generatedReport.error) {
  throw new Error(
    generatedReport.details ||
      generatedReport.error ||
      "Dossier generation failed"
  );
}

      setReport(generatedReport);
      console.log("GENERATED REPORT:", generatedReport);
console.log("NATAL:", generatedReport.natal);
console.table(generatedReport.factoryVectors);
console.log("MIRROR:", generatedReport.mirror);
console.log("VECTOR SOURCES:", generatedReport.vectorSources);

      setStep("report");
    } catch (error) {
      console.error("DOSSIER CLIENT ERROR:", error);
      alert("Не вдалося створити LES AION DOSSIER");
      setStep("intake");
    } finally {
      setIsGenerating(false);
    }
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
                Система повернення Людини до Себе
              </p>
            </div>
          </div>

          <Button variant="secondary" onClick={reset} className="rounded-2xl">
            <RefreshCcw className="mr-2 h-4 w-4" /> Оновити
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
                <Compass className="h-4 w-4" /> Повернення до Себе. Крок 1
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
                LES AION DOSSIER
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Дзеркало базової конфігурації Людини
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => setStep("intake")}
                  className="rounded-2xl px-6 py-6 text-base"
                >
                  Подивитись у Дзеркало <ArrowRight className="ml-2 h-4 w-4" />
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
                      У ДОСЬЄ
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-50">
                      Ви у Дзеркалі
            
                    </h2>
                    <div className="mt-6 space-y-4 text-sm text-slate-300">
                      <div className="rounded-2xl bg-white/5 p-4">Ваші вроджені якості</div>
                      <div className="rounded-2xl bg-white/5 p-4">Що Вас наповнює</div>
                      <div className="rounded-2xl bg-white/5 p-4">Що Вас виснажує</div>
                      <div className="rounded-2xl bg-amber-200/10 p-4 text-amber-100">
                        Чому система так вважає
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
            <Card className="rounded-[2rem] border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="space-y-6 p-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">
                    LES AION · DOSSIER
                  </p>

                  <h1 className="mt-4 text-3xl font-semibold text-white">
                    Базові дані
                  </h1>

                  <p className="mt-3 text-slate-300">
                    LES AION формує Досьє тільки на основі базових даних та символічного синтезу.
                  </p>
                </div>

                <div className="grid gap-4">
                  <input
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white"
                    placeholder="Імʼя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />

                  <input
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white"
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                  />

                  <input
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white"
                    placeholder="Час народження — опційно"
                    value={form.birthTime}
                    onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                  />

                  <input
                    className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white"
                    placeholder="Місце народження"
                    value={form.birthPlace}
                    onChange={(e) => setForm({ ...form, birthPlace: e.target.value })}
                  />

                  <input
                     className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white"
                     placeholder="Широта — напр. 49.8397"
                     value={form.latitude}
                     onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                   />

                  <input
                     className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white"
                     placeholder="Довгота — напр. 24.0297"
                     value={form.longitude}
                     onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                    />
                </div>

                <Button
                  onClick={startProcessing}
                  disabled={isGenerating}
                  className="mt-8 w-full rounded-2xl py-6 text-base"
                >
                  {isGenerating ? "Створюю..." : "Згенерувати Досьє"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </main>
        )}

        {step === "processing" && (
          <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center py-12">
            <Card className="rounded-[2rem] border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="space-y-5 p-10 text-center">
                <Sparkles className="mx-auto h-10 w-10 animate-pulse text-amber-200" />
                <h1 className="text-3xl font-semibold text-white">
                  LES AION синтезує Досьє...
                </h1>
                <p className="text-slate-300">
                  Зчитуємо стартові координати, архетипні шари та патерни резонансу.
                </p>
              </CardContent>
            </Card>
          </main>
        )}

        {step === "report" && report && (
  <main className="mx-auto max-w-4xl py-12">
    <Card className="rounded-[3rem] border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl">
      <CardContent className="space-y-10 p-8 md:p-14">
        <section className="text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-100/50">
            LES AION · v1
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-white">
            LES AION DOSSIER
            <pre className="text-xs text-white">
</pre>
          </h1>

          <p className="mt-4 text-slate-400">
            Базова конфігурація Людини
          </p>
        </section>

{(report as any)?.factoryVectors?.length > 0 && (
  <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
      Найсильніші вроджені якості
    </p>

    <div className="mt-6 space-y-5">
      {(report as any).factoryVectors.slice(0, 5).map((vector: any) => (
        <div key={vector.key}>
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-base text-white">
              {vector.label}
            </p>
            <p className="text-sm text-white/70">
              {vector.level}
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-amber-200"
              style={{
                width: `${Math.min(Math.max(vector.score * 12, 8), 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
)}

{report?.natal?.available && (
  <>
  
  {report?.mirror && (
  <section className="rounded-[2rem] border border-amber-200/20 bg-amber-100/[0.06] p-8">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">
      ДЗЕРКАЛО
    </p>

    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
        Підстави
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {report.mirror.evidence?.map((item: string) => (
          <span
            key={item}
            className="rounded-full border border-amber-200/20 bg-amber-100/10 px-4 py-2 text-sm text-amber-100"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </section>
)}
</>
)}

{(report as any)?.mirror?.strengths?.length > 0 && (
  <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
      Що в мені сильне від народження
    </p>

    <ul className="mt-6 space-y-3 text-lg leading-relaxed text-white">
      {(report as any).mirror.strengths.map((item: string) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </section>
)}

{(report as any)?.mirror?.nourishes?.length > 0 && (
  <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
      Що мене наповнює
    </p>

    <ul className="mt-6 space-y-3 text-lg leading-relaxed text-white">
      {(report as any).mirror.nourishes.map((item: string) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </section>
)}

{(report as any)?.mirror?.drains?.length > 0 && (
  <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
      Що мене виснажує
    </p>

    <ul className="mt-6 space-y-3 text-lg leading-relaxed text-white">
      {(report as any).mirror.drains.map((item: string) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </section>
)}

{(report as any)?.mirror?.tension && (
  <section className="rounded-[2rem] border border-amber-200/20 bg-amber-100/[0.06] p-8">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">
      Моя внутрішня напруга
    </p>

    <p className="mt-6 text-xl leading-relaxed text-white">
      {(report as any).mirror.tension}
    </p>
  </section>  
)}
<section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
      Чому система так вважає
    </p>

    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Сонце
        </p>
        <p className="mt-2 text-lg text-white">
          {signUa(report.natal.sun)}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Місяць
        </p>
        <p className="mt-2 text-lg text-white">
          {signUa(report.natal.moon)}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Асцендент
        </p>
        <p className="mt-2 text-lg text-white">
         {signUa(report.natal.ascendant)}
        </p>
      </div>
    </div>

    <p className="mt-5 text-sm leading-7 text-slate-400">
      {(report as any)?.vectorSources?.map((vector: any) => (
  <div
    key={vector.vectorKey}
    className="mb-6 rounded-xl border border-white/10 p-4"
  >
    <p className="font-semibold text-white">
      {vector.vectorLabel}
    </p>

    <p className="mt-1 text-sm text-amber-200">
      Підсумок: {vector.total}
    </p>

    <div className="mt-3 space-y-1 text-sm text-slate-300">
      {vector.sources.map((source: any) => (
        <div key={`${source.source}-${source.sign}`}>
          {source.source} ({signUa(source.sign)}) +{source.score}
        </div>
      ))}
    </div>
  </div>
))}
    </p>
  </section>
      
        <div className="no-print grid gap-4">
          <Button
            onClick={() => window.print()}
            className="w-full rounded-2xl bg-amber-400 py-6 text-black hover:bg-amber-300"
          >
            Завантажити PDF
          </Button>

          <Button
            onClick={reset}
            variant="secondary"
            className="w-full rounded-2xl py-6"
          >
            Створити нову Карту
          </Button>
        </div>
      </CardContent>
    </Card>
  </main>
)}
      </div>
    </div>
  );
}
