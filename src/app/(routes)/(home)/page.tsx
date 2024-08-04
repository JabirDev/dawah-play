import { getAudio } from "@/actions/yt/getAudio";
import SectionChannel from "@/components/section/channel";
import SectionVidoes from "@/components/section/vidoes";
import { Suspense } from "react";
import Client from "./compoents/client";

export default async function Home() {
  const audio = await getAudio("wgb0oOuQ3NY");
  //   console.log("audio:", audio);
  return (
    <div className="flex min-h-screen w-full flex-col gap-2 px-2 py-6 md:px-4 lg:py-6">
      <Suspense fallback={<p>Loading...</p>}>
        <SectionChannel />
      </Suspense>
      {audio && <Client {...audio} />}
      {/* <Suspense fallback={<p>Loading...</p>}>
        <SectionVidoes />
      </Suspense> */}
    </div>
  );
}
