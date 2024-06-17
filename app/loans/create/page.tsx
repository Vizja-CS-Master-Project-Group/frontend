import React from "react";
import { loanCreateSchema } from "@/app/actions/loan.actions";
import LoanCreateForm from "@/containers/forms/loans/loan-create-form";

export default async function page() {
  const loanSchema = await loanCreateSchema();

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <h1 className="text-lg font-semibold md:text-2xl mb-2">Create Loan</h1>
      <div className={"relative w-full overflow-auto border rounded-md p-4"}>
        <LoanCreateForm
          users={loanSchema.schema.users}
          books={loanSchema.schema.books}
        />
      </div>
    </div>
  );
}
