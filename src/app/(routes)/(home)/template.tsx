import "@/app/globals.css";
import "shaka-player/dist/controls.css";

import SiteHeader from "@/components/nav/site-header";
import Sidebar from "@/components/nav/sidebar";
import { SidebarProvider } from "@/providers/sidebar-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader />
      <SidebarProvider>{children}</SidebarProvider>
      {/* <SiteFooter /> */}
    </div>
  );
}
