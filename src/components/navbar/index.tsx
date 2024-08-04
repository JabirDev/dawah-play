import React from "react";
import InputSearch from "./search";
import NavbarMenu from "./menu";

const NavbarWrapper = () => {
  return (
    <div className="sticky right-0 top-0 z-50 flex h-14 items-center justify-center bg-background px-4">
      <InputSearch />
      <NavbarMenu />
    </div>
  );
};

export default NavbarWrapper;
