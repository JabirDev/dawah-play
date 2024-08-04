import { getYtVideos, sortVideos } from "../yt/videos";
import { getAllChannel } from "./getAll";

export async function getVideos() {
  try {
    const channels = await getAllChannel();

    const fetchVideos = Promise.all(
      channels.map(async (channel) => {
        try {
          const videos = await getYtVideos(channel.ytId);
          return videos || []; // Ensure it returns an array
        } catch (error) {
          console.error(
            `Error fetching videos for channel ${channel.ytId}:`,
            error,
          );
          return []; // Return an empty array if there's an error
        }
      }),
    );

    const flatVideos = (await fetchVideos).flat();
    flatVideos.sort(sortVideos);

    // console.log("fetch:", flatVideos);

    return flatVideos;
  } catch (error) {
    console.error("Error fetching channels or videos:", error);
    return []; // Return an empty array if there's an error in the whole process
  }
}
