import { getRecentVideos } from "@/actions/get-recent-videos";
import InfiniteVideos from "./infinite-videos";

const RecentVideos = async () => {
  const videos = await getRecentVideos(1, 20);

  if (!videos.items) {
    return <p>Failed to load data</p>;
  }

  return (
    <div className="flex w-full flex-wrap gap-2">
      <InfiniteVideos initialData={videos} loadMore={getRecentVideos} />
    </div>
  );
};

export default RecentVideos;
