"use client";

import { MouseEvent, useId, useRef, useState } from "react";

const email = "les@alexlogos.consulting";
const copy = {
  uk: {
    subject: "Стратегічна розмова LES AION",
    body: "Вітаю, Лесе.\n\nХочу замовити стратегічну розмову щодо мого переходу.\n\nКоротко про мою ситуацію:\n\n",
    cta: "Замовити стратегічну розмову",
    close: "Закрити",
    eyebrow: "Стратегічна розмова",
    title: "Оберіть зручний спосіб написати",
    intro: "Ми вже підготували адресу, тему та початок листа.",
    mailApp: "Поштова програма",
    mailAppNote: "Outlook, Apple Mail або інша встановлена програма",
    gmail: "Відкрити Gmail",
    gmailNote: "Новий лист відкриється у браузері",
    copy: "Скопіювати адресу",
    copied: "Адресу скопійовано",
  },
  en: {
    subject: "LES AION Strategic Conversation",
    body: "Hello Les,\n\nI would like to request a strategic conversation about my transition.\n\nA brief outline of my situation:\n\n",
    cta: "Request a strategic conversation",
    close: "Close",
    eyebrow: "Strategic conversation",
    title: "Choose how you would like to write",
    intro: "The address, subject line and opening text are already prepared.",
    mailApp: "Email application",
    mailAppNote: "Outlook, Apple Mail or another installed application",
    gmail: "Open Gmail",
    gmailNote: "A new message will open in your browser",
    copy: "Copy email address",
    copied: "Email address copied",
  },
} as const;

export default function ContactButton({
  className = "",
  locale = "uk",
}: {
  className?: string;
  locale?: keyof typeof copy;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [copied, setCopied] = useState(false);
  const text = copy[locale];
  const mailto = `mailto:${email}?subject=${encodeURIComponent(text.subject)}&body=${encodeURIComponent(text.body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(text.subject)}&body=${encodeURIComponent(text.body)}`;

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
        {text.cta}
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
          aria-label={text.close}
        >
          ×
        </button>
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id={titleId}>{text.title}</h2>
        <p className="contact-dialog-intro">
          {text.intro}
        </p>

        <div className="contact-dialog-actions">
          <a href={mailto} className="contact-option">
            <span>{text.mailApp}</span>
            <small>{text.mailAppNote}</small>
          </a>
          <a
            href={gmail}
            className="contact-option"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{text.gmail}</span>
            <small>{text.gmailNote}</small>
          </a>
          <button type="button" className="contact-option" onClick={copyEmail}>
            <span>{copied ? text.copied : text.copy}</span>
            <small>{email}</small>
          </button>
        </div>
      </dialog>
    </>
  );
}
