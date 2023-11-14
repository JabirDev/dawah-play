"use client";

import { useSidebar } from "@/hooks/use-sidebar";

import { docsConfig } from "@/config/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocsSidebarNav } from "./sidebar-nav";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useSidebar();

  return (
    <div className="border-b">
      <div className="container flex flex-1 items-start">
        <aside
          className={`transform transition-transform duration-100 ease-in ${
            sidebar.isExpanded
              ? "translate-x-0 animate-in slide-in-from-left md:sticky md:block"
              : "absolute -left-full hidden animate-out slide-out-to-left-full"
          } fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] shrink-0 md:w-56 lg:w-60`}
        >
          <ScrollArea className="h-full w-full pr-4">
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </ScrollArea>
        </aside>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
