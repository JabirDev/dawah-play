import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "@/providers";

const nunito = Nunito({ subsets: ["latin"] });

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
    "DawahPlay is a platform for listening to Islamic lectures without interruptions from ads, allowing you to immerse yourself in learning about Islamic culture. It's a free and open-source project, dedicated to providing a seamless and enriching experience. Dive into a world of knowledge and explore the beauty of Islam with DawahPlay.",
  authors: {
    name: "Taufan Fatahillah",
    url: "https://www.linkedin.com/in/cakfan/",
  },
  openGraph: {
    title: "DawahPlay — Explore, Listen, and Grow in Islamic Wisdom",
    description:
      "DawahPlay is a platform for listening to Islamic lectures without interruptions from ads, allowing you to immerse yourself in learning about Islamic culture. It's a free and open-source project, dedicated to providing a seamless and enriching experience. Dive into a world of knowledge and explore the beauty of Islam with DawahPlay.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} flex max-w-screen-2xl flex-col items-center`}
      >
        <Providers>
          {children}
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="beforeInteractive"
          />
        </Providers>
      </body>
    </html>
  );
}
