import { Client, VideoCompact } from "youtubei";

const youtube = new Client();

export const sortVideos = (a: VideoCompact, b: VideoCompact): number => {
  const correctOrder = [
    "second",
    "minute",
    "minutes",
    "hour",
    "hours",
    "day",
    "days",
    "week",
    "weeks",
    "month",
    "months",
    "year",
    "years",
  ];

  if (a.uploadDate && b.uploadDate) {
    const parseDate = (date: string) => {
      const parts = date.includes("Streaming")
        ? date.replace("Streaming ", "").split(" ")
        : date.split(" ");
      const value = parseInt(parts[0], 10);
      const unit = parts[1];
      return { value, unit };
    };

    const aDate = parseDate(a.uploadDate);
    const bDate = parseDate(b.uploadDate);

    const aIndex = correctOrder.indexOf(aDate.unit);
    const bIndex = correctOrder.indexOf(bDate.unit);

    if (aIndex > bIndex) {
      return 1;
    }
    if (aIndex < bIndex) {
      return -1;
    }

    // If both units are the same, compare the values
    return aDate.value - bDate.value;
  }

  // If one or both uploadDate are missing, consider them equal for sorting purposes
  return 0;
};

export async function getVideosByChannelId(
  channelId: string,
): Promise<VideoCompact[] | undefined> {
  const channel = await youtube.getChannel(channelId);
  const videos = await channel?.videos.next();
  return videos;
}
