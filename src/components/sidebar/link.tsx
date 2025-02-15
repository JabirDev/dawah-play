"use client";

import { cn } from "@/lib/utils";
import { NavItemWithChildren } from "@/types/nav";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const SidebarTooltip = ({
  children,
  title,
  isSmall,
}: {
  children: React.ReactNode;
  title: string;
  isSmall: boolean;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="right"
          className={cn("z-50 lg:hidden", isSmall && "lg:block")}
        >
          <p className="font-semibold capitalize">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SidebarLinkItem = ({
  item,
  isSmall,
}: {
  item: NavItemWithChildren;
  isSmall: boolean;
}) => {
  const pathname = usePathname();
  const isCurrent = pathname === item.href;

  return (
    <SidebarTooltip title={item.title} isSmall={isSmall}>
      <Link
        href={item.href!}
        className={cn(
          "group mb-1 flex w-full items-center rounded-xl px-4 py-3 text-foreground transition-all duration-100 ease-in-out hover:lg:bg-primary/10",
          item.disabled && "cursor-not-allowed opacity-60",
          isCurrent ? "font-bold text-primary lg:bg-primary/5" : "currentColor",
        )}
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
        aria-label={`Navigate to ${item.title}`}
      >
        <div
          className={cn(
            "text-2xl transition-all duration-100 ease-in-out group-hover:scale-105",
          )}
        >
          {!item.isProfile && item.icon}
          {item.isProfile && (
            <div className="h-5 w-5 lg:h-6 lg:w-6">
              <Image
                className="rounded-full"
                width={24}
                height={24}
                src={item.icon as string}
                alt={item.title}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className={"flex items-center"}>
          <span
            className={cn(
              "ml-4 line-clamp-1 hidden flex-1 text-ellipsis text-nowrap capitalize lg:ml-6 lg:mr-4 lg:inline lg:text-base",
              isSmall && "lg:hidden",
            )}
          >
            {item.title}
          </span>
          {item.label && (
            <span
              className={cn(
                "bg-nearme text-nearme-foreground rounded-full px-1.5 py-1 text-xs font-bold leading-none no-underline group-hover:no-underline",
              )}
            >
              {item.label}
            </span>
          )}
          {item.external && <ExternalLink className="h-4 w-4" />}
        </div>
      </Link>
    </SidebarTooltip>
  );
};

export default SidebarLinkItem;
