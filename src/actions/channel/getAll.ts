"use server";

import prismadb from "@/lib/prisma";

export async function getAllChannel() {
  const channels = await prismadb.channel.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return channels;
}
