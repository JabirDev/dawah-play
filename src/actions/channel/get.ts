"use server";

import { eq } from "drizzle-orm";
import { getChannelInfo } from "../yt/channel";
import { ResponseCode } from "../yt/types";
import { db } from "@/db";
import { channel as Channel } from "@/db/schema";

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
    const channel = await db.query.channel.findFirst({
      where: eq(Channel.url, url),
    });

    if (!channel) {
      return {
        code: "NOT_FOUND",
        error: "Channel not found",
      };
    }

    const info = await getChannelInfo(channel.ytId);
    if (!info) {
      return {
        code: "NOT_FOUND",
        error: "Cannot find channel info",
      };
    }

    const { ...dataChannel } = channel;

    return { code: "SUCCESS", ...dataChannel, ...info };
  } catch (error) {
    console.error("GetChannel:", error);
    return { code: "FAILED", error: "Something went wrong" };
  }
}
