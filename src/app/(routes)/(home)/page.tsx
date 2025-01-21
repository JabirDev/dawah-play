import SectionChannel from "@/components/section/channel";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-2 px-2 py-6 md:px-4 lg:py-6">
      <Suspense fallback={<p>Loading...</p>}>
        <SectionChannel />
      </Suspense>
    </div>
  );
}
