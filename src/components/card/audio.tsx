"use client";
import { FC, MouseEventHandler, useTransition } from "react";
import Large from "../typography/large";
import Small from "../typography/small";
import { formatNumberToTime } from "@/actions/yt/time";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/audio";
import { getAudio } from "@/actions/yt/getAudio";
import AudioLoader from "../player/loader";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getBookmark } from "@/actions/bookmark/get";

interface AudioCardProps {
  data: {
    id: string;
    title: string;
    duration: number | null;
    isBookmarked: boolean;
  };
  index: number;
}

const AudioCard: FC<AudioCardProps> = ({ data, index }) => {
  const [isPending, startTransition] = useTransition();
  const { setAudio, audio: currentPlay, setIsBookmarked } = useAudio();

  const isPlaying = currentPlay?.title === data.title;

  const handlePlay = () => {
    if (currentPlay?.videoId !== data.id) {
      startTransition(async () => {
        const audio = await getAudio(data.id);
        if (audio) {
          setAudio(audio);
          setIsBookmarked(data.isBookmarked);
        }
      });
    }
  };
  return (
    <button
      disabled={isPending}
      onClick={handlePlay}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-md p-4 transition-all duration-200 ease-in-out hover:bg-primary/10",
        isPlaying && "bg-primary/10",
      )}
    >
      <Large
        className={cn(
          "line-clamp-1 w-fit overflow-ellipsis text-start",
          isPlaying && "text-primary",
        )}
      >
        {index + 1}. {data.title}
      </Large>
      <div className="ml-auto flex items-center gap-2">
        {isPending && !isPlaying && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {currentPlay && isPlaying && <AudioLoader />}
        <Small className="text-muted-foreground">
          {formatNumberToTime(data.duration!)}
        </Small>
      </div>
    </button>
  );
};

export default AudioCard;
