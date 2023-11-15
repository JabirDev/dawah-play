import { getSearchQuery } from "@/actions/get-search-query";
import InfiniteSearch from "./infinite-search";

interface SearchProps {
  query: string;
}

const SearchQuery: React.FC<SearchProps> = async ({ query }) => {
  const videos = await getSearchQuery(query, 1, 20);

  if (!videos.items) {
    return <p>Failed to load data</p>;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <InfiniteSearch
        query={query}
        initialData={videos}
        loadMore={getSearchQuery}
      />
    </div>
  );
};

export default SearchQuery;
