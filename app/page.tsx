"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, ArrowRight, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const defaultForm = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
};

type Step = "landing" | "intake" | "processing" | "report";

type DossierReport = any;

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

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [form, setForm] = useState(defaultForm);
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
        }),
      });

      const generatedReport = await response.json();

      if (!response.ok || generatedReport.error) {
        throw new Error(generatedReport.error || "Dossier generation failed");
      }

      setReport(generatedReport);
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
                v1 · Default Human Configuration
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
                <Compass className="h-4 w-4" /> Не “ось хто ти”, а “ось стартові координати”
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
                LES AION v1
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Default Human Configuration: карта базових символічних координат людини
                на основі імені, дати народження, часу, місця та системного синтезу.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => setStep("intake")}
                  className="rounded-2xl px-6 py-6 text-base"
                >
                  Створити Карту <ArrowRight className="ml-2 h-4 w-4" />
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
                      Default Dossier
                    </h2>
                    <div className="mt-6 space-y-4 text-sm text-slate-300">
                      <div className="rounded-2xl bg-white/5 p-4">Core Frequency</div>
                      <div className="rounded-2xl bg-white/5 p-4">Default Operating System</div>
                      <div className="rounded-2xl bg-white/5 p-4">Primary Polarity</div>
                      <div className="rounded-2xl bg-amber-200/10 p-4 text-amber-100">
                        First Alignment Vector
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
                    LES AION · DEFAULT DOSSIER
                  </p>

                  <h1 className="mt-4 text-3xl font-semibold text-white">
                    Базові дані
                  </h1>

                  <p className="mt-3 text-slate-300">
                    LES AION формує Карту тільки на основі базових координат:
                    імені, дати народження, часу, місця та символічного синтезу.
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
                    placeholder="Місце народження — опційно"
                    value={form.birthPlace}
                    onChange={(e) => setForm({ ...form, birthPlace: e.target.value })}
                  />
                </div>

                <Button
                  onClick={startProcessing}
                  disabled={isGenerating}
                  className="mt-8 w-full rounded-2xl py-6 text-base"
                >
                  {isGenerating ? "Створюю..." : "Згенерувати Карту"}
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
                  LES AION синтезує карту...
                </h1>
                <p className="text-slate-300">
                  Зчитуємо стартові координати, архетипні шари та патерни резонансу.
                </p>
              </CardContent>
            </Card>
          </main>
        )}

        {step === "report" && report && (
          <main className="mx-auto max-w-5xl py-12">
            <Card className="print-card rounded-[2.5rem] border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="space-y-8 p-8 md:p-12">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">
                    LES AION · v1
                  </p>

                  <h1 className="mt-4 text-4xl font-semibold text-white">
                    {report.title || "LES AION v1 DOSSIER"}
                  </h1>

                  <p className="mt-4 text-slate-300">Default Human Configuration</p>
                </div>

                <InfoBlock title="Core Frequency" text={report.coreFrequency?.summary} />

                <ListBlock title="Повторювані сигнали" items={report.coreFrequency?.signals} />

                <InfoBlock
                  title="Default Operating System"
                  text={report.defaultOperatingSystem?.description}
                />

                <ListBlock
                  title="Природні сили"
                  items={report.defaultOperatingSystem?.strengths}
                />

                <InfoBlock title="Primary Polarity" text={report.primaryPolarity?.description} />

                <ListBlock title="Полюси напруги" items={report.primaryPolarity?.poles} />

                <section className="grid gap-4 md:grid-cols-2">
                  <ListBlock title="Energy Charges" items={report.energyDynamics?.charges} />
                  <ListBlock title="Energy Leaks" items={report.energyDynamics?.leaks} />
                </section>

                <InfoBlock
                  title="Natural Resonance Field"
                  text={report.naturalResonanceField?.description}
                />

                <ListBlock
                  title="Середовища резонансу"
                  items={report.naturalResonanceField?.environments}
                />

                <section className="rounded-[2rem] border border-amber-200/10 bg-black/30 p-6">
                  <h2 className="text-2xl font-semibold text-amber-100">
                    {report.resonantRole?.symbol || "✦"} {report.resonantRole?.name}
                  </h2>

                  <p className="mt-4 text-slate-300 leading-relaxed">
                    {report.resonantRole?.description}
                  </p>
                </section>

                <InfoBlock
                  title="Shadow Configuration"
                  text={report.shadowConfiguration?.description}
                />

                <ListBlock title="Shadow Patterns" items={report.shadowConfiguration?.patterns} />

                <section className="grid gap-4 md:grid-cols-2">
                  <ListBlock title="Signal" items={report.signalVsNoise?.signal} />
                  <ListBlock title="Noise" items={report.signalVsNoise?.noise} />
                </section>

                <section className="rounded-[2rem] border border-amber-200/10 bg-amber-500/10 p-6">
                  <h2 className="text-xl font-semibold text-amber-100">
                    First Alignment Vector
                  </h2>

                  <p className="mt-4 text-slate-200 leading-relaxed">
                    {report.firstAlignmentVector?.description}
                  </p>
                </section>

                <p className="text-center text-slate-400 italic">
                  {report.closingReflection}
                </p>

                <Button
                  onClick={() => window.print()}
                  className="w-full rounded-2xl py-6 bg-amber-500 text-black hover:bg-amber-400"
                >
                  Завантажити PDF
                </Button>

                <Button onClick={reset} className="w-full rounded-2xl py-6">
                  Створити нову Карту
                </Button>
              </CardContent>
            </Card>
          </main>
        )}
      </div>
    </div>
  );
}
