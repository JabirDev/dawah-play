import { auth } from "@/lib/auth/auth";

import Image from "next/image";
import HandlePlayer from "@/components/player/handle-player";
import InfiniteVideos from "@/components/list/infinite-videos";
import { ModeToggle } from "@/components/theme/mode";
import { Suspense } from "react";
import { VideoCardLoading } from "@/components/card/video";
import RecentVideos from "@/components/list/recent-videos";
import Main from "@/components/ui/main";

export default async function Home() {
  const session = await auth();
  return (
    <Main className="flex w-full flex-1 flex-col justify-center px-4 py-8">
      <Suspense fallback={<VideoCardLoading />}>
        <RecentVideos />
      </Suspense>
    </Main>
  );
}
