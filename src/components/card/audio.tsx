"use client";
import { FC, useTransition } from "react";
import { formatNumberToTime } from "@/actions/yt/time";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/audio";
import AudioLoader from "../player/loader";
import { Loader2 } from "lucide-react";

interface AudioCardProps {
  data: {
    id: string;
    title: string;
    duration: number | null;
    isSaved: boolean;
  };
  channel: {
    id: string | null | undefined;
    author: string | null | undefined;
    imageUrl: string | null | undefined;
  };
  index: number;
}

const AudioCard: FC<AudioCardProps> = ({ data, channel, index }) => {
  const [isPending, startTransition] = useTransition();
  const { setAudio, audio: currentPlay, setIsSaved } = useAudio();

  const isPlaying = currentPlay?.title === data.title;

  const handlePlay = () => {
    if (currentPlay?.videoId !== data.id) {
      startTransition(async () => {
        setAudio({
          channelId: channel.id!,
          author: channel.author!,
          imageUrl: channel.imageUrl!,
          title: data.title,
          videoId: data.id,
        });
        setIsSaved(data.isSaved);
      });
    }
  };
  return (
    <button
      disabled={isPending}
      onClick={handlePlay}
      className={cn(
        "flex w-full cursor-pointer items-center overflow-hidden rounded-md p-4 transition-all duration-200 ease-in-out hover:bg-primary/10",
        isPlaying && "bg-primary/10",
      )}
    >
      <h2
        className={cn(
          "flex-1 truncate border-none p-0 text-start text-lg",
          isPlaying && "text-primary",
        )}
      >
        {index + 1}. {data.title}
      </h2>
      <div className="ml-auto flex items-center gap-2 pl-4">
        {isPending && !isPlaying && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {currentPlay && isPlaying && <AudioLoader />}
        <small className="text-muted-foreground">
          {formatNumberToTime(data.duration!)}
        </small>
      </div>
    </button>
  );
};

export default AudioCard;
