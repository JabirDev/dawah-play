import InputSearch from "./search";
import NavbarMenu from "./menu";
import { Suspense } from "react";

const NavbarWrapper = () => {
  return (
    <div className="sticky right-0 top-0 z-50 flex h-14 items-center justify-center bg-background px-10">
      <Suspense>
        <InputSearch />
      </Suspense>
      <NavbarMenu />
    </div>
  );
};

export default NavbarWrapper;
