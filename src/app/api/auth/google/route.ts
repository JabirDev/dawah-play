import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/lucia/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"],
    });

    cookies().set("google_oauth_state", state, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10,
      sameSite: "lax",
    });

    cookies().set("google_code_verifier", codeVerifier, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10,
      sameSite: "lax",
    });

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Error generating authorization URL:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
