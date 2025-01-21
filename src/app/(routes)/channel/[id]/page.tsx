import type { Metadata } from "next";
import { getChannel } from "@/actions/channel/get";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BrandIcons } from "@/components/icons/brand-icons";
import { getMe } from "@/actions/user/me";
import { Button } from "@/components/ui/button";
import { getVideosByChannelId } from "@/actions/yt/getVideosByChannelId";
import { Each } from "@/components/ui/each";
import AudioCard from "@/components/card/audio";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const info = await getChannel(id);
  return {
    title: info.name,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const me = await getMe();
  const isAdmin = me?.role === "admin";
  const info = await getChannel(id);
  if (info.code === "NOT_FOUND") notFound();

  const channel = {
    author: info.name,
    imageUrl: info.image,
    id: info.ytId,
  };

  const videos = await getVideosByChannelId(info.ytId!);

  return (
    <div className="flex w-full flex-col gap-4 overflow-hidden px-10 py-6">
      <div className="flex flex-wrap gap-4">
        <div className="relative aspect-square h-60 w-60 overflow-hidden rounded-md">
          <Image
            src={info.image || "/logo.svg"}
            alt={info.name || "Profile"}
            fill
            className="w-full rounded-md object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <h1 className="inline-block w-fit whitespace-normal">
            <span>{info.name}</span>
            {info.verified && (
              <BrandIcons.verified className="ml-2 inline-block shrink-0 fill-blue-500" />
            )}
          </h1>

          {/* </div> */}
          <small className="text-muted-foreground">
            {info.subscribers} {info.videoCounts}
          </small>
          <p>{info.description}</p>
          <div className="flex">
            <Link href={info.url!} target="_blank" className="hover:opacity-90">
              <BrandIcons.youtube className="h-6 w-6 text-red-500" />
            </Link>
          </div>
        </div>
        {isAdmin && (
          <Button className="ml-auto" variant={"destructive"}>
            Delete
          </Button>
        )}
      </div>
      <div className="my-6 flex flex-col">
        <h2>Playlist</h2>
        <div className="mt-4 flex w-full flex-col gap-1">
          {videos && videos?.length > 0 ? (
            <Each
              of={videos}
              render={(vid, index) => (
                <AudioCard data={vid} channel={channel} index={index} />
              )}
            />
          ) : (
            <p>No audio available</p>
          )}
        </div>
      </div>
    </div>
  );
}
