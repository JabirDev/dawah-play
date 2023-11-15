"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { VideoCardLoading } from "@/components/card/video-search";
import { Playlist, Video, VideoList } from "@/types/youtube";
import VideoSearch from "@/components/card/video-search";
import PlaylistSearch from "@/components/card/playlist-search";

interface InfiniteSearch {
  query: string;
  initialData: VideoList;
  loadMore: any;
}

const InfiniteSearch: React.FC<InfiniteSearch> = ({
  query,
  initialData,
  loadMore,
}) => {
  const [videos, setVideos] = useState(initialData.items);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  console.log("initial: ", initialData);

  async function loadMoreVideos() {
    const next = page + 1;
    const limit = 20;
    const videos = await loadMore(query, next, limit);
    // console.log("videos: ", videos)
    if (videos?.items?.length) {
      setPage(next);
      setVideos((prev: Video[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...videos?.items,
      ]);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // if (!videos) {
  //   return (
  //     <div className="flex w-full items-center justify-center">
  //       <p>Failed to get data</p>
  //     </div>
  //   )
  // }
  return (
    <>
      {videos.map((item: Video | Playlist) =>
        item.type === "video" ? (
          <VideoSearch video={item as Video} key={item.id} />
        ) : (
          <PlaylistSearch playlist={item as Playlist} key={item.id} />
        ),
      )}
      <div ref={ref}>
        <VideoCardLoading count={4} />
      </div>
    </>
  );
};

export default InfiniteSearch;
