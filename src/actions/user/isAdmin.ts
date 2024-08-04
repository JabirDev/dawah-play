"use server";

import { validateRequest } from "@/lib/lucia/auth";
import prismadb from "@/lib/prisma";

export async function isadmin(): Promise<boolean> {
  const { user } = await validateRequest();

  if (!user) return false;

  const dbUser = await prismadb.user.findUnique({
    where: {
      id: user.id,
      username: user.username,
    },
  });

  if (!dbUser) return false;

  if (dbUser.role === "member") return false;

  return true;
}
