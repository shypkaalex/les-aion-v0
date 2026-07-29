import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms — LES AION",
  alternates: { canonical: "/en/terms", languages: { uk: "/terms", en: "/en/terms" } },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <article>
        <Link href="/en" className="legal-back">← LES AION</Link>
        <p className="eyebrow">Terms of use</p>
        <h1>The LES AION framework</h1>
        <p className="legal-date">Updated 29 July 2026</p>
        <p>These terms govern the use of lesaion.world, LES AION materials and the initial strategic conversation.</p>
        <section><h2>1. Purpose</h2><p>LES AION is a personal intellectual partnership for examining the Adaptation Gap, designing the required configuration and creating a transition map. The specific format, duration, result and fee are determined individually and agreed separately.</p></section>
        <section><h2>2. Strategic conversation</h2><p>The initial 30-minute conversation is complimentary and does not create an obligation for either party to begin working together. Its purpose is to understand the situation and determine whether the LES AION format is appropriate.</p></section>
        <section><h2>3. Scope of service</h2><p>LES AION is not a medical, psychiatric, psychotherapeutic, legal or financial service. Its materials and conversations do not replace advice from appropriately qualified professionals.</p></section>
        <section><h2>4. Authorship of decisions</h2><p>The client independently evaluates hypotheses, makes decisions and carries out the transition. LES AION is responsible for the quality of the agreed process but does not guarantee external life, career or financial outcomes, which depend on the client’s actions, environment and circumstances.</p></section>
        <section><h2>5. Intellectual property</h2><p>The name, Method structure, texts, design, software components and LES AION materials are protected. A personal result may be used for personal purposes, but not for resale, replication of the Method or creation of a derivative commercial service without written consent.</p></section>
        <section><h2>6. Third-party services</h2><p>Email, video meetings and other agreed functions may depend on third-party platforms whose own terms and policies also apply.</p></section>
        <section><h2>7. Contact</h2><p>Send questions about these terms to <a href="mailto:les@alexlogos.consulting">les@alexlogos.consulting</a>.</p></section>
      </article>
    </main>
  );
}
