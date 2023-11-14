"use server";

import type { VideoList } from "@/types/youtube";

export const getRecentVideos = async (
  page?: number,
  limit?: number,
): Promise<VideoList> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos?page=${page || 1}&limit=${
      limit || 10
    }`,
  );
  return (await response.json()) as VideoList;
};
