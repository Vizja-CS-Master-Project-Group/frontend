import { ViewResourceInterface } from "@/types/misc";
import { BookType } from "@/types/book";
import { ResourceActionProps } from "@/containers/resource/table-resource";

export function login(email?: string, password?: string, headers?: Headers) {
  return fetch(`${process.env.BACKEND_API}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function csrfCookie() {
  return fetch(`${process.env.BACKEND_API}/sanctum/csrf-cookie`, {
    method: "GET",
  });
}

export async function booksApi(
  props: ResourceActionProps,
): Promise<ViewResourceInterface<BookType>> {
  const response = await fetch(
    `${process.env.BACKEND_API}/api/books?page=${props.page}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get books");
  }

  return await response.json();
}

export function backendApi() {}
