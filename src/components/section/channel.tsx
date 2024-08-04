import { getAllChannel } from "@/actions/channel/getAll";
import CardChannel from "../card/channel";
import { Each } from "../ui/each";

const SectionChannel = async () => {
  const channels = (await getAllChannel()) ?? [];

  return (
    <div className="mb-4 flex flex-col gap-4 border-b pb-4">
      <div className="flex gap-2">
        <Each of={channels} render={(ch) => <CardChannel data={ch} />} />
      </div>
    </div>
  );
};

export default SectionChannel;
