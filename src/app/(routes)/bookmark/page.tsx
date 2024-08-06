import BookmarkList from "@/components/section/bookmark-list";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Bookmark",
};

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-1 px-4 py-6">
      <Suspense fallback={<p>Loading data...</p>}>
        <BookmarkList />
      </Suspense>
    </div>
  );
}
