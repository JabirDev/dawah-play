import { Playlist, Video } from "@/types/youtube";
import { Innertube, UniversalCache } from "youtubei.js/web";
import prismadb from "../prisma/prismadb";
import { Channel, Image } from "@prisma/client";

export async function youtube(
  lang = "id",
  location = "ID",
): Promise<Innertube> {
  return await Innertube.create({
    lang,
    location,
    // cache: new UniversalCache(false),
  });
}

export const sortVideos = (a: any, b: any) => {
  const correctOrder = [
    "detik",
    "menit",
    "jam",
    "hari",
    "minggu",
    "bulan",
    "tahun",
  ];
  // console.log("a: " + a.published + "\nb: " + b.published);

  if (a.published && b.published) {
    const aSplit = a.published.includes("Streaming")
      ? a.published.replace("Streaming ", "").split(" ")
      : a.published.split(" ");
    const bSplit = b.published.includes("Streaming")
      ? b.published.replace("Streaming ", "").split(" ")
      : b.published.split(" ");
    if (correctOrder.indexOf(aSplit[1]) > correctOrder.indexOf(bSplit[1])) {
      return 1;
    }
    if (correctOrder.indexOf(aSplit[1]) < correctOrder.indexOf(bSplit[1])) {
      return -1;
    }
    // console.log('kondisi 1: ' + (correctOrder.indexOf(aSplit[1]) - correctOrder.indexOf(bSplit[1])))
    let sorted =
      correctOrder.indexOf(aSplit[1]) - correctOrder.indexOf(bSplit[1]);
    sorted = aSplit[0] - bSplit[0];
    return sorted;
  }
};

export const paginator = (items: any, page?: any, limit?: any) => {
  items.sort(sortVideos);
  var page = page || 1,
    limit = limit || 10,
    offset = (page - 1) * limit,
    paginatedItems = items.slice(offset).slice(0, limit),
    item_page = Math.ceil(items.length / limit);
  return {
    current_page: parseInt(page),
    prev_page: page - 1 ? page - 1 : undefined,
    next_page: item_page > page ? parseInt(page) + 1 : undefined,
    total_page: item_page,
    total: items.length,
    items: paginatedItems,
  };
};

export async function formattedVideos(videos: any): Promise<any> {
  const videoList = Promise.all(
    videos.map((video: any) => {
      if (video.type !== "ContinuationItem") {
        let content = video.content;
        if (content) {
          const result = {
            type: "video",
            id: content.id,
            title: content.title.text,
            description: content.description_snippet?.text,
            thumbnails: content.thumbnails,
            published: content.published.text,
            view_count: content.view_count.text,
            duration: content.duration,
          };
          return result;
        }
        content = video.contents;
        if (content.length > 0) {
          const item = content[0];
          const type = item.type.toLowerCase();
          if (type === "video") {
            const result = {
              type,
              id: item.id,
              title: item.title.text,
              description: item.description_snippet?.text,
              thumbnails: item.thumbnails,
              published: item.published.text,
              view_count: item.view_count.text,
              duration: item.duration,
            };
            return result;
          }
          if (type === "playlist") {
            const first_videos = item.first_videos.map((vid: any) => {
              return {
                id: vid.id,
                title: vid.title.text,
                duration: vid.duration,
              };
            });
            const result = {
              type,
              id: item.id,
              title: item.title.text,
              description: item.description_snippet?.text,
              thumbnails: item.thumbnails,
              video_count: item.video_count.text,
              first_videos,
            };
            return result;
          }
        }
      }
    }),
  );
  console.log("list: ", await videoList);
  const filtered = (await videoList).filter((v) => {
    if (v) return v;
  });
  return filtered;
}

export async function getVideos(channelId: string): Promise<any[]> {
  const response = (await (await youtube()).getChannel(channelId)) as any;
  const videos = await response.getVideos();
  const resVideos = videos.current_tab.content.contents;
  const formatted = await formattedVideos(resVideos);
  return formatted;
}

export async function getVideoInfo(videoId: string): Promise<any> {
  const videoInfo = (await youtube()).getInfo(videoId);
  const info = await videoInfo;
  const { basic_info } = info;
  const { primary_info } = info;
  const { title, short_description, thumbnail, channel } = basic_info;
  const { view_count, published, relative_date } = primary_info as any;
  const manifest = info.toDash((url) => {
    return url;
  });
  return {
    title,
    description: short_description,
    view_count: view_count.text,
    published: published.text,
    relative_date: relative_date.text,
    thumbnails: thumbnail,
    manifest: await manifest,
    channel,
  };
}

export async function getChannelInfo(
  channelId: string,
): Promise<(Channel & { avatar: Image[] }) | null> {
  const channel = await prismadb.channel.findUnique({
    where: {
      id: channelId,
    },
    include: {
      avatar: true,
    },
  });
  return channel;
}

export async function channelSearchQuery(
  channelId: string,
  query: string,
): Promise<any | null> {
  const channel = (await youtube()).getChannel(channelId);
  const res = (await channel).search(query);
  const searchRes = (await res) as any;
  const resVideos = searchRes.current_tab?.content?.contents;
  const formatted = await formattedVideos(resVideos);
  // console.log(formatted);
  return formatted;
  // return resVideos;
}

export async function searchQuery(query: string) {
  const channels = await prismadb.channel.findMany();
  const channelIds: string[] = channels.map((ch) => {
    return ch.id;
  });

  const search = Promise.all(
    channelIds.map(async (id) => {
      const videos = await channelSearchQuery(id, query);
      return videos;
    }),
  );

  return search;
}
