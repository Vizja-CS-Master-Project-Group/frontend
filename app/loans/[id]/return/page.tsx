import React from "react";
import { redirect } from "next/navigation";
import { loanFinalizeSchema } from "@/app/actions/loan.actions";
import { formatMoney, formatNumber } from "@/lib/utils";
import LoanFinalizeForm from "@/containers/forms/loans/loan-finalize-form";

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
  const loan = await loanFinalizeSchema(id);
  if (loan.data.returned_at) {
    redirect(`/loans/${id}`);
  }

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <div className={"flex justify-between items-center w-full mb-2"}>
        <h1 className="text-lg font-semibold md:text-2xl">Return Book</h1>
      </div>
      <div
        className={
          "relative w-full overflow-auto border rounded-md border-gray-100 mb-4"
        }
      >
        <dl className="divide-y divide-gray-100 even:bg-slate-50">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Book ISBN
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {loan.data.book.isbn}
            </dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100 even:bg-slate-50">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Book Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {loan.data.book.name}
            </dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100 even:bg-slate-50">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Barrow At
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {loan.data.barrow_at}
            </dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100 even:bg-slate-50">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Book Late Return Fee
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 font-bold">
              {formatMoney(loan.meta.late_fee)} for{" "}
              {formatNumber(loan.meta.late_days)} day(s)
            </dd>
          </div>
        </dl>
      </div>
      <div className={"flex justify-end"}>
        <LoanFinalizeForm id={id} />
      </div>
    </div>
  );
}
