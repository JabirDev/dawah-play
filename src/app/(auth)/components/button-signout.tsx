"use client";

import { useTransition } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CommandItem } from "@/components/ui/command";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSignOut = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });
    });
  };

  return (
    <CommandItem
      className="cursor-pointer text-destructive data-[selected=true]:bg-destructive/5 data-[selected=true]:text-destructive"
      disabled={isPending}
      onSelect={() => onSignOut()}
    >
      <LogOut className="mr-2 h-4 w-4 hover:text-destructive" />
      <span>Log out</span>
    </CommandItem>
  );
}
