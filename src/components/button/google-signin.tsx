import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react";
import { signIn } from "@/lib/auth/auth";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="secondary" className="w-full" type="submit">
        <GoogleIcon className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </form>
  );
};

export default GoogleSignIn;
