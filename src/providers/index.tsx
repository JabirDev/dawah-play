import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import AudioProvider from "./audio";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader
        easing="ease"
        showSpinner={false}
        color="hsl(var(--primary))"
      />
      <AudioProvider>{children}</AudioProvider>
      <Toaster position="top-center" />
    </>
  );
}
