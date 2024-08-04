"use server";

import { validateRequest } from "@/lib/lucia/auth";
import prismadb from "@/lib/prisma";

export async function getMe() {
  const session = await validateRequest();
  if (!session.user) {
    return null;
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
      username: session.user.username,
    },
  });

  return user;
}
