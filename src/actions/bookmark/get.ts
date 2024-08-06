"use server";

import { and, eq } from "drizzle-orm";
import { bookmarkTable } from "../../../drizzle/schema";
import { getMe } from "../user/me";
import { ResponseCode } from "../yt/types";
import { db } from "../../../drizzle";

export interface GetBookmarkProps {
  code: ResponseCode;
  error?: string | null | undefined;
  data?: typeof bookmarkTable.$inferSelect;
}

export async function getBookmark(videoId: string): Promise<GetBookmarkProps> {
  try {
    const me = await getMe();

    if (!me) {
      return {
        code: "NO_AUTH",
        error: "You have to login",
      };
    }

    const bookmark = await db
      .select()
      .from(bookmarkTable)
      .where(
        and(
          eq(bookmarkTable.userId, me?.id),
          eq(bookmarkTable.videoId, videoId),
        ),
      );

    return {
      code: "SUCCESS",
      data: bookmark[0],
    };
  } catch (error) {
    console.error("GetBookmark:", error);
    return {
      code: "FAILED",
      error: "Something went wrong",
    };
  }
}
