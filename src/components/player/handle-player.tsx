"use client";

import { usePlayer } from "@/hooks/use-player";
import { Button } from "@/components/ui/button";

const HandlePlayer = () => {
  const onOpen = usePlayer((state) => state.onOpen);
  const onClose = usePlayer((state) => state.onClose);
  const isOpen = usePlayer((state) => state.isOpen);
  console.log("player: ", isOpen);
  return (
    <Button
      onClick={() => {
        isOpen ? onClose() : onOpen();
      }}
    >
      Play
    </Button>
  );
};

export default HandlePlayer;
