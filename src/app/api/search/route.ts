import { NextResponse } from "next/server";
import { channelSearchQuery, paginator } from "@/lib/yt/youtubei";
import prismadb from "@/lib/prisma/prismadb";

export async function GET(req: Request) {
  try {
    const channels = await prismadb.channel.findMany();
    const channelIds = channels.map((ch) => {
      return ch.id;
    });

    // console.log(channelIds);

    const { searchParams } = new URL(req.url!);
    const query = searchParams.get("q");
    const search = Promise.all(
      channelIds.map(async (id) => {
        const videos = await channelSearchQuery(id, query!);
        return videos;
      }),
    );

    // const vv = await channelSearchQuery("UCZHbLWGrq43F0-5Ef37CpWQ", query!);

    const page = searchParams.get("page") ?? 1;
    const limit = searchParams.get("limit") ?? 10;

    const videos = await search;
    const flattenArray = videos.flat();
    const pagination = paginator(flattenArray, page, limit);
    return NextResponse.json(pagination);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
