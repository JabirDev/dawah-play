"use server";

import ytdl from "@distube/ytdl-core";
import { db } from "../../../drizzle";
import { channelTable } from "../../../drizzle/schema";
import { ResponseCode } from "./types";
import { getBookmark } from "../bookmark/get";

interface Props {
  code: ResponseCode;
  error?: string | null | undefined;
  data?:
    | {
        videoId: string;
        title: string;
        description: string | null;
        isBookmarked: boolean;
        channel: typeof channelTable.$inferSelect;
      }
    | null
    | undefined;
}

export async function getVideoById(videoId: string): Promise<Props> {
  try {
    const channels = await db.select().from(channelTable);
    const url = "https://www.youtube.com/watch?v=" + videoId;
    const info = await ytdl.getInfo(url);

    // Check is channel not exist based on videoId
    const isChannelExist = channels.filter(
      (ch) => ch.ytId === info.videoDetails.author.id,
    );
    if (!isChannelExist.length) {
      return {
        code: "NOT_FOUND",
        error: "Channel not found",
      };
    }

    const bookmark = await getBookmark(videoId);

    return {
      code: "SUCCESS",
      data: {
        videoId,
        title: info.videoDetails.title,
        description: info.videoDetails.description,
        isBookmarked: bookmark.data ? true : false,
        channel: { ...isChannelExist[0] },
      },
    };
  } catch (error) {
    console.error("GetVideoById:", error);
    return {
      code: "FAILED",
      error: "Something went wrong",
    };
  }
}
