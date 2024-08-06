import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "@/providers";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
