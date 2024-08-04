import { Metadata } from "next";
import Link from "next/link";
import SignInForm from "./components/form";
import { buttonVariants } from "@/components/ui/button";
import { BrandIcons } from "@/components/icons/brand-icons";
import H1 from "@/components/typography/h1";
import P from "@/components/typography/p";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <div className="w-full font-sans flex-col min-h-screen flex items-center justify-center">
      <BrandIcons.logo className="h-14 w-14" />
      <H1>Sign In</H1>
      <P>You have to signed in</P>
      <a
        href={"/api/auth/google"}
        aria-label="Sign in with Google"
        className={buttonVariants({ variant: "secondary" })}
      >
        Sign In with Google
      </a>
      <SignInForm />
      <Link
        href={"/signup"}
        className="text-sm mt-10 hover:opacity-95 tracking-tighter hover:underline"
      >
        Create account
      </Link>
    </div>
  );
}
