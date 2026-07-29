import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LES AION — Operator of Transitions through the Adaptation Gap",
  description:
    "LES AION helps identify your Adaptation Gap, design the configuration your future requires, and make the inevitable transition earlier, on your own terms and at a lower cost of delay.",
  keywords: [
    "Adaptation Gap",
    "operator of transitions",
    "strategic consulting",
    "personal transition",
    "value of time",
    "LES AION",
  ],
  openGraph: {
    title: "LES AION — The transition is inevitable. The cost of waiting grows every day.",
    description:
      "A personally designed transition from the configuration built by your past to the configuration required by your future.",
    type: "website",
    locale: "en_US",
    url: "https://lesaion.world/en",
    siteName: "LES AION",
  },
  twitter: {
    card: "summary_large_image",
    title: "LES AION — Operator of Transitions",
    description: "Working with the Adaptation Gap and the value of time.",
  },
  alternates: {
    canonical: "/en",
    languages: { uk: "/", en: "/en" },
  },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='en'" }} />
      {children}
    </>
  );
}
