import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewResourceInterface } from "@/types/misc";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Column<T = object> {
  header: string;
  headerClassName?: string;
  accessorKey: string;
  cell?: (data: T) => React.ReactNode;
  cellClassName?: string;
}

export interface ResourceActionProps {
  page: number;
}

interface TableResourceProps<T> {
  page: number;
  columns: Column<T>[];
  resourceAction: (
    props: ResourceActionProps,
  ) => Promise<ViewResourceInterface<T>>;
}

export default async function TableResource<T = object>({
  page = 1,
  columns,
  resourceAction,
}: TableResourceProps<T>) {
  const resource = await resourceAction({
    page,
  });

  const renderCell = (column: Column<T>, data: T) => {
    if (column.cell) {
      return column.cell(data);
    }

    // @ts-ignore
    if (!column.cell && column.accessorKey in data) {
      // @ts-ignore
      return data[column.accessorKey];
    }

    return "-";
  };

  return (
    <div>
      <Table>
        {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
        <TableHeader className={"bg-slate-50"}>
          <TableRow className={"hover:bg-slate-50"}>
            {columns.map((column, i) => (
              <TableHead key={`header-${i}`} className={column.headerClassName}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {resource.data.map((data, i) => (
            <TableRow key={`table-row-${i}`}>
              {columns.map((column, ii) => (
                <TableCell
                  key={`table-row-${i}-column-${ii}`}
                  className={column.cellClassName}
                >
                  {renderCell(column, data)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
