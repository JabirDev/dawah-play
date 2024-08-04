"use server";

import { validateRequest } from "@/lib/lucia/auth";
import { db } from "../../../drizzle";
import { userTable } from "../../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function isadmin(): Promise<boolean> {
  const { user } = await validateRequest();

  if (!user) return false;

  const dbUser = await db
    .select()
    .from(userTable)
    .where(
      and(eq(userTable.id, user.id), eq(userTable.username, user.username)),
    );

  if (!dbUser) return false;

  if (dbUser[0].role === "member") return false;

  return true;
}
