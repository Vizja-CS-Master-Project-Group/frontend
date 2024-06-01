"use server";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { ViewResourceInterface } from "@/types/misc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GridListTabs from "@/components/tabs/grid-list-tabs";

interface ViewResourceProps<T> {
  name: string;
  children: (data: T) => React.ReactNode;
  resourceAction: () => Promise<ViewResourceInterface<T>>;
}

export default async function ViewResource<T>({
  name,
  resourceAction,
  children,
}: ViewResourceProps<T>) {
  const resource = await resourceAction();

  return (
    <div className={"gap-4 p-4 lg:gap-6 lg:p-6 w-full"}>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{name}</h1>
        <GridListTabs />
      </div>
      <div
        className={
          "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8 mt-8"
        }
      >
        {resource.data.map((data, i) => (
          <div key={`resource-${i}`}>{children(data)}</div>
        ))}
      </div>
      <Pagination className={"mt-6"}>
        <PaginationContent>
          {resource.meta.links.map((link, i) => {
            if (!link.url) {
              return null;
            }

            if (link.label.includes("Previous")) {
              return (
                <PaginationItem key={`page-${i}`}>
                  <PaginationPrevious href={link.url} isActive={link.active} />
                </PaginationItem>
              );
            }

            if (link.label.includes("Next") && link.url) {
              return (
                <PaginationItem key={`page-${i}`}>
                  <PaginationNext href={link.url} isActive={link.active} />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={`page-${i}`}>
                <PaginationLink href={link.url} isActive={link.active}>
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
