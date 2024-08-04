"use server";

import { db } from "../../../drizzle";
import { channelTable } from "../../../drizzle/schema";

export async function getAllChannel() {
  const channels = await db.select().from(channelTable);
  return channels;
}
