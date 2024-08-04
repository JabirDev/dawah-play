"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MenuType } from "@/types/menu";
import { Each } from "../ui/each";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

interface MenuProps {
  // isAdmin: boolean;
}

const MenuItem: FC<MenuProps> = ({}) => {
  const pathname = usePathname();
  const items: MenuType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Series",
      href: "/series",
    },
    {
      title: "Articles",
      href: "/articles",
    },
    {
      title: "Shop",
      href: "/shop",
      isExternal: true,
    },
  ];

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <Each
        of={items}
        render={(item) => (
          <Link
            href={item.href}
            aria-label={item.title}
            target={item.isExternal ? "_blank" : "_parent"}
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),
              "flex items-center gap-1 text-foreground/50 transition-all duration-100 ease-in-out hover:text-foreground/100 hover:no-underline",
              pathname === item.href &&
                "rounded-full bg-accent text-foreground/100",
            )}
          >
            {item.title}
            {item.isExternal && <ExternalLink className="h-5 w-5" />}
          </Link>
        )}
      />
    </div>
  );
};

export default MenuItem;
