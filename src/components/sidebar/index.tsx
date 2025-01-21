import { cn } from "@/lib/utils";
import SidebarBrand from "./brand";
import SidebarMenu from "./menu";
import NavbarWrapper from "../navbar";
import { IframeAPI } from "../player/iframe-api";

const SidebarWrapper = ({
  children,
  isSmall = false,
}: Readonly<{
  children: React.ReactNode;
  isSmall?: boolean;
}>) => {
  return (
    <div className="z-50 flex w-full flex-col">
      <div className="flex w-full flex-1">
        <aside
          className={cn(
            "sticky left-0 top-0 hidden h-full w-fit items-center md:flex md:px-4 lg:w-64 lg:pb-6",
            isSmall && "lg:w-fit",
          )}
        >
          <div className="flex h-full w-full flex-col">
            <SidebarBrand isSmall={isSmall} />
            <SidebarMenu isSmall={isSmall} />
          </div>
        </aside>
        <main className="flex-1 overflow-hidden">
          <NavbarWrapper />
          {children}
        </main>
      </div>
      <IframeAPI />
    </div>
  );
};

export default SidebarWrapper;
