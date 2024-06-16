"use server";

import React from "react";
import { NestedKeyOf, ViewInterface } from "@/types/misc";
const format = require("string-format");

interface Row<T extends object = object> {
  label: string;
  accessorKey: NestedKeyOf<T>;
  view?: (data: T) => React.ReactNode;
}

interface ViewResourceProps<T extends object> {
  rows: Row<T>[];
  resourceAction: () => Promise<ViewInterface<T>>;
}

export default async function ViewResource<T extends object = object>({
  rows,
  resourceAction,
}: ViewResourceProps<T>) {
  const resource = await resourceAction().then((r) => r.data);

  if (!resource) {
    return null;
  }

  return (
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
  );
}
