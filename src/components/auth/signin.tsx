import GoogleSignIn from "@/components/button/google-signin";
import Logo from "@/components/ui/logo";

const SignInComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-background py-12">
      <Logo size="md" rounded="rounded-sm" />
      <h2 className="my-4 text-2xl">Sign in to DawahPlay</h2>
      <GoogleSignIn />
    </div>
  );
};

export default SignInComponent;
