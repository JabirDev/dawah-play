"use client";

import { AudioContextType, AudioProps } from "@/types/audio";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps | undefined>();
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>();
  const pathname = usePathname();

  const excludePath = ["/add-channel", "/signin", "/signup"];

  useEffect(() => {
    if (excludePath.includes(pathname)) setAudio(undefined);
  }, [pathname]);

  return (
    <AudioContext.Provider
      value={{ audio, setAudio, isBookmarked, setIsBookmarked }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);

  if (!context)
    throw new Error("useAudio must be used within an AudioProvider");

  return context;
};

export default AudioProvider;
