import { getVideos } from "@/actions/channel/videos";
import CardVideo from "../card/video";
import Lead from "../typography/lead";
import { Each } from "../ui/each";
import H2 from "../typography/h2";
import H3 from "../typography/h3";

const SectionVidoes = async () => {
  const videos = (await getVideos()) ?? [];
  return (
    <div className="flex flex-col gap-4">
      <H3>Latest</H3>
      <div className="flex flex-wrap gap-2 gap-y-6">
        <Each of={videos} render={(vid) => <CardVideo data={vid!} />} />
      </div>
    </div>
  );
};

export default SectionVidoes;
