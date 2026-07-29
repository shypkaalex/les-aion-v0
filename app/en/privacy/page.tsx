import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy — LES AION",
  alternates: { canonical: "/en/privacy", languages: { uk: "/privacy", en: "/en/privacy" } },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <article>
        <Link href="/en" className="legal-back">← LES AION</Link>
        <p className="eyebrow">Privacy</p>
        <h1>How we work with your data</h1>
        <p className="legal-date">Updated 29 July 2026</p>
        <p>This policy explains how information is handled when you visit lesaion.world or contact LES AION personally by email.</p>
        <section><h2>1. Data on the website</h2><p>The website contains no questionnaires, automated tests, accounts or personal-data collection forms. For technical operation, the hosting provider may process standard request logs, including IP address, device type and request time.</p></section>
        <section><h2>2. Contact by email</h2><p>If you choose to write to les@alexlogos.consulting, we receive your address, name and any information you decide to share. Do not send medical information, documents or other sensitive information before separate terms for its processing have been agreed.</p></section>
        <section><h2>3. Purpose of processing</h2><p>Information is used solely to respond to your enquiry, conduct the strategic conversation, determine a possible format of collaboration and provide services agreed separately.</p></section>
        <section><h2>4. Artificial intelligence</h2><p>The content of your initial email is not submitted to open AI services for automated profiling or decision-making. Any use of human–AI synthesis in subsequent personal work is agreed separately.</p></section>
        <section><h2>5. Sharing and sale</h2><p>LES AION does not sell personal data. Limited technical processing may be performed by email, hosting and video-conferencing providers only to the extent required for the relevant function.</p></section>
        <section><h2>6. Retention and deletion</h2><p>Correspondence is retained for as long as necessary to process the enquiry, provide services and meet lawful requirements. You may ask to access, correct or delete data relating to you.</p></section>
        <section><h2>7. Contact</h2><p>Send privacy questions and deletion requests to <a href="mailto:les@alexlogos.consulting">les@alexlogos.consulting</a>.</p></section>
      </article>
    </main>
  );
}
