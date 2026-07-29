import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lesaion.world"),
  title: "LES AION — оператор переходів через Adaptation Gap",
  description: "LES AION допомагає визначити Adaptation Gap, спроєктувати потрібну конфігурацію та пройти неминучий перехід раніше, на власних умовах і з меншою ціною зволікання.",
  keywords: ["Adaptation Gap", "оператор переходів", "стратегічний консалтинг", "персональний перехід", "вартість часу", "LES AION"],
  openGraph: {
    title: "LES AION — перехід неминучий. Ціна очікування зростає.",
    description: "Персонально спроєктований перехід від конфігурації минулого до конфігурації, потрібної майбутньому.",
    type: "website",
    locale: "uk_UA",
    url: "https://lesaion.world/",
    siteName: "LES AION",
  },
  twitter: {
    card: "summary_large_image",
    title: "LES AION — оператор переходів",
    description: "Працюємо з Adaptation Gap і вартістю часу.",
  },
  alternates: {
    canonical: "/",
    languages: { uk: "/", en: "/en" },
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07111f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
