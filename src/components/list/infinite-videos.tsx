"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import VideoCard, { VideoCardLoading } from "@/components/card/video";
import { Video, VideoList } from "@/types/youtube";

interface InfiniteVideosProps {
  initialData: VideoList;
  loadMore: any;
}

const InfiniteVideos: React.FC<InfiniteVideosProps> = ({
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
    const videos = await loadMore(next, limit);
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
      {videos.map((video) => (
        <VideoCard video={video} key={video.id} />
      ))}
      <div ref={ref}>
        <VideoCardLoading count={4} />
      </div>
    </>
  );
};

export default InfiniteVideos;
