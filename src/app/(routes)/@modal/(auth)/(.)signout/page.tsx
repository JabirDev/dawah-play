// "use client";

// import { signOut } from "next-auth/react";

import SignOutComponent from "@/components/auth/signout";
import Modal from "@/components/modal/modal";

const ModalSignOut = () => {
  //   signOut({ callbackUrl: "/signin" });
  return (
    <Modal>
      <SignOutComponent />
    </Modal>
  );
};

export default ModalSignOut;
