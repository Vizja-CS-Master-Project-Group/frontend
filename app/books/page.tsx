import TableResource from "@/containers/resource/table-resource";
import * as React from "react";
import { bookDelete, bookList } from "@/app/actions/books.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import getSession from "@/lib/getSession";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  const session = await getSession();

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <div className={"flex justify-between mb-2"}>
        <h1 className="text-lg font-semibold md:text-2xl">Books</h1>
        {session && session.user.role === "librarian" && (
          <Button variant={"default"} size={"sm"} asChild>
            <Link href="/books/create">
              <Plus className="mr-1 h-4 w-4" />
              Create
            </Link>
          </Button>
        )}
      </div>
      <TableResource
        page={searchParams?.page ?? 1}
        columns={[
          {
            header: "Name",
            accessorKey: "name",
            cell: (row) => (
              <Link href={`/books/${row.id}`} className={"text-primary"}>
                {row.name}
              </Link>
            ),
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
        resourceEditPath={"/books/{id}/edit"}
        resourceDeleteAction={bookDelete}
      />
    </div>
  );
}
