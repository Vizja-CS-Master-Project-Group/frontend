"use server";

import { CreateBookFromSchema } from "@/containers/forms/book/book-create-form";
import { ResourceActionProps } from "@/containers/resource/table-resource";
import {
  DeleteResponseInterface,
  ViewInterface,
  ViewResourceInterface,
} from "@/types/misc";
import { BookCreateSchemaInterface, BookInterface } from "@/types/book";
import { deleteRequest, get, post } from "@/lib/api";

export async function bookShow(
  id: number,
): Promise<ViewInterface<BookInterface>> {
  return get(`books/${id}`);
}

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

export async function bookCreateSchema() {
  return get<BookCreateSchemaInterface>("books/create");
}

export async function bookEdit() {
  return null;
}

export async function bookEditSchema() {
  return null;
}

export async function bookDelete(book: BookInterface) {
  return deleteRequest<DeleteResponseInterface>(`books/${book.id}`);
}

export async function bookSchema() {
  const response = await fetch(`${process.env.BACKEND_API}/api/books/schema`);
  if (!response.ok) {
    throw new Error("Failed to get books schema");
  }

  return response.json();
}
