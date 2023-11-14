import "@/app/globals.css";
import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dawah Play",
  description: "Listen to dawah",
};

interface RootProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

async function RootLayout({ children, modal }: RootProps) {
  // console.log(props);
  return (
    <html lang="id">
      <body className={font.className}>
        <Providers>
          <NextTopLoader
            easing="ease"
            showSpinner={false}
            color="hsl(var(--dawahplay))"
          />
          <div className="flex min-h-screen flex-col items-center justify-between">
            {children}
            {modal}
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
