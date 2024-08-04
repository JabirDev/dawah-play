import { extractUsernameFromYoutubeUrl } from "@/actions/channel/username";
import { ChannelValues } from "@/types/channel";
import Link from "next/link";
import { FC } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Large from "../typography/large";
import P from "../typography/p";

interface Props {
  data: ChannelValues;
}

const CardChannel: FC<Props> = ({ data: { url, name, image } }) => {
  const channelUrl = `/channel/${extractUsernameFromYoutubeUrl(url)}`;
  return (
    <Link
      href={channelUrl}
      className="group flex h-fit w-1/2 flex-col rounded-lg p-2 transition-all duration-100 hover:bg-accent md:w-40 md:p-4"
      aria-label={name}
      title={name}
    >
      <div className="relative overflow-hidden rounded-full">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={image}
            alt={name}
            className="aspect-square object-cover transition-all duration-100 group-hover:scale-105"
            fill
          />
        </AspectRatio>
      </div>
      <Large className="my-1 line-clamp-2 overflow-ellipsis text-center transition-all duration-100 group-hover:text-primary">
        {name}
      </Large>
    </Link>
  );
};

export default CardChannel;
