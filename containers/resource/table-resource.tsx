import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DeleteResponseInterface,
  NestedKeyOf,
  ViewResourceInterface,
} from "@/types/misc";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TableResourceAction from "@/containers/resource/table-resource-action";
const format = require("string-format");

export interface Column<T extends object = object> {
  header: string;
  headerClassName?: string;
  accessorKey: NestedKeyOf<T>;
  cell?: (data: T) => React.ReactNode;
  cellClassName?: string;
  isAccessible?: boolean;
}

export interface ResourceActionProps {
  page: number;
}

interface TableResourceProps<T extends object = object> {
  page: number;
  columns: Column<T>[];
  resourceAction: (
    props: ResourceActionProps,
  ) => Promise<ViewResourceInterface<T>>;
  resourceEditPath?: string;
  resourceDeleteAction?: (d: T) => Promise<DeleteResponseInterface>;
  debug?: boolean;
}

export default async function TableResource<T extends object = object>({
  page = 1,
  columns,
  resourceAction,
  resourceEditPath,
  resourceDeleteAction,
  debug = false,
}: TableResourceProps<T>) {
  const resource = await resourceAction({
    page,
  });

  const renderCell = (column: Column<T>, data: T) => {
    if (column.cell) {
      return column.cell(data);
    }

    if (
      !column.cell &&
      data &&
      typeof data === "object" &&
      column.accessorKey in data
    ) {
      const cellData = format(`{${column.accessorKey}}`, data) ?? "-";
      /**
       * Related to the formatter issue
       */
      if (cellData === "null") {
        return "-";
      }

      return cellData;
    }

    return "-";
  };

  return (
    <div>
      <Table>
        {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
        <TableHeader className={"bg-slate-50"}>
          <TableRow className={"hover:bg-slate-50"}>
            {columns
              .filter((c) => c.isAccessible || c.isAccessible === undefined)
              .map((column, i) => (
                <TableHead
                  key={`header-${i}`}
                  className={column.headerClassName}
                >
                  {column.header}
                </TableHead>
              ))}
            {(resourceEditPath || resourceDeleteAction) && (
              <TableHead className={"hover:bg-slate-50"}></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {resource.data.map((data, i) => (
            <TableRow key={`table-row-${i}`}>
              {columns
                .filter((c) => c.isAccessible || c.isAccessible === undefined)
                .map((column, ii) => (
                  <TableCell
                    key={`table-row-${i}-column-${ii}`}
                    className={column.cellClassName}
                  >
                    {renderCell(column, data)}
                  </TableCell>
                ))}
              {(resourceEditPath || resourceDeleteAction) && (
                <TableCell
                  key={`table-row-${i}-action-column`}
                  className={"w-20 py-0 px-4"}
                >
                  <TableResourceAction
                    data={data}
                    resourceEditPath={resourceEditPath}
                    resourceDeleteAction={resourceDeleteAction}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
          {resource.data.length === 0 && (
            <TableRow>
              <TableCell className={"p-4 text-center"}>
                No Record Found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {resource.meta.links.length > 3 && (
        <Pagination className={"mt-6"}>
          <PaginationContent>
            {resource.meta.links.map((link, i) => {
              if (!link.url) {
                return null;
              }

              if (link.label.includes("Previous")) {
                return (
                  <PaginationItem key={`page-${i}`}>
                    <PaginationPrevious
                      href={link.url}
                      isActive={link.active}
                    />
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
      )}
    </div>
  );
}
