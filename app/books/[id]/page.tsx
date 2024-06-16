import React from "react";
import { redirect } from "next/navigation";
import ViewResource from "@/containers/resource/view-resource";
import { bookDelete, bookShow } from "@/app/actions/books.actions";

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
        title={"Books"}
        resourceAction={async () => bookShow(id)}
        rows={[
          {
            label: "Name",
            accessorKey: "name",
          },
          {
            label: "Language",
            accessorKey: "language",
          },
          {
            label: "Author",
            accessorKey: "author.name",
          },
          {
            label: "Page",
            accessorKey: "page_count",
          },
          {
            label: "Subject",
            accessorKey: "subject",
          },
        ]}
        resourceEditPath={"/books/{id}/edit"}
        resourceDeleteAction={bookDelete}
      />
    </div>
  );
}
