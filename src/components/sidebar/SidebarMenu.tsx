import type { ComponentProps, FC, PropsWithChildren } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/icons/material-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface SidebarMenuLinkProps extends ComponentProps<"div"> {
  active?: boolean;
  href?: string;
  title?: string;
  icon?: string;
  imgProfile?: string;
}

export interface SidebarMenuButtonProps extends ComponentProps<"div"> {
  title?: string;
  icon?: string;
  as?: string | React.ComponentType<any>;
}

export const SidebarMenuContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto flex h-full max-h-full flex-col justify-between py-4 md:mx-0">
      {children}
    </div>
  );
};

export const SidebarMenuGroup: FC<PropsWithChildren<ComponentProps<"div">>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col overflow-y-auto", className)}>
      {children}
    </div>
  );
};

export const SidebarMenuLink: FC<SidebarMenuLinkProps> = ({
  href,
  active = false,
  title,
  icon,
  imgProfile = "",
  className,
}) => {
  return (
    <div className={cn("my-1", className)}>
      <Link
        href={href || "#"}
        className={`group flex items-center rounded-md px-4 py-3 text-stone-700 dark:text-stone-100 md:hover:bg-stone-100 md:dark:hover:bg-stone-800
        ${active && "bg-stone-100 dark:bg-stone-800"}`}
      >
        {imgProfile ? (
          <Avatar className="currentColor text-tiny h-6 w-6 transition duration-100 ease-in-out group-hover:scale-105">
            <AvatarImage src={imgProfile} />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        ) : (
          <MaterialIcon
            filled={active}
            size="xl"
            variants="rounded"
            color={active && href?.includes("favorite") ? "text-wibusubs" : ""}
            className={
              "currentColor text-2xl transition duration-100 ease-in-out group-hover:scale-105"
            }
          >
            {imgProfile ? "account_circle" : icon}
          </MaterialIcon>
        )}
        <span
          className={`prose lg:prose-xl mx-6 hidden text-stone-700 dark:text-stone-100 lg:inline lg:text-base ${
            active && "font-bold"
          }`}
        >
          {title}
        </span>
      </Link>
    </div>
  );
};

export const SidebarMenuButton: FC<SidebarMenuButtonProps> = ({
  className,
  title,
  icon,
  as: Element = "div",
  ...props
}) => {
  return (
    <div className={cn("my-1", className)} {...props}>
      <div className="group flex items-center rounded-md px-4 py-3 text-stone-700 dark:text-stone-100 md:hover:bg-stone-100 md:dark:hover:bg-stone-800">
        <MaterialIcon
          size="xl"
          variants="rounded"
          className={
            "currentColor text-2xl transition duration-100 ease-in-out group-hover:scale-105"
          }
        >
          {icon}
        </MaterialIcon>
        <span
          className={`prose lg:prose-xl mx-6 hidden text-stone-700 dark:text-stone-100 lg:inline lg:text-base`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
