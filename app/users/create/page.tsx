import * as React from "react";
import { userSchema } from "@/app/actions/user.actions";

export default async function page() {
  const schema = await userSchema();

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <h1 className="text-lg font-semibold md:text-2xl mb-2">Create User</h1>
      <div className={"relative w-full overflow-auto border rounded-md p-4"}>
        TODO
      </div>
    </div>
  );
}
