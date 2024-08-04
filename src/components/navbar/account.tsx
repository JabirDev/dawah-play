import { getInitials } from "@/actions/user/name";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  LogOut,
} from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { User } from "@prisma/client";

interface AccountMenuProps {
  me: User;
}

const AccountMenu = ({ me }: AccountMenuProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* <p>Hi, {getFirstName(me.name!)}</p> */}
      <Popover>
        <PopoverTrigger>
          <Avatar className="h-6 w-6">
            <AvatarFallback>{getInitials(me.name!)}</AvatarFallback>
            <AvatarImage
              src={me.image ?? "/default.png"}
              alt={me.name ?? "Profile"}
            />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-10 border-none p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandList>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup className="text-destructive hover:text-destructive">
                <CommandItem className="cursor-pointer">
                  <form
                    action={signOut}
                    className="w-full hover:text-destructive"
                  >
                    <button className="flex w-full items-center" type="submit">
                      <LogOut className="mr-2 h-4 w-4 hover:text-destructive" />
                      <span>Log out</span>
                    </button>
                  </form>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountMenu;
