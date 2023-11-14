import { NextResponse } from "next/server";
import { youtube } from "@/lib/yt/youtubei";
import prismadb from "@/lib/prisma/prismadb";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    if (!params.id) {
      return new NextResponse("Channel id is required", { status: 400 });
    }

    const channel = await prismadb.channel.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    const response = (await (await youtube()).getChannel(params.id)) as any;
    const videos = await response.getVideos();
    const liveStreams = await response.getLiveStreams();
    const resLive = liveStreams.current_tab.content.contents;
    const resVideos: any = videos.current_tab.content.contents;
    const formattedVideoResult = resVideos.map((item: any) => {
      const content = item.content;
      if (content) {
        return {
          id: content.id,
          title: content.title.text,
          description: content.description_snippet.text,
          thumbnails: content.thumbnails,
          published: content.published.text,
          view_count: content.view_count.text,
          duration: content.duration,
        };
      } else {
        return {};
      }
    });

    const formattedLiveResult = resLive.map((item: any) => {
      const content = item.content;
      if (content) {
        return {
          id: content.id,
          title: content.title.text,
          description: content.description_snippet.text,
          thumbnails: content.thumbnails,
          published: content.published.text,
          view_count: content.view_count.text,
          duration: content.duration,
        };
      } else {
        return {};
      }
    });

    const result = {
      about: channel,
      videos: formattedVideoResult,
      live: formattedLiveResult,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
