"use client";

import { useEffect, useMemo, useState } from "react";
import type { FunnelResult } from "@/lib/funnel";

type Slot = { start: string; end: string; label: string; dayLabel: string };
type Lead = { name: string; email: string; country: string; experience: string; note: string };

export default function BookingPanel({ lead, result }: { lead: Lead; result: FunnelResult }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [confirmation, setConfirmation] = useState<{ eventUrl?: string; meetingUrl?: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/funnel/slots", { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Не вдалося завантажити календар.");
        setSlots(data.slots || []);
        setFallbackUrl(data.fallbackUrl || "");
      })
      .catch((reason) => {
        if (reason.name !== "AbortError") setError(reason.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const grouped = useMemo(() => {
    return slots.reduce<Record<string, Slot[]>>((groups, slot) => {
      const dayLabel = new Intl.DateTimeFormat("uk-UA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "Europe/Kyiv",
      }).format(new Date(slot.start));
      (groups[dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1)] ||= []).push(slot);
      return groups;
    }, {});
  }, [slots]);

  async function book() {
    const slot = slots.find((item) => item.start === selected);
    if (!slot) return;
    setBooking(true);
    setError("");
    try {
      const response = await fetch("/api/funnel/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lead, result, slot }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не вдалося забронювати час.");
      setConfirmation(data);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не вдалося забронювати час.");
    } finally {
      setBooking(false);
    }
  }

  if (confirmation) {
    return (
      <div className="booking-confirmation">
        <span>Час заброньовано</span>
        <h4>Запрошення вже прямує на {lead.email}</h4>
        <p>Додайте подію до календаря й підготуйте одне запитання: який результат зробив би цю розмову справді цінною для вас?</p>
        <div>
          {confirmation.eventUrl && <a href={confirmation.eventUrl} target="_blank" rel="noreferrer" className="button button-secondary">Відкрити подію</a>}
          {confirmation.meetingUrl && <a href={confirmation.meetingUrl} target="_blank" rel="noreferrer" className="text-link">Посилання на зустріч ↗</a>}
        </div>
      </div>
    );
  }

  return (
    <div className="booking-panel">
      <div className="booking-copy">
        <span>Безкоштовно · 30 хвилин · Пн–Пт</span>
        <h4>Навігаційна онлайн-розмова з Лесем</h4>
        <p>Ви перевірите це відображення, відокремите головне від шуму й визначите, чи потрібна вам окрема «Сесія ясності».</p>
        <small>Якщо ви вирішите продовжити: «Сесія ясності» — 5 000 грн. Жодного зобов’язання купувати після першої розмови немає.</small>
      </div>
      <div className="slot-picker">
        {loading && <p className="slot-state">Перевіряємо вільний час у Google Calendar…</p>}
        {!loading && Object.entries(grouped).slice(0, 7).map(([day, daySlots]) => (
          <div className="slot-day" key={day}>
            <strong>{day}</strong>
            <div>{daySlots.map((slot) => <button type="button" key={slot.start} onClick={() => setSelected(slot.start)} className={selected === slot.start ? "slot selected" : "slot"}>{slot.label}</button>)}</div>
          </div>
        ))}
        {!loading && slots.length === 0 && !error && <p className="slot-state">У найближчі дні вільних слотів немає. Спробуйте трохи пізніше.</p>}
        {error && <p className="form-error">{error}</p>}
        {selected && <button type="button" onClick={book} disabled={booking} className="button button-primary booking-button">{booking ? "Бронюємо…" : "Забронювати обраний час"}</button>}
        {!loading && slots.length === 0 && fallbackUrl && <a href={fallbackUrl} target="_blank" rel="noreferrer" className="button button-secondary">Залишити заявку</a>}
      </div>
    </div>
  );
}
