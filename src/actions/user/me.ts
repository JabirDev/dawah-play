"use server";

import { validateRequest } from "@/lib/lucia/auth";
import { db } from "../../../drizzle";
import { userTable } from "../../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function getMe() {
  const session = await validateRequest();
  if (!session.user) {
    return null;
  }

  const user = await db
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.id, session.user.id),
        eq(userTable.username, session.user.username),
      ),
    );

  const { createdAt, email, ...me } = user[0];

  return me;
}
