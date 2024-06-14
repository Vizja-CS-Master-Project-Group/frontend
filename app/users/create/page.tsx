import * as React from "react";
import { userCreateSchema } from "@/app/actions/user.actions";
import UserCreateForm from "@/containers/forms/user/user-create-form";

export default async function page() {
  const schema = await userCreateSchema();

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <h1 className="text-lg font-semibold md:text-2xl mb-2">Create User</h1>
      <div className={"relative w-full overflow-auto border rounded-md p-4"}>
        <UserCreateForm roles={schema.roles} />
      </div>
    </div>
  );
}
