"use server";

import prismadb from "@/lib/prisma";
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
    const channel = await prismadb.channel.findFirst({
      where: {
        url: { contains: id.replace("%40", "@") },
      },
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

    const { createdAt, updatedAt, ...dataChannel } = channel;

    return { code: "SUCCESS", ...dataChannel, ...info };
  } catch (error) {
    console.error("GetChannel:", error);
    return { code: "FAILED", error: "Something went wrong" };
  }
}
