"use client";

import "@/app/dawah-theme.css";
import React, { useEffect, useRef } from "react";
import shaka from "shaka-player/dist/shaka-player.ui";

interface VideoPlayerProps {
  uri: string;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri, thumbnail }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initApp = () => {
      shaka.polyfill.installAll();
      if (shaka.Player.isBrowserSupported()) {
        initPlayer();
      } else {
        console.error("Browser not supported!");
      }
    };
    const initPlayer = async () => {
      const video = videoRef.current;
      const container = containerRef.current;
      const localPlayer = new shaka.Player(video);
      const ui = new shaka.ui.Overlay(localPlayer, container!, video!);
      const config = {
        seekBarColors: {
          base: "rgba(255,255,255,.2)",
          buffered: "rgba(255,255,255,.4)",
          played: "hsl(var(--dawahplay))",
        },
        controlPanelElements: [
          "play_pause",
          "mute",
          "volume",
          "time_and_duration",
          "spacer",
          "loop",
          "picture_in_picture",
          "captions",
          "quality",
          "fullscreen",
        ],
        enableTooltips: true,
      };
      ui.configure(config);
      const controls = ui.getControls();
      const player = controls?.getPlayer();
      try {
        await player?.load(uri);
      } catch (error) {
        console.error(error);
      }
    };
    initApp();
  }, [uri]);

  return (
    <section id="wrap" className="flex w-full items-center justify-center">
      <div className="h-[cal(75 * 80vw)] w-full md:w-3/4">
        <div className="h-full w-full">
          <div
            ref={containerRef}
            className="player-container aspect-h-9 aspect-w-16"
          >
            <video
              ref={videoRef}
              controls={false}
              autoPlay
              poster={thumbnail}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
