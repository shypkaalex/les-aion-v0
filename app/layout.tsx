import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lesaion.world"),
  title: "Метод LES AION — не починайте наступний етап із нуля",
  description: "Авторський п’ятифазний метод для досвідчених людей у моменті переходу: від внутрішньої опори й ясного напряму до персональної ШІ-команди та реального результату.",
  openGraph: {
    title: "Метод LES AION — ваш наступний етап",
    description: "Зберіть досвід, здібності та ідеї в один власний напрям і доведіть задум до результату за допомогою персональної команди ШІ.",
    type: "website",
    locale: "uk_UA",
    siteName: "LES AION",
  },
  alternates: { canonical: "/" },
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
