import { getMyBookmark } from "@/actions/bookmark/getMyBookmark";
import { Each } from "../ui/each";
import AudioCard from "../card/audio";
import Large from "../typography/large";

const BookmarkList = async () => {
  const bookmarks = (await getMyBookmark()) ?? [];

  if (!bookmarks.data?.length) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Large>Bookmark Empty</Large>
      </div>
    );
  }

  return (
    <Each
      of={bookmarks.data}
      render={(bookmark, index) => (
        <AudioCard
          data={{
            ...bookmark,
            id: bookmark.videoId,
            duration: parseInt(bookmark.duration),
            isBookmarked: true,
          }}
          index={index}
        />
      )}
    />
  );
};

export default BookmarkList;
