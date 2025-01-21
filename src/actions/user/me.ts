"use server";

import { db } from "@/db";
import { user, UserType } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

async function getHeaders(): Promise<Headers> {
  const headersData = await headers();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(headersData);
    }, 1000),
  );
}

export async function getMe(): Promise<UserType | null | undefined> {
  try {
    const session = await auth.api.getSession({ headers: await getHeaders() });
    if (!session) {
      return null;
    }

    return await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });
  } catch (error) {
    console.error("GET_ME:", error);
    return null;
  }
}
