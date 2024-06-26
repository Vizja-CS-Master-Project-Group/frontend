"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogDestructiveAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { DeleteResponseInterface } from "@/types/misc";
import { redirect } from "next/navigation";
const format = require("string-format");
interface TableResourceActionProps<T> {
  data: T;
  resourceEditPath?: string;
  resourceDeleteAction?: (data: T) => Promise<DeleteResponseInterface>;
}

export default function TableResourceAction<T = object>({
  data,
  resourceEditPath,
  resourceDeleteAction,
}: TableResourceActionProps<T>) {
  const [loading, setLoading] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const onClickConfirm = async (e: any) => {
    e.preventDefault();
    if (!resourceDeleteAction) {
      return null;
    }

    setLoading(true);
    try {
      const response = await resourceDeleteAction(data);
      alert(response.data.message);
    } catch (e) {}

    setLoading(false);
    setOpenDeleteDialog(false);
    redirect("/");
  };

  return (
    <div className={"flex space-x-2 justify-between items-center"}>
      {resourceEditPath && (
        <Button variant="outline" size="icon-sm" asChild>
          <Link href={format(resourceEditPath, data)}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      )}
      {resourceDeleteAction && (
        <>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <AlertDialog
            open={openDeleteDialog}
            onOpenChange={() => setOpenDeleteDialog(false)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This book will be removed from the library
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                <AlertDialogDestructiveAction
                  disabled={loading}
                  onClick={onClickConfirm}
                >
                  Delete
                </AlertDialogDestructiveAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
