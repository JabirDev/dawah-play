"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ChannelColumn, Columns } from "./columns";
import Main from "@/components/ui/main";
import Link from "next/link";

interface ClientProps {
  data: ChannelColumn[];
}

const Client: React.FC<ClientProps> = ({ data }) => {
  return (
    <Main className="flex-col gap-4">
      <div className="sticky top-0 z-50 flex items-center justify-between bg-background py-4">
        <Heading
          showBackButton
          title={`Channels (${data.length})`}
          description="Manage channels for your website"
        />
        <Link href="/admin/channel/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Columns} data={data} />
    </Main>
  );
};

export default Client;
