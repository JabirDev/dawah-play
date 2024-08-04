"use server";

import { lucia } from "@/lib/lucia/auth";
import { signInSchema, SignInValues } from "@/lib/lucia/validation";
import { verify } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../../../../drizzle";
import { userTable } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function signIn(
  credentials: SignInValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = signInSchema.parse(credentials);

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (!existingUser.length || !existingUser[0].password) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validatePassword = await verify(existingUser[0].password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validatePassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser[0].id, {});
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
