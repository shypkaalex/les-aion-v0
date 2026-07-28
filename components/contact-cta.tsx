"use client";

import { MouseEvent, useId, useRef, useState } from "react";

const email = "les@alexlogos.consulting";
const subject = "Стратегічна розмова LES AION";
const body =
  "Вітаю, Лесе.\n\nХочу замовити стратегічну розмову щодо мого переходу.\n\nКоротко про мою ситуацію:\n\n";

const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default function ContactButton({ className = "" }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [copied, setCopied] = useState(false);

  function handleContactClick(event: MouseEvent<HTMLAnchorElement>) {
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!hasCoarsePointer) {
      event.preventDefault();
      setCopied(false);
      dialogRef.current?.showModal();
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setCopied(true);
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <a
        href={mailto}
        className={`cta-button ${className}`.trim()}
        onClick={handleContactClick}
      >
        Замовити стратегічну розмову
        <span aria-hidden="true">↗</span>
      </a>

      <dialog
        ref={dialogRef}
        className="contact-dialog"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <button
          type="button"
          className="contact-dialog-close"
          onClick={closeDialog}
          aria-label="Закрити"
        >
          ×
        </button>
        <p className="eyebrow">Стратегічна розмова</p>
        <h2 id={titleId}>Оберіть зручний спосіб написати</h2>
        <p className="contact-dialog-intro">
          Ми вже підготували адресу, тему та початок листа.
        </p>

        <div className="contact-dialog-actions">
          <a href={mailto} className="contact-option">
            <span>Поштова програма</span>
            <small>Outlook, Apple Mail або інша встановлена програма</small>
          </a>
          <a
            href={gmail}
            className="contact-option"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Відкрити Gmail</span>
            <small>Новий лист відкриється у браузері</small>
          </a>
          <button type="button" className="contact-option" onClick={copyEmail}>
            <span>{copied ? "Адресу скопійовано" : "Скопіювати адресу"}</span>
            <small>{email}</small>
          </button>
        </div>
      </dialog>
    </>
  );
}
