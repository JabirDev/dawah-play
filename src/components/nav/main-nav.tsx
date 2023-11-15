"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSidebar } from "@/hooks/use-sidebar";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { BrandIcons } from "@/components/icons/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MaterialIcon } from "@/components/icons";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  q: z.string().min(1),
});

type SearchFormValues = z.infer<typeof formSchema>;

export function MainNav() {
  const router = useRouter();
  const sidebar = useSidebar();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  // console.log("searchParams: ", query);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { q: query ?? "" },
  });

  const onSubmitQuery = async (data: SearchFormValues) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/search?q=${data.q}`;
    router.push(url);
  };

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitQuery)}
          className="flex w-1/2 items-center rounded-xl border bg-neutral-100 dark:bg-neutral-900"
        >
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Search"
                    className="w-full border-none bg-transparent focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
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
        </form>
      </Form>
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
