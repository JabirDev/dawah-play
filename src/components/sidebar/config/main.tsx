import { getMe } from "@/actions/user/me";
import { NavItemWithChildren } from "@/types/nav";
import { Bookmark, Disc3, Home, PlusCircle } from "lucide-react";

export const MainMenu = async () => {
  const me = await getMe();
  const isAdmin = me?.role === "admin";

  const iconStyle = {
    className: "h-5 w-5 lg:h-6 lg:w-6",
  };

  const addChannel = {
    title: "Add Channel",
    href: "/add-channel",
    icon: <PlusCircle {...iconStyle} />,
  };

  const menu: NavItemWithChildren[] = [
    {
      title: "Main Sidebar",
      hideTitle: true,
      items: [
        {
          title: "Home",
          href: "/",
          icon: <Home {...iconStyle} />,
        },
        {
          title: "Discover",
          href: "/discover",
          icon: <Disc3 {...iconStyle} />,
        },
        {
          title: "Bookmark",
          href: "/bookmark",
          icon: <Bookmark {...iconStyle} />,
        },
      ],
    },
  ];

  if (me && isAdmin) menu[0].items?.push(addChannel);

  return menu;
};
