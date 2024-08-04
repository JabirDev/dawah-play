import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { google, lucia } from "@/lib/lucia/auth";
import { generateIdFromEntropySize } from "lucia";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../drizzle";
import { accountTable, userTable } from "../../../../../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new NextResponse(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      // "https://www.googleapis.com/oauth2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser: GoogleUser = await response.json();

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
      if (!account) {
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
      return new NextResponse(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateIdFromEntropySize(10);
    const newUser = await db
      .insert(userTable)
      .values({
        id: userId,
        name: googleUser.name,
        email: googleUser.email,
        image: googleUser.picture,
        username: getUsernameFromEmail(googleUser.email),
      })
      .returning();
    const newAccount = await db
      .insert(accountTable)
      .values({
        id: generateIdFromEntropySize(10),
        provider: "google",
        providerId: googleUser.sub,
        userId,
      })
      .returning();

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new NextResponse(null, {
        status: 400,
      });
    }
    return new NextResponse(null, {
      status: 500,
    });
  }
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
