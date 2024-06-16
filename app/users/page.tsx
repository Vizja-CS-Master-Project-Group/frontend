import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import TableResource from "@/containers/resource/table-resource";
import * as React from "react";
import { userList } from "@/app/actions/user.actions";

export default function Page({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  return (
    <div className={"w-full p-4 lg:p-6"}>
      <div className={"flex justify-between mb-2"}>
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <Button variant={"default"} size={"sm"} asChild>
          <Link href="/users/create">
            <Plus className="mr-1 h-4 w-4" />
            Create
          </Link>
        </Button>
      </div>
      <TableResource
        page={searchParams?.page ?? 1}
        columns={[
          {
            header: "ID",
            accessorKey: "id",
          },
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Lastname",
            accessorKey: "lastname",
          },
          {
            header: "Email",
            accessorKey: "email",
          },
        ]}
        resourceAction={userList}
      />
    </div>
  );
}
