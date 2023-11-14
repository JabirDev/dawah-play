import { MaterialIcon } from "@/components/icons";
import VideoPlayer from "@/components/player/video-player";
import { YoutubeEmbed } from "@/components/player/youtube-embed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dynamicMetadata } from "@/lib/seo/metadata";
import { getInitialName } from "@/lib/utils";
import { getChannelInfo, getVideoInfo } from "@/lib/yt/youtubei";
import Link from "next/link";

interface WatchProps {
  searchParams: {
    v: string;
  };
}

export async function generateMetadata({ searchParams }: WatchProps) {
  const info = await getVideoInfo(searchParams.v);
  return dynamicMetadata({
    title: info.title,
  });
}

const WatchPage: React.FC<WatchProps> = async ({ searchParams }) => {
  const info = await getVideoInfo(searchParams.v);
  const paragraphs = info.description.split("\n");
  const channel = await getChannelInfo(info.channel.id);
  const uri =
    "data:application/dash+xml;charset=utf-8;base64," + btoa(info.manifest);
  return (
    <div className="max-w-screen flex flex-col items-center justify-center overflow-y-hidden">
      <div className="w-full">
        {/* <VideoPlayer uri={uri} thumbnail={info.thumbnails[0].url} /> */}
        <YoutubeEmbed videoId={searchParams.v} />
      </div>
      <div className="flex w-full flex-wrap justify-start gap-4 px-6 py-4">
        <div className="info flex flex-1 flex-col gap-4">
          <h2 className="w-full text-lg font-medium">{info.title}</h2>
          <Link href={`/channel/${channel?.id}`} className="flex w-full gap-2">
            <Avatar>
              <AvatarImage src={channel?.avatar.at(0)?.url} />
              <AvatarFallback>
                {getInitialName(channel?.name ?? "P")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="flex items-center font-medium">
                {channel?.name}
                {channel?.isVerified && (
                  <MaterialIcon
                    filled
                    color="text-dawahplay"
                    variants="rounded"
                    fontSize="sm"
                    className="ml-1"
                  >
                    verified
                  </MaterialIcon>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {channel?.subscribers}
              </p>
            </div>
          </Link>
          <div className="description flex flex-col gap-2 rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
            <p className="font-bold">{`${info.view_count} • ${
              info.relative_date ?? info.published
            }`}</p>
            {paragraphs.map((paragraph: any, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="related w-1/3">
          <h3>Related Video</h3>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
