"use client";

import { useEffect, useState } from "react";

import Player from "@/components/player/player";

const PlayerProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Player />
    </>
  );
};

export default PlayerProvider;
