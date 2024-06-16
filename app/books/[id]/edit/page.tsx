import * as React from "react";
import { bookEditSchema } from "@/app/actions/books.actions";
import BookEditForm from "@/containers/forms/book/book-edit-form";
import { redirect } from "next/navigation";

export default async function ({
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

  const editSchema = await bookEditSchema(id);

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <h1 className="text-lg font-semibold md:text-2xl mb-2">Edit Book</h1>
      <div className={"relative w-full overflow-auto border rounded-md p-4"}>
        <BookEditForm
          id={id}
          data={editSchema.data}
          authors={editSchema.schema.authors}
          publishers={editSchema.schema.publishers}
        />
      </div>
    </div>
  );
}
