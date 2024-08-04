"use server";

import { eq, ilike, like } from "drizzle-orm";
import { db } from "../../../drizzle";
import { channelTable } from "../../../drizzle/schema";
import { getChannelInfo } from "../yt/channel";
import { ResponseCode } from "../yt/types";

interface Response {
  code: ResponseCode;
  error?: string | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  url?: string | null | undefined;
  ytId?: string | null | undefined;
  image?: string | null | undefined;
  verified?: boolean | null | undefined;
  subscribers?: string | null | undefined;
  videoCounts?: string | null | undefined;
}

export async function getChannel(id: string): Promise<Response> {
  try {
    const url = "https://www.youtube.com/" + id.replace("%40", "@");
    const channel = await db
      .select()
      .from(channelTable)
      .where(eq(channelTable.url, url));

    if (!channel.length) {
      console.log("channel:", channel);
      return {
        code: "NOT_FOUND",
        error: "Channel not found",
      };
    }

    const info = await getChannelInfo(channel[0].ytId);
    if (!info) {
      return {
        code: "NOT_FOUND",
        error: "Cannot find channel info",
      };
    }

    const { createdAt, updatedAt, ...dataChannel } = channel[0];

    return { code: "SUCCESS", ...dataChannel, ...info };
  } catch (error) {
    console.error("GetChannel:", error);
    return { code: "FAILED", error: "Something went wrong" };
  }
}
