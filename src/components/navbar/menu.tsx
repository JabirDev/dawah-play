import { FC } from "react";
import { getMe } from "@/actions/user/me";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import AccountMenu from "./account";
import { UserType } from "@/db/schema";

interface NavbarMenuProps {
  hideMenu?: boolean;
  hideSearch?: boolean;
}

const NavbarButton = async ({ me }: { me?: UserType | null }) => {
  if (!me) {
    return (
      <Link
        href="/signin"
        className={buttonVariants({ variant: "default", size: "sm" })}
      >
        Sign In
      </Link>
    );
  }

  return <AccountMenu me={me} />;
};

const NavbarMenu: FC<NavbarMenuProps> = async ({}) => {
  const me = await getMe();
  return (
    <aside className="ml-auto flex items-center justify-end gap-4">
      {/* {!hideMenu && <MenuItem />} */}
      <div className="flex gap-4">
        {/* <SearchDialog /> */}
        <NavbarButton me={me} />
      </div>
    </aside>
  );
};

export default NavbarMenu;
