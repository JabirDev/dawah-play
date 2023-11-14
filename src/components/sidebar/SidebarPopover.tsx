import { FC, ComponentProps } from "react";
import MaterialIcon from "@/components/material-icon";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SidebarMenuPopoverProps extends ComponentProps<"div"> {
  href?: string;
  title?: string;
  icon?: string;
}

export interface SidebarMenuPopoverButtonProps extends ComponentProps<"div"> {
  title?: string;
  icon?: string;
}

export const SidebarMenuPopover: FC<SidebarMenuPopoverProps> = ({
  className,
  href,
  title,
  icon,
  ...props
}) => {
  return (
    <div className={cn("my-1", className)} {...props}>
      <Link
        href={href || "#"}
        className="group flex items-center rounded-md px-4 py-3 text-stone-700 dark:text-stone-100 md:hover:bg-stone-200 md:dark:hover:bg-stone-800"
      >
        <MaterialIcon
          size="sm"
          color={`currentColor text-2xl transition ease-in-out group-hover:scale-105 duration-100`}
        >
          {icon}
        </MaterialIcon>
        <span
          className={`prose mx-6 hidden text-stone-700 lg:prose-xl dark:text-stone-100 md:ml-4 md:inline lg:text-sm `}
        >
          {title}
        </span>
      </Link>
    </div>
  );
};

export const SidebarMenuPopoverButton: FC<SidebarMenuPopoverButtonProps> = ({
  className,
  title,
  icon,
  ...props
}) => {
  return (
    <div className={cn("my-1", className)} {...props}>
      <div className="group flex cursor-pointer items-center rounded-md px-4 py-3 text-sm text-stone-700 dark:text-stone-100 md:hover:bg-stone-200 md:dark:hover:bg-stone-800">
        <MaterialIcon
          size="xl"
          variants="rounded"
          color="currentColor text-2xl transition ease-in-out group-hover:scale-105 duration-100"
        >
          {icon}
        </MaterialIcon>
        <span
          className={`prose mx-6 hidden text-stone-700 lg:prose-xl dark:text-stone-100 md:ml-4 md:inline lg:text-sm`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
