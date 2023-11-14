"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrandIcons } from "@/components/icons/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MaterialIcon } from "@/components/icons";

export function MainNav() {
  const pathname = usePathname();
  const sidebar = useSidebar();

  const handleHumbergerButton = () => {
    sidebar.isExpanded ? sidebar.onClose() : sidebar.onExpanded();
  };

  return (
    <div className="mr-4 hidden flex-1 md:flex">
      <Button
        variant="ghost"
        size="icon"
        className="mr-4 rounded-full"
        onClick={handleHumbergerButton}
      >
        <MaterialIcon filled size="xl" className="text-2xl">
          menu
        </MaterialIcon>
      </Button>
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <BrandIcons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
        {siteConfig.isBeta && <Badge variant="destructive">Beta</Badge>}
      </Link>
      <div className="flex w-1/2 items-center rounded-xl border bg-neutral-100 dark:bg-neutral-900">
        <Input
          type="text"
          placeholder="Search"
          className="border-none bg-transparent focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
        />
        <Button
          type="submit"
          variant="outline"
          className="border-none bg-transparent"
        >
          <MaterialIcon filled size="sm">
            search
          </MaterialIcon>
        </Button>
      </div>
      {/* <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Documentation
        </Link>
        <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Components
        </Link>
        <Link
          href="/themes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Themes
        </Link>
        <Link
          href="/examples"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Examples
        </Link>
        <Link
          href={"siteConfig.links.github"}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block",
          )}
        >
          GitHub
        </Link>
      </nav> */}
    </div>
  );
}
