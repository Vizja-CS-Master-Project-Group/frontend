"use server";

export async function login(
  email?: string,
  password?: string,
  headers?: Headers,
) {
  return fetch(`${process.env.BACKEND_API}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function csrfCookie() {
  return fetch(`${process.env.BACKEND_API}/sanctum/csrf-cookie`, {
    method: "GET",
  });
}
