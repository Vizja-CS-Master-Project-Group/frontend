import TableResource from "@/containers/resource/table-resource";
import * as React from "react";
import { bookList } from "@/app/actions/books.actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  return (
    <div className={"w-full p-4 lg:p-6"}>
      <h1 className="text-lg font-semibold md:text-2xl mb-2">Books</h1>
      <TableResource
        page={searchParams?.page ?? 1}
        columns={[
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Author",
            headerClassName: "w-56 text-center",
            accessorKey: "writer",
            cellClassName: "w-56 text-center",
            cell: (row) => `${row.author.name} ${row.author.lastname}`,
          },
          {
            header: "Language",
            headerClassName: "w-40 text-center",
            accessorKey: "language",
            cellClassName: "w-40 text-center",
          },
        ]}
        resourceAction={bookList}
      />
    </div>
  );
}
