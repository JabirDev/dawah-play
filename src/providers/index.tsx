import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "./theme";
import AudioProvider from "./audio";
import SessionProvider from "./auth";
import { validateRequest } from "@/lib/lucia/auth";

export default async function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  return (
    <SessionProvider value={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextTopLoader
          easing="ease"
          showSpinner={false}
          color="hsl(var(--primary))"
        />
        <AudioProvider>{children}</AudioProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
