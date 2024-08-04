"use server";

import { channelSchema, ChannelValues } from "@/types/channel";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { db } from "../../../drizzle";
import { channelTable } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function createChannel(data: ChannelValues) {
  try {
    const { url } = channelSchema.parse(data);

    const existingChannel = await db
      .select()
      .from(channelTable)
      .where(eq(channelTable.url, url));

    if (existingChannel.length) {
      return {
        error: "Channel already exist",
      };
    }

    await db.insert(channelTable).values(data);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
