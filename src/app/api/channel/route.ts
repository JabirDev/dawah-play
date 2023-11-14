import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma/prismadb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url!);
    const id = searchParams.get("id");

    if (id) {
      const findChannel = await prismadb.channel.findUnique({
        where: {
          id,
        },
      });
      return NextResponse.json(findChannel);
    }

    const channels = await prismadb.channel.findMany();
    return NextResponse.json(channels);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
