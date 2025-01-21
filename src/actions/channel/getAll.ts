"use server";

import { db } from "@/db";

export async function getAllChannel() {
  return await db.query.channel.findMany();
}
