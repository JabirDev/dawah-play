import { usePlayer } from "@/hooks/use-player";

const Player = () => {
  const player = usePlayer();
  return (
    <div
      className={`${
        player.isOpen ? "sticky" : "hidden"
      } bottom-0 h-16 w-full bg-slate-400 p-4`}
    >
      <div className="flex h-full w-full items-center justify-between">
        Player
      </div>
    </div>
  );
};

export default Player;
