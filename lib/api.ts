"use server";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { DeleteResponseInterface } from "@/types/misc";

export async function get<T>(path: string): Promise<T> {
  const session = await getSession();

  if (!session) {
    // redirect("/login");
  }

  const response = await fetch(`${process.env.BACKEND_API}/api/${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  return handleResponse(response, "Failed when sending GET request");
}

export async function post<T>(path: string, body: any): Promise<T> {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const response = await fetch(`${process.env.BACKEND_API}/api/${path}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  return handleResponse(response, "Failed when sending POST request");
}

export async function deleteRequest<T>(path: string): Promise<T> {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const response = await fetch(`${process.env.BACKEND_API}/api/${path}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  return handleResponse(response, "Failed when sending DELETE request");
}

export async function put<T>(path: string, body: any): Promise<T> {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const response = await fetch(`${process.env.BACKEND_API}/api/${path}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  return handleResponse(response, "Failed when sending PUT request");
}

async function handleResponse<T>(
  response: Response,
  error: string,
): Promise<T> {
  if (response.ok) {
    return handleJson(response);
  }

  try {
    return handleJson(response);
  } catch (e) {
    console.log("CORTLADIK MI??");
    return Promise.reject({
      data: {
        variant: "error",
        error,
      },
    });
  }
}

async function handleJson<T>(response: Response): Promise<T> {
  const json = await response.json();
  if (json?.data && json?.data?.variant === "error") {
    return Promise.reject(json);
  }

  return json;
}
