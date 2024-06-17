"use client";

import React from "react";
import { DeleteResponseInterface } from "@/types/misc";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const format = require("string-format");
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogDestructiveAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ViewResourceActionsProps<T extends object> {
  data: T;
  resourceEditName?: string;
  resourceEditPath?: string;
  resourceDeleteAction?: (d: T) => Promise<DeleteResponseInterface>;
}

export default function ViewResourceActions<T extends object = object>({
  data,
  resourceEditName = "Edit",
  resourceEditPath,
  resourceDeleteAction,
}: ViewResourceActionsProps<T>) {
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
    location.reload();
  };

  return (
    <div className={"flex items-center gap-x-2"}>
      {resourceEditPath && (
        <Button variant="outline" size="sm" asChild>
          <Link href={format(resourceEditPath, data)}>
            <Pencil className="h-4 w-4 mr-2" />
            {resourceEditName}
          </Link>
        </Button>
      )}
      {resourceDeleteAction && (
        <>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
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
