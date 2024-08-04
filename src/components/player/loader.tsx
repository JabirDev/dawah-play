const AudioLoader = () => {
  return (
    <div className="ml-1 flex h-4 items-center">
      <span className="animate-audio-play relative mx-[1px] block h-full w-1 rounded-md bg-primary"></span>
      <span className="animate-audio-play relative mx-[1px] block h-full w-1 rounded-md bg-primary delay-200"></span>
      <span className="animate-audio-play relative mx-[1px] block h-full w-1 rounded-md bg-primary delay-100"></span>
    </div>
  );
};

export default AudioLoader;
