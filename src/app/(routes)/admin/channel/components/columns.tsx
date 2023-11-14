"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialName } from "@/lib/utils";
import Link from "next/link";

export type ChannelColumn = {
  id: string;
  name: string;
  avatar: string;
};

export const Columns: ColumnDef<ChannelColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link href={`/admin/channel/${row.original.id}`}>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={row.original.avatar}
              className="h-fit w-fit object-cover"
            />
            <AvatarFallback>{getInitialName(row.original.name)}</AvatarFallback>
          </Avatar>
          <p className="font-semibold">{row.original.name}</p>
        </div>
      </Link>
    ),
  },
];
