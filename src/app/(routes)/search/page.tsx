import Main from "@/components/ui/main";
import { redirect } from "next/navigation";

interface SearchProps {
  searchParams: {
    q: string;
  };
}

export default function SearchPage({ searchParams }: SearchProps) {
  if (!searchParams.q) redirect("/");
  return <Main className="w-full">{searchParams.q}</Main>;
}
