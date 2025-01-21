"use server";

import { and, eq } from "drizzle-orm";
import { getMe } from "../user/me";
import { ResponseCode } from "../yt/types";
import { saved, SavedType } from "@/db/schema";
import { db } from "@/db";

export interface GetSavedProps {
  code: ResponseCode;
  error?: string | null | undefined;
  data?: SavedType;
}

export async function getSaved(videoId: string): Promise<GetSavedProps> {
  try {
    const me = await getMe();

    if (!me) {
      return {
        code: "NO_AUTH",
        error: "You have to login",
      };
    }

    const savedItem = await db.query.saved.findFirst({
      where: and(eq(saved.userId, me?.id), eq(saved.videoId, videoId)),
    });

    return {
      code: "SUCCESS",
      data: savedItem,
    };
  } catch (error) {
    console.error("GetBookmark:", error);
    return {
      code: "FAILED",
      error: "Something went wrong",
    };
  }
}
