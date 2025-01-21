import { Client } from "youtubei";

const youtube = new Client();

export async function getChannelInfo(id: string) {
  try {
    const channel = await youtube.getChannel(id);
    return {
      subscribers: channel?.subscriberCount,
      videoCounts: channel?.videoCount,
    };
  } catch (error) {
    console.error("ChannelInfo:", error);
    return null;
  }
}
