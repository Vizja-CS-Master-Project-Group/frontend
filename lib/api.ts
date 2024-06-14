"use server";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

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

  if (!response.ok) {
    throw new Error("Failed when sending get request");
  }

  return response.json();
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

  if (!response.ok) {
    throw new Error("Failed when sending post request");
  }

  return response.json();
}
