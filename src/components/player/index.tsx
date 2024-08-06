"use client";
import { cn } from "@/lib/utils";
import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { useAudio } from "@/providers/audio";
import { formatTime } from "@/lib/formatTime";
import { Progress } from "../ui/progress";
import Image from "next/image";
import Link from "next/link";
import Large from "../typography/large";
import Small from "../typography/small";
import { Button } from "../ui/button";
import { Bookmark, Share } from "lucide-react";
import { addBookmark } from "@/actions/bookmark/add";
import { useSession } from "@/providers/auth";
import { removeBookmark } from "@/actions/bookmark/remove";
import { getBookmark } from "@/actions/bookmark/get";
import { useOrigin } from "@/hooks/useOrigin";
import { usePathname, useSearchParams } from "next/navigation";
import { getAudio } from "@/actions/yt/getAudio";
import { BrandIcons } from "../icons/brand-icons";

const PodcastPlayer = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { user } = useSession();
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonPlayRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio, setAudio, isBookmarked: bookmarked } = useAudio();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    bookmarked ? true : false,
  );
  const pathname = usePathname();
  const origin = useOrigin();

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => setIsPlaying(false));
      }
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audio) {
      startTransition(async () => {
        const bookmark = await getBookmark(audio?.videoId);
        setIsBookmarked(bookmark.data ? true : false);
      });
    }
  }, [audio]);

  const handleAddRemoveBookmark = () => {
    if (!user || !audio) {
      setError("Failed to add bookmark");
      return;
    }
    setError(undefined);
    startTransition(async () => {
      if (isBookmarked) {
        const { error } = await removeBookmark(audio.videoId);
        if (error) setError(error);
      } else {
        const { error } = await addBookmark({
          author: audio.author,
          channelId: audio.channelId,
          imageUrl: audio.imageUrl,
          title: audio.title,
          videoId: audio.videoId,
          duration: duration.toString(),
        });
        if (error) setError(error);
      }
      const bookmark = await getBookmark(audio.videoId);
      setIsBookmarked(bookmark.data ? true : false);
    });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === " ") {
        togglePlayPause();
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") {
        rewind();
        e.preventDefault();
      }
      if (e.key === "ArrowRight") {
        forward();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    const btnPlay = buttonPlayRef.current;
    const play = searchParams.get("play");
    if (play) {
      const handlePlay = async () => {
        const audio = await getAudio(play);
        const bookmark = await getBookmark(play);
        if (audio && audioElement) {
          setAudio(audio);
          setIsBookmarked(bookmark.data ? true : false);
          document.addEventListener(
            "onClick",
            () => {
              audioElement.play().then(() => {
                setIsPlaying(true);
              });
            },
            { once: true },
          );
        }
      };
      handlePlay();
    }
  }, []);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(
      `${origin}${pathname}?play=${audio?.videoId}`,
    );
  };

  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 z-50 flex size-full flex-col backdrop-blur supports-[backdrop-filter]:bg-background/80",
        {
          hidden: !audio?.audioUrl,
        },
      )}
    >
      <Progress
        value={(currentTime / duration) * 100}
        className="h-1 w-full"
        max={duration}
      />
      <section className="flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          ref={audioRef}
          src={audio?.audioUrl}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
          autoPlay
        />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`?play=${audio?.videoId}`}>
            <Image
              src={audio?.imageUrl! || "/dawahplay.svg"}
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <Large className="truncate font-semibold">{audio?.title}</Large>
            <Small className="font-normal text-muted-foreground">
              {audio?.author}
            </Small>
          </div>
          <Button
            disabled={isPending}
            onClick={handleAddRemoveBookmark}
            variant={"outline"}
            size={"icon"}
            className="border-none bg-transparent"
          >
            <Bookmark
              className={cn(
                "h-5 w-5",
                isBookmarked && "fill-tertiary text-tertiary",
              )}
            />
          </Button>
          <Button
            onClick={onCopy}
            variant={"outline"}
            size={"icon"}
            className="border-none bg-transparent"
          >
            <Share className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex w-auto cursor-pointer gap-3 md:gap-6">
          <Button
            onClick={rewind}
            variant={"outline"}
            size={"icon"}
            className="flex items-center gap-1.5 border-none bg-transparent hover:bg-transparent"
          >
            <BrandIcons.reverse />
            <h2 className="font-bold text-white">-5</h2>
          </Button>
          <Button
            ref={buttonPlayRef}
            onClick={togglePlayPause}
            className="border-none bg-transparent hover:bg-transparent"
          >
            {isPlaying ? <BrandIcons.pause /> : <BrandIcons.play />}
          </Button>
          <Button
            className="flex items-center gap-1.5 border-none bg-transparent hover:bg-transparent"
            onClick={forward}
          >
            <h2 className="font-bold text-white">+5</h2>
            <BrandIcons.forward />
          </Button>
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-16 text-white-2 font-normal max-md:hidden">
            {formatTime(duration)}
          </h2>
          <div className="flex w-full gap-2">
            <Image
              src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
              width={24}
              height={24}
              alt="mute unmute"
              onClick={toggleMute}
              className="cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPlayer;
