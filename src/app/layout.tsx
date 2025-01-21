import type { Metadata } from "next";
import { Lexend, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.HOST_NAME ?? "http://localhost:3000"),
  keywords: [
    "dakwah",
    "ceramah",
    "ustadz khlid basalamah",
    "ustadz syafiq riza basalamah",
    "ustadz muhammad nuzul dzikri",
    "youtube audio",
    "audio dakwah",
    "konten islam",
    "dakwah islam",
    "agama islam",
    "ceramah islam",
    "dawahplay",
    "dakwah spotify",
    "khusus dakwah islam",
    "ceramah singkat",
    "ceramah pendek",
  ],
  title: {
    default: "DawahPlay — Explore, Listen, and Grow in Islamic Wisdom",
    template: "%s — DawahPlay",
  },
  description:
    process.env.META_DESCRIPTION ??
    "DawahPlay is a platform for listening to Islamic lectures without interruptions from ads, allowing you to immerse yourself in learning about Islamic culture. It's a free and open-source project, dedicated to providing a seamless and enriching experience. Dive into a world of knowledge and explore the beauty of Islam with DawahPlay.",
  authors: {
    name: "Taufan Fatahillah",
    url: "https://www.linkedin.com/in/cakfan/",
  },
  openGraph: {
    title: "DawahPlay — Explore, Listen, and Grow in Islamic Wisdom",
    description:
      process.env.META_DESCRIPTION ??
      "DawahPlay is a platform for listening to Islamic lectures without interruptions from ads, allowing you to immerse yourself in learning about Islamic culture. It's a free and open-source project, dedicated to providing a seamless and enriching experience. Dive into a world of knowledge and explore the beauty of Islam with DawahPlay.",
    images: ["/og.png"],
  },
  twitter: {
    images: ["/og.png"],
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${lexend.variable} font-lexend antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
