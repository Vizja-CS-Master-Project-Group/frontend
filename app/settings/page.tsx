import React from "react";
import SettingsEditForm from "@/containers/forms/settings/settings-edit-form";
import { settings } from "@/app/actions/setting.action";

export default async function page() {
  const loanSchema = await settings();

  return (
    <div className={"w-full p-4 lg:p-6"}>
      <h1 className="text-lg font-semibold md:text-2xl mb-2">Settings</h1>
      <div className={"relative w-full overflow-auto border rounded-md p-4"}>
        <SettingsEditForm settings={loanSchema} />
      </div>
    </div>
  );
}
