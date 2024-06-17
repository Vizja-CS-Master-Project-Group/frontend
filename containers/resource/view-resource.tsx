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
  resourceEditName?: string;
  resourceEditPath?: string;
  resourceDeleteAction?: (d: T) => Promise<DeleteResponseInterface>;
}

export default async function ViewResource<T extends object = object>({
  title,
  rows,
  resourceAction,
  resourceEditName,
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

  function renderView(row: Row<T>, data: T) {
    if (row.view) {
      return row.view(data);
    }

    const viewData = format(`{${row.accessorKey}}`, data);
    if (viewData === "null") {
      return "-";
    }

    return viewData ?? "-";
  }

  return (
    <>
      <div className={"flex justify-between items-center w-full mb-2"}>
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        <ViewResourceActions
          data={resource}
          resourceEditName={resourceEditName}
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
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 even:bg-slate-50"
            >
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {renderView(row, resource)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
