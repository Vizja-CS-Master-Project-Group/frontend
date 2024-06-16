"use server";

import { CreateBookFromSchema } from "@/containers/forms/book/book-create-form";
import { ResourceActionProps } from "@/containers/resource/table-resource";
import { ViewInterface, ViewResourceInterface } from "@/types/misc";
import { BookInterface } from "@/types/book";
import { get, post } from "@/lib/api";

export async function bookList(
  props: ResourceActionProps,
): Promise<ViewResourceInterface<BookInterface>> {
  return get(`books?page=${props.page}`);
}

export async function bookCreate(
  value: CreateBookFromSchema,
): Promise<BookInterface> {
  return post<ViewInterface<BookInterface>>("books", value).then((v) => v.data);
}

export async function bookEdit() {
  return null;
}

export async function bookDelete(book: BookInterface) {
  return null;
}

export async function bookSchema() {
  const response = await fetch(`${process.env.BACKEND_API}/api/books/schema`);
  if (!response.ok) {
    throw new Error("Failed to get books schema");
  }

  return response.json();
}
