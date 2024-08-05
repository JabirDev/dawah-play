"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../../../drizzle";
import { bookmarkTable } from "../../../drizzle/schema";
import { ResponseCode } from "../yt/types";
import { getMe } from "../user/me";

interface Props {
  code: ResponseCode;
  error?: string | null | undefined;
  success?: string | null | undefined;
}

export async function removeBookmark(videoId: string): Promise<Props> {
  try {
    const me = await getMe();
    if (!me) {
      return {
        code: "NO_AUTH",
        error: "You have to login",
      };
    }
    await db
      .delete(bookmarkTable)
      .where(
        and(
          eq(bookmarkTable.userId, me.id),
          eq(bookmarkTable.videoId, videoId),
        ),
      );

    return {
      code: "SUCCESS",
      success: "Bookmark removed",
    };
  } catch (error) {
    console.error("RemoveBookmark:", error);
    return {
      code: "FAILED",
      error: "Something went wrong",
    };
  }
}
