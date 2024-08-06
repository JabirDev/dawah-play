"use client";

import { getBookmark } from "@/actions/bookmark/get";
import { getAudio } from "@/actions/yt/getAudio";
import { useAudio } from "@/providers/audio";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";

const PlayComponent = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { setAudio, setIsBookmarked } = useAudio();

  const play = searchParams.get("play");

  useEffect(() => {
    if (play) {
      startTransition(async () => {
        const audio = await getAudio(play);
        const bookmark = await getBookmark(play);
        if (audio) {
          setAudio(audio);
          setIsBookmarked(bookmark.data ? true : false);
        }
      });
    }
  }, []);

  return <div className="">{play}</div>;
};

export default PlayComponent;
