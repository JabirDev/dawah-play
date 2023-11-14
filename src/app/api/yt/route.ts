import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import prismadb from "@/lib/prisma/prismadb";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.role === "member") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const { avatar, banner, ...data } = (await req.json()) as any;
    console.log(data);

    const findChannel = await prismadb.channel.findUnique({
      where: {
        id: data.id,
      },
    });

    if (findChannel) {
      const updateChannel = await prismadb.channel.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          description: data.description,
          isVerified: data.isVerified,
          url: data.url,
          subscribers: data.subscribers,
          joined: data.joined,
          country: data.country,
          avatar: {
            createMany: {
              data: [
                ...avatar.map(
                  (image: { url: string; width: number; height: number }) =>
                    image,
                ),
              ],
            },
          },
          banner: {
            createMany: {
              data: [
                ...banner.map(
                  (image: { url: string; width: number; height: number }) =>
                    image,
                ),
              ],
            },
          },
        },
      });
      return NextResponse.json(updateChannel);
    }

    const addChannel = await prismadb.channel.create({
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
        isVerified: data.isVerified,
        url: data.url,
        subscribers: data.subscribers,
        joined: data.joined,
        country: data.country,
        avatar: {
          createMany: {
            data: [
              ...avatar.map(
                (image: { url: string; width: number; height: number }) =>
                  image,
              ),
            ],
          },
        },
        banner: {
          createMany: {
            data: [
              ...banner.map(
                (image: { url: string; width: number; height: number }) =>
                  image,
              ),
            ],
          },
        },
      },
    });
    return NextResponse.json(addChannel);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.role === "member") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
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
