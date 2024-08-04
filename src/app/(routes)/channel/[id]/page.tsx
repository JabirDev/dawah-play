import type { Metadata } from "next";
import { getChannel } from "@/actions/channel/get";
import Image from "next/image";
import { notFound } from "next/navigation";
import H1 from "@/components/typography/h1";
import { BadgeCheck } from "lucide-react";
import P from "@/components/typography/p";
import Small from "@/components/typography/small";
import Link from "next/link";
import { BrandIcons } from "@/components/icons/brand-icons";
import { getMe } from "@/actions/user/me";
import { Button } from "@/components/ui/button";
import H2 from "@/components/typography/h2";
import { getVideosByChannelId } from "@/actions/yt/videos";
import { Each } from "@/components/ui/each";
import Large from "@/components/typography/large";
import { formatNumberToTime } from "@/actions/yt/time";
import AudioCard from "@/components/card/audio";

interface Props {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const info = await getChannel(id);
  return {
    title: info.name,
  };
}

export default async function Page({ params: { id } }: Props) {
  const me = await getMe();
  const isAdmin = me?.role === "admin";
  const info = await getChannel(id);
  if (info.code === "NOT_FOUND") notFound();

  const videos = await getVideosByChannelId(info.ytId!);

  return (
    <div className="flex w-full flex-col gap-4 px-4 py-6">
      <div className="flex flex-wrap gap-4">
        <Image
          src={info?.image ?? "/logo.svg"}
          alt={info?.name ?? "Profile"}
          width={240}
          height={240}
          className="aspect-square rounded-md"
        />
        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <H1>
            {info.name} {info.verified && <BadgeCheck strokeWidth={3} />}
          </H1>
          <Small className="text-muted-foreground">
            {info.subscribers} {info.videoCounts}
          </Small>
          <P>{info.description}</P>
          <div className="flex">
            <Link href={info.url!} target="_blank" className="hover:opacity-90">
              <BrandIcons.youtube className="h-6 w-6 text-red-500" />
            </Link>
          </div>
        </div>
        {isAdmin && <Button className="ml-auto">Delete</Button>}
      </div>
      <div className="my-6 flex flex-col">
        <H2>Playlist</H2>
        <div className="mt-4 flex w-full flex-col gap-1">
          {videos && videos?.length > 0 ? (
            <Each
              of={videos}
              render={(vid, index) => (
                <AudioCard
                  data={{
                    id: vid.id,
                    title: vid.title,
                    duration: vid.duration,
                  }}
                  index={index}
                />
              )}
            />
          ) : (
            <P>No audio available</P>
          )}
        </div>
      </div>
    </div>
  );
}
