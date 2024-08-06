"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../../../drizzle";
import { bookmarkTable } from "../../../drizzle/schema";
import { getMe } from "../user/me";
import { ResponseCode } from "../yt/types";

interface Props {
  code: ResponseCode;
  error?: string | null | undefined;
  data?: (typeof bookmarkTable.$inferSelect)[] | null | undefined;
}

export async function getMyBookmark(): Promise<Props> {
  try {
    const me = await getMe();

    if (!me) {
      return {
        code: "NO_AUTH",
        error: "You have to login",
      };
    }

    const bookmarks = await db
      .select()
      .from(bookmarkTable)
      .where(eq(bookmarkTable.userId, me.id))
      .orderBy(desc(bookmarkTable.createdAt));
    return {
      code: "SUCCESS",
      data: bookmarks,
    };
  } catch (error) {
    console.error("GetMyBookmark:", error);
    return {
      code: "FAILED",
      error: "Something went wrong",
    };
  }
}
