"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const ButtonSignOut = () => {
  const handleSignOut = async () => {
    const signout = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await signout.json();
    signOut({ callbackUrl: "/signin" });
  };
  return (
    <Button onClick={() => handleSignOut()} variant="destructive">
      Sign Out
    </Button>
  );
};

export default ButtonSignOut;
