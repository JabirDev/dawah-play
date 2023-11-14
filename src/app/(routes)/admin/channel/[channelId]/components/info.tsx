import { MaterialIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { getInitialName } from "@/lib/utils";
import { Channel, Image as ImageDb } from "@prisma/client";
import { Trash, Loader2 } from "lucide-react";
import Image from "next/image";

interface ChannelProps {
  initialData: Channel & {
    avatar?: ImageDb[];
    banner?: ImageDb[];
  };
}

const ChannelInfo: React.FC<ChannelProps> = ({ initialData }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="sticky top-0 z-20 flex items-center justify-between bg-background py-4">
        <Heading
          showBackButton
          // backUrl="/admin/channel"
          title={initialData.name}
          description={initialData.subscribers}
        />
        <div className="flex gap-4">
          {initialData && (
            <Button
              type="button"
              //   disabled={loading}
              variant="destructive"
              size="icon"
              //   onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <Image
            src={initialData?.banner?.at(0)?.url!}
            className="rounded-md object-cover"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <Avatar className="h-28 w-28">
            <AvatarImage src={initialData?.avatar?.at(0)?.url!} />
            <AvatarFallback>{getInitialName(initialData.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold">
              {initialData.name}{" "}
              {initialData.isVerified && (
                <MaterialIcon
                  filled
                  color="text-muted-foreground"
                  variants="rounded"
                  fontSize="md"
                >
                  verified
                </MaterialIcon>
              )}
            </h2>
            <p className="text-muted-foreground">{initialData.subscribers}</p>
            <div className="description mt-4">
              <p className="text-lg">{initialData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
