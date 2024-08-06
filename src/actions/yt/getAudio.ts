"use server";
import { AudioProps } from "@/types/audio";
import ytdl from "@distube/ytdl-core";
import { db } from "../../../drizzle";
import { bookmarkTable, channelTable } from "../../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import { getMe } from "../user/me";
import { getBookmark } from "../bookmark/get";

export async function getAudio(videoId: string) {
  try {
    const me = await getMe();
    if (!me) {
      return null;
    }

    const bookmark = await getBookmark(videoId);

    const url = "https://www.youtube.com/watch?v=" + videoId;
    const info = await ytdl.getInfo(url);
    const channel = await db
      .select()
      .from(channelTable)
      .where(eq(channelTable.ytId, info.videoDetails.author.id));
    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    const audio: AudioProps = {
      audioUrl: audioFormats[0].url,
      title: info.videoDetails.title,
      author: channel[0]?.name ?? info.videoDetails.author.name,
      imageUrl:
        info.videoDetails.author.thumbnails?.[0].url ??
        channel[0]?.image ??
        "/dawahplay.svg",
      videoId,
      channelId: info.videoDetails.author.id,
    };
    return audio;
  } catch (error) {
    console.error("GetAudio:", error);
    return null;
  }
}
