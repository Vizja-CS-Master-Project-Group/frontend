import { redirect } from "next/navigation";
import { userDelete, userList, userShow } from "@/app/actions/user.actions";
import ViewResource from "@/containers/resource/view-resource";
import * as React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: number | string };
}) {
  if (typeof id !== "number") {
    try {
      id = parseInt(id);
    } catch (e) {
      redirect("/users");
    }
  }

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <ViewResource
        title={`User ${id}`}
        resourceAction={async () => userShow(id)}
        rows={[
          {
            label: "ID",
            accessorKey: "id",
          },
          {
            label: "Name",
            accessorKey: "name",
          },
          {
            label: "Lastname",
            accessorKey: "lastname",
          },
          {
            label: "Email",
            accessorKey: "email",
          },
          {
            label: "Registered At",
            accessorKey: "registered_at",
          },
        ]}
        resourceDeleteAction={userDelete}
      />
    </div>
  );
}
