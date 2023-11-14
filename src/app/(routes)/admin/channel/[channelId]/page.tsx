import { Metadata } from "next";
import { dynamicMetadata } from "@/lib/seo/metadata";
import prismadb from "@/lib/prisma/prismadb";
import Main from "@/components/ui/main";
import ChannelForm from "./components/form";
import ChannelInfo from "./components/info";
import { Channel } from "@prisma/client";
import { notFound } from "next/navigation";

interface ChannelProps {
  params: { channelId: string };
}

async function getChannel(id: string): Promise<Channel | null> {
  const channel = await prismadb.channel.findUnique({
    where: {
      id,
    },
    include: {
      avatar: true,
      banner: true,
    },
  });
  return channel;
}

export async function generateMetadata({
  params,
}: ChannelProps): Promise<Metadata> {
  const channel = await getChannel(params.channelId);
  const title =
    params.channelId === "new" ? "Add a New Channel" : channel?.name;
  return dynamicMetadata({
    title,
  });
}

const AddChannelPage = async ({ params }: ChannelProps) => {
  const id = params.channelId;
  const channel = await getChannel(id);

  if (params.channelId !== "new" && !channel) notFound();

  return (
    <Main className="flex-col">
      <div className="w-full flex-1 space-y-4 p-8 pt-6">
        {params.channelId === "new" ? (
          <ChannelForm />
        ) : (
          <ChannelInfo initialData={channel!} />
        )}
      </div>
    </Main>
  );
};

export default AddChannelPage;
