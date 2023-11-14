import { Loader2 } from "lucide-react";

const SignOutComponent = () => {
  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-auto">
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-h-6 mr-2 h-6 animate-spin" />
        <p className="text-md font-semibold">Signing out...</p>
      </div>
    </div>
  );
};

export default SignOutComponent;
