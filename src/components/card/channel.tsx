import { extractUsernameFromYoutubeUrl } from "@/lib/user/username";
import { ChannelValues } from "@/types/channel";
import Link from "next/link";
import { FC } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

interface Props {
  data: ChannelValues;
}

const CardChannel: FC<Props> = ({ data: { url, name, image } }) => {
  const channelUrl = `/channel/${extractUsernameFromYoutubeUrl(url)}`;
  return (
    <Link
      href={channelUrl}
      className="group flex h-auto w-1/2 flex-col gap-2 overflow-hidden rounded-lg p-1 transition-all duration-100 md:h-60 md:w-40"
      aria-label={name}
    >
      <div className="relative overflow-hidden rounded-full">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={image}
            alt={"avatar"}
            className="line-clamp-2 aspect-square overflow-ellipsis object-cover transition-all duration-100 group-hover:scale-105"
            fill
          />
        </AspectRatio>
      </div>
      <h2 className="my-2 line-clamp-2 border-none text-center text-sm transition-all duration-100 group-hover:text-primary">
        {name}
      </h2>
    </Link>
  );
};

export default CardChannel;
