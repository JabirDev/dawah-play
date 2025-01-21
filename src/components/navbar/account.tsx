import { getInitials } from "@/lib/user/name";
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
} from "lucide-react";
import { UserType } from "@/db/schema";
import SignOutButton from "@/app/(auth)/components/button-signout";

interface AccountMenuProps {
  me: UserType;
}

const AccountMenu = ({ me }: AccountMenuProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* <p>Hi, {getFirstName(me.name!)}</p> */}
      <Popover>
        <PopoverTrigger>
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(me.name!)}</AvatarFallback>
            <AvatarImage
              src={me.image ?? "/dawahplay.svg"}
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
                <SignOutButton />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountMenu;
