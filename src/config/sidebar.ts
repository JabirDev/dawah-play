import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Figma",
      href: "/docs/figma",
    },
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/shadcn",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Main Sidebar",
      hideTitle: true,
      items: [
        {
          title: "Home",
          href: "/",
          icon: "home",
          items: [],
        },
        {
          title: "Favorite",
          href: "/favorites",
          icon: "Favorite",
          items: [],
        },
        {
          title: "History",
          href: "/history",
          icon: "history",
          items: [],
        },
      ],
    },
    {
      title: "Site",
      items: [
        {
          title: "Setting",
          href: "/setting",
          icon: "settings",
          items: [],
        },
        {
          title: "Sitemap",
          href: "/sitemap",
          icon: "web",
          items: [],
        },
      ],
    },
  ],
};
