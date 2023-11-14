import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

import { staticMetadata } from "@/lib/seo/metadata";
import SignInComponent from "@/components/auth/signin";

export const metadata = staticMetadata({
  title: "Sign In",
  description: "Sign in to your account",
});

async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return <SignInComponent />;
}

export default SignInPage;
