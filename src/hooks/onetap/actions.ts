"use server";

import { lucia } from "@/lib/lucia/auth";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { db } from "../../../drizzle";
import { accountTable, userTable } from "../../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export const onetapAction = async (token: string) => {
  try {
    const googleUser: GoogleUser = parseJwt(token);

    console.log("onetap user:", googleUser);

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, googleUser.email));

    const account = await db
      .select()
      .from(accountTable)
      .where(
        and(
          eq(accountTable.provider, "google"),
          eq(accountTable.providerId, googleUser.sub),
        ),
      );

    if (existingUser.length) {
      if (!account.length) {
        await db.insert(accountTable).values({
          id: generateIdFromEntropySize(10),
          provider: "google",
          providerId: googleUser.sub,
          userId: existingUser[0].id,
        });
      }
      const session = await lucia.createSession(existingUser[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    const userId = generateIdFromEntropySize(10);
    await db.transaction(async (tx) => {
      await db.insert(userTable).values({
        id: userId,
        name: googleUser.name,
        email: googleUser.email,
        image: googleUser.picture,
        username: getUsernameFromEmail(googleUser.email),
      });
      await tx.insert(accountTable).values({
        id: generateIdFromEntropySize(10),
        provider: "google",
        providerId: googleUser.sub,
        userId,
      });
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.error("onetap:", error);
  }
};

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

function getUsernameFromEmail(email: string): string {
  const match = email.match(/^([^@]+)@/);
  return match ? match[1] : "";
}

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
