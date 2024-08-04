"use server";

import prismadb from "@/lib/prisma";
import { channelSchema, ChannelValues } from "@/types/channel";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function createChannel(data: ChannelValues) {
  try {
    const { url } = channelSchema.parse(data);

    const existingChannel = await prismadb.channel.findUnique({
      where: {
        url,
      },
    });

    if (existingChannel) {
      return {
        error: "Channel already exist",
      };
    }

    await prismadb.channel.create({
      data,
    });

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
