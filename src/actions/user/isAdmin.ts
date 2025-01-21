"use server";

import { and, eq } from "drizzle-orm";
import { getMe } from "./me";
import { db } from "@/db";
import { user } from "@/db/schema";

export async function isAdmin(): Promise<boolean> {
  const me = await getMe();

  if (!me) return false;

  const dbUser = await db.query.user.findFirst({
    where: and(eq(user.id, me.id), eq(user.username, me.username!)),
  });

  if (!dbUser) return false;

  if (dbUser.role === "member") return false;

  return true;
}
