"use client";

import { useMemo, useState } from "react";
import { goalLabels, obstacleLabels, situationLabels, type FunnelResult, type GoalKey, type ObstacleKey, type SituationKey } from "@/lib/funnel";
import BookingPanel from "./booking-panel";

type FormState = {
  situation: SituationKey | "";
  goal: GoalKey | "";
  obstacle: ObstacleKey | "";
  experience: string;
  aiReadiness: number;
  urgency: number;
  note: string;
  name: string;
  email: string;
  country: string;
  consent: boolean;
};

const initialForm: FormState = {
  situation: "",
  goal: "",
  obstacle: "",
  experience: "",
  aiReadiness: 3,
  urgency: 3,
  note: "",
  name: "",
  email: "",
  country: "",
  consent: false,
};

const steps = ["Ситуація", "Напрям", "Готовність", "Результат"];

export default function TransitionMirror() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<FunnelResult | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function next() {
    if (step === 0 && (!form.situation || !form.experience.trim())) {
      setError("Оберіть ситуацію та коротко опишіть свій досвід.");
      return;
    }
    if (step === 1 && (!form.goal || !form.obstacle)) {
      setError("Оберіть бажаний напрям і головну перешкоду.");
      return;
    }
    setStep((current) => Math.min(current + 1, 3));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.country.trim() || !form.consent) {
      setError("Заповніть контактні поля та підтвердьте згоду.");
      return;
    }
    setPending(true);
    setError("");
    try {
      const search = new URLSearchParams(window.location.search);
      const source = ["utm_source", "utm_medium", "utm_campaign"]
        .map((key) => search.get(key))
        .filter(Boolean)
        .join(" / ") || document.referrer || "direct";
      const response = await fetch("/api/funnel/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не вдалося сформувати результат.");
      setResult(data.result);
      setStep(3);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Сталася помилка. Спробуйте ще раз.");
    } finally {
      setPending(false);
    }
  }

  function restart() {
    setForm(initialForm);
    setResult(null);
    setError("");
    setStep(0);
  }

  return (
    <div className="mirror-card">
      <div className="mirror-progress" aria-label={`Крок ${step + 1} з ${steps.length}`}>
        <div className="progress-meta"><span>Крок {step + 1} / {steps.length}</span><span>{steps[step]}</span></div>
        <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
      </div>

      {step === 0 && (
        <div className="mirror-step">
          <p className="step-kicker">Ваша точка переходу</p>
          <h3>Що найточніше описує вашу ситуацію зараз?</h3>
          <div className="option-grid">
            {(Object.entries(situationLabels) as [SituationKey, string][]).map(([value, label]) => (
              <button type="button" key={value} onClick={() => update("situation", value)} className={form.situation === value ? "option selected" : "option"}>
                <span>{form.situation === value ? "●" : "○"}</span>{label}
              </button>
            ))}
          </div>
          <label className="field-label">
            Який досвід ви приносите в наступний етап?
            <textarea value={form.experience} onChange={(event) => update("experience", event.target.value)} placeholder="Наприклад: 18 років керував командою у виробництві, зараз живу в Польщі…" rows={3} maxLength={700} />
          </label>
          <StepFooter error={error} onNext={next} />
        </div>
      )}

      {step === 1 && (
        <div className="mirror-step">
          <p className="step-kicker">Бажаний напрям</p>
          <h3>Що ви найбільше хочете отримати від наступного етапу?</h3>
          <div className="option-grid">
            {(Object.entries(goalLabels) as [GoalKey, string][]).map(([value, label]) => (
              <button type="button" key={value} onClick={() => update("goal", value)} className={form.goal === value ? "option selected" : "option"}>
                <span>{form.goal === value ? "●" : "○"}</span>{label}
              </button>
            ))}
          </div>
          <p className="field-heading">Що найбільше заважає рухатися?</p>
          <div className="compact-options">
            {(Object.entries(obstacleLabels) as [ObstacleKey, string][]).map(([value, label]) => (
              <button type="button" key={value} onClick={() => update("obstacle", value)} className={form.obstacle === value ? "chip selected" : "chip"}>{label}</button>
            ))}
          </div>
          <StepFooter error={error} onBack={() => setStep(0)} onNext={next} />
        </div>
      )}

      {step === 2 && (
        <form className="mirror-step" onSubmit={submit}>
          <p className="step-kicker">Готовність до руху</p>
          <h3>Ще кілька деталей — і ми сформуємо ваше Дзеркало.</h3>
          <RangeField label="Наскільки ви готові використати ШІ як робочу команду?" value={form.aiReadiness} onChange={(value) => update("aiReadiness", value)} left="Хочу спочатку зрозуміти" right="Готовий експериментувати" />
          <RangeField label="Наскільки важливо почати зміни зараз?" value={form.urgency} onChange={(value) => update("urgency", value)} left="Досліджую" right="Готовий діяти" />
          <label className="field-label">
            Який результат у найближчі 3–6 місяців був би для вас справді цінним? <span>необов’язково</span>
            <textarea value={form.note} onChange={(event) => update("note", event.target.value)} placeholder="Один конкретний результат…" rows={3} maxLength={700} />
          </label>
          <div className="contact-grid">
            <label className="field-label">Ім’я<input value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" required /></label>
            <label className="field-label">Email<input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" required /></label>
            <label className="field-label full">Країна проживання<input value={form.country} onChange={(event) => update("country", event.target.value)} autoComplete="country-name" required /></label>
          </div>
          <label className="consent-row">
            <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} />
            <span>Погоджуюся на обробку відповідей для створення результату та зв’язку щодо LES AION. Дані не є медичною або психологічною інформацією.</span>
          </label>
          <StepFooter error={error} onBack={() => setStep(1)} submit pending={pending} />
        </form>
      )}

      {step === 3 && result && (
        <div className="mirror-result" aria-live="polite">
          <div className="result-head">
            <div><p className="step-kicker">Ваше Дзеркало переходу</p><h3>{result.segmentTitle}</h3></div>
            <span className={`readiness ${result.readiness}`}>{result.readiness === "ready" ? "Готовність до дії" : result.readiness === "warm" ? "Готовність до дослідження" : "Початок навігації"}</span>
          </div>
          <p className="result-summary">{result.summary}</p>
          <div className="result-grid">
            <article><span>Ваша можлива опора</span><p>{result.support}</p></article>
            <article><span>Ризик розфокусу</span><p>{result.risk}</p></article>
            <article className="first-step"><span>Перший крок на 24 години</span><p>{result.firstStep}</p></article>
          </div>
          <BookingPanel lead={{ name: form.name, email: form.email, country: form.country, experience: form.experience, note: form.note }} result={result} />
          <p className="result-disclaimer">LES AION не ставить медичних, психологічних чи езотеричних діагнозів. Результат є інструментом рефлексії та підготовки до живої розмови.</p>
          <button type="button" className="restart-button" onClick={restart}>Пройти ще раз</button>
        </div>
      )}
    </div>
  );
}

function StepFooter({ error, onBack, onNext, submit, pending }: { error: string; onBack?: () => void; onNext?: () => void; submit?: boolean; pending?: boolean }) {
  return (
    <div className="step-footer">
      <div>{onBack && <button type="button" onClick={onBack} className="back-button">← Назад</button>}<p className="form-error" role="alert">{error}</p></div>
      <button type={submit ? "submit" : "button"} onClick={submit ? undefined : onNext} disabled={pending} className="button button-primary">{pending ? "Створюємо Дзеркало…" : submit ? "Отримати моє Дзеркало" : "Продовжити →"}</button>
    </div>
  );
}

function RangeField({ label, value, onChange, left, right }: { label: string; value: number; onChange: (value: number) => void; left: string; right: string }) {
  return (
    <label className="range-field">
      <span>{label}</span>
      <input type="range" min="1" max="5" value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <span className="range-labels"><small>{left}</small><b>{value} / 5</b><small>{right}</small></span>
    </label>
  );
}
