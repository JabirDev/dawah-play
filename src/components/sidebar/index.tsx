import { cn } from "@/lib/utils";
import SidebarBrand from "./brand";
import SidebarMenu from "./menu";
import NavbarWrapper from "../navbar";

const SidebarWrapper = ({
  children,
  isSmall = false,
}: Readonly<{
  children: React.ReactNode;
  isSmall?: boolean;
}>) => {
  return (
    <div className="z-50 flex w-full">
      <aside
        className={cn(
          "sticky left-0 top-0 hidden h-screen w-fit items-center md:flex md:px-4 lg:w-64 lg:pb-6",
          isSmall && "lg:w-fit",
        )}
      >
        <div className="flex h-full w-full flex-col">
          <SidebarBrand isSmall={isSmall} />
          <SidebarMenu isSmall={isSmall} />
        </div>
      </aside>
      <main className="flex-1">
        <NavbarWrapper />
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
