import TableResource from "@/containers/resource/table-resource";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import getSession from "@/lib/getSession";
import { loanList } from "@/app/actions/loan.actions";
import { formatMoney } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  const session = await getSession();

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <div className={"flex justify-between mb-2"}>
        <h1 className="text-lg font-semibold md:text-2xl">Loans</h1>
        {session && session.user.role === "librarian" && (
          <Button variant={"default"} size={"sm"} asChild>
            <Link href="/loans/create">
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
            header: "ID",
            accessorKey: "id",
            cell: (row) => (
              <Link href={`/loans/${row.id}`} className={"text-primary"}>
                #{row.id}
              </Link>
            ),
          },
          {
            header: "User",
            accessorKey: "user.name",
            isAccessible: session?.user?.role === "librarian",
            cell: (row) => (
              <Link href={`/users/${row.user.id}`} className={"text-primary"}>
                {row.user.full_name}
              </Link>
            ),
          },
          {
            header: "Book",
            accessorKey: "book.name",
            cell: (row) => (
              <Link href={`/books/${row.book.id}`} className={"text-primary"}>
                {row.book.name}
              </Link>
            ),
          },
          {
            header: "Barrow At",
            accessorKey: "barrow_at",
          },
          {
            header: "Returned At",
            accessorKey: "returned_at",
          },
          {
            header: "Total Fee",
            accessorKey: "fee",
            cell: (row) => formatMoney(row.fee ?? 0),
          },
        ]}
        resourceAction={loanList}
        resourceEditPath={
          session?.user.role !== "user" ? "/loans/{id}/finalize" : undefined
        }
      />
    </div>
  );
}
