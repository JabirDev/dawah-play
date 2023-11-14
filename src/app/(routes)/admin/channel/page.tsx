import prismadb from "@/lib/prisma/prismadb";
import { staticMetadata } from "@/lib/seo/metadata";
import { ChannelColumn } from "./components/columns";
import Client from "./components/client";
import Main from "@/components/ui/main";

export const metadata = staticMetadata({
  title: "Channel List",
  description: "Channel list in DawahPlay",
});

const AddChannelPage = async () => {
  const channels = await prismadb.channel.findMany({
    include: {
      avatar: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedChannel: ChannelColumn[] = channels.map((item) => ({
    id: item.id,
    name: item.name,
    avatar: item.avatar.at(1)?.url!,
  }));

  return (
    <Main className="flex-col justify-normal gap-4 p-4">
      <Client data={formattedChannel} />
    </Main>
  );
};

export default AddChannelPage;
