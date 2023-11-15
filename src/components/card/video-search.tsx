import { Video } from "@/types/youtube";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoCardProps {
  video: Video;
}

export function VideoCardLoading({ count = 12 }: { count?: number }) {
  const items = new Array(count).fill("").map((_, i) => i + 1);
  return (
    <div className="mt-2 flex w-full flex-col gap-2">
      {items.map((i) => (
        <div key={i} className="flex w-full gap-2 pb-4">
          <Skeleton className="h-40 w-96 rounded-xl" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-6 w-1/2 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

const VideoSearch: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link
      href={`/watch?v=${video.id}`}
      title={video.title}
      className="mb-4 flex h-auto w-full gap-2 rounded-xl transition ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-900"
    >
      <div className="relative h-auto w-1/2">
        <Avatar className="mr-1 h-auto w-full rounded-xl object-cover">
          <AvatarImage src={video.thumbnails.at(0)?.url} />
        </Avatar>
        <span className="absolute bottom-0 right-0 rounded-md bg-neutral-950/80 p-1 text-xs text-neutral-100">
          {video.duration.text}
        </span>
      </div>
      <div className="flex w-full flex-col gap-2 p-2">
        <h2 className="line-clamp-2 overflow-ellipsis text-2xl font-medium">
          {video.title}
        </h2>
        <p className="text-sm text-muted-foreground">{`${video.view_count} • ${video.published}`}</p>
        <p className="text-sm text-muted-foreground">{video.description}</p>
      </div>
    </Link>
  );
};

export default VideoSearch;
