"use server";

import { lucia } from "@/lib/lucia/auth";
import { signUpSchema, SignUpValues } from "@/lib/lucia/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../../../../drizzle";
import { userTable } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);
    console.log("credentials:", credentials);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (existingUsername.length) {
      console.log("user:", existingUsername[0].username);
      return {
        error: "Username already taken",
      };
    }

    const existingEmail = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingEmail.length) {
      console.log("user:", existingEmail[0].email);
      return {
        error: "Email already taken",
      };
    }

    await db.insert(userTable).values({
      ...credentials,
      id: userId,
      name: username,
      password: passwordHash,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
