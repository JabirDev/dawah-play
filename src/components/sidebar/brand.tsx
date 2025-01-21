import Link from "next/link";
import { BrandIcons } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

const SidebarBrand = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <Link
      href="/"
      aria-label="Homepage URL"
      className="my-auto flex h-14 items-center px-4 lg:gap-4"
    >
      <BrandIcons.logo className="h-6 w-6" />
      <h1
        className={cn(
          "ml-1 hidden text-lg font-bold opacity-95 lg:inline-block",
          isSmall && "lg:hidden",
        )}
      >
        DawahPlay
      </h1>
    </Link>
  );
};

export default SidebarBrand;
