"use server";
import prismadb from "@/lib/prisma";
import { AudioProps } from "@/types/audio";
import ytdl from "@distube/ytdl-core";

export async function getAudio(videoId: string) {
  try {
    const url = "https://www.youtube.com/watch?v=" + videoId;
    const info = await ytdl.getInfo(url);
    const channel = await prismadb.channel.findUnique({
      where: { ytId: info.videoDetails.author.id },
    });
    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    const audio: AudioProps = {
      audioUrl: audioFormats[0].url,
      title: info.videoDetails.title,
      author: channel?.name ?? info.videoDetails.author.name,
      imageUrl:
        info.videoDetails.author.thumbnails?.[0].url ??
        channel?.image ??
        "/vercel.svg",
      podcastId: videoId,
    };
    return audio;
  } catch (error) {
    console.error("GetAudio:", error);
    return null;
  }
}
