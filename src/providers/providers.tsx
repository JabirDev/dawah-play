import AuthProvider from "./auth-provider";
import PlayerProvider from "./player";
import ThemeProvider from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <PlayerProvider />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default Providers;
