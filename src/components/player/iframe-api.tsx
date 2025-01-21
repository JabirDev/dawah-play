"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { useAudio } from "@/providers/audio";
import { AudioProps } from "@/types/audio";
import { formatTime } from "@/lib/formatTime";
import {
  Bookmark,
  Loader2,
  Pause,
  Play,
  Share,
  StepBack,
  StepForward,
  Volume2,
  VolumeOff,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

export const IframeAPI = () => {
  const { audio } = useAudio();

  if (!audio) {
    return null;
  }

  return <IframePlayer {...audio} />;
};

const IframePlayer = (audio: AudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<YT.Player | null>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize the YouTube IFrame API and player
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (
        !document.querySelector(
          "script[src='https://www.youtube.com/iframe_api']",
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const initializePlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: audio.videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
        },
        events: {
          onReady: (event) => {
            setDuration(event.target.getDuration());
            setCurrentTime(0);
            startSmoothProgress();
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              startSmoothProgress();
              playerRef.current?.unMute();
            }
            if (event.data === YT.PlayerState.PAUSED) {
              stopSmoothProgress();
            }

            setIsPlaying(event.data === YT.PlayerState.PLAYING);
            setIsBuffering(event.data === YT.PlayerState.BUFFERING);
            setIsEnded(event.data === YT.PlayerState.ENDED);
          },
        },
      });
    };

    const startSmoothProgress = () => {
      const updateProgress = () => {
        if (
          playerRef.current &&
          typeof playerRef.current.getCurrentTime === "function"
        ) {
          setCurrentTime(playerRef.current.getCurrentTime());
        }
        animationRef.current = requestAnimationFrame(updateProgress);
      };

      stopSmoothProgress(); // Stop any existing animation frame
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    const stopSmoothProgress = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    loadYouTubeAPI();

    if (typeof YT !== "undefined" && YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      stopSmoothProgress();
    };
  }, [audio.videoId]); // Depend on videoId

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isEnded) {
        playerRef.current.seekTo(0, true);
      } else {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
      }
    }
  };

  const handleForward = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.getCurrentTime === "function"
    ) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5, true);
    }
  };

  const handleRewind = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.getCurrentTime === "function"
    ) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(currentTime - 5, 0), true);
    }
  };

  const handleMuteToggle = () => {
    if (playerRef.current) {
      if (playerRef.current.isMuted()) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!playerRef.current.isMuted());
    }
  };

  return (
    <div className="sticky bottom-0 left-0 z-50 flex w-full flex-col overflow-hidden backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Progress
        value={((currentTime + 1) / duration) * 100}
        className="h-1 w-full"
        max={duration}
      />
      <div className="flex h-fit w-full flex-col px-4 py-2 md:px-12">
        <h3 className="truncate py-2 text-lg font-semibold">{audio?.title}</h3>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4 max-md:hidden">
            <Link href={`?play=${audio.videoId}`}>
              <Image
                src={audio.imageUrl! || "/dawahplay.svg"}
                width={64}
                height={64}
                alt="player1"
                className="aspect-square rounded-xl"
              />
            </Link>
            <div className="flex w-[160px] flex-col">
              <span className="font-normal text-muted-foreground">
                {audio?.author}
              </span>
            </div>
            <Button
              disabled={isBuffering}
              // onClick={handleAddRemoveBookmark}
              variant="ghost"
              className="rounded-full"
            >
              <Bookmark
              // className={cn("h-5 w-5", isSaved && "fill-primary text-primary")}
              />
            </Button>
            <Button
              disabled={isBuffering}
              // onClick={onCopy}
              variant="ghost"
              className="rounded-full"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
          <div id="youtube-player" className="hidden h-full w-full"></div>
          <div className="flex gap-4">
            <Button
              disabled={isBuffering}
              onClick={handleRewind}
              variant="ghost"
              className="rounded-full"
            >
              <StepBack className="h-5 w-5" />
              <span>-5s</span>
            </Button>
            <Button
              disabled={isBuffering}
              onClick={togglePlayPause}
              variant="ghost"
              className="rounded-full"
            >
              {isBuffering ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPlaying && !isEnded ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              disabled={isBuffering}
              onClick={handleForward}
              variant="ghost"
              className="rounded-full"
            >
              <span>+5s</span>
              <StepForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex w-40 justify-center px-4 text-sm text-muted-foreground">
            <span>{formatTime(currentTime + 1)}/</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Button
            disabled={isBuffering}
            onClick={handleMuteToggle}
            variant="ghost"
            className="rounded-full"
          >
            {isMuted ? (
              <VolumeOff className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
