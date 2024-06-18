"use server";

import { ForgotPasswordFromSchema } from "@/containers/forms/auth/forgot-password-form";

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

export async function forgotPassword(values: ForgotPasswordFromSchema) {
  return fetch(`${process.env.BACKEND_API}/forgot-password`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).catch(() => ({
    data: {
      message: "Failed!",
    },
  }));
}
