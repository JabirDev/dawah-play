import type { Video } from "@/types/youtube";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface VideoCardProps {
  video: Video;
}

export function VideoCardLoading({ count = 12 }: { count?: number }) {
  const items = new Array(count).fill("").map((_, i) => i + 1);
  return (
    <div className="flex w-full flex-wrap gap-2">
      {items.map((i) => (
        <div key={i} className="flex w-60 flex-col gap-2 pb-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-1/2 rounded-md" />
        </div>
      ))}
    </div>
  );
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link
      href={`/watch?v=${video.id}`}
      title={video.title}
      className="flex w-60 flex-col pb-4"
    >
      <div className="relative w-full">
        <Avatar className="mb-1 h-auto w-full rounded-xl object-cover">
          <AvatarImage src={video.thumbnails.at(0)?.url} className="h-auto" />
        </Avatar>
        <span className="absolute bottom-2 right-1 rounded-sm bg-neutral-950/95 p-1 text-xs text-neutral-100">
          {video.duration.text}
        </span>
      </div>
      <h2 className="line-clamp-2 overflow-ellipsis text-base font-medium">
        {video.title}
      </h2>
      <p className="text-sm text-muted-foreground">{`${video.view_count} • ${video.published}`}</p>
    </Link>
  );
};

export default VideoCard;
