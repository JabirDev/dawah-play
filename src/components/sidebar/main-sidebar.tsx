"use client";

import { FC } from "react";
import { Session } from "next-auth";
import { redirect, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme/mode";
import { useSidebar } from "@/hooks/use-sidebar";

interface MainSidebarProps {
  session?: Session | null;
  profile?: any;
}

const hideSidebar = (pathname: string) => {
  const pagePaths = ["/setup", "/signin", "/signup", "/signout"];
  return pagePaths.includes(pathname);
};

const checkUserSetup = (pathname: string, isNeedSetup: boolean) => {
  const isSetupPage = pathname === "/setup";
  if (isNeedSetup && !isSetupPage) {
    redirect("/setup");
  }

  if (!isNeedSetup && isSetupPage) {
    redirect("/");
  }
};

const MainSidebar: FC<MainSidebarProps> = ({ session, profile }) => {
  const pathname = usePathname();
  const sidebar = useSidebar();

  const hideMainSidebar = hideSidebar(pathname);

  if (hideMainSidebar) {
    return null;
  }

  const isNeedSetup = (session && !profile) as boolean;
  checkUserSetup(pathname, isNeedSetup);

  let mainMenu = [
    {
      href: "/",
      title: "Home",
      active: pathname === "/",
      icon: "home",
    },
    {
      href: "/categories",
      title: "Categories",
      active: pathname === "/categories",
      icon: "category",
    },
  ];

  const popoverMenu = [
    {
      href: "/report",
      title: "Report a problem",
      active: false,
      icon: "bug_report",
    },
  ];

  if (!isNeedSetup && session?.user) {
    const role = profile.role;
    const postMenu = {
      href: "/posts",
      title: "Posts",
      active: pathname.includes("/posts"),
      icon: "add_box",
    };
    const profilePath = `/${profile.username}`;
    let authMenu = [
      {
        href: "/favorites",
        title: "Favorites",
        active: pathname === "/favorites",
        icon: "favorite",
      },
      {
        href: profilePath,
        title: "Profile",
        active: pathname.includes(profilePath),
        icon: "account_circle",
        avatar: profile.avatar,
      },
    ];

    if (role === "admin" || role === "contributor") {
      authMenu.splice(1, 0, postMenu);
    }

    mainMenu = mainMenu.concat(authMenu);
  }

  const NotAuthenticatedMenu = [
    {
      href: "/signin",
      title: "Sign In",
      active: false,
      icon: "account_circle",
    },
  ];

  const AuthenticatedMenuPopover = [
    {
      href: "/signout",
      title: "Sign Out",
      isActive: false,
      icon: "logout",
    },
  ];

  return (
    <div
      className={`z-10 flex transform flex-col transition-transform duration-300 ease-in-out ${
        sidebar.isExpanded
          ? "translate-x-0 animate-in slide-in-from-left"
          : "absolute -left-full animate-out slide-out-to-left-full"
      } ${hideMainSidebar && "hidden"}`}
    >
      <Sidebar>
        <Sidebar.Container>
          <Sidebar.Group>
            {mainMenu.map((menu: any, index: any) => (
              <Sidebar.Link
                href={menu.href}
                active={menu.active}
                title={menu.title}
                icon={menu.icon}
                imgProfile={menu.avatar}
                key={`${index}__${menu.title}`}
              />
            ))}
          </Sidebar.Group>
          <Sidebar.Group>
            {!session?.user &&
              NotAuthenticatedMenu.map((menu, index) => (
                <Sidebar.Link
                  href={menu.href}
                  active={menu.active}
                  title={menu.title}
                  icon={menu.icon}
                  key={`${index}__${menu.title}`}
                />
              ))}
            <Popover>
              <PopoverTrigger className="w-full">
                <Sidebar.Button title="More" icon="expand_circle_up" />
              </PopoverTrigger>
              <PopoverContent
                className={`ml-4 w-fit px-2 py-2 ${
                  hideMainSidebar && "hidden"
                }`}
              >
                <Sidebar.Group>
                  <ModeToggle />
                  {popoverMenu.map((menu, index) => (
                    <Sidebar.PopoverLink
                      href={menu.href}
                      title={menu.title}
                      icon={menu.icon}
                      key={`${index}__${menu.title}`}
                    />
                  ))}
                  {profile && <Separator />}
                  {profile &&
                    AuthenticatedMenuPopover.map((menu, index) => (
                      <Sidebar.PopoverLink
                        href={menu.href}
                        title={menu.title}
                        icon={menu.icon}
                        key={`${index}__${menu.title}`}
                      />
                    ))}
                </Sidebar.Group>
              </PopoverContent>
            </Popover>
          </Sidebar.Group>
        </Sidebar.Container>
      </Sidebar>
    </div>
  );
};

export default MainSidebar;
