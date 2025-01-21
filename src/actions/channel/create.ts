"use server";

import { db } from "@/db";
import { channel } from "@/db/schema";
import { channelSchema, ChannelValues } from "@/types/channel";
import { eq } from "drizzle-orm";

export async function createChannel(data: ChannelValues) {
  try {
    const { url } = channelSchema.parse(data);

    const existingChannel = await db.query.channel.findFirst({
      where: eq(channel.url, url),
    });

    if (existingChannel) {
      return {
        error: "Channel already exist",
      };
    }

    await db.insert(channel).values({ id: crypto.randomUUID(), ...data });

    return { success: "Channel successfully created" };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
