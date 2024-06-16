import BookCreateForm from "@/containers/forms/book/book-create-form";
import * as React from "react";
import { bookCreateSchema } from "@/app/actions/books.actions";

export default async function page() {
  const schema = await bookCreateSchema();

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <h1 className="text-lg font-semibold md:text-2xl mb-2">Create Book</h1>
      <div className={"relative w-full overflow-auto border rounded-md p-4"}>
        <BookCreateForm
          authors={schema.authors}
          publishers={schema.publishers}
        />
      </div>
    </div>
  );
}
