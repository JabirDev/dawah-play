import { siteConfig } from "@/config/site";
import { auth } from "@/lib/auth/auth";

import Link from "next/link";
import { BrandIcons } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/mode";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import HeaderAccount from "@/components/user/header-account";

const SiteHeader = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 items-center justify-around">
        <MainNav />
        {/* <MobileNav /> */}
        <nav className="flex items-center">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0",
              )}
            >
              <BrandIcons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0",
              )}
            >
              <BrandIcons.twitter className="h-3 w-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <ModeToggle />
          {session?.user ? (
            <HeaderAccount session={session} />
          ) : (
            <Link
              className={buttonVariants({ variant: "default", size: "sm" })}
              href="/signin"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
