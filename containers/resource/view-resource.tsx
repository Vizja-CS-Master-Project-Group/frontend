"use server";

import React from "react";
import {
  DeleteResponseInterface,
  NestedKeyOf,
  ViewInterface,
} from "@/types/misc";
import ViewResourceActions from "@/containers/resource/view-resource-actions";
import { redirect } from "next/navigation";
const format = require("string-format");

interface Row<T extends object = object> {
  label: string;
  accessorKey: NestedKeyOf<T>;
  view?: (data: T) => React.ReactNode;
}

interface ViewResourceProps<T extends object> {
  title: string;
  rows: Row<T>[];
  resourceAction: () => Promise<ViewInterface<T>>;
  resourceEditPath?: string;
  resourceDeleteAction?: (d: T) => Promise<DeleteResponseInterface>;
}

export default async function ViewResource<T extends object = object>({
  title,
  rows,
  resourceAction,
  resourceEditPath,
  resourceDeleteAction,
}: ViewResourceProps<T>) {
  let resource;
  try {
    resource = await resourceAction().then((r) => r.data);
  } catch (e) {
    redirect("/");
  }

  if (!resource) {
    return null;
  }

  return (
    <>
      <div className={"flex justify-between items-center w-full mb-2"}>
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        <ViewResourceActions
          data={resource}
          resourceEditPath={resourceEditPath}
          resourceDeleteAction={resourceDeleteAction}
        />
      </div>
      <div
        className={
          "relative w-full overflow-auto border rounded-md border-gray-100"
        }
      >
        <dl className="divide-y divide-gray-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {row.view
                  ? row.view(resource)
                  : format(`{${row.accessorKey}}`, resource)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
