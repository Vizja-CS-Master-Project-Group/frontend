"use server";

import { ResourceActionProps } from "@/containers/resource/table-resource";
import { deleteRequest, get, post } from "@/lib/api";
import {
  DeleteResponseInterface,
  ViewInterface,
  ViewResourceInterface,
} from "@/types/misc";
import { UserInterface, UserSchemaInterface } from "@/types/user";
import { CreateUserFromSchema } from "@/containers/forms/user/user-create-form";

export async function userShow(id: number) {
  return get<ViewInterface<UserInterface>>(`users/${id}`);
}

export async function userList(
  props: ResourceActionProps,
): Promise<ViewResourceInterface<UserInterface>> {
  return get(`users?page=${props.page}`);
}

export async function userCreate(
  values: CreateUserFromSchema,
): Promise<UserInterface> {
  return post<ViewInterface<UserInterface>>("users", values).then(
    (r) => r.data,
  );
}

export async function userCreateSchema(): Promise<UserSchemaInterface> {
  return get<UserSchemaInterface>("users/create");
}

export async function userEdit() {
  return null;
}

export async function userEditSchema() {
  return null;
}

export async function userDelete(user: UserInterface) {
  return deleteRequest<DeleteResponseInterface>(`users/${user.id}`);
}
