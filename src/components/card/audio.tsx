"use client";
import { FC, useTransition } from "react";
import Large from "../typography/large";
import Small from "../typography/small";
import { formatNumberToTime } from "@/actions/yt/time";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/audio";
import { getAudio } from "@/actions/yt/getAudio";
import AudioLoader from "../player/loader";
import { Loader2 } from "lucide-react";

interface AudioCardProps {
  data: {
    id: string;
    title: string;
    duration: number | null;
  };
  index: number;
}

const AudioCard: FC<AudioCardProps> = ({ data, index }) => {
  const [isPending, startTransition] = useTransition();
  const { setAudio, audio: currentPlay } = useAudio();

  const isPlaying = currentPlay?.title === data.title;
  const handlePlay = () => {
    if (!isPending) {
      startTransition(async () => {
        const audio = await getAudio(data.id);
        if (audio) {
          setAudio(audio);
        }
      });
    }
  };
  return (
    <button
      onClick={handlePlay}
      disabled={isPending}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-md p-4 transition-all duration-150 ease-in hover:bg-primary/10",
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
      {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      {currentPlay && isPlaying && <AudioLoader />}
      <Small className="ml-auto text-muted-foreground">
        {formatNumberToTime(data.duration!)}
      </Small>
    </button>
  );
};

export default AudioCard;
