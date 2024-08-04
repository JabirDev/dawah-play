"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const InputSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("searchQuery") as string;
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="mx-auto">
      <form onSubmit={handleSearch} className="flex justify-center">
        <div className="group flex w-full items-center rounded-full border border-input px-3 ring-offset-background transition-all duration-200 ease-in-out focus-within:border-none focus-within:ring-2 focus-within:ring-ring">
          <Input
            className="w-60 flex-1 border-none outline-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
            placeholder="Find something..."
            type="search"
            name="searchQuery"
            autoComplete="off"
            // defaultValue={searchParams.get("q")?.toString()}
          />
          {/* <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-sm font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd> */}
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="text-input transition-all duration-200 ease-in-out hover:bg-transparent group-focus-within:text-primary"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputSearch;
