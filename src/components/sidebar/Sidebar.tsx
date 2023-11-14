import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

import { SidebarBrand } from "./SidebarBrand";
import {
  SidebarMenuContainer,
  SidebarMenuGroup,
  SidebarMenuLink,
  SidebarMenuButton,
} from "./SidebarMenu";
import { SidebarMenuPopover, SidebarMenuPopoverButton } from "./SidebarPopover";

export interface SidebarComponentProps
  extends PropsWithChildren<ComponentProps<"aside">> {
  rounded?: boolean;
}

const SidebarComponent: FC<SidebarComponentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <aside
      className={cn(
        "sticky top-20 hidden h-[86vh] w-auto  flex-col overflow-x-hidden sm:flex md:mx-auto md:px-2",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

SidebarBrand.displayName = "Sidebar.Brand";
SidebarMenuContainer.displayName = "Sidebar.Container";
SidebarMenuGroup.displayName = "Sidebar.Group";
SidebarMenuLink.displayName = "Sidebar.Link";
SidebarMenuButton.displayName = "Sidebar.Button";
SidebarMenuPopover.displayName = "Sidebar.PopoverLink";
SidebarMenuPopoverButton.displayName = "Sidebar.PopoverButton";

export const Sidebar = Object.assign(SidebarComponent, {
  Brand: SidebarBrand,
  Container: SidebarMenuContainer,
  Group: SidebarMenuGroup,
  Link: SidebarMenuLink,
  Button: SidebarMenuButton,
  PopoverLink: SidebarMenuPopover,
  PopoverButton: SidebarMenuPopoverButton,
});
