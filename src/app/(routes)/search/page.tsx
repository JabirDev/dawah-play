// import { getSearchQuery } from "@/actions/get-search-query";
import { VideoCardLoading } from "@/components/card/video-search";
import SearchQuery from "@/components/list/search-query";
import Main from "@/components/ui/main";
import { staticMetadata } from "@/lib/seo/metadata";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SearchProps {
  searchParams: {
    q: string;
  };
}

export async function generateMetadata({ searchParams }: SearchProps) {
  return staticMetadata({
    title: searchParams.q,
  });
}

export default async function SearchPage({ searchParams }: SearchProps) {
  if (!searchParams.q) redirect("/");

  // const result = await getSearchQuery(searchParams.q);

  return (
    <Main className="flex w-full flex-col py-4">
      <Suspense fallback={<VideoCardLoading />}>
        <SearchQuery query={searchParams.q} />
      </Suspense>
    </Main>
  );
}
