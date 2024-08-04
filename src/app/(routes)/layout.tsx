import OneTapComponent from "@/components/onetap";
import SidebarWrapper from "@/components/sidebar";
import { validateRequest } from "@/lib/lucia/auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  return (
    <>
      <SidebarWrapper>{children}</SidebarWrapper>
      <OneTapComponent googleClientId={process.env.AUTH_GOOGLE_ID!} />
    </>
  );
}
