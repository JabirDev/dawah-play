interface YoutubeEmbedProps {
  videoId: string;
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId }) => {
  return (
    <div className="flex justify-center">
      <div className="h-[cal(.5625 * 80vw)] w-full md:w-4/5">
        <div className="aspect-h-9 aspect-w-16">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&color=white&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
