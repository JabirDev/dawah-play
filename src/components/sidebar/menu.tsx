import { NavItemWithChildren } from "@/types/nav";
import { MainMenu } from "./config/main";
import { Each } from "../ui/each";
import { cn } from "@/lib/utils";
import SidebarLinkItem from "./link";

const MenuParent = ({
  items,
  isSmall,
}: {
  items: NavItemWithChildren[];
  isSmall: boolean;
}) => {
  if (!items.length) return null;

  return (
    <div className="mt-6 flex w-full flex-col items-center">
      <Each
        of={items}
        render={(item) => (
          <div className={cn("flex w-full flex-col items-center pb-4")}>
            <h4
              className={cn(
                "mb-1 rounded-md px-4 py-1 text-sm font-semibold text-muted-foreground",
                item.hideTitle && "hidden",
              )}
            >
              {item.title}
            </h4>
            {item?.items?.length && (
              <MenuItem items={item.items} isSmall={isSmall} />
            )}
          </div>
        )}
      />
    </div>
  );
};

const MenuItem = ({
  items,
  isSmall,
}: {
  items: NavItemWithChildren[];
  isSmall: boolean;
}) => {
  if (!items.length) return null;

  return (
    <div className="flex w-full flex-col items-center space-y-1">
      <Each
        of={items}
        render={(item) =>
          item.href && !item.disabled ? (
            <SidebarLinkItem item={item} isSmall={isSmall} />
          ) : (
            <span
              className={cn(
                "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
                item.disabled && "cursor-not-allowed opacity-60",
              )}
            >
              {item.title}
              {item.label && (
                <span className="bg-nearme text-nearme-foreground rounded-full px-1.5 py-1 text-xs font-bold leading-none no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </span>
          )
        }
      />
    </div>
  );
};

const SidebarMenu = async ({ isSmall }: { isSmall: boolean }) => {
  const mainMenu = await MainMenu();
  return (
    <aside className="relative flex h-auto w-full flex-1 flex-col items-center justify-between">
      <MenuParent isSmall={isSmall} items={mainMenu} />
    </aside>
  );
};

export default SidebarMenu;
