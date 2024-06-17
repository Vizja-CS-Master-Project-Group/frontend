"use server";

import { EditSettingsFromSchema } from "@/containers/forms/settings/settings-edit-form";
import { get, put } from "@/lib/api";
import { SettingsInterface } from "@/types/settings";

export async function settings() {
  return get<SettingsInterface>("settings");
}

export async function settingsEdit(data: EditSettingsFromSchema) {
  return put("settings", data);
}
