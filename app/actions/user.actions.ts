import { ResourceActionProps } from "@/containers/resource/table-resource";
import { get, post } from "@/lib/api";
import { ViewInterface, ViewResourceInterface } from "@/types/misc";
import { UserInterface, UserSchemaInterface } from "@/types/user";
import { CreateUserFromSchema } from "@/containers/forms/user/user-create-form";

export async function userList(
  props: ResourceActionProps,
): Promise<ViewResourceInterface<UserInterface>> {
  return get(`users?page=${props.page}`);
}

export async function userCreateSchema(): Promise<UserSchemaInterface> {
  return get("users/create");
}

export async function userCreate(
  values: CreateUserFromSchema,
): Promise<UserInterface> {
  return post<ViewInterface<UserInterface>>("users", values).then(
    (r) => r.data,
  );
}
