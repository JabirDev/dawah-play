"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "@/types/nav";

import { cn } from "@/lib/utils";
import { MaterialIcon } from "../icons";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="mt-6 w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4
            className={`${
              item.hideTitle && "hidden"
            } mb-1 rounded-md px-4 py-1 text-sm font-semibold text-muted-foreground`}
          >
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="felx w-full flex-col text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group mb-1 flex items-center rounded-xl px-4 py-2 text-stone-700 dark:text-stone-100 md:hover:bg-stone-100 md:dark:hover:bg-stone-800",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href &&
                "bg-stone-100 font-bold dark:bg-stone-800",
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <MaterialIcon
              filled={pathname === item.href}
              size="xl"
              variants="rounded"
              color={
                pathname === item.href && item.href.includes("favorite")
                  ? "text-dawahplay"
                  : ""
              }
              className={
                "currentColor text-2xl transition duration-100 ease-in-out group-hover:scale-105"
              }
            >
              {item.icon}
            </MaterialIcon>
            <span className="lg:prose-xl mx-6 hidden text-stone-700 dark:text-stone-100 lg:inline lg:text-base">
              {item.title}
            </span>
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null;
}
