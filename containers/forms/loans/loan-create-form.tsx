"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { loanCreate } from "@/app/actions/loan.actions";
import { UserInterface } from "@/types/user";
import { BookInterface } from "@/types/book";
import UserCombobox from "@/components/forms/user-combobox";
import BookCombobox from "@/components/forms/book-combobox";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  user_id: z.number(),
  book_id: z.number(),
});

export type CreateLoanFromSchema = z.infer<typeof formSchema>;

export default function LoanCreateForm({
  users,
  books,
}: {
  users: UserInterface[];
  books: BookInterface[];
}) {
  const router = useRouter();
  const form = useForm<CreateLoanFromSchema>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: CreateLoanFromSchema) {
    return loanCreate(values)
      .then((loan) => router.push(`/loans/${loan.data.id}`))
      .catch((res) => {
        alert("This book is not currently available for borrowing");
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <UserCombobox
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={field.onChange}
                  users={users}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="book_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book</FormLabel>
              <FormControl>
                <BookCombobox
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={field.onChange}
                  books={books}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isLoading || form.formState.isSubmitting}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
