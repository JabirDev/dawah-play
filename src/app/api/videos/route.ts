import { NextResponse } from "next/server";
import { getVideos, paginator } from "@/lib/yt/youtubei";
import prismadb from "@/lib/prisma/prismadb";

export async function GET(req: Request) {
  try {
    const channels = await prismadb.channel.findMany();
    const channelIds = channels.map((ch) => {
      return ch.id;
    });
    const fetchVideos = Promise.all(
      channelIds.map(async (id) => {
        const videos = await getVideos(id);
        return videos;
      }),
    );
    const { searchParams } = new URL(req.url!);
    const page = searchParams.get("page") ?? 1;
    const limit = searchParams.get("limit") ?? 10;

    const videos = await fetchVideos;
    const flattenArray = videos.flat();
    const pagination = paginator(flattenArray, page, limit);
    return NextResponse.json(pagination);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
