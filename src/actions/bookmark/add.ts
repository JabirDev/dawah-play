"use server";

import { db } from "../../../drizzle";
import { bookmarkTable } from "../../../drizzle/schema";
import { getMe } from "../user/me";
import { ResponseCode } from "../yt/types";

interface Props {
  code: ResponseCode;
  error?: string | null | undefined;
  data?: typeof bookmarkTable.$inferSelect | null | undefined;
}

interface DataProps {
  channelId: string;
  videoId: string;
  author: string;
  imageUrl: string;
  duration: string;
  title: string;
}

export async function addBookmark(data: DataProps): Promise<Props> {
  try {
    const me = await getMe();
    if (!me) {
      return {
        code: "NO_AUTH",
        error: "You have to login",
      };
    }

    const add = await db
      .insert(bookmarkTable)
      .values({ ...data, userId: me.id })
      .returning();
    return {
      code: "SUCCESS",
      data: add[0],
    };
  } catch (error) {
    console.error("AddBookmark:", error);
    return { code: "FAILED", error: "Something went wrong" };
  }
}
