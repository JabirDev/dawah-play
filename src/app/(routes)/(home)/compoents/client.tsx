"use client";

import { Button } from "@/components/ui/button";
import { useAudio } from "@/providers/audio";
import { AudioProps } from "@/types/audio";

const Client: React.FC<AudioProps> = (props) => {
  const { setAudio } = useAudio();

  const handlePlay = () => {
    setAudio(props);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Button onClick={handlePlay}>Test Play</Button>
    </div>
  );
};

export default Client;
