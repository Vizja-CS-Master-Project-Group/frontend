import { ResourceActionProps } from "@/containers/resource/table-resource";
import { get } from "@/lib/api";
import { ViewResourceInterface } from "@/types/misc";
import { UserInterface } from "@/types/user";

export async function userList(
  props: ResourceActionProps,
): Promise<ViewResourceInterface<UserInterface>> {
  return get(`users?page=${props.page}`);
}

export async function userSchema() {
  return get("users/schema");
}
