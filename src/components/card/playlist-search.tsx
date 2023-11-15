import { Playlist } from "@/types/youtube";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistSearch: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link
      href={`/watch?v=${playlist.first_videos.at(0)?.id}&list=${playlist.id}`}
      title={playlist.title}
      className="mb-4 flex w-full gap-2 rounded-xl transition ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-900"
    >
      <div className="h-auto w-1/2">
        <Avatar className="mr-1 h-auto w-full rounded-xl object-cover">
          <AvatarImage src={playlist.thumbnails.at(0)?.url} />
        </Avatar>
      </div>
      <div className="flex w-full flex-col gap-2">
        <h2 className="line-clamp-2 overflow-ellipsis text-2xl font-medium">
          {playlist.title}
        </h2>
        <p className="text-sm text-muted-foreground">{`${playlist.video_count}`}</p>
        <p className="text-sm text-muted-foreground">{`${
          playlist.description ?? ""
        }`}</p>
      </div>
    </Link>
  );
};

export default PlaylistSearch;
