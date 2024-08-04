import OneTapComponent from "@/components/onetap";
import SidebarWrapper from "@/components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarWrapper>{children}</SidebarWrapper>
      <OneTapComponent googleClientId={process.env.AUTH_GOOGLE_ID!} />
    </>
  );
}
