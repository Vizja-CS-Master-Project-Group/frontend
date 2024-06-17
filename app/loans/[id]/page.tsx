import React from "react";
import { redirect } from "next/navigation";
import ViewResource from "@/containers/resource/view-resource";
import { loanShow } from "@/app/actions/loan.actions";
import { formatDatetime, formatMoney } from "@/lib/utils";

export default async function page({
  params: { id },
}: {
  params: { id: number | string };
}) {
  if (typeof id !== "number") {
    try {
      id = parseInt(id);
    } catch (e) {
      redirect("/loans");
    }
  }
  const loan = await loanShow(id);

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <ViewResource
        title={"Loans"}
        resourceAction={async () => loan}
        rows={[
          {
            label: "ID",
            accessorKey: "id",
          },
          {
            label: "ISBN",
            accessorKey: "book.isbn",
          },
          {
            label: "User",
            accessorKey: "user.name",
          },
          {
            label: "Book",
            accessorKey: "book.name",
          },
          {
            label: "Barrow At",
            accessorKey: "barrow_at",
            view: (data) => formatDatetime(data.returned_at),
          },
          {
            label: "Returned At",
            accessorKey: "returned_at",
            view: (data) =>
              data.returned_at ? formatDatetime(data.returned_at) : "-",
          },
          {
            label: "Paid Fee",
            accessorKey: "fee",
            view: (data) => (
              <>
                {data.returned_at ? (
                  data.fee ? (
                    formatMoney(data.fee)
                  ) : (
                    <i>Returned in time</i>
                  )
                ) : (
                  <i>Not Returned Yet</i>
                )}
              </>
            ),
          },
        ]}
        resourceEditName={"Return"}
        resourceEditPath={
          !loan.data.returned_at ? "/loans/{id}/return" : undefined
        }
      />
    </div>
  );
}
