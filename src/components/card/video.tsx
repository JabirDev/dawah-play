import { extractUsernameFromYoutubeUrl } from "@/actions/channel/username";
import Link from "next/link";
import { FC } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Large from "../typography/large";
import { VideoCompact } from "youtubei";
import Muted from "../typography/muted";
import Small from "../typography/small";
import { formatNumberToTime } from "@/actions/yt/time";

interface Props {
  data: VideoCompact;
}

const CardVideo: FC<Props> = ({
  data: { title, thumbnails, uploadDate, duration, id },
}) => {
  const channelUrl = `/play/${id}`;
  return (
    <Link
      href={channelUrl}
      className="group flex h-fit w-1/2 flex-col rounded-lg transition-all duration-100 md:w-60"
      aria-label={title}
      title={title}
    >
      <div className="relative overflow-hidden rounded-lg">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={thumbnails.at(0)?.url ?? "/vercel.svg"}
            alt={title}
            className="object-cover transition-all duration-100 group-hover:scale-105"
            fill
          />
        </AspectRatio>
        <div className="absolute bottom-2 right-2">
          <Small className="rounded-sm bg-black/70 px-1 py-0.5 text-white">
            {formatNumberToTime(duration ?? 0)}
          </Small>
        </div>
      </div>
      <Large className="mx-1 line-clamp-2 overflow-ellipsis transition-all duration-100 group-hover:text-primary">
        {title}
      </Large>
      <Muted>{uploadDate}</Muted>
    </Link>
  );
};

export default CardVideo;
