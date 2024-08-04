"use server";

import { validateRequest } from "@/lib/lucia/auth";
import { load } from "cheerio";
import { ResponseCode } from "./types";
import { getMe } from "../user/me";
import { db } from "../../../drizzle";
import { channelTable } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

interface Response {
  id?: string | null | undefined;
  title?: string | null | undefined;
  about?: string | null | undefined;
  image?: string | null | undefined;
  code: ResponseCode;
  error?: string | undefined;
}

export async function getInfoChannel(url: string): Promise<Response> {
  try {
    const me = await getMe();
    if (!me) {
      return {
        code: "NO_AUTH",
        error: "You have to login",
      };
    }

    const existingChannel = await db
      .select()
      .from(channelTable)
      .where(eq(channelTable.url, url));

    if (existingChannel.length) {
      return {
        code: "ALREADY_EXIST",
        error: "This channel is already exist",
      };
    }

    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    const channelId = $('link[itemprop="url"]').attr("href");
    const title = $('meta[property="og:title"]').attr("content");
    const about = $('meta[property="og:description"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");

    if (channelId) {
      return {
        code: "SUCCESS",
        id: getChannelId(channelId),
        title,
        about,
        image,
      };
    } else {
      console.error("Channel ID not found on the page.");
      return {
        code: "NOT_FOUND",
        error: "Channel not found",
      };
    }
  } catch (error) {
    console.error("Error fetching channel ID:", error);
    return {
      code: "FAILED",
      error: "Something went wrong",
    };
  }
}

function getChannelId(url: string): string | null {
  const regex = /\/([^\/]+)\/?$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
