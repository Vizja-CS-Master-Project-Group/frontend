"use server";

import React from "react";
import { ViewInterface } from "@/types/misc";

interface Row<T = object> {
  label: string;
  accessorKey: keyof T;
  view?: (data: T) => React.ReactNode;
}

interface ViewResourceProps<T> {
  rows: Row<T>[];
  resourceAction: () => Promise<ViewInterface<T>>;
}

export default async function ViewResource<T = object>({
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
                : String(resource[row.accessorKey])}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
