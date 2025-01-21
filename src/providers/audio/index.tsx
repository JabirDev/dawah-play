"use client";

import { AudioContextType, AudioProps } from "@/types/audio";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps | undefined>();
  const [isSaved, setIsSaved] = useState<boolean | undefined>();
  const pathname = usePathname();

  const excludePath = useMemo(() => ["/add-channel", "/signin", "/signup"], []);

  useEffect(() => {
    if (excludePath.includes(pathname)) setAudio(undefined);
  }, [pathname, excludePath]);

  return (
    <AudioContext.Provider value={{ audio, setAudio, isSaved, setIsSaved }}>
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
