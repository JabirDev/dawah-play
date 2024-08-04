import Link from "next/link";
import { BrandIcons } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";
import Large from "../typography/large";

const SidebarBrand = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <Link
      href="/"
      aria-label="Homepage URL"
      className="my-auto flex h-14 items-center px-4 lg:gap-4"
    >
      <BrandIcons.logo className="h-5 w-5 lg:h-6 lg:w-6" />
      <Large
        className={cn(
          "hidden font-black opacity-95 lg:inline-block",
          isSmall && "lg:hidden",
        )}
      >
        DawahPlay
      </Large>
    </Link>
  );
};

export default SidebarBrand;
