import type { ComponentProps, FC, PropsWithChildren } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SidebarBrandProps
  extends PropsWithChildren<ComponentProps<"a">> {
  title?: string;
}

export const SidebarBrand: FC<PropsWithChildren<ComponentProps<"a">>> = (
  props
) => {
  const { children, className } = props;
  return (
    <Link href="/" className={cn("flex items-center px-4", className)}>
      {children}
    </Link>
  );
};
