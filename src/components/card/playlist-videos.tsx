import { VideoPlaylist } from "@/types/youtube";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

interface PlaylistVideosProps {
  title: string;
  description?: string;
  total_items: string;
  views: string;
  last_updated: string;
  items: VideoPlaylist[];
  currentPlay: string;
  id?: string;
}

const PlaylistVideos: React.FC<PlaylistVideosProps> = ({
  id,
  title,
  description,
  total_items,
  views,
  last_updated,
  items,
  currentPlay,
}) => {
  const currentIndex = items.filter((video) => {
    if (video.id === currentPlay) return video.index;
  });
  //   console.log("index: ", currentIndex);
  return (
    <div className="flex w-full flex-col gap-1 rounded-xl bg-neutral-100 py-2 dark:bg-neutral-900">
      <h2 className="mx-4">{title}</h2>
      <span className="mx-4 text-sm">{`Playing ${currentIndex[0].index}/${items.length}`}</span>
      <p className="mx-4">{description}</p>
      <span className="mx-4 text-xs text-muted-foreground">{`${views} • ${last_updated}`}</span>
      <ScrollArea className="h-96 w-full px-4">
        {items.map((video) => (
          <Link
            href={`/watch?v=${video.id}&list=${id}`}
            className={`flex w-full items-center gap-1 rounded-md p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
              video.id === currentPlay && "bg-neutral-200 dark:bg-neutral-800"
            }`}
            key={video.id}
          >
            <span
              className={`${
                video.id === currentPlay ? "mr-0" : "mr-1"
              } text-xs`}
            >
              {video.id === currentPlay ? "▶" : video.index}
            </span>
            <div className="h-auto w-1/3">
              <Avatar className="h-auto w-full rounded-md object-cover">
                <AvatarImage src={video.thumbnails.at(0)?.url} />
              </Avatar>
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="line-clamp-2 overflow-ellipsis text-sm">
                {video.title}
              </h3>
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
};

export default PlaylistVideos;
